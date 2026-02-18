// app/manifest.ts
// Web App Manifest — soporte nativo de Next.js (sin plugin externo)
// Next.js genera automáticamente /manifest.webmanifest y lo enlaza en el <head>

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Natural Bowls",
    short_name: "Natural Bowls",
    description:
      "Comida saludable, deliciosa y personalizable. Poke bowls, smoothie bowls y más.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#10b981",
    background_color: "#ffffff",
    lang: "es",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/nbicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/nbicon.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/nbicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon512_maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // Atajos visibles en el menú contextual al mantener presionado el ícono
    shortcuts: [
      {
        name: "Ver Menú",
        short_name: "Menú",
        description: "Explora nuestro menú de poke bowls y smoothie bowls",
        url: "/menu",
        icons: [{ src: "/icons/nbicon.png", sizes: "any" }],
      },
      {
        name: "Pide tu Bowl",
        short_name: "Pedir Bowl",
        description: "Personaliza y ordena tu bowl saludable",
        url: "/bowls",
        icons: [{ src: "/icons/nbicon.png", sizes: "any" }],
      },
      {
        name: "Mi Carrito",
        short_name: "Carrito",
        description: "Ver mi carrito de compras",
        url: "/carrito",
        icons: [{ src: "/icons/nbicon.png", sizes: "any" }],
      },
    ],
    screenshots: [],
  };
}
