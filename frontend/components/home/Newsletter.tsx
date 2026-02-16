"use client";

import { useState } from "react";
import Image from "next/image";
import { subscribeToNewsletter } from "@/lib/services/newsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Por favor ingresa tu correo");
      return;
    }

    setLoading(true);

    const result = await subscribeToNewsletter(email);

    if (!result.success) {
      setError(result.error || result.message);
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setEmail("");
    setLoading(false);

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden py-20 lg:py-28 bg-linear-to-br from-monstera-cream via-white to-[#F5F3EF] scroll-mt-48"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[#9CB973]/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#6B8E4E]/12 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#6B8E4E]/30 bg-[#6B8E4E]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#6B8E4E] font-semibold">
              Newsletter
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-5xl font-bold text-[#5D4E37]">
              Ofertas Exclusivas<span className="block text-[#6B8E4E]">Para Suscriptores</span>
            </h2>
            <p className="mt-5 text-gray-700 text-base md:text-lg max-w-lg">
              Suscríbete y recibe <span className="font-semibold text-[#6B8E4E]">ofertas semanales exclusivas</span>, nuevos lanzamientos y promociones. Únete a nuestra comunidad NBLover
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border-2 border-green-300 bg-green-50 px-6 py-4 text-green-800">
                <p className="font-semibold">✓ ¡Suscripción Confirmada!</p>
                <p className="text-sm mt-1">
                  Revisa tu correo y comienza a recibir nuestras ofertas exclusivas.
                </p>
              </div>
            ) : error ? (
              <div className="mt-8 rounded-2xl border-2 border-red-300 bg-red-50 px-6 py-4 text-red-800">
                <p className="font-semibold">⚠ Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg"
              >
                <div className="flex-1 rounded-xl border-2 border-[#6B8E4E]/20 bg-white p-1 shadow-md focus-within:border-[#6B8E4E]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-transparent px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:outline-none text-base"
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#6B8E4E] hover:bg-[#5D7A42] disabled:bg-gray-400 text-white px-8 py-3 font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
                >
                  {loading ? "Suscribiendo..." : "Suscribirme Ahora"}
                </button>
              </form>
            )}
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-sm aspect-square">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-3xl border-2 border-[#6B8E4E]/20 bg-white/60" />
              <Image
                src="/images/smoothie-bowl.jpg"
                alt="Disfruta de Natural Bowls"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
