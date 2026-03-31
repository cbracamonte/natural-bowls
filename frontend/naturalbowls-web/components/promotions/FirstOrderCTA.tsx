"use client";

import { useState, useEffect } from "react";
import { Gift, ArrowRight } from "lucide-react";
import { DiscountCodeService } from "@/lib/services";
import FirstOrderModal from "@/components/banners/FirstOrderModal";

export default function FirstOrderCTA() {
  const [isEligible, setIsEligible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsEligible(DiscountCodeService.getInitialState().isEligible);
  }, []);

  if (!isEligible) return null;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#9CB973] text-white rounded-full font-semibold text-sm hover:bg-[#8aab5f] transition-all hover:shadow-lg group/btn cursor-pointer"
      >
        <Gift className="w-4 h-4" />
        Genera tu Código
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
      </button>

      {showModal && <FirstOrderModal onDone={() => setShowModal(false)} />}
    </>
  );
}
