import { useState, useEffect } from 'react';

interface CalendarEvent {
  start: string;
  end: string;
  title: string | null;
  color: string | null;
  isEvent: boolean;
}


interface UseCalendarDataReturn {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
}

export const useCalendarData = (): UseCalendarDataReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiBase = import.meta.env.VITE_API_BASE || '';
        const response = await fetch(`${apiBase}/calendar.php`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle error response from backend
        if (data.error) {
          throw new Error(data.error);
        }
        
        setEvents(data || []);
      } catch (err) {
        console.error('Error fetching calendar data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Kalenderdaten');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  return { events, loading, error };
};