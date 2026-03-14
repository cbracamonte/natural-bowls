import { PokeBowlBuilderProps, PokeBowlNutritionDataset } from "@/lib/schemas";

export const POKEBOWL_POKE_BOWL_NUTRITION_DATA: PokeBowlNutritionDataset = {
  bases: {
    "Arroz blanco": {
      id: "arroz-blanco",
      label: "Arroz blanco",
      density: { kcal: 130, proteina: 2.7, carbos: 28.2, fibra: 0.4 },
      porciones: { regular: 150, grande: 200 },
    },
    "Arroz integral": {
      id: "arroz-integral",
      label: "Arroz integral",
      density: { kcal: 123, proteina: 2.7, carbos: 25.6, fibra: 1.8 },
      porciones: { regular: 150, grande: 200 },
    },
    "Mix verdes": {
      id: "mix-verdes",
      label: "Mix verdes",
      density: { kcal: 17, proteina: 1.3, carbos: 3.3, fibra: 2.1 },
      porciones: { regular: 80, grande: 120 },
    },
    "Mix quinoa": {
      id: "mix-quinoa",
      label: "Mix quinoa",
      density: { kcal: 120, proteina: 4.4, carbos: 21.3, fibra: 2.8 },
      porciones: { regular: 150, grande: 200 },
    },
  },

  proteinas: {
    "Pollo crispy": {
      id: "pollo-crispy",
      label: "Pollo crispy",
      density: { kcal: 246, proteina: 23, carbos: 9, fibra: 0 },
      porciones: { regular: 120, grande: 160 },
    },
    "Pollo a la plancha": {
      id: "pollo-plancha",
      label: "Pollo a la plancha",
      density: { kcal: 165, proteina: 31, carbos: 0, fibra: 0 },
      porciones: { regular: 120, grande: 160 },
    },
    Tofu: {
      id: "tofu",
      label: "Tofu",
      density: { kcal: 76, proteina: 8, carbos: 1.9, fibra: 0.3 },
      porciones: { regular: 120, grande: 160 },
    },
    "Tofu crispy": {
      id: "tofu-crispy",
      label: "Tofu crispy",
      density: { kcal: 180, proteina: 15, carbos: 8, fibra: 2 },
      porciones: { regular: 120, grande: 180 },
    },
    "Hamburguesa de lentejas": {
      id: "hamburguesa-lentejas",
      label: "Hamburguesa de lentejas",
      density: { kcal: 160, proteina: 9, carbos: 20, fibra: 5 },
      porciones: { regular: 120, grande: 160 },
    },
  },

  extraProteinas: {
    "Pollo extra (100g) (+6)": {
      id: "pollo-extra-100",
      label: "Pollo extra (100g) (+6)",
      density: { kcal: 165, proteina: 31, carbos: 0, fibra: 0 },
      porciones: { regular: 100, grande: 100 },
    },
    "Pollo extra (200g) (+12)": {
      id: "pollo-extra-200",
      label: "Pollo extra (200g) (+12)",
      density: { kcal: 165, proteina: 31, carbos: 0, fibra: 0 },
      porciones: { regular: 200, grande: 200 },
    },
    "Tofu extra (100g) (+6)": {
      id: "tofu-extra-100",
      label: "Tofu extra (100g) (+6)",
      density: { kcal: 76, proteina: 8, carbos: 1.9, fibra: 0.3 },
      porciones: { regular: 100, grande: 100 },
    },
    "Tofu extra (200g) (+12)": {
      id: "tofu-extra-200",
      label: "Tofu extra (200g) (+12)",
      density: { kcal: 76, proteina: 8, carbos: 1.9, fibra: 0.3 },
      porciones: { regular: 200, grande: 200 },
    },
    "Hamburguesa de lentejas extra (100g) (+6)": {
      id: "hamburguesa-lentejas-extra-100",
      label: "Hamburguesa de lentejas extra (100g) (+6)",
      density: { kcal: 160, proteina: 9, carbos: 20, fibra: 5 },
      porciones: { regular: 100, grande: 100 },
    },
    "Hamburguesa de lentejas extra (200g) (+12)": {
      id: "hamburguesa-lentejas-extra-200",
      label: "Hamburguesa de lentejas extra (200g) (+12)",
      density: { kcal: 160, proteina: 9, carbos: 20, fibra: 5 },
      porciones: { regular: 200, grande: 200 },
    },
  },

  toppings: {
    "Col morada": {
      id: "col-morada",
      label: "Col morada",
      density: { kcal: 31, proteina: 1.4, carbos: 7.4, fibra: 2.1 },
      porciones: { regular: 20, grande: 20 },
    },
    Pepinillo: {
      id: "pepinillo",
      label: "Pepinillo",
      density: { kcal: 12, proteina: 0.5, carbos: 2.4, fibra: 1.2 },
      porciones: { regular: 20, grande: 20 },
    },
    Mango: {
      id: "mango",
      label: "Mango",
      density: { kcal: 60, proteina: 0.8, carbos: 15, fibra: 1.6 },
      porciones: { regular: 20, grande: 20 },
    },
    Piña: {
      id: "pina",
      label: "Piña",
      density: { kcal: 50, proteina: 0.5, carbos: 13, fibra: 1.4 },
      porciones: { regular: 20, grande: 20 },
    },
    "Huevo de codorniz": {
      id: "huevo-codorniz",
      label: "Huevo de codorniz",
      density: { kcal: 158, proteina: 13, carbos: 0.4, fibra: 0 },
      porciones: { regular: 20, grande: 20 },
    },
    "Queso fresco": {
      id: "queso-fresco",
      label: "Queso fresco",
      density: { kcal: 264, proteina: 18, carbos: 3, fibra: 0 },
      porciones: { regular: 27, grande: 27 },
    },
    Camote: {
      id: "camote",
      label: "Camote",
      density: { kcal: 86, proteina: 1.6, carbos: 20, fibra: 3 },
      porciones: { regular: 20, grande: 30 },
    },
    Tomate: {
      id: "tomate",
      label: "Tomate",
      density: { kcal: 18, proteina: 0.9, carbos: 3.9, fibra: 1.2 },
      porciones: { regular: 20, grande: 20 },
    },
    Brócoli: {
      id: "brocoli",
      label: "Brócoli",
      density: { kcal: 34, proteina: 2.8, carbos: 6.6, fibra: 2.6 },
      porciones: { regular: 20, grande: 20 },
    },
    "Rabanito encurtido": {
      id: "rabanito-encurtido",
      label: "Rabanito encurtido",
      density: { kcal: 16, proteina: 0.7, carbos: 3.4, fibra: 1.6 },
      porciones: { regular: 20, grande: 20 },
    },
    "Frejol chino": {
      id: "frejol-chino",
      label: "Frejol chino",
      density: { kcal: 30, proteina: 3, carbos: 6, fibra: 1.8 },
      porciones: { regular: 20, grande: 20 },
    },
    Vainitas: {
      id: "vainitas",
      label: "Vainitas",
      density: { kcal: 31, proteina: 1.8, carbos: 7, fibra: 3.4 },
      porciones: { regular: 20, grande: 20 },
    },
    Espinaca: {
      id: "espinaca",
      label: "Espinaca",
      density: { kcal: 23, proteina: 2.9, carbos: 3.6, fibra: 2.2 },
      porciones: { regular: 20, grande: 20 },
    },
    Lechuga: {
      id: "lechuga",
      label: "Lechuga",
      density: { kcal: 15, proteina: 1.4, carbos: 2.9, fibra: 1.3 },
      porciones: { regular: 40, grande: 60 },
    },
    Zanahoria: {
      id: "zanahoria",
      label: "Zanahoria",
      density: { kcal: 41, proteina: 0.9, carbos: 10, fibra: 2.8 },
      porciones: { regular: 20, grande: 20 },
    },
    Choclo: {
      id: "choclo",
      label: "Choclo",
      density: { kcal: 96, proteina: 3.4, carbos: 21, fibra: 2.4 },
      porciones: { regular: 25, grande: 35 },
    },
    Palta: {
      id: "palta",
      label: "Palta",
      density: { kcal: 160, proteina: 2, carbos: 9, fibra: 7 },
      porciones: { regular: 20, grande: 20 },
    },
    "Papa sancochada": {
      id: "papa-sancochada",
      label: "Papa sancochada",
      density: { kcal: 87, proteina: 1.9, carbos: 20, fibra: 1.8 },
      porciones: { regular: 20, grande: 20 },
    },
  },

  agregados: {
    "Tiras de wantán": {
      id: "wantan",
      label: "Tiras de wantán",
      density: { kcal: 350, proteina: 8, carbos: 45, fibra: 2 },
      porciones: { regular: 5, grande: 5 },
    },
    "Ajonjolí mix": {
      id: "ajonjoli-mix",
      label: "Ajonjolí mix",
      density: { kcal: 573, proteina: 17, carbos: 23, fibra: 12 },
      porciones: { regular: 1, grande: 1 },
    },
    "Cebolla china": {
      id: "cebolla-china",
      label: "Cebolla china",
      density: { kcal: 32, proteina: 1.8, carbos: 7.3, fibra: 2.6 },
      porciones: { regular: 1, grande: 1 },
    },
    "Camotes crocantes": {
      id: "camotes-crocantes",
      label: "Camotes crocantes",
      density: { kcal: 520, proteina: 4, carbos: 63, fibra: 8 },
      porciones: { regular: 5, grande: 5 },
    },
    Canchita: {
      id: "canchita",
      label: "Canchita",
      density: { kcal: 387, proteina: 13, carbos: 78, fibra: 15 },
      porciones: { regular: 5, grande: 5 },
    },
    Nachos: {
      id: "nachos",
      label: "Nachos",
      density: { kcal: 498, proteina: 7, carbos: 63, fibra: 4 },
      porciones: { regular: 5, grande: 5 },
    },
    Chifle: {
      id: "chifle",
      label: "Chifle",
      density: { kcal: 519, proteina: 2.3, carbos: 58, fibra: 3 },
      porciones: { regular: 5, grande: 5 },
    },
    "Crispy algas": {
      id: "crispy-algas",
      label: "Crispy algas",
      density: { kcal: 306, proteina: 6, carbos: 46, fibra: 5 },
      porciones: { regular: 5, grande: 5 },
    },
  },

  salsas: {
    "Vinagreta de la casa": {
      id: "vinagreta-casa",
      label: "Vinagreta de la casa",
      density: { kcal: 450, proteina: 0.5, carbos: 5, fibra: 0 },
      porciones: { regular: 5, grande: 5 },
    },
    Acevichada: {
      id: "acevichada",
      label: "Acevichada",
      density: { kcal: 120, proteina: 1, carbos: 6, fibra: 0.5 },
      porciones: { regular: 5, grande: 5 },
    },
    "Vinagreta blanca": {
      id: "vinagreta-blanca",
      label: "Vinagreta blanca",
      density: { kcal: 420, proteina: 0.5, carbos: 4, fibra: 0 },
      porciones: { regular: 5, grande: 5 },
    },
    Teriyaki: {
      id: "teriyaki",
      label: "Teriyaki",
      density: { kcal: 89, proteina: 5.7, carbos: 15, fibra: 0 },
      porciones: { regular: 5, grande: 5 },
    },
    "Salsa Olivo": {
      id: "salsa-olivo",
      label: "Salsa Olivo",
      density: { kcal: 500, proteina: 1, carbos: 3, fibra: 0.5 },
      porciones: { regular: 5, grande: 5 },
    },
    "Ají especial": {
      id: "aji-especial",
      label: "Ají especial",
      density: { kcal: 90, proteina: 1, carbos: 8, fibra: 1 },
      porciones: { regular: 5, grande: 5 },
    },
    "Ají huacatay": {
      id: "aji-huacatay",
      label: "Ají huacatay",
      density: { kcal: 80, proteina: 1, carbos: 6, fibra: 1 },
      porciones: { regular: 5, grande: 5 },
    },
    Mayopalta: {
      id: "mayopalta",
      label: "Mayopalta",
      density: { kcal: 420, proteina: 1, carbos: 8, fibra: 1 },
      porciones: { regular: 5, grande: 5 },
    },
    "Vinagreta light": {
      id: "vinagreta-light",
      label: "Vinagreta light",
      density: { kcal: 150, proteina: 0.5, carbos: 6, fibra: 0 },
      porciones: { regular: 5, grande: 5 },
    },
    "Honey mustard": {
      id: "honey-mustard",
      label: "Honey mustard",
      density: { kcal: 300, proteina: 1, carbos: 33, fibra: 0 },
      porciones: { regular: 5, grande: 5 },
    },
  },
};

export const POKEBOWLS_CATEGORY_LABELS: Record<
  string,
  { label: string; emoji: string }
> = {
  bases: { label: "Base", emoji: "🍚" },
  proteinas: { label: "Proteína", emoji: "🍗" },
  extraProteinas: { label: "Proteína Extra", emoji: "💪" },
  toppings: { label: "Toppings", emoji: "🥬" },
  agregados: { label: "Agregados", emoji: "✨" },
  salsas: { label: "Salsa", emoji: "🌶️" },
};

export const POKEBOWLS_OPTIONS = (preselectedPokeSize: "regular" | "grande" | null): PokeBowlBuilderProps => ({
  pokeOptions: {
    bases: ["Arroz blanco", "Arroz integral", "Mix verdes", "Mix quinoa"],
    proteinas: [
      "Pollo crispy",
      "Pollo a la plancha",
      "Tofu",
      "Tofu crispy",
      "Hamburguesa de lentejas",
    ],
    extraProteinas: [
      "Pollo extra (100g) (+6)",
      "Pollo extra (200g) (+12)",
      "Atún extra (100g) (+6)",
      "Atún extra (200g) (+12)",
    ],
    toppings: [
      "Col morada",
      "Pepinillo",
      "Mango",
      "Piña",
      "Huevo de codorniz",
      "Queso fresco",
      "Camote",
      "Tomate",
      "Brócoli",
      "Rabanito encurtido",
      "Frejol chino",
      "Vainitas",
      "Espinaca",
      "Lechuga",
      "Zanahoria",
      "Choclo",
      "Palta",
      "Papa sancochada",
    ],
    agregados: [
      "Tiras de wantán",
      "Ajonjolí mix",
      "Cebolla china",
      "Camotes crocantes",
      "Canchita",
      "Nachos",
      "Chifle",
      "Crispy algas",
    ],
    salsas: [
      "Vinagreta de la casa",
      "Acevichada",
      "Vinagreta blanca",
      "Teriyaki",
      "Salsa Olivo",
      "Ají especial",
      "Ají huacatay",
      "Mayopalta",
      "Vinagreta light",
      "Honey mustard",
    ],
    preselectedSize: preselectedPokeSize,
  },
});
