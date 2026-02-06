'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Menú', href: '/menu' },
    { name: 'Bowls', href: '/bowls' },
    { name: 'Promociones', href: '/promociones' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2" aria-label="Ir al inicio">
            <Image
              src="/images/nb-isotipo.svg"
              alt="Natural Bowls"
              width={56}
              height={56}
              className="h-12 w-12 md:hidden"
              priority
            />
            <Image
              src="/images/nb-logotipo.svg"
              alt="Natural Bowls"
              width={180}
              height={64}
              className="hidden md:block h-14 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8" role="list">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-[#5D4E37] hover:text-[#6B8E4E] font-medium transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart & CTA */}
          <div className="flex items-center space-x-4">
            <Link
              href="/carrito"
              className="relative p-2 text-[#5D4E37] hover:text-[#6B8E4E] transition-colors"
              aria-label={`Ver carrito${itemCount ? `, ${itemCount} artículos` : ''}`}
            >
              <ShoppingBag className="w-6 h-6" aria-hidden />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B8E4E] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" aria-live="polite">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </Link>

            <Link
              href="/menu"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
            >
              Ordenar
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-[#5D4E37]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-100" role="dialog" aria-label="Menú móvil">
            <ul role="list">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-[#5D4E37] hover:text-[#6B8E4E] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/menu"
              className="block mt-4 text-center px-5 py-2.5 bg-[#5D4E37] text-white rounded-full font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Ordenar Ahora
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
