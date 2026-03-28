'use client';

import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

// Favoritos de trujillo max 4
// 1. Poke Bowls
// 2. Waffles Fit
// 3. MangoBowl
// 4. Wrap crispy

export default function Featured() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section id="destacados" className="py-20 gradient-section scroll-mt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-2">
              Los Favoritos de Trujillo
            </h2>
            <p className="text-gray-600">
              Lo que tu comunidad ama. Probado y aprobado por miles.
            </p>
          </div>
          <Link
            href="/menu"
            className="mt-4 md:mt-0 text-[#6B8E4E] font-medium hover:text-[#5D4E37] transition-colors"
          >
            Ver todo el menú →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
