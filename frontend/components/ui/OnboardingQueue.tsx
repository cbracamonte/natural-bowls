"use client";

// components/ui/OnboardingQueue.tsx
// Renderiza los modales de onboarding de a uno por vez, en orden de prioridad:
//   1. CookieBanner  →  2. FirstOrderModal  →  3. InstallPrompt  →  4. PushPermission
//
// Si el usuario ya interactuó con alguno en sesiones anteriores (flags en
// localStorage), ese paso se salta automáticamente y se avanza al siguiente.

import { useState } from "react";
import CookieBanner from "@/components/layout/CookieBanner";
import FirstOrderModal from "@/components/banners/FirstOrderModal";
import InstallPrompt from "@/components/ui/InstallPrompt";
import PushPermission from "@/components/ui/PushPermission";
import { DiscountCodeService } from "@/lib/services";

type Step = "cookies" | "discount" | "install" | "push" | "done";

const FLAG_COOKIES = "nb-cookie-consent";
const FLAG_DISCOUNT = "nb-discount-interacted";
const FLAG_INSTALL = "nb-install-interacted";
const FLAG_PUSH = "nb-push-interacted";

function resolveInitialStep(): Step {
  // SSR guard
  if (typeof window === "undefined") return "done";

  if (localStorage.getItem(FLAG_COOKIES) !== "true") return "cookies";

  if (localStorage.getItem(FLAG_DISCOUNT) !== "true") {
    // Solo mostrar si el usuario es elegible para el descuento
    const { isEligible } = DiscountCodeService.getInitialState();
    if (isEligible) return "discount";
    // No es elegible: marcar y saltar
    localStorage.setItem(FLAG_DISCOUNT, "true");
  }

  if (localStorage.getItem(FLAG_INSTALL) !== "true") return "install";

  // Solo ofrecer push si el navegador lo soporta y no se ha interactuado
  if (
    localStorage.getItem(FLAG_PUSH) !== "true" &&
    typeof window !== "undefined" &&
    "PushManager" in window &&
    "serviceWorker" in navigator &&
    Notification.permission === "default"
  ) {
    return "push";
  }

  return "done";
}

export default function OnboardingQueue() {
  // Use lazy initializer to set step only once during mount, avoiding cascading renders
  const [step, setStep] = useState<Step>(() => resolveInitialStep());

  const advance = (from: Step) => {
    // Pequeña pausa visual entre un modal y el siguiente
    setTimeout(() => {
      if (from === "cookies") {
        const { isEligible } = DiscountCodeService.getInitialState();
        if (isEligible && localStorage.getItem(FLAG_DISCOUNT) !== "true") {
          setStep("discount");
        } else {
          localStorage.setItem(FLAG_DISCOUNT, "true");
          setStep("install");
        }
      } else if (from === "discount") {
        setStep("install");
      } else if (from === "install") {
        // Ofrecer notificaciones push solo si el navegador lo soporta
        if (
          "PushManager" in window &&
          "serviceWorker" in navigator &&
          Notification.permission === "default" &&
          localStorage.getItem(FLAG_PUSH) !== "true"
        ) {
          setStep("push");
        } else {
          setStep("done");
        }
      } else {
        setStep("done");
      }
    }, 400);
  };

  if (step === "done") return null;

  return (
    <>
      {step === "cookies" && (
        <CookieBanner onDone={() => advance("cookies")} />
      )}
      {step === "discount" && (
        <FirstOrderModal onDone={() => advance("discount")} />
      )}
      {step === "install" && (
        <InstallPrompt onDone={() => advance("install")} />
      )}
      {step === "push" && (
        <PushPermission onDone={() => advance("push")} />
      )}
    </>
  );
}
