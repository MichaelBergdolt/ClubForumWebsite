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

  const upcomingEvents = [
    {
      title: "Summer Vibes",
      date: "02.08.2025",
      locationName: "Club Forum",
      locationAddress: "Marktstraße 9, 71032 Böblingen",
      time: "ab 14 Uhr, Party im Club ab 22 Uhr",
      price: "Eintritt frei",
      description: "Am 01.08.2025 veranstalten wir unser jährliches Sommerfest. Freu dich auf gute Musik, kalte Drinks und Bierpong!",
      image: "/lovable-uploads/Summer_Vibes_2025.jpg",
      featured: true
    },
    {
      title: "Halloween",
      date: "31.10.2025",
      locationName: "Club Forum",
      locationAddress: "Marktstraße 9, 71032 Böblingen",
      description: "Jedes Jahr am 31.10. feiern wir die gruseligste Nacht des Jahres. Kostüm an und los!",
      image: "/lovable-uploads/Halloween.png",
    },
    {
      title: "Die CLUB FORUM OFTAS",
      date: "27.-29.12.2025",
      locationName: "Waldheim Tannenberg",
      locationAddress: "Murkenbachweg 120, 71032 Böblingen",
      description: "Unser Jahres-Highlight vom 27.–29.12. im Waldheim Tannenberg. Drei Tage Live-Musik und Aftershow-Partys, die du nicht verpassen darfst!",
      image: "/lovable-uploads/OFTAS_Logo.png"
    },
    {
      title: "Bierpongturnier",
      date: "Coming Soon",
      description: "Das Event um deine Skills beim Beerpong zu zeigen. Also auf wartest du? Melde dich mit deinem perfekten Teampartner an und sichere dir die 2 Kästen Gewinn!",
      image: "/lovable-uploads/Beerpong_4_3_ausgeschnitten.png"
    }
  ];

  const pastEvents = [
    {
      title: "Stadtfest 2025",
      images: [
        "/lovable-uploads/stadtfest_2025/Stadtfest_1.jpg",
        "/lovable-uploads/stadtfest_2025/Stadtfest_2.jpg",
        "/lovable-uploads/stadtfest_2025/Stadtfest_3.jpg",
        "/lovable-uploads/stadtfest_2025/Stadtfest_4.jpg",
      ]
    },
    {
      title: "Halloween 2024",
      images: ["/lovable-uploads/6107e5b5-6fd5-48a1-aa57-fe91ac015b43.png"]
    },
    {
      title: "OFTAS 2024", 
      images: ["/lovable-uploads/bba08558-a84b-4f38-943f-612b787555fc.png"]
    },
    {
      title: "Sommerfest 2024",
      images: ["/lovable-uploads/9f703375-92aa-4230-80b8-66536c9e8f90.png"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Unsere Events</h1>
            <p className="text-xl text-gray-300">
              Von legendären Partys bis zu unvergesslichen Nächten – hier ist immer was los!
            </p>
          </div>
        </div>
      </section>

      {/* Kommende Events */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Kommende Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-neon-green text-black px-3 py-1 rounded-full text-sm font-bold">
                      Featured Event
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`font-bold ${event.featured ? 'text-2xl' : 'text-xl'}`}>
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
                    {event.time && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-neon-green flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-600">
                          {event.time}
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
                    {event.price && (
                      <div className="flex items-center">
                        <Ticket className="h-4 w-4 mr-2 text-neon-green flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-600">
                          {event.price}
                        </span>
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
              <div 
                key={index} 
                className="group cursor-pointer"
                // Klick-Handler, um die Lightbox für dieses Event zu öffnen
                onClick={() => setOpenLightboxIndex(index)} 
              >
                <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={event.images[0]} // Immer das erste Bild als Vorschau
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  {/* Overlay für den visuellen Hinweis */}
                  {event.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                      <Images className="h-3 w-3" />
                      {event.images.length} Bilder
                    </div>
                  )}
                </div>
                {/* Titel immer sichtbar unter dem Bild */}
                <h3 className="text-lg font-bold mt-3 text-gray-800">{event.title}</h3>
              </div>
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
