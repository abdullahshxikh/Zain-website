'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const keyIngredients = [
  {
    name: 'Coconut Oil',
    description: 'Reduces breakage and keeps hair strong',
    dosage: '1,800 mg',
    position: 'top-left'
  },
  {
    name: 'Black Seed Oil', 
    description: 'Keeps scalp healthy and reduces hair fall',
    dosage: '1,500 mg',
    position: 'top-right'
  },
  {
    name: 'Rosemary Oil',
    description: 'Well known natural growth booster',
    dosage: '2,000 mg',
    position: 'bottom-left'
  },
  {
    name: 'Argan Oil',
    description: 'Deeply moisturizes and adds natural shine',
    dosage: '1,200 mg',
    position: 'bottom-right'
  }
];

export default function GirlIngredientsSection() {
  const [mounted, setMounted] = useState(false);
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);
  const [showIngredient, setShowIngredient] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle through ingredients every 3.5 seconds
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setShowIngredient(false);
      setTimeout(() => {
        setCurrentIngredientIndex((prev) => (prev + 1) % keyIngredients.length);
        setShowIngredient(true);
      }, 300);
    }, 3500);

    // Show first ingredient after 1 second
    const initialTimeout = setTimeout(() => {
      setShowIngredient(true);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [mounted]);

  if (!mounted) return null;

  const currentIngredient = keyIngredients[currentIngredientIndex];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'top-20 left-4 md:top-24 md:left-8 lg:top-32 lg:left-12';
      case 'top-right':
        return 'top-20 right-4 md:top-24 md:right-8 lg:top-32 lg:right-12';
      case 'bottom-left':
        return 'bottom-32 left-4 md:bottom-40 md:left-8 lg:bottom-48 lg:left-12';
      case 'bottom-right':
        return 'bottom-32 right-4 md:bottom-40 md:right-8 lg:bottom-48 lg:right-12';
      default:
        return 'top-20 left-4 md:top-24 md:left-8 lg:top-32 lg:left-12';
    }
  };

  return (
    <section className="relative min-h-[150vh] lg:min-h-[180vh] overflow-hidden" style={{ backgroundColor: '#f5f1e8' }}>
      {/* Background Image Container */}
      <div className="absolute inset-0">
        {/* Girl Portrait - Optimized sizing and positioning */}
        <div 
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(/girl-portrait.png)',
            backgroundPosition: 'center 20%', // Position to show face better
            backgroundSize: 'cover',
          }}
        />
        
        {/* Matching Background Extension with better blending */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 241, 232, 0.1) 0%, rgba(237, 231, 217, 0.15) 30%, rgba(240, 234, 216, 0.1) 70%, rgba(245, 241, 232, 0.1) 100%)',
          }}
        />
        
        {/* Subtle Overlay for Better Text Visibility - Reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1e8]/10 via-transparent to-[#f5f1e8]/10" />
      </div>

      {/* Section Title - Top Center */}
      <motion.div
        className="absolute top-6 sm:top-8 md:top-12 left-1/2 transform -translate-x-1/2 z-20 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 border border-[#bb9c30]/20 shadow-lg">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#bb9c30] text-center"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Pure Natural Formula
          </h2>
          <p className="text-[#bb9c30]/80 text-center mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            Key ingredients for healthy, beautiful hair
          </p>
        </div>
      </motion.div>

      {/* Ingredient Overlay Boxes - Rotating Positions */}
      <AnimatePresence mode="wait">
        {showIngredient && (
          <motion.div
            key={currentIngredient.name}
            className={`absolute z-30 ${getPositionClasses(currentIngredient.position)}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="group relative h-56 sm:h-72 md:h-80 lg:h-[320px] xl:h-[360px] w-56 sm:w-72 md:w-80 lg:w-[320px] xl:w-[360px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer">
              {/* Background with Ingredient Theme */}
              <div className="absolute inset-0">
                <div 
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, #bb9c30 0%, #d4b851 50%, #bb9c30 100%)',
                  }}
                />
                {/* Dark overlay gradient - matching original ingredients section */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
              </div>

              {/* Content - Matching Original Ingredients Section Style */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7 md:p-8 lg:p-10">
                {/* Title */}
                <div>
                  <h3 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#bb9c30] mb-3 sm:mb-4 md:mb-5 leading-tight"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '700' }}
                  >
                    {currentIngredient.name}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="text-[#bb9c30] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed opacity-95"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '400' }}
                  >
                    {currentIngredient.description}
                  </p>
                </div>

                {/* Dosage Badge - Matching Original Style */}
                <motion.div
                  className="inline-flex items-center self-start px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-full"
                  style={{ backgroundColor: '#bb9c30' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span 
                    className="text-black text-sm sm:text-base md:text-lg font-semibold"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    {currentIngredient.dosage}
                  </span>
                </motion.div>
              </div>

              {/* Hover effect border - Matching Original */}
              <motion.div
                className="absolute inset-0 border-2 border-[#bb9c30] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements for Visual Interest */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-30"
          style={{
            backgroundColor: '#bb9c30',
            left: `${15 + (i * 12)}%`,
            top: `${25 + (i * 10)}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Bottom CTA - Matching Original Style */}
      <motion.div
        className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.button
          className="group relative px-12 py-5 overflow-hidden rounded-full shadow-2xl text-lg font-bold bg-white/90 backdrop-blur-md border border-[#bb9c30]/20"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 20px 60px rgba(187, 156, 48, 0.3)",
            backgroundColor: '#bb9c30'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-[#bb9c30] group-hover:text-black flex items-center gap-3 transition-colors duration-300">
            Experience Pure Nature
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </span>
        </motion.button>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-56 lg:h-64 bg-gradient-to-t from-[#f5f1e8] to-transparent pointer-events-none opacity-50"></div>
    </section>
  );
}
