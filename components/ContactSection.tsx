'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const faqs = [
    {
        question: 'How long does shipping take?',
        answer: 'We process orders within 1-2 business days. Standard shipping typically takes 8-12 business days within the US. International shipping times vary based on location.'
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day satisfaction guarantee. If you are not completely satisfied with your purchase, please contact us within 30 days of receiving your order for a full refund or exchange.'
    },
    {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you will receive a confirmation email with a tracking number. You can use that number to track your package on our carrier\'s website.'
    },
    {
        question: 'Is the hair oil safe for colored hair?',
        answer: 'Yes! Zumfali 7-in-1 Hair Oil is made with natural ingredients and is safe for color-treated and chemically treated hair.'
    }
];

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderNumber: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
        setFormData({ name: '', email: '', phone: '', orderNumber: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-[#FAFAF9] overflow-hidden">
            {/* Hero Header */}
            <section className="relative bg-[#1a2f23] py-20 sm:py-28 text-center px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-6xl font-serif text-white mb-6">
                        We're Here to Help
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl font-light">
                        Questions about your order or our products? <br className="hidden sm:block" />
                        Our team is ready to assist you on your wellness journey.
                    </p>
                </motion.div>
            </section>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-16 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 sm:p-12"
                    >
                        <h2 className="text-3xl font-serif text-[#1a2f23] mb-2">Send us a Message</h2>
                        <p className="text-gray-500 mb-8">We usually respond within 24 hours regarding any inquiries.</p>

                        {formStatus === 'success' ? (
                            <div className="bg-[#bb9c30]/10 border border-[#bb9c30] text-[#1a2f23] p-6 rounded-xl text-center">
                                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                <p>Thank you for reaching out. We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-[#1a2f23] uppercase tracking-wider">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors"
                                            required
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-[#1a2f23] uppercase tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors"
                                            required
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-[#1a2f23] uppercase tracking-wider">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="orderNumber" className="text-sm font-bold text-[#1a2f23] uppercase tracking-wider">Order Number (Optional)</label>
                                        <input
                                            type="text"
                                            id="orderNumber"
                                            name="orderNumber"
                                            value={formData.orderNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors"
                                            placeholder="#12345"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-[#1a2f23] uppercase tracking-wider">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bb9c30]/20 focus:border-[#bb9c30] transition-colors resize-none"
                                        required
                                        placeholder="How can we help you today?"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full sm:w-auto px-10 py-4 bg-[#1a2f23] text-white font-bold rounded-lg hover:bg-[#2d4a38] transition-all shadow-lg shadow-[#1a2f23]/20 uppercase tracking-widest text-sm"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        {/* Find Us Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-[#1a2f23] rounded-2xl p-8 text-white shadow-xl"
                        >
                            <h3 className="text-xl font-serif mb-6">Contact Information</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="bg-[#bb9c30]/20 p-2 rounded-lg">
                                        <svg className="w-6 h-6 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email Us</span>
                                        <a href="mailto:info@zumfali.co" className="text-lg hover:text-[#bb9c30] transition-colors">info@zumfali.co</a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <div className="bg-[#bb9c30]/20 p-2 rounded-lg">
                                        <svg className="w-6 h-6 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Location</span>
                                        <span className="text-lg block">New York, United States</span>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <div className="bg-[#bb9c30]/20 p-2 rounded-lg">
                                        <svg className="w-6 h-6 text-[#bb9c30]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Response Time</span>
                                        <span className="text-lg block">Within 24 Hours</span>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Quick Links Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-[#bb9c30] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>

                            <h3 className="text-xl font-serif mb-4 relative z-10">Join our Community</h3>
                            <p className="text-white/90 mb-6 relative z-10">Follow us on social media for daily hair care tips, customer stories, and exclusive giveaways.</p>

                            <div className="flex gap-4 relative z-10">
                                {/* Social Placeholders */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 bg-white/20 rounded-full hover:bg-white hover:text-[#bb9c30] transition-all cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif text-[#1a2f23] mb-4">Common Questions</h2>
                        <p className="text-gray-500">Find quick answers to common questions about shipping, returns, and our products.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#bb9c30]/50 transition-colors">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-[#1a2f23]">{faq.question}</span>
                                    <span className={`transform transition-transform duration-300 text-[#bb9c30] ${activeFaq === index ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/shop" className="inline-flex items-center text-[#1a2f23] font-bold hover:text-[#bb9c30] transition-colors border-b-2 border-[#1a2f23] hover:border-[#bb9c30] pb-1">
                            View all FAQs
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>



            {/* Newsletter CTA */}
            <section className="bg-[#1a2f23] py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl sm:text-5xl font-serif text-white mb-6">Join the Zumfali Family</h2>
                    <p className="text-gray-300 mb-8 text-lg">Sign up for our newsletter to receive exclusive offers, hair care tips, and 10% off your first order.</p>

                    <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb9c30] text-gray-900"
                            required
                        />
                        <button type="submit" className="px-8 py-4 bg-[#bb9c30] text-white font-bold rounded-lg hover:bg-[#a38b2b] transition-colors uppercase tracking-widest text-sm shadow-xl shadow-black/20">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
