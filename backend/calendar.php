<?php
// Dies erlaubt Anfragen von deinem Vite-Entwicklungsserver
header("Access-Control-Allow-Origin: http://localhost:8080");

// Optional, aber gute Praxis: Erlaube bestimmte Methoden und Header
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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
    $output = [];

    foreach ($events->getItems() as $event) {
        $start = $event->getStart()->getDate() ?: $event->getStart()->getDateTime();
        $end   = $event->getEnd()->getDate() ?: $event->getEnd()->getDateTime();
        $summary = $event->getSummary();

        // Prüfen, ob das Event das spezielle Format hat
        if (isset($summary) && strpos($summary, 'EVENT;') === 0) {
            $parts = explode(';', $summary);
            $title = $parts[1] ?? 'Unbenannt';
            $color = $parts[2] ?? '#000000';
            $isEvent = true;
        } else {
            $title = null;
            $color = null;
            $isEvent = false;
        }

        $output[] = [
            'start' => $start,
            'end' => $end,
            'title' => $title,
            'color' => $color,
            'isEvent' => $isEvent
        ];
    }

    echo json_encode($output);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
