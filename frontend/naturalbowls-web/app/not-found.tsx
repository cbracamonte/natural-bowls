import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/wrap-detail.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#5D4E37] via-[#5D4E37]/80 to-[#5D4E37]/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Logotipo */}
        <Image
          src="/icons/nb-logotipo-white.svg"
          alt="Natural Bowls"
          width={160}
          height={54}
          className="mb-10"
        />

        {/* 404 */}
        <p className="text-[7rem] sm:text-[9rem] font-bold leading-none text-white select-none tracking-tighter">
          404
        </p>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-[#9CB973] rounded-full -mt-4 mb-6" />

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Página no encontrada
        </h1>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
          Lo sentimos, esta página no existe o fue movida.
          Vuelve al inicio para seguir explorando nuestro menú.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#9CB973] text-white rounded-full font-semibold hover:bg-[#8aab5f] transition-all hover:shadow-lg text-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Volver al inicio
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center px-7 py-3 border border-white/25 text-white/80 rounded-full font-semibold hover:bg-white/10 hover:text-white transition-all text-sm"
          >
            Ver menú
          </Link>
        </div>
      </div>
    </div>
  );
}
