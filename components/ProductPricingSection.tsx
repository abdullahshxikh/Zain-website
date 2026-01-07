'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const bulletPoints = [
  'A nourishing blend that supports growth, restores natural shine, and helps reduce hair fall.',
  'With all Natural Ingredients: Mustard · Coconut · Black Seed · Castor · Pumpkin · Rosemary · Vitamin E Oil',
  'For All Hair Types · No Greasy Residue · 30 mL Dropper + 10 mL Roll On',
];

export default function ProductPricingSection() {

  // if (!mounted) return null;

  return (
    <section
      id="pricing"
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
                src="/targeting grwth anytime a portable rokl in. desigen for dges and thinig ares felivers precise nourishmwnt and promotes concintend growth on the go 3/2.png"
                alt="Zumfali 7-in-1 Hair Oil Duo"
                title="Zumfali 7-in-1 Hair Oil Duo"
                fill
                className="object-contain hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>

          {/* Right Side - Product Details & Signup */}
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

            {/* Buy Now Box */}
            <motion.div
              className="relative mt-10 p-8 sm:p-10 rounded-2xl bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/shop" className="block w-full">
                <motion.button
                  className="w-full py-4 rounded-xl font-medium text-lg text-white shadow-lg shadow-[#bb9c30]/20 transition-all uppercase tracking-widest"
                  style={{ background: 'linear-gradient(135deg, #bb9c30 0%, #d4b554 100%)' }}
                  whileHover={{ scale: 1.01, shadow: '0 20px 40px -10px rgba(187, 156, 48, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


