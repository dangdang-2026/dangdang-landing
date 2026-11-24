'use client';

import { type ReactNode, useRef } from 'react';

import { setupFeaturesAnimation } from '@/animations/featuresAnimation';
import { useGSAP } from '@/animations/gsap';

interface FeaturesMotionProps {
  className?: string;
  children: ReactNode;
}

/** Features 마크업은 서버에서 그리고, 이 래퍼가 스크롤 등장만 얹는다 */
export default function FeaturesMotion({ className, children }: FeaturesMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      const mm = setupFeaturesAnimation(scope.current);
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
