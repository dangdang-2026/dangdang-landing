'use client';

import { type ReactNode, useRef } from 'react';

import { MOTION_QUERIES, gsap, replayOnScroll, useGSAP } from '@/animations/gsap';

interface BrandStoryMotionProps {
  className?: string;
  children: ReactNode;
}

/**
 * Brand Story 애니메이션. 카드가 화면에 들어올 때마다 한 장씩 올라오고,
 * 카드마다 그림이 이어서 움직인다.
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
        // 카드마다 따로 감지해서, 모바일처럼 세로로 쌓여 있어도 보이는 카드가 사라지지 않는다.
        // PC처럼 한 줄에 놓인 카드는 01 → 02 → 03 순서로 조금씩 늦게 올라온다.
        // 카드는 기울어진 채 올라와 바로 서고, 선 직후 그 카드 그림이 움직인다
        const cards = q('[data-story-card]');
        gsap.set(cards, { transformPerspective: 1000, transformOrigin: '50% 100%' });
        cards.forEach((card, i) => {
          const rowIndex = cards.slice(0, i).filter((el) => el.offsetTop === card.offsetTop).length;
          const tl = gsap.timeline({
            paused: true,
            delay: rowIndex * 0.55,
            defaults: { ease: 'power3.out' },
          });
          replayOnScroll(tl, card, 'top 88%');
          tl.from(card, { opacity: 0, y: 90, rotateX: 18, rotate: i % 2 ? 2 : -2, duration: 0.9 });
          const cq = gsap.utils.selector(card);
          if (i === 0) {
            tl.from(cq('[data-hanja="left"]'), { xPercent: -120, opacity: 0, duration: 0.8 }, 0.35)
              .from(cq('[data-hanja="right"]'), { xPercent: 120, opacity: 0, duration: 0.8 }, '<')
              .from(
                cq('[data-hanja-plus]'),
                { scale: 0, rotate: -90, duration: 0.5, ease: 'back.out(3)' },
                '-=0.3'
              );
          }
          if (i === 1) {
            tl.from(
              cq('[data-story-walker]'),
              { scale: 0, duration: 0.6, ease: 'back.out(2.5)' },
              0.4
            );
          }
          if (i === 2) {
            tl.from(
              cq('[data-amber-dot]'),
              { scale: 0, duration: 0.7, ease: 'back.out(2)', stagger: 0.12 },
              0.35
            );
          }
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
