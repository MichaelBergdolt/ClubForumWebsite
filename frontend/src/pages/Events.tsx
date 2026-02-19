import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ExpandableText from "@/components/ui/ExpandableText";
import { CalendarDays, MapPin, Clock, Ticket, Images } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { nextEvent, upcomingEvents, pastEvents } from "@/data/events";

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


  // Use event-specific accent color if defined, otherwise fallback to default accent-primary
  const eventAccentColor = nextEvent.accentColor ? {
    primary: nextEvent.accentColor.primary,
    primaryDark: nextEvent.accentColor.primaryDark,
    primaryLight: nextEvent.accentColor.primaryLight,
  } : null;

  return (
    <Layout>
      {/* Next Event Hero Section */}
      <section
        className="relative py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
        style={
          eventAccentColor ? {
            "--event-primary": eventAccentColor.primary,
            "--event-primary-dark": eventAccentColor.primaryDark,
            "--event-primary-light": eventAccentColor.primaryLight,
          } as React.CSSProperties : undefined
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h1
                className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent leading-tight break-words"
                style={eventAccentColor ? {
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, hsl(var(--event-primary)) 40%, hsl(var(--event-primary)) 60%, rgba(255,255,255,0.8) 100%)`,
                  lineHeight: "1.2", // Erhöht die Zeilenhöhe, damit Buchstaben wie "y" nicht abgeschnitten werden
                } : {
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, hsl(var(--accent-primary)) 40%, hsl(var(--accent-primary)) 60%, rgba(255,255,255,0.8) 100%)`,
                  lineHeight: "1.2",
                }}
              >
                {nextEvent.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {nextEvent.description}
              </p>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {nextEvent.eventDetails.map((detail, index) => {
                const IconComponent = getIconComponent(detail.icon);
                return (
                  <div key={index} className="text-center group h-full">
                    <div
                      className="rounded-lg p-6 transition-all duration-300 h-full flex flex-col justify-center min-h-[140px] border"
                      style={eventAccentColor ? {
                        backgroundColor: `hsl(var(--event-primary) / 0.2)`,
                        borderColor: `hsl(var(--event-primary) / 0.5)`,
                      } : {
                        backgroundColor: `hsl(var(--accent-primary) / 0.2)`,
                        borderColor: `hsl(var(--accent-primary) / 0.5)`,
                      }}
                      onMouseEnter={(e) => {
                        const bgColor = eventAccentColor ? `hsl(var(--event-primary) / 0.3)` : `hsl(var(--accent-primary) / 0.3)`;
                        e.currentTarget.style.backgroundColor = bgColor;
                      }}
                      onMouseLeave={(e) => {
                        const bgColor = eventAccentColor ? `hsl(var(--event-primary) / 0.2)` : `hsl(var(--accent-primary) / 0.2)`;
                        e.currentTarget.style.backgroundColor = bgColor;
                      }}
                    >
                      <IconComponent
                        className="h-8 w-8 mx-auto mb-3"
                        style={eventAccentColor ? { color: `hsl(var(--event-primary))` } : { color: `hsl(var(--accent-primary))` }}
                      />
                      <h3 className="text-lg font-bold text-white mb-2">
                        {detail.title}
                      </h3>
                      <p className="text-gray-300 whitespace-pre-line">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Artists Section */}
      {nextEvent.artists.length > 0 && (
        <section
          className="py-20 bg-gradient-to-b from-gray-950 to-black"
          style={eventAccentColor ? {
            "--event-primary": eventAccentColor.primary,
            "--event-primary-dark": eventAccentColor.primaryDark,
            "--event-primary-light": eventAccentColor.primaryLight,
          } as React.CSSProperties : undefined}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Die Acts des Abends
              </h2>
              <div
                className="w-24 h-1 mx-auto"
                style={eventAccentColor ? { backgroundColor: `hsl(var(--event-primary))` } : { backgroundColor: `hsl(var(--accent-primary))` }}
              ></div>
            </div>

            <div className="max-w-7xl mx-auto space-y-20">
              {nextEvent.artists.map((artist, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col lg:flex-row items-center gap-12 group ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Artist Image */}
                    <div className="w-full lg:w-1/2 relative overflow-hidden rounded-xl">
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </AspectRatio>
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={eventAccentColor ? {
                          background: `linear-gradient(135deg, hsl(var(--event-primary) / 0.2), transparent 50%, hsl(var(--event-primary) / 0.1))`
                        } : {
                          background: `linear-gradient(135deg, hsl(var(--accent-primary) / 0.2), transparent 50%, hsl(var(--accent-primary) / 0.1))`
                        }}
                      ></div>
                    </div>

                    {/* Artist Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                      <div className="space-y-4">
                        <h3 
                          className="text-3xl md:text-4xl font-bold transition-colors duration-300"
                          style={eventAccentColor ? { color: `hsl(var(--event-primary))` } : { color: `hsl(var(--accent-primary))` }}
                        >
                          {artist.name}
                        </h3>
                        <div 
                          className="w-16 h-1 transition-all duration-500 group-hover:w-24"
                          style={eventAccentColor ? { backgroundColor: `hsl(var(--event-primary))` } : { backgroundColor: `hsl(var(--accent-primary))` }}
                        ></div>
                      </div>
                      <ExpandableText 
                        text={artist.description}
                        maxLength={500}
                        className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Kommende Events */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Weitere Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 group overflow-hidden bg-gray-800/50 border-gray-700"
              >
                <div className="relative">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </AspectRatio>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-bold text-xl text-white">
                      {event.title}
                    </CardTitle>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mt-4">
                    {event.date && (
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-accent-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-300">
                          {event.date}
                        </span>
                      </div>
                    )}
                    {event.locationName && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-accent-primary mt-[1px] flex-shrink-0" />
                        <div className="text-sm font-medium text-gray-300 leading-tight">
                          <div>{event.locationName}</div>
                          {event.locationAddress && (
                            <div className="text-sm font-medium text-gray-400">
                              {event.locationAddress}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {event.description && (
                       <p className="text-gray-300 text-base leading-relaxed pt-1">
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
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            So legendär waren unsere letzten Partys
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {" "}
            {/* Gap vergrößert */}
            {pastEvents.map((event, index) => (
              <Card
                key={index}
                onClick={() => setOpenLightboxIndex(index)}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group bg-gray-800/30 border-gray-600 hover:bg-gray-700/50"
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
        slides={
          openLightboxIndex > -1
            ? pastEvents[openLightboxIndex].images.map((src) => ({ src }))
            : []
        }
      />

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Verpasse kein Event!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Folge uns auf Instagram für die neuesten Updates und
            Behind-the-Scenes Content
          </p>
          <a
            href="https://www.instagram.com/club_forumbb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-accent-primary hover:bg-accent-primary/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors space-x-2"
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
