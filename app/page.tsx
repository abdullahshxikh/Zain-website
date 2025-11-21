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
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-28 md:pt-32">
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

