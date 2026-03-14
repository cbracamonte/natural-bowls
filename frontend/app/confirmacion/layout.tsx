import type { Metadata } from "next";

// La confirmación no debe ser indexada ni compartir datos del pedido
export const metadata: Metadata = {
  title: { absolute: "Pedido Confirmado | Natural Bowls" },
  description: "Tu pedido ha sido confirmado. ¡Gracias por elegir Natural Bowls!",
  robots: { index: false, follow: false },
};

export default function ConfirmacionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
