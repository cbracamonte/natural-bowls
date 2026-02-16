import { CartItem } from "./cart";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    email?: string;
    phone: string;
  };
  delivery: {
    address: string;
    city: string;
    postalCode?: string;
    notes?: string;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_way' | 'delivered' | 'canceled';
  createdAt: string;
  updatedAt: string;
}

