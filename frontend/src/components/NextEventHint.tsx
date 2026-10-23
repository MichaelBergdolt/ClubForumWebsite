import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { nextEvent, nextEventIsUpcoming, type EventConfig } from "@/data/events";

// Signalfarbe passend zum jeweiligen Hero auf der Events-Seite
const HERO_COLORS: Record<NonNullable<EventConfig["hero"]>, string> = {
  halloween: "#FF5A3D",
  mariokart: "#E5262B",
  barbroker: "#34E5A1",
};

const dotColor = (event: EventConfig) =>
  event.hero ? HERO_COLORS[event.hero] : event.accentColor ? `hsl(${event.accentColor.primary})` : "hsl(var(--accent-primary))";

// "Samstag, 31.10.2026" -> "Sa, 31.10.", alles andere bleibt wie es ist
const shortDate = (event: EventConfig) => {
  const value = event.eventDetails.find((detail) => detail.icon === "CalendarDays")?.value;
  if (!value) return null;
  const match = value.match(/^(\p{L}{2})\p{L}*, (\d{2}\.\d{2}\.)\d{4}$/u);
  return match ? `${match[1]}, ${match[2]}` : value;
};

const NextEventHint = () => {
  if (!nextEventIsUpcoming) return null;

  const color = dotColor(nextEvent);
  const date = shortDate(nextEvent);

  return (
    <Link
      to="/events"
      className="group inline-flex items-center gap-2.5 rounded-full bg-black/45 backdrop-blur-sm px-4 py-2 text-sm text-white ring-1 ring-white/15 transition-colors hover:bg-black/60 hover:ring-white/30"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping" style={{ backgroundColor: color }} />
        <span className="relative h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      </span>
      <span className="hidden sm:inline text-gray-300">Nächstes Event</span>
      <span className="font-semibold">{nextEvent.title}</span>
      {date && (
        <>
          <span className="text-gray-500" aria-hidden="true">·</span>
          <span className="text-gray-300">{date}</span>
        </>
      )}
      <ArrowRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
};

export default NextEventHint;
