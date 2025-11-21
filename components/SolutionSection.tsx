'use client';

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
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a2f23 0%, #2d4a38 50%, #1a2f23 100%)',
      }}
    >
      {/* Decorative Tree Elements - Background */}
      <motion.div
        className="absolute top-20 left-10 opacity-10 pointer-events-none"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="/tree-element.png"
          alt=""
          width={300}
          height={300}
          className="blur-sm"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-10 pointer-events-none"
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="/tree-element.png"
          alt=""
          width={250}
          height={250}
          className="blur-sm scale-x-[-1]"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="px-6 py-2 rounded-full border-2 border-[#bb9c30]/40 bg-[#bb9c30]/10">
              <span className="text-[#bb9c30] font-semibold text-sm uppercase tracking-wider">The Natural Solution</span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Your Hair Deserves </span>
            <span 
              className="bg-gradient-to-r from-[#bb9c30] via-[#d4b554] to-[#bb9c30] bg-clip-text text-transparent"
            >
              Nature's Best
            </span>
          </h2>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Zumfali combines ancient botanical wisdom with modern science to deliver 
            <span className="text-[#bb9c30] font-semibold"> transformative results</span>
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="relative h-full p-6 rounded-2xl border-2 border-[#6b8d5b]/30 bg-gradient-to-br from-[#1a2f23]/80 to-[#2d4a38]/60 backdrop-blur-sm overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(187, 156, 48, 0.6)',
                  boxShadow: '0 20px 40px rgba(187, 156, 48, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(187, 156, 48, 0.15) 0%, transparent 70%)',
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#bb9c30] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                  <svg viewBox="0 0 100 100" fill="none">
                    <path d="M0 0 L100 0 L100 100 Z" fill="#bb9c30" opacity="0.3" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight with Tree */}
        <motion.div
          className="relative mb-16 p-8 sm:p-12 rounded-3xl border-2 border-[#bb9c30]/40 bg-gradient-to-r from-[#1a2f23]/90 to-[#2d4a38]/90 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Large Tree Watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Image
              src="/tree-element.png"
              alt=""
              width={400}
              height={400}
            />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Like a Tree, Healthy Hair Begins at the 
              <span className="text-[#bb9c30]"> Roots</span>
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              When deeply nourished, it grows stronger, fuller, and more alive. 
              Our 7-in-1 botanical blend delivers essential nutrients directly to your scalp, 
              revitalizing each follicle from the foundation up.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-[#6b8d5b]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white">100% Natural Ingredients</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b8d5b]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white">No Harsh Chemicals</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b8d5b]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white">Scientifically Proven</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            className="group relative px-12 sm:px-16 py-5 sm:py-6 overflow-hidden rounded-full shadow-2xl text-lg sm:text-xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #bb9c30 0%, #d4b554 100%)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 25px 50px rgba(187, 156, 48, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />
            <span className="relative z-10 text-black flex items-center justify-center gap-3">
              Start Your Transformation
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
          
          <motion.p
            className="mt-4 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join 10,000+ satisfied customers who've transformed their hair naturally
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
