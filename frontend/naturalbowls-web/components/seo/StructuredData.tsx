// components/seo/StructuredData.tsx
// Componentes para JSON-LD Structured Data

import { SITE_CONFIG, SOCIAL_LINKS, BUSINESS_INFO } from "@/lib/seo";

/**
 * Schema.org Restaurant (subtype of LocalBusiness)
 * Habilita rich results de Google: horario, valoraciones, reservas
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": BUSINESS_INFO.type,
    name: SITE_CONFIG.name,
    image: [
      `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
      `${SITE_CONFIG.url}${SITE_CONFIG.ogImageSquare}`,
    ],
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.streetAddress,
      addressLocality: BUSINESS_INFO.addressLocality,
      addressRegion: BUSINESS_INFO.addressRegion,
      postalCode: BUSINESS_INFO.postalCode,
      addressCountry: BUSINESS_INFO.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.latitude,
      longitude: BUSINESS_INFO.longitude,
    },
    hasMap: BUSINESS_INFO.hasMap,
    openingHours: BUSINESS_INFO.openingHours,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "21:00",
      },
    ],
    sameAs: Object.values(SOCIAL_LINKS),
    priceRange: BUSINESS_INFO.priceRange,
    servesCuisine: BUSINESS_INFO.servesCuisine,
    currencyAccepted: BUSINESS_INFO.currencyAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    menu: `${SITE_CONFIG.url}/menu`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Menú Natural Bowls",
      url: `${SITE_CONFIG.url}/menu`,
    },
    serviceArea: {
      "@type": "City",
      name: BUSINESS_INFO.addressLocality,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Delivery", value: true },
      { "@type": "LocationFeatureSpecification", name: "Online Ordering", value: true },
      { "@type": "LocationFeatureSpecification", name: "Organic Ingredients", value: true },
      { "@type": "LocationFeatureSpecification", name: "Customizable Bowls", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

/**
 * Schema.org WebSite con SearchAction
 * Habilita el cuadro de búsqueda de Google Sitelinks en los resultados
 */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: "es",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/menu?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

/**
 * Schema.org Product
 * Para páginas de detalle de producto
 */
export function ProductSchema({
  id,
  name,
  description,
  image,
  price,
  rating,
  reviewCount,
}: {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  reviewCount?: number;
}) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image,
    description,
    url: `${SITE_CONFIG.url}/producto/${id}`,
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/producto/${id}`,
      priceCurrency: "PEN",
      price: price.toString(),
      availability: "https://schema.org/InStock",
    },
    ...(rating && reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.toString(),
        ratingCount: reviewCount.toString(),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

/**
 * Schema.org BreadcrumbList
 * Para migas de pan (breadcrumbs)
 */
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

/**
 * Schema.org FAQPage
 * Para secciones de preguntas frecuentes
 */
export function FAQSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

/**
 * Schema.org ItemList con SiteNavigationElement
 * Ayuda a Google a identificar las secciones principales del sitio para generar sitelinks
 */
export function SiteNavigationSchema() {
  const navigationItems = [
    { name: "Menu", url: `${SITE_CONFIG.url}/menu`, description: "Menu completo: poke bowls, smoothie bowls, wraps, ensaladas, waffles fit, postres saludables, desayunos proteicos, jugos y cafe gourmet" },
    { name: "Arma Tu Bowl", url: `${SITE_CONFIG.url}/bowls`, description: "Personaliza tu propio poke bowl o smoothie bowl con ingredientes frescos y organicos" },
    { name: "Promociones", url: `${SITE_CONFIG.url}/promociones`, description: "Descuentos y ofertas especiales en comida saludable, fit y vegetariana" },
    { name: "Catering", url: `${SITE_CONFIG.url}/catering`, description: "Servicio de catering saludable y fit para eventos corporativos, cumpleanos y reuniones" },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: navigationItems.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

/**
 * Schema.org Organization
 * Complementa Restaurant con info corporativa, logo y redes sociales
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icons/nbicon.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: Object.values(SOCIAL_LINKS),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
