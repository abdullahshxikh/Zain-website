import { getCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { accessToken } = await request.json();

        if (!accessToken) {
            return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
        }

        const customer = await getCustomer(accessToken);

        if (!customer) {
            return NextResponse.json({ error: 'Customer not found or token expired' }, { status: 404 });
        }

        return NextResponse.json({ customer });
    } catch (error: any) {
        console.error('Fetch customer error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch customer data' }, { status: 500 });
    }
}
