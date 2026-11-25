'use client';

import { useRef } from 'react';

import { MOTION_QUERIES, SplitText, gsap, replayOnScroll, useGSAP } from '@/animations/gsap';

/** 마우스가 이 거리(px) 안에 들어오면 글자가 솟는다 */
const REACH = 260;
/** 가장 가까울 때 솟는 높이 (글자 높이 대비 %) */
const LIFT = 34;

/**
 * 푸터 바닥의 큰 DANGDANG.
 * 푸터가 보이면 글자가 바닥에서 하나씩 솟아오르고,
 * 마우스 근처 글자는 위로 올라왔다가 젤리처럼 출렁이며 내려간다(히어로는 옆으로 밀림).
 */
export default function FooterWord() {
  const word = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = word.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(`${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`, () => {
        const chars = SplitText.create(el, { type: 'chars' }).chars as HTMLElement[];
        replayOnScroll(
          gsap.from(chars, {
            paused: true,
            yPercent: 100,
            duration: 1,
            ease: 'back.out(1.4)',
            stagger: 0.06,
          }),
          el,
          'top 95%'
        );

        // PC에서만 마우스 반응
        if (!window.matchMedia(MOTION_QUERIES.desktop).matches) return;
        const footer = el.parentElement as HTMLElement;
        const lifts = chars.map((char) => ({
          char,
          y: gsap.quickTo(char, 'yPercent', { duration: 0.9, ease: 'elastic.out(1, 0.35)' }),
          scaleY: gsap.quickTo(char, 'scaleY', { duration: 0.9, ease: 'elastic.out(1, 0.35)' }),
        }));
        // 움직인 뒤 좌표로 재면 떨리니 글자의 원래 가로 위치로 잰다
        const centerX = (char: HTMLElement) =>
          el.getBoundingClientRect().left + char.offsetLeft + char.offsetWidth / 2;

        const onMove = (event: PointerEvent) => {
          lifts.forEach(({ char, y, scaleY }) => {
            const distance = Math.abs(centerX(char) - event.clientX);
            const power = Math.max(0, 1 - distance / REACH);
            y(-LIFT * power);
            scaleY(1 + 0.12 * power);
          });
        };
        const onLeave = () =>
          lifts.forEach(({ y, scaleY }) => {
            y(0);
            scaleY(1);
          });

        footer.addEventListener('pointermove', onMove);
        footer.addEventListener('pointerleave', onLeave);
        return () => {
          footer.removeEventListener('pointermove', onMove);
          footer.removeEventListener('pointerleave', onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: word }
  );

  return (
    <p
      ref={word}
      aria-hidden
      className="pointer-events-none mt-20 -mb-[0.22em] text-center font-display text-[17vw] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-[rgb(251_179_21/0.12)] select-none [&>div]:origin-bottom"
    >
      DANGDANG
    </p>
  );
}
