'use client';

import Link from 'next/link';
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
    <section 
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden bg-white" 
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1a2f23] mb-6">
            8 Powerful Ingredients
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Nature's finest oils scientifically formulated for maximum hair growth and vitality.
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer bg-gray-100 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  title={ingredient.name}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-110 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif mb-2 font-medium">
                  {ingredient.name}
                </h3>
                <p className="text-sm text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {ingredient.description}
                </p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span className="text-[#bb9c30] text-xs font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {ingredient.dosage}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/shop">
            <motion.button
            className="group relative px-12 py-5 bg-[#1a2f23] text-white rounded-full text-lg font-medium overflow-hidden shadow-2xl shadow-[#1a2f23]/30 hover:shadow-[#1a2f23]/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Discover the Formula
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
