
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
              src="/lovable-uploads/ba0fb2a5-73c5-4b15-a9c1-b223c9a0fb6c.png" 
              alt="Gewölbekeller Dancefloor" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Bildergalerie */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Räumlichkeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ausstattung.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                />
                <h3 className="text-xl font-bold text-center mt-4 text-neon-green">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ausstattung */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Alles, was du für deine Feier brauchst</h2>
          <h3 className="text-2xl font-semibold text-center mb-12 text-neon-green">Unsere Ausstattung</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {ausstattung.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
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
