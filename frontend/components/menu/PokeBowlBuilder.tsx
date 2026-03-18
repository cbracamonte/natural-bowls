"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PokeBowlService, SelectedBowlItems } from "@/lib/services";
import { POKEBOWLS_CATEGORY_LABELS } from "@/data/poke-bowl-nutrition-data";
import { PokeBowlBuilderProps } from "@/lib/schemas";


export default function PokeBowlBuilder({ pokeOptions }: PokeBowlBuilderProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedItems, setSelectedItems] = useState<SelectedBowlItems>({});
  const defaultExpanded: Record<string, boolean> = {
    bases: true,
    proteinas: false,
    extraProteinas: false,
    toppings: false,
    agregados: false,
    salsas: false,
  };

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(defaultExpanded);
  const [tamaño, setTamaño] = useState<"regular" | "grande">(
    pokeOptions.preselectedSize || "regular"
  );
  const [cantidad, setCantidad] = useState<number>(1);

  // Usar datos del servicio
  const limits = PokeBowlService.getLimits(tamaño);
  const nutrition = PokeBowlService.calculateNutrition(selectedItems, tamaño);
  const totalPrice = PokeBowlService.calculateTotalPrice(selectedItems, tamaño);
  const totalSelected = Object.values(selectedItems).reduce((sum, arr) => sum + arr.length, 0);

  // Handlers de UI
  const toggleItem = (category: string, item: string) => {
    setSelectedItems((prev) => {
      const current = prev[category] || [];

      if (current.includes(item)) {
        return { ...prev, [category]: current.filter((i) => i !== item) };
      }

      const limit = limits[category];
      const newState = { ...prev };

      if (current.length < limit) {
        newState[category] = [...current, item];
      } else if (limit === 1) {
        newState[category] = [item];
      } else {
        return prev;
      }

      // Si cambia la proteína, limpiar extraProteinas
      if (category === "proteinas") {
        newState.extraProteinas = [];
      }

      return newState;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // reset if user navigates via hash to smoothie section or other
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#smoothie-bowls") {
        setSelectedItems({});
        setTamaño(pokeOptions.preselectedSize || "regular");
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pokeOptions.preselectedSize]);

  /**
   * Add current bowl and navigate according to action:
   *  - "menu": back to menu page
   *  - "smoothie": scroll to smoothie section on same /bowls page
   *  - "checkout": go to checkout
   */
  const handleAddToCart = (action: string) => {
    const validation = PokeBowlService.validateBowlRequirements(selectedItems, tamaño);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    const bowlProduct = PokeBowlService.createBowlProduct(selectedItems, tamaño);
    addItem(bowlProduct, cantidad);

    // clear selections after adding; include empty arrays to uncheck all boxes
    setSelectedItems({
      bases: [],
      proteinas: [],
      extraProteinas: [],
      toppings: [],
      agregados: [],
      salsas: [],
    });
    setCantidad(1);
    setTamaño(pokeOptions.preselectedSize || "regular");
    setExpandedCategories(defaultExpanded);

    if (action === "smoothie") {
      router.push("/bowls#smoothie-bowls");
      setTimeout(() => {
        const el = document.getElementById("smoothie-bowls");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (action === "checkout") {
      router.push("/checkout");
    } else if (action === "stay") {
      // scroll back to the poke header so user resumes at top of builder
      const el = document.getElementById("poke-bowl-title");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    // other actions do nothing
  };

  const getDisplayItems = (category: string): string[] => {
    if (category === "extraProteinas") {
      return PokeBowlService.getFilteredExtraProteinas(selectedItems.proteinas?.[0]);
    }
    const value = pokeOptions[category as keyof typeof pokeOptions];
    return Array.isArray(value) ? value : [];
  };

  const getValidationMessages = () => {
    const messages: string[] = [];
    if (!selectedItems.bases?.length) messages.push("Base");
    if (!selectedItems.proteinas?.length) messages.push("Proteína");
    if ((selectedItems.toppings?.length || 0) < limits.toppings) {
      messages.push(`${limits.toppings - (selectedItems.toppings?.length || 0)} topping${limits.toppings - (selectedItems.toppings?.length || 0) !== 1 ? "s" : ""}`);
    }
    if ((selectedItems.agregados?.length || 0) < limits.agregados) {
      messages.push(`${limits.agregados - (selectedItems.agregados?.length || 0)} agregado${limits.agregados - (selectedItems.agregados?.length || 0) !== 1 ? "s" : ""}`);
    }
    if (selectedItems.salsas?.length !== limits.salsas) {
      messages.push(`${limits.salsas - (selectedItems.salsas?.length || 0)} salsa${limits.salsas - (selectedItems.salsas?.length || 0) !== 1 ? "s" : ""}`);
    }
    return messages;
  };

  const validationMessages = getValidationMessages();
  const isFormValid = validationMessages.length === 0;

  return (
    <div className="mb-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* LEFT PANEL - Description & Options */}
          <div className="p-8 lg:p-12 border-r border-gray-200 flex flex-col justify-between bg-linear-to-b from-white to-gray-50">
            <div>
              <h2 id="poke-bowl-title" className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-3">
                Poke<span className="text-[#9CB973]">Bowl</span>
              </h2>

              <p className="text-gray-600 text-sm mb-8">
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
                {Object.entries(POKEBOWLS_CATEGORY_LABELS).map(
                  ([key, { label, emoji }]) => {
                    const isExpanded = expandedCategories[key];
                    const count = selectedItems[key]?.length || 0;
                    const isFull = PokeBowlService.isCategoryFull(selectedItems, key, limits);
                    const isOptional = key === "extraProteinas";
                    const displayItems = getDisplayItems(key);

                    return (
                      <div
                        key={key}
                        className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${
                          isExpanded
                            ? "border-[#9CB973]"
                            : "border-gray-200 hover:border-[#9CB973] hover:bg-[#9CB973]/5"
                        }`}
                      >
                        <button
                          onClick={() => toggleCategory(key)}
                          className="w-full flex items-center justify-between p-3 text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{emoji}</span>
                            <div>
                              <span className="font-bold text-[#5D4E37] group-hover:text-[#6B8E4E] block">
                                {label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {count}/{limits[key]}
                                {isOptional && " (Opcional)"}
                                {isOptional && !selectedItems.proteinas?.length && (
                                  <span className="text-gray-400 ml-1">- Selecciona proteína</span>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isFull && !(key === "extraProteinas" && !selectedItems.proteinas?.length) && (
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
                          <div className="border-t border-[#9CB973] p-4">
                            {key === "extraProteinas" && !selectedItems.proteinas?.length ? (
                              <p className="text-sm text-gray-500 text-center py-6">
                                Selecciona una proteína base para ver opciones disponibles
                              </p>
                            ) : key === "extraProteinas" && displayItems.length === 0 ? (
                              <p className="text-sm text-gray-500 text-center py-6">
                                No hay proteína extra disponible para {selectedItems.proteinas?.[0]}
                              </p>
                            ) : (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {displayItems.map((item) => {
                                  const isSelected = selectedItems[key]?.includes(item);
                                  const canSelect = PokeBowlService.canSelectItem(
                                    selectedItems,
                                    key,
                                    item,
                                    limits,
                                  );

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
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>

              <div className="group bg-white border border-transparent rounded-xl p-4 mb-6 hover:border-[#9CB973] hover:border-2 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide font-semibold text-[#5D4E37] mb-1 group-hover:text-[#9CB973]">
                      CANTIDAD DE BOWLS
                    </p>
                    <p className="text-sm text-gray-600">Elige cuántos bowls quieres agregar al carrito.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg border border-[#9CB973] text-[#5D4E37] font-bold hover:bg-[#F0F7EA] transition-all"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={cantidad}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        if (!Number.isNaN(next)) {
                          setCantidad(Math.max(1, Math.min(10, next)));
                        }
                      }}
                      className="w-16 text-center border border-gray-300 rounded-lg p-1 text-sm appearance-none outline-none"
                      style={{ MozAppearance: "textfield", WebkitAppearance: "none", appearance: "none" }}
                    />
                    <button
                      type="button"
                      onClick={() => setCantidad((prev) => Math.min(10, prev + 1))}
                      className="w-8 h-8 rounded-lg border border-[#9CB973] text-[#5D4E37] font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Cantidad mínima 1, máxima 10</p>
              </div>
            </div>

            <div className="bg-[#9CB973]/10 border-2 border-[#9CB973] rounded-xl p-4 text-center">
              <p className="text-sm text-[#5D4E37] font-bold mb-2">
                {totalSelected === 0
                  ? "✨ Comienza a construir tu bowl"
                  : `🎯 ${totalSelected} ingredientes seleccionados`}
              </p>
              {selectedItems.bases?.length &&
                selectedItems.proteinas?.length &&
                totalPrice > 0 && (
                  <p className="text-lg font-bold text-[#6B8E4E] mb-3">
                    S/ {totalPrice.toFixed(2)}
                  </p>
                )}
              <div className="text-xs text-gray-600 mb-2 space-y-1">
                {validationMessages.map((msg, idx) => (
                  <p key={idx}>• Falta: {msg}</p>
                ))}
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleAddToCart("stay")}
                  disabled={!isFormValid}
                  className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                    isFormValid
                      ? "bg-[#6B8E4E] text-white hover:bg-[#5D7A42] cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  ✅ Seguir comprando
                </button>
                <button
                  onClick={() => handleAddToCart("smoothie")}
                  disabled={!isFormValid}
                  className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                    isFormValid
                      ? "bg-[#4A90E2] text-white hover:bg-[#357ABD] cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  🥣 Escoger SmoothieBowl
                </button>
                <button
                  onClick={() => handleAddToCart("checkout")}
                  disabled={!isFormValid}
                  className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                    isFormValid
                      ? "bg-[#9CB973] text-white hover:bg-[#6B8E4E] cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  🛒 Ir al Checkout
                </button>
              </div>
            </div>
          </div>

          {/* CENTER PANEL - Visual (tablet y desktop únicamente) */}
          <div className="hidden lg:flex relative overflow-hidden bg-white flex-col items-center justify-center p-8 lg:p-12 min-h-150">

            {/* Clean Area for Future Content */}
            <div className="relative z-10 w-full min-h-120 lg:min-h-140 xl:min-h-160">
              <Image
                src="/videos/pokebowl-3.gif"
                alt="Poke Bowl animado"
                fill
                unoptimized
                className="object-contain select-none pointer-events-none scale-200"
                draggable={false}
              />
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
                    {selectedItems.extraProteinas &&
                      selectedItems.extraProteinas.length > 0 && (
                        <p>
                          <span className="font-semibold">
                            Proteína Extra:
                          </span>{" "}
                          {selectedItems.extraProteinas.join(", ")}
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
