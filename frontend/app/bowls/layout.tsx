import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Arma Tu Bowl",
  description:
    "Personaliza tu poke bowl o smoothie bowl paso a paso con los mejores ingredientes frescos y orgánicos de Natural Bowls.",
  keywords: ["arma tu bowl", "personalizar poke bowl", "bowl personalizado", "build your bowl"],
  path: "/bowls",
});

export default function BowlsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
