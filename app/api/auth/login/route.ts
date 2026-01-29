import { loginCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const { accessToken, expiresAt } = await loginCustomer(email, password);

        return NextResponse.json({ accessToken, expiresAt });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: error.message || 'Failed to login' }, { status: 401 });
    }
}
