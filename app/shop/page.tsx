'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProblemSolution from '@/components/ProblemSolution';
import ProductFunnel from '@/components/ProductFunnel';
import ClinicallyTested from '@/components/ClinicallyTested';
import ReviewGrid from '@/components/ReviewGrid';
import InteractiveBenefits from '@/components/InteractiveBenefits';
import VideoTestimonials from '@/components/VideoTestimonials';
import DetailedFAQ from '@/components/DetailedFAQ';
import ExpandedReviews from '@/components/ExpandedReviews';
import {
  isShopifyLoggedIn,
  redirectToShopifySignup,
} from '@/lib/shopifyAuth';

type BundleOption = {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  shipping: string;
  saveBadge?: string;
  bestValue?: boolean;
  popular?: boolean;
  bonuses?: string[];
  pricePerBottle?: string;
};

const bundles: BundleOption[] = [
  {
    id: 1,
    title: 'Buy 1 + Get 1 FREE',
    price: '$51.30',
    originalPrice: '$114.00',
    shipping: '',
    saveBadge: 'Save $62.70',
    bonuses: ['+FREE Comb', '+PDF Guide'],
    pricePerBottle: 'Save 40%',
  },
  {
    id: 2,
    title: 'Buy 2 + Get 2 FREE',
    price: '$102.60',
    originalPrice: '$227.00',
    shipping: '',
    saveBadge: 'Save $124.40',
    popular: true,
    bonuses: ['+FREE Comb', '+PDF Guide', '+FREE Shipping'],
    pricePerBottle: 'Save 55%',
  },
  {
    id: 3,
    title: 'Buy 3 + Get 3 FREE',
    price: '$153.00',
    originalPrice: '$340.00',
    shipping: '',
    saveBadge: 'Save $187.00',
    bestValue: true,
    bonuses: ['+FREE Comb', '+PDF Guide', '+FREE Shipping', '+Mystery Gift'],
    pricePerBottle: 'Save 65%',
  },
];

export default function ShopPage() {
  const [selectedBundle, setSelectedBundle] = useState<number>(2);
  const [subscribeMode, setSubscribeMode] = useState(false);
  const [shopifyClient, setShopifyClient] = useState<any | null>(null);
  const [shopifyProduct, setShopifyProduct] = useState<any | null>(null);
  const [accountLoggedIn, setAccountLoggedIn] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Minimal Shopify integration: load SDK once, fetch product once, no embedded UI
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Show sticky bar after scrolling past the main pricing area (approx 800px)
      if (window.scrollY > 800) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function ShopifyBuyInit() {
      const ShopifyBuy = (window as any).ShopifyBuy;
      if (!ShopifyBuy) return;

      const client = ShopifyBuy.buildClient({
        domain: 'avw1pr-qj.myshopify.com',
        storefrontAccessToken: '74472e64ff2b3cc2204f58c4d56eb5bb',
      });

      // Fetch all products and keep only the one we care about
      client.product.fetchAll().then((products: any[]) => {
        const target = products.find((p: any) => {
          const numericId = String(p.id).split('/').pop();
          return numericId === '9848343953705';
        });

        setShopifyClient(client);
        setShopifyProduct(target || null);
      });
    }

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.head || document.body).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    const ShopifyBuy = (window as any).ShopifyBuy;
    if (ShopifyBuy) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setAccountLoggedIn(isShopifyLoggedIn());
  }, []);

  const handleBuyNow = async () => {
    if (!accountLoggedIn) {
      // Users must be signed up before purchasing; send them to Shopify signup.
      redirectToShopifySignup();
      return;
    }

    if (!shopifyClient || !shopifyProduct) return;

    const variants = shopifyProduct.variants || [];
    if (!variants.length) return;

    // Map bundle selection to actual Shopify variant titles
    // Based on your Shopify product variants:
    // Bundle 1 = "Buy 1 (30ml + 10ml)" - $29.99
    // Bundle 2 = "Buy 2 Get 1 Free" - $59.99  
    // Bundle 3 = "Buy 3 Get 2 Free" - $89.99
    const bundleToVariantMap: Record<number, string> = {
      1: 'Buy 1 + Get 1 FREE',
      2: 'Buy 2 + Get 2 FREE',
      3: 'Buy 3 + Get 3 FREE',
    };

    const searchText = bundleToVariantMap[selectedBundle];
    let targetVariant: any | null = null;

    if (searchText) {
      // If subscribe mode is enabled, look for subscription variants
      // (Note: Currently your product only has one-time purchase variants.
      // If you add subscription variants later, they should contain 'subscribe' in the title)
      if (subscribeMode) {
        targetVariant = variants.find((v: any) => {
          const t = String(v.title).toLowerCase();
          return t.includes(searchText.toLowerCase()) &&
                 (t.includes('subscribe') || t.includes('subscription') || t.includes('auto'));
        });
      }

      // Find the one-time purchase variant that matches the bundle selection
      if (!targetVariant) {
        targetVariant = variants.find((v: any) => {
           const t = String(v.title).toLowerCase();
           return t.includes(searchText.toLowerCase());
        });
      }
    }

    if (!targetVariant) {
      console.warn('Could not find matching variant for bundle:', selectedBundle);
      console.warn('Searched for:', searchText);
      console.warn('Available variants:', variants.map((v: any) => v.title));
      targetVariant = variants[0];
    }

    try {
      const checkout = await shopifyClient.checkout.create();
      const lineItems = [
        {
          variantId: targetVariant.id,
          quantity: 1,
        },
      ];

      const updatedCheckout = await shopifyClient.checkout.addLineItems(
        checkout.id,
        lineItems
      );

      // Redirect in the same tab to Shopify checkout
      if (updatedCheckout && updatedCheckout.webUrl) {
        window.location.href = updatedCheckout.webUrl;
      }
    } catch (err) {
      console.error('Error creating Shopify checkout', err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column - Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative w-full aspect-square bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 mb-4">
                  <Image
                    src="/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png"
                    alt="Zumfali 7-in-1 Hair Oil"
                    fill
                    className="object-contain p-12 hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 bg-[#1a2f23] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-md">
                    Best Seller
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:border-[#bb9c30] transition-colors group shadow-md">
                      <Image
                        src="/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png"
                        alt={`View ${i}`}
                        fill
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Product Details & Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Reviews */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex text-[#bb9c30]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-500">Rated 4.9/5 by 30,000+ Customers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1a2f23] mb-4 leading-tight">
                Zumfali 7-in-1 Complete <br />
                <span className="italic text-[#bb9c30]">Vital Glow Blend</span>
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#1a2f23]">
                  {bundles.find(b => b.id === selectedBundle)?.price}
                </span>
                {bundles.find(b => b.id === selectedBundle)?.originalPrice && (
                  <span className="text-xl text-gray-400 line-through decoration-red-500/40">
                    {bundles.find(b => b.id === selectedBundle)?.originalPrice}
                  </span>
                )}
                {bundles.find(b => b.id === selectedBundle)?.saveBadge && (
                  <span className="px-3 py-1 bg-[#bb9c30] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                    {bundles.find(b => b.id === selectedBundle)?.saveBadge}
                  </span>
                )}
              </div>

              <p className="text-gray-600 font-light mb-8 leading-relaxed text-lg">
                Experience the ultimate in hair nourishment with the Zumfali 7-in-1 Oil—a powerful blend of natural ingredients designed to revitalize your scalp, strengthen strands, and restore natural shine.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 mb-10">
                {['Scalp nourishment and hydration', 'Strengthens hair from root to tip', 'Restores natural shine and vitality'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2f23]/5 flex items-center justify-center text-[#1a2f23]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                     </span>
                     <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-200 mb-8" />
              
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">CHOOSE YOUR PACK</h3>

              {/* Bundles Selector */}
              <div className="space-y-4 mb-8">
                {bundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundle(bundle.id)}
                    className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden flex flex-col ${
                      selectedBundle === bundle.id
                        ? 'border-[#1a2f23] bg-[#fffcf5] shadow-lg'
                        : 'border-gray-200 bg-white hover:border-[#bb9c30]/50'
                    }`}
                  >
                    {/* Badges */}
                    {bundle.popular && (
                      <div className="absolute -top-[1px] -right-[1px] bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                        Most Popular
                      </div>
                    )}
                    {bundle.bestValue && (
                      <div className="absolute -top-[1px] -right-[1px] bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                        Best Deal
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="flex items-center p-5 pb-4">
                      {/* Radio Circle */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                        selectedBundle === bundle.id ? 'border-[#1a2f23]' : 'border-gray-300'
                      }`}>
                        {selectedBundle === bundle.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1a2f23]" />
                        )}
                      </div>

                      {/* Text Details */}
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-1 pr-16">
                          <span className="font-bold text-lg text-[#1a2f23] leading-tight">{bundle.title}</span>
                          {bundle.saveBadge && (
                            <span className="text-[10px] bg-[#5c8065] text-white px-2 py-0.5 rounded font-bold">
                              {bundle.saveBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 italic">{bundle.pricePerBottle}</p>
                      </div>

                      {/* Price */}
                      <div className="text-right flex flex-col justify-center flex-shrink-0 ml-2">
                         <div className="font-bold text-xl text-[#1a2f23]">{bundle.price}</div>
                        {bundle.originalPrice && (
                          <div className="text-gray-400 line-through text-sm decoration-gray-400">{bundle.originalPrice}</div>
                        )}
                      </div>
                    </div>

                    {/* Footer / Bonuses - Green Bar */}
                     <div className="bg-[#1a2f23] px-5 py-2 mt-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-white text-xs font-bold">
                           {bundle.bonuses?.map((bonus, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                <span>{bonus}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* CTA Button - single, clean, Shopify-powered */}
              <motion.button
                onClick={handleBuyNow}
                className="w-full py-5 bg-[#1a2f23] text-white rounded-full font-bold text-xl uppercase tracking-[0.25em] shadow-xl shadow-[#1a2f23]/20 hover:bg-[#2d4a38] transition-all transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {subscribeMode ? 'Subscribe Now' : 'Buy Now'}
              </motion.button>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-gray-500">
                  You&apos;ll need a free Shopify customer account to manage your
                  orders.
                </p>
                <button
                  type="button"
                  onClick={redirectToShopifySignup}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#1a2f23] text-[#1a2f23] text-xs font-semibold tracking-wide hover:bg-[#1a2f23] hover:text-white transition-colors"
                >
                  Sign up / Log in with Shopify
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Secure 256-bit SSL Encryption
              </p>

            </motion.div>
          </div>
        </div>
        
        <ProblemSolution />
        <ReviewGrid />
        <InteractiveBenefits />
        <ClinicallyTested />
        <VideoTestimonials />
        <ProductFunnel />
        <DetailedFAQ />
        <ExpandedReviews />

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 px-4 py-3 sm:py-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0">
                     <Image 
                        src="/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png"
                        alt="Product"
                        fill
                        className="object-contain p-1"
                     />
                  </div>
                  <div className="hidden sm:block">
                     <p className="font-bold text-[#1a2f23] text-sm sm:text-base">
                       {bundles.find(b => b.id === selectedBundle)?.title}
                     </p>
                     <p className="text-[#bb9c30] font-bold text-sm">
                       {bundles.find(b => b.id === selectedBundle)?.price}
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-4 flex-1 sm:flex-none justify-end">
                  <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                     <span>Free Shipping</span>
                     <span className="w-1 h-1 rounded-full bg-gray-300" />
                     <span>Secure Checkout</span>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 sm:flex-none px-6 sm:px-8 py-3 bg-[#1a2f23] text-white rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-[#2d4a38] transition-colors shadow-lg shadow-[#1a2f23]/20 whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
      <Footer />
    </>
  );
}
