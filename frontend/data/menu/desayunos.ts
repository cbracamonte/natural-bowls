import { Product } from "@/lib/schemas";

export const desayunos: Product[] = [
  {
    id: "bowl-frutas",
    name: "Bowl de Frutas",
    description: "Frutas de estación, granola, miel y yogurt natural.",
    price: 15.0,
    image: "/images/desayunos/bowl-frutas.jpg",
    categoryId: "desayunos",
    ingredients: ["Frutas de estación", "Granola", "Miel", "Yogurt"],
    calories: 542,
  },
  {
    id: "porridge-avena",
    name: "Porridge de Avena",
    description: "Avena precocida, plátano brulé, frutos rojos y coco.",
    price: 18.0,
    image: "/images/desayunos/porridge-avena.jpg",
    categoryId: "desayunos",
    ingredients: ["Avena", "Plátano brulé", "Frutos rojos", "Coco"],
    calories: 496,
  },
  {
    id: "bowl-griego",
    name: "Bowl Griego",
    description: "Yogurt griego, frutos rojos, granola y miel.",
    price: 19.0,
    image: "/images/desayunos/bowl-griego.jpg",
    categoryId: "desayunos",
    ingredients: ["Yogurt griego", "Frutos rojos", "Granola", "Miel"],
    calories: 583,
  },
];
