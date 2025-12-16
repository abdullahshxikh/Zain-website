'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, checkout, cartTotal } = useCart();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Timer logic for "Reserved For"
  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(300); // Reset when closed
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const freeShippingThreshold = 50;
  const awayFromFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  // Calculate total savings
  const totalSavings = items.reduce((acc, item) => {
    if (item.originalPrice) {
      const originalStr = String(item.originalPrice || '0');
      const currentStr = String(item.price || '0');
      const original = parseFloat(originalStr.replace(/[^0-9.]/g, ''));
      const current = parseFloat(currentStr.replace(/[^0-9.]/g, ''));
      
      if (!isNaN(original) && !isNaN(current)) {
          return acc + (original - current) * item.quantity;
      }
    }
    return acc;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1a2f23]">
                Cart • {items.reduce((acc, item) => acc + item.quantity, 0)} items
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Reserved Banner */}
            <div className="bg-[#1a2f23] text-white text-center py-2 text-sm font-bold tracking-wide">
              Your Items Are Reserved For {formatTime(timeLeft)}
            </div>

            {/* Free Shipping Progress */}
            <div className="p-4 bg-gray-50">
               {awayFromFreeShipping > 0 ? (
                 <p className="text-center text-sm font-medium text-gray-700 mb-2">
                   You're <strong>${awayFromFreeShipping.toFixed(2)}</strong> away from free shipping!
                 </p>
               ) : (
                 <p className="text-center text-sm font-medium text-[#2d4a38] mb-2">
                   You've unlocked <strong>FREE SHIPPING!</strong>
                 </p>
               )}
               <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-[#2d4a38] transition-all duration-500"
                   style={{ width: `${progressPercent}%` }}
                 />
               </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button 
                    onClick={closeCart}
                    className="mt-4 text-[#bb9c30] font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-[#1a2f23] text-sm leading-tight pr-4">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.variantId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-2">{item.variantTitle}</div>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex items-center border border-gray-300 rounded-md">
                           <button 
                             onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                             className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                           >
                             -
                           </button>
                           <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                             className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                           >
                             +
                           </button>
                         </div>
                         
                         <div className="text-right">
                           {item.originalPrice && (
                             <div className="text-xs text-gray-400 line-through">
                               {/* Calculate total original price roughly */}
                               ${(parseFloat(String(item.originalPrice || '0').replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                             </div>
                           )}
                           <div className="font-bold text-[#1a2f23]">
                             ${(parseFloat(String(item.price || '0').replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 space-y-4">
                {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-[#bb9c30] font-bold">
                    <span>Savings</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xl font-bold text-[#1a2f23]">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={checkout}
                  className="w-full py-4 bg-[#1b5e20] text-white rounded-lg font-bold text-lg uppercase tracking-wider shadow-xl hover:bg-[#2d4a38] transition-all transform hover:-translate-y-1"
                >
                  Check out
                </button>
                
                <div className="flex justify-center pt-2">
                   <div className="relative h-6 w-full max-w-[200px]">
                     <Image 
                       src="/payment-icons.png" 
                       alt="Secure payment options" 
                       title="Secure payment options" 
                       fill 
                       className="object-contain" 
                     />
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

