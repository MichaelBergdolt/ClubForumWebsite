
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const LocationMieten = () => {
  const [openLightboxIndex, setOpenLightboxIndex] = useState(-1);

  const ausstattung = [
    {
      title: "Bar",
      description: "Der perfekte Treffpunkt inkl. Gläsern, Mehrwegbechern, Kühlschränken & Spülmaschine.",
      images: [
        "/images/location/Bar/Bar_3.jpg",
        "/images/location/Bar/Bar_2.jpg",
        "/images/location/Bar/Bar_4.jpg",
        "/images/location/Bar/Bar_5.jpg",
        "/images/location/Bar/Bar_6.jpg",
        "/images/location/Bar/Bar_7.jpg",
        "/images/location/Bar/Bar_8.jpg",
        "/images/location/Bar/Bar_9.jpg"
      ]
    },
    {
      title: "Gastraum", 
      description: "Dein Spot für Beerpong, Chillen und mehr. Tische & Stühle kannst du flexibel anordnen.",
      images: [
        "/images/location/Gastraum/Gastraum_1.jpg",
        "/images/location/Gastraum/Gastraum_2.jpg",
        "/images/location/Gastraum/Gastraum_3.jpg"
      ]
    },
    {
      title: "Gewölbekeller",
      description: "Unser Herzstück! Der Dancefloor mit satter Sound- & Lichtanlage für die ganze Nacht.",
      images: ["/images/location/Gewölbekeller.png"]
    },
    {
      title: "Küche & Sanitär",
      description: "Voll ausgestattete Küche mit Herd und Kühlschränken sowie getrennte WCs.",
      images: ["/images/location/Küche.png"]
    },
    {
      title: "Außenbereich",
      description: "Genieße die frische Luft auf unserer Terrasse. Ideal für den Sommer!",
      images: ["/images/location/Forum_Außenbereich.jpg"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section mit Hauptbild */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 max-w-7xl mx-auto">
        {/* Hero Text */}
        <div className="flex-[1.3] text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Deine Feier im Club Forum</h1>
          <p className="text-xl text-gray-300 mb-8">
            Erlebe unvergessliche Nächte in unserer einzigartigen Location im Herzen von Böblingen
          </p>
        </div>
        
        {/* Hauptbild */}
        <div className="flex-[0.7] max-w-xl lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <img 
          src="/images/events/past_events/stadtfest_2025/Stadtfest_1.jpg" 
          alt="Außenansicht des Club Forum" 
          className="w-full h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Ausstattung */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Alles, was du für deine Feier brauchst
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto mb-8"></div>
            <h3 className="text-3xl font-semibold text-white relative inline-block">
              Unsere Ausstattung
              {/* <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent-primary/50"></span> */}
            </h3>
          </div>
          
          <div className="space-y-12 lg:space-y-24 max-w-7xl mx-auto">
            {ausstattung.map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:gap-16 items-center group`}>
                {/* Mobile: Kombiniertes Bild + Text Element */}
                <div className="flex-1 max-w-2xl lg:hidden">
                  <div 
                    className="overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 cursor-pointer"
                    onClick={() => item.images.length > 1 ? setOpenLightboxIndex(index) : undefined}
                  >
                    <div className="relative">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Bilder-Anzahl Overlay - nur wenn mehrere Bilder */}
                      {item.images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Images className="h-3 w-3" />
                          {item.images.length} Bilder
                        </div>
                      )}
                    </div>
                    
                    {/* Text direkt unter dem Bild - mobile */}
                    <div className="bg-gray-800/95 backdrop-blur-sm p-6 border-t border-gray-700/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-black">{index + 1}</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                      </div>
                      <p className="text-base text-gray-300 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop: Separates Bild */}
                <div className="flex-1 max-w-2xl hidden lg:block">
                  <div 
                    className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 cursor-pointer"
                    onClick={() => item.images.length > 1 ? setOpenLightboxIndex(index) : undefined}
                  >
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Bilder-Anzahl Overlay - nur wenn mehrere Bilder */}
                    {item.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Images className="h-4 w-4" />
                        {item.images.length} Bilder
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Desktop: Separater Text */}
                <div className="flex-1 max-w-2xl hidden lg:block">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-black">{index + 1}</span>
                      </div>
                      <h4 className="text-4xl font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="relative py-0 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-secondary/30 to-transparent"></div>
            <div className="mx-6 w-3 h-3 bg-accent-secondary rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-secondary/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Preise */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Preise & Konditionen</h2>
            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <p className="text-lg leading-relaxed mb-6">
                Das gesamte Forum ist ehrenamtlich und non-profit. Deshalb bieten wir die Location 
                pro Abend für nur <span className="text-accent-primary font-bold text-2xl">300€</span> an.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <span className="text-accent-primary font-bold">Schüler und Studenten erhalten 100€ Rabatt!</span>
              </p>
              <p className="text-lg leading-relaxed">
                Wir sind von jungen Menschen für junge Menschen. Es kommt lediglich eine Kaution von 
                <span className="text-accent-primary font-bold"> 100€</span> hinzu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="relative py-0 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-secondary/30 to-transparent"></div>
            <div className="mx-6 w-3 h-3 bg-accent-secondary rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-secondary/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Wichtige Infos */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Wichtige Infos & Regeln</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-accent-primary">Kapazität & Zeiten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p><strong>Kapazität:</strong> Wir empfehlen maximal 60 Gäste für die beste Atmosphäre.</p>
                <p><strong>Mietzeiträume:</strong> Januar – Mai & September – November</p>
                <p><strong>Mietzeiten:</strong> Freitags & Samstags von 18:00 – 02:00 Uhr. Andere Tage sind auf Anfrage möglich.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-accent-primary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <polygon
                  points="12,3 22,20 2,20"
                  stroke="#facc15"
                  strokeWidth="2"
                  fill="transparent"
                />  
                <rect x="11" y="9" width="2" height="5" rx="1" fill="#facc15" />
                <rect x="11" y="16" width="2" height="2" rx="1" fill="#facc15" />
              </svg>
                No-Gos & Verantwortung
              </CardTitle>
            </CardHeader>

              <CardContent className="space-y-4 text-gray-300">
                <p><strong>Nicht erlaubt:</strong> Konfetti, Nebelmaschinen und Rauchen (inkl. Vapes etc.)</p>
                <p><strong>Null Toleranz:</strong> Gewalt, Rassismus und Ignoranz haben bei uns keinen Platz.</p>
                <p><strong>Verantwortung:</strong> Als Mieter haftest du für deine Gäste und die Einhaltung des Jugendschutzgesetzes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent-primary to-accent-secondary text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Bereit für deine Party?</h2>
          <Link to="/kontakt">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3">
              Stell jetzt deine Mietanfrage
            </Button>
          </Link>
        </div>
      </section>

      {/* Lightbox für Bildergalerie */}
      <Lightbox
        open={openLightboxIndex > -1}
        close={() => setOpenLightboxIndex(-1)}
        slides={openLightboxIndex > -1 ? ausstattung[openLightboxIndex].images.map(src => ({ src })) : []}
      />
    </Layout>
  );
};

export default LocationMieten;
