// app/sitemap.ts
// Sitemap dinámico — Next.js lo sirve en /sitemap.xml y lo enlaza en <head> automáticamente.
// Reemplaza public/sitemap.xml (el archivo estático queda ignorado cuando existe este).

import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/lib/seo";

const BASE_URL = SITE_CONFIG.url;
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Páginas estáticas ───────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: NOW,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/menu`,
      lastModified: NOW,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bowls`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/catering`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/promociones`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // carrito, checkout y confirmacion: excluidas (noindex, contenido transaccional)
  ];

  // ── Páginas de producto dinámicas ───────────────────────────────────────────
  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/producto/${product.id}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    // Next.js acepta images como string[] (URLs absolutas)
    ...(product.image && {
      images: [
        product.image.startsWith("http")
          ? product.image
          : `${BASE_URL}${product.image}`,
      ],
    }),
  }));

  return [...staticPages, ...productPages];
}
