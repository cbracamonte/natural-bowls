// public/sw.js
// Service Worker para Natural Bowls PWA
// Maneja notificaciones push, clics y cierre de notificaciones

// ── Activación inmediata: no esperar a que se cierre la pestaña ──────────────
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ── Recibir notificación push ────────────────────────────────────────────────
self.addEventListener("push", function (event) {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "Natural Bowls", body: event.data.text(), url: "/menu" };
  }

  const options = {
    body: data.body,
    icon: data.icon || "/icons/nb-isotipo.svg",
    badge: data.badge || "/icons/nb-isotipo.svg",
    vibrate: [100, 50, 100],
    tag: data.tag || "nb-promo",       // evita notificaciones duplicadas
    renotify: data.renotify ?? false,  // no re-suena si ya existe el mismo tag
    actions: [
      { action: "open", title: "Ver oferta" },
      { action: "close", title: "Cerrar" },
    ],
    data: {
      url: data.url || "/menu",
      dateOfArrival: Date.now(),
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ── Clic en la notificación ──────────────────────────────────────────────────
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // Si hizo clic en "Cerrar", no abrir nada
  if (event.action === "close") return;

  const url = event.notification.data?.url || "/menu";
  const origin = self.location.origin;
  const target = url.startsWith("http") ? url : `${origin}${url}`;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Reutilizar pestaña ya abierta si existe
        for (const client of windowClients) {
          if (client.url === target && "focus" in client) {
            return client.focus();
          }
        }
        return self.clients.openWindow(target);
      }),
  );
});

// ── Cierre de notificación (analytics) ──────────────────────────────────────
self.addEventListener("notificationclose", function (event) {
  // Enviar evento de cierre al servidor para métricas (fire & forget)
  const tag = event.notification.tag;
  if (tag) {
    fetch(`/api/push/analytics?event=close&tag=${encodeURIComponent(tag)}`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {/* silencioso */});
  }
});
