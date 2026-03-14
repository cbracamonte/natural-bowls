'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const STORAGE_KEY = "nb-cookie-consent";

interface CookieBannerProps {
  onDone?: () => void;
}

export default function CookieBanner({ onDone }: CookieBannerProps = {}) {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccepted(stored === "true");
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setAccepted(true);
    onDone?.();
  };

  if (accepted) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-xl"
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">Usamos cookies</p>
            <p className="text-sm text-gray-600">
              Utilizamos cookies esenciales para que el sitio funcione y mejorar tu experiencia. Al continuar, aceptas su uso.
            </p>
            <Link
              href="mailto:info@naturalbowls.com"
              className="text-sm font-medium text-[#5D4E37] hover:text-[#6B8E4E] underline"
            >
              Más información
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <Button
              variant="outline"
              className="justify-center"
              onClick={handleAccept}
              aria-label="Aceptar cookies"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
