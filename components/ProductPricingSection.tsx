'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const bulletPoints = [
  'A nourishing blend that supports growth, restores natural shine, and helps reduce hair fall.',
  'With all Natural Ingredients: Mustard · Coconut · Black Seed · Castor · Pumpkin · Rosemary · Vitamin E Oil',
  'For All Hair Types · No Greasy Residue · 30 mL Dropper + 10 mL Roll On',
];

const packs = [
  {
    id: 1,
    title: "Buy 1 + Get 1 FREE",
    subTitle: "2 Bottles in Total",
    saveLabel: "Save $62.70",
    price: "$51.30",
    originalPrice: "$114.00",
    features: ["+FREE Nutrition Planner"],
    tag: null,
  },
  {
    id: 2,
    title: "Buy 2 + Get 2 FREE",
    subTitle: "4 Bottles in Total",
    saveLabel: "Save $124.40",
    price: "$102.60",
    originalPrice: "$227.00",
    features: ["+FREE Nutrition Planner", "+FREE Shipping"],
    tag: "MOST POPULAR",
  },
  {
    id: 3,
    title: "Buy 3 + Get 3 FREE",
    subTitle: "6 Bottles in Total",
    saveLabel: "Save $187.00",
    price: "$153.00",
    originalPrice: "$340.00",
    features: ["+FREE Nutrition Planner", "+FREE Shipping", "+FREE Mystery Gift"],
    tag: "BEST DEAL",
  }
];

export default function ProductPricingSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedPack, setSelectedPack] = useState(2); // Default to middle option

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden bg-[#FAFAF9]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Side - Product Image */}
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

          {/* Right Side - Product Details & Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Product Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="block text-[#bb9c30] font-medium tracking-widest uppercase text-sm mb-3">Limited Edition</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-[1.1]">
                The 7-in-1 Duo <br />
                <span className="text-gray-400 italic">Premium Bundle</span>
              </h2>
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

            {/* Pricing Packs */}
            <motion.div
              className="mt-10 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-center font-bold text-[#1a2f23] uppercase tracking-widest mb-6">
                Choose Your Pack
              </h3>

              <div className="space-y-4">
                {packs.map((pack) => (
                  <div 
                    key={pack.id}
                    onClick={() => setSelectedPack(pack.id)}
                    className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                      selectedPack === pack.id 
                        ? 'border-[#1a2f23] bg-[#faf9f6] shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Tag Badge */}
                    {pack.tag && (
                      <div className="absolute top-0 right-0 bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                        {pack.tag}
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          {/* Radio Button */}
                          <div className="mt-1">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPack === pack.id ? 'border-[#1a2f23]' : 'border-gray-300'
                            }`}>
                              {selectedPack === pack.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1a2f23]" />
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-bold text-lg text-[#1a2f23] leading-tight">
                                {pack.title}
                              </h4>
                              <span className="bg-[#4a6752] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                                {pack.saveLabel}
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm italic">
                              {pack.subTitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-xl text-[#1a2f23]">{pack.price}</div>
                          <div className="text-gray-400 text-xs line-through">{pack.originalPrice}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Features */}
                    {selectedPack === pack.id && (
                      <div className="bg-[#1a2f23] px-5 py-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-4 text-white text-xs font-bold tracking-wide">
                          {pack.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                     {/* Show basic features for unselected too, or keep it cleaner? 
                         The image shows features always visible but styled differently. 
                         Let's show them always but with the dark background only when selected.
                         Wait, the image shows the dark footer on ALL options in the example? 
                         Actually, looking closely at the crop, only the selected one is fully visible in the crop 
                         but the others have the footer section too. 
                         Let's just show the footer for all, but maybe change colors.
                         Actually, standard pattern is usually highlighting the selected one more.
                         Let's make the footer dark green for all, as per "match our colour scheme".
                     */}
                     {selectedPack !== pack.id && (
                        <div className="bg-[#1a2f23]/90 px-5 py-3 opacity-80">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-4 text-white text-xs font-bold tracking-wide">
                            {pack.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                     )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full mt-8 py-5 rounded-xl font-bold text-lg tracking-widest text-white shadow-xl uppercase transition-all"
                style={{ background: '#1a2f23' }}
                whileHover={{ scale: 1.02, backgroundColor: '#2d4a38' }}
                whileTap={{ scale: 0.98 }}
              >
                Add To Cart - {packs.find(p => p.id === selectedPack)?.price}
              </motion.button>
              
              <div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-500">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 <span>Guaranteed Safe Checkout</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
