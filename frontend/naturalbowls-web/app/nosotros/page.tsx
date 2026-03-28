import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Nosotros",
  description:
    "Conoce la historia, misión y visión de Natural Bowls. Somos un restaurante de comida saludable en Trujillo, Perú, comprometidos con tu bienestar.",
  keywords: [
    "nosotros",
    "sobre natural bowls",
    "comida saludable Trujillo",
    "restaurante saludable",
    "misión",
    "visión",
  ],
  path: "/nosotros",
});

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className="w-12 h-0.5 bg-[#9CB973]" />
      <span className="w-2 h-2 bg-[#6B8E4E] rounded-full" />
      <span className="w-12 h-0.5 bg-[#9CB973]" />
    </div>
  );
}

export default function NosotrosPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/store.jpg"
            alt="Interior de Natural Bowls"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E8F5E9] text-[#4CAF50] text-sm font-semibold tracking-wide mb-4">
            CONÓCENOS
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Sobre <span className="text-[#9CB973]">Natural Bowls</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Alimentación saludable, fresca y deliciosa en el corazón de
            Trujillo.
          </p>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionDivider />
            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] text-center md:text-left">
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Natural Bowls nació con la convicción de que comer bien no tiene
              que ser aburrido ni complicado. Somos un equipo apasionado por la
              alimentación saludable, comprometido con ofrecer platos frescos,
              nutritivos y llenos de sabor en cada visita.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Desde nuestros inicios en Trujillo, hemos trabajado para
              convertirnos en un espacio donde la calidad de los ingredientes, la
              creatividad en la cocina y la calidez del servicio se encuentran en
              cada bowl que servimos.
            </p>
          </div>
          <div className="relative h-96 md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about/personal.jpg"
              alt="Equipo de Natural Bowls"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-[#F9FBE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Misión */}
            <article className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl" role="img" aria-label="Estrella">
                  ★
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#5D4E37] mb-4">
                Nuestra Misión
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ofrecer a nuestros clientes una experiencia gastronómica
                saludable, accesible y deliciosa, utilizando ingredientes frescos
                y de la más alta calidad. Buscamos inspirar hábitos alimenticios
                positivos en nuestra comunidad, brindando opciones nutritivas que
                se adapten a cada estilo de vida, en un ambiente acogedor y con
                un servicio excepcional.
              </p>
            </article>

            {/* Visión */}
            <article className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl" role="img" aria-label="Cohete">
                  ◆
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#5D4E37] mb-4">
                Nuestra Visión
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ser la marca referente de alimentación saludable en Trujillo y
                expandirnos a nivel nacional, reconocidos por la innovación en
                nuestros productos, la sostenibilidad de nuestras prácticas y el
                impacto positivo en la salud y el bienestar de cada persona que
                nos elige. Queremos demostrar que lo saludable puede ser la
                opción más rica y conveniente.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Galería del local */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionDivider />
          <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mt-6">
            Nuestro Espacio
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Un lugar pensado para que disfrutes cada momento.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { src: "/images/about/store1.jpg", alt: "Interior del local" },
            { src: "/images/about/store2.jpg", alt: "Zona de pedidos" },
            { src: "/images/about/personal2.jpg", alt: "Nuestro equipo" },
          ].map((img) => (
            <div
              key={img.src}
              className="relative h-72 rounded-2xl overflow-hidden shadow-lg group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
