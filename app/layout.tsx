import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";
import FacebookPixel from "@/components/FacebookPixel";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Zumfali - Premium Natural Hair Oil",
  description: "Nourish your hair with scientifically backed natural ingredients. 7-in-1 formula for all hair types.",
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
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <NewsletterPopup />
        {children}
      </body>
    </html>
  );
}

