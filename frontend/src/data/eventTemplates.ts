import type { EventConfig, UpcomingEvent } from "./events";

// Vorlagen für wiederkehrende Events. Jede Vorlage liefert den großen Hero (event)
// und die Karte für "Weitere Highlights" (card). Wochentag, Countdown und Ablaufzeit
// werden aus dem Datum berechnet.
//
// Benutzung in events.ts:
//   const halloween = eventTemplates.halloween(2027);
//   const eventSchedule = [halloween.event, ...];
//
// Zeiten und Preise sind die zuletzt gültigen Werte. Vor dem Veröffentlichen prüfen
// und bei Bedarf überschreiben:
//   eventTemplates.halloween(2027, { endTime: "02:00", price: "3 €" });

export type EventTemplate = { event: EventConfig; card: UpcomingEvent };

export type EventOptions = {
  // Format "19:00". Ohne Startzeit steht auf der Seite "folgt"
  startTime?: string;
  // Format "01:00". Liegt die Uhrzeit vor der Startzeit, zählt sie zum Folgetag
  endTime?: string;
  price?: string;
  description?: string;
  artists?: EventConfig["artists"];
};

type Location = { name: string; street: string; city: string };

type Blueprint = EventOptions & {
  title: string;
  description: string;
  location: Location;
  hero?: EventConfig["hero"];
  accentColor?: EventConfig["accentColor"];
  card?: {
    title?: string;
    description?: string;
    // Kürzerer Ortsname, falls der volle auf der Karte zu lang ist
    locationName?: string;
    image?: string;
    teaser?: UpcomingEvent["teaser"];
    // Uhrzeit und Preis auch auf der Karte anzeigen
    showDetails?: boolean;
  };
};

const CLUB_FORUM: Location = { name: "Club Forum", street: "Marktstraße 9", city: "71032 Böblingen" };
const WALDHEIM: Location = { name: "Ev. Waldheim Tannenberg", street: "Murkenbachweg 120", city: "71032 Böblingen" };
const FETZERS: Location = { name: "Fetzers Böblingen", street: "Poststraße 38", city: "71032 Böblingen" };

const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

// Ohne Endzeit bleibt ein Event bis zu dieser Uhrzeit am Folgetag aktuell
const DEFAULT_END_TIME = "06:00";

const parseDay = (day: string) => {
  const [year, month, date] = day.split("-").map(Number);
  return { year, month, date, utc: new Date(Date.UTC(year, month - 1, date)) };
};

const twoDigits = (value: number) => String(value).padStart(2, "0");

const nextDay = (day: string) => {
  const { utc } = parseDay(day);
  utc.setUTCDate(utc.getUTCDate() + 1);
  return `${utc.getUTCFullYear()}-${twoDigits(utc.getUTCMonth() + 1)}-${twoDigits(utc.getUTCDate())}`;
};

const lastSundayOf = (year: number, month: number) => {
  const lastDay = new Date(Date.UTC(year, month, 0));
  return lastDay.getUTCDate() - lastDay.getUTCDay();
};

// Zeitpunkt in deutscher Zeit, Sommerzeit gilt vom letzten Sonntag im März bis zum letzten im Oktober
const berlinTime = (day: string, time: string) => {
  const { year, month, date } = parseDay(day);
  const isSummer =
    (month > 3 && month < 10) ||
    (month === 3 && date >= lastSundayOf(year, 3)) ||
    (month === 10 && date < lastSundayOf(year, 10));
  return `${day}T${time}:00${isSummer ? "+02:00" : "+01:00"}`;
};

const formatDay = (day: string) => {
  const { year, month, date } = parseDay(day);
  return `${twoDigits(date)}.${twoDigits(month)}.${year}`;
};

const weekday = (day: string) => WEEKDAYS[parseDay(day).utc.getUTCDay()];

// "Samstag, 31.10.2026" oder "So, 27.12. – Di, 29.12.2026"
const heroDate = (firstDay: string, lastDay: string) =>
  firstDay === lastDay
    ? `${weekday(firstDay)}, ${formatDay(firstDay)}`
    : `${weekday(firstDay).slice(0, 2)}, ${formatDay(firstDay).slice(0, 6)} – ${weekday(lastDay).slice(0, 2)}, ${formatDay(lastDay)}`;

// "31.10.2026" oder "27.-29.12.2026"
const cardDate = (firstDay: string, lastDay: string) => {
  if (firstDay === lastDay) return formatDay(firstDay);
  const sameMonth = firstDay.slice(0, 7) === lastDay.slice(0, 7);
  return sameMonth
    ? `${formatDay(firstDay).slice(0, 2)}.-${formatDay(lastDay)}`
    : `${formatDay(firstDay)} - ${formatDay(lastDay)}`;
};

// "19:00" -> "19", "19:30" -> "19:30"
const formatHour = (time: string) => (time.endsWith(":00") ? String(Number(time.slice(0, 2))) : time);

const timeLabel = (startTime?: string, endTime?: string) => {
  if (!startTime) return undefined;
  return endTime ? `${formatHour(startTime)} – ${formatHour(endTime)} Uhr` : `ab ${formatHour(startTime)} Uhr`;
};

const build = (firstDay: string, lastDay: string, blueprint: Blueprint, options: EventOptions = {}): EventTemplate => {
  const { title, location, hero, accentColor, card = {} } = blueprint;
  const { startTime, endTime, price, description, artists } = { ...blueprint, ...options };

  const endsOnLastDay = startTime !== undefined && endTime !== undefined && endTime > startTime;
  const until = berlinTime(endsOnLastDay ? lastDay : nextDay(lastDay), endTime ?? DEFAULT_END_TIME);
  const hours = timeLabel(startTime, endTime);
  const time = hours && firstDay !== lastDay ? `jeden Tag ${hours}` : hours;

  return {
    event: {
      title,
      description,
      startsAt: startTime ? berlinTime(firstDay, startTime) : undefined,
      until,
      hero,
      accentColor,
      eventDetails: [
        { icon: "CalendarDays", title: "Datum", value: heroDate(firstDay, lastDay) },
        { icon: "Clock", title: "Uhrzeit", value: time ?? "folgt" },
        { icon: "MapPin", title: "Ort", value: `${location.name}\n${location.street}\n${location.city}` },
        { icon: "Ticket", title: "Eintritt", value: price ?? "folgt" },
      ],
      artists: artists ?? [],
    },
    card: {
      title: card.title ?? title,
      date: cardDate(firstDay, lastDay),
      time: card.showDetails ? time : undefined,
      price: card.showDetails ? price : undefined,
      until,
      locationName: card.locationName ?? location.name,
      locationAddress: `${location.street}, ${location.city}`,
      description: card.description ?? description,
      image: card.image,
      teaser: card.teaser,
    },
  };
};

// Bands, die schon bei uns gespielt haben: zum Beispiel eventTemplates.oftas(2027, { artists: [eventArtists.jules] })
export const eventArtists = {
  jules: {
    name: "Jules",
    image: "/images/events/upcoming_events/forum_fortyfive/jules.png",
    description: "Die 25-jährige 'jules' mag für den Pop-Ruhm bestimmt sein, aber der Einfluss alternativer Klänge färbt ihre augenzwinkernde Charakterisierung als 'wannabe rockstar in a pop-girly's body'. Inspiriert vom Punkrock der 2000er Jahre entwickelte die Stuttgarter Newcomerin 'jules' einen emanzipierten, mutigen Sound voller Farbe.",
  },
  kleinstadt: {
    name: "kleinstadt",
    image: "/images/events/upcoming_events/forum_fortyfive/kleinstadt.png",
    description: "Die Band kleinstadt aus Herrenberg vereint in ihrer Musik die enge Verbundenheit langjähriger Freundschaft mit authentischen deutschen Texten, die von Liebe, Wut, Sehnsucht, Spaß und Freiheit erzählen. Ihre Klänge spiegeln das Erwachsenwerden wider und laden dazu ein, gemeinsam zu träumen und zu fühlen.",
  },
  handbuch: {
    name: "Handbuch",
    image: "/images/events/upcoming_events/forum_fortyfive/handbuch.png",
    description: "In einer Welt, die ständig von großen Krisen spricht, kümmert sich HANDBUCH lieber um die kleinen Krisen - die, die einem morgens beim Katerfrühstück ins Ohr brüllen. Warum ist der Wasserkocher so laut? Warum ziehen alle Freunde weg aus dieser von Baustellen und Smog geplagten Stadt? HANDBUCH stellen keine Weltformeln auf, aber sie stellen die richtigen Fragen. Zwischen Gitarre (ROBNIG), Bass (ZELLER) und dem Klavier (SELL) entsteht ein Dialog - manchmal suchend, manchmal fordernd, aber immer mit Gefühl. Die Songs schlagen irgendwo zwischen Abenddämmerung und Morgengrauen auf und tragen ihre deutschsprachigen Texte mit lakonischem Charme und ehrlicher Ratlosigkeit vor. Begleitet von Beats aus der Konserve (weil nicht jedes Schlagzeug eine Wohnung hat), trifft Indie-Folk-Pop auf eine staubige Großstadtmelancholie. Mal ruhig, mal laut, aber immer so, dass etwas vibriert - im Hemd, in der Lunge, im Kopf. Zwischen Faber, Mumford & Sons und Sons of the East findet HANDBUCH seinen Platz: warm, leicht angeschlagen und erstaunlich treffsicher.",
  },
  joost: {
    name: "Joost",
    image: "/images/events/upcoming_events/forum_fortyfive/joost.png",
    description: "Joost verbindet treibenden Indie-Rock mit Pop- und Elektro-Elementen und erzählt Geschichten über Selbstfindung, Nähe und das Gefühl von Rastlosigkeit. Mal laut, mal leise – aber immer voller Energie und echter Emotion.",
  },
};

export const eventTemplates = {
  // Immer am 31.10., deshalb reicht das Jahr
  halloween: (year: number, options?: EventOptions) =>
    build(`${year}-10-31`, `${year}-10-31`, {
      title: "Halloween",
      description: "Jedes Jahr am 31.10. feiern wir die gruseligste Nacht des Jahres. Kostüm an und los! Erlebe eine unvergessliche Nacht mit gruseligen Überraschungen, spooky Musik und einer schaurig-schönen Atmosphäre.",
      location: CLUB_FORUM,
      startTime: "19:00",
      endTime: "01:00",
      price: "kostenlos mit Kostüm\n2€ ohne Kostüm",
      hero: "halloween",
      accentColor: {
        primary: "355 80% 35%",       // kräftiges Weinrot
        primaryDark: "355 80% 25%",   // dunklerer Ton
        primaryLight: "355 80% 50%",  // hellerer Ton
      },
      card: {
        description: "Jedes Jahr am 31.10. feiern wir die gruseligste Nacht des Jahres. Kostüm an und los!",
        image: "/images/events/upcoming_events/Halloween.png",
      },
    }, options),

  // Immer vom 27. bis 29.12., deshalb reicht das Jahr
  oftas: (year: number, options?: EventOptions) =>
    build(`${year}-12-27`, `${year}-12-29`, {
      title: "Die CLUB FORUM OFTAS",
      description: "Unser Jahres-Highlight vom 27.–29.12. im Waldheim Tannenberg. Drei Tage Live-Musik und Aftershow-Partys, die du nicht verpassen darfst!",
      location: WALDHEIM,
      startTime: "19:00",
      endTime: "03:00",
      price: "kostenlos",
      hero: "oftas",
      card: {
        locationName: "Waldheim Tannenberg",
        image: "/images/events/upcoming_events/OFTAS_Logo.png",
        showDetails: true,
      },
    }, options),

  marioKart: (day: string, options?: EventOptions) =>
    build(day, day, {
      title: "Mario Kart Turnier",
      description: "Controller in die Hand und ab auf die Strecke! Beim Mario Kart Turnier im Club Forum fahrt ihr um den Sieg. Bananenschalen, blaue Panzer und knappe Zieleinläufe garantiert.",
      location: CLUB_FORUM,
      startTime: "15:00",
      price: "5 €",
      hero: "mariokart",
      card: {
        description: "Controller in die Hand und ab auf die Strecke! Wer holt sich den Pokal?",
        teaser: "mariokart",
        showDetails: true,
      },
    }, options),

  barBroker: (day: string, options?: EventOptions) =>
    build(day, day, {
      title: "BarBroker",
      description: "An diesem Abend wird die Bar zur Börse: Die Getränkepreise richten sich nach Angebot und Nachfrage und ändern sich live, den ganzen Abend lang. Wer antizyklisch bestellt, trinkt günstiger. Wer mit der Masse geht, zahlt drauf.",
      location: CLUB_FORUM,
      hero: "barbroker",
      card: {
        description: "Die Bar wird zur Börse: Die Preise steigen und fallen live mit der Nachfrage. Wer clever bestellt, trinkt günstiger.",
        teaser: "barbroker",
        showDetails: true,
      },
    }, options),

  bierpong: (day: string, options?: EventOptions) =>
    build(day, day, {
      // Weiche Trennstellen, damit der lange Titel im Hero auf dem Handy umbrechen kann
      title: "Bier­pong­turnier",
      description: "Das Event um deine Skills beim Bierpong zu zeigen. Also auf was wartest du? Melde dich mit deinem Teampartner an und sichere dir die 2 Kästen Gewinn!",
      location: CLUB_FORUM,
      price: "20€ pro Team\n(2 Personen)",
      card: {
        title: "Bierpongturnier",
        image: "/images/events/upcoming_events/Beerpong_4_3_ausgeschnitten.png",
      },
    }, options),

  sipAndCreate: (day: string, options?: EventOptions) =>
    build(day, day, {
      title: "Sip & Create",
      description: "Ein entspannter Nachmittag mit Drinks und Kreativität. Ob malen, basteln oder häkeln: einfach ausprobieren. Beim Sip & Create steht der Spaß im Vordergrund!",
      location: CLUB_FORUM,
      price: "frei",
    }, options),

  // Das Stadtfest-Wochenende verschiebt sich jedes Jahr, deshalb erster und letzter Tag
  stadtfest: (firstDay: string, lastDay: string, options?: EventOptions) =>
    build(firstDay, lastDay, {
      title: "Stadtfest",
      description: "Wie schon im letzten Jahr öffnen wir auch dieses Jahr am Stadtfest-Wochenende wieder unsere Türen für euch. Freut euch auf kreative Möglichkeiten zum Malen, kalte Getränke und eine entspannte Atmosphäre mitten im Herzen von Böblingen.",
      location: CLUB_FORUM,
      startTime: "16:00",
      endTime: "00:00",
      price: "frei",
      card: { image: "/images/events/past_events/stadtfest_2025/Stadtfest_4.jpg" },
    }, options),

  summerVibes: (day: string, options?: EventOptions) =>
    build(day, day, {
      title: "Summer Vibes",
      description: "Wir laden euch herzlich zu unserem Sommerfest ein. Schnappt eure Sonnenbrille, schaltet vom Alltag ab und genießt das lockere Open-Air-Ambiente bei kühlen Drinks und entspannter Musik. Ein perfekter Tag, um einfach mal die Seele baumeln zu lassen und mit alten und neuen Gesichtern zu quatschen.",
      location: CLUB_FORUM,
      card: { image: "/images/events/past_events/stadtfest_2025/Stadtfest_2.jpg" },
    }, options),

  // Das Jubiläum von 2025: Beschreibung und Line-up gelten nur für diesen Anlass
  forumFortyfive: (day: string, options?: EventOptions) =>
    build(day, day, {
      title: "Forum Fortyfive",
      description: "Seit 45 Jahren steht das Club Forum für Jugendkultur, Musik und Gemeinschaft. Dieses Jubiläum feiern wir mit einem besonderen Sommerabend im Herzen Böblingens – gemeinsam mit euch im Fetzers.",
      location: FETZERS,
      startTime: "16:00",
      price: "frei",
      artists: [eventArtists.jules, eventArtists.kleinstadt, eventArtists.handbuch, eventArtists.joost],
    }, options),
};
