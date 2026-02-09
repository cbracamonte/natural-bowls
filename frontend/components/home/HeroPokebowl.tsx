'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroPokebowl() {

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden" role="region" aria-label="Pokebowl - Hero section">
      {/* Video Background - Visible on all devices */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/pokebowl.mp4" type="video/mp4" />
      </video>

      {/* Overlay - Mobile darker, Desktop lighter */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 md:from-black/50 md:via-black/30 md:to-black/60" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
              Nutrición Premium
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Pokebowls<br />
            <span className="text-[#9CB973]">Frescos Cada Día</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto drop-shadow-md">
            Pescado premium seleccionado a diario con vegetales frescos de la región. Nutrición balanceada que realmente te satisface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bowls?category=pokebowl"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#6B8E4E] hover:bg-[#5A7A40] text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Descubre Nuestros Pokebowls
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/carrito"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full font-bold text-lg border border-white/30 transition-all duration-300"
            >
              Ordenar Ahora
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#9CB973]">100%</p>
              <p className="text-sm text-white/70">Fresco Diario</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#9CB973]">20+</p>
              <p className="text-sm text-white/70">Combinaciones</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#9CB973]">4.9★</p>
              <p className="text-sm text-white/70">Recomendado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
