export type EventConfig = {
  title: string;
  description: string;
  accentColor?: { primary: string; primaryDark: string; primaryLight: string };
  eventDetails: { icon: string; title: string; value: string }[];
  artists: { name: string; image: string; description: string }[];
};

export type UpcomingEvent = {
  title: string;
  date?: string;
  locationName?: string;
  locationAddress?: string;
  description?: string;
  image: string;
};

export type PastEvent = {
  title: string;
  images: string[];
};

// export const nextEvent: EventConfig = {
//   title: "Forum Fortyfive",
//   description: "Seit 45 Jahren steht das Club Forum für Jugendkultur, Musik und Gemeinschaft. Dieses Jubiläum feiern wir mit einem besonderen Sommerabend im Herzen Böblingens – gemeinsam mit euch im Fetzers.",
//   eventDetails: [
//     { icon: "CalendarDays", title: "Datum", value: "Samstag, 06.09.2025" },
//     { icon: "Clock", title: "Uhrzeit", value: "ab 16 Uhr" },
//     { icon: "MapPin", title: "Ort", value: "Fetzers Böblingen\nPoststraße 38\n71032 Böblingen" },
//     { icon: "Ticket", title: "Eintritt", value: "frei" },
//   ],
//   artists: [
//     {
//       name: "Jules",
//       image: "/images/events/upcoming_events/forum_fortyfive/jules.png",
//       description: "Die 25-jährige 'jules' mag für den Pop-Ruhm bestimmt sein, aber der Einfluss alternativer Klänge färbt ihre augenzwinkernde Charakterisierung als 'wannabe rockstar in a pop-girly's body'. Inspiriert vom Punkrock der 2000er Jahre entwickelte die Stuttgarter Newcomerin 'jules' einen emanzipierten, mutigen Sound voller Farbe."
//     },
//     {
//       name: "kleinstadt",
//       image: "/images/events/upcoming_events/forum_fortyfive/kleinstadt.png", 
//       description: "Die Band kleinstadt aus Herrenberg vereint in ihrer Musik die enge Verbundenheit langjähriger Freundschaft mit authentischen deutschen Texten, die von Liebe, Wut, Sehnsucht, Spaß und Freiheit erzählen. Ihre Klänge spiegeln das Erwachsenwerden wider und laden dazu ein, gemeinsam zu träumen und zu fühlen."
//     },
//     {
//       name: "Handbuch",
//       image: "/images/events/upcoming_events/forum_fortyfive/handbuch.png",
//       description: "In einer Welt, die ständig von großen Krisen spricht, kümmert sich HANDBUCH lieber um die kleinen Krisen - die, die einem morgens beim Katerfrühstück ins Ohr brüllen. Warum ist der Wasserkocher so laut? Warum ziehen alle Freunde weg aus dieser von Baustellen und Smog geplagten Stadt? HANDBUCH stellen keine Weltformeln auf, aber sie stellen die richtigen Fragen. Zwischen Gitarre (ROBNIG), Bass (ZELLER) und dem Klavier (SELL) entsteht ein Dialog - manchmal suchend, manchmal fordernd, aber immer mit Gefühl. Die Songs schlagen irgendwo zwischen Abenddämmerung und Morgengrauen auf und tragen ihre deutschsprachigen Texte mit lakonischem Charme und ehrlicher Ratlosigkeit vor. Begleitet von Beats aus der Konserve (weil nicht jedes Schlagzeug eine Wohnung hat), trifft Indie-Folk-Pop auf eine staubige Großstadtmelancholie. Mal ruhig, mal laut, aber immer so, dass etwas vibriert - im Hemd, in der Lunge, im Kopf. Zwischen Faber, Mumford & Sons und Sons of the East findet HANDBUCH seinen Platz: warm, leicht angeschlagen und erstaunlich treffsicher."
//     },
//     {
//       name: "Joost",
//       image: "/images/events/upcoming_events/forum_fortyfive/joost.png",
//       description: "Joost verbindet treibenden Indie-Rock mit Pop- und Elektro-Elementen und erzählt Geschichten über Selbstfindung, Nähe und das Gefühl von Rastlosigkeit. Mal laut, mal leise – aber immer voller Energie und echter Emotion."
//     }
//   ],
// };

export const nextEvent: EventConfig = {
  title: "Halloween",
  description: "Jedes Jahr am 31.10. feiern wir die gruseligste Nacht des Jahres. Kostüm an und los! Erlebe eine unvergessliche Nacht mit gruseligen Überraschungen, spooky Musik und einer schaurig-schönen Atmosphäre.",
  accentColor: {
  primary: "355 80% 35%",       // kräftiges Weinrot
  primaryDark: "355 80% 25%",   // dunklerer Ton
  primaryLight: "355 80% 50%",  // hellerer Ton
},
  eventDetails: [
    {icon: "CalendarDays", title: "Datum", value: "Freitag, 31.10.2025"},
    {icon: "Clock", title: "Uhrzeit", value: "ab 19 Uhr"},
    {icon: "MapPin", title: "Ort", value: "Club Forum\nMarktstraße 9\n71032 Böblingen"},
    {icon: "Ticket", title: "Eintritt", value: "konstenlos mit Kostüm\n 3€ ohne Kostüm"}
  ],
  artists: []
};

// export const nextEvent: EventConfig = {
//   // 
//   title: "Bier\u00adpong\u00adturnier",
//   description: "Das Event um deine Skills beim Bierpong zu zeigen. Also auf was wartest du? Melde dich mit deinem Teampartner an und sichere dir die 2 Kästen Gewinn!",
//   eventDetails: [
//     {icon: "CalendarDays", title: "Datum", value: "Samstag, 11.04.2026"},
//     {icon: "Clock", title: "Uhrzeit", value: "to be anounced"},
//     {icon: "MapPin", title: "Ort", value: "Club Forum\nMarktstraße 9\n71032 Böblingen"},
//     {icon: "Ticket", title: "Eintritt", value: "20€ pro Team\n(2 Personen)"}
//   ],
//   artists: []
// };

// export const nextEvent: EventConfig = {
//   title: "Sip & Create",
//   description: "Ein entspannter Nachmittag mit Drinks und Kreativität. Ob malen, basteln oder häkeln: einfach ausprobieren. Beim Sip & Create steht der Spaß im Vordergrund!",
//   eventDetails: [
//     {icon: "CalendarDays", title: "Datum", value: "Samstag, 25.04.2026"},
//     {icon: "Clock", title: "Uhrzeit", value: "to be anounced"},
//     {icon: "MapPin", title: "Ort", value: "Club Forum\nMarktstraße 9\n71032 Böblingen"},
//     {icon: "Ticket", title: "Eintritt", value: "frei"}
//   ],
//   artists: []
// };

// export const nextEvent: EventConfig = {
//   title: "Stadtfest",
//   description: "Wie schon im letzten Jahr öffnen wir auch dieses Jahr am Stadtfest-Wochenende wieder unsere Türen für euch. Freut euch auf kreative Möglichkeiten zum Malen, kalte Getränke und eine entspannte Atmosphäre mitten im Herzen von Böblingen.",
//   eventDetails: [
//     {icon: "CalendarDays", title: "Datum", value: "Samstag, 03-04.07.2026"},
//     {icon: "Clock", title: "Uhrzeit", value: "16-00 Uhr"},
//     {icon: "MapPin", title: "Ort", value: "Club Forum\nMarktstraße 9\n71032 Böblingen"},
//     {icon: "Ticket", title: "Eintritt", value: "frei"}
//   ],
//   artists: []
// };

// export const nextEvent: EventConfig = {
//   title: "OFTAS",
//   description: "Unser Jahres-Highlight vom 27.–29.12. im Waldheim Tannenberg. Drei Tage Live-Musik und Aftershow-Partys, die du nicht verpassen darfst!",
//   eventDetails: [
//     { icon: "CalendarDays", title: "Datum", value: "Samstag, 27.12.2025 - Montag, 29.12.2025" },
//     { icon: "Clock", title: "Uhrzeit", value: "ab 19 Uhr" },
//     { icon: "MapPin", title: "Ort", value: "Waldheim Tannenberg\nMurkenbachweg 120\n71032 Böblingen" },
//     { icon: "Ticket", title: "Eintritt", value: "frei" },
//   ],
//   artists: [
//     {
//       name: "<- Was s' sagt",
//       image: "/images/events/stay_tuned_logo.png",
//       description: ""
//     },
//     {
//       name: "Jules",
//       image: "/images/events/upcoming_events/forum_fortyfive/jules.png",
//       description: "Die 25-jährige 'jules' mag für den Pop-Ruhm bestimmt sein, aber der Einfluss alternativer Klänge färbt ihre augenzwinkernde Charakterisierung als 'wannabe rockstar in a pop-girly's body'. Inspiriert vom Punkrock der 2000er Jahre entwickelte die Stuttgarter Newcomerin 'jules' einen emanzipierten, mutigen Sound voller Farbe."
//     },
//     {
//       name: "kleinstadt",
//       image: "/images/events/upcoming_events/forum_fortyfive/kleinstadt.png", 
//       description: "Die Band kleinstadt aus Herrenberg vereint in ihrer Musik die enge Verbundenheit langjähriger Freundschaft mit authentischen deutschen Texten, die von Liebe, Wut, Sehnsucht, Spaß und Freiheit erzählen. Ihre Klänge spiegeln das Erwachsenwerden wider und laden dazu ein, gemeinsam zu träumen und zu fühlen."
//     },
//     {
//       name: "Handbuch",
//       image: "/images/events/upcoming_events/forum_fortyfive/handbuch.png",
//       description: "In einer Welt, die ständig von großen Krisen spricht, kümmert sich HANDBUCH lieber um die kleinen Krisen - die, die einem morgens beim Katerfrühstück ins Ohr brüllen. Warum ist der Wasserkocher so laut? Warum ziehen alle Freunde weg aus dieser von Baustellen und Smog geplagten Stadt? HANDBUCH stellen keine Weltformeln auf, aber sie stellen die richtigen Fragen. Zwischen Gitarre (ROBNIG), Bass (ZELLER) und dem Klavier (SELL) entsteht ein Dialog - manchmal suchend, manchmal fordernd, aber immer mit Gefühl. Die Songs schlagen irgendwo zwischen Abenddämmerung und Morgengrauen auf und tragen ihre deutschsprachigen Texte mit lakonischem Charme und ehrlicher Ratlosigkeit vor. Begleitet von Beats aus der Konserve (weil nicht jedes Schlagzeug eine Wohnung hat), trifft Indie-Folk-Pop auf eine staubige Großstadtmelancholie. Mal ruhig, mal laut, aber immer so, dass etwas vibriert - im Hemd, in der Lunge, im Kopf. Zwischen Faber, Mumford & Sons und Sons of the East findet HANDBUCH seinen Platz: warm, leicht angeschlagen und erstaunlich treffsicher."
//     },
//     {
//       name: "Joost",
//       image: "/images/events/upcoming_events/forum_fortyfive/joost.png",
//       description: "Joost verbindet treibenden Indie-Rock mit Pop- und Elektro-Elementen und erzählt Geschichten über Selbstfindung, Nähe und das Gefühl von Rastlosigkeit. Mal laut, mal leise – aber immer voller Energie und echter Emotion."
//     }
//   ],
// };

export const upcomingEvents: UpcomingEvent[] = [
  // {
  //   title: "Bierpongturnier",
  //   date: "Coming Soon",
  //   description: "Das Event um deine Skills beim Bierpong zu zeigen. Also auf was wartest du? Melde dich mit deinem Teampartner an und sichere dir die 2 Kästen Gewinn!",
  //   image: "/images/events/upcoming_events/Beerpong_4_3_ausgeschnitten.png"
  // },
  // {
  //   title: "Stadtfest",
  //   date: "3.-5.07.2026",
  //   locationName: "Club Forum",
  //   locationAddress: "Marktstraße 9, 71032 Böblingen",
  //   description: "Wie schon im letzten Jahr öffnen wir auch dieses Jahr am Stadtfest-Wochenende wieder unsere Türen für euch. Freut euch auf kreative Möglichkeiten zum Malen, kalte Getränke und eine entspannte Atmosphäre mitten im Herzen von Böblingen.",
  //   image: "/images/events/past_events/stadtfest_2025/Stadtfest_4.jpg"
  // },
  // {
  //   title: "Summer Vibes",
  //   date: "01.08.2026",
  //   locationName: "Club Forum",
  //   locationAddress: "Marktstraße 9, 71032 Böblingen",
  //   description: "Wir laden euch herzlich zu unserem Sommerfest ein. Schnappt eure Sonnenbrille, schaltet vom Alltag ab und genießt das lockere Open-Air-Ambiente bei kühlen Drinks und entspannter Musik. Ein perfekter Tag, um einfach mal die Seele baumeln zu lassen und mit alten und neuen Gesichtern zu quatschen.",
  //   image: "/images/events/past_events/stadtfest_2025/Stadtfest_2.jpg"
  // },
  // {
  //   title: "Halloween",
  //   date: `31.10.${new Date().getFullYear()}`,
  //   locationName: "Club Forum",
  //   locationAddress: "Marktstraße 9, 71032 Böblingen",
  //   description: "Jedes Jahr am 31.10. feiern wir die gruseligste Nacht des Jahres. Kostüm an und los!",
  //   image: "/images/events/upcoming_events/Halloween.png",
  // },
  {
    title: "Die CLUB FORUM OFTAS",
    date: `27.-29.12.${new Date().getFullYear()}`,
    locationName: "Waldheim Tannenberg",
    locationAddress: "Murkenbachweg 120, 71032 Böblingen",
    description: "Unser Jahres-Highlight vom 27.–29.12. im Waldheim Tannenberg. Drei Tage Live-Musik und Aftershow-Partys, die du nicht verpassen darfst!",
    image: "/images/events/upcoming_events/OFTAS_Logo.png"
  },
];

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
