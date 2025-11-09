'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ingredients = [
  {
    name: 'Coconut Oil',
    description: 'Reduces breakage and keeps the hair strong.',
    dosage: '1,800 mg',
    image: 'https://as1.ftcdn.net/jpg/01/18/99/44/1000_F_118994494_3VQkxobv15bucFpzu9Sh9pCHy8XHQ2QJ.jpg',
  },
  {
    name: 'Black Seed Oil',
    description: 'Keeps the scalp healthy and reduces hair fall.',
    dosage: '1,500 mg',
    image: 'https://media.istockphoto.com/id/474577579/photo/nigella-sativa-oil.jpg?s=612x612&w=0&k=20&c=j9MUtko34pCvIkhfvVN6DFyuV22nk2m7GHjj2pMU7nQ=',
  },
  {
    name: 'Castor Oil',
    description: 'Makes hair look thicker and shinier.',
    dosage: '1,500 mg',
    image: 'https://media.istockphoto.com/id/1495245850/photo/ricinus-communis-dried-seeds-and-oil-from-the-fruit-of-the-castor-bean-plant.jpg?s=612x612&w=0&k=20&c=5lqbW85jRrHWHAHnd4wE96LCvxxYVS97Nj5zeJrvs8k=',
  },
  {
    name: 'Pumpkin Seed Oil',
    description: 'Adds nutrients for growth support.',
    dosage: '1,200 mg',
    image: 'https://media.istockphoto.com/id/2208759696/photo/pumpkin-seeds-oil-on-black-background.jpg?s=612x612&w=0&k=20&c=Pd4jjj-hjyO-ZGB-Ktu3Ib3Q_m2sIXCroDG5srdJX2s=',
  },
  {
    name: 'Rosemary Oil',
    description: 'Well known natural growth booster.',
    dosage: '2,000 mg',
    image: 'https://media.istockphoto.com/id/1323361526/photo/bottle-of-essential-oil-with-fresh-rosemary.jpg?s=612x612&w=0&k=20&c=YKd8GZ5piGf48svWHnT7HAccOsdUFBPQnAxOns-Wiu4=',
  },
  {
    name: 'Vitamin E',
    description: 'Protects the hair and nourishes it.',
    dosage: '300 IU',
    image: 'https://www.shutterstock.com/shutterstock/videos/3692341885/thumb/4.jpg?ip=x480',
  },
  {
    name: 'Argan Oil',
    description: 'Deeply moisturizes and adds natural shine.',
    dosage: '1,200 mg',
    image: 'https://media.istockphoto.com/id/598807974/photo/argan-oil.jpg?s=612x612&w=0&k=20&c=wyTlbG03_yZIOEDeu0sodTA9AxRDyUDlkG_vKuKNkfs=',
  },
  {
    name: 'Jojoba Oil',
    description: 'Balances scalp and strengthens hair roots.',
    dosage: '1,000 mg',
    image: 'https://t3.ftcdn.net/jpg/02/93/21/44/360_F_293214485_BVtXwz0y7JXxvgVnm6CR8YCu50mwxt7y.jpg',
  },
];

export default function IngredientsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden" style={{
      backgroundColor: '#f5f1e8',
    }}>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-[#bb9c30]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            8 Powerful Ingredients
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#bb9c30] max-w-3xl mx-auto px-4">
            Nature's finest oils scientifically formulated for maximum hair growth and vitality.
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              className="group relative h-64 sm:h-80 lg:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay gradient */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Title */}
                <div>
                  <h3 
                    className="text-2xl md:text-3xl font-bold text-[#bb9c30] mb-3 leading-tight"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '700' }}
                  >
                    {ingredient.name}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="text-[#bb9c30] text-sm md:text-base leading-relaxed opacity-95"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '400' }}
                  >
                    {ingredient.description}
                  </p>
                </div>

                {/* Dosage Badge */}
                <motion.div
                  className="inline-flex items-center self-start px-4 py-2 rounded-full"
                  style={{ backgroundColor: '#bb9c30' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span 
                    className="text-black text-sm font-semibold"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    {ingredient.dosage}
                  </span>
                </motion.div>
              </div>

              {/* Hover effect border */}
              <motion.div
                className="absolute inset-0 border-2 border-[#bb9c30] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="group relative px-12 py-5 overflow-hidden rounded-full shadow-2xl text-lg font-bold"
            style={{
              backgroundColor: '#bb9c30',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(187, 156, 48, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-black flex items-center gap-3">
              Shop Now
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
