import { Product } from "@/lib/schemas";
import {
  cafe,
  desayunos,
  ensaladas,
  infusiones,
  jugos,
  milkshakes,
  parfaitsPuddings,
  pokeBowls,
  postres,
  sandwiches,
  smoothieBowls,
  tostones,
  wafflesPanqueques,
  wraps,
} from "./menu";

export const PRODUCTS: Product[] = [
  ...smoothieBowls,
  ...pokeBowls,
  ...jugos,
  ...sandwiches,
  ...wraps,
  ...ensaladas,
  ...cafe,
  ...desayunos,
  ...infusiones,
  ...milkshakes,
  ...wafflesPanqueques,
  ...tostones,
  ...postres,
  ...parfaitsPuddings,
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return PRODUCTS.filter((p) => p.featured);
};
