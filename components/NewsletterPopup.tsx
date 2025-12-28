'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMetaPixel } from '@/hooks/useMetaPixel';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { trackSubscribe, trackCompleteRegistration } = useMetaPixel();

  useEffect(() => {
    // Check if user has seen popup
    const hasSeen = localStorage.getItem('hasSeenPopup');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4000); // Show after 4 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Don't save to localStorage - popup will show again on next visit until email is submitted
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log('Newsletter signup:', email);
    trackSubscribe();
    trackCompleteRegistration('newsletter_popup');
    setSubmitted(true);
    localStorage.setItem('hasSeenPopup', 'true');
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-[#FAFAF9] rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!submitted ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1a2f23]/5 text-[#1a2f23] mb-6">
                  <span className="text-3xl">🎁</span>
                </div>

                <h2 className="text-3xl font-serif font-bold text-[#1a2f23] mb-3">
                  Get a <span className="text-[#bb9c30] italic">Free Comb</span>
                </h2>

                <p className="text-gray-600 font-light mb-8 leading-relaxed">
                  Sign up for our newsletter to receive a complimentary premium comb with your first order, plus exclusive access to new drops.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#bb9c30] focus:ring-1 focus:ring-[#bb9c30] transition-all text-center"
                    required
                  />

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-[#1a2f23] text-white rounded-xl font-medium text-lg shadow-lg shadow-[#1a2f23]/20 hover:bg-[#2d4a38] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Unlock My Gift
                  </motion.button>
                </form>

                <button
                  onClick={handleClose}
                  className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline decoration-gray-300 underline-offset-4"
                >
                  No thanks, I don't like free gifts
                </button>
              </div>
            ) : (
              <div className="p-12 text-center bg-[#1a2f23] text-white">
                <div className="mb-4 text-5xl">✨</div>
                <h3 className="text-2xl font-serif font-bold mb-2">You're on the list!</h3>
                <p className="text-white/80 font-light">
                  Check your email for your exclusive code.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

