'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

const SHIPPING_COST = 49;
const FREE_SHIPPING_THRESHOLD = 300;

export default function CartSummary() {
  const { total, itemCount } = useCart();

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = total + shipping;

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Resumen del Pedido
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} productos)</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Envío</span>
          <span>
            {shipping === 0 ? (
              <span className="text-[#6B8E4E]-600 font-medium">Gratis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-500">
            ¡Envío gratis en pedidos mayores a {formatPrice(FREE_SHIPPING_THRESHOLD)}!
          </p>
        )}
      </div>

      <div className="border-t my-4" />

      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total</span>
        <span className="text-[#6B8E4E]-600">{formatPrice(finalTotal)}</span>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg">
          Continuar al Checkout
        </Button>
      </Link>

      <Link href="/menu">
        <Button variant="ghost" className="w-full mt-2">
          Seguir Comprando
        </Button>
      </Link>
    </div>
  );
}
