'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const timeline = [
  {
    day: 7,
    title: 'Awakening',
    icon: '⚡',
    color: '#bb9c30',
    benefits: [
      'Rosemary oil activates dormant follicles',
      'Scalp feels refreshed and nourished',
      'Natural oils begin penetrating deeply',
      'Notice reduced itchiness & dryness',
    ],
  },
  {
    day: 30,
    title: 'Growth',
    icon: '🌟',
    color: '#bb9c30',
    benefits: [
      'New hair growth becomes visible',
      'Existing hair feels thicker & stronger',
      'Scalp health dramatically improved',
      'People notice your hair looks healthier',
    ],
  },
  {
    day: 90,
    title: 'Transformation',
    icon: '🚀',
    color: '#bb9c30',
    benefits: [
      'All 7 ingredients working in perfect harmony',
      'Hair growth cycle fully optimized',
      'This is your new normal - sustained results',
      'Welcome to the hair you deserve',
    ],
  },
];

export default function HowItWorksNewsletterSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #0b2618 0%, #123624 50%, #0b2618 100%)',
      }}
    >

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* How It Works Section */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-emerald-100">How Does </span>
            <span className="text-emerald-300">Zumfali</span>
            <span className="text-emerald-100"> Work?</span>
          </h2>
          <motion.p
            className="text-base text-emerald-100/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your natural ability to grow healthy, vibrant hair - optimized.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 mb-16 sm:mb-20">
          {timeline.map((phase, index) => (
            <motion.div
              key={phase.day}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative bg-emerald-900/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-emerald-400/30 shadow-2xl h-full">
                <motion.div
                  className="text-4xl sm:text-5xl mb-4 text-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {phase.icon}
                </motion.div>

                <div className="text-center mb-4">
                  <motion.div
                    className="inline-flex items-center gap-2 mb-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-emerald-300 text-xl sm:text-2xl font-bold">
                      DAY {phase.day}
                    </span>
                  </motion.div>
                  <h3 className="text-emerald-50 text-xl sm:text-2xl font-bold">
                    {phase.title}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {phase.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-emerald-50/90 text-xs sm:text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                    >
                      <span className="text-emerald-300 mt-1 flex-shrink-0">•</span>
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

              </div>

              {index < timeline.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-20 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5"
                  style={{ backgroundColor: '#34d399', transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section - No visual separator */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block text-6xl sm:text-7xl mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✉️
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-emerald-50">Join the </span>
              <span className="text-emerald-300">Zumfali</span>
              <span className="text-emerald-50"> Community</span>
            </h2>
            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto">
              Get exclusive hair care tips, early access to new products, and special discounts delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-emerald-900/40 border-2 border-emerald-400/40 rounded-full text-emerald-50 placeholder-emerald-100/60 focus:outline-none focus:border-emerald-300 transition-colors"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                className="group relative px-8 sm:px-10 py-4 overflow-hidden rounded-full shadow-2xl font-bold"
                style={{
                  backgroundColor: '#34d399',
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(187, 156, 48, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-black whitespace-nowrap">
                  Subscribe
                </span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-emerald-100/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span>
              <span>10,000+ subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span>
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span>
              <span>Unsubscribe anytime</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className="group relative px-10 sm:px-14 py-4 sm:py-6 overflow-hidden rounded-full shadow-2xl text-lg sm:text-xl font-bold"
              style={{
                backgroundColor: '#6b8d5b',
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(107, 141, 91, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-white flex items-center gap-3">
                Shop Zumfali Now
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
      </div>
    </section>
  );
}


