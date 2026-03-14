import { PokeBowlNutrition, PokeBowlNutritionDensity, PokeBowlNutritionResult } from "../schemas";

export function calcularNutricion(
  density: PokeBowlNutritionDensity,
  gramos: number,
): PokeBowlNutritionResult {
  const factor = gramos / 100;

  return {
    kcal: round(density.kcal * factor),
    proteina: round(density.proteina * factor),
    carbos: round(density.carbos * factor),
    fibra: round(density.fibra * factor),
  };
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function sumarNutricion(
  items: { density: PokeBowlNutritionDensity; gramos: number }[]
): PokeBowlNutritionResult {
  return items.reduce(
    (acc, item) => {
      const n = calcularNutricion(item.density, item.gramos);

      acc.kcal += n.kcal;
      acc.proteina += n.proteina;
      acc.carbos += n.carbos;
      acc.fibra += n.fibra;

      return acc;
    },
    { kcal: 0, proteina: 0, carbos: 0, fibra: 0 }
  );
}

export function calcularPorcion(
  item: PokeBowlNutrition,
  tipo: "regular" | "grande"
) {
  return calcularNutricion(item.density, item.porciones[tipo]);
}
