"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />
    );
  }

  if (!session?.user) {
    // TODO: Habilitar cuando el login esté listo para producción
    // return (
    //   <Link
    //     href="/login"
    //     className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-[#5D4E37] hover:text-[#6B8E4E] font-semibold text-sm transition-colors"
    //   >
    //     <User className="w-4 h-4" aria-hidden />
    //     Entrar
    //   </Link>
    // );
    return null;
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#9CB973] transition-all focus:outline-none focus:ring-[#9CB973]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menú de usuario"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "Avatar"}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#9CB973] flex items-center justify-center text-white font-bold text-sm">
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-[fadeIn_150ms_ease-out]">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-[#5D4E37] truncate">
              {session.user.name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {session.user.email}
            </p>
          </div>

          {/* Sign out */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" aria-hidden />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
