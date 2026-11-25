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

    // 2. 숫자가 화면에 들어오면 아래에서 올라온다.
    // 숫자마다 따로 감지해서, 모바일처럼 세로로 쌓여 있으면 첫 숫자가 화면 밖으로 나가도
    // 아래 숫자는 남아 있다. PC처럼 한 줄에 놓이면 차례로 조금씩 늦게 올라온다.
    const numbers = q<HTMLElement>('[data-about-number]');
    numbers.forEach((number, i) => {
      const top = number.getBoundingClientRect().top;
      const rowIndex = numbers
        .slice(0, i)
        .filter((el) => el.getBoundingClientRect().top === top).length;
      replayOnScroll(
        gsap.from(number, {
          paused: true,
          yPercent: 100,
          duration: 1,
          ease: 'power4.out',
          delay: rowIndex * 0.15,
        }),
        number,
        'top 85%'
      );
    });
  });

  return mm;
}
