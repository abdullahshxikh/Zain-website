'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { markShopifyLoggedIn, redirectToShopifyLogout } from '@/lib/shopifyAuth';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    markShopifyLoggedIn();

    // Check for pending cart items
    const checkPendingCart = async () => {
      const pendingItem = localStorage.getItem('pendingAddToCart');
      if (pendingItem) {
        try {
          const { bundleId, subscribeMode } = JSON.parse(pendingItem);

          // Clear pending item
          localStorage.removeItem('pendingAddToCart');

          // Redirect back to shop to handle the addition
          router.push(`/shop?restore_cart=${bundleId}&subscribe=${subscribeMode}`);
        } catch (e) {
          console.error('Error parsing pending cart', e);
          localStorage.removeItem('pendingAddToCart');
        }
      }
    };

    checkPendingCart();
  }, [router]);

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
      <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-serif text-[#1a2f23] mb-4">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-light text-lg">
              Manage your profile, orders, and subscriptions in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 h-fit"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-[#1a2f23]/5 flex items-center justify-center text-[#1a2f23] overflow-hidden p-3">
                  <img src="/shopify-logo-png-transparent.png" alt="Shopify Secure" className="w-full h-full object-contain opacity-80" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-[#1a2f23]">My Account</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Active Member</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Secure Shopify Login</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>Passwordless Access</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-[#1a2f23] transition-all text-sm"
              >
                Sign Out
              </button>
            </motion.div>

            {/* Dashboard Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Order History Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-[#1a2f23]/5 border border-gray-100 relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#96bf48]/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110" />
                <div className="absolute bottom-0 right-0 opacity-[0.03] w-48 h-48 translate-x-10 translate-y-10 rotate-12 pointer-events-none">
                  <img src="/shopify-logo-png-transparent.png" alt="" className="w-full h-full object-contain grayscale" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-serif text-[#1a2f23]">Order History</h3>
                    <div className="flex items-center gap-2 bg-[#96bf48]/10 px-3 py-1.5 rounded-full border border-[#96bf48]/20">
                      <img src="/shopify-logo-png-transparent.png" alt="Shopify" className="h-3 w-auto opacity-80" />
                      <span className="text-[#2d4a38] text-[10px] font-bold uppercase tracking-wider">
                        Secure
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 mb-8 leading-relaxed max-w-lg">
                    View your past orders, check shipment status, and manage your returns directly through our secure Shopify portal.
                  </p>

                  <button
                    onClick={handleOpenShopifyDashboard}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a2f23] text-white rounded-xl font-medium shadow-xl shadow-[#1a2f23]/20 hover:bg-[#2d4a38] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group-hover:shadow-green-900/20"
                  >
                    <span>Go to Order Dashboard</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Support / Help Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#1a2f23] rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-serif text-xl mb-2">Need Help?</h3>
                    <p className="text-white/70 text-sm mb-6">
                      Our support team is here to assist you with any questions.
                    </p>
                    <a href="mailto:info@zumfali.co" className="inline-block text-sm font-bold border-b border-[#bb9c30] text-[#bb9c30] pb-0.5 hover:text-white hover:border-white transition-colors">
                      Contact Support
                    </a>
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                </div>

                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center items-start">
                  <h3 className="font-serif text-xl text-[#1a2f23] mb-2">Shop New Arrivals</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Check out the latest additions to our collection.
                  </p>
                  <a href="/shop" className="text-[#1a2f23] font-medium text-sm flex items-center gap-2 group hover:gap-3 transition-all">
                    Shop Now <span className="text-[#bb9c30] group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}



