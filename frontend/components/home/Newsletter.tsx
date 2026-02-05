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
    <section className="py-16 bg-[#5D4E37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Suscríbete y obtén 10% de descuento
            </h2>
            <p className="text-white/80 mb-6">
              Recibe promociones exclusivas, nuevos productos y descuentos especiales
              directamente en tu correo.
            </p>

            {submitted ? (
              <div className="bg-[#6B8E4E] text-white px-6 py-4 rounded-xl">
                ¡Gracias por suscribirte! Revisa tu correo para tu código de descuento.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9CB973]"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#9CB973] text-[#5D4E37] rounded-full font-medium hover:bg-[#C5D9A4] transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="relative w-80 h-80 mx-auto">
              <Image
                src="/images/smoothie-bowl.jpg"
                alt="Natural Bowls"
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
