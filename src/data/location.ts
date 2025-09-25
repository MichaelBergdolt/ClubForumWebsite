export type LocationFeature = {
  title: string;
  description: string;
  images: string[];
};

export const ausstattung: LocationFeature[] = [
  {
    title: "Bar",
    description: "Der perfekte Treffpunkt inkl. Gläsern, Mehrwegbechern, Kühlschränken & Spülmaschine.",
    images: [
      "/images/location/Bar/Bar_3.jpg",
      "/images/location/Bar/Bar_2.jpg",
      "/images/location/Bar/Bar_4.jpg",
      "/images/location/Bar/Bar_5.jpg",
      "/images/location/Bar/Bar_6.jpg",
      "/images/location/Bar/Bar_7.jpg",
      "/images/location/Bar/Bar_8.jpg",
      "/images/location/Bar/Bar_9.jpg"
    ]
  },
  {
    title: "Gastraum", 
    description: "Dein Spot für Beerpong, Chillen und mehr. Tische & Stühle kannst du flexibel anordnen.",
    images: [
      "/images/location/Gastraum/Gastraum_1.jpg",
      "/images/location/Gastraum/Gastraum_2.jpg",
      "/images/location/Gastraum/Gastraum_3.jpg"
    ]
  },
  {
    title: "Gewölbekeller",
    description: "Unser Herzstück! Der Dancefloor mit satter Sound- & Lichtanlage für die ganze Nacht.",
    images: ["/images/location/Gewölbekeller.png"]
  },
  {
    title: "Küche & Sanitär",
    description: "Voll ausgestattete Küche mit Herd und Kühlschränken sowie getrennte WCs.",
    images: ["/images/location/Küche.png"]
  },
  {
    title: "Außenbereich",
    description: "Genieße die frische Luft auf unserer Terrasse. Ideal für den Sommer!",
    images: ["/images/location/Forum_Außenbereich.jpg"]
  }
];