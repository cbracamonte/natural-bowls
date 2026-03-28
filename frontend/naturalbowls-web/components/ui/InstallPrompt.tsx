"use client";

// components/ui/InstallPrompt.tsx
// Banner de instalación PWA con instrucciones adaptadas por navegador y OS:
//   - Chrome/Edge/Samsung (Android): usa beforeinstallprompt para prompt nativo
//   - Firefox/Opera (Android): instrucciones específicas del navegador
//   - Safari (iOS): instrucciones con icono de compartir
//   - Chrome (iOS): instrucciones específicas de Chrome en iOS
//   - Firefox (iOS): instrucciones específicas de Firefox en iOS
// Registra el Service Worker si aún no está activo.

import { useState, useEffect, useCallback } from "react";
import { X, Share, MoreVertical, Menu, Plus } from "lucide-react";

const NB_FLAG_INSTALL = "nb-install-interacted";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

interface InstallPromptProps {
  onDone?: () => void;
}

// ── Detección de plataforma y navegador ─────────────────────────────────────

type Platform = "ios" | "android" | "other";
type Browser =
  | "safari"
  | "chrome"
  | "firefox"
  | "samsung"
  | "edge"
  | "opera"
  | "other";

interface DeviceInfo {
  platform: Platform;
  browser: Browser;
  isStandalone: boolean;
}

function detectDevice(): DeviceInfo {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return { platform: "other", browser: "other", isStandalone: false };
  }

  const ua = navigator.userAgent;

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true);

  // Detectar plataforma
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const platform: Platform = isIOS ? "ios" : isAndroid ? "android" : "other";

  // Detectar navegador (el orden importa por los UA compartidos)
  let browser: Browser = "other";

  if (isIOS) {
    // En iOS todos usan WebKit, pero el UA cambia
    if (/CriOS/i.test(ua)) browser = "chrome";
    else if (/FxiOS/i.test(ua)) browser = "firefox";
    else if (/Safari/i.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/i.test(ua)) browser = "safari";
    else if (/EdgiOS/i.test(ua)) browser = "edge";
    else browser = "safari"; // fallback iOS
  } else {
    if (/SamsungBrowser/i.test(ua)) browser = "samsung";
    else if (/OPR|Opera/i.test(ua)) browser = "opera";
    else if (/Edg/i.test(ua)) browser = "edge";
    else if (/Firefox/i.test(ua)) browser = "firefox";
    else if (/Chrome/i.test(ua) && !/Edg|OPR|SamsungBrowser/i.test(ua)) browser = "chrome";
    else browser = "other";
  }

  return { platform, browser, isStandalone };
}

// ── Instrucciones por navegador ─────────────────────────────────────────────

interface InstallInstruction {
  steps: React.ReactNode[];
  icon: React.ReactNode;
}

function getInstructions(
  platform: Platform,
  browser: Browser
): InstallInstruction | null {
  const iconClass = "inline-block w-4 h-4 align-text-bottom mx-0.5";

  if (platform === "ios") {
    if (browser === "safari") {
      return {
        icon: <Share className={iconClass} />,
        steps: [
          <>Toca <Share className={iconClass} /> <strong className="text-gray-700">Compartir</strong> en la barra inferior</>,
          <>Desplázate y selecciona <strong className="text-gray-700">&quot;Agregar a pantalla de inicio&quot;</strong> <Plus className={`${iconClass} text-emerald-600`} /></>,
        ],
      };
    }
    if (browser === "chrome") {
      return {
        icon: <Share className={iconClass} />,
        steps: [
          <>Toca <Share className={iconClass} /> <strong className="text-gray-700">Compartir</strong> en la barra superior</>,
          <>Selecciona <strong className="text-gray-700">&quot;Agregar a pantalla de inicio&quot;</strong></>,
        ],
      };
    }
    if (browser === "firefox") {
      return {
        icon: <Menu className={iconClass} />,
        steps: [
          <>Toca <Menu className={iconClass} /> el <strong className="text-gray-700">menú</strong> (☰)</>,
          <>Selecciona <strong className="text-gray-700">&quot;Compartir&quot;</strong> y luego <strong className="text-gray-700">&quot;Agregar a pantalla de inicio&quot;</strong></>,
        ],
      };
    }
    // Fallback iOS
    return {
      icon: <Share className={iconClass} />,
      steps: [
        <>Abre esta página en <strong className="text-gray-700">Safari</strong> para la mejor experiencia</>,
        <>Toca <Share className={iconClass} /> y luego <strong className="text-gray-700">&quot;Agregar a pantalla de inicio&quot;</strong></>,
      ],
    };
  }

  if (platform === "android") {
    if (browser === "firefox") {
      return {
        icon: <MoreVertical className={iconClass} />,
        steps: [
          <>Toca <MoreVertical className={iconClass} /> los <strong className="text-gray-700">tres puntos</strong> en la esquina</>,
          <>Selecciona <strong className="text-gray-700">&quot;Instalar&quot;</strong></>,
        ],
      };
    }
    if (browser === "opera") {
      return {
        icon: <MoreVertical className={iconClass} />,
        steps: [
          <>Toca <MoreVertical className={iconClass} /> los <strong className="text-gray-700">tres puntos</strong></>,
          <>Selecciona <strong className="text-gray-700">&quot;Agregar a pantalla de inicio&quot;</strong></>,
        ],
      };
    }
    // Chrome, Edge, Samsung → usan beforeinstallprompt (se maneja con botón nativo)
    return null;
  }

  return null;
}

// ── Registro del Service Worker ─────────────────────────────────────────────

function registerServiceWorker() {
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Silenciar errores de registro — no bloquear UX
    });
  }
}

// ── Componente ──────────────────────────────────────────────────────────────

export default function InstallPrompt({ onDone }: InstallPromptProps = {}) {
  const [device] = useState(() => detectDevice());
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [manualInstructions, setManualInstructions] =
    useState<InstallInstruction | null>(null);

  const markDone = useCallback(() => {
    localStorage.setItem(NB_FLAG_INSTALL, "true");
    onDone?.();
  }, [onDone]);

  useEffect(() => {
    // Ya instalada como PWA
    if (device.isStandalone) {
      markDone();
      return;
    }

    // Registrar SW para asegurar que beforeinstallprompt se dispare
    registerServiceWorker();

    // Verificar instrucciones manuales para este navegador
    const instructions = getInstructions(device.platform, device.browser);

    if (instructions) {
      // Este navegador necesita instrucciones manuales (iOS, Firefox Android, etc.)
      setManualInstructions(instructions);
      setShow(true);
      return;
    }

    // Navegadores con soporte beforeinstallprompt (Chrome, Edge, Samsung en Android)
    let promptCaptured = false;

    const handler = (e: Event) => {
      e.preventDefault();
      promptCaptured = true;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Fallback: si no se captura el evento en 4s, desbloquear el flujo
    const fallback = setTimeout(() => {
      if (!promptCaptured) {
        markDone();
      }
    }, 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(fallback);
    };
  }, [device, markDone]);

  const handleDismiss = () => {
    localStorage.setItem(NB_FLAG_INSTALL, "true");
    setShow(false);
    onDone?.();
  };

  const handleInstallNative = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    localStorage.setItem(NB_FLAG_INSTALL, "true");
    onDone?.();
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div
      role="banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-3"
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

          {manualInstructions ? (
            // Instrucciones paso a paso adaptadas al navegador
            <ol className="mt-1.5 space-y-1">
              {manualInstructions.steps.map((step, i) => (
                <li
                  key={i}
                  className="text-gray-500 text-xs leading-snug flex gap-1.5"
                >
                  <span className="text-emerald-600 font-bold shrink-0">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : deferredPrompt ? (
            // Botón nativo (Chrome/Edge/Samsung en Android)
            <button
              onClick={handleInstallNative}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-3 py-1.5 rounded-full transition-colors"
            >
              Instalar app
            </button>
          ) : null}
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
