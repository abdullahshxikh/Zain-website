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
                      Zumfali
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

        {/* --- Benefits Section --- */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2f23] mb-6 leading-tight">
              You Deserve to Feel Confident <br />
              <span className="text-[#bb9c30]">in Your Hair Again</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              That&apos;s why we created the Zumfali 7-in-1 Vital Glow Blend—a science-backed, all-in-one formula designed to help you break free from hair concerns and feel balanced again—naturally.
            </p>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mt-4">
              In just one application a day, Zumfali delivers a powerful blend of adaptogens and nutrients your scalp actually needs to regulate health and reset growth cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            {/* Left Benefits */}
            <div className="space-y-12">
              {/* Benefit 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center md:text-right group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#bb9c30]/10 text-[#bb9c30] mb-4 group-hover:bg-[#bb9c30] group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a2f23] mb-2">Deep Root Nourishment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mustard & Castor oil penetrate deep to strengthen roots and anchor hair strands.
                </p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center md:text-right group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#bb9c30]/10 text-[#bb9c30] mb-4 group-hover:bg-[#bb9c30] group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a2f23] mb-2">Scalp Revitalization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Black Seed & Rosemary oils soothe irritation and wake up dormant follicles.
                </p>
              </motion.div>
            </div>

            {/* Center Product Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[#bb9c30]/20 blur-3xl rounded-full transform scale-75" />
              
              <div className="relative w-full max-w-[300px] aspect-[3/4]">
                <Image
                  src="/product-bundle.png"
                  alt="Zumfali 7-in-1 Oil"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Right Benefits */}
            <div className="space-y-12">
              {/* Benefit 3 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center md:text-left group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#bb9c30]/10 text-[#bb9c30] mb-4 group-hover:bg-[#bb9c30] group-hover:text-white transition-colors duration-300">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a2f23] mb-2">Growth & Thickness</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pumpkin Seed oil & Vitamin E support thicker, fuller hair growth and reduce breakage.
                </p>
              </motion.div>

              {/* Benefit 4 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center md:text-left group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#bb9c30]/10 text-[#bb9c30] mb-4 group-hover:bg-[#bb9c30] group-hover:text-white transition-colors duration-300">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a2f23] mb-2">Natural Shine</h3>
                <p className="text-gray-600 leading-relaxed">
                  Locks in moisture and restores natural luster without leaving a greasy residue.
                </p>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

