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
        // 카드 하나하나가 따로 반응해야 아래에서 올라올 때도 보이는 것부터 다시 나온다.
        // 같은 줄(PC 카드 3개)은 들어오는 순서대로 조금씩 늦게 나온다.
        const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
        items.forEach((item, i) => {
          const sameRow = items[i - 1]?.offsetTop === item.offsetTop;
          const rowIndex = sameRow
            ? items.slice(0, i).filter((el) => el.offsetTop === item.offsetTop).length
            : 0;
          replayOnScroll(
            gsap.from(item, {
              paused: true,
              opacity: 0,
              y: 36,
              duration: 0.8,
              ease: 'power3.out',
              delay: rowIndex * 0.12,
            }),
            item,
            'top 88%'
          );
        });
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
