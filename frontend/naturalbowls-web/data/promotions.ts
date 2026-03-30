export interface LoyaltyProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  benefits: string[];
  notification?: PromotionNotificationConfig;
}

export interface PromotionNotificationConfig {
  icon: string;
  bgColor: string;
  textColor: string;
  discount?: string;
  expiryDate: string; // ISO: YYYY-MM-DD
  active: boolean;
  ctaText: string;
  ctaLink?: string; // URL interna — si no se define, se usa WhatsApp
  whatsAppMessage?: string; // Mensaje de WhatsApp — solo si no hay ctaLink
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  detailImage?: string;
  badge?: string;
  schedule?: string;
  terms: string[];
  highlighted?: boolean;
  notification?: PromotionNotificationConfig;
}

export const LOYALTY_PROGRAM: LoyaltyProgram = {
  id: "loyalty-card",
  title: "Programa de Fidelidad",
  subtitle: "Loyalty Card",
  description:
    "Acumula sellos con cada visita a nuestra tienda para obtener descuentos y postres gratis.",
  image: "/images/promotions/loyalty-card.jpg",
  benefits: [
    "Gana 1 sello cada vez que visites nuestro local.",
    "Recibirás 1 postre gratis en tu cuarta visita en nuestro local.",
    "Válido solo para consumo en local.",
  ],
  notification: {
    icon: "💳",
    bgColor: "from-amber-50 to-yellow-50",
    textColor: "text-amber-900",
    discount: "Postre gratis",
    expiryDate: "2026-12-31",
    active: true,
    ctaText: "Ver programa",
    ctaLink: "/promociones",
  },
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "plan-pokes",
    title: "Plan Pokes",
    description:
      "Arma tu plan de pokes semanal o quincenal y ahorra en cada pedido.",
    image: "/images/promotions/poke-bowl-promotion.jpg",
    detailImage: "/images/promotions/plan-pokes.jpg",
    highlighted: true,
    terms: [
      "No incluye delivery.",
      "Válido hasta en 45 días para ser usado (mensual o quincenal).",
    ],
    notification: {
      icon: "🍣",
      bgColor: "from-emerald-50 to-teal-50",
      textColor: "text-emerald-900",
      discount: "Ahorra más",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Quiero mi plan",
      whatsAppMessage: "Hola! Me interesa el Plan Pokes 🍣",
    },
  },
  {
    id: "combo-universitario",
    title: "Combo Universitario",
    description:
      "Wrap o ensalada + bebida por un precio especial. Perfecto para tu hora de almuerzo.",
    image: "/images/promotions/combo-universitario.jpg",
    schedule: "Lun - Vie, 12pm - 3pm",
    terms: ["Válido de lunes a viernes de 12pm a 3pm."],
    notification: {
      icon: "🎓",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-900",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Adquirir Combo",
      whatsAppMessage: "Hola! Me interesa el Combo Universitario 🎓",
    },
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    description:
      "2x1 en smoothies y jugos. Comparte con un amigo o guarda uno para después.",
    image: "/images/promotions/happy-hour.jpg",
    badge: "2x1",
    schedule: "Lun - Jue, 4pm - 6pm",
    terms: ["Válido de lunes a jueves de 4pm a 6pm."],
    notification: {
      icon: "🥤",
      bgColor: "from-pink-50 to-rose-50",
      textColor: "text-pink-900",
      discount: "2x1",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Consultar",
      whatsAppMessage: "Hola! Me interesa el Happy Hour 2x1 🥤",
    },
  },
  {
    id: "primera-compra",
    title: "Primera Compra",
    description:
      "¿Es tu primera vez en Natural Bowls? Obtén 15% de descuento en tu primer pedido.",
    image: "/images/promotions/primera-compra.jpg",
    badge: "15% OFF",
    terms: ["Solo clientes nuevos."],
    notification: {
      icon: "🎉",
      bgColor: "from-purple-50 to-violet-50",
      textColor: "text-purple-900",
      discount: "15% OFF",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Ver menú",
      ctaLink: "/menu",
    },
  },
];

export const GENERAL_TERMS = [
  "Las promociones no son acumulables entre sí.",
  "Válido solo en compras presenciales en tienda.",
  "Los descuentos no aplican para delivery.",
  "Promociones sujetas a disponibilidad.",
  "Natural Bowls se reserva el derecho de modificar o cancelar promociones sin previo aviso.",
];
