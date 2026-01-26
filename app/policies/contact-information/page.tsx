import React from 'react';
import Link from 'next/link';

export default function ContactInfoPage() {
    return (
        <div className="bg-zumfali-light min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-zumfali-green/5">
                <h1 className="text-3xl sm:text-4xl font-bold text-zumfali-green mb-8 font-serif">Contact Information</h1>

                <div className="space-y-8 text-gray-600 font-light leading-relaxed">
                    <p>
                        We are here to help. If you have any questions, concerns, or feedback, please reach out to us using the methods below.
                    </p>

                    <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-zumfali-green mb-4">Customer Support</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="font-medium text-gray-900 w-24">Email:</span>
                                <a href="mailto:info@zumfali.co" className="text-zumfali-gold hover:underline font-medium">info@zumfali.co</a>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="font-medium text-gray-900 w-24">Hours:</span>
                                <span>Monday - Friday: 9:00 AM - 5:00 PM EST</span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-zumfali-green mb-4">Mailing Address</h2>
                        <p>
                            Zumfali<br />
                            New York, NY<br />
                            United States
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">Questions?</h2>
                        <p>
                            For general inquiries or to send us a message directly, please visit our <Link href="/contact" className="text-zumfali-gold hover:underline">Contact Us</Link> page.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
