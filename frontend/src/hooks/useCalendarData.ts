import { useEffect, useState } from "react";

export interface CalendarEvent {
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
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/index.php");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
