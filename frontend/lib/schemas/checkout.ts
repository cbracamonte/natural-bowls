export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: 'card' | 'cash' | 'yape';
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export interface BowlOrder {
  type: 'pokebowl' | 'smoothiebowl';
  tamaño?: string;
  base?: string;
  proteina?: string;
  toppings?: string[];
  agregados?: string[];
  salsas?: string[];
  nutrition?: {
    kcal: number;
    proteina: number;
    carbos: number;
    fibra: number;
  };
  message?: string;
}

export interface DiscountValidationResult {
  isValid: boolean;
  error?: string;
}

export interface WhatsAppOrderPayload {
  formData: CheckoutFormData;
  // after recent refactor we no longer depend on a single bowlOrder object
  // in most cases; the payload is built using the cart items. keep the
  // property optional for backwards compatibility with older callers.
  bowlOrder?: BowlOrder | null;
  cartItems: Array<{
    name: string;
    price: number;
    quantity: number;
    description?: string;
    customizations?: Record<string, any>;
  }>;
  total: number;
  discountValidated: boolean;
  discountCode: string;
  discountAmount: number;
  finalTotal: number;
}
