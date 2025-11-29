import React from 'react';
import Image from 'next/image';

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side - Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[600px]">
             {/* 
                NOTE: The user provided a Google Search redirect URL which cannot be used directly as an image source.
                I have placed a placeholder here. Please replace '/hero-image.png' with your actual downloaded image file 
                of the balding man.
             */}
            <Image
              src="/hero-image.png" 
              alt="Understanding Hair Loss"
              fill
              className="object-cover"
            />
            {/* Overlay gradient for better text visibility if needed, or just style */}
            <div className="absolute inset-0 bg-black/10" />
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
    </section>
  );
}

