'use client';

import { type ReactNode, useRef } from 'react';

import { MOTION_QUERIES, gsap, useGSAP } from '@/animations/gsap';

interface PromotionMotionProps {
  className?: string;
  children: ReactNode;
}

/**
 * 출시 알림 애니메이션.
 * 들어오면 제목이 줄 단위로 올라오고 카드가 튀어 오른다. 햇살은 천천히 돈다.
 * PC는 마우스를 따라 카드가 3D로 기울고 빛 반사가 움직인다.
 * 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 */
export default function PromotionMotion({ className, children }: PromotionMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const section = root.parentElement as HTMLElement;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add(`${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`, () => {
        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: section, start: 'top 70%' },
          })
          .from(q('[data-promo-title]'), { yPercent: 110, duration: 0.9, stagger: 0.12 })
          .from(q('[data-promo-line]'), { opacity: 0, y: 24, duration: 0.7, stagger: 0.1 }, 0.2)
          .from(
            q('[data-promo-card]'),
            { scale: 0.6, rotateX: 40, opacity: 0, duration: 1.1, ease: 'back.out(1.6)' },
            0.35
          );

        gsap.to(q('[data-promo-rays]'), { rotate: 360, duration: 120, ease: 'none', repeat: -1 });
      });

      mm.add(MOTION_QUERIES.desktop, () => {
        const card = q('[data-promo-card]')[0];
        const rotateX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
        const rotateY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const dx = (event.clientX - rect.left) / rect.width - 0.5;
          const dy = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(dx * 24);
          rotateX(-dy * 24);
          card.style.setProperty('--shine-x', `${(dx + 0.5) * 100}%`);
          card.style.setProperty('--shine-y', `${(dy + 0.5) * 100}%`);
        };
        const onLeave = () => {
          rotateX(0);
          rotateY(0);
        };
        section.addEventListener('pointermove', onMove);
        section.addEventListener('pointerleave', onLeave);
        return () => {
          section.removeEventListener('pointermove', onMove);
          section.removeEventListener('pointerleave', onLeave);
        };
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
