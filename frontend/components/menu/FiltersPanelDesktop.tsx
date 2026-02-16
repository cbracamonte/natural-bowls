'use client';
import { PRODUCTS_CATEGORY } from '@/data/products-category';
import { cn } from '@/lib/utils/utils';

interface FiltersPanelDesktopProps {
  selectedCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export default function FiltersPanelDesktop({
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
}: FiltersPanelDesktopProps) {
  return (
    <>
      {/* Categories Filter */}
      <div>
        <h4 className="font-semibold text-[#5D4E37] mb-4 text-sm uppercase tracking-wide">
          Categoría
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={cn(
              'block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200',
              selectedCategory === 'all'
                ? 'bg-[#6B8E4E] text-white font-semibold'
                : 'text-gray-700 hover:bg-[#F5F3EF]'
            )}
          >
            Todos
          </button>
          {PRODUCTS_CATEGORY.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200',
                selectedCategory === category.id
                  ? 'bg-[#6B8E4E] text-white font-semibold'
                  : 'text-gray-700 hover:bg-[#F5F3EF]'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h4 className="font-semibold text-[#5D4E37] mb-4 text-sm uppercase tracking-wide">
          Ordenar Por
        </h4>
        <div className="space-y-2">
          {[
            { value: 'featured', label: 'Recomendados' },
            { value: 'name', label: 'Nombre A-Z' },
            { value: 'price-asc', label: 'Menor Precio' },
            { value: 'price-desc', label: 'Mayor Precio' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={cn(
                'block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200',
                sortBy === option.value || (option.value === 'featured' && !sortBy)
                  ? 'bg-[#6B8E4E] text-white font-semibold'
                  : 'text-gray-700 hover:bg-[#F5F3EF]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
