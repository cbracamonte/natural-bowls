'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Clock, MapPin } from 'lucide-react';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('lastOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No se encontró ningún pedido
          </h1>
          <Link href="/menu">
            <Button>Ver Menú</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monstera-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#6B8E4E]-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#6B8E4E]-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-gray-600">
            Gracias por tu compra. Te enviaremos un email con los detalles.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <p className="text-sm text-gray-500">Número de pedido</p>
              <p className="text-xl font-bold text-gray-900">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold text-[#6B8E4E]-600">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#6B8E4E]-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-[#6B8E4E]-600" />
              </div>
              <p className="text-sm font-medium text-[#6B8E4E]-600">Confirmado</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">Preparando</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">En camino</p>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-[#6B8E4E]-50 rounded-xl p-4 flex items-center gap-4">
            <Clock className="w-8 h-8 text-[#6B8E4E]-600" />
            <div>
              <p className="font-medium text-gray-900">Tiempo estimado de entrega</p>
              <p className="text-sm text-gray-600">30-45 minutos</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Detalles del Pedido
          </h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span className="text-gray-600">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Información de Entrega
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-medium text-gray-900">Nombre:</span>{' '}
              {order.customer.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{' '}
              {order.customer.email}
            </p>
            <p>
              <span className="font-medium text-gray-900">Teléfono:</span>{' '}
              {order.customer.phone}
            </p>
            <p>
              <span className="font-medium text-gray-900">Dirección:</span>{' '}
              {order.customer.address}, {order.customer.city}
            </p>
            <p>
              <span className="font-medium text-gray-900">Método de pago:</span>{' '}
              {order.customer.paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Volver al Inicio</Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" size="lg">
              Hacer otro Pedido
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
