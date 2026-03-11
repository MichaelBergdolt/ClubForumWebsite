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
        
        // Aktuelles Datum für den Vergangenheits-Check (Format: 2024-05-03)
        $today = date('Y-m-d');

        for ($d = 1; $d <= $lastDay; $d++) {
            $currentDate = new DateTime("$year-$month-$d");
            $dateString = $currentDate->format('Y-m-d');
            
            // Wochentag: 5 = Freitag, 6 = Samstag
            $dayOfWeek = $currentDate->format('N'); 

            if ($mode === 'SINGLE_DAYS') {
                // Modus: Einzeltage (Freitag und Samstag strikt getrennt betrachten)
                if ($dayOfWeek == 5 || $dayOfWeek == 6) {
                    
                    // Vergangenheits-Check: Ist der Tag schon vorbei?
                    if ($dateString < $today) {
                        continue; 
                    }

                    $labelPrefix = ($dayOfWeek == 5) ? 'Freitag' : 'Samstag';
                    $dateLabel = $currentDate->format('d.') . ' ' . self::$shortMonths[(int)$currentDate->format('n')];
                    
                    // Für SINGLE_DAYS ist Start und Ende derselbe Tag (wichtig für die Termin-Prüfung)
                    $blocks[] = [
                        'id'    => 'day_' . $dateString,
                        'start' => $dateString,
                        'end'   => $dateString, 
                        'label' => $labelPrefix . ', ' . $dateLabel,
                        'type'  => 'single'
                    ];
                }
            } else {
                // Modus: Ganzes Wochenende (Immer beim Freitag starten)
                if ($dayOfWeek == 5) {
                    $friday = clone $currentDate;
                    $sunday = (clone $currentDate)->modify('+2 days');
                    
                    // Vergangenheits-Check: Ist das ganze Wochenende (Sonntag) schon vorbei?
                    // (Wenn heute Samstag ist, bleibt das Wochenende von gestern bis morgen sichtbar)
                    if ($sunday->format('Y-m-d') < $today) {
                        continue;
                    }

                    $friStr = $friday->format('d.') . ' ' . self::$shortMonths[(int)$friday->format('n')];
                    $sunStr = $sunday->format('d.') . ' ' . self::$shortMonths[(int)$sunday->format('n')];
                    
                    $blocks[] = [
                        'id'    => 'wknd_' . $friday->format('Y-m-d'),
                        'start' => $friday->format('Y-m-d'),
                        'end'   => $sunday->format('Y-m-d'),
                        'label' => $friStr . ' - ' . $sunStr,
                        'type'  => 'weekend'
                    ];
                }
            }
        }
        return $blocks;
    }
}