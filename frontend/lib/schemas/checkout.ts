export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: 'card' | 'cash' | 'yape';
}
