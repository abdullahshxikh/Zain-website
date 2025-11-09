'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0" style={{ backgroundColor: '#c9a876' }}>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 max-w-lg z-10 text-center lg:text-left"
          >
            {/* Star Rating */}
            <div className="flex flex-col gap-0.5 items-center lg:items-start">
              <div className="flex gap-0.5 text-base sm:text-lg">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#1a1a1a' }}>★</span>
                ))}
              </div>
              <p className="text-xs font-medium" style={{ color: '#2a2a2a' }}>1000 Reviews</p>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black font-serif">
              Nourish your hair with scientifically backed natural ingredients.
            </h1>

            {/* Subheadline */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm" style={{ color: '#4a4a4a' }}>
              <span>For All Hair Types</span>
              <span>•</span>
              <span>No Greasy Residue</span>
            </div>

            {/* Shop Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base text-black shadow-lg mt-2"
              style={{ backgroundColor: '#bb9c30' }}
            >
              Shop Now
            </motion.button>
          </motion.div>

          {/* Right Side - Product Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end w-full lg:w-auto"
          >
            {/* Product Image Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
              <Image
                src="/product-hero.png"
                alt="Zumfali 7-in-1 Hair Oil Products"
                fill
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.3))',
                }}
                priority
              />
            </div>

            {/* Sparkle Effect */}
            <motion.div
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-2xl sm:text-3xl lg:text-4xl z-20"
              style={{ color: '#f4e5c3' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
