import { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  anfrageArt: "mietanfrage" | "allgemein";
  betreff?: string;
  datum?: string;
  nachricht: string;
}

interface UseContactFormResult {
  submitContact: (data: ContactFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useContactForm = (): UseContactFormResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: ContactFormData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiUrl) {
        throw new Error("API URL ist nicht konfiguriert");
      }

      const response = await fetch(`${apiUrl}/index.php?route=contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Fehler beim Senden: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server antwortete nicht mit JSON: ${text.substring(0, 100)}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Unbekannter Fehler");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ein unbekannter Fehler ist aufgetreten");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error };
};
