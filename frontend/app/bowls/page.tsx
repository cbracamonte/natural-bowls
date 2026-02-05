'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function BowlsPage() {
  const smoothieBowls = getProductsByCategory('smoothie-bowl');
  const pokeBowls = getProductsByCategory('poke');

  const pokeOptions = {
    bases: ['Arroz blanco', 'Arroz integral', 'Mix verdes', 'Mix quinoa'],
    proteinas: ['Pollo crispy', 'Pollo a la plancha', 'Langostinos al panko (+5.50)', 'Salmón (+7.00)', 'Tofu', 'Tofu crispy', 'Hamburguesa de lentejas'],
    toppings: ['Col morada', 'Pepinillo', 'Mango', 'Piña', 'Huevo de codorniz', 'Queso fresco', 'Camote', 'Tomate', 'Brócoli', 'Rabanito encurtido', 'Frejol chino', 'Vainitas', 'Espinaca', 'Lechuga', 'Zanahoria', 'Choclo', 'Palta', 'Papa sancochada'],
    agregados: ['Tiras de wantán', 'Ajonjolí mix', 'Cebolla china', 'Camotes crocantes', 'Canchita', 'Nachos', 'Chifle', 'Crispy algas'],
    salsas: ['Vinagreta de la casa', 'Acevichada', 'Vinagreta blanca', 'Teriyaki', 'Salsa Olivo', 'Ají especial', 'Ají huacatay', 'Mayopalta', 'Vinagreta light', 'Honey mustard'],
  };

  const smoothieToppings = ['Fresa', 'Plátano', 'Arándanos', 'Kiwi', 'Aguaymanto', 'Coco rallado', 'Kiwicha pop', 'Chía', 'Piña', 'Mango', 'Granola', 'Mantequilla de maní (+2)', 'Nibs de cacao (+2)'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-[#6B8E4E] to-[#9CB973] py-20"
        aria-labelledby="bowls-hero-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 id="bowls-hero-title" className="text-4xl md:text-5xl font-bold mb-4">
                Nuestros Bowls
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Smoothie Bowls y Poke Bowls preparados con los ingredientes más frescos.
                Personaliza tu bowl a tu gusto.
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center px-8 py-3.5 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
                aria-label="Ordenar en el menú"
              >
                Ordenar ahora
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/smoothie-bowl.jpg"
                    alt="Smoothie Bowl"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl mt-8">
                  <Image
                    src="/images/poke-bowl.jpg"
                    alt="Poke Bowl"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smoothie Bowls Section */}
      <section className="py-16 bg-monstera-cream" aria-labelledby="smoothie-bowls-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Smoothie Bowls
            </span>
            <h2 id="smoothie-bowls-title" className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
              Bowls de frutas con toppings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bases cremosas de frutas congeladas con tus toppings favoritos.
              Açaí, pitaya, plátano, berries y mucho más.
            </p>
          </div>

          {/* Toppings info */}
          <div className="bg-purple-50 rounded-2xl p-6 mb-12" aria-labelledby="smoothie-toppings-title">
            <h3 id="smoothie-toppings-title" className="font-semibold text-[#5D4E37] mb-3">Elige tus 5 toppings:</h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {smoothieToppings.map((topping) => (
                <li
                  key={topping}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border"
                >
                  {topping}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smoothieBowls.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Poke Bowls Section */}
      <section className="py-16 gradient-section" aria-labelledby="poke-bowls-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-medium mb-4">
              Poke Bowls
            </span>
            <h2 id="poke-bowls-title" className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
              Arma tu Poke Bowl
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Personaliza tu poke eligiendo base, proteína, toppings, agregados y salsas.
              Fresco, nutritivo y delicioso.
            </p>
          </div>

          {/* Poke Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm" aria-labelledby="poke-base-title">
              <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-lime-700 font-bold">1</span>
              </div>
              <h3 id="poke-base-title" className="font-semibold text-[#5D4E37] mb-3">Base (Elegir 1)</h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {pokeOptions.bases.map((item) => (
                  <li key={item} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm" aria-labelledby="poke-protein-title">
              <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-lime-700 font-bold">2</span>
              </div>
              <h3 id="poke-protein-title" className="font-semibold text-[#5D4E37] mb-3">Proteína (Elegir 1)</h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {pokeOptions.proteinas.map((item) => (
                  <li key={item} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm" aria-labelledby="poke-toppings-title">
              <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-lime-700 font-bold">3</span>
              </div>
              <h3 id="poke-toppings-title" className="font-semibold text-[#5D4E37] mb-3">Toppings (Elegir 5)</h3>
              <ul className="flex flex-wrap gap-2 max-h-32 overflow-y-auto" role="list">
                {pokeOptions.toppings.map((item) => (
                  <li key={item} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm" aria-labelledby="poke-agregados-title">
              <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-lime-700 font-bold">4</span>
              </div>
              <h3 id="poke-agregados-title" className="font-semibold text-[#5D4E37] mb-3">Agregados (Elegir 4)</h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {pokeOptions.agregados.map((item) => (
                  <li key={item} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2" aria-labelledby="poke-salsas-title">
              <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-lime-700 font-bold">5</span>
              </div>
              <h3 id="poke-salsas-title" className="font-semibold text-[#5D4E37] mb-3">Salsas (Elegir 2-3)</h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {pokeOptions.salsas.map((item) => (
                  <li key={item} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {pokeBowls.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#5D4E37]" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-title" className="text-3xl font-bold text-white mb-4">
            ¿Listo para probar?
          </h2>
          <p className="text-white/80 mb-8">
            Ordena ahora y disfruta de los mejores bowls de Trujillo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#9CB973] text-[#5D4E37] rounded-full font-medium hover:bg-[#C5D9A4] transition-colors"
              aria-label="Ver todo el menú"
            >
              Ver todo el menú
            </Link>
            <a
              href="https://wa.me/51936519955"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-[#5D4E37] transition-colors"
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
