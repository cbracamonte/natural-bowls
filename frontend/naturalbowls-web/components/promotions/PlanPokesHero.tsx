"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils/contact";
import type { Promotion } from "@/data/promotions";

export default function PlanPokesHero({ promo }: { promo: Promotion }) {
  const [showModal, setShowModal] = useState(false);

  // Block body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showModal]);

  return (
    <>
      {/* Hero — imagen horizontal clickeable */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        <Image
          src={promo.image}
          alt={promo.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#5D4E37]/90 via-[#5D4E37]/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-[#9CB973] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
          <Star className="w-3.5 h-3.5 fill-current" />
          Promo Destacada
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 pb-10 md:px-12 md:pb-14">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
              {promo.title}
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 max-w-xl">
              {promo.description}
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#5D4E37] transition-all duration-300">
              Ver detalles
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </section>

      {/* Modal — vertical, responsivo, scrollable */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal — vertical, centrado, scroll interno */}
          <div
            className="relative z-10 w-full max-w-md max-h-[90vh] bg-white rounded-2xl overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="sticky top-3 left-[calc(100%-3rem)] z-20 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagen vertical — se muestra completa */}
            <div className="relative w-full aspect-9/16 -mt-12">
              <Image
                src={promo.detailImage || promo.image}
                alt={promo.title}
                fill
                className="object-contain bg-[#F5F3EF]"
              />
            </div>

            {/* Info debajo de la imagen */}
            <div className="p-6 md:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#9CB973]/10 text-[#9CB973] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                <Star className="w-3 h-3 fill-current" />
                Destacado
              </div>

              <h2 className="text-2xl font-bold text-[#5D4E37] mb-3 tracking-tight">
                {promo.title}
              </h2>
              <p className="text-[#5D4E37]/80 text-base leading-relaxed mb-6">
                {promo.description}
              </p>

              {promo.terms.length > 0 && (
                <div className="space-y-3 mb-6 pb-6 border-b border-[#5D4E37]/10">
                  <p className="text-xs font-semibold text-[#5D4E37]/40 uppercase tracking-widest">
                    Condiciones
                  </p>
                  {promo.terms.map((term) => (
                    <div
                      key={term}
                      className="flex items-center gap-3 text-[#5D4E37]/70 text-sm"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#9CB973] shrink-0" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              )}

              <a
                href={buildWhatsAppUrl("Hola! Me interesa el Plan Pokes 🍣")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-7 py-3.5 bg-[#9CB973] text-white rounded-full font-semibold text-sm hover:bg-[#8aab5f] transition-all hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                Quiero mi plan
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
