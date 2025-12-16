'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const benefits = [
  {
    icon: '🌱',
    title: 'Stimulate Natural Growth',
    description: 'Activate dormant follicles with botanical power',
  },
  {
    icon: '💧',
    title: 'Deep Scalp Nourishment',
    description: 'Essential nutrients penetrate to the root',
  },
  {
    icon: '💪',
    title: 'Strengthen From Within',
    description: 'Build resilient, break-resistant strands',
  },
  {
    icon: '🛡️',
    title: 'Protect & Prevent Loss',
    description: 'Shield against thinning and damage',
  },
  {
    icon: '✨',
    title: 'Restore Natural Shine',
    description: 'Unlock radiant, healthy-looking hair',
  },
  {
    icon: '🌿',
    title: 'Balance & Vitality',
    description: 'Maintain optimal scalp ecosystem',
  },
];

export default function SolutionSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="px-6 py-2 rounded-full border border-[#bb9c30]/30 bg-[#bb9c30]/10">
              <span className="text-[#8c7335] font-medium text-xs uppercase tracking-[0.2em]">The Natural Solution</span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight text-[#1a2f23]">
            Your Hair Deserves <br />
            <span className="italic text-[#bb9c30]">Nature&apos;s Best</span>
          </h2>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Zumfali combines ancient botanical wisdom with modern science to deliver <span className="text-[#1a2f23] font-medium">transformative results</span> without compromise.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group relative p-8 rounded-2xl border border-[#bb9c30]/25 bg-white shadow-sm shadow-black/5 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="text-4xl mb-6 opacity-90">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif text-[#8c7335] mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light group-hover:text-gray-700 transition-colors">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight with Tree */}
        <motion.div
          className="relative p-8 sm:p-16 rounded-3xl bg-gradient-to-r from-[#FAFAF9] to-white border border-[#1a2f23]/10 overflow-hidden shadow-xl shadow-black/5"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-serif text-[#1a2f23] mb-6 leading-tight">
                  Like a Tree, Healthy Hair Begins at the <span className="italic text-[#bb9c30]">Roots</span>
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                  When deeply nourished, it grows stronger, fuller, and more alive. 
                  Our 7-in-1 botanical blend delivers essential nutrients directly to your scalp.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                  <div className="flex items-center gap-2 text-[#d4b554]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="text-[#1a2f23]">100% Natural</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#d4b554]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="text-[#1a2f23]">No Harsh Chemicals</span>
                  </div>
                </div>
             </div>
             
             <div className="w-full md:w-auto flex-shrink-0">
                <Link href="/shop">
                  <motion.button
                  className="w-full md:w-auto px-10 py-4 bg-[#1a2f23] text-white rounded-full font-medium text-lg shadow-lg shadow-[#1a2f23]/20 hover:bg-[#2d4a38] hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Transformation
                </motion.button>
                </Link>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
