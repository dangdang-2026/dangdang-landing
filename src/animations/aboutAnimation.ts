import { MOTION_QUERIES, SplitText, gsap, replayOnScroll } from '@/animations/gsap';

/** 아직 채워지지 않은 글자의 색 (grey-200) */
const EMPTY = '#e5e8eb';

/**
 * About 애니메이션. 마크업 기본값이 최종 상태라서, 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 * @param root AboutMotion 래퍼
 */
export function setupAboutAnimation(root: HTMLElement) {
  const mm = gsap.matchMedia();
  const q = gsap.utils.selector(root);
  const motionQuery = `${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`;

  mm.add(motionQuery, () => {
    // 1. 큰 문장을 단어(줄바꿈 단위)와 글자로 나누고,
    //    스크롤하는 만큼 읽는 순서대로 연한 회색에서 원래 색(일반 글자는 회색, 강조는 검정)으로 채운다
    const title = q('#about-title')[0];
    const { chars } = SplitText.create(title, { type: 'words,chars' });
    gsap.from(chars, {
      color: EMPTY,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: title, start: 'top 85%', end: 'bottom 40%', scrub: 0.5 },
    });

    // 2. 숫자가 화면에 들어오면 아래에서 차례로 올라온다
    replayOnScroll(
      gsap.from(q('[data-about-number]'), {
        paused: true,
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.15,
      }),
      q('[data-about-number]')[0],
      'top 85%'
    );
  });

  return mm;
}
