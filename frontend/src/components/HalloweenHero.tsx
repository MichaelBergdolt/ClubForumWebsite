import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EventConfig } from "@/data/events";

const COLORS = {
  night: "#07060A",
  bone: "#F3EAD8",
  blood: "#C1121F",
  ember: "#FF5A3D",
  flame: "#FFB347",
  muted: "#B9AFA3",
  // Hintergrund der nächsten Sektion, damit der Übergang nahtlos ist
  next: "#030712",
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Der Mond geht beim Laden langsam auf
const Moon = () => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute -right-24 -top-10 sm:right-[2%] sm:top-[6%] h-[300px] w-[300px] md:h-[420px] md:w-[420px] lg:h-[460px] lg:w-[460px] pointer-events-none"
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.4, ease: EASE }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: [
            "radial-gradient(circle at 62% 38%, rgba(70,8,8,0.22) 0, transparent 9%)",
            "radial-gradient(circle at 40% 64%, rgba(70,8,8,0.18) 0, transparent 13%)",
            "radial-gradient(circle at 72% 70%, rgba(70,8,8,0.16) 0, transparent 7%)",
            "radial-gradient(circle at 35% 32%, #FF8A50 0%, #E0302A 38%, #8F1414 72%, #3D0707 100%)",
          ].join(", "),
          boxShadow: "0 0 120px 30px rgba(224,48,42,0.35), 0 0 300px 80px rgba(193,18,31,0.18)",
        }}
      />
      {/* Kahler Ast vor dem Mond */}
      <svg className="absolute inset-0 h-full w-full -scale-x-100 overflow-visible" viewBox="0 0 100 100" fill="none" stroke={COLORS.night} strokeLinecap="round">
        <path d="M-10 78 C 12 72, 26 66, 40 58" strokeWidth={3.2} />
        <path d="M40 58 C 52 52, 60 50, 74 52" strokeWidth={2} />
        <path d="M24 69 C 26 60, 22 54, 26 46" strokeWidth={1.6} />
        <path d="M26 46 C 28 42, 32 40, 34 36" strokeWidth={0.9} />
        <path d="M48 54 C 54 46, 52 40, 58 34" strokeWidth={1.2} />
        <path d="M58 34 C 60 31, 64 30, 66 27" strokeWidth={0.7} />
        <path d="M64 51 C 70 56, 76 56, 82 62" strokeWidth={1} />
        <path d="M33 62 C 36 66, 40 66, 42 70" strokeWidth={0.8} />
      </svg>
    </motion.div>
  );
};

// Schwebende Kerzen wie die Deko im Forum; depth 0 = nah, 2 = fern
const CANDLES = [
  { left: 6, top: 6, scale: 1, depth: 0, duration: 5.2 },
  { left: 19, top: 2, scale: 0.7, depth: 1, duration: 6.4 },
  { left: 33, top: 10, scale: 0.85, depth: 0, duration: 4.8 },
  { left: 47, top: 3, scale: 0.55, depth: 2, duration: 7 },
  { left: 60, top: 12, scale: 0.75, depth: 1, duration: 5.8 },
  { left: 76, top: 4, scale: 0.6, depth: 2, duration: 6.8 },
  { left: 91, top: 14, scale: 0.9, depth: 0, duration: 5.5 },
];

const Candle = ({ candle }: { candle: (typeof CANDLES)[number] }) => {
  const reduceMotion = useReducedMotion();
  const far = candle.depth > 0;
  return (
    <motion.div
      className={`absolute ${candle.depth === 2 ? "hidden md:block" : ""}`}
      style={{
        left: `${candle.left}%`,
        top: `${candle.top}%`,
        scale: candle.scale,
        opacity: far ? 0.55 : 0.9,
        filter: candle.depth === 2 ? "blur(1px)" : undefined,
      }}
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: candle.duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Lichtschein */}
      <div
        className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{ background: `radial-gradient(circle, ${COLORS.flame}40 0%, transparent 65%)` }}
      />
      {/* Flamme */}
      <motion.div
        className="relative mx-auto h-4 w-2 origin-bottom rounded-[50%_50%_50%_50%/60%_60%_40%_40%]"
        style={{ background: `radial-gradient(ellipse at 50% 70%, #FFF5D6 0%, ${COLORS.flame} 55%, ${COLORS.ember} 100%)` }}
        animate={reduceMotion ? undefined : { scaleY: [1, 1.2, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
        transition={{ duration: 1.6 + candle.duration / 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Docht und Kerze */}
      <div className="mx-auto h-1 w-px bg-black/70" />
      <div
        className="mx-auto h-14 w-3 rounded-t-sm"
        style={{ background: "linear-gradient(90deg, #CFC6B4 0%, #F6F0E2 45%, #BDB4A2 100%)" }}
      />
    </motion.div>
  );
};

const BAT_PATH =
  "M32 10 C30 6 28 5 27 7 C25 4 20 3 14 6 C10 3 5 4 0 9 C6 9 9 12 10 16 C13 13 17 13 19 16 C22 13 26 13 28 17 L32 22 L36 17 C38 13 42 13 45 16 C47 13 51 13 54 16 C55 12 58 9 64 9 C59 4 54 3 50 6 C44 3 39 4 37 7 C36 5 34 6 32 10 Z";

const BATS = [
  { top: 18, size: 44, duration: 9, delay: 1.5, repeatDelay: 7 },
  { top: 30, size: 28, duration: 11, delay: 4, repeatDelay: 9 },
  { top: 12, size: 22, duration: 13, delay: 7, repeatDelay: 11 },
];

const Bats = () => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BATS.map((bat) => (
        <motion.div
          key={bat.top}
          className="absolute left-0"
          style={{ top: `${bat.top}%` }}
          initial={{ x: "110vw", y: 0 }}
          animate={{ x: "-15vw", y: [0, -40, 10, -25, 0] }}
          transition={{ duration: bat.duration, delay: bat.delay, repeat: Infinity, repeatDelay: bat.repeatDelay, ease: "linear" }}
        >
          <motion.svg
            width={bat.size}
            height={bat.size / 2}
            viewBox="0 0 64 32"
            animate={{ scaleY: [1, 0.35, 1] }}
            transition={{ duration: 0.28, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={BAT_PATH} fill="#000" />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
};

// Zwei Nebelschichten, die sich gegeneinander verschieben
const fogLayer = (alpha: number) =>
  [10, 32, 46, 60, 82, 96]
    .map((x, i) => `radial-gradient(ellipse 22% 60% at ${x}% ${80 + (i % 3) * 6}%, rgba(214,206,226,${alpha}), transparent 70%)`)
    .join(", ");

const Fog = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute bottom-0 left-0 h-full w-[200%]"
        style={{ background: fogLayer(0.09) }}
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-full w-[200%]"
        style={{ background: fogLayer(0.06) }}
        animate={reduceMotion ? undefined : { x: ["-50%", "0%"] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// "Noch 8 Nächte", "Morgen Nacht", "Heute Nacht" ...
const useNightsLeft = (startsAt?: string) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!startsAt) return;
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, [startsAt]);

  if (!startsAt) return null;
  const start = new Date(startsAt);
  if (now >= start) return "Die Nacht hat begonnen";

  const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const nights = Math.round((day(start) - day(now)) / 86_400_000);
  if (nights <= 0) return "Heute Nacht";
  if (nights === 1) return "Morgen Nacht";
  return `Noch ${nights} Nächte`;
};

type HalloweenHeroProps = { event: EventConfig };

const HalloweenHero = ({ event }: HalloweenHeroProps) => {
  const reduceMotion = useReducedMotion();
  const nightsLeft = useNightsLeft(event.startsAt);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.night }}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(90% 70% at 80% 10%, #2A0A0E 0%, ${COLORS.night} 60%)` }}
        aria-hidden="true"
      />
      <Moon />
      <Bats />
      <Fog />
      {/* Lesbarkeit links und weicher Übergang zur nächsten Sektion */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(90deg, ${COLORS.night}E6 0%, ${COLORS.night}80 45%, transparent 75%), linear-gradient(180deg, transparent 70%, ${COLORS.next} 100%)`,
        }}
      />

      <div className="absolute inset-x-0 top-0 h-36 md:h-52 pointer-events-none" aria-hidden="true">
        {CANDLES.map((candle) => (
          <Candle key={candle.left} candle={candle} />
        ))}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-40 md:pt-48 pb-16 md:pb-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
        >
          <p className="font-spooky uppercase tracking-[0.35em] text-xs md:text-sm" style={{ color: COLORS.ember }}>
            Club Forum · 31. Oktober
          </p>
          <h1
            className="mt-4 font-spooky font-black leading-none text-[clamp(3.25rem,13vw,9rem)]"
            style={{ color: COLORS.bone, textShadow: `0 0 40px ${COLORS.blood}80, 0 0 80px ${COLORS.blood}40` }}
          >
            {event.title}
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light" style={{ color: COLORS.bone }}>
            Die gruseligste Nacht des Jahres.
          </p>
        </motion.div>

        {nightsLeft && (
          <motion.p
            className="mt-10 font-spooky font-bold text-3xl md:text-5xl"
            style={{ color: COLORS.ember, textShadow: `0 0 24px ${COLORS.blood}` }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            {nightsLeft}
          </motion.p>
        )}

        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: COLORS.muted }}>
          {event.description}
        </p>

        <dl className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-5xl">
          {event.eventDetails.map((detail) => (
            <div key={detail.title} className="pt-4" style={{ borderTop: `1px solid ${COLORS.blood}66` }}>
              <dt className="font-spooky uppercase tracking-[0.25em] text-xs" style={{ color: COLORS.ember }}>
                {detail.title}
              </dt>
              <dd className="mt-2 whitespace-pre-line leading-snug" style={{ color: COLORS.bone }}>
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HalloweenHero;
