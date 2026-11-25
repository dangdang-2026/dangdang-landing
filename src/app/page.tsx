import FloatingNav from '@/components/layout/FloatingNav';
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
import MarqueeBand from '@/components/ui/MarqueeBand';
import { MARQUEE_WORDS } from '@/constants/copy';

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <main>
        <HeroSection />
        <AboutSection />
        <BackgroundSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MarqueeBand words={MARQUEE_WORDS.first} />
        <TrustSection />
        <BrandStorySection />
        <FaqSection />
        <MarqueeBand words={MARQUEE_WORDS.second} tilt={2} tone="ink" />
        <PromotionSection />
      </main>
      <Footer />
    </>
  );
}
