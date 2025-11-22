'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-[100dvh] sm:h-screen overflow-hidden bg-[#dccdbb]">
      {/* Image Wrapper to push it below navbar */}
      <div className="absolute inset-0 top-20 sm:top-24">
        <Image
          src="/Screenshot 2025-11-14 at 11.42.37 PM.png"
          alt="10,000 Women Can't be Wrong - Transform Dry, Damaged Strands into Nourished Hair"
          fill
          className="object-cover"
          style={{ objectPosition: 'center top' }}
          priority
          quality={100}
        />
      </div>
      
      {/* CTA Button */}
      <motion.div
        className="absolute top-[75%] sm:top-[70%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-12 md:left-20 z-20 w-full sm:w-auto flex justify-center sm:block px-4 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Link href="/shop">
          <motion.button
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm border border-white/20"
            style={{
              background: 'linear-gradient(135deg, #bb9c30 0%, #d4b554 100%)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(187, 156, 48, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
