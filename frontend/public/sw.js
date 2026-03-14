// public/sw.js
// Service Worker para Natural Bowls PWA

// ── Activación inmediata: no esperar a que se cierre la pestaña ──────────────
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
