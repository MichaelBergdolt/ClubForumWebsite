
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b983d18a-4ef8-4680-b4a7-9175fbf48ba0.png" 
                alt="Club Forum Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">Club Forum Böblingen</span>
            </div>
            <p className="text-gray-400 text-sm">
              Deine Mietlocation & Event-Community in Böblingen
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/location-mieten" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Location Mieten
              </Link>
              <Link to="/events" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Events
              </Link>
              <Link to="/kontakt" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Kontakt
              </Link>
            </div>
          </div>
            {/* Social & Legal */}
            <div className="space-y-4">
            <h3 className="text-lg font-semibold">Folge uns</h3>
            <div className="flex space-x-4">
              <a 
              href="https://www.instagram.com/club_forumbb" 
              className="text-gray-400 hover:text-neon-green transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Instagram className="h-6 w-6" />
              </a>
              <a 
              href="https://www.facebook.com/profile.php?id=100064750176944" 
              className="text-gray-400 hover:text-neon-green transition-colors"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Facebook className="h-6 w-6" />
              </a>
            </div>
            
            <div className="space-y-2 text-sm">
              <Link to="/impressum" className="block text-gray-400 hover:text-neon-green transition-colors">
                Impressum
              </Link>
              <a href="#" className="block text-gray-400 hover:text-neon-green transition-colors">
                Datenschutz
              </a>
              <a href="#" className="block text-gray-400 hover:text-neon-green transition-colors">
                AGB
              </a>
              <a href="#" className="block text-gray-400 hover:text-neon-green transition-colors">
                Cookie-Einstellungen
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Club Forum Böblingen. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
