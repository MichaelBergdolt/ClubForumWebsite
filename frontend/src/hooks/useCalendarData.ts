import { useEffect, useState, useCallback } from "react";

export interface CalendarMonth {
  year: number;
  month: number;
  label: string;
}

export interface CalendarSettings {
  initialVisible: number;
  totalAvailable: number;
  bookingMode: string;
}

export interface AvailabilityBlock {
  id: string;
  startDate: string;
  endDate: string;
  label: string;
  subLabel: string;
  status: "FREI" | "GEBUCHT";
  specialEvent: string | null;
}

export const useCalendarMonths = () => {
  const [months, setMonths] = useState<CalendarMonth[]>([]);
  const [settings, setSettings] = useState<CalendarSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        if (!apiUrl) throw new Error("API URL ist nicht konfiguriert");

        const response = await fetch(`${apiUrl}/api/calendar?action=months`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const json = await response.json();
        setSettings(json.settings);
        setMonths(json.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    };
    fetchMonths();
  }, []);

  return { months, settings, loading, error };
};

export const useAvailability = (year: number | null, month: number | null) => {
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (year === null || month === null) return;

    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        if (!apiUrl) throw new Error("API URL ist nicht konfiguriert");

        const response = await fetch(
          `${apiUrl}/api/calendar?action=availability&year=${year}&month=${String(month).padStart(2, "0")}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data: AvailabilityBlock[] = await response.json();
        setBlocks(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [year, month]);

  return { blocks, loading, error };
};
