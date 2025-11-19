// router.tsx
import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import LocationMieten from "./pages/LocationMieten";
import Events from "./pages/Events";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Index />
        </>
      ),
    },
    {
      path: "/location-mieten",
      element: (
        <>
          <ScrollToTop />
          <LocationMieten />
        </>
      ),
    },
    {
      path: "/events",
      element: (
        <>
          <ScrollToTop />
          <Events />
        </>
      ),
    },
    {
      path: "/kontakt",
      element: (
        <>
          <ScrollToTop />
          <Kontakt />
        </>
      ),
    },
    {
      path: "/impressum",
      element: (
        <>
          <ScrollToTop />
          <Impressum />
        </>
      ),
    },
    {
      path: "/datenschutz",
      element: (
        <>
          <ScrollToTop />
          <Datenschutz />
        </>
      ),
    },
    {
      path: "/cookies",
      element: (
        <>
          <ScrollToTop />
          <Cookies />
        </>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]
);
