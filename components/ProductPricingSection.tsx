'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const bulletPoints = [
  'A nourishing blend that supports growth, restores natural shine, and helps reduce hair fall.',
  'With all Natural Ingredients: Mustard · Coconut · Black Seed · Castor · Pumpkin · Rosemary · Vitamin E Oil',
  'For All Hair Types · No Greasy Residue · 30 mL Dropper + 10 mL Roll On',
];

export default function ProductPricingSection() {
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Early signup:', { firstName, email });
  };

  if (!mounted) return null;

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden" 
      style={{
        backgroundColor: '#f5f5dc',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side - Product Image */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
              <Image
                src="/product-bundle.png"
                alt="Zumfali 7-in-1 Hair Oil Duo"
                width={1200}
                height={1200}
                className="relative z-10 w-full h-auto"
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
            className="space-y-6"
          >
            {/* Product Title */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Zumfali 7-in-1 Hair Oil Duo — Premium Bundle
            </motion.h2>

            {/* Bullet Points */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#6b8d5b]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{point}</p>
                </div>
              ))}
            </motion.div>

            {/* Early Signup Offer Box */}
            <motion.div
              className="relative mt-8 p-6 sm:p-8 rounded-2xl border-2"
              style={{
                backgroundColor: 'rgba(107, 141, 91, 0.1)',
                borderColor: '#6b8d5b',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">
                Be the first to get this bundle when it launches.
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b8d5b] transition-all"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b8d5b] transition-all"
                  required
                />
                
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-lg text-white transition-all"
                  style={{ backgroundColor: '#6b8d5b' }}
                  whileHover={{ scale: 1.02, backgroundColor: '#7da66c' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Early Access + Free Comb
                </motion.button>
              </form>

              <p className="text-gray-400 text-sm text-center mt-4">
                Sign up early and receive an exclusive code for this bundle plus a complimentary premium comb!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


