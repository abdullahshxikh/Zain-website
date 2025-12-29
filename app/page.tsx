import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import RunningBanner from '@/components/RunningBanner';
import ProductPricingSection from '@/components/ProductPricingSection';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import IngredientsSection from '@/components/IngredientsSection';
import ProductVideoSection from '@/components/ProductVideoSection';
import HairLossSection from '@/components/HairLossSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorksNewsletterSection from '@/components/HowItWorksNewsletterSection';
import Footer from '@/components/Footer';

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

