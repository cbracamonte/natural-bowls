"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/schemas";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/utils";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { productId, quantity, name, price, image, ingredients, customizations } = item;

  // used previously to adjust the image/link behaviour – still useful
  const isCustomBowl = name.toLowerCase().includes('poke') || name.toLowerCase().includes('smoothie');

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Image */}
      {isCustomBowl ? (
        <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
          <Image
            src={image || ""}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      ) : (
        <Link
          href={`/producto/${productId}`}
          className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0"
        >
          <Image
            src={image || ""}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-2xl"
          />
        </Link>
      )}

      {/* Details */}
      <div className="flex-1 min-w-0">
        {isCustomBowl ? (
          <span className="font-medium text-gray-900 block truncate">
            {name}
          </span>
        ) : (
          <Link
            href={`/producto/${productId}`}
            className="font-medium text-gray-900 hover:text-emerald-600 transition-colors block truncate"
          >
            {name}
          </Link>
        )}

        {/* show customization lines (size/base/proteina etc) if present */}
        {customizations && Object.keys(customizations).length > 0 && (
          <div className="mt-1 text-xs text-gray-600 space-y-1">
            {customizations.tamaño && (
              <div>Tamaño: {customizations.tamaño}</div>
            )}
            {customizations.base && (
              <div>Base: {customizations.base}</div>
            )}
            {customizations.proteina && (
              <div>Proteína: {customizations.proteina}</div>
            )}
            {['toppings', 'agregados', 'salsas'].map((k) =>
              customizations[k] && customizations[k].length > 0 ? (
                <div key={k}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}:{' '}
                  <span className="flex flex-wrap gap-1 mt-1">
                    {customizations[k].map((ing: string) => (
                      <span
                        key={ing}
                        className="border border-[#9CB973]/50 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                      >
                        {ing}
                      </span>
                    ))}
                  </span>
                </div>
              ) : null,
            )}
          </div>
        )}

        {/* always show ingredients array when available */}
        {ingredients && ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {ingredients.map((ing) => (
              <span
                key={ing}
                className="bg-[#9CB973]/10 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
              >
                {ing}
              </span>
            ))}
          </div>
        )}
        <p className="font-semibold text-emerald-600 mt-1">
          {formatPrice(price)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border rounded-full">
          <button
            onClick={() => updateQuantity(productId, quantity - 1)}
            className="p-1.5 hover:bg-gray-100 rounded-l-full transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-medium">{quantity}</span>
          <button
            onClick={() => updateQuantity(productId, quantity + 1)}
            className="p-1.5 hover:bg-gray-100 rounded-r-full transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => removeItem(productId)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
