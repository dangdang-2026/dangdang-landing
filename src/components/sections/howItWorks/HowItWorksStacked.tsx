import Image from 'next/image';

import PhoneMockup from '@/components/ui/PhoneMockup';
import { HOW_IT_WORKS_COPY, HOW_IT_WORKS_STEPS } from '@/constants/howItWorks';
import { cn } from '@/lib/cn';

/** 모바일·동작 줄이기용 How it works. 단계를 세로로 쌓는다 */
export default function HowItWorksStacked({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto max-w-content px-5 py-24 text-center', className)}>
      <p className="font-display text-sm font-semibold tracking-[0.02em] text-yellow-600">
        {HOW_IT_WORKS_COPY.eyebrow}
      </p>
      <h2 className="mt-3 text-[28px] leading-[1.35] font-bold whitespace-pre-line text-ink">
        {HOW_IT_WORKS_COPY.title}
      </h2>

      <ol className="mt-12 flex flex-col gap-16">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li key={step.number} className="flex flex-col items-center text-center">
            <span className="font-display text-sm font-semibold text-primary">{step.number}</span>
            <h3 className="mt-2 text-xl leading-[1.4] font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] font-medium text-grey-600">
              {step.description[0]}
              <br />
              {step.description[1]}
            </p>
            <div className="relative -mx-10 mt-8 h-[440px] overflow-hidden px-10 pt-4">
              <PhoneMockup className="w-[min(280px,72vw)]">
                <Image src={step.screen} alt={step.alt} sizes="280px" className="w-full" />
              </PhoneMockup>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
