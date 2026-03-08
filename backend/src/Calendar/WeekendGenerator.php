<?php
class WeekendGenerator {
    public static function getWeekendsForMonth($year, $month) {
        $weekends = [];
        $date = new DateTime("$year-$month-01");
        $lastDay = (int)$date->format('t');

        for ($d = 1; $d <= $lastDay; $d++) {
            $currentDate = new DateTime("$year-$month-$d");
            // Wir suchen den Freitag (5)
            if ($currentDate->format('N') == 5) {
                $friday = clone $currentDate;
                $sunday = (clone $currentDate)->modify('+2 days');
                
                $weekends[] = [
                    'start' => $friday->format('Y-m-d'),
                    'end'   => $sunday->format('Y-m-d'),
                    'label' => $friday->format('d. M') . " - " . $sunday->format('d. M')
                ];
            }
        }
        return $weekends;
    }
}