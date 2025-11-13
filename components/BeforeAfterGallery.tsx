'use client';

import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
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

export default function BeforeAfterGallery() {
  return (
    <section className="relative py-16 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
      {/* Decorative Tree Elements */}
      <motion.div
        className="absolute top-10 left-5 opacity-20 dark:opacity-10 pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tree-element.png"
          alt=""
          width={200}
          height={200}
          className="rotate-12"
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-10 opacity-15 dark:opacity-10 pointer-events-none"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Image
          src="/tree-element.png"
          alt=""
          width={180}
          height={180}
          className="-rotate-45 scale-x-[-1]"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-10 opacity-10 dark:opacity-5 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Image
          src="/tree-element.png"
          alt=""
          width={150}
          height={150}
          className="-rotate-12"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-5 opacity-10 dark:opacity-5 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Image
          src="/tree-element.png"
          alt=""
          width={160}
          height={160}
          className="rotate-45 scale-x-[-1]"
        />
      </motion.div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-neutral-900 dark:text-white">Real Results, </span>
          <span className="text-[#bb9c30]">Real People</span>
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          See the transformation. Experience the difference. Join thousands who've rediscovered their confidence.
        </p>
      </motion.div>

      {/* Carousel of Sliders */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={80}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          touchStartPreventDefault={false}
          allowTouchMove={true}
          className="before-after-swiper"
        >
          {pairs.map(([a, b], i) => (
            <SwiperSlide key={i} className="!w-[380px]">
              <div className="swiper-no-swiping">
                <BeforeAfterSlider
                  beforeSrc={`/before-after/${a}.jpg`}
                  afterSrc={`/before-after/${b}.jpg`}
                  beforeLabel="Before"
                  afterLabel="After"
                  height={500}
                  initial={50}
                  className="rounded-2xl shadow-lg overflow-hidden"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Stats */}
      <motion.div
        className="relative z-10 grid grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>
          <div className="text-2xl font-bold text-[#bb9c30] mb-1">10,000+</div>
          <div className="text-neutral-600 dark:text-neutral-400 text-xs">Happy Customers</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#6b8d5b] mb-1">94%</div>
          <div className="text-neutral-600 dark:text-neutral-400 text-xs">See Results in 30 Days</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#bb9c30] mb-1">4.9★</div>
          <div className="text-neutral-600 dark:text-neutral-400 text-xs">Average Rating</div>
        </div>
      </motion.div>

      <style jsx global>{`
        .before-after-swiper {
          padding: 40px 0 60px;
        }
        .before-after-swiper .swiper-slide {
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .before-after-swiper .swiper-slide-active {
          opacity: 1;
        }
        .before-after-swiper .swiper-button-next,
        .before-after-swiper .swiper-button-prev {
          color: #bb9c30;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .before-after-swiper .swiper-button-next:after,
        .before-after-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
        .before-after-swiper .swiper-pagination-bullet {
          background: #bb9c30;
        }
      `}</style>
    </section>
  );
}

