"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PokeBowlBuilder from "@/components/menu/PokeBowlBuilder";
import SmoothieBowlBuilder from "@/components/menu/SmoothieBowlBuilder";
import { PRODUCTS } from "@/data/products";
import { POKEBOWLS_OPTIONS } from "@/data/poke-bowl-nutrition-data";
import { SMOOTHIE_BOWL_TOPPINGS } from "@/data/smoothie-bowl-nutrition-data";

function BowlsContent() {
  const searchParams = useSearchParams();
  const preselectedSmoothieId = searchParams.get("smoothie");
  const preselectedPokeSize = searchParams.get("pokeSize") as
    | "regular"
    | "grande"
    | null;

  // Filtrar smoothies desde products
  const smoothieProducts = useMemo(
    () => PRODUCTS.filter((p) => p.categoryId === "smoothie-bowl"),
    [],
  );

  const pokeOptions = POKEBOWLS_OPTIONS(preselectedPokeSize)

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
          {/* Poke Bowl Builder - Interactive Component */}
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
          {/* Smoothie Bowl Builder - Interactive Component */}
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
              href="https://wa.me/51912341818"
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

export default function BowlsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video */}
      <section
        className="relative overflow-hidden pt-20 pb-0 scroll-mt-48"
        aria-labelledby="bowls-hero-title"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/videos/pokebowl-build-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1
              id="bowls-hero-title"
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Descubre Nuestros <span className="text-[#9CB973]">Bowls</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Cada bowl es una experiencia única. Ingredientes frescos, sabores
              auténticos y opciones para personalizar según tus preferencias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#poke-bowls"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#9CB973] text-[#5D4E37] rounded-full font-bold hover:bg-[#C5D9A4] transition-colors text-lg"
                aria-label="Explorar Poke Bowls"
              >
                Poke Bowls
              </Link>
              <Link
                href="#smoothie-bowls"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#5D4E37] transition-colors text-lg"
                aria-label="Explorar Smoothie Bowls"
              >
                Smoothie Bowls
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-24 text-center">Cargando...</div>}>
        <BowlsContent />
      </Suspense>
    </div>
  );
}
