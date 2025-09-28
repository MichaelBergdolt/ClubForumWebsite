<?php
// Dies erlaubt Anfragen von deinem Vite-Entwicklungsserver
header("Access-Control-Allow-Origin: http://localhost:8080");

// Optional, aber gute Praxis: Erlaube bestimmte Methoden und Header
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Wichtig: Setze den Content-Type für JSON-Antworten
header("Content-Type: application/json; charset=UTF-8");

require __DIR__ . '/vendor/autoload.php';

$serviceAccountFile = __DIR__ . '/service-account.json';

$client = new Google_Client();
$client->setAuthConfig($serviceAccountFile);
$client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);

$service = new Google_Service_Calendar($client);

$calendarId = 'dnbanuksheraorcd546uqrqhb8@group.calendar.google.com';

$optParams = [
    'singleEvents' => true,
    'orderBy' => 'startTime',
    'timeMin' => date('c'),
    'maxResults' => 50
];

try {
    $events = $service->events->listEvents($calendarId, $optParams);
    $items = [];

    foreach ($events->getItems() as $event) {
        $items[] = [
            'summary' => $event->getSummary(),
            'start' => $event->getStart()->getDate() ?: $event->getStart()->getDateTime(),
            'end' => $event->getEnd()->getDate() ?: $event->getEnd()->getDateTime(),
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($items);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
