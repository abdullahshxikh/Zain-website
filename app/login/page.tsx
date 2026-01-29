'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Save token securely (as securely as possible in client-side app)
            localStorage.setItem('customerAccessToken', data.accessToken);
            localStorage.setItem('customerAccessTokenExpiresAt', data.expiresAt); // Optional: checking expiry

            // Redirect to account dashboard
            router.push('/account');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#FAFAF9] flex items-center justify-center pt-20 pb-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 sm:p-12 border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-[#1a2f23] mb-2">Welcome Back</h1>
                        <p className="text-gray-500 text-sm">Sign in to manage your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-800 text-sm p-4 rounded-xl border border-red-100 flex items-center gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2f23] mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2f23] mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <a href="https://shopify.com/authentication/forgot_password" className="text-xs text-gray-400 hover:text-[#bb9c30] transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#1a2f23] text-white rounded-xl font-bold tracking-wider hover:bg-[#2d4a38] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#1a2f23]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Sign In</>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <a href="https://shopify.com/authentication/register" className="text-[#1a2f23] font-bold hover:text-[#bb9c30] transition-colors">
                            Create one
                        </a>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
