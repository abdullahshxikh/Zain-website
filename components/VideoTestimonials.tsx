import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const videos = [
  '/WhatsApp Video 2025-11-29 at 17.33.59.mp4',
  '/WhatsApp Video 2025-11-29 at 16.17.17.mp4',
  '/WhatsApp Video 2025-11-29 at 16.17.05.mp4',
  '/WhatsApp Video 2025-11-29 at 16.16.31.mp4',
];

export default function VideoTestimonials() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex bg-[#00b67a] text-white px-1.5 py-0.5 rounded text-xs font-bold">
            ★★★★★
          </div>
          <span className="text-sm font-medium text-gray-500">Rated 4.8/5 by 30,000+ customers</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Here&apos;s what people are saying...
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((src, index) => (
            <div key={index} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 group">
              <video
                src={src}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                autoPlay
                muted
                loop
                poster={index === 0 ? "/product-hero.png" : undefined} 
              />
              {/* Overlay elements if needed to match TikTok style UI */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

