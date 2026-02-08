'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface SmoothieBowlBuilderProps {
  smoothieOptions: {
    smoothies: Product[];
    toppings: string[];
  };
}

interface NutritionInfo {
  kcal: number;
  proteina: number;
  carbos: number;
  fibra: number;
}

const nutritionData: { [key: string]: { [item: string]: NutritionInfo } } = {
  smoothies: {
    'Chocopower': { kcal: 280, proteina: 12, carbos: 35, fibra: 4 },
    'Mango Bowl': { kcal: 250, proteina: 8, carbos: 48, fibra: 3 },
    'Berry Bowl': { kcal: 240, proteina: 10, carbos: 42, fibra: 5 },
    'Green Bowl': { kcal: 220, proteina: 9, carbos: 40, fibra: 4 },
    'Açaí Original': { kcal: 300, proteina: 11, carbos: 45, fibra: 6 },
    'Açaí Tropical': { kcal: 310, proteina: 10, carbos: 48, fibra: 5 },
    'La Dragona': { kcal: 260, proteina: 9, carbos: 44, fibra: 4 },
    'Butterfly Bowl': { kcal: 270, proteina: 10, carbos: 43, fibra: 5 },
    'Blue Sky': { kcal: 290, proteina: 14, carbos: 42, fibra: 6 },
  },
  toppings: {
    'Fresa': { kcal: 16, proteina: 0.4, carbos: 3.9, fibra: 0.8 },
    'Plátano': { kcal: 27, proteina: 0.3, carbos: 7, fibra: 0.8 },
    'Arándanos': { kcal: 14, proteina: 0.2, carbos: 3.6, fibra: 0.7 },
    'Kiwi': { kcal: 19, proteina: 0.3, carbos: 4.5, fibra: 0.8 },
    'Aguaymanto': { kcal: 22, proteina: 0.2, carbos: 5, fibra: 1.2 },
    'Coco rallado': { kcal: 56, proteina: 0.5, carbos: 2.3, fibra: 1.5 },
    'Kiwicha pop': { kcal: 40, proteina: 1.5, carbos: 6, fibra: 0.5 },
    'Chía': { kcal: 42, proteina: 1.5, carbos: 3.5, fibra: 2.8 },
    'Piña': { kcal: 14, proteina: 0.1, carbos: 3.5, fibra: 0.4 },
    'Mango': { kcal: 25, proteina: 0.4, carbos: 6, fibra: 0.7 },
    'Granola': { kcal: 68, proteina: 2, carbos: 10, fibra: 1.2 },
    'Mantequilla de maní (+2)': { kcal: 95, proteina: 4, carbos: 4, fibra: 1.3 },
    'Nibs de cacao (+2)': { kcal: 56, proteina: 1, carbos: 5, fibra: 2 },
  },
};

const getAdditionalPrice = (item: string): number => {
  if (item === 'Mantequilla de maní (+2)' || item === 'Nibs de cacao (+2)') {
    return 2;
  }
  return 0;
};

export default function SmoothieBowlBuilder({ smoothieOptions }: SmoothieBowlBuilderProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSmoothie, setSelectedSmoothie] = useState<Product | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [expandedSmoothies, setExpandedSmoothies] = useState(true);
  const [expandedToppings, setExpandedToppings] = useState(false);

  const calculateNutrition = (): NutritionInfo => {
    const total: NutritionInfo = { kcal: 0, proteina: 0, carbos: 0, fibra: 0 };

    // Agregar nutrición del smoothie base
    if (selectedSmoothie) {
      const smoothieNutrition = nutritionData.smoothies?.[selectedSmoothie.name];
      if (smoothieNutrition) {
        total.kcal += smoothieNutrition.kcal;
        total.proteina += smoothieNutrition.proteina;
        total.carbos += smoothieNutrition.carbos;
        total.fibra += smoothieNutrition.fibra;
      }
    }

    // Agregar nutrición de los toppings
    selectedToppings.forEach((topping) => {
      const nutrition = nutritionData.toppings?.[topping];
      if (nutrition) {
        total.kcal += nutrition.kcal;
        total.proteina += nutrition.proteina;
        total.carbos += nutrition.carbos;
        total.fibra += nutrition.fibra;
      }
    });

    return total;
  };

  const nutrition = calculateNutrition();

  const calculateTotalPrice = (): number => {
    if (!selectedSmoothie) return 0;
    let price = selectedSmoothie.price;
    selectedToppings.forEach((topping) => {
      price += getAdditionalPrice(topping);
    });
    return price;
  };

  const generateWhatsAppMessage = (): string => {
    const smoothieName = selectedSmoothie?.name || 'No seleccionado';
    const toppings = selectedToppings.join(', ') || 'Ninguno';

    return `🥣 *SMOOTHIE BOWL PEDIDO*\n\n` +
      `🍓 *Smoothie:* ${smoothieName}\n` +
      `🥬 *Toppings Adicionales:* ${toppings}`;
  };

  const handleOrderClick = () => {
    if (!selectedSmoothie) {
      alert('Por favor selecciona un smoothie');
      return;
    }

    const totalPrice = calculateTotalPrice();
    const bowlData = {
      type: 'smoothiebowl',
      smoothieId: selectedSmoothie.id,
      smoothieName: selectedSmoothie.name,
      toppings: selectedToppings,
      nutrition: calculateNutrition(),
      message: generateWhatsAppMessage(),
    };

    // Guardar en localStorage
    localStorage.setItem('bowlOrder', JSON.stringify(bowlData));

    // Agregar al carrito
    const bowlProduct = {
      id: `smoothie-bowl-${Date.now()}`,
      name: selectedSmoothie.name,
      description: selectedToppings.length > 0 
        ? `${selectedSmoothie.description} + Toppings: ${selectedToppings.join(', ')}`
        : selectedSmoothie.description,
      price: totalPrice,
      image: selectedSmoothie.image,
      category: 'smoothie-bowl' as const,
      ingredients: [...selectedSmoothie.ingredients, ...selectedToppings],
    };

    addItem(bowlProduct, 1);

    // Navegar al checkout
    router.push('/checkout');
  };

  const maxToppings = 5;
  const toppingsFull = selectedToppings.length >= maxToppings;

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
              
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Elige uno de nuestros deliciosos smoothie bowls predefinidos 
                y personaliza con hasta 5 toppings adicionales. Refrescante, 
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
                          {selectedSmoothie ? selectedSmoothie.name : 'Selecciona uno'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[#9CB973] text-lg font-bold">
                      {expandedSmoothies ? '−' : '+'}
                    </span>
                  </button>

                  {expandedSmoothies && (
                    <div className="mt-2 p-4 bg-white border-2 border-[#9CB973] rounded-xl">
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {smoothieOptions.smoothies.map((smoothie) => {
                          const isSelected = selectedSmoothie?.id === smoothie.id;

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
                        {expandedToppings ? '−' : '+'}
                      </span>
                    </div>
                  </button>

                  {expandedToppings && (
                    <div className="mt-2 p-4 bg-white border-2 border-[#9CB973] rounded-xl">
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {smoothieOptions.toppings.map((topping) => {
                          const isSelected = selectedToppings.includes(topping);
                          const canSelect = isSelected || !toppingsFull;
                          const additionalPrice = getAdditionalPrice(topping);

                          return (
                            <label
                              key={topping}
                              className={`flex items-center gap-3 p-2 cursor-pointer group rounded-lg ${
                                canSelect ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  setSelectedToppings((prev) =>
                                    isSelected
                                      ? prev.filter((t) => t !== topping)
                                      : [...prev, topping]
                                  );
                                }}
                                disabled={!canSelect}
                                className="w-4 h-4 cursor-pointer accent-[#9CB973] disabled:cursor-not-allowed"
                              />
                              <span className={`text-sm flex-1 font-medium ${
                                canSelect ? 'text-gray-700 group-hover:text-[#6B8E4E]' : 'text-gray-400'
                              }`}>
                                {topping}
                              </span>
                              {additionalPrice > 0 && (
                                <span className="text-xs text-[#9CB973] font-bold whitespace-nowrap">
                                  +S/ {additionalPrice}
                                </span>
                              )}
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
                  ? `✓ ${selectedSmoothie.name}${selectedToppings.length > 0 ? ` + ${selectedToppings.length} toppings` : ''}`
                  : '✨ Selecciona un smoothie'}
              </p>
              <p className="text-lg font-bold text-[#6B8E4E] mb-3">
                S/ {calculateTotalPrice().toFixed(2)}
              </p>
              <button
                onClick={handleOrderClick}
                disabled={!selectedSmoothie}
                className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                  selectedSmoothie
                    ? 'bg-[#9CB973] text-white hover:bg-[#6B8E4E] cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Ir al Checkout
              </button>
            </div>
          </div>

          {/* CENTER PANEL - Visual */}
          <div className="p-8 lg:p-12 flex flex-col items-center justify-center bg-linear-to-b from-white via-[#9CB973]/5 to-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-br from-[#9CB973] to-[#6B8E4E] rounded-full blur-2xl opacity-20"></div>
                <Image 
                  src="/images/smoothie-bowl.jpg" 
                  alt="Smoothie Bowl" 
                  width={256}
                  height={256}
                  className="w-full h-full object-cover rounded-full filter drop-shadow-2xl animate-pulse"
                />
              </div>
            </div>

            <div className="mt-8 text-center z-10">
              <p className={`text-sm font-semibold ${selectedSmoothie ? 'text-[#6B8E4E]' : 'text-gray-600'}`}>
                {selectedSmoothie ? `✓ ${selectedSmoothie.name}` : 'Selecciona un smoothie'}
              </p>
              <p className={`text-sm font-semibold mt-1 ${selectedToppings.length > 0 ? 'text-[#6B8E4E]' : 'text-gray-600'}`}>
                {selectedToppings.length > 0 ? `✓ ${selectedToppings.length} toppings adicionales` : 'Sin toppings adicionales'}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL - Nutritional Facts */}
          <div className="p-8 lg:p-12 border-l border-gray-200 bg-linear-to-b from-gray-50 to-white flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-6">Información Nutricional</p>
              
              <h3 className="text-xl font-bold text-[#5D4E37] mb-8 uppercase tracking-wider">
                Tu Smoothie Bowl
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                  nutrition.kcal > 0 ? 'border-[#9CB973] hover:shadow-lg' : 'border-gray-200'
                }`}>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Energía</p>
                  <p className="text-2xl font-bold text-[#5D4E37]">{Math.round(nutrition.kcal)}</p>
                  <p className="text-xs text-gray-500 mt-1">kcal</p>
                </div>

                <div className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                  nutrition.proteina > 0 ? 'border-[#9CB973] hover:shadow-lg' : 'border-gray-200'
                }`}>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Proteína</p>
                  <p className="text-2xl font-bold text-[#5D4E37]">{Math.round(nutrition.proteina)}</p>
                  <p className="text-xs text-gray-500 mt-1">g</p>
                </div>

                <div className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                  nutrition.carbos > 0 ? 'border-[#9CB973] hover:shadow-lg' : 'border-gray-200'
                }`}>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Carbohidratos</p>
                  <p className="text-2xl font-bold text-[#5D4E37]">{Math.round(nutrition.carbos)}</p>
                  <p className="text-xs text-gray-500 mt-1">g</p>
                </div>

                <div className={`bg-white border-2 rounded-lg p-4 text-center transition-all ${
                  nutrition.fibra > 0 ? 'border-[#9CB973] hover:shadow-lg' : 'border-gray-200'
                }`}>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Fibra</p>
                  <p className="text-2xl font-bold text-[#5D4E37]">{Math.round(nutrition.fibra * 10) / 10}</p>
                  <p className="text-xs text-gray-500 mt-1">g</p>
                </div>
              </div>

              {(selectedSmoothie || selectedToppings.length > 0) && (
                <div className="bg-[#9CB973]/10 rounded-lg p-4 mb-8 border border-[#9CB973]/20">
                  <p className="text-xs text-[#5D4E37] font-bold mb-3">📋 MI SMOOTHIE BOWL</p>
                  <div className="space-y-2 text-xs text-gray-600">
                    {selectedSmoothie && (
                      <p><span className="font-semibold">Smoothie:</span> {selectedSmoothie.name}</p>
                    )}
                    {selectedToppings.length > 0 && (
                      <p><span className="font-semibold">Toppings ({selectedToppings.length}):</span> {selectedToppings.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-[#F5F5F5] rounded-lg p-4 mb-8">
                <p className="text-xs text-gray-600 font-semibold">✨ VARIEDADES</p>
                <p className="text-sm text-gray-500 mt-2">
                  Todos nuestros smoothie bowls son elaborados con frutas frescas de la más alta calidad.
                </p>
              </div>
            </div>

            <div className="bg-[#9CB973]/10 border-2 border-[#9CB973] rounded-lg p-4 text-center">
              <p className="text-xs text-[#5D4E37] font-bold mb-2">💚 OPCIONES PRÉMIUM</p>
              <p className="text-xs text-gray-600">Mantequilla de maní y Nibs de cacao (+2 soles)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
