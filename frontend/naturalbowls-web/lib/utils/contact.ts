import { SITE_CONFIG } from "@/lib/seo/constants";

export const getWhatsAppNumber = () => SITE_CONFIG.phone.replace(/\D/g, "");

export const buildWhatsAppUrl = (message?: string) => {
  const baseUrl = `https://wa.me/${getWhatsAppNumber()}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
