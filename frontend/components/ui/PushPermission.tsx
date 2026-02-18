// components/ui/PushPermission.tsx
// Solicita permiso de notificaciones push al usuario.
// Registra el service worker, suscribe al usuario y guarda la suscripción en el servidor.
// Aparece en el OnboardingQueue después del InstallPrompt.

"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, X } from "lucide-react";

const NB_FLAG_PUSH = "nb-push-interacted";

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; i++) {
    view[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

interface PushPermissionProps {
  onDone?: () => void;
}

export default function PushPermission({ onDone }: PushPermissionProps = {}) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // No mostrar si el navegador no soporta push o ya interactuó
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      localStorage.getItem(NB_FLAG_PUSH) === "true"
    ) {
      return;
    }

    // Si ya hay permiso concedido previamente, marcar como hecho
    if (Notification.permission === "granted") {
      localStorage.setItem(NB_FLAG_PUSH, "true");
      return;
    }

    // Si ya fue denegado, no molestar al usuario
    if (Notification.permission === "denied") {
      localStorage.setItem(NB_FLAG_PUSH, "true");
      return;
    }

    setShow(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(NB_FLAG_PUSH, "true");
    setShow(false);
    onDone?.();
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      setSubscribed(true);
      localStorage.setItem(NB_FLAG_PUSH, "true");

      // Cerrar tras 1.5s para que el usuario vea el estado de éxito
      setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 1500);
    } catch (err) {
      console.error("Error al suscribirse a notificaciones:", err);
      // Si el usuario denegó el permiso en el sistema, marcar y cerrar
      if (Notification.permission === "denied") {
        localStorage.setItem(NB_FLAG_PUSH, "true");
        setShow(false);
        onDone?.();
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Activar notificaciones"
      className="fixed inset-x-0 bottom-0 z-50 p-3"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="rounded-2xl bg-white shadow-2xl border border-gray-100 p-4 max-w-md mx-auto">
        {subscribed ? (
          // Estado de éxito
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <Bell className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                ¡Notificaciones activadas!
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Te avisaremos de las mejores promos 🍃
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            {/* Ícono */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <Bell className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm leading-tight">
                Activa las notificaciones
              </p>
              <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                Recibe ofertas exclusivas de Natural Bowls 2 veces al día,
                en horario de almuerzo y cena.
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Bell className="h-3.5 w-3.5" />
                  )}
                  {loading ? "Activando…" : "Activar"}
                </button>
                <button
                  onClick={handleDismiss}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <BellOff className="h-3.5 w-3.5" />
                  Ahora no
                </button>
              </div>
            </div>

            {/* Cerrar */}
            <button
              onClick={handleDismiss}
              aria-label="Cerrar"
              className="shrink-0 -mt-0.5 -mr-1 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
