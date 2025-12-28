'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import Image from 'next/image';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'onboarding' | 'email' | 'success'>('onboarding');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  const { trackSubscribe, trackCompleteRegistration } = useMetaPixel();

  useEffect(() => {
    // 60-second timer as requested
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionSelect = (concern: string) => {
    setSelectedConcern(concern);
    // Add brief delay for better UX
    setTimeout(() => {
      setStep('email');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    trackSubscribe();
    trackCompleteRegistration('newsletter_popup_quiz');
    setStep('success');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-[#1a2f23]/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Main Modal Card */}
          <motion.div
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col min-h-[500px]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-50 p-2 text-gray-400 hover:text-[#1a2f23] transition-colors rounded-full hover:bg-black/5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center relative">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')] pointer-events-none" />

              <div className="relative z-10 max-w-lg mx-auto w-full">

                {/* Brand Logo */}
                <div className="text-center mb-8">
                  <div className="relative w-40 h-16 mx-auto">
                    <Image
                      src="/Logo1.png"
                      alt="Zumfali"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* STEP 1: QUIZ */}
                  {step === 'onboarding' && (
                    <motion.div
                      key="onboarding"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-center"
                    >
                      <h2 className="text-4xl sm:text-5xl font-serif text-[#1a2f23] mb-4 leading-none tracking-tight">
                        You've got a <br />
                        special discount!
                      </h2>
                      <p className="font-mono text-gray-500 text-sm mb-6">
                        What do you use hair oil for??
                      </p>

                      <div className="space-y-3">
                        {['Hair Growth & Thickness', 'Frizz Control & Shine', 'Scalp Health', 'All of the Above'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className="w-full py-4 px-6 rounded-full border-2 border-[#1a2f23] bg-[#E5D178] text-[#1a2f23] font-bold font-mono text-sm tracking-wide transition-transform duration-200 hover:scale-[1.02] hover:bg-[#d9c063] shadow-[4px_4px_0px_0px_#1a2f23] hover:shadow-[2px_2px_0px_0px_#1a2f23] hover:translate-x-[2px] hover:translate-y-[2px] mb-3 uppercase"
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      <button onClick={handleClose} className="mt-8 text-xs text-gray-400 underline hover:text-gray-600 transition-colors">
                        I don't want a special discount!
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: EMAIL CAPTURE */}
                  {step === 'email' && (
                    <motion.div
                      key="email"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-center"
                    >
                      <h2 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-4 leading-tight">
                        We Can Help!
                      </h2>
                      <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                        Join our community to get expert tips for <span className="text-[#bb9c30] font-bold">{selectedConcern?.toLowerCase()}</span> plus an exclusive <span className="font-bold">20% OFF</span> discount code.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full py-4 px-6 rounded-full border-2 border-gray-200 bg-white text-[#1a2f23] placeholder-gray-400 focus:outline-none focus:border-[#bb9c30] focus:ring-1 focus:ring-[#bb9c30] text-center font-medium shadow-inner transition-all"
                        />
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-full bg-[#1a2f23] text-white font-bold tracking-widest uppercase shadow-xl hover:bg-[#2d4a38] transition-transform hover:scale-[1.02]"
                        >
                          Unlock My Code
                        </button>
                      </form>

                      <p className="mt-6 text-[10px] text-gray-400 px-4">
                        By signing up, you agree to receive email marketing. Unsubscribe anytime.
                      </p>
                    </motion.div>
                  )}

                  {/* STEP 3: SUCCESS / CODE */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center flex flex-col items-center justify-center h-full"
                    >
                      <div className="w-16 h-16 bg-[#bb9c30]/20 rounded-full flex items-center justify-center mb-6 text-3xl animate-bounce">
                        🎉
                      </div>
                      <h2 className="text-3xl font-serif text-[#1a2f23] mb-2">
                        You're In!
                      </h2>
                      <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                        Here is your exclusive code for <span className="font-bold text-[#1a2f23]">20% OFF</span> your first order.
                      </p>

                      <div className="bg-[#fffcf5] text-[#1a2f23] text-2xl font-mono font-bold py-5 px-10 rounded-xl border-2 border-dashed border-[#bb9c30] mb-8 tracking-widest relative group cursor-pointer shadow-sm hover:bg-[#fdfbf7] transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText('ZUMFALI20');
                          const btn = document.getElementById('copy-text');
                          if (btn) btn.innerText = 'Copied!';
                          setTimeout(() => { if (btn) btn.innerText = 'Click to Copy' }, 2000);
                        }}
                      >
                        ZUMFALI20
                        <span id="copy-text" className="absolute -bottom-6 left-0 right-0 text-[10px] text-gray-400 font-sans normal-case tracking-normal">Click to Copy</span>
                      </div>

                      <button
                        onClick={handleClose}
                        className="w-full max-w-xs py-4 rounded-full bg-[#1a2f23] text-white font-bold tracking-widest uppercase shadow-lg hover:shadow-xl hover:bg-[#2d4a38] transition-all"
                      >
                        Shop Now
                      </button>

                      <p className="mt-6 text-xs text-gray-400">
                        Apply code at checkout.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
