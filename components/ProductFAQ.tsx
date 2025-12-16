import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const faqs = [
  {
    question: 'How To Use',
    answer: 'Apply 2-3 full droppers of the 30ml oil directly to the scalp and massage gently. Use the 10ml roll-on for targeted application on thinning areas. For best results, leave it on overnight or for at least 2 hours before washing.'
  },
  {
    question: 'Backed by Science. Trusted by Results.',
    answer: 'Our formula contains scientifically proven ingredients like Rosemary Oil (shown to be as effective as 2% minoxidil), Pumpkin Seed Oil (supports hair count increase), and Black Seed Oil (anti-inflammatory properties).',
  },
  {
    question: 'How Long Until I See Results?',
    answer: 'Most customers notice reduced hair fall within 2-4 weeks. Visible thickness and new growth typically appear around months 3-4 with consistent use. Results may vary.',
  },
  {
    question: 'Will This Work For Everyone?',
    answer: 'While effective for many hair types and concerns, individual results depend on the underlying cause of hair issues. It works best for thinning, breakage, and scalp health improvement.',
  },
  {
    question: 'The Zumfali Promise',
    answer: 'We stand by our product. If you are not satisfied with your purchase, contact us within 30 days for a full refund, no questions asked.',
  },
];

const reviews = [
  {
    name: 'Kathy Stivaletti',
    stars: 5,
    quote: "Love this oil to help with hair growth. It really helps me feel better about my hair and calmer knowing I'm doing something good for it. I am delighted with the easy to use bottle and that there is no weird smell. Plenty to last for a few weeks.",
    image: '/model-transparent.png', // Placeholder, using existing image or a generic user icon if preferred
  },
  {
    name: 'Sarah J.',
    stars: 5,
    quote: "I was skeptical at first, but the results speak for themselves. My edges are finally filling in!",
    image: '/model-transparent.png',
  },
  {
    name: 'Michael R.',
    stars: 5,
    quote: "Great product. Non-greasy and smells natural. Noticed less hair in the shower drain after 3 weeks.",
    image: '/model-transparent.png',
  }
];

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentReview, setCurrentReview] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      {/* FAQ Accordion */}
      <div className="space-y-2 mb-12">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
              <span className="font-bold text-[#1a2f23] group-hover:text-[#bb9c30] transition-colors">
                {faq.question}
              </span>
              <span className={`transform transition-transform duration-300 text-gray-400 ${openIndex === index ? 'rotate-45' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
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
                  <p className="pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Reviews Carousel */}
      <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
             {/* Using a generic placeholder if no image available, or the model image as placeholder */}
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
               {reviews[currentReview].image ? (
                 <Image src={reviews[currentReview].image} alt={reviews[currentReview].name} title={`${reviews[currentReview].name} review photo`} fill className="object-cover" />
               ) : (
                 reviews[currentReview].name.charAt(0)
               )}
             </div>
          </div>
          
          <div className="flex-1">
            <div className="flex text-[#bb9c30] mb-2">
              {[...Array(reviews[currentReview].stars)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 text-sm italic mb-3">
              &quot;{reviews[currentReview].quote}&quot;
            </p>
            <p className="text-xs font-bold text-[#1a2f23] uppercase tracking-wide">
              {reviews[currentReview].name}
            </p>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center gap-2 mt-4">
           {reviews.map((_, idx) => (
             <button
               key={idx}
               onClick={() => setCurrentReview(idx)}
               className={`w-2 h-2 rounded-full transition-colors ${
                 currentReview === idx ? 'bg-[#1a2f23]' : 'bg-gray-300'
               }`}
               aria-label={`Go to review ${idx + 1}`}
             />
           ))}
        </div>
      </div>
    </div>
  );
}

