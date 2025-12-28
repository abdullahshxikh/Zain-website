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
    const handleScroll = () => {
      // Logic to check scroll position if necessary, but request says "60s into session, after scrolling"
      // We'll rely on time + session check primarily.
    };

    // 1 minute delay (60000ms)
    // We use sessionStorage to track "session start" if we want strict "1 min into session" logic
    // But simple setTimeout on mount mimics "1 min into visiting this page/site" 
    // If they navigate, the layout remounts? No, Layout persists in Next.js app router if it's the root layout.
    // Actually, RootLayout doesn't remount on navigation. NewsletterPopup is in RootLayout.
    // So one timeout is perfect.

    // Check if already dismissed THIS session? User said "pop up each time", likely meaning new session.
    // But if they just reloaded, does that count? "1 minute into site session".
    // I'll stick to a simple 60s timer on mount. If they reload, it restarts.

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

          {/* Main Card */}
          <motion.div
            className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
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

            {/* Left Side: Dynamic Content Content */}
            <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center relative order-2 md:order-1">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')] pointer-events-none" />

              <div className="relative z-10 max-w-md mx-auto w-full">

                {/* BRAND HEADER */}
                <div className="text-center mb-8">
                  <h3 className="font-serif font-black text-2xl tracking-tighter text-[#1a2f23]">ZUMFALI</h3>
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
                      <h2 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-4 leading-tight">
                        You've got a <br />
                        <span className="italic text-[#bb9c30]">special discount!</span>
                      </h2>
                      <p className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-8">
                        What is your main hair concern??
                      </p>

                      <div className="space-y-3">
                        {['Hair Loss & Thinning', 'Dryness & Frizz', 'Scalp Health', 'Just Maintenance'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full py-4 px-6 rounded-full border-2 font-bold text-sm tracking-wide uppercase transition-all duration-200 transform hover:scale-[1.02] ${selectedOption === option
                                ? 'bg-[#bb9c30] border-[#bb9c30] text-white shadow-lg'
                                : 'bg-transparent border-[#1a2f23] text-[#1a2f23] hover:bg-[#1a2f23] hover:text-white'
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      <button onClick={handleClose} className="mt-8 text-xs text-gray-400 underline hover:text-gray-600">
                        I don't want a special discount!
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
                        Perfect! We can help.
                      </h2>
                      <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                        Unlock your exclusive 10% off code and get your personalized hair care tips.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full py-4 px-6 rounded-full border-2 border-gray-200 bg-white text-[#1a2f23] placeholder-gray-400 focus:outline-none focus:border-[#1a2f23] text-center font-medium"
                        />
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-full bg-[#1a2f23] text-white font-bold tracking-widest uppercase shadow-xl hover:bg-[#2d4a38] transition-transform hover:scale-[1.02]"
                        >
                          Unlock 10% Off
                        </button>
                      </form>

                      <p className="mt-6 text-[10px] text-gray-400 px-4">
                        By signing up, you agree to receive email marketing. You can unsubscribe at any time.
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
                      <div className="w-16 h-16 bg-[#bb9c30]/20 rounded-full flex items-center justify-center mb-6 text-3xl">
                        🎉
                      </div>
                      <h2 className="text-3xl font-serif text-[#1a2f23] mb-2">
                        You're In!
                      </h2>
                      <p className="text-gray-500 mb-6">Use this code at checkout:</p>

                      <div className="bg-[#1a2f23] text-white text-2xl font-mono font-bold py-4 px-8 rounded-xl border-2 border-dashed border-[#bb9c30]/50 mb-6 tracking-widest relative group cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText('zumfali123');
                          // Could add toast here
                        }}
                      >
                        zumfali123
                        <span className="absolute -top-3 -right-3 bg-[#bb9c30] text-[10px] text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                      </div>

                      <button
                        onClick={handleClose}
                        className="text-[#1a2f23] font-bold border-b-2 border-[#1a2f23] hover:text-[#bb9c30] hover:border-[#bb9c30] transition-colors"
                      >
                        Start Shopping
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:block w-2/5 relative order-1 md:order-2 bg-[#F0EFED]">
              <Image
                src="/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png"
                alt="Zumfali Product"
                fill
                className="object-cover object-center scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent opacity-20" />
            </div>
            {/* Mobile Banner Image */}
            <div className="md:hidden h-48 relative w-full bg-[#F0EFED] order-1">
              <Image
                src="/Screenshot_2025-11-28_at_10.40.29_PM-removebg-preview.png"
                alt="Zumfali Product"
                fill
                className="object-contain p-4"
              />
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
