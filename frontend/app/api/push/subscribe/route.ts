// app/api/push/subscribe/route.ts
// Guarda la suscripción push del usuario

import { NextRequest, NextResponse } from "next/server";
import { saveSubscription } from "@/lib/push/subscription-store";
import { PushSubscription } from "web-push";

export async function POST(req: NextRequest) {
  try {
    const sub = (await req.json()) as PushSubscription;

    if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
      return NextResponse.json(
        { error: "Suscripción inválida" },
        { status: 400 },
      );
    }

    saveSubscription(sub);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
