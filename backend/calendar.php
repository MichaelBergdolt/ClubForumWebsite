<?php
// CORS für Dev
header("Access-Control-Allow-Origin: http://localhost:8080"); // ggf. Port anpassen
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
    $items = [];

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
            'start' => $startDate,
            'end' => $endDate,
            'title' => $title,
            'color' => $color,
            'isEvent' => $isEvent,
        ];
    }

    echo json_encode($items);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
