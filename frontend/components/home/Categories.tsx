'use client';

import Link from 'next/link';
import Image from 'next/image';

const menuCategories = [
  {
    name: 'Waffles',
    image: '/images/waffles.jpg',
    href: '/menu?category=waffles',
    description: 'Tradicionales y fit',
  },
  {
    name: 'Pancakes',
    image: '/images/pancakes.jpg',
    href: '/menu?category=pancakes',
    description: 'Clásicos o de avena',
  },
  {
    name: 'Wraps & Sándwiches',
    image: '/images/wrap-crispy.jpg',
    href: '/menu?category=wraps',
    description: 'Frescos y deliciosos',
  },
];

export default function Categories() {
  return (
    <section id="categorias" className="py-20 bg-monstera-cream scroll-mt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] text-center mb-4">
          Explora Cada Categoría
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Encuentra desde bowls de desayuno, pancakes, ensaladas, brunches y cenas. Cada categoría es una experiencia diferente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm opacity-80 mb-1">{category.description}</p>
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
