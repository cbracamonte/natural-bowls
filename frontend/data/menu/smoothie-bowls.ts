import { Product } from "@/lib/schemas";

export const smoothieBowls: Product[] = [
  {
    id: "chocopower",
    name: "Chocopower",
    description:
      "Base de plátano, mantequilla de maní, leche de almendras y cacao.",
    price: 21.0,
    image: "/images/smoothie-bowl/chocopower.jpg",
    categoryId: "smoothie-bowl",
    ingredients: [
      "Plátano",
      "Mantequilla de maní",
      "Leche de almendras",
      "Cacao",
    ],
  },
  {
    id: "mangobowl",
    name: "Mango Bowl",
    description: "Base de plátano, mango y yogurt natural. Fresco y tropical.",
    price: 23.0,
    image: "/images/smoothie-bowl/mangobowl.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Mango", "Yogurt natural"],
    featured: true,
  },
  {
    id: "berrybowl",
    name: "Berry Bowl",
    description: "Base de plátano, fresa, arándano y leche de almendras.",
    price: 23.0,
    image: "/images/smoothie-bowl/berrybowl.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Fresa", "Arándano", "Leche de almendras"],
  },
  {
    id: "greenbowl",
    name: "Green Bowl",
    description:
      "Base de plátano, mango, espinaca y maracuyá. Energía natural.",
    price: 22.0,
    image: "/images/smoothie-bowl/greenbowl.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Mango", "Espinaca", "Maracuyá"],
  },
  {
    id: "acai-original",
    name: "Açaí Original",
    description:
      "Base de plátano, fresa, arándano y açaí. El clásico brasileño.",
    price: 25.0,
    image: "/images/smoothie-bowl/acai-original.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Fresa", "Arándano", "Açaí"],
  },
  {
    id: "acai-tropical",
    name: "Açaí Tropical",
    description: "Base de plátano, fresa, piña y açaí. Explosión tropical.",
    price: 25.0,
    image: "/images/smoothie-bowl/acai-tropical.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Fresa", "Piña", "Açaí"],
  },
  {
    id: "la-dragona",
    name: "La Dragona",
    description:
      "Base de pitahaya roja, plátano, fresa y piña. Color vibrante.",
    price: 24.0,
    image: "/images/smoothie-bowl/la-dragona.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Pitahaya roja", "Plátano", "Fresa", "Piña"],
  },
  {
    id: "butterfly-bowl",
    name: "Butterfly Bowl",
    description:
      "Base de plátano, fresa, arándanos y polvo de butterfly. Mágico color azul.",
    price: 24.0,
    image: "/images/smoothie-bowl/butterfly-bowl.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Fresa", "Arándanos", "Polvo de butterfly"],
  },
  {
    id: "blue-sky",
    name: "Blue Sky",
    description:
      "Base de plátano, piña, maracuyá y espirulina azul. Superalimento.",
    price: 27.0,
    image: "/images/smoothie-bowl/blue-sky.jpg",
    categoryId: "smoothie-bowl",
    ingredients: ["Plátano", "Piña", "Maracuyá", "Espirulina azul"],
  },
];
