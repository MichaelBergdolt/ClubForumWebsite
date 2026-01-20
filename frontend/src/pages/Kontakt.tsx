import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, MessageSquare, Map, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleMapsConsent from "@/components/GoogleMapsConsent";
import SuccessToast from "@/components/ui/SuccessToast";
import { useContactForm } from "@/hooks/useContactForm";

const Kontakt = () => {
  // State angepasst: 'anfrageArt' steuert das Dropdown, 'betreff' ist das Textfeld
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    anfrageArt: "", // Früher 'betreff'
    betreff: "",    // Neu: Freitextfeld
    datum: "",
    nachricht: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    anfrageArt: "",
    betreff: "",
    nachricht: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const { submitContact, loading, error: submitError } = useContactForm();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      anfrageArt: "",
      betreff: "",
      nachricht: ""
    };

    if (!formData.name.trim()) newErrors.name = "Name ist erforderlich";
    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein";
    }
    
    // Validierung für Dropdown
    if (!formData.anfrageArt) newErrors.anfrageArt = "Bitte wähle eine Art der Anfrage";

    // Validierung für Betreff (nur wenn Allgemein ausgewählt ist)
    if (formData.anfrageArt === "allgemein" && !formData.betreff.trim()) {
      newErrors.betreff = "Bitte gib einen Betreff an";
    }

    if (!formData.nachricht.trim()) newErrors.nachricht = "Nachricht ist erforderlich";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        anfrageArt: formData.anfrageArt as "mietanfrage" | "allgemein",
        betreff: formData.anfrageArt === "allgemein" ? formData.betreff.trim() : undefined,
        datum: formData.anfrageArt === "mietanfrage" && formData.datum ? formData.datum : undefined,
        nachricht: formData.nachricht.trim(),
      });

      // show Success
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        anfrageArt: "",
        betreff: "",
        datum: "",
        nachricht: ""
      });

      setErrors({
        name: "",
        email: "",
        anfrageArt: "",
        betreff: "",
        nachricht: ""
      });
    } catch {
      // Fehler wird im Hook behandelt
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
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

      {/* Kontaktformular & Info */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Kontaktformular */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center text-white">
                  <MessageSquare className="h-6 w-6 mr-2 text-accent-primary" />
                  Kontaktformular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Dein Name"
                      required
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="deine@email.de"
                      required
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Art der Anfrage (Dropdown) */}
                  <div className="space-y-2">
                    <Label htmlFor="anfrageArt" className="text-gray-200">Art der Anfrage *</Label>
                    <Select value={formData.anfrageArt} onValueChange={(value) => handleInputChange("anfrageArt", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Worum geht es?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mietanfrage">Mietanfrage</SelectItem>
                        <SelectItem value="allgemein">Allgemeine Anfrage</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.anfrageArt && <p className="text-sm text-red-600">{errors.anfrageArt}</p>}
                  </div>

                  {/* Conditional: Datum nur bei Mietanfrage */}
                  {formData.anfrageArt === "mietanfrage" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <Label htmlFor="datum" className="text-gray-200">Gewünschtes Datum</Label>
                      <Input
                        id="datum"
                        type="date"
                        value={formData.datum}
                        onChange={(e) => handleInputChange("datum", e.target.value)}
                      />
                    </div>
                  )}

                  {/* Conditional: Betreff Textfeld nur bei Allgemein */}
                  {formData.anfrageArt === "allgemein" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <Label htmlFor="betreff" className="text-gray-200">Betreff *</Label>
                      <Input
                        id="betreff"
                        type="text"
                        value={formData.betreff}
                        onChange={(e) => handleInputChange("betreff", e.target.value)}
                        placeholder="Kurz zusammengefasst worum es geht"
                      />
                      {errors.betreff && <p className="text-sm text-red-600">{errors.betreff}</p>}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="nachricht" className="text-gray-200">Deine Nachricht *</Label>
                    <Textarea
                      id="nachricht"
                      value={formData.nachricht}
                      onChange={(e) => handleInputChange("nachricht", e.target.value)}
                      placeholder="Erzähl uns von deiner Idee oder stelle deine Frage..."
                      rows={5}
                      required
                    />
                    {errors.nachricht && <p className="text-sm text-red-600">{errors.nachricht}</p>}
                  </div>

                  <div className="space-y-2 text-xs text-gray-400">
                    <p>Mit * markierte Felder sind Pflichtfelder.</p>
                    <p>
                      Mit dem Absenden des Formulars erklärst du dich mit unserer{" "}
                      <Link to="/datenschutz" className="text-accent-primary hover:underline">
                        Datenschutzerklärung
                      </Link>{" "}
                      einverstanden.
                    </p>
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded">
                      Fehler: {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent-primary hover:bg-accent-primary/80 text-white font-semibold disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      "Nachricht absenden"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Location Info */}
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center text-white">
                    <MapPin className="h-6 w-6 mr-2 text-accent-primary" />
                    Unsere Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-white">Club Forum Böblingen</h3>
                    <p className="text-gray-300">Marktstraße 9</p>
                    <p className="text-gray-300">71032 Böblingen</p>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps with GDPR Consent */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center text-white">
                    <Map className="h-6 w-6 mr-2 text-accent-primary" />
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

      {/* Success Toast */}
      {showSuccess && (
        <SuccessToast
          message="Nachricht gesendet!"
          description="Wir werden uns so schnell wie möglich bei dir melden."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </Layout>
  );
};

export default Kontakt;
