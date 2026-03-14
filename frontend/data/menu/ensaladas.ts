import { Product } from "@/lib/schemas";

export const ensaladas: Product[] = [
  {
    id: "ensalada-cesar",
    name: "Ensalada César",
    description:
      "Mix de lechugas, crutones, pollo en trocitos, tomate cherry, frutos secos, queso parmesano y salsa césar.",
    price: 24.0,
    image: "/images/ensaladas/ensalada-cesar.jpg",
    categoryId: "ensaladas",
    ingredients: [
      "Mix de lechugas",
      "Crutones",
      "Pollo",
      "Tomate cherry",
      "Frutos secos",
      "Queso parmesano",
      "Salsa césar",
    ],
    calories: 754.8,
  },
  {
    id: "ensalada-thai",
    name: "Ensalada Thai",
    description:
      "Repollo, col morada, zanahoria, espinaca, culantro, mango grill, pollo al panko y salsa thai.",
    price: 25.0,
    image: "/images/ensaladas/ensalada-thai.jpg",
    categoryId: "ensaladas",
    ingredients: [
      "Repollo",
      "Col morada",
      "Zanahoria",
      "Espinaca",
      "Culantro",
      "Mango grill",
      "Pollo al panko",
      "Salsa thai",
    ],
    calories: 570,
  },
  {
    id: "ensalada-fitness",
    name: "Ensalada Fitness",
    description:
      "Mix verdes, palta, tomate cherry, papas cocktail, huevo de codorniz, zanahoria, pollo y vinagreta.",
    price: 26.5,
    image: "/images/ensaladas/ensalada-fitness.jpg",
    categoryId: "ensaladas",
    ingredients: [
      "Mix verdes",
      "Palta",
      "Tomate cherry",
      "Papas cocktail",
      "Huevo de codorniz",
      "Zanahoria",
      "Pollo",
      "Vinagreta",
    ],
    calories: 638.3,
  },
];
