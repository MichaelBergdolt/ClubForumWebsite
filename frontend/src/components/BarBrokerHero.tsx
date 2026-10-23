import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { EventConfig } from "@/data/events";

// Farben aus den BarBroker-Plakaten
const COLORS = {
  text: "#F2F4F7",
  muted: "#9AA3B2",
  grid: "#1B1F26",
  up: "#34E5A1",
  down: "#FF6B6B",
};

const EASE = [0.22, 1, 0.36, 1] as const;
const DRAW_SECONDS = 1.4;
const SCENE_MS = 6500;
const POINTS = 64;

type Scene = {
  drink: string;
  price: number;
  before: number;
  lead: string;
  punch: string;
  labelSide: "left" | "right";
  seed: number;
  // Kursverlauf: t (0..1) -> Wert (0..1)
  shape: (t: number) => number;
};

// Die fünf Motive der Plakate
const SCENES: Scene[] = [
  {
    drink: "Bier", price: 2.67, before: 4, lead: "Hochprozentige", punch: "Rendite.",
    labelSide: "right", seed: 7,
    shape: (t) => 0.92 - 0.82 * t,
  },
  {
    drink: "Shot", price: 1.11, before: 3, lead: "Schnaps auf", punch: "Schnapszahl.",
    labelSide: "right", seed: 3,
    shape: (t) => (t < 0.04 ? 0.88 + t * 2 : 0.96 - 0.86 * t + 0.07 * Math.sin(t * 9)),
  },
  {
    drink: "Aperol", price: 4.2, before: 5, lead: "Hohe", punch: "Vollatilität.",
    labelSide: "left", seed: 11,
    shape: (t) => (t < 0.84 ? 0.08 + 0.88 * Math.pow(t / 0.84, 2.4) : 0.96 - 0.86 * ((t - 0.84) / 0.16)),
  },
  {
    drink: "Pils", price: 4.51, before: 4, lead: "Stetiger", punch: "Saufwärtstrend.",
    labelSide: "left", seed: 5,
    shape: (t) => 0.06 + 0.86 * t,
  },
  {
    drink: "Wein", price: 6.7, before: 4, lead: "Nicht kaufen wenn", punch: "Alle saufen.",
    labelSide: "left", seed: 9,
    shape: (t) => (t < 0.55 ? 0.14 : 0.14 + 0.84 * Math.pow((t - 0.55) / 0.45, 1.7)),
  },
];

// Längste Headline, reserviert die Höhe, damit beim Wechsel nichts springt
const LONGEST_SCENE = SCENES[3];

const formatPrice = (value: number) => value.toFixed(2).replace(".", ",");

const changeOf = (scene: Scene) => ((scene.price - scene.before) / scene.before) * 100;

const formatChange = (pct: number) =>
  `${pct >= 0 ? "+" : "\u2212"}${Math.abs(pct).toFixed(1).replace(".", ",")}\u00A0%`;

const colorOf = (scene: Scene) => (scene.price >= scene.before ? COLORS.up : COLORS.down);

// Deterministischer Zufall, damit der Chart bei jedem Laden gleich aussieht
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildSeries = (scene: Scene) => {
  const rand = mulberry32(scene.seed);
  return Array.from({ length: POINTS }, (_, i) => {
    const t = i / (POINTS - 1);
    const noise = i === POINTS - 1 ? 0 : (rand() - 0.5) * 0.05;
    return Math.min(1, Math.max(0, scene.shape(t) + noise));
  });
};

type ChartProps = { scene: Scene; width: number; height: number; animateIn: boolean };

const Chart = ({ scene, width, height, animateIn }: ChartProps) => {
  const series = useMemo(() => buildSeries(scene), [scene]);
  const color = colorOf(scene);
  const id = `barbroker-${scene.seed}`;

  const endX = width * (width < 640 ? 0.88 : 0.83);
  const points = series.map((v, i) => [(i / (series.length - 1)) * endX, height * (0.1 + (1 - v) * 0.8)]);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${endX.toFixed(1)} ${height} L0 ${height} Z`;
  const [dotX, dotY] = points[points.length - 1];

  return (
    <motion.svg
      className="absolute inset-0"
      width={width}
      height={height}
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <motion.rect
            x={0}
            y={0}
            height={height}
            initial={{ width: animateIn ? 0 : width }}
            animate={{ width }}
            transition={{ duration: DRAW_SECONDS, ease: EASE }}
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        <path d={area} fill={`url(#${id}-fill)`} />
        <path d={line} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      </g>

      <motion.g
        initial={animateIn ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: animateIn ? DRAW_SECONDS - 0.15 : 0, duration: 0.4 }}
      >
        <circle cx={dotX} cy={dotY} r={30} fill={color} fillOpacity={0.08} />
        <circle cx={dotX} cy={dotY} r={18} fill="none" stroke={color} strokeOpacity={0.45} strokeWidth={1.5} />
        {animateIn && (
          <motion.circle
            cx={dotX}
            cy={dotY}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            initial={{ r: 8, opacity: 0 }}
            animate={{ r: [8, 34], opacity: [0.6, 0] }}
            transition={{ delay: DRAW_SECONDS + 0.2, duration: 2.2, ease: "easeOut", repeat: Infinity }}
          />
        )}
        <circle cx={dotX} cy={dotY} r={8} fill={color} />
      </motion.g>
    </motion.svg>
  );
};

// Zählt vom alten zum neuen Preis hoch bzw. runter
const PriceTicker = ({ scene, animateIn }: { scene: Scene; animateIn: boolean }) => {
  const value = useMotionValue(animateIn ? scene.before : scene.price);
  const text = useTransform(value, formatPrice);

  useEffect(() => {
    if (!animateIn) return;
    const controls = animate(value, scene.price, { duration: DRAW_SECONDS, ease: EASE });
    return () => controls.stop();
  }, [animateIn, scene, value]);

  return <motion.span>{text}</motion.span>;
};

const PriceLabel = ({ scene, animateIn }: { scene: Scene; animateIn: boolean }) => {
  const color = colorOf(scene);
  const pct = changeOf(scene);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`inline-block ${scene.labelSide === "right" ? "md:text-right" : ""}`}
    >
      <div className="flex items-baseline gap-4 md:gap-6 text-[clamp(2rem,5vw,4.5rem)] leading-none" style={{ color: COLORS.text }}>
        <span className="font-display font-bold uppercase">{scene.drink}</span>
        <span className="font-ticker font-bold">
          <PriceTicker scene={scene} animateIn={animateIn} />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-6">
        <span className="text-sm md:text-base leading-tight text-left" style={{ color: COLORS.muted }}>
          statt
          <br />
          <s className="font-ticker">{formatPrice(scene.before)}</s>
        </span>
        <span
          className="font-ticker text-sm md:text-base font-semibold rounded-full px-4 py-1.5"
          style={{ color, backgroundColor: `${color}1f` }}
        >
          {pct >= 0 ? "\u2197" : "\u2198"} {formatChange(pct)}
        </span>
      </div>
    </motion.div>
  );
};

const Headline = ({ scene, className = "" }: { scene: Scene; className?: string }) => (
  <p className={`font-display font-extrabold [font-stretch:125%] leading-[1.05] whitespace-nowrap ${className}`} style={{ color: COLORS.text }}>
    <span className="block text-[clamp(1.1rem,6vw,4.25rem)]">{scene.lead}</span>
    <span className="block text-[clamp(1.6rem,8.4vw,6rem)]">{scene.punch}</span>
  </p>
);

// Misst ein Element, damit der Chart in echten Pixeln gezeichnet wird
const useElementSize = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
};

// Wechselt alle SCENE_MS zum nächsten Motiv, solange running true ist
const useSceneRotation = (running: boolean) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SCENES.length), SCENE_MS);
    return () => window.clearTimeout(id);
  }, [running, active]);
  return [active, setActive] as const;
};

const ChartGrid = ({ width, height }: { width: number; height: number }) => (
  <svg className="absolute inset-0" width={width} height={height} aria-hidden="true">
    {[0.08, 0.28, 0.48, 0.68, 0.88].map((x) => (
      <line key={x} x1={width * x} x2={width * x} y1={height * 0.2} y2={height} stroke={COLORS.grid} />
    ))}
    {[0.2, 0.4, 0.6, 0.8, 1].map((y) => (
      <line key={y} x1={0} x2={width} y1={height * y - 0.5} y2={height * y - 0.5} stroke={COLORS.grid} />
    ))}
  </svg>
);

// Kompakte Vorschau für die Event-Karten
export const BarBrokerTeaser = () => {
  const reduceMotion = useReducedMotion();
  const animateIn = !reduceMotion;

  const [chartRef, size] = useElementSize<HTMLDivElement>();
  const inView = useInView(chartRef, { amount: 0.5 });
  const seen = useInView(chartRef, { amount: 0.5, once: true });
  const [active] = useSceneRotation(animateIn && inView);
  const scene = SCENES[active];
  const pct = changeOf(scene);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden" aria-hidden="true">
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        <img src="/images/events/upcoming_events/barbroker/barbroker_icon.png" alt="" className="h-7 w-7" />
        <span className="font-display font-extrabold [font-stretch:125%] text-lg" style={{ color: COLORS.text }}>
          BarBroker
        </span>
      </div>

      <div className="absolute left-5 top-16 z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={animateIn ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-baseline gap-3 text-2xl leading-none" style={{ color: COLORS.text }}>
              <span className="font-display font-bold uppercase">{scene.drink}</span>
              <span className="font-ticker font-bold">
                <PriceTicker scene={scene} animateIn={animateIn && seen} />
              </span>
            </div>
            <span className="mt-2 inline-block font-ticker text-xs font-semibold rounded-full px-2.5 py-1" style={{ color: colorOf(scene), backgroundColor: `${colorOf(scene)}1f` }}>
              {pct >= 0 ? "\u2197" : "\u2198"} {formatChange(pct)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div ref={chartRef} className="absolute inset-x-0 bottom-0 h-[60%]">
        {size.width > 0 && (
          <>
            <ChartGrid width={size.width} height={size.height} />
            {(seen || !animateIn) && (
              <AnimatePresence initial={false}>
                <Chart key={active} scene={scene} width={size.width} height={size.height} animateIn={animateIn} />
              </AnimatePresence>
            )}
          </>
        )}
      </div>
    </div>
  );
};

type BarBrokerHeroProps = { event: EventConfig };

const BarBrokerHero = ({ event }: BarBrokerHeroProps) => {
  const reduceMotion = useReducedMotion();
  const animateIn = !reduceMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [hovering, setHovering] = useState(false);
  const [manual, setManual] = useState(false);
  const autoplay = animateIn && inView && !hovering && !manual;
  const [active, setActive] = useSceneRotation(autoplay);
  const scene = SCENES[active];

  const [chartRef, size] = useElementSize<HTMLDivElement>();

  const dateDetail = event.eventDetails.find((d) => d.icon === "CalendarDays");
  const date = dateDetail?.value.match(/\d{1,2}\.\d{1,2}\.\d{4}/)?.[0];
  const weekday = dateDetail?.value.split(",")[0];
  const venue = event.eventDetails.find((d) => d.icon === "MapPin")?.value.split("\n")[0];
  const details = event.eventDetails.filter((d) => d.icon !== "CalendarDays");

  return (
    <section ref={sectionRef} className="relative bg-black text-white overflow-hidden py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marke */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/events/upcoming_events/barbroker/barbroker_icon.png" alt="" className="h-10 w-10 md:h-12 md:w-12" />
            <h1 className="font-display font-extrabold [font-stretch:125%] text-2xl md:text-3xl" style={{ color: COLORS.text }}>
              {event.title}
            </h1>
          </div>
          <span className="hidden sm:block font-display font-semibold [font-stretch:125%] uppercase tracking-[0.2em] text-xs md:text-sm" style={{ color: COLORS.muted }}>
            Zu Gast im Club Forum
          </span>
        </div>

        {/* Headline */}
        <p className="mt-10 md:mt-12 font-display font-semibold [font-stretch:125%] uppercase tracking-[0.2em] text-xs md:text-sm" style={{ color: COLORS.muted }}>
          Die Bar ist eine Börse
        </p>
        <div className="relative mt-3">
          <Headline scene={LONGEST_SCENE} className="invisible" />
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={animateIn ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Headline scene={scene} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Preis (mobil über dem Chart) */}
      <div className="md:hidden container mx-auto px-4 sm:px-6 mt-8 min-h-[6rem]">
        <AnimatePresence mode="wait" initial={false}>
          <PriceLabel key={active} scene={scene} animateIn={animateIn} />
        </AnimatePresence>
      </div>

      {/* Chart, randlos wie auf dem Plakat */}
      <div className="relative mt-4 md:mt-6">
        <div className="hidden md:block absolute inset-x-0 top-[12%] z-10 pointer-events-none">
          <div className={`container mx-auto px-6 lg:px-8 flex ${scene.labelSide === "right" ? "justify-end" : "justify-start"}`}>
            <AnimatePresence mode="wait" initial={false}>
              <PriceLabel key={active} scene={scene} animateIn={animateIn} />
            </AnimatePresence>
          </div>
        </div>

        <div ref={chartRef} className="relative h-[220px] sm:h-[280px] md:h-[360px]">
          {size.width > 0 && (
            <>
              <ChartGrid width={size.width} height={size.height} />
              <AnimatePresence initial={false}>
                <Chart key={active} scene={scene} width={size.width} height={size.height} animateIn={animateIn} />
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      {/* Kurszettel: wechselt automatisch, per Klick auswählbar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex md:grid md:grid-cols-5 overflow-x-auto hide-scrollbar"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {SCENES.map((s, i) => {
            const isActive = i === active;
            const color = colorOf(s);
            return (
              <button
                key={s.drink}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setManual(true);
                  setActive(i);
                }}
                className="relative flex-1 min-w-[8.5rem] text-left px-4 py-4 transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:bg-white/[0.05]"
                style={{ borderTop: `1px solid ${isActive ? color : COLORS.grid}` }}
              >
                {isActive && autoplay && (
                  <motion.span
                    key={`${active}-progress`}
                    className="absolute left-0 right-0 -top-px h-[2px] origin-left"
                    style={{ backgroundColor: color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
                  />
                )}
                <span className="block font-display font-bold uppercase text-sm tracking-wider" style={{ color: isActive ? COLORS.text : COLORS.muted }}>
                  {s.drink}
                </span>
                <span className="mt-1 flex items-baseline gap-3 font-ticker text-sm">
                  <span style={{ color: COLORS.text }}>{formatPrice(s.price)}</span>
                  <span style={{ color }}>{formatChange(changeOf(s))}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Datum, Ort, Details */}
        <div className="mt-12 md:mt-16 grid gap-10 lg:grid-cols-[auto,1fr] lg:gap-20 lg:items-end">
          <div>
            {weekday && (
              <p className="font-ticker uppercase tracking-[0.2em] text-sm" style={{ color: COLORS.muted }}>
                {weekday}
              </p>
            )}
            {date && (
              <p className="mt-2 font-ticker font-bold leading-none text-[clamp(3rem,11vw,8rem)] tracking-tight" style={{ color: COLORS.text }}>
                {date}
              </p>
            )}
            {venue && (
              <p className="mt-3 font-display font-extrabold [font-stretch:125%] uppercase leading-none text-[clamp(1.75rem,5.5vw,4rem)]" style={{ color: COLORS.text }}>
                {venue}
              </p>
            )}
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pb-2">
            {details.map((detail) => (
              <div key={detail.title} className="pt-4" style={{ borderTop: `1px solid ${COLORS.grid}` }}>
                <dt className="font-ticker uppercase tracking-[0.2em] text-xs" style={{ color: COLORS.muted }}>
                  {detail.title}
                </dt>
                <dd className="mt-2 whitespace-pre-line leading-snug" style={{ color: COLORS.text }}>
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 max-w-3xl space-y-3">
          <p className="text-lg md:text-xl font-medium" style={{ color: COLORS.text }}>
            Jeder Kauf beeinflusst die Preise an der ganzen Bar.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: COLORS.muted }}>
            {event.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BarBrokerHero;
