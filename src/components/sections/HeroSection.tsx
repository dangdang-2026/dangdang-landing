import appToday from '@/assets/images/app-today-before-meal.png';
import Header from '@/components/layout/Header';
import HeroMotion from '@/components/motion/HeroMotion';
import HeroCards from '@/components/sections/hero/HeroCards';
import PhoneMockup from '@/components/ui/PhoneMockup';
import { HERO_COPY } from '@/constants/copy';

/**
 * 01 Hero. 노란 카드 안에 헤더, 카피, 폰 목업, 떠 있는 카드 3개.
 * PC(xl)는 Figma처럼 자유 배치, 그보다 좁으면 카피 아래에 폰을 두고 폰 아랫부분을 자른다.
 */
export default function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="p-3 lg:p-6">
      <HeroMotion className="hero-bg relative isolate mx-auto max-w-[1392px] overflow-hidden rounded-[28px] px-5 pt-5 lg:rounded-[40px] lg:px-12 lg:pt-8 xl:h-[900px]">
        <p
          data-hero-word
          aria-hidden
          className="pointer-events-none absolute top-16 left-[3%] -z-10 font-display text-[clamp(88px,16.4vw,228px)] leading-none font-bold tracking-[-0.03em] whitespace-nowrap text-[rgba(255,181,38,0.22)] select-none xl:top-10"
        >
          DANGDANG
        </p>

        <Header />

        <div className="relative mt-12 text-center xl:absolute xl:top-[542px] xl:left-16 xl:mt-0 xl:text-left">
          <p
            data-hero-line
            className="text-[15px] font-bold text-yellow-600 xl:text-[19px] xl:text-white/90"
          >
            {HERO_COPY.eyebrow}
          </p>
          <h1
            id="hero-title"
            data-hero-title
            className="mt-3 text-[28px] leading-[1.3] font-bold text-ink md:text-[36px] xl:mt-5 xl:text-[40px] xl:text-white"
          >
            {HERO_COPY.titleLines[0]}
            <br />
            {HERO_COPY.titleLines[1]}
          </h1>
          <p
            data-hero-line
            className="mt-3 text-[15px] leading-[1.6] font-medium text-grey-700 xl:mt-5 xl:text-[17px] xl:text-white"
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
              className="rounded-2xl bg-white/70 px-5 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-white xl:px-6 xl:py-4 xl:text-base"
            >
              {HERO_COPY.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* 좁은 화면에서는 폰과 카드를 묶는 무대, xl에서는 contents로 풀려서 히어로 기준 배치 */}
        <div className="relative mx-auto mt-10 h-[min(420px,110vw)] w-[min(300px,72vw)] md:h-[460px] md:w-[320px] xl:contents">
          <div
            data-hero-phone
            className="w-full xl:absolute xl:top-[190px] xl:left-[37.07%] xl:w-[360px]"
          >
            <PhoneMockup
              screen={appToday}
              alt="당당 앱 오늘 화면. 저녁 드실 때 눌러 달라는 카드와 오늘 혈당 기록"
              preload
              className="w-full"
            />
          </div>
          <HeroCards />
        </div>
      </HeroMotion>
    </section>
  );
}
