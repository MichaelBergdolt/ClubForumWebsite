<?php
require_once __DIR__ . '/../src/Calendar/GoogleCalendarService.php';
require_once __DIR__ . '/../src/Calendar/EventTransformer.php';

// === Google Calendar Logic ===
$serviceAccountFile = __DIR__ . '/../service-account.json';

$client = new Google_Client();
$client->setAuthConfig($serviceAccountFile);
$client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);

$service = new Google_Service_Calendar($client);

// Service & Transformer
$calendarService = new GoogleCalendarService($service);
$transformer = new EventTransformer();

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
    $rawEvents = $calendarService->getRawEvents($calendarIds, $optParams);
    $publicEvents = $transformer->transform($rawEvents);

    // sortiere nach Datum
    usort($publicEvents, fn($a, $b) => strcmp($a['start'], $b['start']));

    echo json_encode($publicEvents, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}