export function formatPrice(price: number): string {
  return `S/ ${price.toFixed(2)}`;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `NB-${timestamp}${random}`.toUpperCase();
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
