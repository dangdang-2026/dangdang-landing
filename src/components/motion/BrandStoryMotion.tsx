'use client';

import { type ReactNode, useRef } from 'react';

import { MOTION_QUERIES, gsap, useGSAP } from '@/animations/gsap';

interface BrandStoryMotionProps {
  className?: string;
  children: ReactNode;
}

/**
 * Brand Story 애니메이션. 카드가 화면에 들어오면
 * 糖과 堂이 양옆에서 다가오고, 당당이가 통통 튀며 걷고, 앰버 원이 커지며 겹친다.
 * 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 */
export default function BrandStoryMotion({ className, children }: BrandStoryMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`, () => {
        gsap.from(q('[data-story-card]'), {
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: q('[data-story-card]')[0], start: 'top 80%' },
        });

        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-hanja]')[0], start: 'top 75%' } })
          .from(q('[data-hanja="left"]'), {
            xPercent: -120,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
          .from(
            q('[data-hanja="right"]'),
            { xPercent: 120, opacity: 0, duration: 0.9, ease: 'power3.out' },
            '<'
          )
          .from(
            q('[data-hanja-plus]'),
            { scale: 0, rotate: -90, duration: 0.5, ease: 'back.out(3)' },
            '-=0.3'
          );

        gsap.from(q('[data-amber-dot]'), {
          scale: 0,
          duration: 0.8,
          ease: 'back.out(2)',
          stagger: 0.15,
          scrollTrigger: { trigger: q('[data-amber-dot]')[0], start: 'top 80%' },
        });

        // 당당이는 점선 위를 왔다 갔다 걸으며 통통 튄다
        gsap.fromTo(
          q('[data-story-walker]'),
          { x: -70 },
          { x: 70, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true }
        );
        gsap.to(q('[data-story-character]'), {
          keyframes: [
            { scaleX: 1.06, scaleY: 0.92, duration: 0.16, ease: 'power1.out' },
            { scaleX: 0.96, scaleY: 1.05, y: -12, duration: 0.22, ease: 'power2.out' },
            { scaleX: 1, scaleY: 1, y: 0, duration: 0.26, ease: 'power2.in' },
          ],
          repeat: -1,
          transformOrigin: '50% 100%',
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
