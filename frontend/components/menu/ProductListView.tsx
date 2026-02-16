'use client';

import Image from 'next/image';
import { Product } from '@/lib/schemas';
import { formatPrice } from '@/lib/utils/utils';

interface ProductListViewProps {
  products: Product[];
}

export default function ProductListView({ products }: ProductListViewProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-[#5D4E37] line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-bold text-[#6B8E4E]">
                {formatPrice(product.price)}
              </span>
              <button className="px-4 py-2 bg-[#6B8E4E] text-white rounded-lg hover:bg-[#5A7A42] transition-colors text-sm">
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
