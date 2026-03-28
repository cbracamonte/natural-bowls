'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Grid3x3, List, Filter, X } from 'lucide-react';
import { PRODUCTS, PRODUCTS_CATEGORY } from '@/data';
import ProductGrid from '@/components/products/ProductGrid';
import ProductListView from '../products/ProductListView';
import PaginationControls from './PaginationControls';
import FiltersPanelDesktop from './FiltersPanelDesktop';
import FiltersPanelMobile from './FiltersPanelMobile';
import { cn } from '@/lib/utils/utils';

const PRODUCTS_PER_PAGE = 12;

export default function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const selectedCategory = searchParams.get('category') || 'all';
  const currentPageParam = Number(searchParams.get('page') || '1');
  const sortBy = searchParams.get('sort') || 'featured';
  const currentPage = Number.isNaN(currentPageParam) ? 1 : Math.max(1, currentPageParam);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered =
      selectedCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.categoryId === selectedCategory);

    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  // Scroll to the main content wrapper when filters/sort/page changes
  useEffect(() => {
    const contentElement = document.getElementById('menu-content');
    if (contentElement) {
      const headerOffset = 100;
      const elementPosition = contentElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [selectedCategory, sortBy, safePage]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.delete('page');
    router.push(`/menu?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }
    params.delete('page');
    router.push(`/menu?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/menu?${params.toString()}`);
  };

  const getCategoryName = (catId: string) => {
    if (catId === 'all') return 'Todos los Productos';
    return PRODUCTS_CATEGORY.find((c) => c.id === catId)?.name || 'Menú';
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Filters (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="space-y-8 sticky top-32">
            <FiltersPanelDesktop
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onCategoryChange={handleCategoryChange}
              onSortChange={handleSortChange}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            {/* Title and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#5D4E37]">
                  {getCategoryName(selectedCategory)}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredProducts.length} producto
                  {filteredProducts.length !== 1 ? 's' : ''} encontrado
                  {filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Mobile Filter Button + View Toggle */}
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFiltersModal(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#6B8E4E] text-white rounded-lg hover:bg-[#5A7A42] transition-colors"
                  title="Abrir filtros"
                >
                  <Filter className="w-5 h-5" />
                  <span className="text-sm">Filtros</span>
                </button>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded transition-colors',
                      viewMode === 'grid'
                        ? 'bg-white text-[#6B8E4E] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                    title="Vista Grid"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded transition-colors',
                      viewMode === 'list'
                        ? 'bg-white text-[#6B8E4E] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                    title="Vista Lista"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination Controls - TOP */}
            <PaginationControls
              safePage={safePage}
              totalPages={totalPages}
              paginatedProductsLength={paginatedProducts.length}
              filteredProductsLength={filteredProducts.length}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Products Grid/List */}
          {paginatedProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <ProductGrid products={paginatedProducts} />
            ) : (
              <ProductListView products={paginatedProducts} />
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No se encontraron productos</p>
            </div>
          )}

          {/* Pagination - BOTTOM */}
          <PaginationControls
            safePage={safePage}
            totalPages={totalPages}
            paginatedProductsLength={paginatedProducts.length}
            filteredProductsLength={filteredProducts.length}
            onPageChange={handlePageChange}
          />

          {/* Results Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
            {selectedCategory !== 'all' && ` en ${getCategoryName(selectedCategory)}`}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFiltersModal(false)}
          />

          {/* Modal */}
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#6B8E4E] pb-4">
                <h3 className="text-lg font-bold text-[#5D4E37]">Filtros</h3>
                <button
                  onClick={() => setShowFiltersModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Cerrar"
                >
                  <X className="w-6 h-6 text-[#5D4E37]" />
                </button>
              </div>

              <FiltersPanelMobile
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                onCategoryChange={(category) => {
                  handleCategoryChange(category);
                  setShowFiltersModal(false);
                }}
                onSortChange={(sort) => {
                  handleSortChange(sort);
                  setShowFiltersModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
