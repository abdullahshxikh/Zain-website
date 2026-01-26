import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-zumfali-light min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-zumfali-green/5">
                <h1 className="text-3xl sm:text-4xl font-bold text-zumfali-green mb-8 font-serif">Privacy Policy</h1>

                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">1. Overview</h2>
                        <p>
                            At Zumfali, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit or make a purchase from our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">2. Information We Collect</h2>
                        <p className="mb-2">We collect information that allows us to process your orders and improve your shopping experience, including:</p>
                        <ul className="list-disk pl-5 space-y-1">
                            <li>Contact information (name, email address, phone number).</li>
                            <li>Shipping and billing addresses.</li>
                            <li>Payment details (processed securely through our payment providers).</li>
                            <li>Order history and preferences.</li>
                            <li>Device and usage information when you browse our site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Process and fulfill your orders.</li>
                            <li>Communicate with you regarding order updates and promotions.</li>
                            <li>Improve our website functionality and customer service.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">4. Sharing Your Information</h2>
                        <p>
                            We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our store (e.g., payment processors, shipping carriers, and analytics providers) strictly for the purpose of fulfilling our services to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">5. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your personal information. However, please note that no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">6. Your Rights</h2>
                        <p>
                            Depending on your location, you may have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">7. Contact Us</h2>
                        <p>
                            If you have questions about our Privacy Policy, please contact us at <a href="mailto:info@zumfali.co" className="text-zumfali-gold hover:underline">info@zumfali.co</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
