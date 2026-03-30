"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ReservationModal from "@/components/reservation/ReservationModal";
import UserMenu from "@/components/layout/UserMenu";
import MobileUserAuth from "@/components/layout/MobileUserAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isHydrated] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { itemCount } = useCart();

  /* Main navigation — visible in desktop navbar */
  const mainNavigation = [
    { name: "Inicio", href: "/" },
    { name: "Pide tu Bowl", href: "/bowls" },
    { name: "Promociones", href: "/promociones" },
  ];

  /* Secondary navigation — dropdown + mobile menu */
  const secondaryNavigation = [
    { name: "Nosotros", href: "/nosotros" },
    { name: "Catering", href: "/catering" },
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
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchend", handleTouchEnd);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, touchStart]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white sticky top-0 z-30 shadow-sm" role="banner">
        {/* Monstera background decoration */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <Image
            src="/icons/monstera-bg-1.svg"
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        {/* Desktop Navigation */}
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          aria-label="Navegación principal"
        >
          <div className="flex items-center justify-between h-24 md:h-28">
            {/* Left Navigation (Desktop) */}
            <ul
              className="hidden lg:flex items-center gap-6"
              role="list"
            >
              {mainNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#5D4E37] hover:text-[#6B8E4E] font-semibold text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Dropdown "Más" */}
              <li ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-[#8B7355] hover:text-[#6B8E4E] font-semibold text-sm transition-colors"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  Más
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isDropdownOpen && (
                  <ul
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-[fadeIn_150ms_ease-out]"
                    role="list"
                  >
                    {secondaryNavigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2.5 text-[#8B7355] hover:text-[#6B8E4E] hover:bg-[#F9FBE7] text-sm font-medium transition-colors rounded-lg mx-1"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="border-2 border-[#5D4E37] text-[#5D4E37] rounded-full px-5 py-2 font-semibold text-sm hover:bg-[#5D4E37] hover:text-white transition-all"
                >
                  Reserva
                </button>
              </li>
            </ul>

            {/* Logo (Center) */}
            <Link href="/" className="shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2" aria-label="Ir al inicio">
              <Image
                src="/icons/nb-isotipo.svg"
                alt="Natural Bowls"
                width={72}
                height={72}
                className="h-16 w-16 md:h-18 md:w-18 lg:hidden"
                priority
              />
              <Image
                src="/icons/nb-logotipo.svg"
                alt="Natural Bowls"
                width={220}
                height={80}
                className="hidden lg:block h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Auth (Desktop) */}
              <div className="hidden lg:block">
                <UserMenu />
              </div>

              {/* Cart */}
              <Link
                href="/carrito"
                className="relative p-2 text-[#5D4E37] hover:text-[#6B8E4E] transition-colors"
                aria-label="Ver carrito"
              >
                <ShoppingBag className="w-6 h-6" aria-hidden />
                {isHydrated && itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-[#6B8E4E] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    aria-live="polite"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Ordenar CTA (Desktop) */}
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
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
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
              className="fixed inset-0 bg-black/30 lg:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu Panel */}
            <div
              ref={menuRef}
              id="mobile-menu"
              className={`fixed top-0 right-0 w-4/5 h-screen bg-white shadow-2xl lg:hidden z-50 transform transition-transform duration-700 ease-out overflow-y-auto ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
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
              <nav className="p-6">
                {/* Main Links */}
                <ul role="list" className="space-y-1">
                  {mainNavigation.map((item) => (
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

                {/* Secondary Links */}
                <div className="border-t border-gray-100 mt-3 pt-3">
                  <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Más
                  </p>
                  <ul role="list" className="space-y-1">
                    {secondaryNavigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-4 py-3 text-[#5D4E37]/70 hover:text-[#6B8E4E] hover:bg-gray-50 font-medium transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Auth */}
                <MobileUserAuth onNavigate={() => setIsMenuOpen(false)} />

                {/* CTA Buttons */}
                <div className="mt-4 space-y-3 px-4">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsReservationOpen(true);
                    }}
                    className="block w-full py-3 bg-[#6B8E4E] text-white rounded-full font-bold text-center shadow-md hover:bg-[#5a7a40] transition-all transform active:scale-[0.98]"
                  >
                    Reserva tu Mesa
                  </button>

                  <Link
                    href="/menu"
                    className="block w-full py-3 bg-[#5D4E37] text-white rounded-full font-semibold text-center hover:bg-[#4A3E2C] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ordenar Ahora
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>

      {isReservationOpen && (
        <ReservationModal
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
        />
      )}
    </>
  );
}
