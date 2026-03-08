<?php
require_once __DIR__ . '/../src/Calendar/GoogleCalendarService.php';
require_once __DIR__ . '/../src/Calendar/EventTransformer.php';
require_once __DIR__ . '/../src/Calendar/WeekendGenerator.php'; // Diese Datei erstellen wir als nächstes

// Konfiguration (Manuell hier drin, bis du eine config.php hast)
$calendarIds = [ // TODO: auslagern in config.php
    '1qumnn1ij0r7tmm427mgtsucag@group.calendar.google.com', // Club Forum
    'dnbanuksheraorcd546uqrqhb8@group.calendar.google.com'  // Vermietungen
];
$rentalMonths = [1, 2, 3, 4, 5, 9, 10, 11]; // Deine Vermietungs-Saison
$maxFutureMonths = 36;
$initialVisible = 8;

$action = $_GET['action'] ?? 'months';
header('Content-Type: application/json; charset=utf-8');

try {
    // === Google Client Setup (wie in deinem Original) ===
    $serviceAccountFile = __DIR__ . '/../service-account.json';
    $client = new Google_Client();
    $client->setAuthConfig($serviceAccountFile);
    $client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);
    $service = new Google_Service_Calendar($client);
    
    $calendarService = new GoogleCalendarService($service);
    $transformer = new EventTransformer();

    // --- ACTION 1: MONATE ---
    if ($action === 'months') {
        $monthsList = [];
        $currentYear = (int)date('Y');
        $currentMonth = (int)date('n');
        
        $monthNames = [1 => 'Januar', 2 => 'Februar', 3 => 'März', 4 => 'April', 5 => 'Mai', 6 => 'Juni', 7 => 'Juli', 8 => 'August', 9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Dezember'];

        $monthsAdded = 0;
        $checkYear = $currentYear;
        $checkMonth = $currentMonth;

        while ($monthsAdded < $maxFutureMonths) {
            if (in_array($checkMonth, $rentalMonths)) {
                $monthsList[] = [
                    'year'  => $checkYear,
                    'month' => $checkMonth,
                    'label' => $monthNames[$checkMonth]
                ];
                $monthsAdded++;
            }
            $checkMonth++;
            if ($checkMonth > 12) { $checkMonth = 1; $checkYear++; }
        }

        echo json_encode([
            'settings' => ['initialVisible' => $initialVisible, 'totalAvailable' => count($monthsList)],
            'data' => $monthsList
        ], JSON_UNESCAPED_UNICODE);
    } 
    
    // --- ACTION 2: VERFÜGBARKEIT ---
    elseif ($action === 'availability') {
        $year = (int)($_GET['year'] ?? date('Y'));
        $month = (int)($_GET['month'] ?? date('n'));
        
        // Zeitraum auf den gewählten Monat einschränken
        $timeMin = date('c', strtotime("$year-$month-01 00:00:00"));
        $timeMax = date('c', strtotime("$year-$month-01 23:59:59 +1 month -1 day"));

        $optParams = [
            'singleEvents' => true,
            'orderBy' => 'startTime',
            'timeMin' => $timeMin,
            'timeMax' => $timeMax
        ];

        $rawEvents = $calendarService->getRawEvents($calendarIds, $optParams);
        
        // Hier nutzen wir den neuen WeekendGenerator (Code folgt unten)
        $weekends = WeekendGenerator::getWeekendsForMonth($year, $month);
        
        // Wir erweitern deinen Transformer um eine Mapping-Funktion
        $availability = $transformer->mapEventsToWeekends($rawEvents, $weekends);

        echo json_encode($availability, JSON_UNESCAPED_UNICODE);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}