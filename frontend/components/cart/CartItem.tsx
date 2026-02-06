'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

const categoryEmojis: Record<string, string> = {
  poke: '🍣',
  'smoothie-bowl': '🫐',
  bebidas: '🥤',
  cafe: '☕',
};

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Image */}
      <Link
        href={`/producto/${product.id}`}
        className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0"
      >
        <span className="text-4xl">{categoryEmojis[product.category]}</span>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/producto/${product.id}`}
          className="font-medium text-gray-900 hover:text-emerald-600 transition-colors block truncate"
        >
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
        <p className="font-semibold text-emerald-600 mt-1">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border rounded-full">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="p-1.5 hover:bg-gray-100 rounded-l-full transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-medium">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="p-1.5 hover:bg-gray-100 rounded-r-full transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => removeItem(product.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
