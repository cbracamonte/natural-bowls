import { generateRootMetadata, generateViewportConfig } from "@/lib/seo";
import { LocalBusinessSchema, HeadScripts } from "@/components/seo";
import SkipLink from "@/components/a11y/SkipLink";
import CookieBanner from "@/components/layout/CookieBanner";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = generateRootMetadata();
export const viewport = generateViewportConfig();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <HeadScripts />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        <SkipLink />
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1" role="main">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
