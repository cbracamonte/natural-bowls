"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/utils";
import { SITE_CONFIG } from "@/lib/seo/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface BowlOrder {
  type: "pokebowl" | "smoothiebowl";
  tamaño?: string;
  base?: string;
  proteina?: string;
  toppings?: string[];
  agregados?: string[];
  salsas?: string[];
  nutrition?: {
    kcal: number;
    proteina: number;
    carbos: number;
    fibra: number;
  };
  message?: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [bowlOrder] = useState<BowlOrder | null>(() => {
    // Inicializar con datos del bowl de localStorage
    const savedBowlOrder = localStorage.getItem("bowlOrder");
    if (savedBowlOrder) {
      try {
        return JSON.parse(savedBowlOrder);
      } catch (error) {
        console.error("Error parsing bowl order:", error);
        return null;
      }
    }
    return null;
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: (() => {
      // Si existe código descuento generado, auto-llenar con el teléfono del modal
      if (typeof window !== "undefined") {
        const savedPhone = localStorage.getItem("firstOrderPhone");
        return savedPhone || "";
      }
      return "";
    })(),
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [discountCode, setDiscountCode] = useState("");
  const [discountValidated, setDiscountValidated] = useState(false);
  const [discountError, setDiscountError] = useState("");

  // Validar código de descuento con seguridad mejorada
  const validateDiscountCode = (code: string) => {
    setDiscountError("");

    const inputCode = code.trim().toUpperCase();
    const savedCode = localStorage.getItem("firstOrderCode");
    const savedPhone = localStorage.getItem("firstOrderPhone");
    const codeCreatedAt = localStorage.getItem("firstOrderCodeTime");
    const codeUsed = localStorage.getItem("firstOrderCodeUsed");

    // 1. Validar que exista un código guardado
    if (!savedCode) {
      setDiscountError("No hay código disponible. Genera uno primero.");
      return false;
    }

    // 2. Validar que el código sea 'NB15'
    if (inputCode !== "NB15") {
      setDiscountError("Código de descuento inválido");
      return false;
    }

    // 3. Obtener el teléfono: del checkout si está ingresado, o del guardado
    let phoneToValidate = formData.phone.replace(/\D/g, "");
    if (!phoneToValidate && savedPhone) {
      // Si no hay teléfono en checkout pero existe uno guardado, usarlo
      phoneToValidate = savedPhone;
    }

    if (!phoneToValidate) {
      setDiscountError("Por favor ingresa tu teléfono para validar el código");
      return false;
    }

    // 4. Validar que el teléfono coincida con el que generó el código
    if (phoneToValidate !== savedPhone) {
      setDiscountError(
        `Teléfono no coincide. Usaste ${savedPhone} para generar el código.`,
      );
      return false;
    }

    // 5. Validar que no haya expirado (7 días)
    if (codeCreatedAt) {
      const createdDate = new Date(codeCreatedAt);
      const expirationDate = new Date(
        createdDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      if (new Date() > expirationDate) {
        setDiscountError("El código de descuento ha expirado (7 días)");
        return false;
      }
    }

    // 6. Validar que no haya sido usado ya
    if (codeUsed === "true") {
      setDiscountError("Este código de descuento ya fue utilizado");
      return false;
    }

    setDiscountValidated(true);
    setDiscountError("");
    return true;
  };

  const handleCodeChange = (code: string) => {
    setDiscountCode(code);
    if (discountValidated) {
      setDiscountValidated(false);
    }
  };

  const handleValidateCode = () => {
    if (discountCode.trim()) {
      validateDiscountCode(discountCode);
    } else {
      setDiscountError("Ingresa un código de descuento");
    }
  };

  // Calcular descuento (15% si es válido)
  const discountPercentage = discountValidated ? 0.15 : 0;
  const discountAmount = total * discountPercentage;
  const finalTotal = total - discountAmount;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Teléfono inválido (9 dígitos)";
    }
    if (!formData.address.trim())
      newErrors.address = "La dirección es requerida";
    if (!formData.city.trim()) newErrors.city = "La ciudad es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const whatsappNumber = SITE_CONFIG.phone.replace(/\D/g, "");

    let message = "";
    let bowlText = "";
    let itemsText = "";

    // Agregar bowl personalizado si existe
    if (bowlOrder) {
      bowlText = `🍽️ *BOWL PERSONALIZADO*\n${bowlOrder.message}\n`;
    }

    // Agregar items del carrito si existen
    if (items.length > 0) {
      itemsText = items
        .map((item, index) => {
          const lineTotal = item.price * item.quantity;
          return (
            `${index + 1}. ${item.name} x${item.quantity}\n` +
            `   ${formatPrice(item.price)} c/u - ${formatPrice(lineTotal)}`
          );
        })
        .join("\n");
    }

    const notesText = formData.notes.trim()
      ? `\n📝 Notas: ${formData.notes.trim()}`
      : "";

    const discountText = discountValidated
      ? `\n💰 Código validado: ${discountCode}\n📊 Descuento 15%: -${formatPrice(discountAmount)}`
      : "";

    message = [
      "Nuevo pedido - Natural Bowls",
      `Nombre: ${formData.name}`,
      `Telefono: ${formData.phone}`,
      `Direccion: ${formData.address}, ${formData.city}`,
      "",
      bowlText,
      items.length > 0 ? "Productos:" : "",
      itemsText,
      "",
      `Subtotal: ${formatPrice(total)}`,
      discountText,
      `Total: ${formatPrice(finalTotal)}`,
      "",
      notesText,
    ]
      .filter(Boolean)
      .join("\n");

    // Guardar mensaje pendiente y mostrar modal de confirmación
    setPendingMessage(message);
    setShowConfirmModal(true);
    setIsSubmitting(false);
  };

  const handleConfirmOrder = () => {
    const whatsappNumber = SITE_CONFIG.phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pendingMessage)}`;

    // Marcar como usado si el código fue validado
    if (discountValidated) {
      localStorage.setItem("firstOrderCodeUsed", "true");
    }

    // Limpiar carrito y orden de bowl
    clearCart();
    localStorage.removeItem("bowlOrder");

    // Cerrar modal y limpiar
    setShowConfirmModal(false);
    setPendingMessage("");

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Esperar un poco y luego regresar al menú
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (items.length === 0 && !bowlOrder) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No hay productos en tu carrito
          </h1>
          <Link href="/menu">
            <Button>Ver Menú</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal de confirmación - Portal style */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999 p-4 animate-in fade-in flex items-start md:items-center justify-center pt-16 md:pt-0 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] p-6 md:p-8 relative shadow-2xl border border-gray-200 animate-in zoom-in-95 flex flex-col my-auto">
            {/* Close button */}
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header - fijo */}
            <div className="text-center mb-6 shrink-0">
              <div className="flex justify-center items-center mb-3">
                <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Confirmar Pedido
              </h2>
              <p className="text-gray-600 text-sm">
                Revisa los detalles de tu pedido antes de enviar
              </p>
            </div>

            {/* Contenido scrollable */}
            <div className="overflow-y-auto flex-1 min-h-0 mb-6">
              {/* Pedido preview - scrollable */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <pre className="text-xs md:text-sm font-mono whitespace-pre-wrap break-words text-gray-700 leading-relaxed">
                  {pendingMessage}
                </pre>
              </div>
            </div>

            {/* Info sobre descuento - fijo */}
            {discountValidated && (
              <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-200 space-y-2 shrink-0">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900 mb-1">
                      ✓ Código NB15 aplicado (15% descuento)
                    </p>
                    <p className="text-green-800 text-xs">
                      Este código es de una sola vez. No podrá ser utilizado
                      en próximos pedidos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!discountValidated && (
              <div className="bg-orange-50 rounded-xl p-4 mb-4 border border-orange-200 shrink-0">
                <p className="text-xs md:text-sm text-orange-800">
                  <span className="font-semibold">Sin descuento aplicado</span>{" "}
                  - No se validó código de descuento para este pedido.
                </p>
              </div>
            )}

            {/* Botones de acción - fijo */}
            <div className="flex gap-3 shrink-0 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-3 bg-[#6B8E4E] text-white rounded-xl font-semibold hover:bg-[#5D7A42] transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Confirmar y Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-monstera-cream scroll-mt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link
            href="/carrito"
            className="flex items-center text-gray-600 hover:text-[#6B8E4E]-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al carrito
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Información de Contacto
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Nombre completo"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        placeholder="Tu nombre"
                      />
                    </div>

                    <Input
                      label="Telefono"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="912 341 818"
                      className="md:col-span-2"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Dirección de Entrega
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Dirección"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      placeholder="Calle, número, colonia"
                    />
                    <Input
                      label="Ciudad"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      placeholder="Ciudad"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notas de entrega (opcional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E4E]-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Instrucciones especiales para la entrega..."
                      />
                    </div>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    🎁 Código de Descuento
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    ¿Tienes un código de primer pedido? Ingrésalo para obtener
                    un descuento del 15%. (Solo para primeros pedidos)
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) =>
                          handleCodeChange(e.target.value.toUpperCase())
                        }
                        placeholder=""
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E4E]-500 focus:border-transparent uppercase font-mono"
                      />
                      {discountError && (
                        <p className="text-red-500 text-xs mt-1">
                          {discountError}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleValidateCode}
                      disabled={!discountCode.trim()}
                      className="px-4 py-2.5 bg-[#6B8E4E] text-white rounded-lg hover:bg-[#5D4E37] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium h-10 flex items-center gap-2"
                    >
                      {discountValidated ? (
                        <>
                          <Check className="w-4 h-4" />
                          Aplicado
                        </>
                      ) : (
                        "Validar"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Resumen del Pedido
                  </h2>

                  <div className="space-y-3 mb-4">
                    {/* Bowl Personalizado */}
                    {bowlOrder && (
                      <div className="pb-3 border-b space-y-2">
                        <p className="text-sm font-semibold text-[#5D4E37]">
                          {bowlOrder.type === "pokebowl"
                            ? "🍱 Poke Bowl"
                            : "🥣 Smoothie Bowl"}
                        </p>

                        {bowlOrder.tamaño && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Tamaño:</span>
                            <span className="font-medium capitalize">
                              {bowlOrder.tamaño}
                            </span>
                          </div>
                        )}

                        {bowlOrder.base && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Base:</span>
                            <span className="font-medium">
                              {bowlOrder.base}
                            </span>
                          </div>
                        )}

                        {bowlOrder.proteina && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Proteína:</span>
                            <span className="font-medium">
                              {bowlOrder.proteina}
                            </span>
                          </div>
                        )}

                        {bowlOrder.toppings &&
                          bowlOrder.toppings.length > 0 && (
                            <div className="text-xs">
                              <span className="text-gray-600">Toppings:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {bowlOrder.toppings.map((topping) => (
                                  <span
                                    key={topping}
                                    className="bg-[#9CB973]/10 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                                  >
                                    {topping}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {bowlOrder.agregados &&
                          bowlOrder.agregados.length > 0 && (
                            <div className="text-xs">
                              <span className="text-gray-600">Agregados:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {bowlOrder.agregados.map((agregado) => (
                                  <span
                                    key={agregado}
                                    className="bg-[#9CB973]/10 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                                  >
                                    {agregado}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {bowlOrder.salsas && bowlOrder.salsas.length > 0 && (
                          <div className="text-xs">
                            <span className="text-gray-600">Salsas:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {bowlOrder.salsas.map((salsa) => (
                                <span
                                  key={salsa}
                                  className="bg-[#9CB973]/10 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                                >
                                  {salsa}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Otros Productos */}
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(total)}</span>
                    </div>

                    {discountValidated && discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Descuento (15%)</span>
                        <span className="font-medium">
                          -{formatPrice(discountAmount)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-[#6B8E4E]-600">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Abriendo WhatsApp..."
                      : "Enviar pedido por WhatsApp"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
