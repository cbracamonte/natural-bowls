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

    // Previously we showed the last custom bowl using `bowlOrder` separately, but
    // that caused confusion when the user added multiple bowls (only the last
    // one appeared). Instead we now render **all** cart items and include their
    // description (which already contains the full specification for custom
    // bowls). The `bowlOrder` value is kept only as a fallback when there are no
    // cart items (which shouldn't normally happen).

    const itemsText = cartItems.length > 0
      ? cartItems
          .map((item, index) => {
            const lineTotal = item.price * item.quantity;
            let details = '';
            const cust = (item as any).customizations;
            if (cust) {
              // format block of custom fields
              const lines: string[] = [];
              if (cust.tamaño) lines.push(`Tamaño: ${cust.tamaño}`);
              if (cust.base) lines.push(`Base: ${cust.base}`);
              if (cust.proteina) lines.push(`Proteína: ${cust.proteina}`);
              if (cust.toppings && cust.toppings.length)
                lines.push(`Toppings: ${cust.toppings.join(', ')}`);
              if (cust.agregados && cust.agregados.length)
                lines.push(`Agregados: ${cust.agregados.join(', ')}`);
              if (cust.salsas && cust.salsas.length)
                lines.push(`Salsas: ${cust.salsas.join(', ')}`);
              if (lines.length) {
                details = '\n' + lines.map(l => `   ${l}`).join('\n');
              }
            } else if (item.description) {
              details = `\n   (${item.description})`;
            }
            return (
              `${index + 1}. ${item.name} x${item.quantity}\n` +
              `   ${formatPrice(item.price)} c/u - ${formatPrice(lineTotal)}` +
              details
            );
          })
          .join('\n')
      : '';

    // if there are no cart items but we still have a bowlOrder, fall back to
    // showing it so older flows continue to work. otherwise the above
    // `itemsText` already covers every product.
    const bowlText = !cartItems.length && bowlOrder
      ? `🍽️ *BOWL PERSONALIZADO*\n${bowlOrder.message}\n`
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
