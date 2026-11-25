'use client';

import { SplitText, gsap, replayOnScroll, useGSAP } from '@/animations/gsap';

/** How it works가 lg에서 고정형과 쌓는 형으로 바뀌어서, 이 경계에서 다시 나눈다 */
const QUERIES = {
  wide: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  narrow: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
} as const;

/**
 * 섹션 제목 애니메이션. [data-heading-group] 안의
 * 작은 제목(eyebrow)은 살짝 올라오고, 큰 제목은 단어가 줄 아래에서 하나씩 솟아오르고, 부제는 뒤따라 올라온다.
 * 위아래 어느 방향으로 스크롤해도 다시 나온다. 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 */
export default function HeadingMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // 조건을 객체로 넘겨야 wide ↔ narrow가 바뀔 때도 다시 실행된다
    mm.add(QUERIES, (context) => {
      const { wide, narrow } = context.conditions ?? {};
      if (!wide && !narrow) return;
      document.querySelectorAll<HTMLElement>('[data-heading-group]').forEach((group) => {
        // 지금 화면 크기에서 숨겨진 쪽(How it works 고정형/쌓는 형)은 건너뛴다
        if (!group.offsetParent) return;
        const q = gsap.utils.selector(group);
        const title = q('[data-heading-title]');
        if (!title.length) return;
        const split = SplitText.create(title, { type: 'lines,words', mask: 'lines' });
        const tl = gsap
          .timeline({ paused: true, defaults: { ease: 'power3.out' } })
          .from(q('[data-heading-eyebrow]'), { opacity: 0, y: 16, duration: 0.6 })
          .from(split.words, { yPercent: 110, duration: 0.8, stagger: 0.05 }, 0.1)
          .from(q('[data-heading-sub]'), { opacity: 0, y: 20, duration: 0.7 }, 0.45);
        replayOnScroll(tl, group, 'top 85%');
      });
    });
    return () => mm.revert();
  });

  return null;
}
