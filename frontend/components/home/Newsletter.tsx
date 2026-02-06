'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-[#5D4E37]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-12 h-72 w-72 rounded-full bg-[#9CB973]/30 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#6B8E4E]/35 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,243,239,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(156,185,115,0.18),transparent_40%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em]">
              Newsletter
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Acceso Exclusivo a Ofertas<br /><span className="text-[#C5D9A4]">Solo para Suscriptores</span>
            </h2>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl">
              Recibe 10% en tu próximo pedido + promociones semanales que no verás en redes sociales. Únete a nuestra comunidad consciente.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-white">
                  ¡Bienvenido a la comunidad! Tu descuento está en camino.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <div className="flex-1 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/75 caret-[#C5D9A4] focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-[#9CB973] px-8 py-4 text-[#3E3426] font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#C5D9A4]"
                >
                  Obtén Mi Descuento
                </button>
              </form>
            )}
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-3xl border border-white/15 bg-white/10" />
            <div className="relative mx-auto w-80 h-80">
              <Image
                src="/images/smoothie-bowl.jpg"
                alt="Natural Bowls"
                fill
                className="object-cover rounded-[2.25rem] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
              />
            </div>
            <div className="absolute -bottom-4 left-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90">
              + Nuevos lanzamientos cada semana
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
