import {
  PROMOTIONS,
  LOYALTY_PROGRAM,
  type Promotion,
  type LoyaltyProgram,
  type PromotionNotificationConfig,
} from "@/data/promotions";

export interface NotificationPromotion {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  discount?: string;
  expiryDate: string;
  active: boolean;
  ctaText: string;
  ctaLink?: string;
  whatsAppMessage?: string;
}

function toNotification(
  source: Promotion | LoyaltyProgram,
  config: PromotionNotificationConfig
): NotificationPromotion {
  return {
    id: source.id,
    title: source.title,
    description: source.description,
    icon: config.icon,
    bgColor: config.bgColor,
    textColor: config.textColor,
    discount: config.discount,
    expiryDate: config.expiryDate,
    active: config.active,
    ctaText: config.ctaText,
    ctaLink: config.ctaLink,
    whatsAppMessage: config.whatsAppMessage,
  };
}

/** Todas las notificaciones derivadas de promotions.ts */
export const promotionsNotifications: NotificationPromotion[] = [
  // Loyalty program
  ...(LOYALTY_PROGRAM.notification
    ? [toNotification(LOYALTY_PROGRAM, LOYALTY_PROGRAM.notification)]
    : []),
  // Promotions con notification config
  ...PROMOTIONS.filter((p) => p.notification).map((p) =>
    toNotification(p, p.notification!)
  ),
];

/** Filtra solo las promociones activas y no expiradas */
export function getActivePromotions(): NotificationPromotion[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return promotionsNotifications.filter((promo) => {
    const expiryDate = new Date(promo.expiryDate);
    expiryDate.setHours(0, 0, 0, 0);
    return promo.active && expiryDate >= today;
  });
}
