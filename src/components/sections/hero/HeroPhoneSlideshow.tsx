'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import PhoneMockup from '@/components/ui/PhoneMockup';
import { HERO_SCREENS, HERO_SCREEN_INTERVAL } from '@/constants/heroScreens';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

/**
 * 히어로 폰 안 앱 화면을 3초마다 페이드로 바꾼다.
 * 멈춤 버튼을 두고(WCAG 2.2.2), 모션 줄이기 사용자와 화면 밖에서는 자동으로 넘기지 않는다.
 */
export default function HeroPhoneSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const autoplay = !paused && !reducedMotion && visible;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_SCREENS.length),
      HERO_SCREEN_INTERVAL
    );
    return () => window.clearInterval(timer);
  }, [autoplay]);

  return (
    <div ref={ref} className="relative">
      <PhoneMockup className="w-full max-xl:shadow-none">
        {HERO_SCREENS.map((screen, i) => (
          <Image
            key={screen.label}
            src={screen.src}
            alt={screen.alt}
            preload={i === 0}
            sizes="(min-width: 1280px) 340px, 300px"
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-x-0 top-0 w-full transition-opacity duration-700 ease-out',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </PhoneMockup>

      <div className="absolute top-6 -left-11 flex flex-col items-center gap-2 rounded-full bg-white/70 px-1.5 py-2 backdrop-blur-md xl:-left-14">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? '화면 넘기기 다시 시작' : '화면 넘기기 멈춤'}
          className="grid size-6 place-items-center rounded-full text-ink hover:bg-white"
        >
          <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
            {paused ? (
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            ) : (
              <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
            )}
          </svg>
        </button>
        {HERO_SCREENS.map((screen, i) => (
          <button
            key={screen.label}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${screen.label} 화면 보기`}
            aria-current={i === index}
            className="grid size-6 place-items-center"
          >
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                i === index ? 'h-4 w-1.5 bg-primary' : 'size-1.5 bg-grey-300'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
