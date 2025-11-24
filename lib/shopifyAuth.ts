const SHOPIFY_ACCOUNT_BASE = 'https://shopify.com/91374911785/account';
const SHOPIFY_LOGIN_URL = `${SHOPIFY_ACCOUNT_BASE}/login`;
const SHOPIFY_SIGNUP_URL = `${SHOPIFY_ACCOUNT_BASE}/register`;
const SHOPIFY_RETURN_URL = 'https://zain-website-eight.vercel.app/account';

export function getAccountReturnUrl() {
  // Clean production URL required by Shopify customer accounts (no query params).
  return SHOPIFY_RETURN_URL;
}

export function redirectToShopifyLogin() {
  if (typeof window === 'undefined') return;
  const returnUrl = encodeURIComponent(getAccountReturnUrl());
  window.location.href = `${SHOPIFY_LOGIN_URL}?return_url=${returnUrl}`;
}

export function redirectToShopifySignup() {
  if (typeof window === 'undefined') return;
  const returnUrl = encodeURIComponent(getAccountReturnUrl());
  window.location.href = `${SHOPIFY_SIGNUP_URL}?return_url=${returnUrl}`;
}

export function markShopifyLoggedIn() {
  if (typeof window === 'undefined') return;
  const maxAgeSeconds = 60 * 60 * 24 * 30; // 30 days

  // Simple cookie flag used by the UI; no token decoding.
  document.cookie = `shopify_logged_in=true; path=/; max-age=${maxAgeSeconds}`;

  try {
    window.localStorage.setItem('shopify_logged_in', 'true');
  } catch {
    // Ignore storage errors (e.g., disabled storage)
  }
}

export function clearShopifyLoggedIn() {
  if (typeof window === 'undefined') return;

  document.cookie =
    'shopify_logged_in=false; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';

  try {
    window.localStorage.removeItem('shopify_logged_in');
  } catch {
    // Ignore storage errors
  }
}

export function isShopifyLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;

  // Check cookie first
  const cookieMatch = document.cookie.match(
    /(?:^|;\s*)shopify_logged_in=([^;]+)/
  );
  if (cookieMatch?.[1] === 'true') return true;

  // Fallback to localStorage
  try {
    return window.localStorage.getItem('shopify_logged_in') === 'true';
  } catch {
    return false;
  }
}


