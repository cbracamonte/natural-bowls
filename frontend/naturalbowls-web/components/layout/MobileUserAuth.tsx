"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function MobileUserAuth({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="border-t border-gray-100 mt-3 pt-4 px-4">
        <div className="h-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
    );
  }

  if (!session?.user) {
    // TODO: Habilitar cuando el login esté listo para producción
    // return (
    //   <div className="border-t border-gray-100 mt-3 pt-4 px-4">
    //     <Link
    //       href="/login"
    //       className="block w-full py-3 border-2 border-[#5D4E37] text-[#5D4E37] rounded-full font-semibold text-center hover:bg-[#5D4E37] hover:text-white transition-all"
    //       onClick={onNavigate}
    //     >
    //       Entrar
    //     </Link>
    //   </div>
    // );
    return null;
  }

  return (
    <div className="border-t border-gray-100 mt-3 pt-4 px-4">
      <div className="flex items-center gap-3 mb-4">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "Avatar"}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#9CB973] flex items-center justify-center text-white font-bold">
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#5D4E37] truncate">
            {session.user.name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {session.user.email}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          onNavigate();
          signOut({ callbackUrl: "/" });
        }}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-red-200 text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all"
      >
        <LogOut className="w-4 h-4" aria-hidden />
        Cerrar sesión
      </button>
    </div>
  );
}
