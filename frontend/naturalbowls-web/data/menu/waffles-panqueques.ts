import { Product } from "@/lib/schemas";

export const wafflesPanqueques: Product[] = [
  {
    id: "waffle-tradicional",
    name: "Waffle Tradicional",
    description: "Waffle de vainilla o cacao con frutas y miel o maple.",
    price: 17.5,
    image: "/images/waffles-panqueques/waffle-tradicional.jpg",
    categoryId: "waffles-panqueques",
    ingredients: ["Harina", "Frutas", "Miel o Maple"],
  },
  {
    id: "waffle-fit",
    name: "Waffle Fit",
    description: "Waffle de avena con frutas y miel.",
    price: 18.0,
    image: "/images/waffles-panqueques/waffle-fit.jpg",
    categoryId: "waffles-panqueques",
    ingredients: ["Harina de avena", "Frutas", "Miel"],
    featured: true,
  },
  {
    id: "panqueques-casa",
    name: "Panqueques de la Casa",
    description:
      "Panqueques con frutas, queso crema, mermelada y miel o maple.",
    price: 20.0,
    image: "/images/waffles-panqueques/panqueques-casa.jpg",
    categoryId: "waffles-panqueques",
    ingredients: ["Harina", "Frutas", "Queso crema", "Mermelada", "Miel"],
  },
  {
    id: "panqueques-avena",
    name: "Panqueques de Avena",
    description: "Panqueques de avena con frutas y miel.",
    price: 18.0,
    image: "/images/waffles-panqueques/panqueques-avena.jpg",
    categoryId: "waffles-panqueques",
    ingredients: ["Avena", "Frutas", "Miel"],
  },
];
