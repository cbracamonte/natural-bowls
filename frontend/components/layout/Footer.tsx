import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#5D4E37] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4" aria-label="Volver al inicio">
              <Image
                src="/images/nb-isotipo-white.svg"
                alt="Natural Bowls"
                width={64}
                height={64}
                className="w-16 h-16 md:hidden"
              />
              <Image
                src="/images/nb-logotipo-white.svg"
                alt="Natural Bowls"
                width={180}
                height={64}
                className="hidden md:block h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 mb-4 max-w-md">
              Smoothies & Café en Trujillo. Comida saludable, fresca y deliciosa.
              Poke bowls, smoothie bowls, wraps, ensaladas y el mejor café.
            </p>
            <div className="flex space-x-4" aria-label="Redes sociales">
              <a
                href="https://www.instagram.com/naturalbowls.cafe/"
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6B8E4E] transition-colors"
                aria-label="Instagram de Natural Bowls"
              >
                <Instagram className="w-5 h-5" aria-hidden />
              </a>
              <a
                href="https://www.facebook.com/NaturalBowlsCafeteria"
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6B8E4E] transition-colors"
                aria-label="Facebook de Natural Bowls"
              >
                <Facebook className="w-5 h-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Navegación de menú">
            <h3 className="text-lg font-semibold mb-4">Menú</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bowls" className="text-white/70 hover:text-[#9CB973] transition-colors">
                  Bowls
                </Link>
              </li>
              <li>
                <Link href="/menu?category=wraps" className="text-white/70 hover:text-[#9CB973] transition-colors">
                  Wraps
                </Link>
              </li>
              <li>
                <Link href="/menu?category=ensaladas" className="text-white/70 hover:text-[#9CB973] transition-colors">
                  Ensaladas
                </Link>
              </li>
              <li>
                <Link href="/menu?category=bebidas" className="text-white/70 hover:text-[#9CB973] transition-colors">
                  Bebidas
                </Link>
              </li>
              <li>
                <Link href="/menu?category=cafe" className="text-white/70 hover:text-[#9CB973] transition-colors">
                  Café
                </Link>
              </li>
              <li>
                <Link href="/promociones" className="text-white/70 hover:text-[#9CB973] transition-colors">
                  Promociones
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div aria-label="Información de contacto">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic space-y-3 text-white/70">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#9CB973] flex-shrink-0 mt-0.5" aria-hidden />
                <span>Trujillo, Perú</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#9CB973] flex-shrink-0" aria-hidden />
                <a href="tel:+51936519955" className="hover:text-[#9CB973]">936 519 955</a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#9CB973] flex-shrink-0" aria-hidden />
                <span aria-label="Horario de atención">Lun-Dom: 8am - 9pm</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Natural Bowls. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0" aria-label="Usuario de Instagram">@naturalbowls.cafe</p>
        </div>
      </div>
    </footer>
  );
}
