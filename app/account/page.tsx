'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { markShopifyLoggedIn } from '@/lib/shopifyAuth';

export default function AccountPage() {
  // Mark the user as "logged in" locally whenever they reach /account.
  // This is a simple side-effect only; the page always renders normally.
  useEffect(() => {
    markShopifyLoggedIn();
  }, []);

  const handleOpenShopifyDashboard = () => {
    if (typeof window === 'undefined') return;
    window.location.href = 'https://shopify.com/91374911785/account';
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[#FAFAF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-4">
            Logged in via Shopify
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Your account and orders are securely managed by Shopify&apos;s
            passwordless customer accounts.
          </p>
          <button
            type="button"
            onClick={handleOpenShopifyDashboard}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1a2f23] text-white font-semibold text-sm tracking-wide shadow-md hover:bg-[#2d4a38] transition-colors"
          >
            View Orders &amp; Account on Shopify
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

