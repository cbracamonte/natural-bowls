import { Product } from "@/lib/schemas";

export const tostones: Product[] = [
  {
    id: "la-campestre",
    name: "La Campestre",
    description:
      "2 rodajas de pan campesino, palta, huevos revueltos, jamón y tomatitos confitados.",
    price: 23.0,
    image: "/images/tostones/la-campestre.jpg",
    categoryId: "tostones",
    ingredients: [
      "Pan campesino",
      "Palta",
      "Huevos revueltos",
      "Jamón",
      "Tomates confitados",
    ],
  },
  {
    id: "avo-toast",
    name: "Avo Toast",
    description:
      "Pan de masa madre, palta laminada, huevo escalfado y ajonjolí.",
    price: 15.0,
    image: "/images/tostones/avo-toast.jpg",
    categoryId: "tostones",
    ingredients: ["Pan de masa madre", "Palta", "Huevo escalfado", "Ajonjolí"],
  },
  {
    id: "tostadas-francesas-fit",
    name: "Tostadas Francesas Fit",
    description: "Tostadas integrales con frutas y miel.",
    price: 16.0,
    image: "/images/tostones/tostadas-francesas-fit.jpg",
    categoryId: "tostones",
    ingredients: ["Pan integral", "Frutas", "Miel"],
  },
  {
    id: "toston-dulce",
    name: "Tostón Dulce",
    description: "Tostón con mantequilla de maní, mermelada y frutas.",
    price: 16.0,
    image: "/images/tostones/toston-dulce.jpg",
    categoryId: "tostones",
    ingredients: ["Pan", "Mantequilla de maní", "Mermelada", "Frutas"],
  },
  {
    id: "la-caprese",
    name: "La Caprese",
    description: "Pan masa madre, pesto, mozzarella y tomate confitado.",
    price: 17.5,
    image: "/images/tostones/la-caprese.jpg",
    categoryId: "tostones",
    ingredients: ["Pan masa madre", "Pesto", "Mozzarella", "Tomate confitado"],
  },
];
