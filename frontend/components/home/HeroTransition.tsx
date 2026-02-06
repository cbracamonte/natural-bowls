'use client';

import Image from 'next/image';

export default function HeroTransition() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#F5F3EF] to-white overflow-hidden" role="region" aria-label="Transición entre secciones">
      {/* Decorative monstera background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B8E4E] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5D9A4] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/nb-isotipo.svg"
            alt="Natural Bowls"
            width={80}
            height={80}
            className="w-20 h-20 drop-shadow-sm"
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-6">
          Natural Bowls
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Sabor auténtico con ingredientes que realmente importan. Cada bowl cuenta la historia de productores locales comprometidos con tu salud.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent to-[#6B8E4E]" />
          <div className="w-2 h-2 bg-[#6B8E4E] rounded-full" />
          <div className="w-12 h-1 bg-gradient-to-l from-transparent to-[#6B8E4E]" />
        </div>

        {/* Subheading */}
        <p className="text-lg text-[#6B8E4E] font-semibold">
          Explora una nueva categoría de sabor
        </p>
      </div>
    </section>
  );
}
