const SHOPIFY_ACCOUNT_BASE = 'https://shopify.com/91374911785/account';
const SHOPIFY_SIGNUP_URL = `${SHOPIFY_ACCOUNT_BASE}/register`;

export function redirectToShopifyLogin() {
  if (typeof window === 'undefined') return;
  window.location.href = '/login';
}

export function redirectToShopifySignup() {
  if (typeof window === 'undefined') return;
  // We don't have a native registration page yet, so we use Shopify's or route to login
  window.location.href = SHOPIFY_SIGNUP_URL;
}

export function redirectToShopifyLogout() {
  if (typeof window === 'undefined') return;

  // Clear local login state
  try {
    window.localStorage.removeItem('customerAccessToken');
    window.localStorage.removeItem('customerAccessTokenExpiresAt');
  } catch (e) {
    console.error('Error clearing storage', e);
  }

  // Redirect to login
  window.location.href = '/login';
}

export function markShopifyLoggedIn() {
  // No-op for now as logic is handled by saving the token directly in the API/Login flow
  // But we can keep this if we want to set a helper flag
}

export function isShopifyLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const token = window.localStorage.getItem('customerAccessToken');
    return !!token;
  } catch {
    return false;
  }
}


