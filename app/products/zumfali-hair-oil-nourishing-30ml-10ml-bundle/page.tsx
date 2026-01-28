'use client';

import { motion } from 'framer-motion';
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
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { useCart } from '@/context/CartContext';

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
    title: 'Starter',
    price: '$31.99',
    originalPrice: '$49.99',
    shipping: 'Shipping Calculated',
    saveBadge: 'Save ~36%',
    bonuses: [],
  },
  {
    id: 2,
    title: 'Most Popular',
    price: '$59.99',
    originalPrice: '$119.98',
    shipping: 'FREE SHIPPING',
    saveBadge: 'Save ~50%',
    popular: true,
    bonuses: ['FREE Hair Growth Guide (PDF)'],
  },
  {
    id: 3,
    title: 'Best Value',
    price: '$89.99',
    originalPrice: '$239.96',
    shipping: 'FREE SHIPPING',
    saveBadge: 'Save ~62%',
    bestValue: true,
    bonuses: ['Hair Growth Guide PDF', 'Scalp Massage Ebook'],
    pricePerBottle: '$18.00/bottle',
  },
];

export default function ProductPage() {
  const [selectedBundle, setSelectedBundle] = useState<number>(2);
  const [subscribeMode, setSubscribeMode] = useState(false);
  const [accountLoggedIn, setAccountLoggedIn] = useState(false);
  const { trackInitiateCheckout, trackAddToCart } = useMetaPixel();
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setAccountLoggedIn(isShopifyLoggedIn());
  }, []);

  const handleBuyNow = async () => {
    if (!accountLoggedIn) {
      // Users must be signed up before purchasing
      redirectToShopifySignup();
      return;
    }

    let variantId = '';
    let variantTitle = '';

    switch (selectedBundle) {
      case 1:
        variantId = '51383441293609';
        variantTitle = 'Buy 1 (30ml + 10ml)';
        break;
      case 2:
        variantId = '51383441326377';
        variantTitle = 'Buy 2 Get 1 Free';
        break;
      case 3:
        variantId = '51383441359145';
        variantTitle = 'Buy 3 Get 2 Free';
        break;
      default:
        variantId = '51383441326377';
        variantTitle = 'Buy 2 Get 1 Free';
    }

    const bundle = bundles.find((b) => b.id === selectedBundle);
    const priceNum = parseFloat(String(bundle?.price || '0').replace(/[^0-9.]/g, ''));

    trackInitiateCheckout(
      [
        {
          id: variantId,
          quantity: 1,
          item_price: priceNum,
        },
      ],
      priceNum
    );

    const sellingPlanId = subscribeMode ? '694070968617' : undefined;

    await addToCart({
      variantId,
      title: 'Zumfali 7-in-1 Hair Oil',
      variantTitle,
      price: bundle?.price || '',
      quantity: 1,
      image: '/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png',
      originalPrice: bundle?.originalPrice,
      sellingPlanId
    });

    openCart();
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
                    title="Zumfali 7-in-1 Hair Oil"
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
                        alt={`Zumfali 7-in-1 Hair Oil view ${i}`}
                        title={`Zumfali 7-in-1 Hair Oil view ${i}`}
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
              <div className="space-y-3 mb-10">
                {['Scalp nourishment and hydration', 'Strengthens hair from root to tip', 'Restores natural shine and vitality'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2f23]/5 flex items-center justify-center text-[#1a2f23]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-200 mb-8" />

              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">Bundle & Save</h3>

              {/* Bundles Selector */}
              <div className="space-y-4 mb-8">
                {bundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundle(bundle.id)}
                    className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden ${selectedBundle === bundle.id
                      ? 'border-[#1a2f23] bg-[#1a2f23]/5 shadow-lg shadow-[#1a2f23]/5'
                      : 'border-gray-200 bg-white hover:border-[#bb9c30]/50'
                      }`}
                  >
                    {/* Badges */}
                    {bundle.popular && (
                      <div className="absolute top-0 right-0 bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                        Most Popular
                      </div>
                    )}
                    {bundle.bestValue && (
                      <div className="absolute top-0 right-0 bg-[#bb9c30] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                        Best Value
                      </div>
                    )}

                    <div className="flex items-center p-5">
                      {/* Radio Circle */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-5 transition-colors ${selectedBundle === bundle.id ? 'border-[#1a2f23]' : 'border-gray-300'
                        }`}>
                        {selectedBundle === bundle.id && (
                          <div className="w-3 h-3 rounded-full bg-[#1a2f23]" />
                        )}
                      </div>

                      {/* Image Thumbnail */}
                      <div className="relative w-12 h-12 flex-shrink-0 mr-5">
                        <Image src="/product-image.png" alt="Zumfali hair oil bottle" title="Zumfali hair oil bottle" fill className="object-contain" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg text-[#1a2f23]">{bundle.title}</span>
                          {bundle.saveBadge && (
                            <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                              {bundle.saveBadge}
                            </span>
                          )}
                        </div>
                        {bundle.bonuses && bundle.bonuses.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {bundle.bonuses.map((bonus, i) => (
                              <p key={i} className="text-xs text-[#bb9c30] font-bold flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-[#bb9c30]" />
                                {bonus}
                              </p>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
                          {bundle.shipping}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right flex flex-col justify-center">
                        {bundle.originalPrice && (
                          <div className="text-gray-400 line-through text-sm decoration-red-500/40 mb-1">{bundle.originalPrice}</div>
                        )}
                        <div className="font-bold text-xl text-[#1a2f23]">{bundle.price}</div>
                        {bundle.pricePerBottle && (
                          <div className="text-[10px] text-gray-500 font-medium mt-1">{bundle.pricePerBottle}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">Frequency</h3>

              {/* Purchase Mode Toggle */}
              <div className="border-2 rounded-xl overflow-hidden mb-8 bg-white border-gray-200">
                <div
                  onClick={() => setSubscribeMode(false)}
                  className={`p-5 flex items-center cursor-pointer border-b border-gray-100 transition-colors ${!subscribeMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${!subscribeMode ? 'border-[#1a2f23]' : 'border-gray-300'
                    }`}>
                    {!subscribeMode && <div className="w-3 h-3 rounded-full bg-[#1a2f23]" />}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold text-lg ${!subscribeMode ? 'text-[#1a2f23]' : 'text-gray-600'}`}>One-Time Purchase</span>
                  </div>
                  <span className="font-bold text-lg text-[#1a2f23]">{bundles.find(b => b.id === selectedBundle)?.price}</span>
                </div>

                <div
                  onClick={() => setSubscribeMode(true)}
                  className={`p-5 flex items-center cursor-pointer transition-colors relative overflow-hidden ${subscribeMode ? 'bg-[#1a2f23]/5' : 'bg-white'
                    }`}
                >
                  <div className="absolute top-0 right-0 bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Most Flexible
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${subscribeMode ? 'border-[#1a2f23]' : 'border-gray-300'
                    }`}>
                    {subscribeMode && <div className="w-3 h-3 rounded-full bg-[#1a2f23]" />}
                  </div>
                  <div className="flex-1 pt-4 sm:pt-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold text-lg ${subscribeMode ? 'text-[#1a2f23]' : 'text-gray-600'}`}>Subscribe & Save (Monthly)</span>
                    </div>

                    <ul className="space-y-1 mt-2">
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#1a2f23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Save extra on every order
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#1a2f23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Cancel Anytime
                      </li>
                    </ul>
                  </div>
                </div>
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
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
      </main>
      <Footer />
    </>
  );
}
