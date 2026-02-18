// lib/push/subscription-store.ts
// Almacén de suscripciones Push en memoria.
//
// ⚠️  PRODUCCIÓN: reemplazar con una DB persistente (Vercel KV, PostgreSQL, etc.)
//     ya que las funciones serverless no mantienen estado entre invocaciones.
//     Ejemplo con Vercel KV:
//       import { kv } from "@vercel/kv";
//       await kv.sadd("push-subscriptions", JSON.stringify(sub));
//
// Para un backend NestJS propio, crear un endpoint POST /push/subscribe
// y llamarlo aquí en lugar de usar el Map.

import webpush, { PushSubscription } from "web-push";

// Configurar VAPID una sola vez al importar el módulo
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

// En memoria — reemplazar con DB en producción
const subscriptions = new Map<string, PushSubscription>();

/** Clave única para deduplicar suscripciones por endpoint */
function subKey(sub: PushSubscription): string {
  return sub.endpoint;
}

export function saveSubscription(sub: PushSubscription): void {
  subscriptions.set(subKey(sub), sub);
}

export function removeSubscription(endpoint: string): void {
  subscriptions.delete(endpoint);
}

export function getAllSubscriptions(): PushSubscription[] {
  return Array.from(subscriptions.values());
}

export { webpush };
