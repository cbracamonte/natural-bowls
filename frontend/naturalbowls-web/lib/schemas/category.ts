export const CATEGORY_IDS = [
  "smoothie-bowl",
  "poke-bowl",
  "waffles-panqueques",
  "parfaits-puddings",
  "wraps",
  "ensaladas",
  "jugos",
  "cafe",
  "desayunos",
  "infusiones",
  "milkshakes",
  "postres",
  "tostones",
  "sandwiches",
] as const;

export type CategoryType = (typeof CATEGORY_IDS)[number];

export interface Category {
  id: CategoryType;
  name: string;
  description: string;
  image: string;
  color: string;
}
