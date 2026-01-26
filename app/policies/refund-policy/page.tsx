import React from 'react';

export default function RefundPolicyPage() {
    return (
        <div className="bg-zumfali-light min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-zumfali-green/5">
                <h1 className="text-3xl sm:text-4xl font-bold text-zumfali-green mb-8 font-serif">Refund Policy</h1>

                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">1. Return Policy</h2>
                        <p>
                            We want you to love your Zumfali products. If you are not completely satisfied with your purchase, you may request a return within <strong>30 days</strong> of receiving your order.
                        </p>
                        <p className="mt-2">
                            To be eligible for a return, your item must be in the same condition that you received it, unused, and in its original packaging.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">2. How to Initiate a Return</h2>
                        <p>
                            To start a return, please contact us at <a href="mailto:info@zumfali.co" className="text-zumfali-gold hover:underline">info@zumfali.co</a> with your order number and reason for return. If your return is accepted, we will send you instructions on how and where to send your package.
                        </p>
                        <p className="mt-2 text-sm italic">
                            Items sent back to us without first requesting a return will not be accepted.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">3. Refunds</h2>
                        <p>
                            Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 10 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">4. Damaged or Defective Items</h2>
                        <p>
                            Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you received the wrong item, so that we can evaluate the issue and make it right.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zumfali-green mb-3">5. Exceptions / Non-returnable Items</h2>
                        <p>
                            Certain types of items cannot be returned, such as custom products or personal care goods that have been opened/used. Please contact us if you have questions or concerns about your specific item.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
