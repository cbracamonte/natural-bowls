import { SMOOTHIE_BOWL_NUTRITION_DATA } from "@/data/smoothie-bowl-nutrition-data";
import { Product } from "@/lib/schemas";
import {
  SmoothieBowlNutritionInfo,
  SmoothieBowlOrderData,
  SmoothieBowlValidationError,
} from "@/lib/schemas/smoothie-bowl-nutrition";

const MAX_TOPPINGS = 5;

const PREMIUM_TOPPINGS = [
  "Mantequilla de maní (+2)",
  "Nibs de cacao (+2)",
];

export class SmoothieBowlService {
  /**
   * Obtiene el precio adicional de un topping
   */
  static getAdditionalPrice(topping: string): number {
    if (PREMIUM_TOPPINGS.includes(topping)) {
      return 2;
    }
    return 0;
  }

  /**
   * Obtiene el límite máximo de toppings
   */
  static getMaxToppings(): number {
    return MAX_TOPPINGS;
  }

  /**
   * Calcula la nutrición del smoothie bowl
   */
  static calculateNutrition(
    selectedSmoothie: Product | null,
    selectedToppings: string[]
  ): SmoothieBowlNutritionInfo {
    const total: SmoothieBowlNutritionInfo = {
      kcal: 0,
      proteina: 0,
      carbos: 0,
      fibra: 0,
    };

    // Agregar nutrición del smoothie base
    if (selectedSmoothie) {
      const smoothieNutrition =
        SMOOTHIE_BOWL_NUTRITION_DATA.smoothies?.[selectedSmoothie.name];
      if (smoothieNutrition) {
        total.kcal += smoothieNutrition.kcal;
        total.proteina += smoothieNutrition.proteina;
        total.carbos += smoothieNutrition.carbos;
        total.fibra += smoothieNutrition.fibra;
      }
    }

    // Agregar nutrición de los toppings
    selectedToppings.forEach((topping) => {
      const nutrition = SMOOTHIE_BOWL_NUTRITION_DATA.toppings?.[topping];
      if (nutrition) {
        total.kcal += nutrition.kcal;
        total.proteina += nutrition.proteina;
        total.carbos += nutrition.carbos;
        total.fibra += nutrition.fibra;
      }
    });

    return total;
  }

  /**
   * Calcula el precio total del smoothie bowl
   */
  static calculateTotalPrice(
    selectedSmoothie: Product | null,
    selectedToppings: string[]
  ): number {
    if (!selectedSmoothie) return 0;

    let price = selectedSmoothie.price;
    selectedToppings.forEach((topping) => {
      price += this.getAdditionalPrice(topping);
    });

    return price;
  }

  /**
   * Genera el mensaje para WhatsApp
   */
  static generateWhatsAppMessage(
    selectedSmoothie: Product | null,
    selectedToppings: string[]
  ): string {
    const smoothieName = selectedSmoothie?.name || "No seleccionado";
    const toppings = selectedToppings.join(", ") || "Ninguno";

    return (
      `🥣 *SMOOTHIE BOWL PEDIDO*\n\n` +
      `🍓 *Smoothie:* ${smoothieName}\n` +
      `🥬 *Toppings Adicionales:* ${toppings}`
    );
  }

  /**
   * Valida que todos los requisitos del smoothie bowl estén cumplidos
   */
  static validateBowlRequirements(
    selectedSmoothie: Product | null,
    selectedToppings: string[]
  ): SmoothieBowlValidationError {
    if (!selectedSmoothie) {
      return { isValid: false, message: "Por favor selecciona un smoothie" };
    }

    if (selectedToppings.length < MAX_TOPPINGS) {
      const missing = MAX_TOPPINGS - selectedToppings.length;
      return {
        isValid: false,
        message: `Por favor selecciona ${missing} topping${missing !== 1 ? "s" : ""}`,
      };
    }

    return { isValid: true };
  }

  /**
   * Crea los datos del pedido para almacenar
   */
  static createBowlOrderData(
    selectedSmoothie: Product,
    selectedToppings: string[]
  ): SmoothieBowlOrderData {
    return {
      type: "smoothiebowl",
      smoothieId: selectedSmoothie.id,
      smoothieName: selectedSmoothie.name,
      toppings: selectedToppings,
      nutrition: this.calculateNutrition(selectedSmoothie, selectedToppings),
      message: this.generateWhatsAppMessage(selectedSmoothie, selectedToppings),
    };
  }

  /**
   * Crea el producto del smoothie bowl para el carrito
   */
  static createBowlProduct(
    selectedSmoothie: Product,
    selectedToppings: string[]
  ): Product {
    const totalPrice = this.calculateTotalPrice(
      selectedSmoothie,
      selectedToppings
    );

    return {
      id: `smoothie-bowl-${Date.now()}`,
      name: selectedSmoothie.name,
      description:
        selectedToppings.length > 0
          ? `${selectedSmoothie.description} + Toppings: ${selectedToppings.join(", ")}`
          : selectedSmoothie.description,
      price: totalPrice,
      image: selectedSmoothie.image,
      categoryId: "smoothie-bowl",
      ingredients: [...selectedSmoothie.ingredients, ...selectedToppings],
    };
  }

  /**
   * Verifica si se pueden seleccionar más toppings
   */
  static canSelectMoreToppings(selectedToppings: string[]): boolean {
    return selectedToppings.length < MAX_TOPPINGS;
  }

  /**
   * Verifica si un topping se puede seleccionar
   */
  static canSelectTopping(
    selectedToppings: string[],
    topping: string
  ): boolean {
    const isSelected = selectedToppings.includes(topping);
    return isSelected || this.canSelectMoreToppings(selectedToppings);
  }

  /**
   * Obtiene el número de toppings faltantes
   */
  static getMissingToppingsCount(selectedToppings: string[]): number {
    return Math.max(0, MAX_TOPPINGS - selectedToppings.length);
  }
}
