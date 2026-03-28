import { Product } from "@/lib/schemas";

export const sandwiches: Product[] = [
  {
    id: "sandwich-pollopalta",
    name: "Sándwich Pollo Palta",
    description:
      "Pan ciabatta, pollo deshilachado, mayonesa, palta y ensalada.",
    price: 14.0,
    image: "/images/sandwiches/sandwich-pollopalta.jpg",
    categoryId: "sandwiches",
    ingredients: [
      "Pan ciabatta",
      "Pollo deshilachado",
      "Mayonesa",
      "Palta",
      "Ensalada",
    ],
  },
  {
    id: "sandwich-teriyaki",
    name: "Sándwich Teriyaki",
    description:
      "Pan ciabatta, pollo deshilachado, salsa teriyaki, palta y lechuga.",
    price: 15.0,
    image: "/images/sandwiches/sandwich-teriyaki.jpg",
    categoryId: "sandwiches",
    ingredients: [
      "Pan ciabatta",
      "Pollo deshilachado",
      "Salsa teriyaki",
      "Palta",
      "Lechuga",
    ],
  },
  {
    id: "club-sandwich-fit",
    name: "Club Sándwich Fit",
    description:
      "Pan integral, jamón de pavita, queso edam, ensalada, palta y filete de pollo. Incluye camotes crocantes.",
    price: 27.0,
    image: "/images/sandwiches/club-sandwich-fit.jpg",
    categoryId: "sandwiches",
    ingredients: [
      "Pan integral",
      "Jamón de pavita",
      "Queso edam",
      "Ensalada",
      "Palta",
      "Pollo",
      "Camotes crocantes",
    ],
  },
];
