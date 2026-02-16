export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  code?: string;
  icon: string;
  bgColor: string;
  textColor: string;
  expiryDate: string; // ISO date format: YYYY-MM-DD
  active: boolean;
  link?: string;
}

export const promotionsNotifications: Promotion[] = [
  {
    id: "promo-1",
    title: "BBVA Beneficios: 50% de desct. en toda la carta",
    description:
      "Exclusivo para clientes BBVA. Aplica en toda la carta, incluyendo combos y promociones vigentes. Del 08 de mayo al 30 de junio del 2024",
    discount: "50%",
    icon: "🍱",
    bgColor: "from-blue-50 to-cyan-50",
    textColor: "text-blue-900",
    expiryDate: "2026-03-15",
    active: true,
    link: "/menu",
  },
  {
    id: "promo-2",
    title: "Smoothie Bowl gratis",
    description: "Compra cualquier Poke Bowl y llévate un Smoothie Bowl",
    discount: "GRATIS",
    icon: "🥣",
    bgColor: "from-pink-50 to-rose-50",
    textColor: "text-pink-900",
    expiryDate: "2026-02-28",
    active: true,
    link: "/menu",
  },
  {
    id: "promo-3",
    title: "30% en Catering",
    description: "Para eventos de 10 personas en adelante",
    discount: "30%",
    icon: "🎉",
    bgColor: "from-purple-50 to-violet-50",
    textColor: "text-purple-900",
    expiryDate: "2026-04-30",
    active: true,
    link: "/catering",
  },
  {
    id: "promo-4",
    title: "Martes de Ofertas",
    description: "Todos los martes, 20% en compras mayores a S/ 50",
    discount: "20%",
    icon: "📅",
    bgColor: "from-orange-50 to-amber-50",
    textColor: "text-orange-900",
    expiryDate: "2026-05-31",
    active: true,
    link: "/menu",
  },
];

// Función para filtrar promociones activas
export function getActivePromotions(): Promotion[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day

  return promotionsNotifications.filter((promo) => {
    const expiryDate = new Date(promo.expiryDate);
    expiryDate.setHours(0, 0, 0, 0);
    return promo.active && expiryDate >= today;
  });
}
