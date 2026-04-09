"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-red-500">!</span>
        </div>
        <h2 className="text-2xl font-bold text-[#5D4E37] mb-3">
          Algo salió mal
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, ocurrió un error inesperado. Por favor intentá de nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#6B8E4E] text-white rounded-full font-semibold hover:bg-[#5A7A42] transition-colors"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-[#5D4E37] rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
