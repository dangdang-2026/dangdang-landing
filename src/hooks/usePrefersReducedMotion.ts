'use client';

import useMediaQuery from '@/hooks/useMediaQuery';

/** OS의 「동작 줄이기」 설정을 켰으면 true */
export default function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
