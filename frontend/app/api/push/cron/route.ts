// app/api/push/cron/route.ts
// Endpoint invocado por el cron de Vercel para enviar notificaciones push.
//
// Horario (vercel.json):
//   "30 16 * * 1-6"  →  11:30 AM hora Perú (UTC-5), lunes a sábado
//   "0 23 * * 1-6"   →  06:00 PM hora Perú (UTC-5), lunes a sábado
//
// Estándar recomendado para food & retail:
//   • 2 envíos/día máximo en horario de comida (almuerzo y cena)
//   • No enviar domingos (día de descanso / menor engagement)
//   • Rotar entre las promociones activas para evitar repetición

import { NextRequest, NextResponse } from "next/server";
import { getAllSubscriptions, webpush } from "@/lib/push/subscription-store";
import { removeSubscription } from "@/lib/push/subscription-store";
import { getActivePromotions } from "@/data/promotions-notifications";

export async function GET(req: NextRequest) {
  // Proteger el endpoint con una clave secreta
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const promotions = getActivePromotions();
  if (promotions.length === 0) {
    return NextResponse.json({ sent: 0, reason: "No hay promociones activas" });
  }

  const subscriptions = getAllSubscriptions();
  if (subscriptions.length === 0) {
    return NextResponse.json({ sent: 0, reason: "No hay suscriptores" });
  }

  // Rotar la promoción según la hora del día
  // Almuerzo (11:30) → índice par | Cena (18:00) → índice impar
  const hour = new Date().getUTCHours();
  const isLunch = hour >= 16 && hour < 20; // 11:30-15:00 UTC-5 = 16:30-20:00 UTC
  const promoIndex = isLunch
    ? 0
    : Math.min(1, promotions.length - 1);
  const promo = promotions[promoIndex % promotions.length];

  const payload = JSON.stringify({
    title: `🍃 Natural Bowls — ${promo.title}`,
    body: promo.description,
    icon: "/icons/nb-isotipo.svg",
    badge: "/icons/nb-isotipo.svg",
    url: promo.link ?? "/menu",
    tag: `nb-promo-${promo.id}`, // evita notificaciones duplicadas
    renotify: false,
  });

  let sent = 0;
  let failed = 0;

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(sub, payload);
        sent++;
      } catch (err: unknown) {
        failed++;
        // Remover suscripciones inválidas (410 = Gone, 404 = Not Found)
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 410 || status === 404) {
          removeSubscription(sub.endpoint);
        }
      }
    }),
  );

  return NextResponse.json({ sent, failed, promo: promo.id });
}
