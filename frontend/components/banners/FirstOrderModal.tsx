"use client";

import { useState } from "react";
import { X, Copy, Check, Gift, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { DiscountCodeService } from "@/lib/services";
import { DISCOUNTS_CODES } from "@/lib/seo/constants";

const { percentage, expirationDays, rules, terms, cta } =
  DISCOUNTS_CODES.FIRSTORDER;
const discountRules = rules.slice(0, 3);
const discountLabel = `${percentage * 100}% OFF`;
const bannerText = `Ahorra ${percentage * 100}% en tu primer pedido`;

export default function FirstOrderModal() {
  const [isOpen] = useState(() => DiscountCodeService.getInitialState().isEligible);
  const [phone, setPhone] = useState("");
  const [generatedCode, setGeneratedCode] = useState(
    () => DiscountCodeService.getInitialState().existingCode,
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(isOpen);

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 9);
    setPhone(cleaned);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = DiscountCodeService.validatePhone(phone);
    if (!validation.isValid) {
      setError(validation.error ?? "");
      return;
    }

    const result = await DiscountCodeService.saveCode(phone);
    setGeneratedCode(result.code);
  };

  const handleCopyCode = async () => {
    await DiscountCodeService.copyToClipboard(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 8px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
      <div
        className={`bg-white rounded-3xl w-full relative shadow-2xl border border-gray-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto modal-scroll smooth-scroll ${
          generatedCode ? "max-w-sm md:max-w-2xl" : "max-w-sm md:max-w-md"
        }`}
      >
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 md:p-1 transition-all z-10"
        >
          <X className="w-6 h-6 md:w-5 md:h-5" />
        </button>

        <div className="p-5 md:p-8">
          {/* Header */}
          <div className={`text-center ${!generatedCode ? "mb-5 md:mb-8" : "mb-8"}`}>
            <div className="flex justify-center items-center mb-3 md:mb-4">
              <div className="bg-linear-to-br from-[#6B8E4E] to-[#5D4E37] rounded-full p-3 md:p-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <Image
                  src="/icons/nb-isotipo-white.svg"
                  alt="Natural Bowls"
                  width={60}
                  height={60}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#6B8E4E] to-[#5D4E37] bg-clip-text text-transparent mb-1 md:mb-2">
              ¡Bienvenido a Natural Bowls!
            </h2>
            <p className="text-gray-600 text-xs md:text-sm">
              Descuento especial en tu primer pedido
            </p>
          </div>

          {!generatedCode ? (
            <>
              {/* Info banner */}
              <div className="bg-linear-to-r from-[#6B8E4E]/5 to-[#9CB973]/5 rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-[#6B8E4E]/10">
                <div className="flex gap-2 items-start">
                  <Gift className="w-4 h-4 text-[#6B8E4E] mt-0.5 shrink-0" />
                  <div className="text-xs text-gray-700 leading-tight">
                    <p className="font-semibold mb-0.5">{bannerText}</p>
                    <p className="text-gray-600">
                      Ingresa tu WhatsApp para generar tu código
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-900 mb-1.5">
                    Tu número de WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="912 341 818"
                      maxLength={9}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#6B8E4E] focus:ring-2 focus:ring-[#6B8E4E]/10 transition-all bg-white text-sm"
                    />
                    <div className="absolute right-3 top-2.5 md:top-3.5 flex items-center gap-2">
                      {phone.length === 9 && <Check className="w-4 h-4 text-green-500" />}
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1.5">
                    Validamos tu número para identificarte como cliente
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={phone.length !== 9}
                  className="w-full py-2.5 md:py-3 font-semibold text-sm md:text-base"
                >
                  Generar Código
                </Button>
              </form>
            </>
          ) : (
            <div className="space-y-4 md:space-y-5">
              {/* Success */}
              <div className="flex items-center gap-2 bg-green-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-green-200">
                <Check className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-xs md:text-sm font-medium text-green-800">
                  ¡Código generado exitosamente!
                </p>
              </div>

              {/* Code display */}
              <div className="bg-linear-to-br from-[#6B8E4E] to-[#5D4E37] rounded-2xl p-5 md:p-6 text-center text-white shadow-lg">
                <p className="text-xs md:text-sm font-medium opacity-90 mb-2">
                  Tu código de descuento
                </p>
                <p className="text-3xl md:text-4xl font-black font-mono tracking-widest mb-1">
                  {generatedCode}
                </p>
                <p className="text-xs opacity-75">{discountLabel}</p>
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopyCode}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 md:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-gray-300 text-sm md:text-base"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar código
                  </>
                )}
              </button>

              {/* Info card */}
              <div className="bg-blue-50 rounded-xl p-3 md:p-4 border border-blue-200 space-y-3">
                <div>
                  <p className="text-xs font-bold text-blue-900 mb-1">
                    ✓ Cómo funciona la validación
                  </p>
                  <p className="text-xs text-blue-800">
                    Cuando envíes tu pedido por WhatsApp con este código, Natural
                    Bowls verificará:
                  </p>
                </div>
                <div className="pt-2 space-y-2">
                  {discountRules.map((rule, i) => (
                    <div key={rule.label} className="flex items-start gap-2 text-xs">
                      <span className="text-blue-600 font-bold mt-0.5 shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-blue-900">
                        {rule.label}
                        <br />
                        <span className="text-blue-600 text-xs">({rule.tag})</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-blue-200 space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-blue-600 font-bold mt-0.5 shrink-0">•</span>
                    <span className="text-blue-900">
                      <span className="font-semibold">
                        Válido {expirationDays} días
                      </span>{" "}
                      - Después expira
                    </span>
                  </div>
                  {terms.map((term) => (
                    <div key={term.label} className="flex items-start gap-2 text-xs">
                      <span className="text-blue-600 font-bold mt-0.5 shrink-0">•</span>
                      <span className="text-blue-900">
                        <span className="font-semibold">{term.label}</span> -{" "}
                        {term.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <p className="text-center text-xs text-gray-600">
                Ahora dirígete a{" "}
                <Link
                  href={cta.url}
                  onClick={() => setModalOpen(false)}
                  className="font-semibold text-[#6B8E4E] underline underline-offset-2"
                >
                  {cta.urlText}
                </Link>{" "}
                y realiza tu primer pedido
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
