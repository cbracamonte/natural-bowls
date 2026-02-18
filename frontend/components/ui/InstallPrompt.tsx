"use client";

// components/ui/InstallPrompt.tsx
// Muestra instrucciones de instalación para dispositivos iOS
// En iOS no existe el evento beforeinstallprompt, el usuario debe hacerlo manualmente

import { useState, useEffect } from "react";

const detectIOS = () => {
  if (typeof window === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream
  );
};

const detectStandalone = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches;
};

export default function InstallPrompt() {
  const [isIOS] = useState(() => detectIOS());
  const [isStandalone, setIsStandalone] = useState(() => detectStandalone());

  useEffect(() => {
    // Listen for changes in display mode (e.g., after installation)
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // No mostrar si ya está instalada o no es iOS
  if (isStandalone || !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-white p-4 shadow-xl border border-gray-100">
      <div className="flex items-start gap-3">
        {/* Ícono */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/nb-isotipo.svg"
          alt="Natural Bowls"
          className="h-12 w-12 rounded-xl shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">
            Instala Natural Bowls
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            Toca{" "}
            <span
              role="img"
              aria-label="ícono compartir"
              className="inline-block"
            >
              ⎋
            </span>{" "}
            y luego{" "}
            <strong>&quot;Agregar a pantalla de inicio&quot;</strong>
            {" "}
            <span role="img" aria-label="ícono más">
              ➕
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
