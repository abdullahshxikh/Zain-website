import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductPricingSection from '@/components/ProductPricingSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import IngredientsSection from '@/components/IngredientsSection';
import HairLossSection from '@/components/HairLossSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorksNewsletterSection from '@/components/HowItWorksNewsletterSection';
import VantaBackground from '@/components/VantaBackground';

export default function Home() {
  return (
    <>
      <Navbar />
      <VantaBackground />
      <main className="relative z-10 min-h-screen">
        <HeroSection />
        <IngredientsSection />
        <BeforeAfterSection />
        <ProductPricingSection />
        <HairLossSection />
        <SolutionSection />
        <HowItWorksNewsletterSection />
      </main>
    </>
  );
}

