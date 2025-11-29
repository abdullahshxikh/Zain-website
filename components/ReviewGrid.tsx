import React from 'react';

const reviews = [
  {
    title: "Glad it's 100% Natural",
    body: "After incorporating it into my daily routine, I noticed a subtle but steady shift in the thickness of my hair. I didn't feel greasy or weighed down—instead, my scalp felt nourished and breathable. The combination of calming oils like peppermint and growth-focused ones like pumpkin seed seems to help with both scalp health and hair density.",
    author: "James D.",
    stars: 5,
  },
  {
    title: "Easy Routine to Stick To",
    body: "There is a lot going on in this bottle. Mustard, Coconut, Black Seed... and it had me at the dual applicator. I've been curious about scalp oiling but hated the mess. The roll-on is perfect for my hairline, and the dropper for the rest. First few days I just used it sparingly, but now I soak it overnight. Works wonders.",
    author: "Jenn",
    stars: 5,
  },
  {
    title: "Optimal ingredients for regrowth",
    body: "I realized that I have all the signs of nutrient-deficient follicles. This blend has practically all the ingredients needed. I apply it before bedtime because the lavender and rosemary scent actually relaxes me. I've been seeing less shedding in the shower and I feel good about all the ingredients helping me bring my hairline back.",
    author: "Stacy Gold",
    stars: 5,
  },
];

export default function ReviewGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2f23] mb-4">
            Hair? Thicker. Scalp? Restored. Confidence? Lifted.
          </h2>
          <div className="flex justify-center items-center gap-2 text-[#1a2f23] font-bold">
             <span>Excellent 4.9 / 5</span>
             <div className="flex bg-[#00b67a] px-1 py-0.5 rounded text-white">
               {[...Array(5)].map((_, i) => (
                 <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               ))}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-[#FAFAF9] p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex text-[#00b67a] mb-4 bg-[#00b67a]/10 w-fit px-2 py-1 rounded">
                {[...Array(review.stars)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-[#1a2f23] mb-4 leading-tight">
                {review.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {review.body}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-200/50 font-bold text-[#1a2f23] text-sm">
                {review.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

