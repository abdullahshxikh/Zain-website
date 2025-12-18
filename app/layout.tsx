import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";
import FacebookPixel from "@/components/FacebookPixel";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Zumfali - Premium Natural Hair Oil",
  // SEO meta description must stay between 120–130 characters.
  description:
    "Zumfali premium natural hair oil with an advanced 7-in-1 formula to nourish scalp, boost shine, and support healthier growth.",
  // Ensure favicon files are served from the site root (public/...).
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAFAF9] text-gray-900 selection:bg-[#bb9c30] selection:text-white`}
      >
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
