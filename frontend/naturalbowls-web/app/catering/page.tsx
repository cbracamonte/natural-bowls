import Image from "next/image";
import { generatePageMetadata, SITE_CONFIG } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/utils/contact";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata = generatePageMetadata({
  title: "Catering & Eventos",
  description:
    "Servicio de catering saludable para eventos corporativos, cumpleaños y celebraciones en Trujillo. Cotiza tu evento con Natural Bowls.",
  keywords: [
    "catering saludable",
    "catering Trujillo",
    "catering eventos",
    "bowl catering",
  ],
  path: "/catering",
});

export default function CateringPage() {
  const whatsappLink = buildWhatsAppUrl(
    "Hola Natural Bowls, quisiera más información sobre su servicio de catering para un evento.",
  );

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_CONFIG.url },
          { name: "Catering", url: `${SITE_CONFIG.url}/catering` },
        ]}
      />
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
            Natural <span className="text-[#8FB355]">Catering</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Lleva la frescura y el sabor de Natural Bowls a tus eventos
            corporativos, reuniones familiares o celebraciones especiales.
          </p>
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
              Te Ofrecemos novedosas y saludables propuestas, para compartir con
              amigos, activaciones, reuniones, eventos corporativos, y más.
              Ingredientes 100% frescos y naturales
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Opciones personalizadas para cada tipo de evento.",
                "Presentación eco-amigable.",
                "Menús personalizados según tu presupuesto.",
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
              Desde coffee breaks saludables hasta almuerzos corporativos
              completos.
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
              <div className="p-6 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                  Activaciones
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Si tienes un evento y quieres que nuestra marca este presente
                  con activaciones, o algún catering, contáctanos.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      "Hola Natural Bowls, quiero cotizar la opción de Activaciones para mi evento.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#4D7A30] hover:bg-[#3E6B22] text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Cotiza Aquí
                  </a>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/lunch-boxes.jpg"
                  alt="Lunch Boxes"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                  Lunch Boxes
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Para tus eventos corporativos o fechas especiales, regala lunch boxes y comparte con tu comunidad.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      "Hola Natural Bowls, quiero cotizar la opción de Lunch Boxes para mi evento.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#4D7A30] hover:bg-[#3E6B22] text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Cotiza Aquí
                  </a>
                </div>
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
              <div className="p-6 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                  Poke Party
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Lleva nuestra barra de pokes a tu mesa, arma tus propios poke bowls y ensalada junto a tus invitados.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      "Hola Natural Bowls, quiero cotizar la opción de Poke Partyocione para mi evento.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#4D7A30] hover:bg-[#3E6B22] text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Cotiza Aquí
                  </a>
                </div>
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
            Cuéntanos qué necesitas y nosotros nos encargamos del resto. Hacemos
            que comer saludable sea fácil y delicioso.
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
