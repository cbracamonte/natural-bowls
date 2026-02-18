// lib/seo/viewport.ts
// Configuración de viewport centralizada

import type { Viewport } from "next";

export function generateViewportConfig(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    // Importante para PWA en iOS: respeta el área segura del notch
    viewportFit: "cover",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#10b981" },
      { media: "(prefers-color-scheme: dark)", color: "#10b981" },
    ],
  };
}
