import { Suspense } from 'react';
import Image from 'next/image';
import MenuContent from '@/components/menu/MenuContent';
import MenuLoading from '@/components/menu/MenuLoading';
import { products, categories } from '@/data/products';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden scroll-mt-48">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/wraps.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Dark Overlay - More effective */}
        <div className="absolute inset-0 bg-black/20 z-1"></div>
        
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black/60 z-2"></div>

        {/* Content */}
        <div className="relative z-10 py-24 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <span className="inline-block text-[#F5F3EF] text-sm uppercase tracking-widest font-semibold mb-3">
              Catálogo Completo
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Explora Nuestro Menú
            </h1>
            <p className="text-base md:text-lg text-white/95 leading-relaxed">
              Cada bowl es una experiencia única. Filtra por categoría, ordena
              según tus preferencias y descubre tu combinación favorita entre
              cientos de opciones.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-4 md:px-6 md:py-5 text-center border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-wide font-semibold">
                Productos
              </p>
              <p className="text-2xl md:text-4xl font-bold text-white mt-2">
                {products.length}+
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-4 md:px-6 md:py-5 text-center border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-wide font-semibold">
                Categorías
              </p>
              <p className="text-2xl md:text-4xl font-bold text-white mt-2">
                {categories.length}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-4 md:px-6 md:py-5 text-center border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-wide font-semibold">
                Frescos
              </p>
              <p className="text-2xl md:text-4xl font-bold text-white mt-2">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        id="menu-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
        <Suspense fallback={<MenuLoading />}>
          <MenuContent />
        </Suspense>
      </div>
    </div>
  );
}
