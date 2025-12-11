'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProblemSolution from '@/components/ProblemSolution';
import HairLossSection from '@/components/HairLossSection';
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
    title: 'Buy 1 Bottle',
    price: '$39.99',
    originalPrice: '$59.99',
    shipping: '+ $8.00 Shipping',
    saveBadge: 'Save $20.00',
    bonuses: [],
    pricePerBottle: 'Save 33%',
  },
  {
    id: 2,
    title: 'Buy 2 Bottles',
    price: '$69.99',
    originalPrice: '$119.98',
    shipping: '',
    saveBadge: 'Save $49.99',
    popular: true,
    bonuses: ['+FREE Comb'],
    pricePerBottle: 'Save 42%',
  },
  {
    id: 3,
    title: 'Buy 3 Bottles',
    price: '$99.99',
    originalPrice: '$179.97',
    shipping: '',
    saveBadge: 'Save $79.98',
    bestValue: true,
    bonuses: ['+FREE Comb', '+PDF Guide'],
    pricePerBottle: 'Save 44%',
  },
];

export default function ShopPage() {
  const [selectedBundle, setSelectedBundle] = useState<number>(2);
  const [subscribeMode, setSubscribeMode] = useState(false);
  const [shopifyClient, setShopifyClient] = useState<any | null>(null);
  const [shopifyProduct, setShopifyProduct] = useState<any | null>(null);
  const [accountLoggedIn, setAccountLoggedIn] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const productImages = [
    '/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png',
    '/prod-1.png',
    '/prod-2.png',
    '/prod-3.png',
    '/prod-4.png',
  ];

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
    // Bundle 1 = "Buy 1"
    // Bundle 2 = "Buy 2"  
    // Bundle 3 = "Buy 3"
    const bundleToVariantMap: Record<number, string> = {
      1: 'Buy 1',
      2: 'Buy 2',
      3: 'Buy 3',
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
                <div className="relative w-full aspect-square bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 mb-4 group/main-image">
                  <Image
                    src={productImages[activeImage]}
                    alt="Zumfali 7-in-1 Hair Oil"
                    fill
                    className="object-contain p-8 sm:p-12 transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-[#1a2f23] shadow-md hover:bg-white transition-all opacity-0 group-hover/main-image:opacity-100 focus:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev + 1) % productImages.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-[#1a2f23] shadow-md hover:bg-white transition-all opacity-0 group-hover/main-image:opacity-100 focus:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </button>

                  {/* Floating Badge - Only show on first image */}
                  {activeImage === 0 && (
                    <div className="absolute top-6 left-6 bg-[#1a2f23] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-md">
                      Best Seller
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-5 gap-3">
                  {productImages.map((src, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-square bg-white rounded-xl overflow-hidden border cursor-pointer hover:border-[#bb9c30] transition-all duration-300 group shadow-sm ${
                        activeImage === i ? 'border-[#bb9c30] ring-2 ring-[#bb9c30]/20' : 'border-gray-100'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`View ${i + 1}`}
                        fill
                        className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
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
                <span className="text-sm font-medium text-gray-500">Rated 4.8/5 by 30,000+ Customers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1a2f23] mb-4 leading-tight">
                Zumfali 7-in-1 Complete <br />
                <span className="italic text-[#bb9c30]">Hair Growth Oil</span>
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
              <div className="space-y-3 mb-6">
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
                        {bundle.shipping && (
                          <p className="text-xs text-gray-500 font-medium mt-1">{bundle.shipping}</p>
                        )}
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
                    {bundle.bonuses && bundle.bonuses.length > 0 && (
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
                    )}
                  </div>
                ))}
              </div>

              {/* Purchase Options */}
              <div className="space-y-4 mb-6">
                {/* Subscribe Option */}
                <div 
                  onClick={() => setSubscribeMode(true)}
                  className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                    subscribeMode 
                      ? 'border-[#bb9c30] bg-[#fffcf5]' 
                      : 'border-gray-200 bg-white hover:border-[#bb9c30]/30'
                  }`}
                >
                  {subscribeMode && (
                    <div className="absolute -top-3 right-4 bg-[#bb9c30] text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                      Save 20% For First Order
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        subscribeMode ? 'border-[#bb9c30]' : 'border-gray-300'
                      }`}>
                        {subscribeMode && <div className="w-2.5 h-2.5 rounded-full bg-[#bb9c30]" />}
                      </div>
                      <span className="font-bold text-lg text-[#1a2f23]">Subscribe & save</span>
                    </div>
                    <div className="text-right">
                       <div className="flex flex-col items-end">
                         <span className="text-gray-400 line-through text-sm font-medium">
                           {bundles.find(b => b.id === selectedBundle)?.price}
                         </span>
                         <span className="font-bold text-xl text-[#1a2f23]">
                           {/* Calculate roughly 20% off for display demo */}
                           {bundles.find(b => b.id === selectedBundle)?.price ? 
                             `$${(parseFloat(bundles.find(b => b.id === selectedBundle)!.price.replace('$', '')) * 0.8).toFixed(2)}` 
                             : ''}
                         </span>
                       </div>
                    </div>
                  </div>

                  {subscribeMode && (
                    <div className="pl-8 animate-fadeIn">
                      <div className="text-sm text-gray-600 space-y-2 mb-4">
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                          Get an additional 20% off your first purchase and 10% off all recurring orders.
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                          No commitment. Cancel anytime
                        </p>
                      </div>
                      
                      <div className="bg-[#bb9c30] text-white font-bold py-3 px-4 rounded-lg text-center text-sm cursor-default">
                        1 Month
                      </div>
                      <p className="text-center text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Deliver every</p>
                    </div>
                  )}
                </div>

                {/* One-time Option */}
                <div 
                  onClick={() => setSubscribeMode(false)}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    !subscribeMode 
                      ? 'border-[#bb9c30] bg-[#fffcf5]' 
                      : 'border-gray-200 bg-white hover:border-[#bb9c30]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      !subscribeMode ? 'border-[#bb9c30]' : 'border-gray-300'
                    }`}>
                      {!subscribeMode && <div className="w-2.5 h-2.5 rounded-full bg-[#bb9c30]" />}
                    </div>
                    <span className="font-bold text-lg text-[#1a2f23]">One-time</span>
                  </div>
                  <span className="font-bold text-xl text-[#1a2f23]">
                    {bundles.find(b => b.id === selectedBundle)?.price}
                  </span>
                </div>
              </div>

              {/* CTA Button - single, clean, Shopify-powered */}
              <motion.button
                onClick={handleBuyNow}
                className="w-full py-5 bg-[#1a2f23] text-white rounded-lg font-bold text-xl uppercase tracking-wider shadow-xl shadow-[#1a2f23]/20 hover:bg-[#2d4a38] transition-all transform hover:-translate-y-1 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                ADD TO CART
              </motion.button>

              <p className="text-xs text-gray-500 text-center mb-8 flex items-center justify-center gap-2">
                <svg className="w-3 h-3 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Shipping takes 8-12 business days
              </p>
              
              {/* Payment Icons */}
              <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-lg h-10">
                   <Image 
                     src="/payment-icons.png" 
                     alt="Secure Payment Options" 
                     fill 
                     className="object-contain"
                   />
                </div>
              </div>

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
        <HairLossSection />
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
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 hidden xs:block">
                     <Image 
                        src={productImages[0]}
                        alt="Product"
                        fill
                        className="object-contain p-1"
                     />
                  </div>
                  <div className="flex-1 sm:flex-none">
                     <h4 className="font-bold text-[#1a2f23] text-sm sm:text-base leading-tight mb-1 font-sans">
                       Zumfali 7-in-1 Complete Hair Growth Oil
                     </h4>
                     <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#1a2f23] text-lg">
                          {bundles.find(b => b.id === selectedBundle)?.price}
                        </span>
                        {bundles.find(b => b.id === selectedBundle)?.originalPrice && (
                          <span className="text-sm text-gray-400 line-through font-medium">
                            {bundles.find(b => b.id === selectedBundle)?.originalPrice}
                          </span>
                        )}
                        {bundles.find(b => b.id === selectedBundle)?.saveBadge && (
                          <span className="bg-[#e0d8c3] text-[#8c7335] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M17.707 9.293l-2.646-2.647a1 1 0 01-.293-.707V4.375a1 1 0 00-1-1h-1.569a1 1 0 01-.707-.293L8.845.438a1 1 0 00-1.415 0L4.784 3.084a1 1 0 01-.707.293H2.508a1 1 0 00-1 1v1.569a1 1 0 01-.293.707L.438 8.845a1 1 0 000 1.415l2.647 2.646a1 1 0 01.293.707v1.569a1 1 0 001 1h1.569a1 1 0 01.707.293l2.646 2.647a1 1 0 001.415 0l2.646-2.647a1 1 0 01.707-.293h1.569a1 1 0 001-1v-1.569a1 1 0 01.293-.707l2.646-2.646a1 1 0 000-1.415zM12 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            {bundles.find(b => b.id === selectedBundle)?.saveBadge?.replace('Save ', '')} OFF
                          </span>
                        )}
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <div className="hidden md:block relative">
                    <select 
                      value={selectedBundle}
                      onChange={(e) => setSelectedBundle(Number(e.target.value))}
                      className="appearance-none bg-[#f0f2f1] border border-transparent hover:border-gray-300 text-[#1a2f23] py-3 pl-4 pr-10 rounded-lg cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-[#1a2f23]/20 transition-all min-w-[160px]"
                    >
                      {bundles.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.id === 1 ? '1 Bottle' : b.id === 2 ? '2 Bottles' : '3 Bottles'}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[#1a2f23] text-white rounded-lg font-bold text-base hover:bg-[#2d4a38] transition-colors shadow-lg shadow-[#1a2f23]/20 whitespace-nowrap"
                  >
                    Shop Now
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
