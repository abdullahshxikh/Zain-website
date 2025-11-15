'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(26, 47, 35, 0.98)' : 'rgba(26, 47, 35, 0.92)',
          backdropFilter: 'blur(10px)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/Logo1.png"
                alt="Zumfali"
                width={140}
                height={40}
                className="h-8 sm:h-10 w-auto"
                priority
              />
              <span className="sr-only">Zumfali</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {['Home', 'Ingredients', 'Results', 'Shop'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm lg:text-base font-medium transition-colors"
                  style={{ color: '#e8dcc8' }}
                  whileHover={{ scale: 1.1, color: '#bb9c30' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <motion.button
              className="hidden md:block px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-xs lg:text-sm text-black"
              style={{ backgroundColor: '#bb9c30' }}
              whileHover={{ scale: 1.05, backgroundColor: '#d4b554' }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-[#bb9c30] rounded"
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-[#bb9c30] rounded"
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-[#bb9c30] rounded"
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-16 right-0 w-64 bg-[#1a2f23] shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="flex flex-col p-6 gap-6">
                {['Home', 'Ingredients', 'Results', 'Shop'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg font-medium text-[#e8dcc8] hover:text-[#bb9c30] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  className="mt-4 px-6 py-3 rounded-full font-semibold text-sm text-black"
                  style={{ backgroundColor: '#bb9c30' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

