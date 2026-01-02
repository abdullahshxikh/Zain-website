'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMetaPixel } from '@/hooks/useMetaPixel';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { trackSubscribe, trackCompleteRegistration } = useMetaPixel();

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) return null;

  return (
    <section
      id="newsletter"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden bg-[#FAFAF9] border-t border-[#1a2f23]/5"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* How It Works Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-[#8c7335] font-medium tracking-widest uppercase text-sm mb-4">The Process</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1a2f23] mb-6">
            How <span className="italic text-[#bb9c30]">Zumfali</span> Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Your natural ability to grow healthy, vibrant hair - optimized.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {timeline.map((phase, index) => (
            <motion.div
              key={phase.day}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#bb9c30]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-5xl">{phase.icon}</span>
                  <span className="text-[#8c7335] font-bold text-xl tracking-wider">DAY {phase.day}</span>
                </div>

                <h3 className="text-2xl font-serif text-[#1a2f23] mb-4 group-hover:text-[#bb9c30] transition-colors">
                  {phase.title}
                </h3>

                <ul className="space-y-3">
                  {phase.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-600 text-sm font-light"
                    >
                      <span className="text-[#bb9c30] mt-1.5 h-1.5 w-1.5 rounded-full bg-[#bb9c30] flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {index < timeline.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-8 w-8 lg:w-16 h-[1px] bg-gradient-to-r from-[#1a2f23]/20 to-transparent transform -translate-y-1/2 z-0" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-[#bb9c30]/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            className="relative z-10 bg-[#FAFAF9] border border-[#1a2f23]/10 rounded-3xl p-8 sm:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="text-4xl mb-4 block">✉️</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-4">
                Join the <span className="text-[#bb9c30] italic">Community</span>
              </h2>
              <p className="text-gray-600 font-light max-w-lg mx-auto">
                Get exclusive hair care tips, early access to new products, and special discounts.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#bb9c30]/10 border border-[#bb9c30]/20 rounded-2xl p-6 text-center max-w-md mx-auto mb-8"
              >
                <div className="w-12 h-12 bg-[#bb9c30] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-[#1a2f23] mb-1">Welcome to the Family!</h3>
                <p className="text-gray-600 font-light text-sm">You've successfully subscribed to our newsletter.</p>
              </motion.div>
            ) : (
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3.5 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#bb9c30] transition-colors"
                  ref={emailRef}
                />
                <button
                  className="px-8 py-3.5 bg-[#1a2f23] text-white rounded-full font-medium hover:bg-[#2d4a38] transition-colors shadow-lg shadow-[#1a2f23]/20"
                  type="button"
                  onClick={() => {
                    const email = emailRef.current?.value?.trim();
                    if (!email) return;
                    trackSubscribe();
                    trackCompleteRegistration('newsletter_inline');
                    setIsSubmitted(true);
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-light">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>10,000+ subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>No spam, ever</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


