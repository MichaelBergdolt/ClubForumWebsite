<?php
// Config laden
$config = require_once __DIR__ . '/../config.php';

require_once __DIR__ . '/../src/Calendar/GoogleCalendarService.php';
require_once __DIR__ . '/../src/Calendar/EventTransformer.php';
require_once __DIR__ . '/../src/Calendar/WeekendGenerator.php';

$action = $_GET['action'] ?? 'months';
header('Content-Type: application/json; charset=utf-8');

try {
    // --- Google API Setup ---
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

        while ($monthsAdded < $config['max_future_months']) {
            if (in_array($checkMonth, $config['rental_months'])) {
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
            'settings' => [
                'initialVisible' => $config['initial_visible_months'], 
                'totalAvailable' => count($monthsList),
                'bookingMode'    => $config['booking_mode'] // Dem Frontend mitteilen, welcher Modus aktiv ist
            ],
            'data' => $monthsList
        ], JSON_UNESCAPED_UNICODE);
    } 
    
    // --- ACTION 2: VERFÜGBARKEIT ---
    elseif ($action === 'availability') {
        $year = (int)($_GET['year'] ?? date('Y'));
        $month = (int)($_GET['month'] ?? date('n'));
        
        $timeMin = date('c', strtotime("$year-$month-01 00:00:00"));
        $timeMax = date('c', strtotime("$year-$month-01 23:59:59 +1 month -1 day"));

        $optParams = [
            'singleEvents' => true,
            'orderBy' => 'startTime',
            'timeMin' => $timeMin,
            'timeMax' => $timeMax
        ];

        // IDs aus der Config nehmen!
        $rawEvents = $calendarService->getRawEvents($config['calendar_ids'], $optParams);
        
        // Modus aus der Config nehmen (Fallback: FULL_WEEKEND)
        $bookingMode = $config['booking_mode'] ?? 'FULL_WEEKEND';
        
        // Blöcke generieren und abgleichen
        $blocks = WeekendGenerator::getBlocksForMonth($year, $month, $bookingMode);
        $availability = $transformer->mapEventsToBlocks($rawEvents, $blocks);

        echo json_encode($availability, JSON_UNESCAPED_UNICODE);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}