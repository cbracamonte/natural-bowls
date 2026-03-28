'use client';

import { Utensils, Leaf, Truck, Heart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Utensils,
    title: 'Elige con Libertad',
    description: 'Personaliza cada bowl exactamente como deseas. 20+ ingredientes a tu servicio.',
  },
  {
    number: '02',
    icon: Leaf,
    title: 'Frescura Garantizada',
    description: 'Ingredientes premium seleccionados hoy. Nada procesado, solo naturaleza.',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Delivery en 30 min o recógelo en tienda. Elegancia sin esperas.',
  },
  {
    number: '04',
    icon: Heart,
    title: 'Disfruta Responsable',
    description: 'Comida que alimenta cuerpo y conciencia. Nutrición consciente en cada bocado.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-monstera scroll-mt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] text-center mb-16">
          ¿Cómo funciona Natural Bowls?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-3xl border-2 border-[#C5D9A4] flex items-center justify-center bg-white shadow-md">
                  <span className="text-2xl font-bold text-[#5D4E37]">{step.number}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#5D4E37] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
