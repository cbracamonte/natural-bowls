'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/seo/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';



export default function CheckoutPage() {
  const { items, total } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const finalTotal = total;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Teléfono inválido (9 dígitos)';
    }
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const whatsappNumber = SITE_CONFIG.phone.replace(/\D/g, '');
    const itemsText = items
      .map((item, index) => {
        const lineTotal = item.product.price * item.quantity;
        return (
          `${index + 1}. ${item.product.name} x${item.quantity}\n` +
          `   ${item.product.description}\n` +
          `   ${formatPrice(item.product.price)} c/u - ${formatPrice(lineTotal)}`
        );
      })
      .join('\n');

    const notesText = formData.notes.trim()
      ? `\nNotas: ${formData.notes.trim()}`
      : '';

    const message = [
      'Nuevo pedido - Natural Bowls',
      `Nombre: ${formData.name}`,
      `Telefono: ${formData.phone}`,
      `Direccion: ${formData.address}, ${formData.city}`,
      '',
      'Productos:',
      itemsText,
      '',
      `Total: ${formatPrice(finalTotal)}`,
      '',
      'Primer pedido: solicitar descuento especial.',
      notesText,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No hay productos en tu carrito
          </h1>
          <Link href="/menu">
            <Button>Ver Menú</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monstera-cream scroll-mt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          href="/carrito"
          className="flex items-center text-gray-600 hover:text-[#6B8E4E]-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al carrito
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Información de Contacto
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Nombre completo"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      placeholder="Tu nombre"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Primer pedido web: descuento especial.
                    </p>
                  </div>

                  <Input
                    label="Telefono"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="912 341 818"
                    className="md:col-span-2"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Dirección de Entrega
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    placeholder="Calle, número, colonia"
                  />
                  <Input
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    placeholder="Ciudad"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notas de entrega (opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E4E]-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Instrucciones especiales para la entrega..."
                    />
                  </div>
                </div>
              </div>


            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen del Pedido
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-[#6B8E4E]-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Abriendo WhatsApp...' : 'Enviar pedido por WhatsApp'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
