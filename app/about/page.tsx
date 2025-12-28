'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function AboutPage() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#FAFAF9] pt-24 pb-12">

                {/* HERO / INTRO SECTION - Milk Bar Style */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                        {/* Left: Video */}
                        <motion.div
                            className="w-full lg:w-1/2 relative aspect-square sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover pointer-events-none"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src="/customer-testimonial-video.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            className="w-full lg:w-1/2 space-y-6"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a2f23] tracking-tight">
                                About Zumfali
                            </h1>

                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                                <p>
                                    Zumfali is a hair care revolution (and occasionally a confidence booster) that’s been turning the beauty industry upside down, shaking up the routine since 2024. We aren't big on complex, 10-step rituals. But we're <span className="italic font-medium text-[#bb9c30]">super</span> into feeding your hair flavor-packed nutrients that actually work.
                                </p>
                                <p>
                                    Founded on a simple belief that nature holds the cure, Zumfali bridges the gap between ancient Ayurvedic traditions and modern science. We saw a market flooded with watered-down solutions and decided to bottle pure potency instead.
                                </p>
                                <p>
                                    Our signature 7-in-1 blend isn't just oil; it's a labor of love, designed to nourish the scalp, strengthen the strand, and restore the shine you thought was gone forever.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* MISSION SECTION */}
                <section className="bg-[#1a2f23] text-white py-24 px-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/grid-pattern.svg')] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <h2 className="text-3xl font-serif mb-16">The Zumfali Standard</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { title: 'Pure Potency', desc: 'No fillers using only premium, cold-pressed oils sourced from ethical growers.', icon: '🌿' },
                                { title: 'Science Backed', desc: 'Formulated with precise ratios to maximize absorption and follicle stimulation.', icon: '🧬' },
                                { title: 'Community Driven', desc: 'Built for real women with real hair concerns, guided by your feedback.', icon: '🤝' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                >
                                    <div className="text-5xl mb-6">{item.icon}</div>
                                    <h3 className="text-xl font-bold font-serif mb-4 text-[#E5D178]">{item.title}</h3>
                                    <p className="text-white/70 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ORIGIN STORY / FOUNDER NOTE */}
                <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="bg-white p-8 sm:p-12 md:p-16 rounded-[2.5rem] shadow-xl border border-stone-100 flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/3 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/Hero girl.png" // Using existing asset as placeholder for brand imagery
                                alt="Zumfali Lifestyle"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="w-full md:w-2/3">
                            <h3 className="text-2xl font-serif text-[#1a2f23] mb-6">A Note from the Team</h3>
                            <p className="text-gray-600 mb-6 italic">
                                "We didn't just want to sell oil. We wanted to solve the heartbreak of hair loss and the frustration of frizz. Every bottle of Zumfali is a promise that you don't have to compromise between natural ingredients and powerful results."
                            </p>
                            <p className="text-sm font-bold text-[#bb9c30] tracking-widest uppercase">
                                — The Zumfali Family
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12 px-4">
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-8">
                        Ready to experience the difference?
                    </h2>
                    <Link href="/shop">
                        <button className="px-10 py-4 bg-[#1a2f23] text-white rounded-full font-bold text-lg tracking-wide hover:bg-[#2d4a38] transition-all hover:scale-105 shadow-xl">
                            Shop The Formula
                        </button>
                    </Link>
                </section>

            </main>
            <Footer />
        </>
    );
}
