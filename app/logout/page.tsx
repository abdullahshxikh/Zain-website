'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        // Clear any local state if necessary (though usually handled before redirect)

        // Auto-redirect after 3 seconds
        const timer = setTimeout(() => {
            router.push('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[2rem] shadow-xl border border-gray-100 max-w-lg w-full text-center"
                >
                    <div className="w-20 h-20 bg-[#1a2f23]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a2f23]">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-serif text-[#1a2f23] mb-4">
                        Successfully Logged Out
                    </h1>

                    <p className="text-gray-500 mb-8">
                        You have been securely signed out of your account. You will be redirected to the homepage shortly.
                    </p>

                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-8">
                        <motion.div
                            className="h-full bg-[#bb9c30]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "linear" }}
                        />
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="text-[#1a2f23] font-bold text-sm tracking-widest uppercase hover:text-[#bb9c30] transition-colors"
                    >
                        Return Home Now
                    </button>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
