'use client';

import React from 'react';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
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

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side - Image / Slider */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl lg:h-[600px] bg-gray-50">
             <Swiper
              modules={[Navigation, Pagination]}
              grabCursor={false}
              allowTouchMove={false}
              centeredSlides={true}
              loop={true}
              slidesPerView={1}
              spaceBetween={0}
              navigation
              pagination={{ clickable: true }}
              className="problem-solution-swiper h-full w-full"
            >
              {pairs.map(([a, b], i) => (
                <SwiperSlide key={i} className="h-full w-full">
                  <BeforeAfterSlider
                    beforeSrc={`/before-after/${a}.jpg`}
                    afterSrc={`/before-after/${b}.jpg`}
                    beforeLabel="Before"
                    afterLabel="After"
                    height={600}
                    initial={50}
                    className="h-full w-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="block text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                Hair Loss Isn&apos;t Just &quot;Bad Luck&quot;
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1a2f23] leading-[1.1] mb-6">
                It&apos;s Not Just Genetics—It&apos;s <br />
                <span className="text-[#bb9c30]">Scalp Starvation.</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                If you feel constantly worried about shedding, hiding thinning patches, and seeing more hair in the drain than on your head—you&apos;re not alone.
              </p>
              <p className="font-medium text-[#1a2f23]">
                This is what follicle dormancy feels like.
              </p>
              <p>
                And it&apos;s not just &quot;getting older&quot;—it&apos;s your scalp stuck in survival mode, starved of the essential nutrients and blood flow it needs to thrive.
              </p>
            </div>

            <div className="pt-4">
               <button className="w-12 h-12 rounded-full bg-[#1a2f23] text-white flex items-center justify-center hover:bg-[#2d4a38] transition-colors shadow-lg">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
               </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .problem-solution-swiper .swiper-button-next,
        .problem-solution-swiper .swiper-button-prev {
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .problem-solution-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        .problem-solution-swiper .swiper-pagination-bullet-active {
          background: #bb9c30;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
