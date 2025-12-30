'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  'Sign up today & get a free gift on us',
  'Buy 2 bottles, get 1 free',
  'Free shipping on orders over $30',
  'Made with 7 powerful natural ingredients',
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
      className="relative w-full overflow-hidden"
      style={{
        background: '#1a2f23',
      }}
    >
      <div className="py-3">
        <div className="relative flex items-center">
          {/* Left gradient fade */}
          <div className="pointer-events-none z-10 absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#1a2f23] to-transparent" />
          {/* Right gradient fade */}
          <div className="pointer-events-none z-10 absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#1a2f23] to-transparent" />

          <motion.div
            className="flex gap-24 whitespace-nowrap px-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            }}
          >
            {[...messages, ...messages].map((msg, index) => (
              <div
                key={`${msg}-${index}`}
                className="flex items-center gap-4 text-lg font-bold tracking-wide text-white"
              >
                <span className="text-[#bb9c30] text-base">✦</span>
                <span className="uppercase tracking-widest">{msg}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


