import Link from "next/link";
import BowlsContent from "./BowlsContent";

export default function BowlsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video — Server-rendered for SEO */}
      <section
        className="relative overflow-hidden pt-20 pb-0 scroll-mt-48"
        aria-labelledby="bowls-hero-title"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/videos/pokebowl-build-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1
              id="bowls-hero-title"
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Descubre Nuestros <span className="text-[#9CB973]">Bowls</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Cada bowl es una experiencia única. Ingredientes frescos, sabores
              auténticos y opciones para personalizar según tus preferencias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#poke-bowls"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#9CB973] text-[#5D4E37] rounded-full font-bold hover:bg-[#C5D9A4] transition-colors text-lg"
                aria-label="Explorar Poke Bowls"
              >
                Poke Bowls
              </Link>
              <Link
                href="#smoothie-bowls"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#5D4E37] transition-colors text-lg"
                aria-label="Explorar Smoothie Bowls"
              >
                Smoothie Bowls
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BowlsContent />
    </div>
  );
}
