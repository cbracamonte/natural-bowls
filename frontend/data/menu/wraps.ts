import { Product } from "@/lib/schemas";

export const wraps: Product[] = [
  {
    id: "wrap-tradicional",
    name: "Wrap Tradicional",
    description:
      "Tortilla de maíz, lechuga, tomate, palta, filete de pollo y salsa especial. Incluye camotes crocantes.",
    price: 15.5,
    image: "/images/wraps/wrap-tradicional.jpg",
    categoryId: "wraps",
    ingredients: [
      "Tortilla de maíz",
      "Lechuga",
      "Tomate",
      "Palta",
      "Pollo",
      "Salsa especial",
      "Camotes crocantes",
    ],
  },
  {
    id: "wrap-crispy",
    name: "Wrap Crispy",
    description:
      "Tortilla de maíz, pollo empanizado, lechuga, tomate, zanahoria y queso edam. Incluye camotes crocantes.",
    price: 17.5,
    image: "/images/wraps/wrap-crispy.jpg",
    categoryId: "wraps",
    ingredients: [
      "Tortilla de maíz",
      "Pollo empanizado",
      "Lechuga",
      "Tomate",
      "Zanahoria",
      "Queso edam",
      "Camotes crocantes",
    ],
    featured: true,
  },
  {
    id: "wrap-cesar",
    name: "Wrap César",
    description:
      "Tortilla de maíz, mix de lechugas, filete de pollo, tomate, queso parmesano y salsa césar. Incluye camotes crocantes.",
    price: 16.5,
    image: "/images/wraps/wrap-cesar.jpg",
    categoryId: "wraps",
    ingredients: [
      "Tortilla de maíz",
      "Mix de lechugas",
      "Pollo",
      "Tomate",
      "Queso parmesano",
      "Salsa césar",
      "Camotes crocantes",
    ],
  },
  {
    id: "wrap-thai",
    name: "Wrap Thai",
    description:
      "Tortilla de maíz, pollo empanizado, lechuga, col morada, repollo y salsa thai. Incluye camotes crocantes.",
    price: 17.5,
    image: "/images/wraps/wrap-thai.jpg",
    categoryId: "wraps",
    ingredients: [
      "Tortilla de maíz",
      "Pollo empanizado",
      "Lechuga",
      "Col morada",
      "Repollo",
      "Salsa thai",
      "Camotes crocantes",
    ],
  },
  {
    id: "vegan-wrap",
    name: "Vegan Wrap",
    description:
      "Tortilla de maíz, tofu, zucchini, lechuga, cebolla, palta y salsa de maní. Incluye camotes crocantes.",
    price: 17.0,
    image: "/images/wraps/vegan-wrap.jpg",
    categoryId: "wraps",
    ingredients: [
      "Tortilla de maíz",
      "Tofu",
      "Zucchini",
      "Lechuga",
      "Cebolla",
      "Palta",
      "Salsa de maní",
      "Camotes crocantes",
    ],
  },
];
