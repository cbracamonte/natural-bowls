'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getProductById, getProductsByCategory } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/utils';
import ProductCard from '@/components/products/ProductCard';

const categoryNames: Record<string, string> = {
  poke: 'Poke Bowl',
  'smoothie-bowl': 'Smoothie Bowl',
  bebidas: 'Bebida',
  cafe: 'Café',
  wraps: 'Wrap',
  sandwiches: 'Sándwich',
  ensaladas: 'Ensalada',
  desayunos: 'Desayuno',
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, itemCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(params.id as string);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#5D4E37] mb-4">
            Producto no encontrado
          </h1>
          <Link
            href="/menu"
            className="inline-flex items-center px-6 py-3 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
          >
            Ver Menú
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-monstera-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#5D4E37] hover:text-[#6B8E4E] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="inline-block w-fit px-4 py-1 bg-[#9CB973]/20 text-[#6B8E4E] rounded-full text-sm font-medium mb-4 capitalize">
              {categoryNames[product.categoryId] || product.categoryId}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
              {product.name}
            </h1>

            <p className="text-lg text-gray-600 mb-6">{product.description}</p>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#5D4E37] mb-3">Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Calories */}
            {product.calories && (
              <p className="text-sm text-gray-500 mb-6">
                {product.calories} calorías por porción
              </p>
            )}

            {/* Price */}
            <div className="text-3xl font-bold text-[#6B8E4E] mb-6">
              {formatPrice(product.price)}
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#5D4E37] font-medium">Cantidad:</span>
              <div className="flex items-center border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center px-8 py-3.5 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {added ? '¡Agregado!' : 'Agregar al Carrito'}
              </button>
            </div>

            {itemCount > 0 && (
              <Link
                href="/carrito"
                className="mt-4 inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#5D4E37] text-[#5D4E37] rounded-full font-medium hover:bg-[#5D4E37] hover:text-white transition-colors"
              >
                Ver Carrito ({itemCount} items)
              </Link>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#5D4E37] mb-6">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
