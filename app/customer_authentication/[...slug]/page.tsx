import { redirect } from 'next/navigation';

/**
 * Catch-all route for Shopify Hosted Customer Account redirects.
 * Shopify may briefly redirect to /customer_authentication/* during the login flow.
 * This route immediately redirects to /account on the server to prevent 404 errors.
 */
export default function CustomerAuthenticationCatchAll() {
  redirect('/account');
}


