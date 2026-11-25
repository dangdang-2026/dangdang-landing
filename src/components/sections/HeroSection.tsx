import Header from '@/components/layout/Header';
import HeroMotion from '@/components/motion/HeroMotion';
import HeroCards from '@/components/sections/hero/HeroCards';
import HeroPhoneSlideshow from '@/components/sections/hero/HeroPhoneSlideshow';
import { HERO_COPY } from '@/constants/copy';

/**
 * 01 Hero. 노란 카드 안에 헤더, 카피, 폰 목업, 떠 있는 카드 3개.
 * PC(xl)는 Figma처럼 자유 배치, 그보다 좁으면 카피 아래에 폰을 두고 폰 아랫부분을 자른다.
 */
export default function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero-bg">
      <HeroMotion className="relative isolate mx-auto max-w-[1392px] overflow-hidden px-5 pt-5 lg:px-12 lg:pt-8 xl:h-[900px]">
        <p
          data-hero-word
          aria-hidden
          className="pointer-events-none absolute top-16 left-[3%] -z-10 font-display text-[clamp(60px,16.4vw,228px)] leading-none font-bold tracking-[-0.03em] whitespace-nowrap text-[rgba(255,181,38,0.22)] select-none xl:top-10"
        >
          DANGDANG
        </p>

        <Header />

        <div className="relative z-20 mt-24 text-center md:mt-44 xl:absolute xl:top-[542px] xl:left-16 xl:mt-0 xl:text-left">
          <p data-hero-line className="text-[15px] font-bold text-yellow-600 xl:text-[19px]">
            {HERO_COPY.eyebrow}
          </p>
          <h1
            id="hero-title"
            data-hero-title
            className="mt-3 text-[28px] leading-[1.3] font-bold text-ink md:text-[36px] xl:mt-5 xl:text-[40px]"
          >
            {HERO_COPY.titleLines[0]}
            <br />
            {HERO_COPY.titleLines[1]}
          </h1>
          <p
            data-hero-line
            className="mt-3 text-[15px] leading-[1.6] font-medium text-grey-700 xl:mt-5 xl:text-[17px]"
          >
            {HERO_COPY.descriptionLines[0]}
            <br />
            {HERO_COPY.descriptionLines[1]}
          </p>
          <div data-hero-line className="mt-6 flex justify-center gap-2.5 xl:mt-5 xl:justify-start">
            <a
              href={HERO_COPY.primaryCta.href}
              className="rounded-2xl bg-ink px-5 py-3.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5 xl:px-6 xl:py-4 xl:text-base"
            >
              {HERO_COPY.primaryCta.label}
            </a>
            <a
              href={HERO_COPY.secondaryCta.href}
              className="rounded-2xl bg-grey-100 px-5 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-grey-200 xl:px-6 xl:py-4 xl:text-base"
            >
              {HERO_COPY.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* 좁은 화면에서는 폰과 카드를 묶는 무대, xl에서는 contents로 풀려서 히어로 기준 배치 */}
        <div className="relative mx-auto mt-10 h-[min(420px,110vw)] w-[min(300px,72vw)] md:h-[460px] md:w-[320px] xl:contents">
          <div
            data-hero-phone
            className="w-full [mask-image:linear-gradient(to_bottom,#000_42%,transparent_66%)] xl:absolute xl:top-[190px] xl:left-[37.07%] xl:w-[360px] xl:[mask-image:linear-gradient(to_bottom,#000_58%,transparent_92%)]"
          >
            <HeroPhoneSlideshow />
          </div>
          <HeroCards />
        </div>
      </HeroMotion>
    </section>
  );
}
