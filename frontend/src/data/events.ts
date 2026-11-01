import { eventTemplates } from "./eventTemplates";

export type EventConfig = {
  title: string;
  description: string;
  // Beginn des Events, z. B. für einen Countdown
  startsAt?: string;
  // Ab diesem Zeitpunkt ist das Event vorbei und das nächste im Zeitplan wird angezeigt
  until?: string;
  accentColor?: { primary: string; primaryDark: string; primaryLight: string };
  // Eigener Hero statt des Standard-Layouts
  hero?: "barbroker" | "mariokart" | "halloween" | "oftas";
  eventDetails: { icon: string; title: string; value: string }[];
  artists: { name: string; image: string; description: string }[];
};

export type UpcomingEvent = {
  title: string;
  date?: string;
  time?: string;
  price?: string;
  // Ab diesem Zeitpunkt wird die Karte ausgeblendet
  until?: string;
  locationName?: string;
  locationAddress?: string;
  description?: string;
  // Ohne Bild wird eine Kachel mit Datum angezeigt
  image?: string;
  // Eigene animierte Vorschau statt Bild
  teaser?: "barbroker" | "mariokart";
};

export type PastEvent = {
  title: string;
  images: string[];
};

// Texte, Zeiten und Preise stehen in eventTemplates.ts, hier kommt nur der Termin dazu
const halloween = eventTemplates.halloween(2026);
const marioKart = eventTemplates.marioKart("2026-11-08");
const barBroker = eventTemplates.barBroker("2026-11-27");
const oftas = eventTemplates.oftas(2026);

// Chronologisch sortiert: Das erste Event, das noch nicht vorbei ist, wird oben groß angezeigt
const eventSchedule: EventConfig[] = [halloween.event, marioKart.event, barBroker.event, oftas.event];

const isOver = (until?: string) => until !== undefined && new Date() >= new Date(until);

// Nur lokal (npm run dev): /events?vorschau=mariokart zeigt ein bestimmtes Event als Hero
const previewKey = import.meta.env.DEV ? new URLSearchParams(window.location.search).get("vorschau") : null;
const previewEvent = eventSchedule.find(
  (event) => previewKey !== null && (event.hero === previewKey || event.title.toLowerCase() === previewKey.toLowerCase())
);

export const nextEvent: EventConfig =
  previewEvent ?? eventSchedule.find((event) => !isOver(event.until)) ?? eventSchedule[eventSchedule.length - 1];

// false, wenn auch das letzte Event im Plan schon vorbei ist
export const nextEventIsUpcoming = previewEvent !== undefined || !isOver(nextEvent.until);

// Karten unter "Weitere Highlights"
const highlights = [marioKart, barBroker, oftas];

// Vergangene Events und das aktuelle Hero-Event nicht doppelt anzeigen
export const upcomingEvents: UpcomingEvent[] = highlights
  .filter(({ event, card }) => !isOver(card.until) && event !== nextEvent)
  .map(({ card }) => card);

export const pastEvents: PastEvent[] = [
  {
    title: "Oftas 2025",
    images: [
      "/images/events/past_events/oftas_2025/oftas_1.jpg",
      "/images/events/past_events/oftas_2025/oftas_2.jpg",
      "/images/events/past_events/oftas_2025/oftas_3.jpg",
      "/images/events/past_events/oftas_2025/oftas_4.jpg",
      "/images/events/past_events/oftas_2025/oftas_5.jpg",
      "/images/events/past_events/oftas_2025/oftas_6.jpg",
      "/images/events/past_events/oftas_2025/oftas_7.jpg",
      "/images/events/past_events/oftas_2025/oftas_8.jpg",
      "/images/events/past_events/oftas_2025/oftas_9.jpg",
      "/images/events/past_events/oftas_2025/oftas_10.jpg",
      "/images/events/past_events/oftas_2025/oftas_11.jpg",
    ]
  },
  {
    title: "Halloween 2025",
    images: [
      "/images/events/past_events/halloween_2025/halloween_1.jpg",
      "/images/events/past_events/halloween_2025/halloween_2.jpg",
      "/images/events/past_events/halloween_2025/halloween_3.jpg",
      "/images/events/past_events/halloween_2025/halloween_4.jpg",
      "/images/events/past_events/halloween_2025/halloween_5.jpg",
    ]
  },
  {
    title: "Forum Fortyfive 2025",
    images: [
      "/images/events/past_events/forum_fortyfive_2025/forum_fortyfive_1.jpeg",
      "/images/events/past_events/forum_fortyfive_2025/forum_fortyfive_2.jpeg",
      "/images/events/past_events/forum_fortyfive_2025/forum_fortyfive_3.jpg",
      "/images/events/past_events/forum_fortyfive_2025/forum_fortyfive_4.jpg",
      "/images/events/past_events/forum_fortyfive_2025/forum_fortyfive_5.jpg",
    ]
  },
  {
    title: "Stadtfest 2025",
    images: [
      "/images/events/past_events/stadtfest_2025/Stadtfest_1.jpg",
      "/images/events/past_events/stadtfest_2025/Stadtfest_2.jpg",
      "/images/events/past_events/stadtfest_2025/Stadtfest_3.jpg",
      "/images/events/past_events/stadtfest_2025/Stadtfest_4.jpg",
    ]
  },
  {
    title: "Oftas 2024",
    images: [
      "/images/events/past_events/oftas_2024/oftas_1.jpg",
      "/images/events/past_events/oftas_2024/oftas_2.jpg",
      "/images/events/past_events/oftas_2024/oftas_3.jpg",
      "/images/events/past_events/oftas_2024/oftas_4.jpg",
    ]
  },
];
