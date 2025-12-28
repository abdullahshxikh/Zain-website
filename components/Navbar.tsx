'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  isShopifyLoggedIn,
  redirectToShopifyLogin,
} from '@/lib/shopifyAuth';

const leftNavItems = ['Home', 'Shop Now', 'About Us', 'Contact Us'];
const rightNavItems = ['Search', 'Account', 'Cart'];

export default function Navbar() {
  const router = useRouter();
  const { openCart, itemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountLoggedIn, setAccountLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setAccountLoggedIn(isShopifyLoggedIn());
  }, [mounted]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  const handleAccountClick = () => {
    if (accountLoggedIn) {
      router.push('/account');
    } else {
      redirectToShopifyLogin();
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Top Banner */}
      <div
        className="w-full py-1.5 text-center text-white text-sm font-semibold"
        style={{ backgroundColor: '#2d4a38' }}
      >
        Sign up today and receive a free gift on us!
      </div>

      {/* Main Navbar */}
      <motion.nav
        className="w-full transition-all duration-300 border-b border-white/20"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(245, 245, 220, 0.95)',
          boxShadow: scrolled
            ? '0 4px 20px rgba(0, 0, 0, 0.05)'
            : 'none',
        }}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center h-14 sm:h-16 gap-4">
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {leftNavItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Shop Now' ? '/shop' : item === 'Home' ? '/' : item === 'Contact Us' ? '/contact' : `/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <motion.span
                    className="text-sm font-medium transition-colors text-gray-800 hover:text-[#bb9c30] cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <Link href="/" className="flex-1 flex items-center justify-center focus:outline-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/Logo1.png"
                  alt="Zumfali"
                  title="Zumfali logo"
                  width={320}
                  height={110}
                  className="h-14 sm:h-20 md:h-24 w-auto"
                  priority
                />
                <span className="sr-only">Zumfali</span>
              </motion.div>
            </Link>

            {/* Right Icons/Links */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
              {rightNavItems.map((item) => {
                if (item === 'Account') {
                  return (
                    <motion.button
                      key={item}
                      type="button"
                      onClick={handleAccountClick}
                      className="text-gray-800 hover:text-[#bb9c30] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Account"
                    >
                      <svg
                        className={`w-5 h-5 ${accountLoggedIn ? 'text-[#1a2f23]' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </motion.button>
                  );
                }

                return (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={item === 'Cart' ? openCart : undefined}
                    className="text-gray-800 hover:text-[#bb9c30] transition-colors relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={item}
                  >
                    {item === 'Search' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                    {item === 'Cart' && (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 0 014 0z" />
                        </svg>
                        {itemCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 bg-[#bb9c30] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {itemCount}
                          </span>
                        )}
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-1 flex justify-end">
              <button
                className="flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="w-6 h-0.5 bg-gray-800 rounded"
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-gray-800 rounded"
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-gray-800 rounded"
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-0 right-0 h-full w-64 shadow-2xl"
              style={{ backgroundColor: '#f5f5dc' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="flex flex-col gap-4 p-6 pt-24">
                {[...leftNavItems, ...rightNavItems].map((item) => {
                  if (item === 'Account') {
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleAccountClick();
                        }}
                      >
                        <span className="py-2 text-base font-medium text-gray-800 transition-colors hover:text-[#2d4a38] block text-left w-full">
                          {item}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item}
                      href={
                        item === 'Shop Now'
                          ? '/shop'
                          : item === 'Home'
                            ? '/'
                            : item === 'Contact Us'
                              ? '/contact'
                              : `/#${item.toLowerCase().replace(/\s+/g, '-')}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="py-2 text-base font-medium text-gray-800 transition-colors hover:text-[#2d4a38] block">
                        {item}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

