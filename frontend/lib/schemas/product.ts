import { CategoryType } from "./category";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: CategoryType;
  ingredients: string[];
  calories?: number;
  featured?: boolean;
}
