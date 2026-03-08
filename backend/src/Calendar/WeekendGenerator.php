<?php
class WeekendGenerator {
    
    public static function getBlocksForMonth($year, $month, $mode = 'FULL_WEEKEND') {
        $blocks = [];
        $date = new DateTime("$year-$month-01");
        $lastDay = (int)$date->format('t');

        for ($d = 1; $d <= $lastDay; $d++) {
            $currentDate = new DateTime("$year-$month-$d");
            
            // Wir suchen den Freitag (Tag 5 der Woche)
            if ($currentDate->format('N') == 5) {
                $friday = clone $currentDate;
                $saturday = (clone $currentDate)->modify('+1 day');
                $sunday = (clone $currentDate)->modify('+2 days'); // Für Events, die bis Sonntag Morgen gehen
                
                if ($mode === 'SINGLE_DAYS') {
                    // 1. Block: Nur Freitag (Freitag bis Samstag Morgen)
                    $blocks[] = [
                        'id'    => 'day_' . $friday->format('Y-m-d'),
                        'start' => $friday->format('Y-m-d'),
                        'end'   => $saturday->format('Y-m-d'), 
                        'label' => 'Freitag, ' . $friday->format('d. M'),
                        'type'  => 'single'
                    ];
                    // 2. Block: Nur Samstag (Samstag bis Sonntag Morgen)
                    $blocks[] = [
                        'id'    => 'day_' . $saturday->format('Y-m-d'),
                        'start' => $saturday->format('Y-m-d'),
                        'end'   => $sunday->format('Y-m-d'),
                        'label' => 'Samstag, ' . $saturday->format('d. M'),
                        'type'  => 'single'
                    ];
                } else {
                    // Standard: FULL_WEEKEND (Freitag bis Sonntag)
                    $blocks[] = [
                        'id'    => 'wknd_' . $friday->format('Y-m-d'),
                        'start' => $friday->format('Y-m-d'),
                        'end'   => $sunday->format('Y-m-d'),
                        'label' => $friday->format('d. M') . ' - ' . $sunday->format('d. M'),
                        'type'  => 'weekend'
                    ];
                }
            }
        }
        return $blocks;
    }
}