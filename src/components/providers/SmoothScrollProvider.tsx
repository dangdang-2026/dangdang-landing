'use client';

import { type ReactNode, useEffect } from 'react';

import Lenis from 'lenis';

import { ScrollTrigger, gsap } from '@/animations/gsap';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Lenis 부드러운 스크롤을 켜고 GSAP ScrollTrigger와 같은 시계로 돌린다.
 * 동작 줄이기 사용자에게는 기본 스크롤을 그대로 둔다.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // anchors: 메뉴의 #about 같은 링크도 부드럽게 이동
    const lenis = new Lenis({ autoRaf: false, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return children;
}
