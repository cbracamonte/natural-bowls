import { Product } from "./product";

export interface SmoothieBowlNutritionInfo {
  kcal: number;
  proteina: number;
  carbos: number;
  fibra: number;
}

export interface SmoothieBowlBuilderProps {
  smoothieOptions: {
    smoothies: Product[];
    toppings: string[];
    preselectedSmoothieId?: string;
  };
}

export type SmoothieBowlCategoryType = "smoothies" | "toppings";

export type SmoothieBowlNutritionDataset = Record<
  SmoothieBowlCategoryType,
  Record<string, SmoothieBowlNutritionInfo>
>;

export interface SmoothieBowlOrderData {
  type: "smoothiebowl";
  smoothieId: string;
  smoothieName: string;
  toppings: string[];
  nutrition: SmoothieBowlNutritionInfo;
  message: string;
}

export interface SmoothieBowlValidationError {
  isValid: boolean;
  message?: string;
}
