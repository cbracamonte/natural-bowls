export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customizations?: Record<string, string | number>;
}

export interface CartState {
  items: CartItem[];
  total: number;
}