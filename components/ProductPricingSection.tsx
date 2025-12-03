'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const bulletPoints = [
  'A nourishing blend that supports growth, restores natural shine, and helps reduce hair fall.',
  'With all Natural Ingredients: Mustard · Coconut · Black Seed · Castor · Pumpkin · Rosemary · Vitamin E Oil',
  'For All Hair Types · No Greasy Residue · 30 mL Dropper + 10 mL Roll On',
];

const packs = [
  {
    id: 'pack-1',
    title: 'Buy 1 + Get 1 FREE',
    subtitle: '2 Bottles in Total',
    price: 51.30,
    originalPrice: 114.00,
    saveAmount: 62.70,
    popular: false,
    bestDeal: false,
    benefits: ['+ FREE Nutrition Planner']
  },
  {
    id: 'pack-2',
    title: 'Buy 2 + Get 2 FREE',
    subtitle: '4 Bottles in Total',
    price: 102.60,
    originalPrice: 227.00,
    saveAmount: 124.40,
    popular: true,
    bestDeal: false,
    benefits: ['+ FREE Nutrition Planner', '+ FREE Shipping']
  },
  {
    id: 'pack-3',
    title: 'Buy 3 + Get 3 FREE',
    subtitle: '6 Bottles in Total',
    price: 153.00,
    originalPrice: 340.00,
    saveAmount: 187.00,
    popular: false,
    bestDeal: true,
    benefits: ['+ FREE Nutrition Planner', '+ FREE Shipping', '+ FREE Mystery Gift']
  }
];

export default function ProductPricingSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedPack, setSelectedPack] = useState('pack-2');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePackSelect = (packId: string) => {
    setSelectedPack(packId);
  };

  const handleAddToCart = () => {
    const pack = packs.find(p => p.id === selectedPack);
    console.log('Adding to cart:', pack);
    // Add cart logic here
    window.location.href = '/checkout'; // Example redirect
  };

  if (!mounted) return null;

  return (
    <section 
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden bg-[#FAFAF9]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left Side - Product Image & Bullets */}
          <div className="space-y-12 sticky top-32">
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-xl aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100/50">
                <Image
                  src="/product-bundle.png"
                  alt="Zumfali 7-in-1 Hair Oil Duo"
                  fill
                  className="object-contain p-12 hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </motion.div>

             {/* Bullet Points */}
             <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#bb9c30] group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">{point}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Pack Selection */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Product Title */}
            <div className="text-center lg:text-left">
              <span className="block text-[#bb9c30] font-medium tracking-widest uppercase text-sm mb-3">Limited Edition</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-gray-900 leading-[1.1]">
                Choose Your Pack
              </h2>
            </div>

            {/* Pack Options */}
            <div className="space-y-5">
              {packs.map((pack) => (
                <div key={pack.id} className="relative">
                  {/* Badge Labels */}
                  {pack.popular && (
                    <div className="absolute -top-3 right-4 z-20 bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                      Most Popular
                    </div>
                  )}
                  {pack.bestDeal && (
                    <div className="absolute -top-3 right-4 z-20 bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                      Best Deal
                    </div>
                  )}

                  <motion.button
                    onClick={() => handlePackSelect(pack.id)}
                    className={`w-full relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-4 text-left group ${
                      selectedPack === pack.id
                        ? 'border-[#1a2f23] bg-[#1a2f23]/5 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-[#bb9c30]/50'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Main Row: Radio + Info + Price */}
                    <div className="flex items-start justify-between w-full gap-4">
                      <div className="flex items-start gap-4">
                        {/* Custom Radio Button */}
                        <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedPack === pack.id ? 'border-[#1a2f23]' : 'border-gray-300'
                        }`}>
                          {selectedPack === pack.id && (
                            <div className="w-3 h-3 rounded-full bg-[#1a2f23]" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-1">
                            <h3 className="text-lg font-bold text-[#1a2f23]">{pack.title}</h3>
                            <span className="bg-[#5d7c69] text-white text-xs font-bold px-2 py-0.5 rounded">
                              Save ${pack.saveAmount.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 italic">{pack.subtitle}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-[#1a2f23]">${pack.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-400 line-through decoration-gray-400/50 decoration-1">
                          ${pack.originalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Benefits Footer */}
                    {selectedPack === pack.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="w-full pt-4 mt-2 border-t border-[#1a2f23]/10"
                      >
                        <div className="flex flex-col gap-2">
                          {pack.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm font-bold text-[#1a2f23]">
                              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              ))}
            </div>

            {/* Checkout Button */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full py-5 rounded-full font-bold text-lg text-white shadow-xl shadow-[#1a2f23]/20 transition-all mt-8 flex items-center justify-center gap-3 group overflow-hidden relative"
              style={{ background: '#1a2f23' }}
              whileHover={{ scale: 1.02, shadow: '0 25px 50px -12px rgba(26, 47, 35, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Add to Cart</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            </motion.button>

            <div className="flex items-center justify-center gap-6 text-gray-400 grayscale opacity-70">
               <img src="/shopify-logo-png-transparent.png" alt="Secure Checkout" className="h-6 object-contain" />
               <span className="text-xs font-medium">30-Day Money Back Guarantee</span>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
