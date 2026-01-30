'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCart, addToCart as shopifyAddToCart, getCart, updateCartLines, removeCartLines, CartLineInput } from '@/lib/shopify';

export interface CartItem {
  id?: string; // Cart Line ID
  variantId: string;
  title: string;
  variantTitle: string;
  price: string;
  quantity: number;
  image: string;
  originalPrice?: string;
  sellingPlanId?: string; // For subscriptions
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Partial<CartItem> & { variantId: string; quantity: number, sellingPlanId?: string }) => Promise<void>;
  removeFromCart: (cartLineId: string) => Promise<void>;
  updateQuantity: (cartLineId: string, quantity: number) => Promise<void>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;
  cartTotal: number;
  itemCount: number;
  cartId: string | null;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCartId = localStorage.getItem('zumfali_cart_id');
    if (savedCartId) {
      setCartId(savedCartId);
      refreshCart(savedCartId);
    }
  }, []);

  const refreshCart = async (id: string) => {
    try {
      setLoading(true);
      const cart = await getCart(id);
      if (cart) {
        setCheckoutUrl(cart.checkoutUrl);
        mapCartLinesToItems(cart.lines.edges);
      } else {
        // Cart likely expired or invalid
        localStorage.removeItem('zumfali_cart_id');
        setCartId(null);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapCartLinesToItems = (edges: any[]) => {
    const mappedItems: CartItem[] = edges.map(({ node }: any) => {
      // Sometimes merchandise might be null if product deleted
      if (!node.merchandise) return null;

      // Use the line item cost which includes subscription discounts
      // Calculate unit price from total amount (which is quantity * price)
      let amount = parseFloat(node.merchandise.price.amount);
      const currency = node.merchandise.price.currencyCode;

      if (node.cost?.totalAmount) {
        amount = parseFloat(node.cost.totalAmount.amount) / node.quantity;
      }

      return {
        id: node.id,
        variantId: node.merchandise.id,
        title: node.merchandise.product.title,
        variantTitle: node.merchandise.title,
        price: `${currency} ${amount.toFixed(2)}`,
        quantity: node.quantity,
        image: node.merchandise.product.featuredImage?.url || '/product-image.png',
      };
    }).filter(Boolean) as CartItem[];
    setItems(mappedItems);
  };

  const handleAddToCart = async (newItem: Partial<CartItem> & { variantId: string; quantity: number, sellingPlanId?: string }) => {
    setLoading(true);
    setIsOpen(true);

    // Ensure we use global ID format if not already
    let merchandiseId = newItem.variantId;
    if (!merchandiseId.startsWith('gid://')) {
      merchandiseId = `gid://shopify/ProductVariant/${merchandiseId}`;
    }

    let sellingPlanId = newItem.sellingPlanId;
    if (sellingPlanId && !sellingPlanId.startsWith('gid://')) {
      sellingPlanId = `gid://shopify/SellingPlan/${sellingPlanId}`;
    }

    const lineInput: CartLineInput = {
      merchandiseId,
      quantity: newItem.quantity,
      sellingPlanId,
    };

    console.log('Adding to cart:', lineInput);

    try {
      let cart;
      if (!cartId) {
        console.log('Creating new cart...');
        cart = await createCart([lineInput]);
        if (cart) {
          setCartId(cart.id);
          localStorage.setItem('zumfali_cart_id', cart.id);
        }
      } else {
        console.log('Adding to existing cart:', cartId);
        cart = await shopifyAddToCart(cartId, [lineInput]);
      }

      console.log('Cart operation result:', cart);

      if (cart) {
        setCheckoutUrl(cart.checkoutUrl);
        mapCartLinesToItems(cart.lines.edges);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartLineId: string) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const cart = await removeCartLines(cartId, [cartLineId]);
      if (cart) {
        mapCartLinesToItems(cart.lines.edges);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartLineId: string, quantity: number) => {
    if (!cartId) return;
    if (quantity < 1) {
      handleRemoveFromCart(cartLineId);
      return;
    }

    setLoading(true);
    try {
      const cart = await updateCartLines(cartId, [{ id: cartLineId, quantity }]);
      if (cart) {
        mapCartLinesToItems(cart.lines.edges);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const cartTotal = items.reduce((total, item) => {
    // rudimentary parse
    const amount = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (isNaN(amount) ? 0 : amount) * item.quantity;
  }, 0);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        checkout,
        cartTotal,
        itemCount,
        cartId,
        loading
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

