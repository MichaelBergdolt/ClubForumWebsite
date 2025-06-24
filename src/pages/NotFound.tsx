
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-neon-green">404</h1>
          <h2 className="text-3xl font-semibold">Oops! Seite nicht gefunden</h2>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Die Seite, die du suchst, existiert nicht oder wurde verschoben.
          </p>
          <Link to="/">
            <Button className="bg-neon-green hover:bg-neon-green/80 text-black font-semibold">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
