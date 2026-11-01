import { useEffect, useState, type ComponentType } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import type { EventConfig } from "@/data/events";

// Farben aus dem OFTAS-Flyer
const COLORS = {
  ink: "#0E0518",
  plum: "#34104A",
  cyan: "#D9FDFF",
  cyanGlow: "#19D3E6",
  green: "#25F26B",
  magenta: "#EB3BF2",
  pink: "#FF5BD1",
  blue: "#6C8CFF",
  text: "#F6F1FA",
  muted: "#BBADC9",
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

// ---------------------------------------------------------------------------
// Vorschlag A: Leuchtreklame. Der Flyer als Neonschild, das beim Laden angeht.
// ---------------------------------------------------------------------------

// Leuchtröhren im Hintergrund, die viewBox wird auf die ganze Sektion gestreckt
const TUBES = [
  { x1: -40, y1: 300, x2: 370, y2: 30, color: COLORS.pink, delay: 0.1 },
  { x1: 20, y1: 118, x2: 190, y2: 58, color: COLORS.pink, delay: 0.5 },
  { x1: -20, y1: 560, x2: 170, y2: 480, color: COLORS.pink, delay: 0.8 },
  { x1: 70, y1: -10, x2: 70, y2: 910, color: COLORS.magenta, delay: 0.3 },
  { x1: 1400, y1: -10, x2: 1400, y2: 300, color: COLORS.magenta, delay: 0.6 },
  { x1: 1400, y1: 420, x2: 1400, y2: 910, color: COLORS.green, delay: 1 },
  { x1: 1250, y1: -10, x2: 1640, y2: 640, color: COLORS.blue, delay: 0.2 },
  { x1: 1380, y1: -10, x2: 1640, y2: 420, color: COLORS.blue, delay: 0.7 },
];

const NeonTubes = () => {
  const reduceMotion = useReducedMotion();
  return (
    // Auf dem Handy nur hinter dem Schriftzug, damit der Text darunter lesbar bleibt
    <svg
      className="absolute inset-x-0 top-0 h-[24rem] w-full opacity-60 [mask-image:linear-gradient(black_65%,transparent)] md:h-full md:opacity-100 md:[mask-image:none]"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {TUBES.map((tube) => (
        <motion.g
          key={`${tube.x1}-${tube.y1}`}
          style={{ filter: `drop-shadow(0 0 7px ${tube.color}) drop-shadow(0 0 18px ${tube.color})` }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0.9, 0.1, 1, 0.3, 0.85] }}
          transition={{ duration: 0.8, delay: tube.delay, times: [0, 0.2, 0.35, 0.55, 0.7, 1] }}
        >
          <line x1={tube.x1} y1={tube.y1} x2={tube.x2} y2={tube.y2} stroke={tube.color} strokeWidth={9} vectorEffect="non-scaling-stroke" />
          <line x1={tube.x1} y1={tube.y1} x2={tube.x2} y2={tube.y2} stroke="#FFF" strokeOpacity={0.8} strokeWidth={3} vectorEffect="non-scaling-stroke" />
        </motion.g>
      ))}
    </svg>
  );
};

// Zwei Konturen übereinander ergeben die doppelte Linie der Leuchtröhre
const NeonLetter = ({ char, index }: { char: string; index: number }) => {
  const reduceMotion = useReducedMotion();
  // Das A hat einen Wackelkontakt
  const faulty = char === "A";
  return (
    <motion.span
      className="relative inline-block"
      initial={reduceMotion ? false : { opacity: 0.08 }}
      animate={reduceMotion ? undefined : { opacity: [0.08, 1, 0.15, 1, 0.3, 1] }}
      transition={{
        duration: 0.9,
        delay: 0.5 + index * 0.22,
        times: [0, 0.15, 0.3, 0.5, 0.65, 1],
        ...(faulty ? { repeat: Infinity, repeatDelay: 7 } : {}),
      }}
    >
      <span
        style={{
          color: "transparent",
          WebkitTextStroke: `0.05em ${COLORS.cyan}`,
          filter: `drop-shadow(0 0 0.05em ${COLORS.cyanGlow}) drop-shadow(0 0 0.2em ${COLORS.cyanGlow})`,
        }}
      >
        {char}
      </span>
      <span className="absolute inset-0" style={{ color: "transparent", WebkitTextStroke: `0.016em ${COLORS.plum}` }}>
        {char}
      </span>
    </motion.span>
  );
};

// Die Echos unter dem Schriftzug wie auf dem Flyer
const NEON_ECHOES = [0.2, 0.34, 0.48, 0.62];

const NeonVariant = ({ event }: { event: EventConfig }) => {
  const reduceMotion = useReducedMotion();
  const daysLeft = useDaysLeft(event.startsAt);

  return (
    <section className="relative overflow-hidden text-center" style={{ backgroundColor: COLORS.ink }}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(70% 70% at 50% 40%, ${COLORS.plum} 0%, #1B0729 55%, ${COLORS.ink} 100%)` }}
        aria-hidden="true"
      />
      {/* Schräge Schrift an der Wand wie auf dem Flyer */}
      <div className="absolute inset-0 hidden xl:block overflow-hidden pointer-events-none font-poster uppercase select-none text-6xl" style={{ color: `${COLORS.magenta}2E` }} aria-hidden="true">
        <span className="absolute left-[7%] top-[52%] -rotate-[58deg] origin-left whitespace-nowrap">Beer Pong</span>
        <span className="absolute right-[1%] top-[12%] rotate-[58deg] origin-right whitespace-nowrap">Party</span>
      </div>
      <NeonTubes />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(180deg, transparent, ${COLORS.next})` }} aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-16 md:pb-20">
        <h1 aria-label={event.title}>
          <motion.span
            className="block font-poster uppercase leading-none text-[clamp(1.6rem,5.6vw,5rem)]"
            style={{ color: COLORS.text }}
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Die Club Forum
          </motion.span>
          <span
            className="relative mt-2 mb-[0.62em] inline-block font-poster leading-none text-[clamp(4.6rem,20vw,17rem)]"
            aria-hidden="true"
          >
            {NEON_ECHOES.map((offset, i) => (
              <span
                key={offset}
                className="absolute inset-0"
                style={{
                  transform: `translateY(${offset}em)`,
                  clipPath: "inset(70% 0 0 0)",
                  color: "transparent",
                  WebkitTextStroke: `0.007em rgba(255,255,255,${0.75 - i * 0.17})`,
                }}
              >
                OFTAS
              </span>
            ))}
            {"OFTAS".split("").map((char, i) => (
              <NeonLetter key={char} char={char} index={i} />
            ))}
          </span>
        </h1>

        <p className="font-poster leading-none text-[clamp(2.5rem,10.5vw,8.5rem)]">
          <span className="inline-block" style={gradientText}>
            27 - 29. Dez
          </span>
        </p>
        <p className="mt-3 font-poster uppercase leading-tight text-[clamp(1.05rem,4vw,3.25rem)]">
          <span className="inline-block" style={gradientText}>
            Ev. Waldheim Tannenberg
          </span>
        </p>
        <p className="mt-2 font-poster uppercase tracking-wide text-xs md:text-lg" style={{ color: COLORS.magenta }}>
          Murkenbachweg 120 | 71032 Böblingen
        </p>

        <p className="mt-10 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed" style={{ color: COLORS.text }}>
          {event.description}
        </p>
        {daysLeft && (
          <p className="mt-6 font-poster text-3xl md:text-4xl" style={{ color: COLORS.green, textShadow: `0 0 22px ${COLORS.green}80` }}>
            {daysLeft}
          </p>
        )}

        <Details event={event} className="mt-12 mx-auto max-w-5xl" />
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Vorschlag B: Drei Nächte. Jede Nacht ein Panel, der Flyer-Verlauf läuft drüber.
// ---------------------------------------------------------------------------

const NIGHTS = [
  { day: "27", weekday: "Sonntag", color: COLORS.green, image: PHOTOS.drummer, position: "50% 35%" },
  { day: "28", weekday: "Montag", color: "#8FA8F5", image: PHOTOS.laser, position: "50% 40%" },
  { day: "29", weekday: "Dienstag", color: COLORS.magenta, image: PHOTOS.crowdPink, position: "50% 50%" },
];

const NightsVariant = ({ event }: { event: EventConfig }) => {
  const reduceMotion = useReducedMotion();
  const daysLeft = useDaysLeft(event.startsAt);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.ink }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(80% 60% at 15% 0%, ${COLORS.plum} 0%, ${COLORS.ink} 70%)` }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(180deg, transparent, ${COLORS.next})` }} aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-16 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h1 aria-label={event.title} className="font-poster leading-none">
            <span className="block uppercase text-[clamp(1.1rem,2.6vw,2.25rem)]" style={{ color: COLORS.text }} aria-hidden="true">
              Die Club Forum
            </span>
            <span className="mt-1 inline-block text-[clamp(4rem,15vw,11.5rem)]" style={gradientText} aria-hidden="true">
              OFTAS
            </span>
          </h1>
          <div className="pb-2 md:text-right">
            {daysLeft && (
              <p className="font-poster text-2xl md:text-4xl" style={{ color: COLORS.text }}>
                {daysLeft}
              </p>
            )}
            <p className="mt-1 uppercase tracking-[0.2em] text-xs md:text-sm" style={{ color: COLORS.muted }}>
              27. – 29. Dezember · Waldheim Tannenberg
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row gap-3 md:h-[min(62vh,560px)]">
          {NIGHTS.map((night, i) => (
            <motion.article
              key={night.day}
              className="group relative h-52 md:h-auto min-w-0 overflow-hidden rounded-xl md:flex-1 md:hover:flex-[1.7] transition-[flex-grow] duration-700 ease-out ring-1 ring-white/10"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: EASE }}
            >
              <img
                src={night.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ objectPosition: night.position }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, ${COLORS.ink}33 0%, ${COLORS.ink}40 40%, ${COLORS.ink}F2 100%)` }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: night.color, boxShadow: `0 0 18px ${night.color}` }} aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="font-poster leading-none text-[clamp(4.5rem,9vw,8rem)]" style={{ color: night.color, textShadow: `0 0 34px ${night.color}80` }}>
                  {night.day}
                </p>
                <p className="mt-2 font-poster uppercase text-lg md:text-xl" style={{ color: COLORS.text }}>
                  {night.weekday}
                </p>
                <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                  Programm folgt
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 md:mt-12 max-w-3xl text-lg md:text-xl leading-relaxed" style={{ color: COLORS.text }}>
          {event.description}
        </p>
        <Details event={event} className="mt-10" />
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Vorschlag C: Fotowand. Die letzten OFTAS laufen durch den riesigen Schriftzug.
// ---------------------------------------------------------------------------

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

const WallVariant = ({ event }: { event: EventConfig }) => {
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

// ---------------------------------------------------------------------------
// Auswahl der Vorschläge, nur solange noch keiner feststeht
// ---------------------------------------------------------------------------

const VARIANTS: { key: string; label: string; Hero: ComponentType<{ event: EventConfig }> }[] = [
  { key: "neon", label: "A Leuchtreklame", Hero: NeonVariant },
  { key: "naechte", label: "B Drei Nächte", Hero: NightsVariant },
  { key: "fotowand", label: "C Fotowand", Hero: WallVariant },
];

const OftasHero = ({ event }: { event: EventConfig }) => {
  const [params, setParams] = useSearchParams();
  const active = VARIANTS.find((variant) => variant.key === params.get("variante")) ?? VARIANTS[0];

  return (
    <>
      <active.Hero event={event} />
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-black/85 p-1 ring-1 ring-white/20 backdrop-blur">
          {VARIANTS.map((variant) => (
            <button
              key={variant.key}
              type="button"
              onClick={() =>
                setParams(
                  (prev) => {
                    prev.set("variante", variant.key);
                    return prev;
                  },
                  { replace: true, preventScrollReset: true },
                )
              }
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                variant.key === active.key ? "bg-white text-black" : "text-white hover:bg-white/15"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default OftasHero;
