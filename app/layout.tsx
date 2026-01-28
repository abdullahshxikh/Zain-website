import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";
import FacebookPixel from "@/components/FacebookPixel";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zumfali.co'),
  title: {
    default: "Zumfali - Premium Natural Hair Oil",
    template: "%s | Zumfali"
  },
  description:
    "Zumfali premium natural hair oil with an advanced 7-in-1 formula to nourish scalp, boost shine, and support healthier growth. 100% organic ingredients.",
  keywords: ["hair oil", "hair growth oil", "natural hair care", "scalp treatment", "rosemary oil", "argan oil", "castor oil", "hair fall solution", "organic hair oil", "Zumfali"],
  authors: [{ name: "Zumfali" }],
  creator: "Zumfali",
  publisher: "Zumfali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Zumfali - Premium Natural Hair Oil",
    description: "Transform your hair with Zumfali's 7-in-1 advanced formula. Nourish, strengthen, and grow your hair naturally.",
    url: 'https://zumfali.co',
    siteName: 'Zumfali',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/targeting grwth anytime a portable rokl in. desigen for dges and thinig ares felivers precise nourishmwnt and promotes concintend growth on the go 3/2.png',
        width: 1200,
        height: 630,
        alt: 'Zumfali Premium Hair Oil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zumfali - Premium Natural Hair Oil",
    description: "Advanced 7-in-1 formula for healthier, stronger hair.",
    images: ['/targeting grwth anytime a portable rokl in. desigen for dges and thinig ares felivers precise nourishmwnt and promotes concintend growth on the go 3/2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: 'https://zumfali.co',
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
