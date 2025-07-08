
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LocationMieten = () => {
  const ausstattung = [
    {
      title: "Bar",
      description: "Der perfekte Treffpunkt inkl. Gläsern, Mehrwegbechern, Kühlschränken & Spülmaschine.",
      image: "/lovable-uploads/7275d9d5-5b8c-43b0-a397-f9f603d43291.png"
    },
    {
      title: "Gastraum", 
      description: "Dein Spot für Beerpong, Chillen und mehr. Tische & Stühle kannst du flexibel anordnen.",
      image: "/lovable-uploads/9fc4fb65-6c5a-4834-afab-b01d375d142c.png"
    },
    {
      title: "Gewölbekeller",
      description: "Unser Herzstück! Der Dancefloor mit satter Sound- & Lichtanlage für die ganze Nacht.",
      image: "/lovable-uploads/ba0fb2a5-73c5-4b15-a9c1-b223c9a0fb6c.png"
    },
    {
      title: "Küche & Sanitär",
      description: "Voll ausgestattete Küche mit Herd und Kühlschränken sowie getrennte WCs.",
      image: "/lovable-uploads/96cf793b-63a7-4e1c-9acc-aa0508df55e5.png"
    },
    {
      title: "Außenbereich",
      description: "Genieße die frische Luft auf unserer Terrasse. Ideal für den Sommer!",
      image: "/lovable-uploads/Forum_Garten.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Deine Feier im Club Forum</h1>
            <p className="text-xl text-gray-300 mb-8">
              Erlebe unvergessliche Nächte in unserer einzigartigen Location im Herzen von Böblingen
            </p>
          </div>
        </div>
      </section>

      {/* Hauptbild */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <img 
              src="/lovable-uploads/Forum_von_außen.jpg" 
              alt="Außenansicht des Club Forum" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Ausstattung */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-primary">
              Alles, was du für deine Feier brauchst
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-green to-neon-blue mx-auto mb-8"></div>
            <h3 className="text-3xl font-semibold text-primary relative inline-block">
              Unsere Ausstattung
              {/* <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-neon-green/50"></span> */}
            </h3>
          </div>
          
          <div className="space-y-12 lg:space-y-24 max-w-7xl mx-auto">
            {ausstattung.map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:gap-16 items-center group`}>
                {/* Mobile: Kombiniertes Bild + Text Element */}
                <div className="flex-1 max-w-2xl lg:hidden">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Text direkt im Bild - mobile */}
                    <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm rounded-t-2xl p-6 border-t border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-black">{index + 1}</span>
                        </div>
                        <h4 className="text-2xl font-bold text-primary">{item.title}</h4>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop: Separates Bild */}
                <div className="flex-1 max-w-2xl hidden lg:block">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                
                {/* Desktop: Separater Text */}
                <div className="flex-1 max-w-2xl hidden lg:block">
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-black">{index + 1}</span>
                      </div>
                      <h4 className="text-4xl font-bold text-primary">{item.title}</h4>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Preise & Konditionen</h2>
            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <p className="text-lg leading-relaxed mb-6">
                Das gesamte Forum ist ehrenamtlich und non-profit. Deshalb bieten wir die Location 
                pro Abend für nur <span className="text-neon-green font-bold text-2xl">300€</span> an.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <span className="text-neon-green font-bold">Schüler und Studenten erhalten 100€ Rabatt!</span>
              </p>
              <p className="text-lg leading-relaxed">
                Wir sind von jungen Menschen für junge Menschen. Es kommt lediglich eine Kaution von 
                <span className="text-neon-green font-bold"> 100€</span> hinzu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wichtige Infos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Wichtige Infos & Regeln</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-neon-green">Kapazität & Zeiten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Kapazität:</strong> Wir empfehlen maximal 60 Gäste für die beste Atmosphäre.</p>
                <p><strong>Mietzeiten:</strong> Januar–Mai & September–November</p>
                <p><strong>Öffnungszeiten:</strong> Freitags & Samstags von 18:00 – 02:00 Uhr. Andere Tage auf Anfrage.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-red-500">No-Gos & Verantwortung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Nicht erlaubt:</strong> Konfetti, Nebelmaschinen und Rauchen (inkl. Vapes etc.)</p>
                <p><strong>Null Toleranz:</strong> Gewalt, Rassismus und Ignoranz haben bei uns keinen Platz.</p>
                <p><strong>Verantwortung:</strong> Als Mieter haftest du für deine Gäste und die Einhaltung des Jugendschutzgesetzes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-neon-green to-neon-blue text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Bereit für deine Party?</h2>
          <Link to="/kontakt">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3">
              Stell jetzt deine Mietanfrage
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default LocationMieten;
