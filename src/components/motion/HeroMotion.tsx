'use client';

import { type ReactNode, useRef } from 'react';

import { useGSAP } from '@/animations/gsap';
import { setupHeroAnimation } from '@/animations/heroAnimation';

interface HeroMotionProps {
  className?: string;
  children: ReactNode;
}

/** 히어로 마크업은 서버에서 그리고, 이 래퍼가 브라우저에서 애니메이션만 얹는다 */
export default function HeroMotion({ className, children }: HeroMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      const mm = setupHeroAnimation(scope.current);
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
