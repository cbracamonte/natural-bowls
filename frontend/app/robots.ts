// app/robots.ts
// Generación programática de robots.txt — Next.js lo sirve en /robots.txt y lo enlaza en <head>.
// Reemplaza public/robots.txt (el archivo estático en public/ queda ignorado cuando existe este).

import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

const BASE_URL = SITE_CONFIG.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Reglas generales ──────────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/_next/",
          "/api/",
          "/carrito",
          "/checkout",
          "/confirmacion",
        ],
      },
      // ── Google: acceso completo ───────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/carrito", "/checkout", "/confirmacion"],
      },
      // ── Bing: acceso completo ─────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/carrito", "/checkout", "/confirmacion"],
      },
      // ── Crawlers agresivos: limitar velocidad ─────────────────────────────
      {
        userAgent: "AhrefsBot",
        allow: "/",
        crawlDelay: 10,
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        crawlDelay: 10,
      },
    ],
    // Next.js genera la directiva Sitemap: automáticamente
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
