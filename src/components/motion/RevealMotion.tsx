'use client';

import { type ReactNode, useRef } from 'react';

import { MOTION_QUERIES, gsap, replayOnScroll, useGSAP } from '@/animations/gsap';

interface RevealMotionProps {
  className?: string;
  children: ReactNode;
}

/**
 * 안의 [data-reveal] 요소들이 화면에 들어오면 아래에서 차례로 올라온다.
 * 간단한 섹션(Trust, FAQ 등)에서 같이 쓴다. 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 */
export default function RevealMotion({ className, children }: RevealMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`, () => {
        replayOnScroll(
          gsap.from(root.querySelectorAll('[data-reveal]'), {
            paused: true,
            opacity: 0,
            y: 36,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          }),
          root
        );
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
