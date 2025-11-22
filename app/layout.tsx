import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Zumfali - Premium Natural Hair Oil",
  description: "Nourish your hair with scientifically backed natural ingredients. 7-in-1 formula for all hair types.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAFAF9] text-gray-900 selection:bg-[#bb9c30] selection:text-white`}>
        <NewsletterPopup />
        {children}
      </body>
    </html>
  );
}

