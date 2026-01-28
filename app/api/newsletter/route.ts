import { createCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        try {
            await createCustomer(email);
            return NextResponse.json({ success: true });
        } catch (error: any) {
            // If customer already exists, we consider it a success for the popup flow (don't reveal existence)
            // Storefront API typically returns "Email has already been taken" in customerUserErrors
            if (error.message?.toLowerCase().includes('taken') || error.message?.toLowerCase().includes('exists')) {
                return NextResponse.json({ success: true });
            }

            console.error('Newsletter Signup Error:', error);
            return NextResponse.json({ error: 'Failed' }, { status: 500 });
        }
    } catch (error) {
        console.error('Newsletter API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
