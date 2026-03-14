import type { Metadata } from "next";

// Layout para todas las páginas bajo /producto
// Metadata por-producto requeriría refactorizar [id]/page.tsx a Server Component
export const metadata: Metadata = {
  title: {
    template: `%s | Natural Bowls`,
    default: "Producto | Natural Bowls",
  },
  description:
    "Descubre los productos frescos y saludables de Natural Bowls: poke bowls, smoothie bowls, wraps, bebidas y más.",
  robots: { index: true, follow: true },
};

export default function ProductoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
