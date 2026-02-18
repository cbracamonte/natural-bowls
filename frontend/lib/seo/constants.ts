// lib/seo/constants.ts
// Constantes de SEO centralizadas

export const SITE_CONFIG = {
  name: "Natural Bowls",
  title: "Natural Bowls | Comida Saludable y Deliciosa",
  description:
    "Descubre Natural Bowls: poke bowls, smoothie bowls, bebidas naturales y café gourmet. Comida fresca, orgánica y personalizable entregada a domicilio.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://naturalbowls.com",
  ogImage: "/og-image.jpg",
  ogImageSquare: "/og-image-square.jpg",
  twitterImage: "/twitter-image.jpg",
  twitterHandle: "@naturalbowls",
  email: "info@naturalbowls.com",
  phone: "+51 912 341 818",
  address: "Av. América Sur 3875, Trujillo - Perú",
  locale: "es_ES",
} as const;

export const BUSINESS_HOURS = {
  opening: "8:30 AM - 9:00 PM",
  reservation: "9:00 AM - 8:00 PM",
  days: "Lunes a Sábado",
  closed: "Domingo",
} as const;

export const SEO_KEYWORDS = [
  "poke bowls",
  "smoothie bowls",
  "comida saludable",
  "bowls orgánicos",
  "comida sana",
  "delivery saludable",
  "café gourmet",
  "bebidas naturales",
  "alimentación sana",
  "comida fresca",
] as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/naturalbowls",
  instagram: "https://www.instagram.com/naturalbowls",
  twitter: "https://www.twitter.com/naturalbowls",
  linkedin: "https://www.linkedin.com/company/naturalbowls",
} as const;

export const BUSINESS_INFO = {
  type: "LocalBusiness",
  streetAddress: "Av. América Sur 3875",
  addressLocality: "Trujillo",
  addressRegion: "La Libertad",
  postalCode: "13000",
  addressCountry: "PE",
  priceRange: "$$",
  servesCuisine: "Health Food",
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
