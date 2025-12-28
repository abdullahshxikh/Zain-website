import { redirect } from 'next/navigation';

export default function CustomerIdentityCatchAll({
    params,
    searchParams,
}: {
    params: { slug: string[] };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Handle the logout redirect from Shopify New Customer Accounts
    // URL pattern: /customer_identity/logout?return_url=...
    if (params.slug?.includes('logout')) {
        const returnUrl = searchParams.return_url as string;
        if (returnUrl) {
            // If the return URL is absolute (https://...), Next.js redirect might expect relative 
            // or allows absolute for external. Here we want to go to OUR site.
            // Usually return_url is encoded.
            try {
                const url = new URL(returnUrl);
                if (url.pathname) {
                    redirect(url.pathname);
                }
            } catch (e) {
                // If partial path or error, default to /logout
            }
        }
        redirect('/logout');
    }

    // Default fallback
    redirect('/account');
}
