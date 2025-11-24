'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  isShopifyLoggedIn,
  markShopifyLoggedIn,
  redirectToShopifyLogin,
  redirectToShopifyLogout,
} from '@/lib/shopifyAuth';

export default function AccountPage() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Treat /account as a protected page:
  // - If no local Shopify login flag, send user to Shopify hosted login.
  // - If coming back from Shopify, mark them as logged in and render UI.
  useEffect(() => {
    const currentLoggedIn = isShopifyLoggedIn();

    const fromShopify =
      typeof document !== 'undefined' &&
      document.referrer.startsWith('https://shopify.com/91374911785/account');

    if (fromShopify && !currentLoggedIn) {
      markShopifyLoggedIn();
      setLoggedIn(true);
      setChecking(false);
      return;
    }

    if (!currentLoggedIn) {
      redirectToShopifyLogin();
      return;
    }

    setLoggedIn(true);
    setChecking(false);
  }, []);

  if (checking || !loggedIn) {
    return null;
  }

  const handleOpenShopifyDashboard = () => {
    if (typeof window === 'undefined') return;
    window.location.href = 'https://shopify.com/91374911785/account';
  };

  const handleLogout = () => {
    redirectToShopifyLogout();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[#FAFAF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1a2f23] mb-4">
              Logged in via Shopify
            </h1>
            <p className="text-gray-600 mb-4 text-lg">
              Your account and orders are securely managed by Shopify&apos;s
              hosted customer accounts.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleOpenShopifyDashboard}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1a2f23] text-white font-semibold text-sm tracking-wide shadow-md hover:bg-[#2d4a38] transition-colors"
            >
              View Orders &amp; Account on Shopify
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#1a2f23] text-[#1a2f23] font-semibold text-sm tracking-wide hover:bg-[#1a2f23] hover:text-white transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


