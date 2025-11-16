<?php
// === CORS-Setup ===
ini_set('display_errors', 1); // TODO: In Production deaktivieren!
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "https://preview.club-forum-bb.de",
    "https://club-forum-bb.de",
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// === Google Calendar Logic ===
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/Calendar/GoogleCalendarService.php';
require __DIR__ . '/src/Calendar/EventTransformer.php';

// Google Client initialisieren
$serviceAccountFile = __DIR__ . '/service-account.json';

$client = new Google_Client();
$client->setAuthConfig($serviceAccountFile);
$client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);

$service = new Google_Service_Calendar($client);

// Service & Transformer
$calendarService = new GoogleCalendarService($service);
$transformer = new EventTransformer();

// Deine Kalender-IDs
$calendarIds = [
    '1qumnn1ij0r7tmm427mgtsucag@group.calendar.google.com', // Kalender: "Club Forum"
    'dnbanuksheraorcd546uqrqhb8@group.calendar.google.com'  // Kalender: "Club Forum (Vermietungen)"
];

// Parameter für Google Calendar API
$optParams = [
    'singleEvents' => true,
    'orderBy' => 'startTime',
    'timeMin' => date('c'),
    'maxResults' => 50
];

try {
    // Rohe Google-Events holen
    $rawEvents = $calendarService->getRawEvents($calendarIds, $optParams);

    // DSGVO-konforme Transformation
    $publicEvents = $transformer->transform($rawEvents);

    // Sortieren nach Datum
    usort($publicEvents, fn($a, $b) => strcmp($a['start'], $b['start']));

    // Output der anonymisierten Events
    echo json_encode($publicEvents, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
