import { generateRootMetadata, generateViewportConfig } from "@/lib/seo";
import { LocalBusinessSchema, WebSiteSchema, SiteNavigationSchema, OrganizationSchema, HeadScripts } from "@/components/seo";
import OnboardingQueue from "@/components/ui/OnboardingQueue";
import PromotionNotification from "@/components/banners/PromotionNotification";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import SessionProvider from "@/components/providers/SessionProvider";

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
        <WebSiteSchema />
        <SiteNavigationSchema />
        <OrganizationSchema />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <CartProvider>
            <OnboardingQueue />
            <PromotionNotification />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-1" role="main">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
