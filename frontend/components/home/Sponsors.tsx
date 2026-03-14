import Image from "next/image";

const aliados = [
  { name: "BBVA", logo: "/images/aliados/bbva.svg" },
  { name: "Club UCV", logo: "/images/aliados/club-ucv.svg" },
  { name: "Evolution", logo: "/images/aliados/evolution.svg" },
];

// Duplicamos para crear el efecto de marquee infinito
const aliadosLoop = [...aliados, ...aliados, ...aliados];

export default function Sponsors() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#4D7A30] mb-3">
            Nuestros Aliados
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4E37]">
            Empresas que confían en nosotros
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#9CB973]" />
        </div>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          {/* Gradientes de fade en los bordes */}
          <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Track animado */}
          <div className="flex items-center gap-16 w-max animate-marquee">
            {aliadosLoop.map((aliado, idx) => (
              <div
                key={`${aliado.name}-${idx}`}
                className="flex items-center justify-center w-36 h-20 shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={aliado.logo}
                  alt={`Logo ${aliado.name}`}
                  width={120}
                  height={60}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
