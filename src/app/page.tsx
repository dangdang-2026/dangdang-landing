import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/AboutSection';
import BackgroundSection from '@/components/sections/BackgroundSection';
import BrandStorySection from '@/components/sections/BrandStorySection';
import FaqSection from '@/components/sections/FaqSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PromotionSection from '@/components/sections/PromotionSection';
import TrustSection from '@/components/sections/TrustSection';

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <BackgroundSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TrustSection />
        <BrandStorySection />
        <FaqSection />
        <PromotionSection />
      </main>
      <Footer />
    </>
  );
}
