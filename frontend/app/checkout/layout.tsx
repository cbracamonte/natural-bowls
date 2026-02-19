import type { Metadata } from "next";

// El checkout no debe ser indexado por buscadores
export const metadata: Metadata = {
  title: { absolute: "Finalizar Pedido | Natural Bowls" },
  description: "Completa tu pedido de forma rápida y segura.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
