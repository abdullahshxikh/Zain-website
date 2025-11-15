'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/hero-image.png"
        alt="10,000 Women Can't be Wrong - Transform Dry, Damaged Strands into Nourished Hair"
        fill
        className="object-cover"
        priority
        quality={100}
      />
    </section>
  );
}
