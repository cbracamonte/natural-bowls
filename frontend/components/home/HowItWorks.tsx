import { Utensils, Leaf, Truck, Heart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Utensils,
    title: 'Elige tu bowl',
    description: 'Explora nuestro menú y selecciona tus favoritos.',
  },
  {
    number: '02',
    icon: Leaf,
    title: 'Ingredientes frescos',
    description: 'Preparamos todo con productos naturales del día.',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Delivery o recojo',
    description: 'Recibe tu pedido o recógelo en tienda.',
  },
  {
    number: '04',
    icon: Heart,
    title: 'Disfruta',
    description: 'Comida saludable lista para disfrutar.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-monstera">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] text-center mb-16">
          ¿Cómo funciona Natural Bowls?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-2xl border-2 border-[#C5D9A4] flex items-center justify-center bg-white">
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
