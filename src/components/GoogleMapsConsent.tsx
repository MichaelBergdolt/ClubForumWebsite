import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const GoogleMapsConsent = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("google-maps-consent");
    setHasConsent(consent === "true");
    setIsLoading(false);
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem("google-maps-consent", "true");
    setHasConsent(true);
  };

  const handleDeclineConsent = () => {
    localStorage.setItem("google-maps-consent", "false");
    setHasConsent(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-background border border-border animate-pulse rounded-lg" />
    );
  }

  if (!hasConsent) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <MapPin className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Google Maps</h3>
          <p className="text-sm text-gray-300">
            Um die Karte anzuzeigen, musst du Google Maps aktivieren. Dabei können personenbezogene Daten an Google übermittelt werden.
          </p>

          <Button 
            onClick={handleAcceptConsent}
            className="w-full bg-accent-primary hover:bg-accent-primary/80 text-white font-semibold"
          >
            Google Maps aktivieren
          </Button>

          <div className="text-xs text-gray-400 space-y-1">
            <p>
              Weitere Informationen findest du in unserer{" "}
              <Link to="/datenschutz" className="text-accent-primary hover:underline">
                Datenschutzerklärung
              </Link>
            </p>
            <p>
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-primary hover:underline inline-flex items-center gap-1"
              >
                Google Datenschutzhinweise
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://maps.google.com/maps?q=Marktstraße+9,+71032+Böblingen&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps - Club Forum Böblingen"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Zentral gelegen in der Böblinger Innenstadt, gut erreichbar mit öffentlichen Verkehrsmitteln.
        </p>
        <Button
          onClick={handleDeclineConsent}
          size="sm"
          variant="outline"
          className="text-xs border-muted-foreground text-muted-foreground bg-transparent hover:bg-muted/50"
        >
          Karte deaktivieren
        </Button>
      </div>
    </div>
  );
};

export default GoogleMapsConsent;