import { useEffect, useState } from "react";

export interface CalendarEvent {
  calendarId: string;
  start: string;   // YYYY-MM-DD
  end: string;     // YYYY-MM-DD
  title: string | null;
  color: string | null;
  isEvent: boolean;
}

export const useCalendarData = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        if (!apiUrl) {
          throw new Error("API URL ist nicht konfiguriert");
        }
        
        const response = await fetch(`${apiUrl}/calendar.php`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Server antwortete nicht mit JSON: ${text.substring(0, 100)}`);
        }
        
        const data: CalendarEvent[] = await response.json();
        setEvents(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  return { events, loading, error };
};
