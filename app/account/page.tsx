'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  isShopifyLoggedIn,
  markShopifyLoggedIn,
  redirectToShopifyLogin,
} from '@/lib/shopifyAuth';

export default function AccountPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isLoggedInNow = isShopifyLoggedIn();

    // If the user is returning from Shopify, the referrer will be the Shopify
    // customer accounts domain. We can use this as a signal to mark them
    // logged in locally without relying on any query parameters.
    const fromShopify =
      typeof document !== 'undefined' &&
      /shopify\.com\/91374911785\/account/.test(document.referrer);

    if (fromShopify && !isLoggedInNow) {
      markShopifyLoggedIn();
      setLoggedIn(true);
      setChecking(false);
      return;
    }

    if (!isLoggedInNow) {
      // User tried to access /account directly; send them through Shopify login.
      redirectToShopifyLogin();
      return;
    }

    setLoggedIn(true);
    setChecking(false);
  }, [router]);

  if (checking || !loggedIn) {
    return null;
  }

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


