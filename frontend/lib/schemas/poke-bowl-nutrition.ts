export interface PokeBowlNutritionDensity {
  kcal: number; // por 100g
  proteina: number; // por 100g
  carbos: number; // por 100g
  fibra: number; // por 100g
}

export interface PokebowlPortionSizes {
  regular: number;
  grande: number;
}

export interface PokeBowlNutrition {
  id: string;
  label: string;
  density: PokeBowlNutritionDensity;
  porciones: PokebowlPortionSizes;
}

export type PokeBowlCategoryType =
  | "bases"
  | "proteinas"
  | "extraProteinas"
  | "toppings"
  | "agregados"
  | "salsas";

export type PokeBowlNutritionDataset = Record<PokeBowlCategoryType, Record<string, PokeBowlNutrition>>;

export interface PokeBowlNutritionResult {
  kcal: number;
  proteina: number;
  carbos: number;
  fibra: number;
}
