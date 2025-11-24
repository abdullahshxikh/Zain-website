'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { clearShopifyLoggedIn } from '@/lib/shopifyAuth';

export default function LogoutPage() {
  useEffect(() => {
    // Ensure local state is cleared when landing on this page
    clearShopifyLoggedIn();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[#FAFAF9] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-[#1a2f23]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a2f23]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-serif text-[#1a2f23] mb-4">
              Successfully Logged Out
            </h1>
            
            <p className="text-gray-500 mb-8">
              You have been securely logged out of your account. We hope to see you again soon!
            </p>

            <div className="space-y-3">
              <Link 
                href="/"
                className="block w-full py-3 bg-[#1a2f23] text-white rounded-xl font-medium hover:bg-[#2d4a38] transition-colors"
              >
                Return Home
              </Link>
              <Link
                href="/shop"
                className="block w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

