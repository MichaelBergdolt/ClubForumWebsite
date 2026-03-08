<?php
// backend/config.php

return [
    // Welche Monate sind Vermietungsmonate? (1 = Jan, 5 = Mai, 9 = Sep, 11 = Nov)
    'rental_months' => [1, 2, 3, 4, 5, 9, 10, 11],
    
    // Wie viele Monate in die Zukunft sollen maximal berechnet werden?
    'max_future_months' => 36,
    
    // Wie viele Monate sollen im Frontend standardmäßig anfangs angezeigt werden?
    'initial_visible_months' => 8
];