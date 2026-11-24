'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인은 여기서 한 번만 등록하고, 컴포넌트는 이 파일에서 가져다 쓴다
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** gsap.matchMedia()에 넘기는 조건. 모션 줄이기를 켠 사용자는 어느 쪽에도 해당하지 않는다 */
export const MOTION_QUERIES = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

export { gsap, ScrollTrigger, useGSAP };
