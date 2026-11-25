import RevealMotion from '@/components/motion/RevealMotion';
import { FAQ_COPY, FAQ_ITEMS } from '@/constants/trustFaq';

/**
 * 08 FAQ. details/summary로 접고 펼친다(키보드·스크린 리더 기본 지원).
 * 첫 질문은 펼친 채로 시작한다.
 */
export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 md:pt-[120px] md:pb-[140px]">
      <RevealMotion className="mx-auto flex max-w-content flex-col gap-10 px-5 md:px-gutter lg:flex-row lg:gap-20">
        <div className="lg:w-[280px] lg:shrink-0">
          <p
            data-reveal
            className="font-display text-sm font-semibold tracking-[0.02em] text-yellow-600 md:text-base"
          >
            {FAQ_COPY.eyebrow}
          </p>
          <h2
            id="faq-title"
            data-reveal
            className="mt-3 text-[28px] font-bold text-ink md:mt-5 md:text-[38px]"
          >
            {FAQ_COPY.title}
          </h2>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={item.question}
              data-reveal
              open={i === 0}
              className="group rounded-3xl bg-grey-50 px-6 py-5 transition-colors open:bg-yellow-50 md:px-8 md:py-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-ink md:text-[19px] [&::-webkit-details-marker]:hidden">
                <span>Q. {item.question}</span>
                <span
                  aria-hidden
                  className="relative size-5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full before:-translate-y-1/2 before:rounded-full before:bg-yellow-600 after:absolute after:top-1/2 after:left-0 after:h-0.5 after:w-full after:-translate-y-1/2 after:rotate-90 after:rounded-full after:bg-yellow-600 after:transition-transform after:duration-300 group-open:after:rotate-0"
                />
              </summary>
              <p className="mt-3.5 text-[15px] leading-[1.7] text-grey-700 md:text-base">
                {item.answer.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </details>
          ))}
        </div>
      </RevealMotion>
    </section>
  );
}
