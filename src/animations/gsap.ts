'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// GSAP 플러그인은 여기서 한 번만 등록하고, 컴포넌트는 이 파일에서 가져다 쓴다
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** gsap.matchMedia()에 넘기는 조건. 모션 줄이기를 켠 사용자는 어느 쪽에도 해당하지 않는다 */
export const MOTION_QUERIES = {
  desktop: '(min-width: 1280px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1279px) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

/**
 * 등장 애니메이션을 스크롤 방향에 맞춰 다시 쓰게 한다.
 * 내려와서 start에 닿으면 재생하고, 위로 올라가 요소가 화면 아래로 완전히 빠지면 처음 상태로 되돌린다.
 * 화면 밖에서 되돌리니 읽던 내용이 눈앞에서 사라지지 않고, 다시 내려오면 처음부터 다시 나온다.
 * animation은 paused: true로 만들어서 넘긴다.
 */
export function replayOnScroll(
  animation: gsap.core.Animation,
  trigger: gsap.DOMTarget,
  start = 'top 78%'
) {
  ScrollTrigger.create({ trigger, start, onEnter: () => animation.play() });
  ScrollTrigger.create({ trigger, start: 'top bottom', onLeaveBack: () => animation.pause(0) });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
