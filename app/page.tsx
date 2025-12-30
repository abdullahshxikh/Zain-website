import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import RunningBanner from '@/components/RunningBanner';

const ProductPricingSection = dynamic(() => import('@/components/ProductPricingSection'), { ssr: true });
const BeforeAfterGallery = dynamic(() => import('@/components/BeforeAfterGallery'), { ssr: true });
const IngredientsSection = dynamic(() => import('@/components/IngredientsSection'), { ssr: true });
const ProductVideoSection = dynamic(() => import('@/components/ProductVideoSection'), { ssr: false });
const HairLossSection = dynamic(() => import('@/components/HairLossSection'), { ssr: true });
const SolutionSection = dynamic(() => import('@/components/SolutionSection'), { ssr: true });
const HowItWorksNewsletterSection = dynamic(() => import('@/components/HowItWorksNewsletterSection'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Zumfali",
            "url": "https://zumfali.co",
            "logo": "https://zumfali.co/Logo1.png",
            "description": "Premium natural hair oil for growth and nourishment.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "",
              "contactType": "customer service"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Zumfali",
            "url": "https://zumfali.co",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://zumfali.co/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <RunningBanner />
        <ProductPricingSection />
        <IngredientsSection />
        <BeforeAfterGallery />
        <HairLossSection />
        <ProductVideoSection />
        <SolutionSection />
        <HowItWorksNewsletterSection />
      </main>
      <Footer />
    </>
  );
}

