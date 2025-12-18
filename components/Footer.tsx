'use client';

import Image from 'next/image';
import { useMetaPixel } from '@/hooks/useMetaPixel';

export default function Footer() {
  const { trackSubscribe, trackCompleteRegistration, trackContact } = useMetaPixel();

  return (
    <footer className="border-t border-[#1a2f23]/10 bg-[#FAFAF9]">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:gap-20 lg:px-12">
        {/* Logo / Brand */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo1.png"
              alt="Zumfali"
              title="Zumfali logo"
              width={160}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <p className="max-w-xs text-base text-gray-600 font-light leading-relaxed">
            Premium 7-in-1 natural hair oil formulated to nourish your scalp,
            support growth, and restore shine.
          </p>
        </div>

        {/* Links */}
        <div className="grid flex-[2] grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
          {/* Policies */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#1a2f23]">
              Policies
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li>
                <a href="#privacy-policy" className="hover:text-[#bb9c30] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#refund-policy" className="hover:text-[#bb9c30] transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#terms-of-service" className="hover:text-[#bb9c30] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact-information" className="hover:text-[#bb9c30] transition-colors">
                  Contact Information
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#1a2f23]">
              Quick links
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li>
                <a href="#home" className="hover:text-[#bb9c30] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop-now" className="hover:text-[#bb9c30] transition-colors">
                  Shop Now
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:text-[#bb9c30] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-[#bb9c30] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#1a2f23]">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li>
                <a
                  href="mailto:hello@zumfali.co"
                  className="hover:text-[#bb9c30] transition-colors"
                  onClick={() => trackContact('email')}
                >
                  hello@zumfali.co
                </a>
              </li>
              <li>New York, United States</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#1a2f23]">
              Subscribe to our emails
            </h3>
            <p className="mb-4 text-sm text-gray-600 font-light">
              Sign up to receive updates, exclusive offers, and early access to
              new Zumfali drops.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = new FormData(form).get('email');
                if (!email) return;
                trackSubscribe();
                trackCompleteRegistration('newsletter_footer');
                form.reset();
              }}
              className="flex flex-col gap-3"
            >
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#bb9c30] focus:ring-1 focus:ring-[#bb9c30] focus:outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-[#1a2f23] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2d4a38] transition-colors shadow-lg shadow-[#1a2f23]/20"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 py-8">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
           {/* Payment Icons */}
           <div className="relative w-full max-w-lg h-10">
             <Image 
               src="/payment-icons.png" 
               alt="Accepted Payment Methods" 
               title="Accepted Payment Methods" 
               fill 
               className="object-contain"
             />
           </div>
           
           <p className="text-xs text-gray-400 font-light">
             © {new Date().getFullYear()} Zumfali. All rights reserved.
           </p>
         </div>
      </div>
    </footer>
  );
}


