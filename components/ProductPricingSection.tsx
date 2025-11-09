'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const bundles = [
  {
    id: 1,
    bottles: 1,
    label: '1 Bottle',
    originalPrice: 79.99,
    salePrice: 39.99,
    savings: 40.00,
    savingsPercent: 50,
    badge: null,
    freeShipping: false,
  },
  {
    id: 2,
    bottles: 2,
    label: '2 Bottles',
    originalPrice: 119.98,
    salePrice: 59.99,
    savings: 59.99,
    savingsPercent: 50,
    badge: 'MOST POPULAR',
    freeShipping: true,
  },
  {
    id: 3,
    bottles: 3,
    label: '3 Bottles',
    originalPrice: 179.97,
    salePrice: 89.99,
    savings: 89.98,
    savingsPercent: 50,
    badge: 'BEST VALUE',
    freeShipping: true,
  },
];

const trustBadges = [
  { icon: '🏆', text: 'Crafted in GMP-certified facilities' },
  { icon: '🔬', text: 'Third-party tested for purity & potency' },
  { icon: '⭐', text: 'Backed by science, loved by thousands' },
];

export default function ProductPricingSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(2);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden" 
      style={{
        backgroundColor: '#d4a574',
      }}
    >

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Product Image */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 -m-8 rounded-full bg-[#6b8d5b]/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/product-image.png"
                alt="Zumfali 7-in-1 Hair Oil"
                width={500}
                height={400}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badges */}
            <div className="space-y-4 mb-8">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-white text-sm sm:text-base">{badge.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Bundle & Save Header */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-px" style={{ backgroundColor: '#bb9c30', opacity: 0.3 }}></div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#bb9c30]">BUNDLE & SAVE</h3>
                <div className="flex-1 h-px" style={{ backgroundColor: '#bb9c30', opacity: 0.3 }}></div>
              </div>
            </motion.div>

            {/* Bundle Options */}
            <div className="space-y-4 mb-8">
              {bundles.map((bundle, index) => (
                <motion.div
                  key={bundle.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  {/* Badge */}
                  {bundle.badge && (
                    <div className={`absolute -top-3 right-4 px-4 py-1 rounded-full text-xs font-bold text-white z-10 ${
                      bundle.badge === 'MOST POPULAR' ? 'bg-[#bb9c30]' : 'bg-[#6b8d5b]'
                    }`}>
                      {bundle.badge}
                    </div>
                  )}

                  <motion.button
                    onClick={() => setSelectedBundle(bundle.id)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all ${
                      selectedBundle === bundle.id
                        ? 'border-[#bb9c30] bg-[#bb9c30]/10 shadow-xl'
                        : 'border-white/20 bg-black/40 hover:border-[#bb9c30]/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      {/* Radio + Label */}
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedBundle === bundle.id ? 'border-[#bb9c30]' : 'border-white/40'
                        }`}>
                          {selectedBundle === bundle.id && (
                            <div className="w-3 h-3 rounded-full bg-[#bb9c30]"></div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-white font-bold text-lg sm:text-xl">{bundle.label}</div>
                          {bundle.freeShipping && (
                            <div className="text-[#6b8d5b] text-xs sm:text-sm font-semibold mt-1 flex items-center gap-1">
                              <span>✓</span> FREE SHIPPING
                            </div>
                          )}
                          <div className="text-gray-400 text-sm mt-1">
                            Save ${bundle.savings.toFixed(2)} ({bundle.savingsPercent}%)
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <div className="text-gray-400 line-through text-sm sm:text-base">
                          ${bundle.originalPrice.toFixed(2)}
                        </div>
                        <div className="text-[#bb9c30] font-bold text-2xl sm:text-3xl">
                          ${bundle.salePrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Add to Cart Button */}
            <motion.button
              className="w-full group relative px-8 py-5 overflow-hidden rounded-full shadow-2xl text-xl font-bold"
              style={{
                backgroundColor: '#6b8d5b',
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(107, 141, 91, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="relative z-10 text-white flex items-center justify-center gap-3">
                Add to Cart
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
            </motion.button>

            {/* Guarantee */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                <span className="text-[#6b8d5b]">✓</span>
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


