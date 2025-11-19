<?php
class GoogleCalendarService {
    private Google_Service_Calendar $service;

    public function __construct(Google_Service_Calendar $service) {
        $this->service = $service;
    }

    public function getRawEvents(array $calendarIds, array $optParams): array {
        $rawEvents = [];

        foreach ($calendarIds as $calendarId) {
            $events = $this->service->events->listEvents($calendarId, $optParams);
            foreach ($events->getItems() as $event) {
                $rawEvents[] = $event;
            }
        }

        return $rawEvents;
    }
}
