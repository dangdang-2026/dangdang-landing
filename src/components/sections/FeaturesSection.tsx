import Image from 'next/image';

import FeaturesMotion from '@/components/motion/FeaturesMotion';
import PhoneMockup from '@/components/ui/PhoneMockup';
import { FEATURES, FEATURES_COPY } from '@/constants/features';
import { cn } from '@/lib/cn';

/**
 * 05 Features. 기능 3개를 큰 문장과 폰 두 대(전 → 후)로 보여 준다.
 * PC는 글과 폰을 지그재그로 놓고, 모바일은 세로로 쌓는다.
 */
export default function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="overflow-x-clip py-24 md:py-40">
      <FeaturesMotion className="mx-auto max-w-content px-5 md:px-gutter">
        <div className="text-center">
          <p className="font-display text-sm font-semibold tracking-[0.02em] text-yellow-600 md:text-base">
            {FEATURES_COPY.eyebrow}
          </p>
          <h2
            id="features-title"
            className="mt-3 text-[28px] leading-[1.35] font-bold whitespace-pre-line text-ink md:mt-4 md:text-[44px]"
          >
            {FEATURES_COPY.title}
          </h2>
        </div>

        <div className="mt-20 flex flex-col gap-28 md:mt-32 md:gap-44">
          {FEATURES.map((feature, i) => (
            <article
              key={feature.label}
              data-feature
              className={cn(
                'flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16',
                i % 2 === 1 && 'lg:flex-row-reverse'
              )}
            >
              <div className="text-center lg:w-[420px] lg:shrink-0 lg:text-left">
                <p
                  data-feature-line
                  className="inline-block rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-600"
                >
                  기능 {i + 1} · {feature.label}
                </p>
                <h3
                  data-feature-line
                  className="mt-5 text-[26px] leading-[1.4] font-bold whitespace-pre-line text-ink md:text-[34px]"
                >
                  {feature.title}
                </h3>
                <p
                  data-feature-line
                  className="mt-5 text-base leading-[1.7] font-medium text-grey-600 md:text-[17px]"
                >
                  {feature.description.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="relative flex justify-center gap-4 md:gap-6">
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 -z-10 size-[min(560px,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_214_140/0.45),transparent)]"
                />
                {feature.screens.map((screen, j) => (
                  <figure
                    key={screen.chip}
                    data-feature-phone={j}
                    className={cn('flex flex-col items-center gap-3', j === 1 && 'mt-10 md:mt-16')}
                  >
                    <figcaption className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-grey-700 shadow-[0_6px_18px_rgba(25,31,40,0.08)] md:text-sm">
                      {screen.chip}
                    </figcaption>
                    <div
                      data-feature-parallax={j}
                      className="relative h-[clamp(300px,82vw,480px)] w-[clamp(150px,40vw,250px)] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] md:h-[520px] md:w-[260px]"
                    >
                      <PhoneMockup className="w-full shadow-none">
                        <Image src={screen.src} alt={screen.alt} sizes="260px" className="w-full" />
                      </PhoneMockup>
                    </div>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </FeaturesMotion>
    </section>
  );
}
