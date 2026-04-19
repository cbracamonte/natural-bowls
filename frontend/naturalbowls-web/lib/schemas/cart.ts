export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description?: string; // used for human-readable details
  ingredients?: string[]; // e.g. toppings/extra proteins for bowls
  price: number;
  quantity: number;
  image?: string;
  customizations?: BowlCustomizations;
}

export interface BowlCustomizations {
  tipo?: string;
  tamaño?: string;
  base?: string;
  proteina?: string;
  toppings?: string[];
  agregados?: string[];
  salsas?: string[];
  extraProteinas?: string[];
}

export const BOWL_ARRAY_KEYS = ["toppings", "agregados", "salsas", "extraProteinas"] as const;
export type BowlArrayKey = (typeof BOWL_ARRAY_KEYS)[number];

export interface CartState {
  items: CartItem[];
  total: number;
}