import Image from 'next/image';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Catering & Eventos',
  description:
    'Servicio de catering saludable para eventos corporativos, cumpleaños y celebraciones en Trujillo. Cotiza tu evento con Natural Bowls.',
  keywords: ['catering saludable', 'catering Trujillo', 'catering eventos', 'bowl catering'],
  path: '/catering',
});

export default function CateringPage() {
  const whatsappLink = "https://wa.me/51912341818?text=Hola%20Natural%20Bowls%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20su%20servicio%20de%20catering%20para%20un%20evento.";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/icons/monstera-bg.svg"
            alt="Fondo natural"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-white/10 to-white/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E8F5E9] text-[#4CAF50] text-sm font-semibold tracking-wide mb-4">
            EVENTOS Y REUNIONES
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#5D4E37] mb-6">
            Catering <span className="text-[#8FB355]">Natural</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Lleva la frescura y el sabor de Natural Bowls a tus eventos corporativos, reuniones familiares o celebraciones especiales.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 rounded-full bg-[#8FB355] text-white font-semibold hover:bg-[#7a9c46] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Cotizar Evento
          </a>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37]">
              Una experiencia saludable para tus invitados
            </h2>
            <p className="text-gray-600 text-lg">
              Olvídate de lo convencional. Ofrecemos una propuesta gastronómica fresca, colorida y nutritiva que encantará a todos. Nuestros bowls, wraps y opciones saludables son preparados con ingredientes de la más alta calidad, seleccionados diariamente para garantizar el mejor sabor.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Ingredientes 100% frescos y naturales",
                "Opciones veganas, vegetarianas y sin gluten",
                "Presentación eco-amigable",
                "Menús personalizados según tu presupuesto"
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#8FB355] rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-125 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/poke-bowl.jpg"
              alt="Catering Natural Bowls"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-20 bg-[#F9FBE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
              Nuestras Propuestas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde coffee breaks saludables hasta almuerzos corporativos completos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/smoothie-bowl.jpg"
                  alt="Smoothie Bowls"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">Activaciones</h3>
                <p className="text-gray-600">Smoothie bowls, tostadas de aguacate, jugos prensados en frío y café de especialidad.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/wraps.jpg"
                  alt="Lunch Boxes"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">Lunch Boxes</h3>
                <p className="text-gray-600">Wraps, sándwiches gourmet y ensaladas frescas en empaques individuales listos para comer.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/poke-bowl-2.jpg"
                  alt="Buffet de Bowls"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">Estación de Bowls</h3>
                <p className="text-gray-600">Una barra interactiva donde tus invitados pueden armar sus propios poke bowls o ensaladas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#5D4E37] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <Image
            src="/icons/monstera-pattern.svg"
            alt="Pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para tu próximo evento?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Cuéntanos qué necesitas y nosotros nos encargamos del resto. Hacemos que comer saludable sea fácil y delicioso.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 rounded-full bg-white text-[#5D4E37] font-bold text-lg hover:bg-[#F9FBE7] transition-all duration-300 shadow-xl"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
