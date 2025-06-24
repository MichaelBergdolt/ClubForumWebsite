
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    betreff: "",
    datum: "",
    nachricht: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Nachricht gesendet!",
      description: "Wir werden uns so schnell wie möglich bei dir melden.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      betreff: "",
      datum: "",
      nachricht: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Schreib uns oder komm vorbei</h1>
            <p className="text-xl text-gray-300">
              Wir freuen uns auf deine Nachricht und helfen gerne bei allen Fragen weiter!
            </p>
          </div>
        </div>
      </section>

      {/* Kontakt Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Kontaktformular */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Kontaktformular</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Dein Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="deine@email.de"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="betreff">Betreff *</Label>
                    <Select onValueChange={(value) => handleInputChange("betreff", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle einen Betreff" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mietanfrage">Mietanfrage</SelectItem>
                        <SelectItem value="mitgliedschaft">Mitgliedschaftsanfrage</SelectItem>
                        <SelectItem value="allgemein">Allgemeine Frage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="datum">Gewünschtes Datum (optional)</Label>
                    <Input
                      id="datum"
                      type="date"
                      value={formData.datum}
                      onChange={(e) => handleInputChange("datum", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nachricht">Deine Nachricht *</Label>
                    <Textarea
                      id="nachricht"
                      required
                      rows={5}
                      value={formData.nachricht}
                      onChange={(e) => handleInputChange("nachricht", e.target.value)}
                      placeholder="Erzähl uns von deiner Idee oder stelle deine Frage..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
                  >
                    Nachricht absenden
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Location Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-neon-green" />
                    Unsere Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Club Forum Böblingen</h3>
                    <p className="text-gray-600">Marktstraße 9</p>
                    <p className="text-gray-600">71032 Böblingen</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-neon-green" />
                    <a 
                      href="mailto:club-forum@beispiel.de" 
                      className="text-neon-green hover:underline"
                    >
                      club-forum@beispiel.de
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Anfahrt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Google Maps Integration<br />
                      <span className="text-sm">Marktstraße 9, 71032 Böblingen</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Zentral gelegen in der Böblinger Innenstadt, gut erreichbar mit öffentlichen Verkehrsmitteln.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;
