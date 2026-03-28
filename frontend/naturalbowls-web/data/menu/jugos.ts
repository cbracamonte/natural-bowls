import { Product } from "@/lib/schemas";

export const jugos: Product[] = [
  {
    id: "jugo-surtido",
    name: "Jugo Surtido",
    description: "Papaya, manzana, piña y fresa. Vitaminas naturales.",
    price: 10.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Papaya", "Manzana", "Piña", "Fresa"],
  },
  {
    id: "jugo-natural",
    name: "Jugo Natural",
    description: "Zumo de naranja recién exprimida.",
    price: 9.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Naranja"],
  },
  {
    id: "jugo-sunshine",
    name: "Sunshine",
    description: "Naranja y maracuyá.",
    price: 10.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Naranja", "Maracuyá"],
  },
  {
    id: "jugo-maracumango",
    name: "Maracumango",
    description: "Maracuyá y mango.",
    price: 12.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Maracuyá", "Mango"],
  },
  {
    id: "jugo-cocomix",
    name: "Cocomix",
    description: "Leche de coco, fresa y plátano.",
    price: 13.5,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Leche de coco", "Fresa", "Plátano"],
  },
  {
    id: "berrydelicious",
    name: "Berry Delicious",
    description: "Berries, fresa, plátano y yogurt.",
    price: 13.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Berries", "Fresa", "Plátano", "Yogurt"],
  },
  {
    id: "jugo-sunset",
    name: "Sunset",
    description: "Piña, fresa y maracuyá.",
    price: 10.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Piña", "Fresa", "Maracuyá"],
  },
  {
    id: "jugo-primavera",
    name: "Primavera",
    description: "Piña, mango, naranja y limón.",
    price: 11.0,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Piña", "Mango", "Naranja", "Limón"],
  },
  {
    id: "jugo-tropical",
    name: "Tropical",
    description: "Piña, mango, naranja y limón. Sabor tropical.",
    price: 11.5,
    image: "/icons/nb-logotipo.svg", // falta imagen
    categoryId: "jugos",
    ingredients: ["Piña", "Mango", "Naranja", "Limón"],
  },
  {
    id: "jugo-detox",
    name: "Detox",
    description: "Apio, pepino y piña. Depurativo natural.",
    price: 9.5,
    image: "/images/jugos/jugo-detox-jungla.jpg",
    categoryId: "jugos",
    ingredients: ["Apio", "Pepino", "Piña"],
  },
  {
    id: "jugo-jungla",
    name: "Jungla",
    description: "Piña, pepinillo, espinaca y naranja. Green power.",
    price: 10.0,
    image: "/images/jugos/jugo-detox-jungla.jpg",
    categoryId: "jugos",
    ingredients: ["Piña", "Pepinillo", "Espinaca", "Naranja"],
  },
];
