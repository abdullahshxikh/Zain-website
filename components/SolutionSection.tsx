'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const benefits = [
  {
    icon: '⚡',
    title: 'Stimulate Growth & Vitality',
    description: 'Activate dormant follicles naturally',
    color: '#bb9c30',
  },
  {
    icon: '💎',
    title: 'Nourish Scalp Health',
    description: 'Deep hydration & nutrient delivery',
    color: '#bb9c30',
  },
  {
    icon: '🌟',
    title: 'Strengthen Hair Follicles',
    description: 'Build resilience from root to tip',
    color: '#bb9c30',
  },
  {
    icon: '🛡️',
    title: 'Prevent Hair Loss',
    description: 'Protect against thinning & breakage',
    color: '#bb9c30',
  },
  {
    icon: '✨',
    title: 'Boost Thickness & Volume',
    description: 'Achieve fuller, healthier hair',
    color: '#bb9c30',
  },
];

export default function SolutionSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden" style={{
      backgroundColor: '#e8dcc8',
    }}>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">The Solution? </span>
            <span className="text-[#bb9c30]">Zumfali.</span>
          </h2>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Maintaining balanced hair health is pivotal for contributing to an overall sense of well-being. 
            Encouraging your hair's natural growth function can help you achieve:
          </motion.p>
        </motion.div>

        {/* Main Layout: Tree Left, Benefits Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-16">
          {/* Left Side - Tree with Circles */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Rotating circles */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full hidden sm:block"
                    style={{
                      width: `${320 + i * 60}px`,
                      height: `${320 + i * 60}px`,
                      border: `2px solid ${i === 0 ? '#bb9c30' : i === 1 ? '#6b8d5b' : '#cbc7b7'}`,
                      opacity: 0.3,
                    }}
                  />
                ))}
              </motion.div>

              {/* Center circle with tree */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#bb9c30]/40 shadow-2xl flex items-center justify-center" style={{ backgroundColor: '#1a1208' }}>
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: 'rgba(187, 156, 48, 0.15)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Tree Image */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/tree-element.png"
                    alt="Natural Growth Element"
                    width={200}
                    height={200}
                    className="drop-shadow-2xl sm:w-[260px] sm:h-[260px]"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Benefits List */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  {/* Dotted line connector */}
                  <div className="flex items-center">
                    <svg width="60" height="2" className="mr-4">
                      <line
                        x1="0"
                        y1="1"
                        x2="60"
                        y2="1"
                        stroke={benefit.color}
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                    </svg>
                  </div>

                  {/* Benefit Card */}
                  <motion.div
                    className="flex-1 group cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className="text-4xl"
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3 + index,
                        }}
                      >
                        {benefit.icon}
                      </motion.div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3
                          className="text-lg sm:text-xl font-bold mb-1"
                          style={{ color: benefit.color }}
                        >
                          {benefit.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="group relative px-10 sm:px-14 py-4 sm:py-6 overflow-hidden rounded-full shadow-2xl text-lg sm:text-xl font-bold"
            style={{
              backgroundColor: '#bb9c30',
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(187, 156, 48, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-black flex items-center gap-3">
              TRY IT NOW
              <motion.svg
                className="w-6 h-6"
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
      </div>
    </section>
  );
}
