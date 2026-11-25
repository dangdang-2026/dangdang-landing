'use client';

import { type ReactNode, useRef } from 'react';

import { setupBackgroundAnimation } from '@/animations/backgroundAnimation';
import { useGSAP } from '@/animations/gsap';

interface BackgroundMotionProps {
  className?: string;
  children: ReactNode;
}

/** Background 마크업은 서버에서 그리고, 이 래퍼가 스크롤 연출만 얹는다 */
export default function BackgroundMotion({ className, children }: BackgroundMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      const mm = setupBackgroundAnimation(scope.current);
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
