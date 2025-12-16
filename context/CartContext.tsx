'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isShopifyLoggedIn, redirectToShopifySignup } from '@/lib/shopifyAuth';

export interface CartItem {
  variantId: string;
  title: string;
  variantTitle: string;
  price: string;
  quantity: number;
  image: string;
  originalPrice?: string; // For display
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => Promise<void>;
  cartTotal: number;
  itemCount: number;
  shopifyClient: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shopifyClient, setShopifyClient] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize Shopify Client (Logic from ShopPage)
  useEffect(() => {
    setIsClient(true);
    if (typeof window === 'undefined') return;

    // Load from localStorage
    const savedCart = localStorage.getItem('zumfali_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }

    const scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function ShopifyBuyInit() {
      const ShopifyBuy = (window as any).ShopifyBuy;
      if (!ShopifyBuy) return;

      const client = ShopifyBuy.buildClient({
        domain: 'avw1pr-qj.myshopify.com',
        storefrontAccessToken: '74472e64ff2b3cc2204f58c4d56eb5bb',
      });
      setShopifyClient(client);
    }

    function loadScript() {
      if (document.querySelector(`script[src="${scriptURL}"]`)) {
        if ((window as any).ShopifyBuy) {
           ShopifyBuyInit();
        } else {
           // Script exists but maybe not loaded yet, could listen to onload, but this is simple check
        }
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.head || document.body).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    const ShopifyBuy = (window as any).ShopifyBuy;
    if (ShopifyBuy) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('zumfali_cart', JSON.stringify(items));
  }, [items, isClient]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.variantId === newItem.variantId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevItems, newItem];
    });
    setIsOpen(true);
  };

  const removeFromCart = (variantId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(variantId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const checkout = async () => {
    if (!items.length) return;
    
    // Auth is now enforced at the "Add to Cart" step, so we don't strictly need to block here.
    // However, if the session expired, Shopify checkout might prompt them again, which is fine.
    
    if (!shopifyClient) {
      console.error('Shopify client not initialized');
      return;
    }

    try {
      const checkout = await shopifyClient.checkout.create();
      const lineItems = items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const updatedCheckout = await shopifyClient.checkout.addLineItems(
        checkout.id,
        lineItems
      );

      if (updatedCheckout && updatedCheckout.webUrl) {
        window.location.href = updatedCheckout.webUrl;
      }
    } catch (err) {
      console.error('Error creating Shopify checkout', err);
    }
  };

  // Helper to calculate total price (approximate, for display)
  const cartTotal = items.reduce((total, item) => {
    // Ensure price is a string before replacing
    const priceStr = String(item.price || '0');
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return total + (isNaN(price) ? 0 : price) * item.quantity;
  }, 0);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        isOpen,
        openCart,
        closeCart,
        checkout,
        cartTotal,
        itemCount,
        shopifyClient
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

