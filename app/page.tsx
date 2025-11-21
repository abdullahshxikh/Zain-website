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
        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <RunningBanner />
          <ProductPricingSection />
          <IngredientsSection />
          <BeforeAfterGallery />
          <HairLossSection />
          <ProductVideoSection />
          <SolutionSection />
          <HowItWorksNewsletterSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

