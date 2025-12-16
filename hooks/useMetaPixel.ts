'use client';

import { useCallback } from 'react';

type FbqFn = (...args: any[]) => void;

function getFbq(): FbqFn | null {
  if (typeof window === 'undefined') return null;
  const fbq = (window as any).fbq;
  return typeof fbq === 'function' ? fbq : null;
}

function trackWithRetry(
  eventName: string,
  payload: Record<string, any>,
  attemptsLeft = 12,
  delayMs = 250
) {
  const fbq = getFbq();
  if (fbq) {
    fbq('track', eventName, payload);
    return;
  }

  if (attemptsLeft <= 0) return;
  if (typeof window === 'undefined') return;

  window.setTimeout(() => {
    trackWithRetry(eventName, payload, attemptsLeft - 1, delayMs);
  }, delayMs);
}

export function useMetaPixel() {
  const trackViewContent = useCallback((productId: string, value: number) => {
    if (!productId) return;
    trackWithRetry('ViewContent', {
      content_ids: [productId],
      content_type: 'product',
      value,
      currency: 'USD',
    });
  }, []);

  const trackAddToCart = useCallback(
    (variantId: string, variantName: string, value: number) => {
      if (!variantId) return;
      trackWithRetry('AddToCart', {
        content_ids: [variantId],
        content_type: 'product',
        content_name: variantName,
        value,
        currency: 'USD',
      });
    },
    []
  );

  return { trackViewContent, trackAddToCart };
}


