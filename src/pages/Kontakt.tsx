
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, MessageSquare, Map } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import GoogleMapsConsent from "@/components/GoogleMapsConsent";
import { Link } from "react-router-dom";

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    betreff: "",
    datum: "",
    nachricht: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    betreff: "",
    nachricht: ""
  });
  
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      betreff: "",
      nachricht: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name ist erforderlich";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein";
    }

    if (!formData.betreff) {
      newErrors.betreff = "Betreff ist erforderlich";
    }

    if (!formData.nachricht.trim()) {
      newErrors.nachricht = "Nachricht ist erforderlich";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
    
    setErrors({
      name: "",
      email: "",
      betreff: "",
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
                <CardTitle className="text-2xl font-bold flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-neon-green" />
                  Kontaktformular
                </CardTitle>
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
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
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
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="betreff">Betreff *</Label>
                    <Select onValueChange={(value) => handleInputChange("betreff", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle einen Betreff" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mietanfrage">Mietanfrage</SelectItem>
                        <SelectItem value="allgemein">Allgemeine Anfrage</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.betreff && <p className="text-sm text-red-600">{errors.betreff}</p>}
                  </div>

                  {formData.betreff === "mietanfrage" && (
                    <div className="space-y-2">
                      <Label htmlFor="datum">Gewünschtes Datum</Label>
                      <Input
                        id="datum"
                        type="date"
                        value={formData.datum}
                        onChange={(e) => handleInputChange("datum", e.target.value)}
                      />
                    </div>
                  )}

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
                    {errors.nachricht && <p className="text-sm text-red-600">{errors.nachricht}</p>}
                  </div>
                    <div className="space-y-2">
                    <p className="text-xs text-gray-600">
                      Mit * markierte Felder sind Pflichtfelder.
                    </p>

                    <p className="text-xs text-gray-600">
                      Mit dem Absenden des Formulars erklärst du dich mit unserer{" "}
                      <Link 
                      to="/datenschutz" 
                      className="text-neon-green hover:underline"
                      >
                      Datenschutzerklärung
                      </Link>{" "}
                      einverstanden.
                    </p>
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
                      href="mailto:club.forum.bb@gmail.com" 
                      className="text-black hover:underline"
                    >
                      club.forum.bb@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps with GDPR Consent */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Map className="h-6 w-6 mr-2 text-neon-green" />
                    Anfahrt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GoogleMapsConsent />
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
