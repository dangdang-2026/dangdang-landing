'use client';

import { useRef } from 'react';

import { MOTION_QUERIES, ScrollTrigger, gsap, useGSAP } from '@/animations/gsap';
import { cn } from '@/lib/cn';

interface MarqueeBandProps {
  words: readonly string[];
  /** 띠 기울기 (deg) */
  tilt?: number;
  tone?: 'amber' | 'ink';
}

/**
 * 섹션 사이를 가로지르는 흘러가는 띠 문구.
 * 계속 흐르다가, 아래로 스크롤하면 빨라지고 위로 스크롤하면 거꾸로 흐른다.
 * 모션 줄이기 사용자에게는 멈춘 띠로 보인다.
 */
export default function MarqueeBand({ words, tilt = -2, tone = 'amber' }: MarqueeBandProps) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = track.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`, () => {
      const loop = gsap.to(el, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const speed = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
          gsap.to(loop, { timeScale: speed || self.direction, duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.3 });
        },
      });
      return () => trigger.kill();
    });
    return () => mm.revert();
  });

  // 두 벌을 이어 붙여야 -50%에서 끊김 없이 이어진다
  const items = [...words, ...words];

  return (
    <div aria-hidden className="relative overflow-hidden py-6 md:py-10">
      <div
        className={cn(
          'w-[110%] -translate-x-[5%] py-4 md:py-5',
          tone === 'amber' ? 'bg-primary text-white' : 'bg-ink text-yellow-300'
        )}
        style={{ rotate: `${tilt}deg` }}
      >
        <div ref={track} className="flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {items.map((word, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="flex items-center gap-6 pr-6 text-xl font-bold whitespace-nowrap md:gap-10 md:pr-10 md:text-[32px]"
                >
                  {word}
                  <span className="text-base opacity-70 md:text-2xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
