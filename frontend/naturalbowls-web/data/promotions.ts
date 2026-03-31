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

export interface PromotionCTA {
  text: string;
  href?: string; // Ruta interna — si no se define, se usa WhatsApp
  whatsAppMessage?: string; // Mensaje de WhatsApp — solo si no hay href
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
  cta: PromotionCTA;
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
      "Optimiza tu alimentación sin complicarte. Elige tu plan mensual o quincenal y asegura tus pokes favoritos con ahorro garantizado en cada pedido.",
    image: "/images/promotions/poke-bowl-promotion.jpg",
    detailImage: "/images/promotions/plan-pokes.jpg",
    highlighted: true,
    badge: "Ahorra más",
    cta: {
      text: "Quiero mi plan",
      whatsAppMessage: "Hola! Quiero activar mi Plan Pokes 🍣",
    },
    terms: [
      "No incluye delivery.",
      "Válido hasta 45 días desde la compra.",
      "Disponible en modalidad mensual o quincenal."
    ],
    notification: {
      icon: "🍣",
      bgColor: "from-emerald-50 to-teal-50",
      textColor: "text-emerald-900",
      discount: "Ahorro inteligente",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Quiero mi plan",
      whatsAppMessage: "Hola! Quiero activar mi Plan Pokes 🍣",
    },
  },
  {
    id: "primera-compra",
    title: "Bienvenido: 15% OFF en tu Primera Orden",
    description:
      "Tu primera experiencia merece ser perfecta. Obtén 15% de descuento y descubre una nueva forma de comer saludable, personalizada y deliciosa.",
    image: "/images/promotions/primera-compra.jpg",
    badge: "15% OFF",
    cta: {
      text: "Explorar menú",
      href: "/menu",
    },
    terms: [
      "Válido solo para nuevos clientes.",
      "Aplica en el primer pedido."
    ],
    notification: {
      icon: "🎉",
      bgColor: "from-purple-50 to-violet-50",
      textColor: "text-purple-900",
      discount: "15% OFF",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Explorar menú",
      ctaLink: "/menu",
    },
  },
  {
    id: "combo-universitario",
    title: "Combo Universitario",
    description:
      "Almuerza rápido, balanceado y a mejor precio. Elige entre wrap o ensalada + bebida, diseñado para mantener tu energía durante el día.",
    image: "/images/promotions/combo-universitario.jpg",
    schedule: "Lun - Vie, 12pm - 3pm",
    badge: "Precio especial",
    cta: {
      text: "Pedir combo",
      whatsAppMessage: "Hola! Quiero el Combo Universitario 🎓",
    },
    terms: [
      "Sujeto a disponibilidad."
    ],
    notification: {
      icon: "🎓",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-900",
      discount: "Combo especial",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Pedir combo",
      whatsAppMessage: "Hola! Quiero el Combo Universitario 🎓",
    },
  },
  {
    id: "20-discount-smoothie-bowls",
    title: "Activa tu 20% OFF en Smoothie Bowls",
    description:
      "Empieza tu día con energía. Personaliza tu smoothie bowl y disfruta 20% de descuento mientras controlas tus macros en tiempo real.",
    image: "/images/promotions/20-discount-smoothie.jpg",
    badge: "20% OFF",
    schedule: "Lun - Vie, 9:00am - 3:00pm",
    cta: {
      text: "Pedir ahora",
      whatsAppMessage: "Hola! Quiero aprovechar el 20% OFF en smoothie bowls 🥣",
    },
    terms: [
      "Aplica para todos los smoothie bowls.",
      "No acumulable con otras promociones."
    ],
    notification: {
      icon: "🥣",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-900",
      discount: "20% OFF",
      expiryDate: "2026-12-31",
      active: true,
      ctaText: "Pedir ahora",
      whatsAppMessage:
        "Hola! Quiero aprovechar el 20% OFF en smoothie bowls 🥣",
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
