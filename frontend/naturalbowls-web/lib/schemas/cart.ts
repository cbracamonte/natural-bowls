export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description?: string; // used for human-readable details
  ingredients?: string[]; // e.g. toppings/extra proteins for bowls
  price: number;
  quantity: number;
  image?: string;
  customizations?: {
    tipo?: string;
    tamaño?: string;
    base?: string;
    proteina?: string;
    toppings?: string[];
    agregados?: string[];
    salsas?: string[];
    [key: string]: any;
  };
}

export interface CartState {
  items: CartItem[];
  total: number;
}