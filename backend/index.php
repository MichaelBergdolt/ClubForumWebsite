<?php
// 1. Zentrale Konfiguration laden (für ALLE Routes)
require __DIR__ . '/bootstrap.php';

// 2. Welcher Endpunkt wird angefragt?
// Standard ist 'calendar', wenn nichts angegeben ist (oder du machst eine Fehlerseite)
$route = $_GET['route'] ?? 'calendar';

// 3. Routing Logik
switch ($route) {
    case 'calendar':
        require __DIR__ . '/routes/calendar.php';
        break;

    case 'contact':
        require __DIR__ . '/routes/contact.php';
        break;

    default:
        // Wenn eine unbekannte Route angefragt wird
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
        break;
}