<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// -----------------------------
// 1. Request-Methode prüfen
// -----------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// -----------------------------
// 2. JSON einlesen
// -----------------------------
$data = json_decode(file_get_contents('php://input'), true);

if (
    !$data ||
    empty($data['name']) ||
    empty($data['email']) ||
    empty($data['anfrageArt']) ||
    empty($data['nachricht'])
) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

// -----------------------------
// 3. Felder aufbereiten
// -----------------------------
$name       = trim($data['name']);
$email      = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$anfrageArt = trim($data['anfrageArt']); // 'mietanfrage' oder 'allgemein'
$betreffRaw = isset($data['betreff']) ? trim($data['betreff']) : ''; // Freitext-Betreff
$nachricht  = trim($data['nachricht']);
$datum      = isset($data['datum']) ? trim($data['datum']) : null;

// -----------------------------
// 4. Validierung
// -----------------------------
if (
    !$email ||
    strlen($name) < 2 ||
    strlen($nachricht) < 5 ||
    !in_array($anfrageArt, ['mietanfrage', 'allgemein'], true)
) {
    http_response_code(422);
    echo json_encode(["error" => "Validation failed"]);
    exit;
}

// Wenn Allgemein, muss ein Betreff angegeben sein
if ($anfrageArt === 'allgemein' && empty($betreffRaw)) {
    http_response_code(422);
    echo json_encode(["error" => "Betreff required for general request"]);
    exit;
}

// -----------------------------
// 5. Empfänger & Betreff bestimmen
// -----------------------------
$recipient = match ($anfrageArt) {
    'mietanfrage' => env('RENT_EMAIL'),
    'allgemein'   => env('CONTACT_EMAIL'),
    default       => env('CONTACT_EMAIL'),
};

if (empty($recipient)) {
    http_response_code(500);
    echo json_encode(["error" => "Recipient not configured"]);
    exit;
}

// Datum formatieren (deutsch), falls vorhanden
$datumFormatiert = '';
if (!empty($datum)) {
    $dateTime = DateTime::createFromFormat('Y-m-d', $datum);
    if ($dateTime !== false) {
        $datumFormatiert = $dateTime->format('d.m.Y');
    }
}

// Betreff für die E-Mail an den Verein generieren
if ($anfrageArt === 'mietanfrage') {
    // Wenn Datum da: "Mietanfrage 12.12.2024", sonst "Mietanfrage (Datum offen)"
    $mailSubject = 'Mietanfrage';
    $mailSubject .= $datumFormatiert ? " " . $datumFormatiert : " (Datum offen)";
} else {
    // Bei Allgemein den eingegebenen Betreff nutzen
    $mailSubject = "Anfrage: " . $betreffRaw;
}

// -----------------------------
// 6. Mails versenden
// -----------------------------
$mail = new PHPMailer(true);

try {
    if (empty(env('SMTP_HOST'))) {
        throw new Exception('SMTP environment not configured');
    }

    // SMTP Settings
    $mail->isSMTP();
    $mail->Host       = env('SMTP_HOST');
    $mail->SMTPAuth   = true;
    $mail->Username   = env('SMTP_USER');
    $mail->Password   = env('SMTP_PASS');
    $mail->SMTPSecure = 'tls';
    $mail->Port       = env('SMTP_PORT');
    $mail->CharSet    = 'UTF-8';

    // ==========================================
    // MAIL 1: An den Verein
    // ==========================================
    $mail->setFrom(env('SMTP_USER'), env('SMTP_FROM_NAME'));


    // =========================
    // MAIL 1: An das Club Forum
    // =========================
    
    // WICHTIG: Damit der Verein beim Klick auf "Antworten" 
    // direkt dem Kunden schreibt und nicht der Noreply-Adresse:
    $mail->addReplyTo($email, $name);
    
    $mail->addAddress($recipient);
    $mail->Subject = $mailSubject;
    
    // Body aufbauen
    $bodyContent = "Name: {$name}\n";
    $bodyContent .= "E-Mail: {$email}\n";
    if ($anfrageArt === 'mietanfrage') {
         $bodyContent .= "Gewünschtes Datum: " . ($datumFormatiert ?: "Nicht angegeben") . "\n";
    }
    $bodyContent .= "\nNachricht:\n{$nachricht}";
    
    $mail->Body = $bodyContent;
    $mail->send();


    // ==========================================
    // MAIL 2: Bestätigung an den Nutzer
    // ==========================================
    
    // Aufräumen für die zweite Mail
    $mail->clearAllRecipients(); 
    $mail->clearReplyTos(); // Hier löschen wir die Reply-To des Kunden wieder!
    
    $mail->addAddress($email); // Ziel: Der Kunde 

    $mail->Subject = "Eingangsbestätigung: " . $mailSubject;

    $confirmBody = "Hallo {$name},\n\n";
    $confirmBody .= "vielen Dank für deine Nachricht an das Club Forum Böblingen.\n";
    $confirmBody .= "Wir haben deine Anfrage erhalten und werden uns schnellstmöglich bei dir melden.\n\n";
    $confirmBody .= "Zusammenfassung deiner Anfrage:\n";
    $confirmBody .= "----------------------------------------\n";
    $confirmBody .= $bodyContent . "\n";
    $confirmBody .= "----------------------------------------\n\n";
    $confirmBody .= "Bitte antworte nicht auf diese automatisch generierte E-Mail."; // TODO: Bei Mietanfrage sollte noch weiterer Ablauf in den Text: Wir fragen ob jemand die Vermietung von uns Ehrenamtlich übernehmen kann. Auf Mietdetails auf der Website verweisen.

    $mail->Body = $confirmBody;
    $mail->send();

    echo json_encode([
        "success" => true,
        "type"    => $anfrageArt
    ]);

} catch (Exception $e) {
    error_log($mail->ErrorInfo ?: $e->getMessage());

    http_response_code(500);
    echo json_encode(["error" => "Mail send error"]);
}