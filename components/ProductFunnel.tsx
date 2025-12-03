import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const comparisonData = [
  {
    feature: '7 Premium Natural Ingredients',
    zumfali: true,
    others: false,
  },
  {
    feature: 'Dual Applicator (Dropper + Roll-on)',
    zumfali: true,
    others: false,
  },
  {
    feature: 'Non-Greasy, Lightweight Formula',
    zumfali: true,
    others: false,
  },
  {
    feature: 'Visible Results in 90 Days',
    zumfali: true,
    others: false,
  },
  {
    feature: 'Free from Synthetic Fragrances',
    zumfali: true,
    others: false,
  },
];

export default function ProductFunnel() {
  return (
    <section className="py-20 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Comparison Section --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2f23] mb-4">
              Not All Hair Oils Are Created Equal
            </h2>
            <p className="text-gray-600">
              Here&apos;s Why More People Are Choosing Zumfali.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-3 bg-[#1a2f23]/5 p-4 sm:p-6 items-center border-b border-gray-100">
              <div className="col-span-1"></div>
              <div className="col-span-1 flex justify-center">
                 <div className="relative w-32 h-12">
                    {/* Text Logo equivalent */}
                    <div className="flex items-center justify-center w-full h-full bg-[#1a2f23] rounded-lg text-white font-serif font-bold text-xl">
                      <Image src="/Logo1.png" alt="Zumfali" width={100} height={40} className="w-20 h-auto object-contain filter brightness-0 invert" />
                    </div>
                 </div>
              </div>
              <div className="col-span-1 text-center font-bold text-gray-400 uppercase tracking-wider text-sm">
                Others
              </div>
            </div>

            {comparisonData.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 p-4 sm:p-6 items-center ${
                  index !== comparisonData.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="col-span-1 text-sm sm:text-base font-medium text-gray-700 pr-4">
                  {item.feature}
                </div>
                
                {/* Zumfali Column */}
                <div className="col-span-1 flex justify-center relative">
                  {/* Background highlight for Zumfali column */}
                  <div className="absolute inset-y-[-24px] inset-x-2 bg-[#bb9c30]/10 -z-10 opacity-0 sm:opacity-100" />
                  
                  {item.zumfali ? (
                    <div className="w-8 h-8 rounded-full bg-[#1a2f23] flex items-center justify-center text-white shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                    </div>
                  )}
                </div>

                {/* Others Column */}
                <div className="col-span-1 flex justify-center">
                  {item.others ? (
                    <div className="w-8 h-8 rounded-full bg-[#1a2f23] flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

