'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { ScrollTrigger, useGSAP } from '@/animations/gsap';
import PhoneMockup from '@/components/ui/PhoneMockup';
import { HOW_IT_WORKS_COPY, HOW_IT_WORKS_STEPS } from '@/constants/howItWorks';
import { cn } from '@/lib/cn';
import { withBreaks } from '@/lib/withBreaks';

/** 단계마다 폰이 살짝 다르게 기운다 (토스처럼 비스듬한 폰) */
const PHONE_TILT = [
  'perspective(1800px) rotateY(-18deg) rotateX(6deg) rotateZ(5deg)',
  'perspective(1800px) rotateY(-10deg) rotateX(4deg) rotateZ(2deg)',
  'perspective(1800px) rotateY(-16deg) rotateX(7deg) rotateZ(6deg)',
];

/**
 * PC용 How it works. 섹션(300vh)을 지나는 동안 화면을 고정하고,
 * 스크롤 진행에 따라 왼쪽 단계가 펼쳐지며 오른쪽 폰 화면이 바뀐다.
 * 단계를 누르면 그 단계 위치로 스크롤한다.
 */
export default function HowItWorksPinned({ className }: { className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = HOW_IT_WORKS_STEPS.length;

  useGSAP(
    () => {
      if (!track.current) return;
      const trigger = ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress }) => setActive(Math.min(count - 1, Math.floor(progress * count))),
      });
      return () => trigger.kill();
    },
    { scope: track }
  );

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * ((index + 0.5) / count), behavior: 'smooth' });
  };

  return (
    <div ref={track} data-heading-group className={cn('relative h-[300vh]', className)}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-content grid-cols-2 items-center gap-16 px-gutter">
          <div>
            <p
              data-heading-eyebrow
              className="font-display text-base font-semibold tracking-[0.02em] text-yellow-600"
            >
              {HOW_IT_WORKS_COPY.eyebrow}
            </p>
            <h2 data-heading-title className="mt-4 text-[44px] leading-[1.3] font-bold text-ink">
              {withBreaks(HOW_IT_WORKS_COPY.title)}
            </h2>

            <ol className="mt-12 border-b border-grey-100">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.number} className="border-t border-grey-100">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group w-full py-6 text-left"
                    >
                      <span
                        className={cn(
                          'flex items-baseline gap-3 text-xl font-bold transition-colors duration-300',
                          isActive ? 'text-ink' : 'text-grey-300 group-hover:text-grey-500'
                        )}
                      >
                        <span
                          className={cn(
                            'font-display text-sm transition-colors duration-300',
                            isActive ? 'text-primary' : 'text-grey-300'
                          )}
                        >
                          {step.number}
                        </span>
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-3 pl-8 text-base leading-[1.65] font-medium text-grey-600">
                            {step.description[0]}
                            <br />
                            {step.description[1]}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative flex justify-center">
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_214_140/0.55),transparent)]"
            />
            <div
              className="w-[300px] transition-transform duration-700 ease-out xl:w-[320px]"
              style={{ transform: PHONE_TILT[active] }}
            >
              <PhoneMockup className="w-full shadow-[30px_40px_80px_rgba(26,20,5,0.22)]">
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <Image
                    key={step.number}
                    src={step.screen}
                    alt={step.alt}
                    sizes="320px"
                    aria-hidden={i !== active}
                    className={cn(
                      'absolute inset-x-0 top-0 w-full transition-opacity duration-500',
                      i === active ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ))}
                {/* 화면 이미지 아랫부분이 잘린 티가 나지 않게 흰색으로 흐린다 */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white"
                />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
