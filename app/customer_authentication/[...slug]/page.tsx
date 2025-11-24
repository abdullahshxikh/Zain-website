import { redirect } from 'next/navigation';

export default function CustomerAuthenticationCatchAll() {
  // This route exists solely to satisfy Shopify Hosted Customer Accounts,
  // which may briefly hit /customer_authentication/* before redirecting
  // customers back to /account. We immediately redirect on the server so
  // there is no UI flash and no content rendered.
  redirect('/account');
}


