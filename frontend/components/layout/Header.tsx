'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Menú', href: '/menu' },
    { name: 'Bowls', href: '/bowls' },
    { name: 'Promociones', href: '/promociones' },
    { name: 'Ubicación', href: '/#ubicacion' },
  ];

  // Handle swipe to close menu
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientX;
      if (touchStart - touchEnd > 100) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, touchStart]);

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm" role="banner">
      {/* Desktop Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex justify-center items-center h-24 md:h-28 relative">
          {/* Left Navigation */}
          <ul className="hidden lg:flex items-center space-x-6 absolute left-0" role="list">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-[#5D4E37] hover:text-[#6B8E4E] font-semibold text-sm transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <Link href="/" className="shrink-0" aria-label="Ir al inicio">
            {/* Mobile Logo */}
            <Image
              src="/images/nb-isotipo.svg"
              alt="Natural Bowls"
              width={64}
              height={64}
              className="h-14 w-14 md:h-16 md:w-16 lg:hidden"
              priority
            />
            {/* Desktop Logo - Large and centered */}
            <Image
              src="/images/nb-logotipo.svg"
              alt="Natural Bowls"
              width={220}
              height={80}
              className="hidden lg:block h-20 w-auto object-contain filter drop-shadow-sm"
              priority
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4 absolute right-0">
            {/* Cart Button */}
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

            {/* Desktop CTA Button */}
            <Link
              href="/menu"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#5D4E37] text-white rounded-full font-semibold hover:bg-[#4A3E2C] transition-all hover:shadow-md text-sm"
            >
              Ordenar
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-[#5D4E37]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden />
              ) : (
                <Menu className="w-6 h-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 md:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu Panel */}
          <div
            ref={menuRef}
            id="mobile-menu"
            className={`fixed top-0 right-0 w-4/5 h-screen bg-white shadow-2xl md:hidden z-50 transform transition-transform duration-700 ease-out overflow-y-auto ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-label="Menú móvil"
          >
            {/* Close Button */}
            <div className="sticky top-0 bg-white p-4 flex justify-end">
              <button
                type="button"
                className="p-2 text-[#5D4E37]"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-6 space-y-1">
              <ul role="list" className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-[#5D4E37] hover:text-[#6B8E4E] hover:bg-gray-50 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Button in Menu */}
              <Link
                href="/menu"
                className="block mt-6 px-5 py-3 bg-[#5D4E37] text-white rounded-full font-semibold text-center hover:bg-[#4A3E2C] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ordenar Ahora
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
