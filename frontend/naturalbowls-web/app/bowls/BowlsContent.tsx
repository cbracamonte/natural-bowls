"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/utils/contact";
import PokeBowlBuilder from "@/components/menu/PokeBowlBuilder";
import SmoothieBowlBuilder from "@/components/menu/SmoothieBowlBuilder";
import { PRODUCTS } from "@/data/products";
import { POKEBOWLS_OPTIONS } from "@/data/poke-bowl-nutrition-data";
import { SMOOTHIE_BOWL_TOPPINGS } from "@/data/smoothie-bowl-nutrition-data";

function BowlsContentInner() {
  const searchParams = useSearchParams();
  const preselectedSmoothieId = searchParams.get("smoothie");
  const preselectedPokeSize = searchParams.get("pokeSize") as
    | "regular"
    | "grande"
    | null;

  const smoothieProducts = useMemo(
    () => PRODUCTS.filter((p) => p.categoryId === "smoothie-bowl"),
    [],
  );

  const pokeOptions = POKEBOWLS_OPTIONS(preselectedPokeSize);

  const smoothieOptions = {
    smoothies: smoothieProducts,
    toppings: SMOOTHIE_BOWL_TOPPINGS,
    preselectedSmoothieId: preselectedSmoothieId || undefined,
  };

  return (
    <>
      {/* Poke Bowls Section */}
      <section
        id="poke-bowls"
        className="py-24 bg-linear-to-br from-[#6B8E4E]/5 via-white to-[#9CB973]/5"
        aria-labelledby="poke-bowls-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PokeBowlBuilder pokeOptions={pokeOptions.pokeOptions} />
        </div>
      </section>

      {/* Smoothie Bowls Section */}
      <section
        id="smoothie-bowls"
        className="py-24 bg-white"
        aria-labelledby="smoothie-bowls-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SmoothieBowlBuilder smoothieOptions={smoothieOptions} />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-linear-to-r from-[#5D4E37] to-[#6B8E4E]"
        aria-labelledby="cta-title"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-title"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            ¿Listo para probar?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Ordena ahora y disfruta de los mejores bowls de Trujillo. Frescos,
            deliciosos y hechos con amor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#9CB973] text-[#5D4E37] rounded-full font-bold hover:bg-[#C5D9A4] transition-colors text-lg"
              aria-label="Ver todo el menú"
            >
              Ver todo el menú
            </Link>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 border-3 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#5D4E37] transition-colors text-lg"
              aria-label="Pedir por WhatsApp"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BowlsContent() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Cargando...</div>}>
      <BowlsContentInner />
    </Suspense>
  );
}
