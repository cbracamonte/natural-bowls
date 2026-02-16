'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface PaginationControlsProps {
  safePage: number;
  totalPages: number;
  paginatedProductsLength: number;
  filteredProductsLength: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  safePage,
  totalPages,
  paginatedProductsLength,
  filteredProductsLength,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-8 py-6 px-4 border-t border-b border-gray-200 bg-gray-50 rounded-lg">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(safePage - 1)}
        disabled={safePage === 1}
        className={cn(
          'p-2 rounded-lg transition-all duration-200',
          safePage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-[#5D4E37] hover:bg-white hover:text-[#6B8E4E] hover:shadow-sm'
        )}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Page Info and Numbers - Center */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Info */}
        <div className="text-sm text-gray-700 whitespace-nowrap text-center sm:text-left font-medium">
          <span className="font-semibold text-[#5D4E37]">
            Página {safePage} de {totalPages}
          </span>
          <span className="text-gray-500"> · </span>
          <span>
            {paginatedProductsLength} de {filteredProductsLength}
          </span>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const showPage =
              page === 1 || page === totalPages || Math.abs(page - safePage) <= 1;

            if (!showPage && page !== 2 && page !== totalPages - 1) {
              return null;
            }

            if (page === 2 && safePage > 3) {
              return (
                <span key="ellipsis-start" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            if (page === totalPages - 1 && safePage < totalPages - 2) {
              return (
                <span key="ellipsis-end" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'min-w-10 h-10 rounded-lg font-semibold transition-all duration-200 text-sm',
                  safePage === page
                    ? 'bg-[#6B8E4E] text-white shadow-md'
                    : 'text-[#5D4E37] hover:bg-white hover:shadow-sm'
                )}
                aria-current={safePage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(safePage + 1)}
        disabled={safePage === totalPages}
        className={cn(
          'p-2 rounded-lg transition-all duration-200',
          safePage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-[#5D4E37] hover:bg-white hover:text-[#6B8E4E] hover:shadow-sm'
        )}
        aria-label="Próxima página"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
