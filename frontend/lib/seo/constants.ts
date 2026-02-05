// lib/seo/constants.ts
// Constantes de SEO centralizadas

export const SITE_CONFIG = {
  name: "Natural Bowls",
  title: "Natural Bowls | Comida Saludable y Deliciosa",
  description:
    "Descubre Natural Bowls: poke bowls, smoothie bowls, bebidas naturales y café gourmet. Comida fresca, orgánica y personalizable entregada a domicilio.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://naturalbowls.com",
  ogImage: "/og-image.jpg",
  ogImageSquare: "/og-image-square.jpg",
  twitterImage: "/twitter-image.jpg",
  twitterHandle: "@naturalbowls",
  email: "info@naturalbowls.com",
  phone: "+1-555-123-4567",
  locale: "es_ES",
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
  streetAddress: "123 Health Street",
  addressLocality: "Your City",
  addressRegion: "Your State",
  postalCode: "12345",
  addressCountry: "US",
  priceRange: "$$",
  servesCuisine: "Health Food",
} as const;
