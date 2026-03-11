<?php
class WeekendGenerator {
    
    // Array für die korrekten deutschen Monatskürzel
    private static array $shortMonths = [
        1 => 'Jan', 2 => 'Feb', 3 => 'Mär', 4 => 'Apr', 
        5 => 'Mai', 6 => 'Jun', 7 => 'Jul', 8 => 'Aug', 
        9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Dez'
    ];

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
                $sunday = (clone $currentDate)->modify('+2 days');
                
                // Wir holen die Monatszahl ('n') und nutzen sie als Key für unser Array
                $friStr = $friday->format('d.') . ' ' . self::$shortMonths[(int)$friday->format('n')];
                $satStr = $saturday->format('d.') . ' ' . self::$shortMonths[(int)$saturday->format('n')];
                $sunStr = $sunday->format('d.') . ' ' . self::$shortMonths[(int)$sunday->format('n')];
                
                if ($mode === 'SINGLE_DAYS') {
                    // 1. Block: Nur Freitag
                    $blocks[] = [
                        'id'    => 'day_' . $friday->format('Y-m-d'),
                        'start' => $friday->format('Y-m-d'),
                        'end'   => $saturday->format('Y-m-d'), 
                        'label' => 'Freitag, ' . $friStr,
                        'type'  => 'single'
                    ];
                    // 2. Block: Nur Samstag
                    $blocks[] = [
                        'id'    => 'day_' . $saturday->format('Y-m-d'),
                        'start' => $saturday->format('Y-m-d'),
                        'end'   => $sunday->format('Y-m-d'),
                        'label' => 'Samstag, ' . $satStr,
                        'type'  => 'single'
                    ];
                } else {
                    // Standard: FULL_WEEKEND
                    $blocks[] = [
                        'id'    => 'wknd_' . $friday->format('Y-m-d'),
                        'start' => $friday->format('Y-m-d'),
                        'end'   => $sunday->format('Y-m-d'),
                        'label' => $friStr . ' - ' . $sunStr, // Hier greift das neue Format!
                        'type'  => 'weekend'
                    ];
                }
            }
        }
        return $blocks;
    }
}