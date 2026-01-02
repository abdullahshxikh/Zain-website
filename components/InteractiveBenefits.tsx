import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const benefits = [
  {
    id: 'restore',
    tabLabel: 'Restores Follicle Health',
    title: 'Restores Follicle Health',
    description: 'Penetrates deep into the scalp to nourish dormant follicles, stimulating natural growth cycles without harsh chemicals.',
    image: '/Gemini_Generated_Image_kclmx7kclmx7kclm (1).png'
  },
  {
    id: 'strengthen',
    tabLabel: 'Strengthens Strands',
    title: 'Strengthens Every Strand',
    description: 'Fortifies hair from root to tip, reducing breakage and shedding while improving elasticity and shine.',
    image: '/Gemini_Generated_Image_wg19biwg19biwg19.png'
  },
  {
    id: 'balance',
    tabLabel: 'Balances Scalp',
    title: 'Balances Scalp Health',
    description: 'Soothes irritation and regulates oil production, creating the optimal environment for thicker, fuller hair growth.',
    image: '/Gemini_Generated_Image_nn8wajnn8wajnn8w.png'
  }
];

export default function InteractiveBenefits() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
            Balance Your Scalp, Strength & Shine with Zumfali
          </p>

          {/* Custom Tab Navigation */}
          <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-4 p-1 bg-gray-100/50 rounded-full">
            {benefits.map((benefit, index) => (
              <button
                key={benefit.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${activeTab === index
                    ? 'bg-[#1a2f23] text-white shadow-lg scale-105'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {benefit.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative bg-[#FAFAF9] rounded-3xl overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[400px] sm:min-h-[500px]">

            {/* Left: Dynamic Product Image with Animation */}
            <div className="relative h-64 sm:h-80 md:h-full bg-white flex items-center justify-center overflow-hidden">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#bb9c30]/10 to-transparent opacity-50 z-0" />
              <div className="absolute w-64 h-64 bg-[#bb9c30]/20 rounded-full blur-3xl z-0" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full z-10"
                >
                  <Image
                    src={benefits[activeTab].image}
                    alt={benefits[activeTab].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Dynamic Text Content */}
            <div className="relative flex flex-col justify-center p-8 sm:p-12 md:p-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full flex flex-col justify-center"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1a2f23] mb-4 sm:mb-6">
                    {benefits[activeTab].title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {benefits[activeTab].description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-8 w-16 h-1 bg-[#bb9c30] rounded-full" />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
