"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Product, SmoothieBowlBuilderProps } from "@/lib/schemas";
import { SmoothieBowlService } from "@/lib/services";

export default function SmoothieBowlBuilder({
  smoothieOptions,
}: SmoothieBowlBuilderProps) {
  const router = useRouter();
  const { addItem } = useCart();

  // Obtener smoothie pre-seleccionado
  const preselectedSmoothie = useMemo(() => {
    if (smoothieOptions.preselectedSmoothieId) {
      return smoothieOptions.smoothies.find(
        (s) => s.id === smoothieOptions.preselectedSmoothieId,
      ) || null;
    }
    return null;
  }, [smoothieOptions.preselectedSmoothieId, smoothieOptions.smoothies]);

  const [selectedSmoothie, setSelectedSmoothie] = useState<Product | null>(
    preselectedSmoothie,
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [expandedSmoothies, setExpandedSmoothies] = useState(!preselectedSmoothie);
  const [expandedToppings, setExpandedToppings] = useState(!!preselectedSmoothie);

  // Usar servicios para cálculos
  const nutrition = SmoothieBowlService.calculateNutrition(
    selectedSmoothie,
    selectedToppings,
  );
  const totalPrice = SmoothieBowlService.calculateTotalPrice(
    selectedSmoothie,
    selectedToppings,
  );
  const maxToppings = SmoothieBowlService.getMaxToppings();
  const toppingsFull = !SmoothieBowlService.canSelectMoreToppings(
    selectedToppings,
  );
  const missingToppings =
    SmoothieBowlService.getMissingToppingsCount(selectedToppings);

  const handleOrderClick = () => {
    const validation = SmoothieBowlService.validateBowlRequirements(
      selectedSmoothie,
      selectedToppings,
    );

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    if (!selectedSmoothie) return;

    const bowlData = SmoothieBowlService.createBowlOrderData(
      selectedSmoothie,
      selectedToppings,
    );

    // Guardar en localStorage
    localStorage.setItem("bowlOrder", JSON.stringify(bowlData));

    // Agregar al carrito
    const bowlProduct = SmoothieBowlService.createBowlProduct(
      selectedSmoothie,
      selectedToppings,
    );

    addItem(bowlProduct, 1);

    // Navegar al checkout
    router.push("/checkout");
  };

  return (
    <div className="mb-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* LEFT PANEL - Description & Options */}
          <div className="p-8 lg:p-12 border-r border-gray-200 flex flex-col justify-between bg-linear-to-b from-white to-gray-50">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-3">
                Smoothie<span className="text-[#9CB973]">Bowl</span>
              </h2>

              <p className="text-gray-600 text-sm mb-8">
                Elige uno de nuestros deliciosos smoothie bowls predefinidos y
                personaliza con hasta 5 toppings adicionales. Refrescante,
                nutritivo y delicioso en cada cucharada.
              </p>

              {/* Smoothies Selection */}
              <div className="space-y-4 mb-8">
                <div>
                  <button
                    onClick={() => setExpandedSmoothies(!expandedSmoothies)}
                    className="w-full flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9CB973] hover:bg-[#9CB973]/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥣</span>
                      <div>
                        <span className="font-bold text-[#5D4E37] group-hover:text-[#6B8E4E] block">
                          Mi Smoothie
                        </span>
                        <span className="text-xs text-gray-500">
                          {selectedSmoothie
                            ? selectedSmoothie.name
                            : "Selecciona uno"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[#9CB973] text-lg font-bold">
                      {expandedSmoothies ? "−" : "+"}
                    </span>
                  </button>

                  {expandedSmoothies && (
                    <div className="mt-2 p-4 bg-white border-2 border-[#9CB973] rounded-xl">
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {smoothieOptions.smoothies.map((smoothie) => {
                          const isSelected =
                            selectedSmoothie?.id === smoothie.id;

                          return (
                            <label
                              key={smoothie.id}
                              className="flex items-start gap-3 p-3 cursor-pointer group rounded-lg hover:bg-gray-50 border border-transparent"
                            >
                              <input
                                type="radio"
                                name="smoothie"
                                checked={isSelected}
                                onChange={() => setSelectedSmoothie(smoothie)}
                                className="w-4 h-4 mt-1 cursor-pointer accent-[#9CB973]"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-bold text-[#5D4E37] group-hover:text-[#6B8E4E]">
                                  {smoothie.name}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {smoothie.description}
                                </p>
                                <p className="text-sm font-semibold text-[#9CB973] mt-2">
                                  S/ {smoothie.price.toFixed(2)}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Toppings Selection */}
                <div>
                  <button
                    onClick={() => setExpandedToppings(!expandedToppings)}
                    className="w-full flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9CB973] hover:bg-[#9CB973]/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍓</span>
                      <div>
                        <span className="font-bold text-[#5D4E37] group-hover:text-[#6B8E4E] block">
                          Toppings Adicionales
                        </span>
                        <span className="text-xs text-gray-500">
                          {selectedToppings.length}/{maxToppings}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {toppingsFull && (
                        <span className="bg-[#9CB973] text-white text-xs font-bold px-2 py-1 rounded-full">
                          Máximo
                        </span>
                      )}
                      <span className="text-[#9CB973] text-lg font-bold">
                        {expandedToppings ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {expandedToppings && (
                    <div className="mt-2 p-4 bg-white border-2 border-[#9CB973] rounded-xl">
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {smoothieOptions.toppings.map((topping) => {
                          const isSelected = selectedToppings.includes(topping);
                          const canSelect =
                            SmoothieBowlService.canSelectTopping(
                              selectedToppings,
                              topping,
                            );

                          return (
                            <label
                              key={topping}
                              className={`flex items-center gap-3 p-2 cursor-pointer group rounded-lg ${
                                canSelect
                                  ? "hover:bg-gray-50"
                                  : "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  setSelectedToppings((prev) =>
                                    isSelected
                                      ? prev.filter((t) => t !== topping)
                                      : [...prev, topping],
                                  );
                                }}
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
                                {topping}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#9CB973]/10 border-2 border-[#9CB973] rounded-xl p-4 text-center">
              <p className="text-sm text-[#5D4E37] font-bold mb-2">
                {selectedSmoothie
                  ? `✓ ${selectedSmoothie.name}${selectedToppings.length > 0 ? ` + ${selectedToppings.length} toppings` : ""}`
                  : "✨ Selecciona un smoothie"}
              </p>
              <p className="text-xs text-gray-600 mb-3">
                {missingToppings > 0 &&
                  `Falta seleccionar ${missingToppings} topping${missingToppings !== 1 ? "s" : ""}`}
              </p>
              <p className="text-lg font-bold text-[#6B8E4E] mb-3">
                S/ {totalPrice.toFixed(2)}
              </p>
              <button
                onClick={handleOrderClick}
                disabled={!selectedSmoothie || missingToppings > 0}
                className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                  selectedSmoothie && missingToppings === 0
                    ? "bg-[#9CB973] text-white hover:bg-[#6B8E4E] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                🛒 Ir al Checkout
              </button>
            </div>
          </div>

          {/* CENTER PANEL - Visual */}
          <div className="relative overflow-hidden bg-linear-to-br from-white via-[#F9FBFA] to-[#9CB973]/10 flex flex-col items-center justify-center p-8 lg:p-12 min-h-150">
            {/* Decorative Elements */}
            <div className="absolute top-10 right-20 w-80 h-80 bg-linear-to-br from-[#9CB973]/20 to-[#6B8E4E]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-linear-to-tr from-[#6B8E4E]/15 to-[#9CB973]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Clean Area for Future Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#5D4E37] mb-2">🥣</p>
                <h3 className="text-2xl font-bold text-[#5D4E37] mb-4">
                  Crea tu Smoothie Bowl
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Selecciona tu smoothie favorito y personaliza con toppings en
                  el panel izquierdo para una experiencia única
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Nutritional Facts */}
          <div className="p-8 lg:p-12 border-l border-gray-200 bg-linear-to-b from-gray-50 to-white flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-6">
                Información Nutricional
              </p>

              <h3 className="text-xl font-bold text-[#5D4E37] mb-8 uppercase tracking-wider">
                Tu Smoothie Bowl
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

              {(selectedSmoothie || selectedToppings.length > 0) && (
                <div className="bg-[#9CB973]/10 rounded-lg p-4 mb-8 border border-[#9CB973]/20">
                  <p className="text-xs text-[#5D4E37] font-bold mb-3">
                    📋 MI SMOOTHIE BOWL
                  </p>
                  <div className="space-y-2 text-xs text-gray-600">
                    {selectedSmoothie && (
                      <p>
                        <span className="font-semibold">Smoothie:</span>{" "}
                        {selectedSmoothie.name}
                      </p>
                    )}
                    {selectedToppings.length > 0 && (
                      <p>
                        <span className="font-semibold">
                          Toppings ({selectedToppings.length}):
                        </span>{" "}
                        {selectedToppings.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-[#F5F5F5] rounded-lg p-4 mb-8">
                <p className="text-xs text-gray-600 font-semibold">
                  ✨ VARIEDADES
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Todos nuestros smoothie bowls son elaborados con frutas
                  frescas de la más alta calidad.
                </p>
              </div>
            </div>

            <div className="bg-[#9CB973]/10 border-2 border-[#9CB973] rounded-lg p-4 text-center">
              <p className="text-xs text-[#5D4E37] font-bold mb-2">
                💚 OPCIONES PRÉMIUM
              </p>
              <p className="text-xs text-gray-600">
                Mantequilla de maní y Nibs de cacao (+2 soles)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
