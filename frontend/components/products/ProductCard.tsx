'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/lib/schemas';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // Detectar si es un producto personalizable (poke o smoothie-bowl)
  const isCustomizableProduct = product.categoryId === 'poke-bowl' || product.categoryId === 'smoothie-bowl';

  // Determinar el URL según si es personalizable
  const productUrl = isCustomizableProduct
    ? product.categoryId === 'poke-bowl'
      ? `/bowls?pokeSize=${product.id === 'poke-regular' ? 'regular' : 'grande'}#poke-bowls`
      : `/bowls?smoothie=${product.id}#smoothie-bowls`
    : `/producto/${product.id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={productUrl} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <span className="inline-block px-3 py-1 bg-[#4D7A30] text-white text-xs font-bold rounded-full">
                Favorito
              </span>
            )}
          </div>

          {/* Add to cart button - Enhanced */}
          {!isCustomizableProduct && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 right-4 w-12 h-12 bg-[#5D4E37] text-white rounded-full flex items-center justify-center opacity-60 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#6B8E4E] hover:scale-110 hover:opacity-100 shadow-lg active:scale-95"
              title="Agregar al carrito"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
          
          {/* Personalizar badge para productos customizables */}
          {isCustomizableProduct && (
            <div className="absolute bottom-4 right-4 bg-[#9CB973] text-white rounded-full flex items-center justify-center px-3 py-2 opacity-60 md:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg text-xs font-bold">
              Personalizar
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Name */}
          <h3 className="font-semibold text-[#5D4E37] mb-2 text-base group-hover:text-[#6B8E4E] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mb-4 pb-4 border-t border-gray-100 pt-4">
            {/* Rating */}
            {/* <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#6B8E4E] text-[#6B8E4E]" />
              <span className="text-xs font-semibold text-gray-700">4.8</span>
            </div> */}

            {/* Calories if available */}
            {product.calories && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                {product.calories} kcal
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#6B8E4E]">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              {isCustomizableProduct ? 'Personalizar' : 'Ver'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
