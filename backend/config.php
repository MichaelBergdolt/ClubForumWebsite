<?php

return [
    // --- Kalender IDs ---
    'calendar_ids' => [
        '1qumnn1ij0r7tmm427mgtsucag@group.calendar.google.com', // Club Forum
        'dnbanuksheraorcd546uqrqhb8@group.calendar.google.com'  // Vermietungen
    ],

    // --- Zeitraum Einstellungen ---
    // Welche Monate sind Vermietungsmonate? (1 = Jan, 5 = Mai, 9 = Sep, 11 = Nov)
    'rental_months' => [1, 2, 3, 4, 5, 9, 10, 11],
    // Wie viele Monate in die Zukunft sollen maximal berechnet werden?
    'max_future_months' => 36,
    // Wie viele Monate sollen im Frontend standardmäßig anfangs angezeigt werden?
    'initial_visible_months' => 8,

    // --- Buchungsmodus ---
    // 'FULL_WEEKEND' = Freitag bis Sonntag als ein Block
    // 'SINGLE_DAYS'  = Freitag und Samstag als getrennte Blöcke
    'booking_mode' => 'FULL_WEEKEND',
];