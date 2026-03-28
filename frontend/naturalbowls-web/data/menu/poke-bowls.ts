import { Product } from "@/lib/schemas";

export const pokeBowls: Product[] = [
  {
    id: "poke-regular",
    name: "Poke Regular",
    description:
      "Arma tu poke: elige base, proteína, 5 toppings, 4 agregados y 2 salsas.",
    price: 22.0,
    image: "/images/poke-bowl/poke-regular.jpg",
    categoryId: "poke-bowl",
    ingredients: [
      "Base a elección",
      "Proteína a elección",
      "5 Toppings",
      "4 Agregados",
      "2 Salsas",
    ],
    featured: true,
  },
  {
    id: "poke-grande",
    name: "Poke Grande",
    description:
      "Arma tu poke tamaño grande: elige base, proteína, 5 toppings, 4 agregados y 3 salsas.",
    price: 27.0,
    image: "/images/poke-bowl/poke-grande.jpg",
    categoryId: "poke-bowl",
    ingredients: [
      "Base a elección",
      "Proteína a elección",
      "5 Toppings",
      "4 Agregados",
      "3 Salsas",
    ],
  },
];