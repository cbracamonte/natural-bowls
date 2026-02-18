import { formatPrice } from '@/lib/utils/utils';
import { SITE_CONFIG, DISCOUNTS_CODES } from '@/lib/seo/constants';
import {
  BowlOrder,
  CheckoutFormData,
  DiscountValidationResult,
  WhatsAppOrderPayload,
} from '@/lib/schemas';
import { DiscountCodeService } from './discount-code';

export class CheckoutService {
  static getBowlOrderFromStorage(): BowlOrder | null {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('bowlOrder');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }

  static getPhoneFromStorage(): string {
    return DiscountCodeService.getPhoneFromStorage();
  }

  static validateDiscountCode(
    inputCode: string,
    phone: string,
  ): Promise<DiscountValidationResult> {
    return DiscountCodeService.validateCode(inputCode, phone);
  }

  static validateForm(formData: CheckoutFormData): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    } else if (!/^\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Teléfono inválido (9 dígitos)';
    }
    if (!formData.address.trim()) errors.address = 'La dirección es requerida';
    if (!formData.city.trim()) errors.city = 'La ciudad es requerida';

    return errors;
  }

  static calculateDiscount(total: number, discountValidated: boolean) {
    const percentage = discountValidated ? DISCOUNTS_CODES.FIRSTORDER.percentage : 0;
    const amount = total * percentage;
    return { discountPercentage: percentage, discountAmount: amount, finalTotal: total - amount };
  }

  static buildWhatsAppMessage(payload: WhatsAppOrderPayload): string {
    const { formData, bowlOrder, cartItems, total, discountValidated, discountCode, discountAmount, finalTotal } = payload;

    const bowlText = bowlOrder ? `🍽️ *BOWL PERSONALIZADO*\n${bowlOrder.message}\n` : '';

    const itemsText = cartItems.length > 0
      ? cartItems
          .map((item, index) => {
            const lineTotal = item.price * item.quantity;
            return (
              `${index + 1}. ${item.name} x${item.quantity}\n` +
              `   ${formatPrice(item.price)} c/u - ${formatPrice(lineTotal)}`
            );
          })
          .join('\n')
      : '';

    const notesText = formData.notes.trim()
      ? `\n📝 Notas: ${formData.notes.trim()}`
      : '';

    const discountText = discountValidated
      ? `\n💰 Código validado: ${discountCode}\n📊 Descuento ${DISCOUNTS_CODES.FIRSTORDER.percentage * 100}%: -${formatPrice(discountAmount)}`
      : '';

    return [
      'Nuevo pedido - Natural Bowls',
      `Nombre: ${formData.name}`,
      `Telefono: ${formData.phone}`,
      `Direccion: ${formData.address}, ${formData.city}`,
      '',
      bowlText,
      cartItems.length > 0 ? 'Productos:' : '',
      itemsText,
      '',
      `Subtotal: ${formatPrice(total)}`,
      discountText,
      `Total productos: ${formatPrice(finalTotal)}`,
      `Delivery: A confirmar`,
      '',
      notesText,
    ]
      .filter(Boolean)
      .join('\n');
  }

  static buildWhatsAppUrl(message: string): string {
    const whatsappNumber = SITE_CONFIG.phone.replace(/\D/g, '');
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  static markDiscountAsUsed(): Promise<void> {
    return DiscountCodeService.markAsUsed();
  }

  static clearOrderStorage(): void {
    DiscountCodeService.clearOrderStorage();
  }
}
