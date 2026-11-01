import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import type { EventConfig } from "@/data/events";

// Farben aus dem OFTAS-Flyer
const COLORS = {
  ink: "#0E0518",
  cyan: "#D9FDFF",
  green: "#25F26B",
  magenta: "#EB3BF2",
  text: "#F6F1FA",
  // Hintergrund der nächsten Sektion, damit der Übergang nahtlos ist
  next: "#030712",
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Verlauf von Grün nach Magenta wie das Datum auf dem Flyer
const GRADIENT = `linear-gradient(90deg, ${COLORS.green} 0%, #7FB6C4 45%, #A77FE0 68%, ${COLORS.magenta} 100%)`;

const gradientText = {
  backgroundImage: GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const PHOTOS = {
  drummer: "/images/events/past_events/oftas_2024/oftas_3.jpg",
  band: "/images/events/past_events/oftas_2024/oftas_1.jpg",
  friends: "/images/events/past_events/oftas_2024/oftas_2.jpg",
  group: "/images/events/past_events/oftas_2025/oftas_1.jpg",
  crowdBlue: "/images/events/past_events/oftas_2025/oftas_2.jpg",
  stage: "/images/events/past_events/oftas_2025/oftas_3.jpg",
  bar: "/images/events/past_events/oftas_2025/oftas_4.jpg",
  crowdPink: "/images/events/past_events/oftas_2025/oftas_5.jpg",
  singer: "/images/events/past_events/oftas_2025/oftas_6.jpg",
  laser: "/images/events/past_events/oftas_2025/oftas_7.jpg",
  team: "/images/events/past_events/oftas_2025/oftas_8.jpg",
  casino: "/images/events/past_events/oftas_2025/oftas_9.jpg",
  beerpong: "/images/events/past_events/oftas_2025/oftas_10.jpg",
  crowdPurple: "/images/events/past_events/oftas_2025/oftas_11.jpg",
};

// "Noch 56 Tage", "Morgen geht's los" ...
const useDaysLeft = (startsAt?: string) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!startsAt) return;
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, [startsAt]);

  if (!startsAt) return null;
  const start = new Date(startsAt);
  if (now >= start) return "Die OFTAS laufen";

  const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((day(start) - day(now)) / 86_400_000);
  if (days <= 0) return "Heute geht's los";
  if (days === 1) return "Morgen geht's los";
  return `Noch ${days} Tage`;
};

const Details = ({ event, className = "" }: { event: EventConfig; className?: string }) => (
  <dl className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 text-left ${className}`}>
    {event.eventDetails.map((detail) => (
      <div key={detail.title} className="pt-4" style={{ borderTop: `1px solid ${COLORS.magenta}66` }}>
        <dt className="font-poster uppercase tracking-[0.2em] text-xs" style={{ color: COLORS.magenta }}>
          {detail.title}
        </dt>
        <dd className="mt-2 whitespace-pre-line leading-snug" style={{ color: COLORS.text }}>
          {detail.value}
        </dd>
      </div>
    ))}
  </dl>
);

// Fotowand: Die letzten OFTAS laufen durch den riesigen Schriftzug

const WALL_ROWS = [
  { images: [PHOTOS.laser, PHOTOS.stage, PHOTOS.crowdPink, PHOTOS.casino, PHOTOS.singer], duration: 90, reverse: false },
  { images: [PHOTOS.drummer, PHOTOS.crowdBlue, PHOTOS.band, PHOTOS.crowdPurple, PHOTOS.beerpong], duration: 110, reverse: true },
  { images: [PHOTOS.stage, PHOTOS.beerpong, PHOTOS.crowdPink, PHOTOS.band, PHOTOS.laser], duration: 100, reverse: false },
];

const GALLERY = [
  PHOTOS.group, PHOTOS.crowdBlue, PHOTOS.stage, PHOTOS.bar, PHOTOS.crowdPink, PHOTOS.singer, PHOTOS.laser,
  PHOTOS.team, PHOTOS.casino, PHOTOS.beerpong, PHOTOS.crowdPurple, PHOTOS.band, PHOTOS.friends, PHOTOS.drummer,
];

const TITLE_SIZE = "min(21vw, 400px)";

const PhotoWall = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 flex flex-col gap-2 overflow-hidden" style={{ filter: "brightness(1.3) saturate(1.15)" }} aria-hidden="true">
      {WALL_ROWS.map((row, i) => (
        <motion.div
          key={row.duration}
          className={`flex w-max gap-2 pr-2 ${i === 0 ? "flex-none" : "flex-1 min-h-0"}`}
          // Die erste Reihe reicht bis unter den Schriftzug, damit er komplett durch Fotos läuft
          style={i === 0 ? { height: `calc(7.5rem + ${TITLE_SIZE})` } : undefined}
          animate={reduceMotion ? undefined : { x: row.reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration: row.duration, repeat: Infinity, ease: "linear" }}
        >
          {[...row.images, ...row.images].map((src, j) => (
            <img key={`${src}-${j}`} src={src} alt="" className="aspect-[4/3] h-full w-auto max-w-none object-cover" />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const OftasHero = ({ event }: { event: EventConfig }) => {
  const reduceMotion = useReducedMotion();
  const daysLeft = useDaysLeft(event.startsAt);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden" style={{ backgroundColor: COLORS.ink }}>
      <PhotoWall />
      {/* Multiply: Die Fläche dunkelt die Fotos ab, nur im weißen Schriftzug bleiben sie hell */}
      <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: "#35244D" }} aria-hidden="true">
        <p className="absolute inset-x-0 top-24 md:top-28 text-center font-poster leading-none text-white" style={{ fontSize: TITLE_SIZE }}>
          OFTAS
        </p>
      </div>
      {/* Feine Kontur, damit der Schriftzug auch über dunklen Fotos lesbar bleibt */}
      <p
        className="absolute inset-x-0 top-24 md:top-28 text-center font-poster leading-none"
        style={{
          fontSize: TITLE_SIZE,
          color: "transparent",
          WebkitTextStroke: `0.006em ${COLORS.cyan}`,
          filter: `drop-shadow(0 0 0.06em ${COLORS.magenta})`,
        }}
        aria-hidden="true"
      >
        OFTAS
      </p>
      {/* Unter dem Schriftzug werden die Fotos zum ruhigen Hintergrund für den Text */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          top: `calc(7.5rem + ${TITLE_SIZE})`,
          background: `linear-gradient(180deg, ${COLORS.ink}99 0%, ${COLORS.ink}D9 45%, ${COLORS.next} 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <h1 aria-label={event.title} className="pt-12 md:pt-16 h-24 md:h-28 text-center font-poster uppercase leading-none text-xl md:text-3xl" style={{ color: COLORS.text }}>
          <span aria-hidden="true">Die Club Forum</span>
        </h1>
        {/* Platz für den Schriftzug aus der Ebene dahinter */}
        <div style={{ height: TITLE_SIZE }} aria-hidden="true" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <div className="mt-10 md:mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className="font-poster leading-none text-[clamp(2.25rem,6.5vw,5.5rem)]">
                <span className="inline-block" style={gradientText}>
                  27 - 29. Dez
                </span>
              </p>
              {daysLeft && (
                <p className="mt-3 font-poster text-xl md:text-2xl" style={{ color: COLORS.text }}>
                  {daysLeft}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="rounded-lg px-6 py-3 font-semibold transition-colors hover:bg-white/20 ring-1 ring-white/40 bg-black/40 backdrop-blur-sm"
              style={{ color: COLORS.text }}
            >
              Bilder der letzten OFTAS ansehen
            </button>
          </div>

          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed" style={{ color: COLORS.text }}>
            {event.description}
          </p>
          <Details event={event} className="mt-10 md:mt-12" />
        </motion.div>
      </div>

      <Lightbox open={galleryOpen} close={() => setGalleryOpen(false)} slides={GALLERY.map((src) => ({ src }))} />
    </section>
  );
};

export default OftasHero;
