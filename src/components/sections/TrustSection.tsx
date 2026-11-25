import Image from 'next/image';

import RevealMotion from '@/components/motion/RevealMotion';
import { TRUST_COPY, TRUST_ITEMS } from '@/constants/trustFaq';
import { withBreaks } from '@/lib/withBreaks';

/** 06 Trust. 믿고 쓸 수 있도록 지키는 세 가지 */
export default function TrustSection() {
  return (
    <section id="trust" aria-labelledby="trust-title" className="bg-grey-50 py-24 md:py-[140px]">
      <RevealMotion className="mx-auto max-w-content px-5 md:px-gutter">
        <div data-heading-group>
          <p
            data-heading-eyebrow
            className="font-display text-sm font-semibold tracking-[0.02em] text-yellow-600 md:text-base"
          >
            {TRUST_COPY.eyebrow}
          </p>
          <h2
            id="trust-title"
            data-heading-title
            className="mt-3 text-[28px] leading-[1.4] font-bold text-ink md:mt-4 md:text-[38px]"
          >
            {withBreaks(TRUST_COPY.title)}
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item.title}
              data-reveal
              className="rounded-[28px] bg-white px-7 pt-7 pb-8 transition-transform duration-300 hover:-translate-y-1 md:px-8 md:pt-8 md:pb-9"
            >
              <span className="inline-flex rounded-3xl bg-[linear-gradient(135deg,#fff6e5_0%,#ffeccb_71%)] p-3.5">
                <Image
                  src={item.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 md:size-14"
                />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink md:text-[21px]">{item.title}</h3>
              <p className="mt-4 text-[15px] leading-[1.75] font-medium text-grey-700 md:text-base">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </RevealMotion>
    </section>
  );
}
