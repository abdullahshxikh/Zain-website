import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ClinicallyTested() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
              Beauty & Wellness, Simplified.
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a2f23] mb-6 leading-tight">
              Clinically Tested. <br />
              <span className="text-[#bb9c30]">Expert Approved.</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Zumfali is your smart, all-in-one hair care solution designed to support radiant shine and vibrant health in one clean, powerful blend.
            </p>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Why juggle multiple oils, serums, or masks? We believe in hair care without the overwhelm. That's why Zumfali delivers everything you need—and nothing you don't—in one convenient daily application.
            </p>
            
            <div className="mb-10">
              <p className="text-xl font-medium text-[#1a2f23] italic">
                One blend. One habit. Total transformation.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-[#1a2f23] text-[#1a2f23] font-bold uppercase tracking-widest hover:bg-[#1a2f23] hover:text-white transition-colors duration-300 rounded-md"
            >
              Try Zumfali Now
            </motion.button>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
               {/* Since the user provided a specific screenshot, we use it. */}
              <Image
                src="/Screenshot 2025-12-02 at 10.03.28 PM.png"
                alt="Clinically Tested Formula"
                fill
                className="object-cover"
              />
              
              {/* Optional overlay for better text contrast if needed, 
                  but the design is clean white/light usually. */}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#bb9c30]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1a2f23]/5 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

