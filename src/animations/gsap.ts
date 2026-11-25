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
 * 등장 애니메이션을 위아래 어느 방향으로 스크롤해도 다시 쓰게 한다.
 * 내려오면서 start에 닿거나, 올라오면서 요소 아래쪽이 화면 위 20% 안으로 다시 들어오면 재생한다.
 * 요소가 화면 위나 아래로 완전히 빠졌을 때만 처음 상태로 되돌려서 읽던 내용이 눈앞에서 사라지지 않는다.
 * animation은 paused: true로 만들어서 넘긴다.
 */
export function replayOnScroll(
  animation: gsap.core.Animation,
  trigger: gsap.DOMTarget,
  start = 'top 78%'
) {
  const play = () => animation.play();
  const reset = () => animation.pause(0);
  ScrollTrigger.create({ trigger, start, end: 'bottom 20%', onEnter: play, onEnterBack: play });
  ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    onLeave: reset,
    onLeaveBack: reset,
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
