"use client";

// components/ui/InstallPrompt.tsx
// Muestra banner de instalación PWA:
//   - iOS:     instrucciones de "Compartir → Agregar a pantalla de inicio"
//   - Android: usa evento beforeinstallprompt para mostrar el prompt nativo
// Escribe el flag NB_FLAG_INSTALL cuando el usuario interactúa o cuando no aplica,
// para que PromotionNotification sepa que puede mostrarse.

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const NB_FLAG_INSTALL = "nb-install-interacted";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

interface InstallPromptProps {
  onDone?: () => void;
}

export default function InstallPrompt({ onDone }: InstallPromptProps = {}) {
  // Determine iOS status without state to avoid cascading renders
  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  // Check if already installed as PWA to initialize state correctly
  const isStandalone =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches;

  const [show, setShow] = useState(isIOS && !isStandalone);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Ya está instalada como PWA → marcar como hecho
    if (isStandalone) {
      localStorage.setItem(NB_FLAG_INSTALL, "true");
      return;
    }

    if (isIOS) {
      return;
    }

    // Android/Chrome: capturar el evento nativo de instalación
    let promptCaptured = false;

    const handler = (e: Event) => {
      e.preventDefault();
      promptCaptured = true;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Fallback: si en 4s no se dispara el evento (ya instalada, browser sin soporte, etc.)
    // → marcar como no aplicable para desbloquear PromotionNotification
    const fallback = setTimeout(() => {
      if (!promptCaptured) {
        localStorage.setItem(NB_FLAG_INSTALL, "true");
        onDone?.();
      }
    }, 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(fallback);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(NB_FLAG_INSTALL, "true");
    setShow(false);
    onDone?.();
  };

  const handleInstallAndroid = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // Marcar como interactuado independientemente del resultado
    localStorage.setItem(NB_FLAG_INSTALL, "true");
    onDone?.();
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div
      role="banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 pb-[max(12px,env(safe-area-inset-bottom)])"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="rounded-2xl bg-white shadow-2xl border border-gray-100 p-4 flex items-start gap-3 max-w-md mx-auto">
        {/* Isotipo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/nb-isotipo.svg"
          alt="Natural Bowls"
          className="h-11 w-11 rounded-xl shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight">
            Instala Natural Bowls
          </p>

          {isIOS ? (
            // iOS: instrucciones manuales
            <p className="text-gray-500 text-xs mt-1 leading-snug">
              Toca{" "}
              <span role="img" aria-label="ícono compartir">
                ⎋
              </span>{" "}
              y luego{" "}
              <strong className="text-gray-700">
                &quot;Agregar a pantalla de inicio&quot;
              </strong>{" "}
              <span role="img" aria-label="ícono más">➕</span>
            </p>
          ) : (
            // Android: botón que lanza el prompt nativo
            <button
              onClick={handleInstallAndroid}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-3 py-1.5 rounded-full transition-colors"
            >
              Instalar app
            </button>
          )}
        </div>

        {/* Cerrar */}
        <button
          onClick={handleDismiss}
          aria-label="Cerrar"
          className="shrink-0 text-gray-400 hover:text-gray-600 -mt-0.5 -mr-1 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
