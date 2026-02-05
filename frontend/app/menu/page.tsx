'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { cn } from '@/lib/utils';

const PRODUCTS_PER_PAGE = 10;

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => handleCategoryChange('all')}
          className={cn(
            'px-4 py-2 rounded-full font-medium transition-colors',
            selectedCategory === 'all'
              ? 'bg-[#5D4E37] text-white'
              : 'bg-white text-gray-600 hover:bg-[#F5F3EF]'
          )}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={cn(
              'px-4 py-2 rounded-full font-medium transition-colors',
              selectedCategory === category.id
                ? 'bg-[#5D4E37] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F5F3EF]'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-500 mb-6">
        Mostrando {paginatedProducts.length} de {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
      </p>

      {/* Products Grid */}
      <ProductGrid products={paginatedProducts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'p-2 rounded-full transition-colors',
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-[#5D4E37] hover:bg-[#5D4E37] hover:text-white'
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={cn(
                'w-10 h-10 rounded-full font-medium transition-colors',
                currentPage === page
                  ? 'bg-[#5D4E37] text-white'
                  : 'text-[#5D4E37] hover:bg-[#F5F3EF]'
              )}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'p-2 rounded-full transition-colors',
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-[#5D4E37] hover:bg-[#5D4E37] hover:text-white'
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}

function MenuLoading() {
  return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B8E4E]"></div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-monstera-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5D4E37] to-[#7A6B52] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Nuestro Menú
          </h1>
          <p className="text-white/80">
            Descubre todos nuestros bowls, bebidas y más
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<MenuLoading />}>
          <MenuContent />
        </Suspense>
      </div>
    </div>
  );
}
