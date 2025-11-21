'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  'Sign up today & get a free gift on us',
  'Buy 2 bottles, get 1 free',
  'Free shipping on orders over $30',
  'Made with 8 powerful natural ingredients',
  'Limited launch spots – reserve yours now',
];

export default function RunningBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#2d4a38]/20"
      style={{
        background:
          'linear-gradient(90deg, #1a2f23 0%, #2d4a38 50%, #1a2f23 100%)',
      }}
    >
      <div className="py-3 sm:py-4">
        <div className="relative flex items-center">
          {/* Left gradient fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-[#1a2f23] to-transparent" />
          {/* Right gradient fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-[#1a2f23] to-transparent" />

          <motion.div
            className="flex gap-10 sm:gap-16 whitespace-nowrap px-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            }}
          >
            {[...messages, ...messages].map((msg, index) => (
              <div
                key={`${msg}-${index}`}
                className="flex items-center gap-3 text-xs sm:text-sm md:text-base font-semibold text-emerald-50"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#bb9c30] text-black text-xs">
                  ✨
                </span>
                <span>{msg}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


