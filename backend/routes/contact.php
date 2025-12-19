<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Request Methode prüfen (Sicherheit)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// JSON Body einlesen
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

// Validierung
$email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$message = trim($data['message']);

if (!$email || strlen($message) < 3) {
    http_response_code(422); // Unprocessable Entity
    echo json_encode(["error" => "Validation failed"]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // 3. SMTP Settings – Werte aus $_ENV nutzen (geladen via bootstrap.php)
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USER'];
    $mail->Password   = $_ENV['SMTP_PASS'];
    $mail->SMTPSecure = 'tls'; // Netcup nutzt meist TLS auf 587
    $mail->Port       = $_ENV['SMTP_PORT'];
    $mail->CharSet    = 'UTF-8'; // Wichtig für Umlaute!

    // Absender + Empfänger
    // Absender muss meist identisch mit dem Login-User sein bei Netcup
    $mail->setFrom($_ENV['SMTP_USER'], $_ENV['SMTP_FROM_NAME']);
    $mail->addReplyTo($email); // Damit du auf "Antworten" klicken kannst und an den Kunden schreibst
    $mail->addAddress($_ENV['SMTP_USER']); // Email geht an dich

    $mail->Subject = 'Neue Anfrage von der Website';
    $mail->Body    = "Du hast eine neue Nachricht erhalten:\n\nEmail: {$email}\n\nNachricht:\n{$message}";

    $mail->send();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    // Logge den genauen Fehler für dich auf dem Server (nicht an den User ausgeben!)
    error_log($mail->ErrorInfo);
    
    http_response_code(500);
    echo json_encode(["error" => "Mail send error"]);
}