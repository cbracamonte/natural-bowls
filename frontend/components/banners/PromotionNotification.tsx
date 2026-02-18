"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { getActivePromotions } from "@/data/promotions-notifications";
import { Promotion } from "@/lib/schemas";

export default function PromotionNotification() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [promotions] = useState<Promotion[]>(() => getActivePromotions());

  useEffect(() => {
    if (promotions.length === 0) {
      return;
    }

    // Rotar entre promociones cada 5 segundos
    const rotationInterval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);

    // Auto-cerrar la notificación después de 30 segundos de inactividad
    let autoCloseTimeout: NodeJS.Timeout;
    const resetAutoClose = () => {
      clearTimeout(autoCloseTimeout);
      autoCloseTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 30000);
    };

    resetAutoClose();

    return () => {
      clearInterval(rotationInterval);
      clearTimeout(autoCloseTimeout);
    };
  }, [promotions.length]);

  if (!isVisible || promotions.length === 0) return null;

  const currentPromo = promotions[currentPromoIndex];

  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-40 animate-in slide-in-from-bottom-4 fade-in">
      <div
        className={`bg-linear-to-r ${currentPromo.bgColor} rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-sm w-full`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Cerrar notificación"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 md:p-5">
          {/* Header with icon and close space */}
          <div className="flex items-start gap-3 mb-3 pr-8">
            <span className="text-2xl md:text-3xl shrink-0">
              {currentPromo.icon}
            </span>
            <div className="flex-1">
              <h3 className={`text-sm md:text-base font-bold ${currentPromo.textColor} leading-tight`}>
                {currentPromo.title}
              </h3>
              {currentPromo.discount && (
                <p className="text-xs md:text-sm font-semibold text-gray-600 mt-0.5">
                  {currentPromo.discount} OFF
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className={`text-xs md:text-sm ${currentPromo.textColor} opacity-85 mb-3 leading-snug`}>
            {currentPromo.description}
          </p>

          {/* Footer with code and CTA */}
          <div className="flex items-center gap-2 justify-between">
            {currentPromo.code && (
              <div className="bg-white/60 rounded-lg px-3 py-1.5 border border-gray-200">
                <p className="text-xs font-mono font-bold text-gray-900">
                  {currentPromo.code}
                </p>
              </div>
            )}

            {currentPromo.link && (
              <Link href={currentPromo.link}>
                <button className="bg-[#6B8E4E] hover:bg-[#5D7A42] text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-lg transition-all transform hover:scale-105 whitespace-nowrap">
                  Ver más
                </button>
              </Link>
            )}
            {!currentPromo.link && (
              <button className="bg-[#6B8E4E] hover:bg-[#5D7A42] text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-lg transition-all transform hover:scale-105 whitespace-nowrap">
                Conocer
              </button>
            )}
          </div>

          {/* Progress dots - mostrar en desktop */}
          {promotions.length > 1 && (
            <div className="flex gap-1.5 mt-3 justify-center">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPromoIndex
                      ? "bg-[#6B8E4E] w-6"
                      : "bg-gray-300 w-2"
                  }`}
                  aria-label={`Ir a promoción ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
