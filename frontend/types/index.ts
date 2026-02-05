export type Category = 'smoothie-bowl' | 'poke' | 'wraps' | 'sandwiches' | 'ensaladas' | 'bebidas' | 'cafe' | 'desayunos';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  ingredients: string[];
  calories?: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: 'card' | 'cash' | 'yape';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CheckoutForm;
  createdAt: Date;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount?: string;
  terms: string;
}
