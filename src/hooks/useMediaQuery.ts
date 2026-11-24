'use client';

import { useSyncExternalStore } from 'react';

/**
 * 미디어 쿼리가 지금 맞는지 돌려준다. 서버 렌더링 때는 false.
 * @param query 예: '(min-width: 1024px)'
 */
export default function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
