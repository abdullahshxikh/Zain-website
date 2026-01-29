'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type OrderNode = {
  node: {
    id: string;
    orderNumber: number;
    processedAt: string;
    financialStatus: string;
    fulfillmentStatus: string;
    totalPrice: {
      amount: string;
      currencyCode: string;
    };
    lineItems: {
      edges: Array<{
        node: {
          title: string;
          quantity: number;
          originalTotalPrice?: {
            amount: string;
            currencyCode: string;
          };
        };
      }>;
    };
  };
};

type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  orders: {
    edges: OrderNode[];
  };
  defaultAddress?: {
    city: string;
    country: string;
  };
};

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('customerAccessToken');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchCustomer = async () => {
      try {
        const res = await fetch('/api/auth/customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: token }),
        });

        if (!res.ok) throw new Error('Failed to fetch customer');

        const data = await res.json();
        setCustomer(data.customer);
      } catch (err) {
        console.error(err);
        // If fetch fails (likely expired token), logout user
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('customerAccessToken');
    localStorage.removeItem('customerAccessTokenExpiresAt');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2f23]"></div>
          <p className="text-[#1a2f23] font-medium animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!customer) return null; // Should redirect

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
              Welcome Back, {customer.firstName}
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
                <div className="w-16 h-16 rounded-full bg-[#1a2f23] text-white flex items-center justify-center text-2xl font-serif">
                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-xl text-[#1a2f23]">My Profile</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{customer.email}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {customer.defaultAddress && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Primary Address</p>
                    <p className="text-[#1a2f23] text-sm font-medium">
                      {customer.defaultAddress.city}, {customer.defaultAddress.country}
                    </p>
                  </div>
                )}
                <div className="p-4 bg-[#fffcf5] border border-[#bb9c30]/20 rounded-xl flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <p className="text-[#bb9c30] font-bold text-sm">VIP Member</p>
                    <p className="text-xs text-gray-500">Thank you for being with us.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-[#1a2f23] transition-all text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
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
              <h2 className="text-2xl font-serif text-[#1a2f23] mb-4">Order History</h2>

              {customer.orders.edges.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2f23] mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                  <a href="/shop" className="inline-block px-8 py-3 bg-[#1a2f23] text-white rounded-xl font-bold hover:bg-[#2d4a38] transition-colors">
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.orders.edges.map(({ node: order }) => (
                    <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-lg text-[#1a2f23]">#{order.orderNumber}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {new Date(order.processedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-[#1a2f23]">
                            {order.totalPrice.amount} {order.totalPrice.currencyCode}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.financialStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {order.financialStatus}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.fulfillmentStatus === 'FULFILLED' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                            {order.fulfillmentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.lineItems.edges.map(({ node: item }, i) => (
                          <div key={i} className="flex justify-between text-sm text-gray-600">
                            <span>{item.quantity}x {item.title}</span>
                            <span className="font-medium text-[#1a2f23]">
                              {item.originalTotalPrice?.amount ? `$${item.originalTotalPrice.amount}` : '-'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}



