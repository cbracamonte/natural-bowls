import Image from 'next/image';
import Link from 'next/link';

const offerings = [
  {
    title: 'Bowls',
    description: 'Smoothie y Poke',
    image: '/images/smoothie-bowl.jpg',
    href: '/bowls',
  },
  {
    title: 'Delivery',
    description: 'A domicilio',
    image: '/images/store.jpg',
    href: '/menu',
  },
  {
    title: 'Para llevar',
    description: 'Recógelo en tienda',
    image: '/images/wraps.jpg',
    href: '/menu',
  },
];

export default function Values() {
  return (
    <section id="valores" className="py-20 bg-monstera-green scroll-mt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] text-center mb-4">
          Tu Bienestar, Nuestro Compromiso
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Tres formas de vivir más saludable, sin sacrificar el placer de comer bien.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4E37] mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
