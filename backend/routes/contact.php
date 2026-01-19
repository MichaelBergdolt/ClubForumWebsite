<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// TODO: Wie funktioniert verarbeitung wenn Mietanfrage ohne Datum. Checken!!!

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
    empty($data['betreff']) ||
    empty($data['nachricht'])
) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

// -----------------------------
// 3. Felder aufbereiten
// -----------------------------
$name      = trim($data['name']);
$email     = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$betreff   = trim($data['betreff']);
$nachricht = trim($data['nachricht']);
$datum     = isset($data['datum']) ? trim($data['datum']) : null;

// -----------------------------
// 4. Validierung
// -----------------------------
if (
    !$email ||
    strlen($name) < 2 ||
    strlen($nachricht) < 5 ||
    !in_array($betreff, ['mietanfrage', 'allgemein'], true)
) {
    http_response_code(422);
    echo json_encode(["error" => "Validation failed"]);
    exit;
}

// Datum nur bei Mietanfrage erforderlich
if ($betreff === 'mietanfrage' && empty($datum)) {
    http_response_code(422);
    echo json_encode(["error" => "Datum required for Mietanfrage"]);
    exit;
}

// -----------------------------
// 5. Empfänger bestimmen
// -----------------------------
$recipient = match ($betreff) {
    'mietanfrage' => env('RENT_EMAIL'),
    'allgemein'   => env('CONTACT_EMAIL'),
    default       => env('CONTACT_EMAIL'),
};

if (empty($recipient)) {
    http_response_code(500);
    echo json_encode(["error" => "Recipient not configured"]);
    exit;
}

// -----------------------------
// 6. Mail versenden
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

    // Absender & Empfänger
    $mail->setFrom(env('SMTP_USER'), env('SMTP_FROM_NAME'));
    $mail->addReplyTo($email, $name);
    $mail->addAddress($recipient);

    // Datum formatieren (deutsch)
    $datumFormatiert = '';
    if (!empty($datum)) {
        $dateTime = DateTime::createFromFormat('Y-m-d', $datum);
        if ($dateTime !== false) {
            $datumFormatiert = $dateTime->format('d.m.Y');
        }
    }

    // Betreff zusammenbauen
    $subjectMap = [
        'mietanfrage' => 'Mietanfrage',
        'allgemein'   => 'Allgemeine Anfrage',
    ];

    $subject = $subjectMap[$betreff] ?? 'Neue Anfrage';
    if ($betreff === 'mietanfrage' && $datumFormatiert) {
        $subject .= " " . $datumFormatiert;
    }
    $mail->Subject = $subject;

    // Mail-Body
    $mail->Body =
        "Name: {$name}\n" .
        ($datum ? "Gewünschtes Datum: {$datumFormatiert}\n" : "") .
        "\nNachricht:\n{$nachricht}";

    $mail->send();

    echo json_encode([
        "success" => true,
        "type"    => $betreff
    ]);

} catch (Exception $e) {
    error_log($mail->ErrorInfo ?: $e->getMessage());

    http_response_code(500);
    echo json_encode(["error" => "Mail send error"]);
}
