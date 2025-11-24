'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearShopifyLoggedIn } from '@/lib/shopifyAuth';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear local auth state
    clearShopifyLoggedIn();
    
    // Redirect to home after a brief delay
    const timer = setTimeout(() => {
      router.replace('/');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-[#1a2f23] mb-2">Logged Out</h1>
        <p className="text-gray-600">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
}

