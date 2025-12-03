import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const benefits = [
  {
    id: 'restore',
    tabLabel: 'Restores Follicle Health',
    title: 'Restores Follicle Health',
    description: 'Penetrates deep into the scalp to nourish dormant follicles, stimulating natural growth cycles without harsh chemicals.',
    image: '/download.jpg'
  },
  {
    id: 'strengthen',
    tabLabel: 'Strengthens Strands',
    title: 'Strengthens Every Strand',
    description: 'Fortifies hair from root to tip, reducing breakage and shedding while improving elasticity and shine.',
    image: '/download-1.jpg'
  },
  {
    id: 'balance',
    tabLabel: 'Balances Scalp',
    title: 'Balances Scalp Health',
    description: 'Soothes irritation and regulates oil production, creating the optimal environment for thicker, fuller hair growth.',
    image: '/download-2.jpg'
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
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === index
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
        <div className="relative bg-[#FAFAF9] rounded-3xl overflow-hidden shadow-xl min-h-[400px] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 h-full"
            >
              {/* Left: Image */}
              <div className="relative h-64 sm:h-80 md:h-full">
                <Image
                  src={benefits[activeTab].image}
                  alt={benefits[activeTab].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right: Text */}
              <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1a2f23] mb-4 sm:mb-6">
                  {benefits[activeTab].title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {benefits[activeTab].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

