'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import Image from 'next/image';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'onboarding' | 'email' | 'success'>('onboarding');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { trackSubscribe, trackCompleteRegistration } = useMetaPixel();

  useEffect(() => {
    // Only set up the timer if the component is mounted
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setStep('email');
    }, 400); // Small delay for visual feedback
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
          {/* Detailed Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#1a2f23]/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Main Card - Centered, slightly wider but single column focused */}
          <motion.div
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col min-h-[450px]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
          >
            {/* Close Button - Sticky */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-[#1a2f23] transition-colors rounded-full hover:bg-black/5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Content Area */}
            <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')] pointer-events-none" />

              <div className="relative z-10 max-w-lg mx-auto w-full">

                {/* BRAND HEADER */}
                <div className="text-center mb-6">
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
                  {step === 'onboarding' && (
                    <motion.div
                      key="onboarding"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-center"
                    >
                      <h2 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-3 leading-tight">
                        Unlock Your <br />
                        <span className="italic text-[#bb9c30]">Exclusive Discount</span>
                      </h2>
                      <p className="text-gray-500 font-medium text-sm mb-8">
                        Get customized recommendations + a special offer. <br />
                        What fits your needs best?
                      </p>

                      <div className="space-y-3 max-w-sm mx-auto">
                        <button
                          onClick={() => handleOptionSelect('20% Off')}
                          className="w-full py-4 px-6 rounded-xl border-2 font-bold text-sm tracking-wide uppercase transition-all duration-200 transform hover:scale-[1.02] bg-white border-[#1a2f23] text-[#1a2f23] hover:bg-[#1a2f23] hover:text-white shadow-sm flex items-center justify-between group"
                        >
                          <span>Just Browsing</span>
                          <span className="text-xs bg-[#bb9c30]/10 text-[#bb9c30] px-2 py-0.5 rounded group-hover:bg-white/20 group-hover:text-white">Get 20% Off</span>
                        </button>

                        <button
                          onClick={() => handleOptionSelect('30% Off')}
                          className="w-full py-4 px-6 rounded-xl border-2 font-bold text-sm tracking-wide uppercase transition-all duration-200 transform hover:scale-[1.02] bg-[#1a2f23] border-[#1a2f23] text-white shadow-lg flex items-center justify-between ring-offset-2 ring-[#bb9c30] ring-2"
                        >
                          <span>Subscribe & Save</span>
                          <span className="text-xs bg-[#bb9c30] text-white px-2 py-0.5 rounded animate-pulse">Get 30% Off</span>
                        </button>
                      </div>

                      <button onClick={handleClose} className="mt-8 text-xs text-gray-400 underline hover:text-gray-600 transition-colors">
                        No thanks, I prefer paying full price
                      </button>
                    </motion.div>
                  )}

                  {step === 'email' && (
                    <motion.div
                      key="email"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-center"
                    >
                      <h2 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-4 leading-tight">
                        Almost There!
                      </h2>
                      <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                        Where should we send your {selectedOption === '30% Off' ? '30%' : '20%'} off code?
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full py-4 px-6 rounded-full border-2 border-gray-200 bg-white text-[#1a2f23] placeholder-gray-400 focus:outline-none focus:border-[#1a2f23] text-center font-medium shadow-inner"
                        />
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-full bg-[#1a2f23] text-white font-bold tracking-widest uppercase shadow-xl hover:bg-[#2d4a38] transition-transform hover:scale-[1.02]"
                        >
                          Reveal My Code
                        </button>
                      </form>

                      <p className="mt-6 text-[10px] text-gray-400 px-4">
                        Unsubscribe at any time. We respect your privacy.
                      </p>
                    </motion.div>
                  )}

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
                        You're All Set!
                      </h2>
                      <p className="text-gray-500 mb-6">
                        Use promo code <span className="font-bold text-[#1a2f23]">ZUMFALI123</span> at checkout to get {selectedOption === '30% Off' ? '30% off your subscription' : '20% off your order'}.
                      </p>

                      <div className="bg-[#fffcf5] text-[#1a2f23] text-2xl font-mono font-bold py-5 px-10 rounded-xl border-2 border-dashed border-[#bb9c30] mb-8 tracking-widest relative group cursor-pointer shadow-sm hover:bg-[#fdfbf7] transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText('ZUMFALI123');
                          const btn = document.getElementById('copy-text');
                          if (btn) btn.innerText = 'Copied!';
                          setTimeout(() => { if (btn) btn.innerText = 'Click to Copy' }, 2000);
                        }}
                      >
                        ZUMFALI123
                        <span id="copy-text" className="absolute -bottom-6 left-0 right-0 text-[10px] text-gray-400 font-sans normal-case">Click to Copy</span>
                      </div>

                      <button
                        onClick={handleClose}
                        className="w-full max-w-xs py-4 rounded-full bg-[#1a2f23] text-white font-bold tracking-widest uppercase shadow-lg hover:shadow-xl hover:bg-[#2d4a38] transition-all"
                      >
                        Shop Now
                      </button>
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
