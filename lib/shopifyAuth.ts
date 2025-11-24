// Shopify Hosted Customer Accounts Configuration
const SHOPIFY_ACCOUNT_BASE = 'https://shopify.com/91374911785/account';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zumfali.co';

// Local storage and cookie key for login state
const LOGIN_STATE_KEY = 'shopify_logged_in';
const LOGIN_STATE_VALUE = 'true';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Checks if code is running in a browser environment
 */
const isBrowser = (): boolean => typeof window !== 'undefined';

/**
 * Builds Shopify redirect URL with encoded return URL
 */
const buildShopifyUrl = (path: string, returnUrl: string): string => {
  return `${SHOPIFY_ACCOUNT_BASE}${path}?return_url=${encodeURIComponent(returnUrl)}`;
};

/**
 * Gets the account page return URL for Shopify redirects
 */
export function getAccountReturnUrl(): string {
  return `${SITE_URL}/account`;
}

/**
 * Redirects user to Shopify hosted login page
 */
export function redirectToShopifyLogin(): void {
  if (!isBrowser()) return;
  window.location.href = buildShopifyUrl('/login', getAccountReturnUrl());
}

/**
 * Redirects user to Shopify hosted signup page
 */
export function redirectToShopifySignup(): void {
  if (!isBrowser()) return;
  window.location.href = buildShopifyUrl('/register', getAccountReturnUrl());
}

/**
 * Clears local login state and redirects to Shopify logout
 */
export function redirectToShopifyLogout(): void {
  if (!isBrowser()) return;
  clearShopifyLoggedIn();
  window.location.href = buildShopifyUrl('/logout', `${SITE_URL}/logout`);
}

/**
 * Marks user as logged in locally (cookie + localStorage)
 */
export function markShopifyLoggedIn(): void {
  if (!isBrowser()) return;

  // Set cookie
  document.cookie = `${LOGIN_STATE_KEY}=${LOGIN_STATE_VALUE}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;

  // Set localStorage as backup
  try {
    window.localStorage.setItem(LOGIN_STATE_KEY, LOGIN_STATE_VALUE);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Clears local login state (cookie + localStorage)
 */
export function clearShopifyLoggedIn(): void {
  if (!isBrowser()) return;

  // Clear cookie
  document.cookie = `${LOGIN_STATE_KEY}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  // Clear localStorage
  try {
    window.localStorage.removeItem(LOGIN_STATE_KEY);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Checks if user is logged in locally (cookie or localStorage)
 */
export function isShopifyLoggedIn(): boolean {
  if (!isBrowser()) return false;

  // Check cookie first (more reliable cross-tab)
  const cookieMatch = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOGIN_STATE_KEY}=([^;]+)`)
  );
  if (cookieMatch?.[1] === LOGIN_STATE_VALUE) return true;

  // Fallback to localStorage
  try {
    return window.localStorage.getItem(LOGIN_STATE_KEY) === LOGIN_STATE_VALUE;
  } catch {
    return false;
  }
}


