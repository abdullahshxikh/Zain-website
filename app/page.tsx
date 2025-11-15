import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductPricingSection from '@/components/ProductPricingSection';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import IngredientsSection from '@/components/IngredientsSection';
import ProductVideoSection from '@/components/ProductVideoSection';
import HairLossSection from '@/components/HairLossSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorksNewsletterSection from '@/components/HowItWorksNewsletterSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ProductPricingSection />
        <IngredientsSection />
        <BeforeAfterGallery />
        <HairLossSection />
        <ProductVideoSection />
        <SolutionSection />
        <HowItWorksNewsletterSection />
      </main>
    </>
  );
}

