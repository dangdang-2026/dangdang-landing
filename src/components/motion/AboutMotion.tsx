'use client';

import { type ReactNode, useRef } from 'react';

import { setupAboutAnimation } from '@/animations/aboutAnimation';
import { useGSAP } from '@/animations/gsap';

interface AboutMotionProps {
  className?: string;
  children: ReactNode;
}

/** About 마크업은 서버에서 그리고, 이 래퍼가 스크롤 애니메이션만 얹는다 */
export default function AboutMotion({ className, children }: AboutMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      const mm = setupAboutAnimation(scope.current);
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
