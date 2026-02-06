'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/producto/${product.id}`} className="group">
      <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-[#6B8E4E] text-white text-xs font-medium rounded-full">
                Popular
              </span>
            </div>
          )}

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-[#5D4E37] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#4A3E2C] hover:scale-110 shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-[#5D4E37] mb-1 group-hover:text-[#6B8E4E] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#6B8E4E]">
              {formatPrice(product.price)}
            </span>
            {product.calories && (
              <span className="text-xs text-gray-400">{product.calories} kcal</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
