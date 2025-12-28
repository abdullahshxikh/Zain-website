import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const faqs = [
  {
    question: 'What are the key ingredients in your hair oil duo?',
    answer: 'Zumfali Hair Oil features a powerful 7-in-1 blend including Mustard Oil (nourishes scalp), Coconut Oil (hydrates), Black Seed Oil (anti-inflammatory), Castor Oil (thickens), Pumpkin Seed Oil (blocks DHT), Rosemary Oil (stimulates growth), and Vitamin E (antioxidant repair). It is 100% natural and free from synthetic fragrances.'
  },
  {
    question: 'Is the hair oil duo safe for everyone to use?',
    answer: 'Our oil is formulated with natural ingredients and is generally safe for all hair types. However, we recommend doing a patch test first, especially if you have sensitive skin or known allergies to any of the botanical ingredients. Consult your doctor if pregnant or nursing.'
  },
  {
    question: 'How do you ensure the quality and safety of your hair oil duo?',
    answer: 'We source premium, ethically harvested ingredients and manufacture in small batches to ensure freshness and potency. Our formula is third-party tested for purity and free from harmful additives like parabens, sulfates, and silicones.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'We process orders within 1-2 business days. Standard shipping typically takes 8-12 business days within the US. International shipping times vary based on location.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship internationally! Shipping rates and times will be calculated at checkout based on your location.'
  }
];

export default function DetailedFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: FAQ Content */}
          <div className="flex-1 w-full">
            <motion.p
              className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[#1a2f23] mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Zumfali Questions—Answered.
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full px-6 py-5 flex items-center justify-between text-left rounded-full transition-all duration-300 ${openIndex === index
                      ? 'bg-[#1a2f23] text-white'
                      : 'bg-[#1a2f23] text-white hover:bg-[#2d4a38]'
                      }`}
                  >
                    <span className="font-medium text-sm sm:text-base pr-4 flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-[10px] font-serif italic">?</span>
                      {faq.question}
                    </span>
                    <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-6 text-gray-600 leading-relaxed bg-gray-50 rounded-3xl mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Product Image Card */}
          <motion.div
            className="w-full lg:w-1/3 relative sticky top-32"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/targeting grwth anytime a portable rokl in. desigen for dges and thinig ares felivers precise nourishmwnt and promotes concintend growth on the go 3/2.png"
                  alt="Zumfali Bundle"
                  title="Zumfali 7-in-1 Hair Oil Bundle"
                  fill
                  className="object-contain"
                />

                {/* Badge Overlay similar to reference */}
                <div className="absolute top-6 right-6 bg-[#1a2f23] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  Official Brand
                </div>
              </div>

              <div className="p-6 bg-[#fafaf9] border-t border-gray-100">
                <h3 className="text-lg font-bold text-[#1a2f23] mb-1">Zumfali 7-in-1 Duo</h3>
                <p className="text-sm text-gray-500 mb-4">Complete Hair & Scalp Care System</p>
                <button className="w-full py-3 bg-[#bb9c30] text-white font-bold rounded-full hover:bg-[#a38b2b] transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
