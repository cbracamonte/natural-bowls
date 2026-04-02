import type { Metadata } from "next";
import { generatePageMetadata, SITE_CONFIG } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata({
  title: "Arma Tu Bowl",
  description:
    "Personaliza tu poke bowl o smoothie bowl paso a paso con los mejores ingredientes frescos y orgánicos de Natural Bowls.",
  keywords: ["arma tu bowl", "personalizar poke bowl", "bowl personalizado", "build your bowl"],
  path: "/bowls",
});

export default function BowlsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_CONFIG.url },
          { name: "Arma Tu Bowl", url: `${SITE_CONFIG.url}/bowls` },
        ]}
      />
      {children}
    </>
  );
}
