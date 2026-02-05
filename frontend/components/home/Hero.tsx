'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const heroImages = [
    '/images/smoothie-bowl.jpg',
    '/images/poke-bowl.jpg',
    '/images/wrap-crispy.jpg',
    '/images/sandwich.jpg',
  ];

  return (
    <section className="relative overflow-hidden bg-monstera-gradient min-h-[90vh] flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Logo prominente */}
            <div className="flex justify-center lg:justify-start mb-8">
              <Image
                src="/images/logo.png"
                alt="Natural Bowls - Smoothies & Café"
                width={180}
                height={180}
                className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5D4E37] mb-6 leading-tight">
              Comida fresca y saludable para tu{' '}
              <span className="relative inline-block">
                <span className="relative z-10">mesa</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#C5D9A4] -z-0 rounded" />
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Smoothie bowls, poke bowls, wraps y más. Ingredientes frescos preparados
              con amor para que disfrutes lo mejor de la comida saludable en Trujillo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors text-lg shadow-lg"
              >
                Ordenar ahora
              </Link>
              <Link
                href="/bowls"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#6B8E4E] text-[#6B8E4E] rounded-full font-medium hover:bg-[#6B8E4E] hover:text-white transition-colors text-lg"
              >
                Ver Bowls
              </Link>
            </div>
          </div>

          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {heroImages.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-3xl overflow-hidden shadow-xl ${
                    index % 2 === 1 ? 'mt-8' : ''
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Natural Bowls producto ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto lg:mx-0">
          <div className="text-center lg:text-left">
            <p className="text-3xl md:text-4xl font-bold text-[#6B8E4E]">40+</p>
            <p className="text-sm text-gray-600">Productos</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-3xl md:text-4xl font-bold text-[#6B8E4E]">100%</p>
            <p className="text-sm text-gray-600">Natural</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-3xl md:text-4xl font-bold text-[#6B8E4E]">4.9</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
