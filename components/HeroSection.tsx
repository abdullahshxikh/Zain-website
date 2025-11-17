'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/hero-image.png"
        alt="10,000 Women Can't be Wrong - Transform Dry, Damaged Strands into Nourished Hair"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      
      {/* CTA Button - Adjusted Position */}
      <motion.div
        className="absolute bottom-44 left-0 sm:bottom-52 sm:left-4 md:bottom-56 md:left-10 z-20"
        initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
            <motion.button
          className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg md:text-xl text-black shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #bb9c30 0%, #d4b554 100%)',
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 25px 50px rgba(187, 156, 48, 0.5)',
          }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </motion.div>
    </section>
  );
}
