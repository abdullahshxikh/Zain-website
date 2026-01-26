import React from 'react';

export default function TermsOfServicePage() {
    return (
        <div className="bg-zumfali-light min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-zumfali-green/5">
                <h1 className="text-3xl sm:text-4xl font-bold text-zumfali-green mb-8 font-serif">Terms of Service</h1>

                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">1. Introduction</h2>
                        <p>
                            Welcome to Zumfali. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before accessing or using our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">2. Use of Our Service</h2>
                        <p>
                            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
                        </p>
                        <p className="mt-2">
                            You must not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">3. Products and Services</h2>
                        <p>
                            We reserve the right to limit the sales of our products or Services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer.
                        </p>
                        <p className="mt-2">
                            All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">4. Accuracy of Billing and Account Information</h2>
                        <p>
                            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">5. Third-Party Links</h2>
                        <p>
                            Certain content, products, and services available via our Service may include materials from third-parties. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">6. Changes to Terms of Service</h2>
                        <p>
                            You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">7. Governing Law</h2>
                        <p>
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the United States.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
