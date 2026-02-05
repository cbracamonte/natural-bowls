import Image from 'next/image';
import Link from 'next/link';
import { Gift, Percent, Clock, CreditCard } from 'lucide-react';

export default function PromocionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#5D4E37] to-[#7A6B52] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-[#9CB973] text-[#5D4E37] rounded-full text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Ofertas Especiales
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Promociones
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Aprovecha nuestras ofertas exclusivas y disfruta más por menos.
          </p>
        </div>
      </section>

      {/* Loyalty Card Section */}
      <section className="py-16 bg-monstera-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-medium mb-4">
                <CreditCard className="w-4 h-4" />
                Programa de Fidelidad
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
                Loyalty Card
              </h2>
              <p className="text-gray-600 mb-6">
                Acumula sellos con cada compra de smoothie bowls o poke bowls y obtén
                un bowl completamente gratis. ¡Es nuestra forma de agradecerte por elegirnos!
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#9CB973] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-600">Gana 1 sello por cada bowl que compres</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#9CB973] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-600">Completa 10 sellos y recibe un bowl gratis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#9CB973] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-600">Pide tu tarjeta en cualquiera de nuestras tiendas</span>
                </li>
              </ul>
              <Link
                href="/menu"
                className="inline-flex items-center px-6 py-3 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
              >
                Empezar a acumular
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/loyalty-card.jpg"
                  alt="Loyalty Card Natural Bowls"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Promotions */}
      <section className="py-16 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
              Promociones Activas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofertas por tiempo limitado. ¡No te las pierdas!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Combo Almuerzo */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/wrap-crispy.jpg"
                  alt="Combo Almuerzo"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#6B8E4E] text-white rounded-full font-bold">
                  15% OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                  Combo Almuerzo
                </h3>
                <p className="text-gray-600 mb-4">
                  Wrap o ensalada + bebida por un precio especial.
                  Perfecto para tu hora de almuerzo.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Lun - Vie, 12pm - 3pm</span>
                </div>
              </div>
            </div>

            {/* Happy Hour */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/smoothie-bowl.jpg"
                  alt="Happy Hour"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#6B8E4E] text-white rounded-full font-bold">
                  2x1
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                  Happy Hour
                </h3>
                <p className="text-gray-600 mb-4">
                  2x1 en smoothies y jugos. Comparte con un amigo
                  o guarda uno para después.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Lun - Jue, 4pm - 6pm</span>
                </div>
              </div>
            </div>

            {/* Descuento Primera Compra */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/poke-bowl.jpg"
                  alt="Primera Compra"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#6B8E4E] text-white rounded-full font-bold">
                  10% OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                  Primera Compra
                </h3>
                <p className="text-gray-600 mb-4">
                  ¿Es tu primera vez en Natural Bowls?
                  Obtén 10% de descuento en tu primer pedido.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Percent className="w-4 h-4" />
                  <span>Solo clientes nuevos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-[#5D4E37] mb-4">
            Términos y Condiciones
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Las promociones no son acumulables entre sí.</li>
            <li>• Válido solo en compras presenciales en tienda.</li>
            <li>• Los descuentos no aplican para delivery.</li>
            <li>• Promociones sujetas a disponibilidad.</li>
            <li>• Natural Bowls se reserva el derecho de modificar o cancelar promociones sin previo aviso.</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#9CB973]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#5D4E37] mb-4">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-[#5D4E37]/80 mb-8">
            Contáctanos por WhatsApp o visítanos en tienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/51936519955"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/naturalbowls.cafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#5D4E37] text-[#5D4E37] rounded-full font-medium hover:bg-[#5D4E37] hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
