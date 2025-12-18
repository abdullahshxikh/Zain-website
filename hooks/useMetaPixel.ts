'use client';

import { useCallback } from 'react';

type FbqFn = (...args: any[]) => void;

function getFbq(): FbqFn | null {
  if (typeof window === 'undefined') return null;
  const fbq = (window as any).fbq;
  return typeof fbq === 'function' ? fbq : null;
}

type MetaCurrency = 'USD';

export type MetaPixelContent = {
  id: string;
  quantity?: number;
  item_price?: number;
};

type TrackMode = 'track' | 'trackCustom';

function trackWithRetry(
  mode: TrackMode,
  eventName: string,
  payload: Record<string, any> = {},
  attemptsLeft = 12,
  delayMs = 250
) {
  const fbq = getFbq();
  if (fbq) {
    fbq(mode, eventName, payload);
    return;
  }

  if (attemptsLeft <= 0) return;
  if (typeof window === 'undefined') return;

  window.setTimeout(() => {
    trackWithRetry(mode, eventName, payload, attemptsLeft - 1, delayMs);
  }, delayMs);
}

export function useMetaPixel() {
  const trackCustom = useCallback(
    (eventName: string, payload: Record<string, any> = {}) => {
      if (!eventName) return;
      trackWithRetry('trackCustom', eventName, payload);
    },
    []
  );

  const trackViewContent = useCallback((productId: string, value: number) => {
    if (!productId) return;
    trackWithRetry('track', 'ViewContent', {
      content_ids: [productId],
      content_type: 'product',
      value,
      currency: 'USD' satisfies MetaCurrency,
    });
  }, []);

  const trackAddToCart = useCallback(
    (variantId: string, variantName: string, value: number) => {
      if (!variantId) return;
      trackWithRetry('track', 'AddToCart', {
        content_ids: [variantId],
        content_type: 'product',
        content_name: variantName,
        value,
        currency: 'USD' satisfies MetaCurrency,
      });
    },
    []
  );

  const trackInitiateCheckout = useCallback(
    (contents: MetaPixelContent[], value: number, currency: MetaCurrency = 'USD') => {
      if (!Array.isArray(contents) || contents.length === 0) return;
      trackWithRetry('track', 'InitiateCheckout', {
        content_type: 'product',
        contents,
        value,
        currency,
        num_items: contents.reduce((acc, c) => acc + (c.quantity ?? 1), 0),
      });
    },
    []
  );

  const trackPurchase = useCallback(
    (contents: MetaPixelContent[], value: number, currency: MetaCurrency = 'USD') => {
      if (!Array.isArray(contents) || contents.length === 0) return;
      trackWithRetry('track', 'Purchase', {
        content_type: 'product',
        contents,
        value,
        currency,
        num_items: contents.reduce((acc, c) => acc + (c.quantity ?? 1), 0),
      });
    },
    []
  );

  const trackAddPaymentInfo = useCallback(
    (contents: MetaPixelContent[], value: number, currency: MetaCurrency = 'USD') => {
      if (!Array.isArray(contents) || contents.length === 0) return;
      trackWithRetry('track', 'AddPaymentInfo', {
        content_type: 'product',
        contents,
        value,
        currency,
      });
    },
    []
  );

  const trackSearch = useCallback((searchString: string) => {
    if (!searchString) return;
    trackWithRetry('track', 'Search', { search_string: searchString });
  }, []);

  const trackAddToWishlist = useCallback(
    (contentId: string) => {
      if (!contentId) return;
      trackWithRetry('track', 'AddToWishlist', {
        content_ids: [contentId],
        content_type: 'product',
      });
    },
    []
  );

  const trackSubscribe = useCallback((value?: number, currency: MetaCurrency = 'USD') => {
    // Meta "Subscribe" is typically used for paid subscriptions; for email newsletters,
    // many teams still track it as a funnel step.
    trackWithRetry('track', 'Subscribe', typeof value === 'number' ? { value, currency } : {});
  }, []);

  const trackStartTrial = useCallback((value?: number, currency: MetaCurrency = 'USD') => {
    trackWithRetry('track', 'StartTrial', typeof value === 'number' ? { value, currency } : {});
  }, []);

  const trackCompleteRegistration = useCallback((method?: string) => {
    trackWithRetry('track', 'CompleteRegistration', method ? { registration_method: method } : {});
  }, []);

  const trackContact = useCallback((method?: string) => {
    trackWithRetry('track', 'Contact', method ? { contact_method: method } : {});
  }, []);

  const trackFindLocation = useCallback(() => {
    trackWithRetry('track', 'FindLocation', {});
  }, []);

  const trackSchedule = useCallback(() => {
    trackWithRetry('track', 'Schedule', {});
  }, []);

  return {
    // Generic
    trackCustom,

    // Commerce & funnel
    trackViewContent,
    trackSearch,
    trackAddToWishlist,
    trackAddToCart,
    trackInitiateCheckout,
    trackAddPaymentInfo,
    trackPurchase,
    trackSubscribe,
    trackStartTrial,
    trackCompleteRegistration,
    trackContact,
    trackFindLocation,
    trackSchedule,
  };
}


