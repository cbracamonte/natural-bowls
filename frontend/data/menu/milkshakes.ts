import { Product } from "@/lib/schemas";

export const milkshakes: Product[] = [
  {
    id: "milkshake-platano",
    name: "Milkshake de Plátano",
    description: "Leche, plátano congelado y crema batida.",
    price: 16.0,
    image: "/images/milkshakes/milkshake-platano.jpg",
    categoryId: "milkshakes",
    ingredients: ["Leche", "Plátano", "Crema batida"],
  },
  {
    id: "milkshake-berries",
    name: "Milkshake de Berries",
    description: "Leche, berries congelados y crema batida.",
    price: 16.0,
    image: "/images/milkshakes/milkshake-berries.jpg",
    categoryId: "milkshakes",
    ingredients: ["Leche", "Berries", "Crema batida"],
  },
  {
    id: "milkshake-fresa",
    name: "Milkshake de Fresa",
    description: "Leche, fresa congelada y crema batida.",
    price: 16.0,
    image: "/images/milkshakes/milkshake-fresa.jpg",
    categoryId: "milkshakes",
    ingredients: ["Leche", "Fresa", "Crema batida"],
  },
];
