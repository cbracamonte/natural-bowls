import { Suspense } from 'react';
import MenuContent from '@/components/menu/MenuContent';
import MenuLoading from '@/components/menu/MenuLoading';
import { products, categories } from '@/data/products';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-[#5D4E37] via-[#6B8E4E] to-[#7A6B52] py-16 md:py-20 relative scroll-mt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-[#F5F3EF] text-sm uppercase tracking-widest font-semibold mb-3">
              Catálogo Completo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explora Nuestro Menú
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Cada bowl es una experiencia única. Filtra por categoría, ordena
              según tus preferencias y descubre tu combinación favorita entre
              cientos de opciones.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl px-4 py-3 md:px-6 md:py-4 text-center border border-white/20">
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Productos
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {products.length}+
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl px-4 py-3 md:px-6 md:py-4 text-center border border-white/20">
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Categorías
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {categories.length}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl px-4 py-3 md:px-6 md:py-4 text-center border border-white/20">
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Frescos
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white">100%</p>
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
