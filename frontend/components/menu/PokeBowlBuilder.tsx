"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface PokeBowlBuilderProps {
  pokeOptions: {
    bases: string[];
    proteinas: string[];
    toppings: string[];
    agregados: string[];
    salsas: string[];
  };
}

interface NutritionInfo {
  kcal: number;
  proteina: number;
  carbos: number;
  fibra: number;
}

const nutritionData: { [key: string]: { [item: string]: NutritionInfo } } = {
  bases: {
    "Arroz blanco": { kcal: 195, proteina: 4, carbos: 43, fibra: 0.6 },
    "Arroz integral": { kcal: 173, proteina: 4, carbos: 36, fibra: 3.5 },
    "Mix verdes": { kcal: 15, proteina: 1, carbos: 3, fibra: 1.5 },
    "Mix quinoa": { kcal: 196, proteina: 7, carbos: 35, fibra: 6 },
  },
  proteinas: {
    "Pollo crispy": { kcal: 200, proteina: 26, carbos: 8, fibra: 0 },
    "Pollo a la plancha": { kcal: 165, proteina: 31, carbos: 0, fibra: 0 },
    "Langostinos al panko (+5.50)": {
      kcal: 145,
      proteina: 21,
      carbos: 8,
      fibra: 0,
    },
    "Salmón (+7.00)": { kcal: 206, proteina: 20, carbos: 0, fibra: 0 },
    Tofu: { kcal: 76, proteina: 8, carbos: 2, fibra: 1 },
    "Tofu crispy": { kcal: 120, proteina: 13, carbos: 5, fibra: 2 },
    "Hamburguesa de lentejas": { kcal: 95, proteina: 7, carbos: 10, fibra: 2 },
  },
  toppings: {
    "Col morada": { kcal: 13, proteina: 1, carbos: 3, fibra: 0.7 },
    Pepinillo: { kcal: 3, proteina: 0, carbos: 1, fibra: 0.2 },
    Mango: { kcal: 27, proteina: 0.4, carbos: 7, fibra: 0.9 },
    Piña: { kcal: 14, proteina: 0.1, carbos: 4, fibra: 0.5 },
    "Huevo de codorniz": { kcal: 32, proteina: 2.6, carbos: 0.4, fibra: 0 },
    "Queso fresco": { kcal: 45, proteina: 3.5, carbos: 0, fibra: 0 },
    Camote: { kcal: 27, proteina: 0.5, carbos: 6, fibra: 1 },
    Tomate: { kcal: 9, proteina: 0.4, carbos: 2, fibra: 0.4 },
    Brócoli: { kcal: 11, proteina: 1.4, carbos: 2, fibra: 0.4 },
    "Rabanito encurtido": { kcal: 5, proteina: 0.2, carbos: 1, fibra: 0.2 },
    "Frejol chino": { kcal: 18, proteina: 1.3, carbos: 3, fibra: 1 },
    Vainitas: { kcal: 9, proteina: 1, carbos: 2, fibra: 0.4 },
    Espinaca: { kcal: 7, proteina: 1, carbos: 1, fibra: 0.5 },
    Lechuga: { kcal: 5, proteina: 0.5, carbos: 1, fibra: 0.4 },
    Zanahoria: { kcal: 12, proteina: 0.3, carbos: 3, fibra: 0.7 },
    Choclo: { kcal: 27, proteina: 1, carbos: 6, fibra: 1.2 },
    Palta: { kcal: 60, proteina: 0.8, carbos: 3, fibra: 2 },
    "Papa sancochada": { kcal: 36, proteina: 0.7, carbos: 8, fibra: 0.7 },
  },
  agregados: {
    "Tiras de wantán": { kcal: 68, proteina: 0, carbos: 9, fibra: 0 },
    "Ajonjolí mix": { kcal: 64, proteina: 2, carbos: 3, fibra: 1.5 },
    "Cebolla china": { kcal: 8, proteina: 0.4, carbos: 2, fibra: 0.3 },
    "Camotes crocantes": { kcal: 54, proteina: 0.5, carbos: 7, fibra: 1 },
    Canchita: { kcal: 60, proteina: 2, carbos: 8, fibra: 0.8 },
    Nachos: { kcal: 70, proteina: 1, carbos: 8, fibra: 0 },
    Chifle: { kcal: 58, proteina: 1, carbos: 8, fibra: 0.5 },
    "Crispy algas": { kcal: 32, proteina: 1, carbos: 4, fibra: 1.2 },
  },
  salsas: {
    "Vinagreta de la casa": { kcal: 56, proteina: 0, carbos: 2, fibra: 0 },
    Acevichada: { kcal: 18, proteina: 0, carbos: 4, fibra: 0.3 },
    "Vinagreta blanca": { kcal: 68, proteina: 0, carbos: 1, fibra: 0 },
    Teriyaki: { kcal: 30, proteina: 1, carbos: 7, fibra: 0 },
    "Salsa Olivo": { kcal: 42, proteina: 0, carbos: 3, fibra: 0.5 },
    "Ají especial": { kcal: 15, proteina: 0, carbos: 3, fibra: 0.5 },
    "Ají huacatay": { kcal: 12, proteina: 0, carbos: 2, fibra: 0.4 },
    Mayopalta: { kcal: 75, proteina: 0, carbos: 2, fibra: 0.3 },
    "Vinagreta light": { kcal: 24, proteina: 0, carbos: 3, fibra: 0 },
    "Honey mustard": { kcal: 52, proteina: 0, carbos: 8, fibra: 0 },
  },
};

export default function PokeBowlBuilder({ pokeOptions }: PokeBowlBuilderProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: string[];
  }>({});
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({
    bases: true,
    proteinas: false,
    toppings: false,
    agregados: false,
    salsas: false,
  });
  const [tamaño, setTamaño] = useState<"regular" | "grande">("regular");

  const calculateNutrition = (): NutritionInfo => {
    const total: NutritionInfo = { kcal: 0, proteina: 0, carbos: 0, fibra: 0 };

    Object.entries(selectedItems).forEach(([category, items]) => {
      items.forEach((item) => {
        const nutrition = nutritionData[category]?.[item];
        if (nutrition) {
          total.kcal += nutrition.kcal;
          total.proteina += nutrition.proteina;
          total.carbos += nutrition.carbos;
          total.fibra += nutrition.fibra;
        }
      });
    });

    return total;
  };

  const nutrition = calculateNutrition();

  const getProteinPrice = (): number => {
    const proteinName = selectedItems.proteinas?.[0] || "";
    const match = proteinName.match(/\((\+[\d.]+)\)/);
    if (match) {
      return parseFloat(match[1].substring(1));
    }
    return 0;
  };

  const calculateTotalPrice = (): number => {
    const basePrices = {
      regular: 22,
      grande: 27,
    };
    return basePrices[tamaño] + getProteinPrice();
  };

  const generateWhatsAppMessage = (): string => {
    const base = selectedItems.bases?.[0] || "No seleccionada";
    const proteina = selectedItems.proteinas?.[0] || "No seleccionada";
    const toppings = selectedItems.toppings?.join(", ") || "Ninguno";
    const agregados = selectedItems.agregados?.join(", ") || "Ninguno";
    const salsas = selectedItems.salsas?.join(", ") || "Ninguna";

    return (
      `🍱 *POKE BOWL PEDIDO*\n\n` +
      `📏 *Tamaño:* ${tamaño.charAt(0).toUpperCase() + tamaño.slice(1)}\n\n` +
      `🍚 *Base:* ${base}\n` +
      `🍗 *Proteína:* ${proteina}\n` +
      `🥬 *Toppings:* ${toppings}\n` +
      `✨ *Agregados:* ${agregados}\n` +
      `🌶️ *Salsas:* ${salsas}`
    );
  };

  const handleOrderClick = () => {
    if (totalSelected === 0) {
      alert("Por favor selecciona al menos una base y una proteína");
      return;
    }
    if (!selectedItems.bases?.length || !selectedItems.proteinas?.length) {
      alert("Debes seleccionar una base y una proteína");
      return;
    }

    const bowlData = {
      type: "pokebowl",
      tamaño,
      base: selectedItems.bases[0],
      proteina: selectedItems.proteinas[0],
      toppings: selectedItems.toppings || [],
      agregados: selectedItems.agregados || [],
      salsas: selectedItems.salsas || [],
      nutrition: calculateNutrition(),
      message: generateWhatsAppMessage(),
    };

    // Guardar en localStorage
    localStorage.setItem("bowlOrder", JSON.stringify(bowlData));

    // Agregar al carrito
    const bowlProduct = {
      id: `poke-bowl-${Date.now()}`,
      name: `Poke Bowl ${tamaño.charAt(0).toUpperCase() + tamaño.slice(1)} - ${selectedItems.bases[0]}`,
      description: `Base: ${selectedItems.bases[0]}, Proteína: ${selectedItems.proteinas[0]}, Toppings: ${selectedItems.toppings?.join(", ") || "Ninguno"}`,
      price: calculateTotalPrice(),
      image: "/images/poke-bowl-2.jpg",
      category: "poke" as const,
      ingredients: [
        ...(selectedItems.toppings || []),
        ...(selectedItems.agregados || []),
      ],
    };

    addItem(bowlProduct, 1);

    // Navegar al checkout
    router.push("/checkout");
  };

  const limits: { [key: string]: number } = {
    bases: 1,
    proteinas: 1,
    toppings: 5,
    agregados: 4,
    salsas: tamaño === "regular" ? 2 : 3,
  };

  const toggleItem = (category: string, item: string) => {
    setSelectedItems((prev) => {
      const current = prev[category] || [];
      if (current.includes(item)) {
        return { ...prev, [category]: current.filter((i) => i !== item) };
      } else {
        const limit = limits[category];
        if (current.length < limit) {
          return { ...prev, [category]: [...current, item] };
        }
        return prev;
      }
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const totalSelected = Object.values(selectedItems).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  const categoryLabels: { [key: string]: { label: string; emoji: string } } = {
    bases: { label: "Base", emoji: "🍚" },
    proteinas: { label: "Proteína", emoji: "🍗" },
    toppings: { label: "Toppings", emoji: "🥬" },
    agregados: { label: "Agregados", emoji: "✨" },
    salsas: { label: "Salsa", emoji: "🌶️" },
  };

  return (
    <div className="mb-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* LEFT PANEL - Description & Options */}
          <div className="p-8 lg:p-12 border-r border-gray-200 flex flex-col justify-between bg-linear-to-b from-white to-gray-50">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-3">
                Poke<span className="text-[#9CB973]">Bowl</span>
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Personaliza tu poke bowl seleccionando tus ingredientes
                favoritos. Elige base, proteína, toppings, agregados y salsa
                para crear tu combinación perfecta. Fresco, nutritivo y hecho a
                tu medida.
              </p>

              {/* Tamaño Selector */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-bold text-[#5D4E37] mb-3">Tamaño:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTamaño("regular")}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all border-2 ${
                      tamaño === "regular"
                        ? "bg-[#9CB973] text-white border-[#9CB973]"
                        : "bg-white text-[#5D4E37] border-gray-200 hover:border-[#9CB973]"
                    }`}
                  >
                    Regular
                  </button>
                  <button
                    onClick={() => setTamaño("grande")}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all border-2 ${
                      tamaño === "grande"
                        ? "bg-[#9CB973] text-white border-[#9CB973]"
                        : "bg-white text-[#5D4E37] border-gray-200 hover:border-[#9CB973]"
                    }`}
                  >
                    Grande
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {Object.entries(categoryLabels).map(
                  ([key, { label, emoji }]) => {
                    const isExpanded = expandedCategories[key];
                    const count = selectedItems[key]?.length || 0;
                    const limit = limits[key];
                    const isFull = count >= limit;

                    return (
                      <div key={key}>
                        <button
                          onClick={() => toggleCategory(key)}
                          className="w-full flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9CB973] hover:bg-[#9CB973]/5 transition-all text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{emoji}</span>
                            <div>
                              <span className="font-bold text-[#5D4E37] group-hover:text-[#6B8E4E] block">
                                {label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {count}/{limit}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isFull && (
                              <span className="bg-[#9CB973] text-white text-xs font-bold px-2 py-1 rounded-full">
                                Completo
                              </span>
                            )}
                            <span className="text-[#9CB973] text-lg font-bold">
                              {isExpanded ? "−" : "+"}
                            </span>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-2 p-4 bg-white border-2 border-[#9CB973] rounded-xl">
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {pokeOptions[key as keyof typeof pokeOptions].map(
                                (item) => {
                                  const isSelected =
                                    selectedItems[key]?.includes(item);
                                  const canSelect = isSelected || !isFull;

                                  return (
                                    <label
                                      key={item}
                                      className={`flex items-center gap-3 p-2 cursor-pointer group rounded-lg ${
                                        canSelect
                                          ? "hover:bg-gray-50"
                                          : "opacity-50 cursor-not-allowed"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleItem(key, item)}
                                        disabled={!canSelect}
                                        className="w-4 h-4 cursor-pointer accent-[#9CB973] disabled:cursor-not-allowed"
                                      />
                                      <span
                                        className={`text-sm flex-1 font-medium ${
                                          canSelect
                                            ? "text-gray-700 group-hover:text-[#6B8E4E]"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        {item}
                                      </span>
                                    </label>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="bg-[#9CB973]/10 border-2 border-[#9CB973] rounded-xl p-4 text-center">
              <p className="text-sm text-[#5D4E37] font-bold mb-2">
                {totalSelected === 0
                  ? "✨ Comienza a construir tu bowl"
                  : `🎯 ${totalSelected} ingredientes seleccionados`}
              </p>
              {selectedItems.bases?.length &&
                selectedItems.proteinas?.length && (
                  <p className="text-lg font-bold text-[#6B8E4E] mb-3">
                    S/ {calculateTotalPrice().toFixed(2)}
                  </p>
                )}
              <button
                onClick={handleOrderClick}
                disabled={
                  totalSelected === 0 ||
                  !selectedItems.bases?.length ||
                  !selectedItems.proteinas?.length
                }
                className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                  totalSelected > 0 &&
                  selectedItems.bases?.length &&
                  selectedItems.proteinas?.length
                    ? "bg-[#9CB973] text-white hover:bg-[#6B8E4E] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                🛒 Ir al Checkout
              </button>
            </div>
          </div>

          {/* CENTER PANEL - Visual */}
          <div className="relative overflow-hidden bg-linear-to-br from-white via-[#F9FBFA] to-[#9CB973]/10 flex flex-col items-center justify-center p-8 lg:p-12 min-h-[600px]">
            {/* Decorative Elements */}
            <div className="absolute top-10 right-20 w-80 h-80 bg-linear-to-br from-[#9CB973]/20 to-[#6B8E4E]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-linear-to-tr from-[#6B8E4E]/15 to-[#9CB973]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Clean Area for Future Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#5D4E37] mb-2">🍱</p>
                <h3 className="text-2xl font-bold text-[#5D4E37] mb-4">
                  Crea tu Poke Bowl
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Selecciona tus ingredientes favoritos en el panel izquierdo y
                  visualiza la información nutricional en tiempo real
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Nutritional Facts */}
          <div className="p-8 lg:p-12 border-l border-gray-200 bg-linear-to-b from-gray-50 to-white flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-6">
                Este plato contiene
              </p>

              <h3 className="text-xl font-bold text-[#5D4E37] mb-8 uppercase tracking-wider">
                Información Nutricional
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                    nutrition.kcal > 0
                      ? "border-[#9CB973] hover:shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                    Energía
                  </p>
                  <p className="text-2xl font-bold text-[#5D4E37]">
                    {Math.round(nutrition.kcal)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">kcal</p>
                </div>

                <div
                  className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                    nutrition.proteina > 0
                      ? "border-[#9CB973] hover:shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                    Proteína
                  </p>
                  <p className="text-2xl font-bold text-[#5D4E37]">
                    {Math.round(nutrition.proteina)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">g</p>
                </div>

                <div
                  className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                    nutrition.carbos > 0
                      ? "border-[#9CB973] hover:shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                    Carbohidratos
                  </p>
                  <p className="text-2xl font-bold text-[#5D4E37]">
                    {Math.round(nutrition.carbos)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">g</p>
                </div>

                <div
                  className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                    nutrition.fibra > 0
                      ? "border-[#9CB973] hover:shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                    Fibra
                  </p>
                  <p className="text-2xl font-bold text-[#5D4E37]">
                    {Math.round(nutrition.fibra * 10) / 10}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">g</p>
                </div>
              </div>

              {totalSelected > 0 && (
                <div className="bg-[#9CB973]/10 rounded-lg p-4 mb-8 border border-[#9CB973]/20">
                  <p className="text-xs text-[#5D4E37] font-bold mb-3">
                    📋 INGREDIENTES SELECCIONADOS
                  </p>
                  <div className="space-y-2 text-xs text-gray-600">
                    {selectedItems.bases && selectedItems.bases.length > 0 && (
                      <p>
                        <span className="font-semibold">Base:</span>{" "}
                        {selectedItems.bases[0]}
                      </p>
                    )}
                    {selectedItems.proteinas &&
                      selectedItems.proteinas.length > 0 && (
                        <p>
                          <span className="font-semibold">Proteína:</span>{" "}
                          {selectedItems.proteinas[0]}
                        </p>
                      )}
                    {selectedItems.toppings &&
                      selectedItems.toppings.length > 0 && (
                        <p>
                          <span className="font-semibold">
                            Toppings ({selectedItems.toppings.length}):
                          </span>{" "}
                          {selectedItems.toppings.join(", ")}
                        </p>
                      )}
                    {selectedItems.agregados &&
                      selectedItems.agregados.length > 0 && (
                        <p>
                          <span className="font-semibold">
                            Agregados ({selectedItems.agregados.length}):
                          </span>{" "}
                          {selectedItems.agregados.join(", ")}
                        </p>
                      )}
                    {selectedItems.salsas &&
                      selectedItems.salsas.length > 0 && (
                        <p>
                          <span className="font-semibold">
                            Salsas ({selectedItems.salsas.length}):
                          </span>{" "}
                          {selectedItems.salsas.join(", ")}
                        </p>
                      )}
                  </div>
                </div>
              )}

              <div className="bg-[#F5F5F5] rounded-lg p-4 mb-8">
                <p className="text-xs text-gray-600 font-semibold">
                  % NUTRIENTES DIARIOS
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Nuestros bowls contienen los nutrientes esenciales para una
                  alimentación balanceada y deliciosa.
                </p>
              </div>
            </div>

            <div className="bg-[#9CB973]/10 border-2 border-[#9CB973] rounded-lg p-4 text-center">
              <p className="text-xs text-[#5D4E37] font-bold mb-2">
                💚 BOWL SALUDABLE
              </p>
              <p className="text-xs text-gray-600">
                Ingredientes frescos seleccionados con cuidado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
