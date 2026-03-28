import type { Metadata } from "next";

// El carrito no debe ser indexado por buscadores
export const metadata: Metadata = {
  title: { absolute: "Tu Carrito | Natural Bowls" },
  description: "Revisa los productos en tu carrito y completa tu pedido.",
  robots: { index: false, follow: false },
};

export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
