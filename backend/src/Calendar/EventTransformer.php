<?php
class EventTransformer {

    public function transform(array $rawEvents): array {
        $items = [];

        foreach ($rawEvents as $event) {
            $start = $event->getStart()->getDate() ?: $event->getStart()->getDateTime();
            $end = $event->getEnd()->getDate() ?: $event->getEnd()->getDateTime();

            $startDate = substr($start, 0, 10);
            $endDate = substr($end, 0, 10);

            $title = $event->getSummary() ?? "";

            $isEvent = false;
            $color = null;

            if (stripos($title, "EVENT;") === 0) {
                $parts = explode(';', $title);
                $title = $parts[1] ?? "";
                $color = $parts[2] ?? null;
                $isEvent = true;
            } else {
                // anonymisieren
                $title = null;
            }

            // return only non-personal fields
            $items[] = [
                'start' => $startDate,
                'end' => $endDate,
                'isEvent' => $isEvent,
                'title' => $title,
                'color' => $color
            ];
        }

        return $items;
    }

    public function mapEventsToWeekends(array $rawEvents, array $weekends): array {
        $result = [];
        foreach ($weekends as $wknd) {
            $isBooked = false;
            $specialTitle = null;

            foreach ($rawEvents as $event) {
                $eStart = substr($event->getStart()->getDate() ?: $event->getStart()->getDateTime(), 0, 10);
                $eEnd   = substr($event->getEnd()->getDate() ?: $event->getEnd()->getDateTime(), 0, 10);

                // Prüfen auf Überschneidung: (StartA <= EndeB) und (EndeA >= StartB)
                if ($eStart < $wknd['end'] && $eEnd > $wknd['start']) {
                    $isBooked = true;
                    // Optional: Sondernamen wie "Pfingsten" extrahieren
                    if (stripos($event->getSummary(), "EVENT;") === 0) {
                        $parts = explode(';', $event->getSummary());
                        $specialTitle = $parts[1] ?? null;
                    }
                    break;
                }
            }

            $result[] = [
                'startDate' => $wknd['start'],
                'endDate'   => $wknd['end'],
                'label'     => $wknd['label'],
                'status'    => $isBooked ? 'GEBUCHT' : 'FREI',
                'specialEvent' => $specialTitle
            ];
        }
        return $result;
    }
}
