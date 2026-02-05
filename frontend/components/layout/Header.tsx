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
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2">
            <Image
              src="/images/logo.png"
              alt="Natural Bowls"
              width={145}
              height={160}
              className="h-14 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#5D4E37] hover:text-[#6B8E4E] font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart & CTA */}
          <div className="flex items-center space-x-4">
            <Link
              href="/carrito"
              className="relative p-2 text-[#5D4E37] hover:text-[#6B8E4E] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B8E4E] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/menu"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#5D4E37] text-white rounded-full font-medium hover:bg-[#4A3E2C] transition-colors"
            >
              Ordenar
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#5D4E37]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-[#5D4E37] hover:text-[#6B8E4E] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
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
