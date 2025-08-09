
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowDown, CalendarDays, MapPin } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/7275d9d5-5b8c-43b0-a397-f9f603d43291.png')`
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow animate-fade-in">
            Club Forum Böblingen
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow animate-fade-in">
            Deine Mietlocation & Event-Community in Böblingen
          </p>
          <Link to="/kontakt">
            <Button size="lg" className="bg-neon-green hover:bg-neon-green/80 text-black font-semibold px-8 py-3 text-lg animate-fade-in">
              Jetzt anfragen
            </Button>
          </Link>
        </div>
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"> // TODO: Ask for Opinion
          <ArrowDown className="h-8 w-8 text-white" />
        </div> */}
      </section>

      {/* Über Uns Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl font-bold text-black">Wir sind das Forum.</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Das Club Forum ist DEINE Eventlocation in Böblingen – organisiert von jungen, 
                ehrenamtlichen Böblinger*innen für junge Leute. Von offenen Bar-Abenden über 
                legendäre Halloween-Partys bis zu den traditionellen Club Forum OFTAS.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unser Zuhause ist die Marktstraße 9, wo wir auf zwei Ebenen Platz für bis zu 
                60 Personen, unvergessliche Partys und unsere regelmäßigen Team-Treffen bieten.
              </p>
            </div>
            <div className="animate-fade-in group overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/images/bba08558-a84b-4f38-943f-612b787555fc.png" 
                alt="Club Forum Team" 
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Angebote Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Was geht bei uns?</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-neon-green">
              <CardHeader>
                <CardTitle className="text-2xl font-bold group-hover:text-neon-green transition-colors">
                  Feier deine Party bei uns!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 text-lg">
                  Miete das Forum für deinen Geburtstag oder deine private Feier. 
                  Zentral gelegen, mit Gewölbekeller, Bar und Platz für bis zu 60 Personen.
                </CardDescription>
                <Link to="/location-mieten">
                  <Button className="bg-neon-green hover:bg-neon-green/80 text-black font-semibold">
                    Alle Details & Preise
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-neon-green">
              <CardHeader>
                <CardTitle className="text-2xl font-bold group-hover:text-neon-green transition-colors">
                  Unsere Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 text-lg">
                  Wir veranstalten legendäre Partys wie die OFTAS, Halloween und mehr. 
                  Erlebe die besten Nächte des Jahres mit uns.
                </CardDescription>
                <Link to="/events">
                  <Button className="bg-neon-green hover:bg-neon-green/80 text-black font-semibold">
                    Zu den Events & Fotos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Komm auf ein Bier vorbei – Werde Mitglied!</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Du hast Lust, das Forum mitzugestalten, bei Events mitzuhelfen oder vielleicht sogar deine eigene 
          Partyidee umzusetzen? Dann quatsch uns einfach bei einer unserer Veranstaltungen an – wir freuen 
          uns immer über neue Gesichter!
        </p>
      </div>
      </section>
    </Layout>
  );
};

export default Index;
