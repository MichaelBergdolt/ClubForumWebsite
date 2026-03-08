<?php
class EventTransformer {

    public function mapEventsToBlocks(array $rawEvents, array $blocks): array {
        $result = [];
        
        foreach ($blocks as $block) {
            $isBooked = false;
            $specialTitle = null;

            foreach ($rawEvents as $event) {
                $eStart = substr($event->getStart()->getDate() ?: $event->getStart()->getDateTime(), 0, 10);
                $eEnd   = substr($event->getEnd()->getDate() ?: $event->getEnd()->getDateTime(), 0, 10);

                // Überschneidungsprüfung: Fällt das Event in diesen Block?
                if ($eStart < $block['end'] && $eEnd > $block['start']) {
                    $isBooked = true;
                    
                    // Optional: Eventnamen auslesen, falls es ein Sonder-Event ist
                    if (stripos($event->getSummary(), "EVENT;") === 0) {
                        $parts = explode(';', $event->getSummary());
                        $specialTitle = $parts[1] ?? null;
                    }
                    // Sobald wir ein Event im Block gefunden haben, ist er "GEBUCHT"
                    break; 
                }
            }

            $result[] = [
                'id'           => $block['id'],
                'startDate'    => $block['start'],
                'endDate'      => $block['end'],
                'label'        => $block['label'],
                'subLabel'     => $block['type'] === 'weekend' ? 'Freitag oder Samstag' : 'Einzeltag',
                'status'       => $isBooked ? 'GEBUCHT' : 'FREI',
                'specialEvent' => $specialTitle
            ];
        }
        
        return $result;
    }
}