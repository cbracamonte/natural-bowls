import Image from "next/image";
import Link from "next/link";
import { Clock, CreditCard, ArrowRight, MessageCircle } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/utils/contact";
import { LOYALTY_PROGRAM, PROMOTIONS, GENERAL_TERMS } from "@/data/promotions";
import PlanPokesHero from "@/components/promotions/PlanPokesHero";

export const metadata = generatePageMetadata({
  title: "Promociones y Descuentos",
  description:
    "Aprovecha nuestras mejores promociones: descuento en tu primer pedido, combos especiales y beneficios exclusivos para miembros Natural Bowls.",
  keywords: [
    "promociones Natural Bowls",
    "descuentos bowl",
    "combos saludables",
    "código descuento",
  ],
  path: "/promociones",
});

export default function PromocionesPage() {
  const highlightedPromo = PROMOTIONS.find((p) => p.highlighted);
  const regularPromos = PROMOTIONS.filter((p) => !p.highlighted);

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Plan Pokes — Hero + Modal */}
      {highlightedPromo && <PlanPokesHero promo={highlightedPromo} />}

      {/* ═══════════════════════════════════════════════
          PROMOS — Bandas alternadas full-width
          ═══════════════════════════════════════════════ */}
      {regularPromos.map((promo, index) => {
        const imageFirst = index % 2 !== 0;

        return (
          <section
            key={promo.id}
            className={index % 2 === 0 ? "bg-[#F5F3EF]" : "bg-white"}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Image */}
              <div
                className={`relative min-h-[320px] lg:min-h-[460px] ${
                  !imageFirst ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                />
                {promo.badge && (
                  <div className="absolute top-6 right-6 px-5 py-2 bg-[#9CB973] text-white text-sm font-bold rounded-full shadow-lg">
                    {promo.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className={`px-8 py-14 md:px-14 lg:px-20 ${
                  !imageFirst ? "lg:order-1" : ""
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4 tracking-tight">
                  {promo.title}
                </h2>
                <p className="text-[#5D4E37]/80 text-lg leading-relaxed mb-6 max-w-md">
                  {promo.description}
                </p>

                {promo.schedule && (
                  <div className="flex items-center gap-2 text-[#5D4E37]/60 text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{promo.schedule}</span>
                  </div>
                )}

                {promo.terms.length > 0 && (
                  <ul className="text-[#5D4E37]/50 text-sm mb-8 list-disc list-inside space-y-1">
                    {promo.terms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ul>
                )}

                {promo.cta.href ? (
                  <Link
                    href={promo.cta.href}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#9CB973] text-white rounded-full font-semibold text-sm hover:bg-[#8aab5f] transition-all hover:shadow-lg group/btn"
                  >
                    {promo.cta.text}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                ) : (
                  <a
                    href={buildWhatsAppUrl(
                      promo.cta.whatsAppMessage ?? `Hola! Me interesa la promo ${promo.title}`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#9CB973] text-white rounded-full font-semibold text-sm hover:bg-[#8aab5f] transition-all hover:shadow-lg group/btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {promo.cta.text}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          </section>
        );
      })}


      {/* ═══════════════════════════════════════════════
          LOYALTY CARD — full-width alternating band
          ═══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Image */}
          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <Image
              src={LOYALTY_PROGRAM.image}
              alt={LOYALTY_PROGRAM.subtitle}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="px-8 py-14 md:px-14 lg:px-20">
            <div className="flex items-center gap-3 mb-5">
              <CreditCard className="w-5 h-5 text-[#9CB973]" />
              <span className="text-[#9CB973] text-sm font-semibold uppercase tracking-widest">
                {LOYALTY_PROGRAM.title}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4 tracking-tight">
              {LOYALTY_PROGRAM.subtitle}
            </h2>
            <p className="text-[#5D4E37]/80 text-lg leading-relaxed mb-8 max-w-md">
              {LOYALTY_PROGRAM.description}
            </p>

            <div className="space-y-4 mb-10">
              {LOYALTY_PROGRAM.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#9CB973] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#5D4E37] text-sm md:text-base">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5D4E37] text-white rounded-full font-semibold text-sm hover:bg-[#4A3E2C] transition-all hover:shadow-lg group/link"
            >
              Empezar a acumular
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TERMS & CONDITIONS
          ═══════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xs font-semibold text-[#5D4E37] uppercase tracking-widest mb-5">
            Términos y Condiciones
          </h3>
          <ul className="space-y-2">
            {GENERAL_TERMS.map((term) => (
              <li
                key={term}
                className="flex items-start gap-3 text-sm text-[#5D4E37]/80 leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-[#5D4E37]/50 mt-2 shrink-0" />
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA FOOTER
          ═══════════════════════════════════════════════ */}
      <section className="bg-[#5D4E37] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            Contáctanos por WhatsApp o visítanos en tienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#9CB973] text-white rounded-full font-semibold hover:bg-[#8aab5f] transition-all hover:shadow-lg text-sm"
            >
              WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/naturalbowls.cafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all text-sm"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
