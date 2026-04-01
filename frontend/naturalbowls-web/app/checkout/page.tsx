"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CheckoutService, DiscountCodeService } from "@/lib/services";
import { CheckoutFormData } from "@/lib/schemas";
import FirstOrderModal from "@/components/banners/FirstOrderModal";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

  

  const [formData, setFormData] = useState<CheckoutFormData>(() => {
    const initial: CheckoutFormData = {
      name: "",
      phone: CheckoutService.getPhoneFromStorage(),
      address: "",
      city: "",
      notes: "",
    };
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [discountCode, setDiscountCode] = useState("");
  const [discountValidated, setDiscountValidated] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const { discountAmount, finalTotal } = CheckoutService.calculateDiscount(
    total,
    discountValidated,
  );

  const handleValidateCode = async () => {
    if (!discountCode.trim()) {
      setDiscountError("Ingresa un código de descuento");
      return;
    }
    const result = await CheckoutService.validateDiscountCode(
      discountCode,
      formData.phone,
    );
    if (result.isValid) {
      setDiscountValidated(true);
      setDiscountError("");
    } else {
      setDiscountValidated(false);
      setDiscountError(result.error ?? "Código inválido");
    }
  };

  const handleCodeChange = (code: string) => {
    setDiscountCode(code);
    if (discountValidated) setDiscountValidated(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = CheckoutService.validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    const message = CheckoutService.buildWhatsAppMessage({
      formData,
      

      cartItems: items,
      total,
      discountValidated,
      discountCode,
      discountAmount,
      finalTotal,
    });

    setPendingMessage(message);
    setShowConfirmModal(true);
    setIsSubmitting(false);
  };

  const handleConfirmOrder = async () => {
    if (discountValidated) await CheckoutService.markDiscountAsUsed();

    clearCart();
    CheckoutService.clearOrderStorage();

    setShowConfirmModal(false);
    setPendingMessage("");

    window.open(
      CheckoutService.buildWhatsAppUrl(pendingMessage),
      "_blank",
      "noopener,noreferrer",
    );

    setTimeout(() => router.push("/"), 1000);
  };

  if (items.length === 0) {
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
      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999 p-4 animate-in fade-in flex items-start md:items-center justify-center pt-16 md:pt-0 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] p-6 md:p-8 relative shadow-2xl border border-gray-200 animate-in zoom-in-95 flex flex-col my-auto">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

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

            <div className="overflow-y-auto flex-1 min-h-0 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
              {items.map((item, idx) => {
                const cust = item.customizations || {};
                const hasCust = cust && Object.keys(cust).length > 0;
                return (
                  <div key={item.productId}>
                    {hasCust && (
                      <>
                        <div className="flex justify-between items-start gap-3 text-sm font-semibold">
                          <span>{item.name}</span>
                          <span className="shrink-0">
                            x{item.quantity} {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        {cust.tamaño && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Tamaño:</span>
                            <span className="font-medium capitalize">
                              {cust.tamaño}
                            </span>
                          </div>
                        )}
                        {cust.base && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Base:</span>
                            <span className="font-medium">
                              {cust.base}
                            </span>
                          </div>
                        )}
                        {cust.proteina && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Proteína:</span>
                            <span className="font-medium">
                              {cust.proteina}
                            </span>
                          </div>
                        )}
                        {['toppings', 'agregados', 'salsas'].map(
                          (key) =>
                            cust[key] && cust[key].length > 0 && (
                              <div key={key} className="text-xs">
                                <span className="text-gray-600 capitalize">
                                  {key}:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {cust[key].map((ing: string) => (
                                    <span
                                      key={ing}
                                      className="border border-[#9CB973]/50 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                                    >
                                      {ing}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ),
                        )}
                      </>
                    )}
                    {!hasCust && (
                      <div className="flex justify-between text-sm mt-1">
                        <span className="font-medium">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    )}
                    {idx < items.length - 1 && (
                      <hr className="border-gray-200 my-2" />
                    )}
                  </div>
                );
              })}
            </div>
            </div>

            {discountValidated && (
              <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-200 space-y-2 shrink-0">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900 mb-1">
                      ✓ Código NB15 aplicado (15% descuento)
                    </p>
                    <p className="text-green-800 text-xs">
                      Este código es de una sola vez. No podrá ser utilizado en
                      próximos pedidos.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
              {/* Formulario */}
              <div className="lg:col-span-2 space-y-6">
                {/* Información de contacto */}
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

                {/* Dirección de entrega */}
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

                {/* Info de delivery */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
                  <div className="text-2xl shrink-0">🛵</div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">
                      Delivery
                    </h3>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      El precio del delivery varía según tu ubicación y se
                      coordina a través de plataformas como{" "}
                      <span className="font-semibold">Rappi</span> o{" "}
                      <span className="font-semibold">PedidosYa</span>. Una vez
                      que recibamos tu pedido por WhatsApp, te informaremos el
                      costo exacto antes de confirmar el envío.
                    </p>
                  </div>
                </div>

                {/* Código de descuento */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E4E]-500 focus:border-transparent uppercase font-mono"
                      />
                      {discountError && (
                        <p className="text-red-500 text-xs mt-1">
                          {discountError === "NO_CODE_GENERATED" ? (
                            <>
                              No has generado tu código.{" "}
                              <button
                                type="button"
                                onClick={() => setShowGenerateModal(true)}
                                className="font-semibold text-[#6B8E4E] underline underline-offset-2 hover:text-[#5D7A42] transition-colors cursor-pointer"
                              >
                                Genera aquí
                              </button>
                            </>
                          ) : (
                            discountError
                          )}
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

              {/* Resumen del pedido */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Resumen del Pedido
                  </h2>

                          <div className="space-y-3 mb-4">
                    {items.map((item, idx) => {
                      const cust = item.customizations || {};
                      const hasCust =
                        cust && Object.keys(cust).length > 0;

                      return (
                        <div key={item.productId}>
                          {hasCust && (
                            <>
                              <div className="flex justify-between items-start gap-3 text-sm font-semibold">
                                <span>{item.name}</span>
                                <span className="shrink-0">
                                  x{item.quantity} {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                              {cust.tamaño && (
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Tamaño:</span>
                                  <span className="font-medium capitalize">
                                    {cust.tamaño}
                                  </span>
                                </div>
                              )}
                              {cust.base && (
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Base:</span>
                                  <span className="font-medium">
                                    {cust.base}
                                  </span>
                                </div>
                              )}
                              {cust.proteina && (
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Proteína:
                                  </span>
                                  <span className="font-medium">
                                    {cust.proteina}
                                  </span>
                                </div>
                              )}
                              {['toppings', 'agregados', 'salsas'].map(
                                (key) =>
                                  cust[key] && cust[key].length > 0 && (
                                    <div key={key} className="text-xs">
                                      <span className="text-gray-600 capitalize">
                                        {key}:
                                      </span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {cust[key].map((ing: string) => (
                                          <span
                                            key={ing}
                                            className="border border-[#9CB973]/50 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                                          >
                                            {ing}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  ),
                              )}
                            </>
                          )}

                          {!hasCust && (
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-600">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="font-medium">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          )}

                          {idx < items.length - 1 && (
                            <hr className="border-gray-200 my-2" />
                          )}
                        </div>
                      );
                    })}
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
                    <div className="flex justify-between text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-1">
                      <span>Delivery</span>
                      <span className="font-medium">A confirmar por WhatsApp</span>
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

      {showGenerateModal && (
        <FirstOrderModal
          onDone={() => {
            setShowGenerateModal(false);
            const state = DiscountCodeService.getInitialState();
            if (state.existingCode) {
              setDiscountCode(state.existingCode);
              setDiscountError("");
            }
            const phone = DiscountCodeService.getPhoneFromStorage();
            if (phone) {
              setFormData((prev) => ({ ...prev, phone }));
            }
          }}
        />
      )}
    </>
  );
}
