'use client';

import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const pairs = [
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
  [12, 13],
  [14, 15],
  [16, 17],
  [18, 19],
  [20, 21],
];

export default function SingleBeforeAfterGallery() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#FAFAF9' }}>
      
      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-[#1a2f23]">
          Real Results, <span className="italic text-[#bb9c30]">Real People</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
          See the transformation. Experience the difference. Join thousands who've rediscovered their confidence.
        </p>
      </motion.div>

      {/* Carousel of Sliders */}
      <div className="relative z-10 w-full mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          touchStartPreventDefault={false}
          allowTouchMove={true}
          className="single-before-after-swiper"
        >
          {pairs.map(([a, b], i) => (
            <SwiperSlide key={i} className="!flex !h-auto items-center justify-center px-2 pb-12">
              <div className="swiper-no-swiping w-full mx-auto max-w-xl">
                <BeforeAfterSlider
                  beforeSrc={`/before-after/${a}.jpg`}
                  afterSrc={`/before-after/${b}.jpg`}
                  beforeLabel="Before"
                  afterLabel="After"
                  height={540}
                  initial={50}
                  className="rounded-3xl shadow-2xl overflow-hidden bg-black/10"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Stats */}
      <motion.div
        className="relative z-10 grid grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>
          <div className="text-3xl md:text-4xl font-bold text-[#bb9c30] mb-1">10,000+</div>
          <div className="text-gray-700 text-sm md:text-base">Happy Customers</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-[#6b8d5b] mb-1">94%</div>
          <div className="text-gray-700 text-sm md:text-base">See Results in 30 Days</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-[#bb9c30] mb-1">4.9★</div>
          <div className="text-gray-700 text-sm md:text-base">Average Rating</div>
        </div>
      </motion.div>

      <style jsx global>{`
        .single-before-after-swiper {
          padding: 10px 0 40px;
        }
        .single-before-after-swiper .swiper-button-next,
        .single-before-after-swiper .swiper-button-prev {
          color: #bb9c30;
          background: rgba(255, 255, 255, 0.8);
          width: 48px;
          height: 48px;
          border-radius: 999px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .single-before-after-swiper .swiper-button-next:after,
        .single-before-after-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        .single-before-after-swiper .swiper-pagination-bullet {
          background: #bb9c30;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </section>
  );
}

