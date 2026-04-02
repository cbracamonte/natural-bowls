// lib/seo/constants.ts
// Constantes de SEO centralizadas

export const SITE_CONFIG = {
  name: "Natural Bowls",
  title: "Natural Bowls | Restaurante Saludable en Trujillo - Bowls, Wraps, Postres Fit y Mas",
  description:
    "Natural Bowls en Trujillo: restaurante de comida saludable para todo publico. Poke bowls, smoothie bowls, wraps, ensaladas, waffles fit, postres saludables, desayunos proteicos y cafe gourmet. Ingredientes frescos y organicos. Pedidos online y delivery. Av. America Sur 3875.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://naturalbowlscafe.com").replace(/\/+$/, ""),
  ogImage: "/og-image.jpg",
  ogImageSquare: "/og-image-square.jpg",
  twitterImage: "/twitter-image.jpg",
  twitterHandle: "@naturalbowls",
  email: "info@naturalbowls.com",
  phone: "+51 912 341 818",
  address: "Av. América Sur 3875, Trujillo - Perú",
  locale: "es_ES",
  libroReclamacionesUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe3KTh8ysfKVzpZIJ9kox60pgkXqW2wl5hZrSOYlqltaTBZ_Q/viewform?usp=publish-editor",
} as const;

export const BUSINESS_HOURS = {
  opening: "8:30 AM - 9:00 PM",
  reservation: "9:00 AM - 8:00 PM",
  days: "Lunes a Sábado",
  closed: "Domingo",
} as const;

export const SEO_KEYWORDS = [
  // Core — restaurante y ubicación
  "restaurante saludable Trujillo",
  "comida saludable Trujillo",
  "comida saludable en Trujillo",
  "restaurante fit Trujillo",
  "comida sana Trujillo",
  "Natural Bowls Trujillo",

  // Productos principales
  "poke bowls",
  "poke bowls Trujillo",
  "smoothie bowls",
  "smoothie bowls Trujillo",
  "bowls personalizados",
  "arma tu bowl",
  "wraps saludables",
  "ensaladas frescas",
  "sandwiches saludables",

  // Desayunos y postres fit
  "desayunos saludables Trujillo",
  "desayunos proteicos",
  "waffles fit",
  "waffles saludables",
  "postres fit",
  "postres saludables",
  "tostones saludables",
  "parfait saludable",

  // Bebidas
  "jugos naturales Trujillo",
  "smoothies saludables",
  "café gourmet",
  "bebidas naturales",
  "milkshakes saludables",
  "infusiones naturales",

  // Estilo de vida y público
  "comida fitness",
  "comida proteica",
  "alimentación saludable",
  "comida vegetariana Trujillo",
  "comida orgánica",
  "comida para deportistas",
  "comida alta en proteína",
  "comida baja en calorías",
  "comida con información nutricional",
  "comida saludable para niños",

  // Delivery y servicio
  "delivery saludable Trujillo",
  "comida saludable a domicilio",
  "pedidos online comida saludable",
  "comida saludable para llevar",
  "catering saludable Trujillo",
] as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/naturalbowls",
  instagram: "https://www.instagram.com/naturalbowls",
  twitter: "https://www.twitter.com/naturalbowls",
  linkedin: "https://www.linkedin.com/company/naturalbowls",
} as const;

export const BUSINESS_INFO = {
  // Restaurant es más específico que LocalBusiness y habilita rich results de Google
  type: "Restaurant",
  streetAddress: "Av. América Sur 3875",
  addressLocality: "Trujillo",
  addressRegion: "La Libertad",
  postalCode: "13000",
  addressCountry: "PE",
  priceRange: "$$",
  servesCuisine: ["Health Food", "Poke Bowl", "Smoothie Bowl", "Organic", "Vegetarian", "High Protein", "Fitness Food", "Healthy Desserts", "Fresh Juices"],
  // Coordenadas de Av. América Sur 3875, Trujillo
  latitude: -8.1116,
  longitude: -79.0317,
  hasMap: "https://maps.google.com/?q=Av.+América+Sur+3875+Trujillo+Perú",
  openingHours: [
    "Mo-Sa 08:30-21:00",
  ],
  currencyAccepted: "PEN",
  paymentAccepted: "Cash, Credit Card, Debit Card",
} as const;

export const DISCOUNTS_CODES = {
  FIRSTORDER: {
    code: "NB15",
    description: "15% de descuento en tu primer pedido",
    percentage: 0.15,
    expirationDays: 7,
    rules: [
      {
        label: "Tu número no tiene historial previo",
        tag: "Primer cliente",
        shortDescription: "Primer cliente o sin pedidos recientes",
        longDescription:
          "El código de descuento es válido para clientes que no han realizado pedidos previos o no han tenido actividad reciente en los últimos 6 meses.",
      },
      {
        label: "El formato del pedido es estándar",
        tag: "Sistema web",
        shortDescription: "Pedidos regulares en nuestra plataforma",
        longDescription:
          "El código es aplicable únicamente a pedidos realizados a través de nuestro sistema web, no es válido para pedidos telefónicos o en persona.",
      },
      {
        label: "El código NB15 coincide",
        tag: "Único uso",
        shortDescription: "Código específico para este descuento",
        longDescription:
          "El código de descuento debe ser exactamente NB15 para ser válido. No se aceptan variaciones o códigos similares.",
      },
      {
        label: "No transferible y no acumulable con otras ofertas",
        tag: "No combinable",
        shortDescription: "No se puede combinar con otros descuentos",
        longDescription:
          "El código de descuento no es transferible y no se puede combinar con otras ofertas o promociones vigentes.",
      },
    ],
    terms: [
      { label: "Una sola vez", description: "Úsalo en tu primer pedido" },
      { label: "Personal", description: "Vinculado a tu WhatsApp" },
    ],
    cta: {
      label: "Ahora dirigete al Carrito y realiza tu primer pedido",
      urlText: "Carrito",
      url: "/checkout",
    },
  },
};
