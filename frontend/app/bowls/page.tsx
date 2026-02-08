'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import PokeBowlBuilder from '@/components/menu/PokeBowlBuilder';
import SmoothieBowlBuilder from '@/components/menu/SmoothieBowlBuilder';
import { products } from '@/data/products';

export default function BowlsPage() {
  // Filtrar smoothies desde products
  const smoothieProducts = useMemo(
    () => products.filter((p) => p.category === 'smoothie-bowl'),
    []
  );

  const pokeOptions = {
    bases: ['Arroz blanco', 'Arroz integral', 'Mix verdes', 'Mix quinoa'],
    proteinas: ['Pollo crispy', 'Pollo a la plancha', 'Langostinos al panko (+5.50)', 'Salmón (+7.00)', 'Tofu', 'Tofu crispy', 'Hamburguesa de lentejas'],
    toppings: ['Col morada', 'Pepinillo', 'Mango', 'Piña', 'Huevo de codorniz', 'Queso fresco', 'Camote', 'Tomate', 'Brócoli', 'Rabanito encurtido', 'Frejol chino', 'Vainitas', 'Espinaca', 'Lechuga', 'Zanahoria', 'Choclo', 'Palta', 'Papa sancochada'],
    agregados: ['Tiras de wantán', 'Ajonjolí mix', 'Cebolla china', 'Camotes crocantes', 'Canchita', 'Nachos', 'Chifle', 'Crispy algas'],
    salsas: ['Vinagreta de la casa', 'Acevichada', 'Vinagreta blanca', 'Teriyaki', 'Salsa Olivo', 'Ají especial', 'Ají huacatay', 'Mayopalta', 'Vinagreta light', 'Honey mustard'],
  };

  const smoothieToppings = ['Fresa', 'Plátano', 'Arándanos', 'Kiwi', 'Aguaymanto', 'Coco rallado', 'Kiwicha pop', 'Chía', 'Piña', 'Mango', 'Granola', 'Mantequilla de maní (+2)', 'Nibs de cacao (+2)'];

  const smoothieOptions = {
    smoothies: smoothieProducts,
    toppings: smoothieToppings,
  };

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
            className="w-full h-full object-cover brightness-50"
          >
            <source src="/videos/pokebowl-build-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1 id="bowls-hero-title" className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Descubre Nuestros <span className="text-[#9CB973]">Bowls</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Cada bowl es una experiencia única. Ingredientes frescos, sabores auténticos y opciones para personalizar según tus preferencias.
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

      {/* Poke Bowls Section */}
      <section id="poke-bowls" className="py-24 bg-linear-to-br from-[#6B8E4E]/5 via-white to-[#9CB973]/5" aria-labelledby="poke-bowls-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Poke Bowl Builder - Interactive Component */}
          <PokeBowlBuilder pokeOptions={pokeOptions} />
        </div>
      </section>

      {/* Smoothie Bowls Section */}
      <section id="smoothie-bowls" className="py-24 bg-white" aria-labelledby="smoothie-bowls-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Smoothie Bowl Builder - Interactive Component */}
          <SmoothieBowlBuilder smoothieOptions={smoothieOptions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#5D4E37] to-[#6B8E4E]" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-title" className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Listo para probar?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Ordena ahora y disfruta de los mejores bowls de Trujillo. Frescos, deliciosos y hechos con amor.
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
    </div>
  );
}
