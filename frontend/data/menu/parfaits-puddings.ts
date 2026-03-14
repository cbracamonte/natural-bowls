import { Product } from "@/lib/schemas";

export const parfaitsPuddings: Product[] = [
  {
    id: "parfaits-tropical",
    name: "Parfaits Tropical",
    description: "Doble capa de yogurt griego, frutas a elección, granola y miel de abeja",
    price: 16.0,
    image: "/images/parfaits-puddings/parfaits-tropical.jpg",
    categoryId: "parfaits-puddings",
    ingredients: ["Frutas", "Granola", "Miel", "Yogurt"],
  },
  {
    id: "chia-pudding",
    name: "Chia Pudding",
    description: "Chia pudding, frutas a elección, granola, miel de abeja y yogurt griego",
    price: 16.5,
    image: "/images/parfaits-puddings/chia-pudding.jpg",
    categoryId: "parfaits-puddings",
    ingredients: ["Chía", "Frutas", "Miel", "Yogurt griego"],
  },
];