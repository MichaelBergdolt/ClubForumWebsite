<?php
class EventTransformer {

    public function mapEventsToBlocks(array $rawEvents, array $blocks): array {
        $result = [];
        
        foreach ($blocks as $block) {
            $isBooked = false;
            $specialTitle = null;

            // Start und Ende des Blocks laden
            $blockStart = $block['start'];
            $blockEnd   = $block['end'];

            foreach ($rawEvents as $event) {
                $startObj = $event->getStart();
                $endObj = $event->getEnd();
                
                // Wir wandeln Google-Events so um, dass wir immer das INKLUSIVE Enddatum haben.
                if ($startObj->getDate()) {
                    // Ganztägiges Event: Google liefert das Enddatum immer exklusiv (z.B. einen Tag später)
                    // Wir ziehen einen Tag ab, damit ein Event am 3. Mai auch als Ende 3. Mai gerechnet wird.
                    $eStart = $startObj->getDate();
                    $eEndInclusive = (new DateTime($endObj->getDate()))->modify('-1 day')->format('Y-m-d');
                } else {
                    // Event mit Uhrzeit (Kurze Termine)
                    // Wir extrahieren nur das reine Datum, um es als inklusiven Zeitraum zu nutzen.
                    $eStart = substr($startObj->getDateTime(), 0, 10);
                    $eEndInclusive = substr($endObj->getDateTime(), 0, 10);
                }

                // Start des Events muss <= Ende des Blocks sein UND
                // Ende des Events muss >= Start des Blocks sein.
                if ($eStart <= $blockEnd && $eEndInclusive >= $blockStart) {
                    $isBooked = true;
                    
                    // Optional: Eventnamen auslesen, falls es ein Sonder-Event ist
                    if (stripos($event->getSummary(), "EVENT;") === 0) {
                        $parts = explode(';', $event->getSummary());
                        $specialTitle = $parts[1] ?? null;
                    }
                    
                    // Sobald wir einen Termin haben (egal wie lang), markieren wir den Block als GEBUCHT.
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