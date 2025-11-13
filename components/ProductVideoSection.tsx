'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface CustomerReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  location: string;
  avatar: string;
}

const customerReviews: CustomerReview[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    comment: "Amazing results in just 3 weeks! My hair feels thicker and healthier.",
    location: "New York, NY",
    avatar: "SM"
  },
  {
    id: 2,
    name: "Michael R.",
    rating: 5,
    comment: "Best hair oil I've ever used. Natural ingredients make all the difference.",
    location: "Los Angeles, CA",
    avatar: "MR"
  },
  {
    id: 3,
    name: "Emma L.",
    rating: 5,
    comment: "My hairdresser noticed the improvement immediately. Highly recommend!",
    location: "Chicago, IL",
    avatar: "EL"
  },
  {
    id: 4,
    name: "David K.",
    rating: 5,
    comment: "Finally found something that works! Hair growth is visible after 1 month.",
    location: "Miami, FL",
    avatar: "DK"
  },
  {
    id: 5,
    name: "Jessica T.",
    rating: 5,
    comment: "Love the natural formula. No harsh chemicals, just pure results.",
    location: "Seattle, WA",
    avatar: "JT"
  },
  {
    id: 6,
    name: "Alex P.",
    rating: 5,
    comment: "Worth every penny! My confidence is back thanks to Zumfali.",
    location: "Austin, TX",
    avatar: "AP"
  }
];

export default function ProductVideoSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showReview, setShowReview] = useState(false);

  // Cycle through reviews every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowReview(false);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % customerReviews.length);
        setShowReview(true);
      }, 300);
    }, 4000);

    // Show first review after 2 seconds
    const initialTimeout = setTimeout(() => {
      setShowReview(true);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);


  const currentReview = customerReviews[currentReviewIndex];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Full-width Video Container */}
      <div className="relative w-full h-screen">
        <video
          className="w-full h-full object-cover"
          controls={false}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/customer-testimonial-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-black/20"></div>


        {/* Customer Review Overlay - Alternating Corners */}
        <AnimatePresence mode="wait">
          {showReview && (
            <motion.div
              key={currentReview.id}
              className={`absolute z-30 ${
                currentReviewIndex % 4 === 0 ? 'top-32 left-8' :
                currentReviewIndex % 4 === 1 ? 'top-32 right-8' :
                currentReviewIndex % 4 === 2 ? 'bottom-32 left-8' :
                'bottom-32 right-8'
              }`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black/90 backdrop-blur-md rounded-2xl p-6 max-w-sm border border-white/20 shadow-2xl">
                {/* Customer Avatar and Info */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#bb9c30] to-[#6b8d5b] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {currentReview.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{currentReview.name}</h4>
                    <p className="text-white/60 text-xs">{currentReview.location}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#bb9c30] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-white/90 text-sm leading-relaxed">
                  "{currentReview.comment}"
                </p>

                {/* Verified Badge */}
                <div className="flex items-center mt-4 pt-3 border-t border-white/10">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-400 text-xs font-medium">Verified Purchase</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Floating Elements for Visual Interest */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}