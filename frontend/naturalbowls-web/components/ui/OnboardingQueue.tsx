"use client";

// components/ui/OnboardingQueue.tsx
// Renderiza los modales de onboarding de a uno por vez, en orden de prioridad:
//   1. FirstOrderModal  →  2. InstallPrompt
//
// Si el usuario ya interactuó con alguno en sesiones anteriores (flags en
// localStorage), ese paso se salta automáticamente y se avanza al siguiente.

import { useEffect, useState } from "react";
import FirstOrderModal from "@/components/banners/FirstOrderModal";
import InstallPrompt from "@/components/ui/InstallPrompt";
import { DiscountCodeService } from "@/lib/services";

type Step = "discount" | "install" | "done";

const FLAG_DISCOUNT = "nb-discount-interacted";
const FLAG_INSTALL = "nb-install-interacted";

function resolveInitialStep(): Step {
  if (localStorage.getItem(FLAG_DISCOUNT) !== "true") {
    const { isEligible } = DiscountCodeService.getInitialState();
    if (isEligible) return "discount";
    localStorage.setItem(FLAG_DISCOUNT, "true");
  }

  if (localStorage.getItem(FLAG_INSTALL) !== "true") return "install";

  return "done";
}

export default function OnboardingQueue() {
  const [step, setStep] = useState<Step>("done");

  useEffect(() => {
    setStep(resolveInitialStep());
  }, []);

  const advance = (from: Step) => {
    setTimeout(() => {
      if (from === "discount") {
        setStep("install");
      } else {
        setStep("done");
      }
    }, 400);
  };

  if (step === "done") return null;

  return (
    <>
      {step === "discount" && (
        <FirstOrderModal onDone={() => advance("discount")} />
      )}
      {step === "install" && (
        <InstallPrompt onDone={() => advance("install")} />
      )}
    </>
  );
}
