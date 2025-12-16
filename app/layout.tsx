import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";
import FacebookPixel from "@/components/FacebookPixel";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Zumfali - Premium Natural Hair Oil",
  // SEO meta description must stay between 120–130 characters.
  description:
    "Zumfali premium natural hair oil with an advanced 7-in-1 formula to nourish scalp, boost shine, and support healthier growth.",
  icons: {
    icon: '/Logo1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAFAF9] text-gray-900 selection:bg-[#bb9c30] selection:text-white`}>
        <CartProvider>
          <Suspense fallback={null}>
            <FacebookPixel />
          </Suspense>
          <NewsletterPopup />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

