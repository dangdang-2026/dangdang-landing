import HowItWorksPinned from '@/components/sections/howItWorks/HowItWorksPinned';
import HowItWorksStacked from '@/components/sections/howItWorks/HowItWorksStacked';

/**
 * 04 How it works.
 * PC(lg 이상)는 토스처럼 폰을 고정하고 스크롤하면 단계와 화면이 바뀐다.
 * 모바일과 동작 줄이기 사용자는 단계를 세로로 쌓아 보여 준다.
 */
export default function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-label="이용 방법">
      <HowItWorksPinned className="hidden lg:motion-safe:block" />
      <HowItWorksStacked className="lg:motion-safe:hidden" />
    </section>
  );
}
