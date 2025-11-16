<?php
// === CORS-Setup ===
// TODO: in Response dürfen auf keinen Fall Kalenderdaten enthalten sein! Datenschutz!
ini_set('display_errors', 1); # TODO: darf auf keinen Fall in Production build sein! Unsicher!
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$allowedOrigins = [
    "http://localhost:5173",             // dein lokales Vite-Dev
    "http://localhost:8080",             // evtl. andere lokale Umgebung
    "https://preview.club-forum-bb.de",  // deine Preview-Domain
    "https://club-forum-bb.de",          // optional: später live
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

$serviceAccountFile = __DIR__ . '/service-account.json';

$client = new Google_Client();
$client->setAuthConfig($serviceAccountFile);
$client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);

$service = new Google_Service_Calendar($client);

$calendarIds = [
    '1qumnn1ij0r7tmm427mgtsucag@group.calendar.google.com', // Kalender: "Club Forum"
    'dnbanuksheraorcd546uqrqhb8@group.calendar.google.com'  // Kalender: "Club Forum (Vermietungen)"
];

$optParams = [
    'singleEvents' => true,
    'orderBy' => 'startTime',
    'timeMin' => date('c'),
    'maxResults' => 50
];

$items = [];

try {
    foreach ($calendarIds as $calendarId) {
        $events = $service->events->listEvents($calendarId, $optParams);

        foreach ($events->getItems() as $event) {
            $start = $event->getStart()->getDate() ?: $event->getStart()->getDateTime();
            $end = $event->getEnd()->getDate() ?: $event->getEnd()->getDateTime();

            // Normalisieren auf YYYY-MM-DD
            $startDate = substr($start, 0, 10);
            $endDate = substr($end, 0, 10);

            $title = $event->getSummary();
            $color = null;
            $isEvent = false;

            // Format: EVENT;Titel;#Farbe
            if ($title && stripos($title, 'EVENT;') === 0) {
                $parts = explode(';', $title);
                $title = $parts[1] ?? $title;
                $color = $parts[2] ?? null;
                $isEvent = true;
            }

            $items[] = [
                'calendarId' => $calendarId,
                'start' => $startDate,
                'end' => $endDate,
                'title' => $title,
                'color' => $color,
                'isEvent' => $isEvent,
            ];
        }
    }

    // Optional: Events nach Startdatum sortieren
    usort($items, fn($a, $b) => strcmp($a['start'], $b['start']));

    echo json_encode($items, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}