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
    <section className="relative w-full min-h-[100dvh] bg-[#BCA379] flex flex-col lg:flex-row overflow-hidden pt-24 lg:pt-0">
      {/* Mobile: Image on Top. Desktop: Image on Right (order-2) */}

      {/* Image Section */}
      <div className="relative w-full lg:w-[45%] h-[56vh] sm:h-[60vh] lg:h-[calc(100vh-6rem)] lg:absolute lg:right-0 lg:top-24 order-1 lg:order-2 flex items-start justify-center lg:items-start lg:justify-end px-0">
        <div className="relative w-full h-full">
          <Image
            src="/edited-photo.png"
            alt="Woman with healthy hair"
            title="Woman with healthy hair"
            fill
            className="object-cover object-top"
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="relative z-20 w-full lg:w-[55%] flex flex-col justify-start lg:justify-center px-6 sm:px-12 lg:pl-16 lg:pr-0 pb-12 lg:pb-0 order-2 lg:order-1 min-h-[50vh] lg:h-screen pt-12 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left mt-10 lg:mt-0"
        >
          {/* Top Label */}
          <div className="mb-3">
            <span className="text-[#E5D178] font-bold text-2xl sm:text-3xl font-serif">10,000 </span>
            <span className="text-[#1a1a1a] font-bold text-2xl sm:text-3xl font-serif tracking-wide">Women Can't be Wrong.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-serif font-bold text-[#0A0A0A] leading-[1.1] mb-6 tracking-tight whitespace-normal sm:whitespace-nowrap">
            TRANSFORM DRY, DAMAGED <br />
            STRANDS INTO, NOURISHED <br />
            HAIR
          </h1>

          {/* Subline / Tagline - Fixed "Grease", Single Line */}
          <p className="text-[#1a1a1a] text-base sm:text-lg font-serif font-bold mb-8 w-full lg:w-auto inline-block tracking-wide opacity-90 whitespace-normal lg:whitespace-nowrap">
            Without the Grease, Without the Chemicals, Without the Disappointment
          </p>

          {/* CTA Button */}
          <div>
            <Link href="/shop">
              <motion.button
                className="px-10 py-4 rounded-full font-bold text-sm sm:text-base tracking-widest text-white shadow-lg uppercase"
                style={{
                  backgroundColor: '#d9c063',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#ccb358'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
