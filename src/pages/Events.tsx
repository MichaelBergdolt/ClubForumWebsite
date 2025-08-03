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
      title: "Oftas 2024",
      images: [
        "/lovable-uploads/oftas_2024/Oftas_1.jpg",
        "/lovable-uploads/oftas_2024/Oftas_2.jpg",
        "/lovable-uploads/oftas_2024/Oftas_3.jpg",
        "/lovable-uploads/oftas_2024/Oftas_4.jpg",
      ]
    },
  ];

  return (
    <Layout>
      {/* Unsere Events Hero Section - moved above Forum Fourtyfive */}
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

      {/* Forum Fourtyfive Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Responsive Background Banners */}
        <div className="absolute inset-0 z-0">
          {/* Mobile Banner */}
          <img 
            src="/lovable-uploads/d69c323a-4a83-4bea-bac3-c3c76311df98.png" 
            alt="Forum Fourtyfive Banner Mobile"
            className="md:hidden w-full h-full object-cover opacity-30"
          />
          {/* Tablet Banner */}
          <img 
            src="/lovable-uploads/42dae0a4-078e-49f3-be0a-167708ac2d70.png" 
            alt="Forum Fourtyfive Banner Tablet"
            className="hidden md:block lg:hidden w-full h-full object-cover opacity-30"
          />
          {/* Desktop Banner */}
          <img 
            src="/lovable-uploads/cba33d66-c472-446c-8019-b925283dadb7.png" 
            alt="Forum Fourtyfive Banner Desktop"
            className="hidden lg:block w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-neon-green to-white bg-clip-text text-transparent">
                Forum Fourtyfive
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Seit 45 Jahren steht das Club Forum für Jugendkultur, Musik und Gemeinschaft. Dieses Jubiläum feiern wir mit einem besonderen Sommerabend im Herzen Böblingens – gemeinsam mit euch im Fetzers Café Bar.
              </p>
            </div>
            
            {/* Event Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <div className="text-center group h-full">
                <div className="bg-neon-green/20 border border-neon-green/50 rounded-lg p-6 group-hover:bg-neon-green/30 transition-all duration-300 h-full flex flex-col justify-center min-h-[140px]">
                  <CalendarDays className="h-8 w-8 text-neon-green mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Datum</h3>
                  <p className="text-gray-300">Samstag, 06.09.2025</p>
                </div>
              </div>
              
              <div className="text-center group h-full">
                <div className="bg-neon-green/20 border border-neon-green/50 rounded-lg p-6 group-hover:bg-neon-green/30 transition-all duration-300 h-full flex flex-col justify-center min-h-[140px]">
                  <Clock className="h-8 w-8 text-neon-green mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Uhrzeit</h3>
                  <p className="text-gray-300">ab 17 Uhr</p>
                </div>
              </div>
              
              <div className="text-center group h-full">
                <div className="bg-neon-green/20 border border-neon-green/50 rounded-lg p-6 group-hover:bg-neon-green/30 transition-all duration-300 h-full flex flex-col justify-center min-h-[140px]">
                  <MapPin className="h-8 w-8 text-neon-green mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Ort</h3>
                  <p className="text-gray-300">Fetzers Böblingen<br/>Poststraße 38<br/>71032 Böblingen</p>
                </div>
              </div>
              
              <div className="text-center group h-full">
                <div className="bg-neon-green/20 border border-neon-green/50 rounded-lg p-6 group-hover:bg-neon-green/30 transition-all duration-300 h-full flex flex-col justify-center min-h-[140px]">
                  <Ticket className="h-8 w-8 text-neon-green mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Eintritt</h3>
                  <p className="text-gray-300">frei</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Die Acts des Abends</h2>
            <div className="w-24 h-1 bg-neon-green mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Jules */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-neon-green/50 transition-all duration-300 group overflow-hidden">
              <div className="relative">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="/lovable-uploads/a614f169-25ae-437b-bf63-00eaadfb720d.png" 
                    alt="Jules"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="text-white">
                <CardTitle className="text-2xl font-bold text-neon-green mb-3">Jules</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Mit ihrer Mischung aus Pop und Punkrock bringt die Stuttgarter Musikerin Jules starke Gefühle, kantige Sounds und empowernde Texte auf die Bühne. Ihr Stil ist laut, ehrlich und visuell durchdacht – ein echtes Statement mit Ohrwurm-Garantie.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* kleinstadt */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-neon-green/50 transition-all duration-300 group overflow-hidden">
              <div className="relative">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="/lovable-uploads/93f181f5-1458-4241-ba99-d6192592406a.png" 
                    alt="kleinstadt"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="text-white">
                <CardTitle className="text-2xl font-bold text-neon-green mb-3">kleinstadt</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Die Band kleinstadt aus Herrenberg vereint langjährige Freundschaft mit echtem Gefühl. In ihren Songs geht es um Liebe, Wut, Freiheit – aber vor allem ums Dazwischen – zwischen Jugend und Erwachsensein, zwischen Träumen und Realität.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Handbuch */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-neon-green/50 transition-all duration-300 group overflow-hidden">
              <div className="relative">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="/lovable-uploads/52c34112-6075-41fc-9ba1-c8bbdf2e1882.png" 
                    alt="Handbuch"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="text-white">
                <CardTitle className="text-2xl font-bold text-neon-green mb-3">Handbuch</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Platzhalter für Handbuch. Bitte später mit Bild und Beschreibung ergänzen.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Joost */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-neon-green/50 transition-all duration-300 group overflow-hidden">
              <div className="relative">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="/lovable-uploads/521c63ed-0d4b-49c7-a73b-01fa0a5d6968.png" 
                    alt="Joost"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="text-white">
                <CardTitle className="text-2xl font-bold text-neon-green mb-3">Joost</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Joost verbindet treibenden Indie-Rock mit Pop- und Elektro-Elementen und erzählt Geschichten über Selbstfindung, Nähe und das Gefühl von Rastlosigkeit. Mal laut, mal leise – aber immer voller Energie und echter Emotion.
                </CardDescription>
              </CardHeader>
            </Card>
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
