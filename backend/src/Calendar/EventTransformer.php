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
}
