import { generateRootMetadata, generateViewportConfig } from "@/lib/seo";
import { LocalBusinessSchema, HeadScripts } from "@/components/seo";
import CookieBanner from "@/components/layout/CookieBanner";
import FirstOrderModal from "@/components/FirstOrderModal";
import PromotionNotification from "@/components/PromotionNotification";
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
        <CartProvider>
          <FirstOrderModal />
          <PromotionNotification />
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
