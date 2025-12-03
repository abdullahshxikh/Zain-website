import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    author: "Christopher Easton",
    verified: true,
    rating: 5,
    title: "This oil really packs a punch.",
    text: "I was skeptical about hair oils, but this one is different. My scalp feels so much healthier and I've noticed significantly less hair fall in the shower. The rosemary scent is refreshing and not overpowering. Highly recommend!",
    image: null // Or add image path if available
  },
  {
    id: 2,
    author: "Kfassben",
    verified: true,
    rating: 5,
    title: "I like this 7-in-1 hair growth blend.",
    text: "It is supposed to help with growth and thickness, and it really delivers. I apply it before bed and wash it out in the morning. My hair is shinier and feels stronger. The applicator makes it easy to target thinning spots.",
    image: null
  },
  {
    id: 3,
    author: "Gerald L Harper",
    verified: true,
    rating: 5,
    title: "I started taking the Zumfali Hair Oil",
    text: "during a particularly stressful season where I was losing a lot of hair. I'd tried other oils before, but this blend with pumpkin seed and black seed oil felt different. After a month, I'm seeing baby hairs coming in!",
    image: null
  },
  {
    id: 4,
    author: "Ruslana",
    verified: true,
    rating: 5,
    title: "Helps my hair feel amazing at the end of the day!",
    text: "I use it as a pre-shampoo treatment and my hair is so soft afterwards. The 7-in-1 formula covers everything I need. Love it!",
    date: "5 months ago",
    image: null
  },
  {
    id: 5,
    author: "Stacy Gold",
    verified: true,
    rating: 5,
    title: "I realized that I have all the signs of thinning hair.",
    text: "I did some research and learned of ingredients to look for. This oil has practically all the ingredients needed like rosemary, castor, and vitamin E. I use it twice a week and my hair feels thicker and more voluminous. It's a staple in my routine now.",
    image: null
  },
  {
    id: 6,
    author: "Amanda K.",
    verified: true,
    rating: 5,
    title: "Finally something that works for my postpartum hair loss!",
    text: "After having my second baby, my hair was falling out in clumps. A friend recommended Zumfali and I'm so glad she did. It's been 3 months and the difference is night and day.",
    image: null
  },
  {
    id: 7,
    author: "Jennifer B.",
    verified: true,
    rating: 5,
    title: "Best natural hair oil on the market.",
    text: "I love that it's 100% natural with no nasties. The quality is top notch and the results are real. My hair has never looked better.",
    image: null
  },
  {
    id: 8,
    author: "David M.",
    verified: true,
    rating: 5,
    title: "Even works for beards!",
    text: "I bought this for my wife but decided to try it on my patchy beard. It's actually filling in nicely! We're both hooked now.",
    image: null
  }
];

export default function ExpandedReviews() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Summary */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-2xl font-bold text-[#1a2f23] mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-[#bb9c30]">4.8<span className="text-xl text-gray-400 font-normal">/5</span></div>
              <div>
                <div className="flex text-[#bb9c30] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500">From 524 reviews</p>
              </div>
            </div>
          </div>

          {/* Bars */}
          <div className="flex-1 max-w-md w-full space-y-2">
            {[
              { star: 5, count: 480, pct: '92%' },
              { star: 4, count: 35, pct: '7%' },
              { star: 3, count: 9, pct: '1%' },
              { star: 2, count: 0, pct: '0%' },
              { star: 1, count: 0, pct: '0%' },
            ].map((item) => (
              <div key={item.star} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-3">{item.star}</span>
                <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#bb9c30]" style={{ width: item.pct }} />
                </div>
                <span className="w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>

          <div>
            <motion.a 
              href="/write-review" 
              className="inline-block px-8 py-3 bg-[#1a2f23] text-white font-bold rounded-lg hover:bg-[#2d4a38] transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Write A Review
            </motion.a>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1a2f23] text-sm">{review.author}</span>
                  {review.verified && (
                    <span className="text-green-500 flex items-center gap-1 text-[10px] font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex text-[#bb9c30] mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>

              <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{review.title}</h3>
              {review.text && (
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-6">
                  {review.text}
                </p>
              )}
              
              <div className="mt-auto">
                 {review.text && <button className="text-xs font-bold text-gray-400 hover:text-[#1a2f23] transition-colors">Read More</button>}
                 {review.date && <p className="text-xs text-gray-400 mt-2">{review.date}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
