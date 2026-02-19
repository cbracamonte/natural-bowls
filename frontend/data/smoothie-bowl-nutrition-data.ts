import { SmoothieBowlNutritionDataset } from "@/lib/schemas/smoothie-bowl-nutrition";

export const SMOOTHIE_BOWL_NUTRITION_DATA: SmoothieBowlNutritionDataset = {
  smoothies: {
    Chocopower: { kcal: 380, proteina: 18, carbos: 45, fibra: 8 },
    "Mango Bowl": { kcal: 340, proteina: 10, carbos: 60, fibra: 6 },
    "Berry Bowl": { kcal: 320, proteina: 12, carbos: 52, fibra: 9 },
    "Green Bowl": { kcal: 300, proteina: 12, carbos: 48, fibra: 7 },
    "Açaí Original": { kcal: 420, proteina: 13, carbos: 55, fibra: 11 },
    "Açaí Tropical": { kcal: 430, proteina: 12, carbos: 58, fibra: 9 },
    "La Dragona": { kcal: 350, proteina: 11, carbos: 50, fibra: 7 },
    "Butterfly Bowl": { kcal: 360, proteina: 12, carbos: 52, fibra: 8 },
    "Blue Sky": { kcal: 390, proteina: 20, carbos: 45, fibra: 9 },
  },
  toppings: {
    Fresa: { kcal: 16, proteina: 0.3, carbos: 3.8, fibra: 1 },
    Plátano: { kcal: 45, proteina: 0.5, carbos: 11.5, fibra: 1.3 },
    Arándanos: { kcal: 29, proteina: 0.4, carbos: 7.3, fibra: 1.2 },
    Kiwi: { kcal: 30, proteina: 0.5, carbos: 7.3, fibra: 1.5 },
    Aguaymanto: { kcal: 27, proteina: 0.7, carbos: 6, fibra: 2 },

    "Coco rallado": { kcal: 66, proteina: 0.7, carbos: 2.4, fibra: 1.6 },
    "Kiwicha pop": { kcal: 37, proteina: 1.3, carbos: 7, fibra: 0.8 },
    Chía: { kcal: 49, proteina: 1.7, carbos: 4.1, fibra: 3.4 },

    Piña: { kcal: 25, proteina: 0.3, carbos: 6.5, fibra: 0.7 },
    Mango: { kcal: 30, proteina: 0.4, carbos: 7.5, fibra: 1 },

    Granola: { kcal: 70, proteina: 2.1, carbos: 10.5, fibra: 1.5 },

    "Mantequilla de maní (+2)": {
      kcal: 94,
      proteina: 4,
      carbos: 3,
      fibra: 1,
    },

    "Nibs de cacao (+2)": {
      kcal: 60,
      proteina: 1.2,
      carbos: 5,
      fibra: 3,
    },
  },
};

export const SMOOTHIE_BOWL_TOPPINGS = [
  "Fresa",
  "Plátano",
  "Arándanos",
  "Kiwi",
  "Aguaymanto",
  "Coco rallado",
  "Kiwicha pop",
  "Chía",
  "Piña",
  "Mango",
  "Granola",
  "Mantequilla de maní (+2)",
  "Nibs de cacao (+2)",
];
