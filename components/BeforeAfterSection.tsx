'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = Array.from({ length: 20 }, (_, i) => i + 2); // Start from 2, skip 1

export default function BeforeAfterSection() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!mounted) return null;

  return (
    <section 
      className="relative py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-16 overflow-hidden" 
      style={{
        backgroundColor: '#3d5a47',
      }}
    >


      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            <span className="text-white">Real Results, </span>
            <span className="text-[#bb9c30]">Real People</span>
          </h2>
          <motion.p
            className="text-sm text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See the transformation. Experience the difference. Join thousands who've rediscovered their confidence.
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Main Image Display */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-black/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={`/before-after/${images[currentIndex]}.jpg`}
                  alt={`Before and After Result ${images[currentIndex]}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-[#bb9c30]/50 flex items-center justify-center hover:bg-[#bb9c30]/20 transition-all group"
              aria-label="Previous image"
            >
              <motion.svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </motion.svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-[#bb9c30]/50 flex items-center justify-center hover:bg-[#bb9c30]/20 transition-all group"
              aria-label="Next image"
            >
              <motion.svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </button>

            {/* Image Counter */}
            <div className="absolute top-2 right-2 z-20 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-[#bb9c30]/30">
              <span className="text-white text-xs font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, index) => (
              <motion.button
                key={img}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? 'border-[#bb9c30] scale-110 shadow-lg'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#bb9c30]/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={`/before-after/${img}.jpg`}
                  alt={`Thumbnail ${img}`}
                  fill
                  className="object-cover"
                />
                {currentIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-[#bb9c30]/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-0.5 bg-black/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: '#6b8d5b' }}
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / images.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-6 sm:mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#bb9c30] mb-1">10,000+</div>
            <div className="text-gray-300 text-xs">Happy Customers</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#6b8d5b] mb-1">94%</div>
            <div className="text-gray-300 text-xs">See Results in 30 Days</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#bb9c30] mb-1">4.9★</div>
            <div className="text-gray-300 text-xs">Average Rating</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

