// app/api/push/unsubscribe/route.ts
// Elimina la suscripción push del usuario

import { NextRequest, NextResponse } from "next/server";
import { removeSubscription } from "@/lib/push/subscription-store";

export async function POST(req: NextRequest) {
  try {
    const { endpoint } = (await req.json()) as { endpoint: string };

    if (!endpoint) {
      return NextResponse.json({ error: "endpoint requerido" }, { status: 400 });
    }

    removeSubscription(endpoint);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
