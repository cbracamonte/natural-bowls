import { POKEBOWL_POKE_BOWL_NUTRITION_DATA } from "@/data/poke-bowl-nutrition-data";
import { Product } from "@/lib/schemas";
import {
  PokeBowlNutritionResult,
  PokeBowlCategoryType,
  PokeBowlNutritionDensity,
} from "@/lib/schemas/poke-bowl-nutrition";
import { sumarNutricion } from "@/lib/utils/poke-bowl-nutrition-utils";

export interface SelectedBowlItems {
  [key: string]: string[];
}

export interface BowlValidationError {
  isValid: boolean;
  message?: string;
}

export interface BowlOrderData {
  type: "pokebowl";
  tamaño: "regular" | "grande";
  base: string;
  proteina: string;
  extraProteinas: string[];
  toppings: string[];
  agregados: string[];
  salsas: string[];
  nutrition: PokeBowlNutritionResult;
  message: string;
}

const BASE_PRICES: Record<"regular" | "grande", number> = {
  regular: 22,
  grande: 27,
};

export class PokeBowlService {
  /**
   * Obtiene los límites de selección por categoría
   */
  static getLimits(tamaño: "regular" | "grande"): Record<string, number> {
    return {
      bases: 1,
      proteinas: 1,
      extraProteinas: 1,
      toppings: 5,
      agregados: 4,
      salsas: tamaño === "regular" ? 2 : 3,
    };
  }

  /**
   * Obtiene las proteínas extra filtradas según la proteína base seleccionada
   */
  static getFilteredExtraProteinas(selectedProtein?: string): string[] {
    if (!selectedProtein) return [];

    const proteinType = selectedProtein.split(" ")[0];

    return Object.entries(POKEBOWL_POKE_BOWL_NUTRITION_DATA.extraProteinas || {})
      .filter(([label]) =>
        label.toLowerCase().includes(proteinType.toLowerCase()),
      )
      .map(([label]) => label);
  }

  /**
   * Obtiene los items nutricionales seleccionados
   */
  private static getSelectedNutritionItems(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): { density: PokeBowlNutritionDensity; gramos: number }[] {
    const items: { density: PokeBowlNutritionDensity; gramos: number }[] = [];

    Object.entries(selectedItems).forEach(([category, itemLabels]) => {
      itemLabels.forEach((label) => {
        const nutritionItem =
          POKEBOWL_POKE_BOWL_NUTRITION_DATA[category as PokeBowlCategoryType]?.[label];
        if (nutritionItem) {
          const gramos = nutritionItem.porciones[tamaño];
          items.push({
            density: nutritionItem.density,
            gramos,
          });
        }
      });
    });

    return items;
  }

  /**
   * Calcula la nutrición del bowl
   */
  static calculateNutrition(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): PokeBowlNutritionResult {
    const items = this.getSelectedNutritionItems(selectedItems, tamaño);
    if (items.length === 0) {
      return { kcal: 0, proteina: 0, carbos: 0, fibra: 0 };
    }
    return sumarNutricion(items);
  }

  /**
   * Calcula el precio total del bowl
   */
  static calculateTotalPrice(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): number {
    let price = BASE_PRICES[tamaño];

    const extraProteinas = selectedItems.extraProteinas || [];
    extraProteinas.forEach((item) => {
      const match = item.match(/\(\+(\d+)\)/);
      if (match) {
        price += parseInt(match[1]);
      }
    });

    return price;
  }

  /**
   * Genera el mensaje para WhatsApp
   */
  static generateWhatsAppMessage(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): string {
    const base = selectedItems.bases?.[0] || "No seleccionada";
    const proteina = selectedItems.proteinas?.[0] || "No seleccionada";
    const extraProteinas = selectedItems.extraProteinas?.join(", ") || "Ninguna";
    const toppings = selectedItems.toppings?.join(", ") || "Ninguno";
    const agregados = selectedItems.agregados?.join(", ") || "Ninguno";
    const salsas = selectedItems.salsas?.join(", ") || "Ninguna";

    return (
      `🍱 *POKE BOWL PEDIDO*\n\n` +
      `📏 *Tamaño:* ${tamaño.charAt(0).toUpperCase() + tamaño.slice(1)}\n\n` +
      `🍚 *Base:* ${base}\n` +
      `🍗 *Proteína:* ${proteina}\n` +
      (extraProteinas !== "Ninguna"
        ? `💪 *Proteína Extra:* ${extraProteinas}\n`
        : "") +
      `🥬 *Toppings:* ${toppings}\n` +
      `✨ *Agregados:* ${agregados}\n` +
      `🌶️ *Salsas:* ${salsas}`
    );
  }

  /**
   * Valida que todos los requisitos del bowl estén cumplidos
   */
  static validateBowlRequirements(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): BowlValidationError {
    const limits = this.getLimits(tamaño);

    if (!selectedItems.bases?.length) {
      return { isValid: false, message: "Por favor selecciona una base" };
    }

    if (!selectedItems.proteinas?.length) {
      return { isValid: false, message: "Por favor selecciona una proteína" };
    }

    if ((selectedItems.toppings?.length || 0) < limits.toppings) {
      const missing = limits.toppings - (selectedItems.toppings?.length || 0);
      return {
        isValid: false,
        message: `Por favor selecciona ${missing} topping${missing !== 1 ? "s" : ""}`,
      };
    }

    if ((selectedItems.agregados?.length || 0) < limits.agregados) {
      const missing = limits.agregados - (selectedItems.agregados?.length || 0);
      return {
        isValid: false,
        message: `Por favor selecciona ${missing} agregado${missing !== 1 ? "s" : ""}`,
      };
    }

    const requiredSalsas = limits.salsas;
    if (
      !selectedItems.salsas?.length ||
      selectedItems.salsas.length !== requiredSalsas
    ) {
      const missing = requiredSalsas - (selectedItems.salsas?.length || 0);
      return {
        isValid: false,
        message: `Por favor selecciona ${missing} salsa${missing !== 1 ? "s" : ""}`,
      };
    }

    return { isValid: true };
  }

  /**
   * Crea los datos del pedido para almacenar
   */
  static createBowlOrderData(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): BowlOrderData {
    return {
      type: "pokebowl",
      tamaño,
      base: selectedItems.bases[0],
      proteina: selectedItems.proteinas[0],
      extraProteinas: selectedItems.extraProteinas || [],
      toppings: selectedItems.toppings || [],
      agregados: selectedItems.agregados || [],
      salsas: selectedItems.salsas || [],
      nutrition: this.calculateNutrition(selectedItems, tamaño),
      message: this.generateWhatsAppMessage(selectedItems, tamaño),
    };
  }

  /**
   * Crea el producto del bowl para el carrito
   */
  static createBowlProduct(
    selectedItems: SelectedBowlItems,
    tamaño: "regular" | "grande",
  ): Product {
    const base = selectedItems.bases[0];
    const proteina = selectedItems.proteinas[0];
    const toppings = selectedItems.toppings || [];
    const agregados = selectedItems.agregados || [];
    const salsas = selectedItems.salsas || [];

    // description kept for legacy flows but not relied upon
    const description = `Base: ${base}, Proteína: ${proteina}${
      selectedItems.extraProteinas?.length
        ? `, Extra: ${selectedItems.extraProteinas.join(", ")}`
        : ""
    }, Toppings: ${toppings.join(", ") || "Ninguno"}`;

    return {
      id: `poke-bowl-${Date.now()}`,
      // include emoji so summaries display it
      name: `🍱 Poke Bowl ${tamaño.charAt(0).toUpperCase() + tamaño.slice(1)} - ${base}`,
      description,
      price: this.calculateTotalPrice(selectedItems, tamaño),
      image: "/images/poke-bowl-2.jpg",
      categoryId: "poke-bowl",
      ingredients: [...toppings, ...agregados, ...(selectedItems.extraProteinas || [])],
      customizations: {
        tipo: "pokebowl",
        tamaño,
        base,
        proteina,
        toppings,
        agregados,
        salsas,
      },
    };
  }

  /**
   * Verifica si una categoría está llena
   */
  static isCategoryFull(
    selectedItems: SelectedBowlItems,
    category: string,
    limits: Record<string, number>,
  ): boolean {
    const count = selectedItems[category]?.length || 0;
    const limit = limits[category];
    return count >= limit && limit > 0;
  }

  /**
   * Verifica si un item se puede seleccionar
   */
  static canSelectItem(
    selectedItems: SelectedBowlItems,
    category: string,
    item: string,
    limits: Record<string, number>,
  ): boolean {
    const isSelected = selectedItems[category]?.includes(item);
    const isFull = this.isCategoryFull(selectedItems, category, limits);
    return isSelected || !isFull;
  }
}
