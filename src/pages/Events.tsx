import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays, MapPin, Clock, Ticket, Images } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Events = () => {
  // State, um den Index der geöffneten Galerie zu speichern (-1 bedeutet geschlossen)
  const [openLightboxIndex, setOpenLightboxIndex] = useState(-1);

  // Helper function to get icon component by name
  const getIconComponent = (iconName: string) => {
    const icons = {
      CalendarDays,
      Clock,
      MapPin,
      Ticket,
      Images
    };
    return icons[iconName as keyof typeof icons] || CalendarDays;
  };

  // Next Event Configuration - easily maintainable
  const nextEvent = {
    title: "Forum Fortyfive",
    description: "Seit 45 Jahren steht das Club Forum für Jugendkultur, Musik und Gemeinschaft. Dieses Jubiläum feiern wir mit einem besonderen Sommerabend im Herzen Böblingens – gemeinsam mit euch im Fetzers.",
    accentColor: {
      primary: "neon-green", // Can be changed to any color from your design system
      primaryRgb: "64, 255, 0", // HSL/RGB values for custom gradients
    },
    eventDetails: [
      {
        icon: "CalendarDays",
        title: "Datum",
        value: "Samstag, 06.09.2025"
      },
      {
        icon: "Clock", 
        title: "Uhrzeit",
        value: "ab 16 Uhr"
      },
      {
        icon: "MapPin",
        title: "Ort", 
        value: "Fetzers Böblingen\nPoststraße 38\n71032 Böblingen"
      },
      {
        icon: "Ticket",
        title: "Eintritt",
        value: "frei"
      }
    ],
    artists: [
      {
        name: "Jules",
        image: "/images/events/upcoming_events/forum_fortyfive/jules.png",
        description: "Die 25-jährige 'jules' mag für den Pop-Ruhm bestimmt sein, aber der Einfluss alternativer Klänge färbt ihre augenzwinkernde Charakterisierung als 'wannabe rockstar in a pop-girly's body'. Inspiriert vom Punkrock der 2000er Jahre entwickelte die Stuttgarter Newcomerin 'jules' einen emanzipierten, mutigen Sound voller Farbe."
      },
      {
        name: "kleinstadt",
        image: "/images/events/upcoming_events/forum_fortyfive/kleinstadt.png", 
        description: "Die Band kleinstadt aus Herrenberg vereint in ihrer Musik die enge Verbundenheit langjähriger Freundschaft mit authentischen deutschen Texten, die von Liebe, Wut, Sehnsucht, Spaß und Freiheit erzählen. Ihre Klänge spiegeln das Erwachsenwerden wider und laden dazu ein, gemeinsam zu träumen und zu fühlen."
      },
      {
        name: "Handbuch",
        image: "/images/events/upcoming_events/forum_fortyfive/handbuch.png",
        description: "In einer Welt, die ständig von großen Krisen spricht, kümmert sich HANDBUCH lieber um die kleinen Krisen - die, die einem morgens beim Katerfrühstück ins Ohr brüllen. Warum ist der Wasserkocher so laut? Warum ziehen alle Freunde weg aus dieser von Baustellen und Smog geplagten Stadt? HANDBUCH stellen keine Weltformeln auf, aber sie stellen die richtigen Fragen. Zwischen Gitarre (ROBNIG), Bass (ZELLER) und dem Klavier (SELL) entsteht ein Dialog - manchmal suchend, manchmal fordernd, aber immer mit Gefühl. Die Songs schlagen irgendwo zwischen Abenddämmerung und Morgengrauen auf und tragen ihre deutschsprachigen Texte mit lakonischem Charme und ehrlicher Ratlosigkeit vor. Begleitet von Beats aus der Konserve (weil nicht jedes Schlagzeug eine Wohnung hat), trifft Indie-Folk-Pop auf eine staubige Großstadtmelancholie. Mal ruhig, mal laut, aber immer so, dass etwas vibriert - im Hemd, in der Lunge, im Kopf. Zwischen Faber, Mumford & Sons und Sons of the East findet HANDBUCH seinen Platz: warm, leicht angeschlagen und erstaunlich treffsicher."
      },
      {
        name: "Joost",
        image: "/images/events/upcoming_events/forum_fortyfive/joost.png",
        description: "Joost verbindet treibenden Indie-Rock mit Pop- und Elektro-Elementen und erzählt Geschichten über Selbstfindung, Nähe und das Gefühl von Rastlosigkeit. Mal laut, mal leise – aber immer voller Energie und echter Emotion."
      }
    ]
  };

  const upcomingEvents = [
    {
      title: "Halloween",
      date: "31.10.2025",
      locationName: "Club Forum",
      locationAddress: "Marktstraße 9, 71032 Böblingen",
      description: "Jedes Jahr am 31.10. feiern wir die gruseligste Nacht des Jahres. Kostüm an und los!",
      image: "/images/events/upcoming_events/Halloween.png",
    },
    {
      title: "Die CLUB FORUM OFTAS",
      date: "27.-29.12.2025",
      locationName: "Waldheim Tannenberg",
      locationAddress: "Murkenbachweg 120, 71032 Böblingen",
      description: "Unser Jahres-Highlight vom 27.–29.12. im Waldheim Tannenberg. Drei Tage Live-Musik und Aftershow-Partys, die du nicht verpassen darfst!",
      image: "/images/events/upcoming_events/OFTAS_Logo.png"
    },
    {
      title: "Bierpongturnier",
      date: "Coming Soon",
      description: "Das Event um deine Skills beim Bierpong zu zeigen. Also auf was wartest du? Melde dich mit deinem Teampartner an und sichere dir die 2 Kästen Gewinn!",
      image: "/images/events/upcoming_events/Beerpong_4_3_ausgeschnitten.png"
    }
  ];

  const pastEvents = [
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
        "/images/events/past_events/oftas_2024/Oftas_1.jpg",
        "/images/events/past_events/oftas_2024/Oftas_2.jpg",
        "/images/events/past_events/oftas_2024/Oftas_3.jpg",
        "/images/events/past_events/oftas_2024/Oftas_4.jpg",
      ]
    },
  ];

  return (
    <Layout>
      {/* Next Event Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className={`text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-${nextEvent.accentColor.primary} to-white bg-clip-text text-transparent leading-tight`}>
                {nextEvent.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {nextEvent.description}
              </p>
            </div>
            
            {/* Event Info Grid - Dynamic based on eventDetails */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(nextEvent.eventDetails.length, 4)} gap-8 mb-20`}>
              {nextEvent.eventDetails.map((detail, index) => {
                const IconComponent = getIconComponent(detail.icon);
                return (
                  <div key={index} className="text-center group h-full">
                    <div className={`bg-${nextEvent.accentColor.primary}/20 border border-${nextEvent.accentColor.primary}/50 rounded-lg p-6 group-hover:bg-${nextEvent.accentColor.primary}/30 transition-all duration-300 h-full flex flex-col justify-center min-h-[140px]`}>
                      <IconComponent className={`h-8 w-8 text-${nextEvent.accentColor.primary} mx-auto mb-3`} />
                      <h3 className="text-lg font-bold text-white mb-2">{detail.title}</h3>
                      <p className="text-gray-300 whitespace-pre-line">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Die Acts des Abends</h2>
            <div className={`w-24 h-1 bg-${nextEvent.accentColor.primary} mx-auto`}></div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${Math.min(nextEvent.artists.length, 4)} gap-8 max-w-7xl mx-auto`}>
            {nextEvent.artists.map((artist, index) => (
              <Card key={index} className={`bg-gray-900/50 border-gray-700 hover:border-${nextEvent.accentColor.primary}/50 transition-all duration-300 group overflow-hidden`}>
                <div className="relative">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="text-white">
                  <CardTitle className={`text-2xl font-bold text-${nextEvent.accentColor.primary} mb-3`}>{artist.name}</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {artist.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Kommende Events */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Weitere Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </AspectRatio>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-bold text-xl">
                      {event.title}
                    </CardTitle>
                  </div>
                  
                  {/* Event Details */}
                  <div className="space-y-2 mt-4">
                    {event.date && (
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-neon-green flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-600">
                          {event.date}
                        </span>
                      </div>
                    )}
                    {event.locationName && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-neon-green mt-[1px] flex-shrink-0" />
                        <div className="text-sm font-medium text-gray-600 leading-tight">
                          <div>{event.locationName}</div>
                          {event.locationAddress && (
                            <div className="text-sm font-medium">{event.locationAddress}</div>
                          )}
                        </div>
                      </div>
                    )}
                    {event.description && (
                      <p className="text-gray-600 text-base leading-relaxed pt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </CardHeader>
                {/* <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardContent> */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event-Archiv */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">So legendär waren unsere letzten Partys</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"> {/* Gap vergrößert */}
            {pastEvents.map((event, index) => (
              <Card
                key={index}
                onClick={() => setOpenLightboxIndex(index)}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <div className="relative">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AspectRatio>

                  {/* Titel + Bilder-Anzahl gemeinsam im unteren Balken */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{event.title}</h3>

                    {event.images.length > 1 && (
                      <div className="text-xs font-semibold flex items-center gap-1">
                        <Images className="h-4 w-4" />
                        {event.images.length} Bilder
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox-Komponente rendern */}
      <Lightbox
        open={openLightboxIndex > -1}
        close={() => setOpenLightboxIndex(-1)}
        // Die Bilder für das ausgewählte Event übergeben
        slides={openLightboxIndex > -1 ? pastEvents[openLightboxIndex].images.map(src => ({ src })) : []}
      />

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Verpasse kein Event!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Folge uns auf Instagram für die neuesten Updates und Behind-the-Scenes Content
          </p>
        <a 
          href="https://www.instagram.com/club_forumbb" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-neon-green hover:bg-neon-green/80 text-black font-semibold px-8 py-3 rounded-lg transition-colors space-x-2"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm5.25-0.75h.008v.008h-.008v-.008z"
        />
        </svg>
          <span>@club_forumbb folgen</span>
        </a>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
