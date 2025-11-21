'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-start lg:gap-16 lg:px-12">
        {/* Logo / Brand */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo1.png"
              alt="Zumfali"
              width={160}
              height={60}
              className="h-10 w-auto"
            />
          </div>
          <p className="max-w-xs text-sm text-gray-600">
            Premium 7-in-1 natural hair oil formulated to nourish your scalp,
            support growth, and restore shine.
          </p>
        </div>

        {/* Links */}
        <div className="grid flex-[2] grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {/* Policies */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Policies
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#privacy-policy" className="hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#refund-policy" className="hover:text-gray-900">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#terms-of-service" className="hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact-information" className="hover:text-gray-900">
                  Contact Information
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Quick links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#home" className="hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop-now" className="hover:text-gray-900">
                  Shop Now
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="mailto:hello@zumfali.co"
                  className="hover:text-gray-900"
                >
                  hello@zumfali.co
                </a>
              </li>
              <li>New York, United States</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Subscribe to our emails
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Sign up to receive updates, exclusive offers, and early access to
              new Zumfali drops.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}


