import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { EventConfig } from "@/data/events";

// Farben aus dem Turnier-Flyer
const COLORS = {
  red: "#E5262B",
  cyan: "#38D6EB",
  green: "#3BE36B",
  ink: "#0A0A0C",
  text: "#F5F5F5",
  muted: "#A3A3A3",
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Roter Schriftzug mit versetztem Cyan-Schatten wie auf dem Flyer
const titleStyle = {
  color: COLORS.red,
  textShadow: `0.045em 0.035em 0 ${COLORS.cyan}`,
} as const;

const checkerStyle = {
  background: `repeating-conic-gradient(${COLORS.text} 0 25%, ${COLORS.ink} 0 50%) 0 0 / 16px 16px`,
} as const;

const CheckerStrip = ({ className = "" }: { className?: string }) => (
  <div className={`h-4 w-full opacity-90 ${className}`} style={checkerStyle} aria-hidden="true" />
);

// Ampel-Phasen: 0 aus, 1-4 rote Lampen an, 5 grün
const LIGHTS = 4;
const GREEN = LIGHTS + 1;

const useStartLights = (active: boolean, loop: boolean) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(reduceMotion ? GREEN : 0);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(GREEN);
      return;
    }
    if (!active) return;
    if (phase === GREEN && !loop) return;
    const delay = phase === GREEN ? 2600 : phase === LIGHTS ? 900 : 600;
    const id = window.setTimeout(() => setPhase((p) => (p === GREEN ? 0 : p + 1)), delay);
    return () => window.clearTimeout(id);
  }, [active, loop, phase, reduceMotion]);

  return phase;
};

const StartLights = ({ phase, size = "md" }: { phase: number; size?: "sm" | "md" }) => {
  const lamp = size === "sm" ? "h-4 w-4" : "h-6 w-6 md:h-7 md:w-7";
  return (
    <div className="inline-flex items-center gap-2 md:gap-2.5 rounded-full bg-black/80 px-3 py-2 ring-1 ring-white/10" aria-hidden="true">
      {Array.from({ length: LIGHTS }, (_, i) => {
        const on = phase === GREEN ? COLORS.green : i < phase ? COLORS.red : null;
        return (
          <span
            key={i}
            className={`${lamp} rounded-full transition-all duration-150`}
            style={{
              backgroundColor: on ?? "#1F1F23",
              boxShadow: on ? `0 0 14px ${on}, inset 0 0 4px rgba(255,255,255,0.5)` : "inset 0 1px 2px rgba(0,0,0,0.8)",
            }}
          />
        );
      })}
    </div>
  );
};

// Fahrtwind im Hintergrund, feste Werte damit es ruhig und gleichmäßig wirkt
const STREAKS = [
  { top: 12, width: 180, duration: 2.4, delay: 0 },
  { top: 24, width: 90, duration: 1.8, delay: 0.9 },
  { top: 37, width: 240, duration: 2.8, delay: 0.4 },
  { top: 51, width: 120, duration: 2.1, delay: 1.5 },
  { top: 63, width: 200, duration: 2.6, delay: 0.2 },
  { top: 74, width: 70, duration: 1.6, delay: 1.1 },
  { top: 86, width: 160, duration: 2.3, delay: 0.7 },
];

const SpeedLines = () => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {STREAKS.map((s) => (
        <motion.span
          key={s.top}
          className="absolute right-0 h-px"
          style={{ top: `${s.top}%`, width: s.width, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18))" }}
          initial={{ x: "100vw" }}
          animate={{ x: "-110vw" }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
        />
      ))}
    </div>
  );
};

const useCountdown = (target?: string) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return target ? new Date(target).getTime() - now : null;
};

const Countdown = ({ target }: { target?: string }) => {
  const diff = useCountdown(target);
  if (diff === null) return null;

  if (diff <= 0) {
    return (
      <p className="font-hand text-3xl md:text-4xl" style={{ color: COLORS.green }}>
        Das Rennen läuft!
      </p>
    );
  }

  const seconds = Math.floor(diff / 1000);
  const parts = [
    { label: "Tage", value: Math.floor(seconds / 86400) },
    { label: "Std", value: Math.floor((seconds % 86400) / 3600) },
    { label: "Min", value: Math.floor((seconds % 3600) / 60) },
    { label: "Sek", value: seconds % 60 },
  ];

  return (
    <div>
      <p className="font-hand uppercase text-lg tracking-wide" style={{ color: COLORS.muted }}>
        Start in
      </p>
      <div className="mt-2 flex gap-3 md:gap-4">
        {parts.map((part) => (
          <div key={part.label} className="min-w-[4rem] rounded-lg bg-black/70 ring-1 ring-white/10 px-3 py-2 text-center">
            <span className="block font-ticker font-bold text-2xl md:text-3xl tabular-nums" style={{ color: COLORS.text }}>
              {String(part.value).padStart(2, "0")}
            </span>
            <span className="block text-xs uppercase tracking-wider" style={{ color: COLORS.muted }}>
              {part.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Glow = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    aria-hidden="true"
    style={{
      background: `radial-gradient(60% 50% at 10% 0%, ${COLORS.red}33, transparent 70%), radial-gradient(50% 45% at 95% 100%, ${COLORS.cyan}22, transparent 70%)`,
    }}
  />
);

type MarioKartHeroProps = { event: EventConfig };

const MarioKartHero = ({ event }: MarioKartHeroProps) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const seen = useInView(sectionRef, { amount: 0.3, once: true });
  const phase = useStartLights(seen, false);

  return (
    <section ref={sectionRef} className="relative overflow-hidden text-white" style={{ backgroundColor: COLORS.ink }}>
      <CheckerStrip />
      <Glow />
      <SpeedLines />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="flex items-center gap-4">
          <StartLights phase={phase} />
          <span
            className="font-hand text-2xl md:text-3xl transition-opacity duration-300"
            style={{ color: COLORS.green, opacity: phase === GREEN ? 1 : 0 }}
            aria-hidden="true"
          >
            GO!
          </span>
        </div>

        <p className="mt-8 font-hand uppercase text-xl md:text-2xl tracking-wide" style={{ color: COLORS.muted }}>
          Club Forum präsentiert
        </p>
        <motion.h1
          className="mt-2 font-display font-black italic [font-stretch:125%] uppercase leading-[0.95]"
          initial={reduceMotion ? false : { opacity: 0, x: -40 }}
          animate={seen ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="block text-[clamp(2.1rem,9.5vw,7.5rem)]" style={titleStyle}>
            Mario Kart
          </span>
          <span className="block text-[clamp(2.5rem,13vw,11rem)]" style={titleStyle}>
            Turnier
          </span>
        </motion.h1>

        <div className="mt-10 md:mt-12 grid gap-10 md:grid-cols-2 md:items-end">
          <p className="text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: COLORS.text }}>
            {event.description}
          </p>
          <div className="md:justify-self-end">
            <Countdown target={event.startsAt} />
          </div>
        </div>
      </div>

      {/* Schwarzes Infoband wie auf dem Flyer */}
      <div className="relative mt-12 md:mt-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {event.eventDetails.map((detail) => (
              <div key={detail.title}>
                <dt className="text-xs uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>
                  {detail.title}
                </dt>
                <dd className="mt-1 font-hand uppercase text-2xl leading-tight whitespace-pre-line flex items-start gap-2" style={{ color: COLORS.text }}>
                  {detail.icon === "MapPin" && <MapPin className="h-6 w-6 mt-0.5 flex-shrink-0" />}
                  <span>{detail.value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="text-sm" style={{ color: COLORS.muted }}>
          In Kooperation mit
        </span>
        <img src="/images/Logo_Kirche_BB.png" alt="Evangelische Kirche Böblingen" className="h-8 md:h-10 w-auto opacity-80" />
      </div>

      <CheckerStrip />
    </section>
  );
};

// Kompakte Vorschau für die Event-Karten
export const MarioKartTeaser = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const phase = useStartLights(inView, true);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ backgroundColor: COLORS.ink }} aria-hidden="true">
      <Glow />
      <div className="absolute left-5 top-5">
        <StartLights phase={phase} size="sm" />
      </div>
      <div className="absolute left-5 right-5 bottom-9 font-display font-black italic [font-stretch:125%] uppercase leading-[0.95]">
        <span className="block text-3xl" style={titleStyle}>
          Mario Kart
        </span>
        <span className="block text-5xl" style={titleStyle}>
          Turnier
        </span>
      </div>
      <CheckerStrip className="absolute bottom-0 left-0" />
    </div>
  );
};

export default MarioKartHero;
