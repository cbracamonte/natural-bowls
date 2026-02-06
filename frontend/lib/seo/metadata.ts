// lib/seo/metadata.ts
// Generador de metadata centralizado

import type { Metadata } from "next";
import { SITE_CONFIG, SEO_KEYWORDS } from "./constants";

export function generateRootMetadata(): Metadata {
  return {
    // Títulos y descripciones
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,

    // Keywords y metaetiquetas básicas
    keywords: [...SEO_KEYWORDS],
    applicationName: SITE_CONFIG.name,
    category: "food & restaurants",
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verificación
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    },

    // URLs alternativas
    alternates: {
      canonical: SITE_CONFIG.url,
      languages: {
        "es-ES": `${SITE_CONFIG.url}/es`,
        "es-MX": `${SITE_CONFIG.url}/es-mx`,
      },
    },

    // Open Graph
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - Comida Saludable`,
          type: "image/jpeg",
        },
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImageSquare}`,
          width: 800,
          height: 800,
          alt: `${SITE_CONFIG.name} - Bowls Saludables`,
          type: "image/jpeg",
        },
      ],
      type: "website",
      locale: SITE_CONFIG.locale,
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}${SITE_CONFIG.twitterImage}`],
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
    },

    // Icons
    icons: {
      icon: [
        { url: "/images/naturalbowls.ico", sizes: "any" },
      ],
    },

    // Manifest
    manifest: "/manifest.json",
  };
}

/**
 * Genera metadata dinámica para páginas específicas
 * Usar en pages que necesitan metadata personalizada
 *
 * @example
 * export const metadata = generatePageMetadata({
 *   title: "Nuestro Menú",
 *   description: "Explora nuestro completo menú de bowls saludables"
 * });
 */
export function generatePageMetadata(
  pageData: {
    title: string;
    description: string;
    image?: string;
    keywords?: string[];
  }
): Metadata {
  const pageTitle = `${pageData.title} | ${SITE_CONFIG.name}`;
  const pageImage = pageData.image || SITE_CONFIG.ogImage;

  return {
    title: pageTitle,
    description: pageData.description,
    keywords: pageData.keywords ? [...SEO_KEYWORDS, ...pageData.keywords] : [...SEO_KEYWORDS],
    openGraph: {
      title: pageTitle,
      description: pageData.description,
      images: [
        {
          url: `${SITE_CONFIG.url}${pageImage}`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      title: pageTitle,
      description: pageData.description,
      images: [`${SITE_CONFIG.url}${pageImage}`],
    },
  };
}

/**
 * Genera metadata dinámico para páginas de productos
 * Optimizado para e-commerce SEO
 */
export function generateProductMetadata(product: {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  reviews?: number;
}): Metadata {
  const pageTitle = `${product.title} - ${SITE_CONFIG.name}`;
  const keywords = [product.title, "bowl saludable", "comida orgánica"];

  return {
    title: pageTitle,
    description: product.description,
    keywords: [...SEO_KEYWORDS, ...keywords],
    openGraph: {
      title: pageTitle,
      description: product.description,
      images: [
        {
          url: `${SITE_CONFIG.url}${product.image}`,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      url: `${SITE_CONFIG.url}/producto/${product.id}`,
    },
  };
}
