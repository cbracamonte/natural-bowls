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
  bowlOrder: BowlOrder | null;
  cartItems: { name: string; price: number; quantity: number }[];
  total: number;
  discountValidated: boolean;
  discountCode: string;
  discountAmount: number;
  finalTotal: number;
}
