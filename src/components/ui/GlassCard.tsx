import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/** 히어로 배경 위에 떠 있는 반투명 카드 (흐림 12px, 흰 테두리) */
export default function GlassCard({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'rounded-[22px] border border-white/90 bg-white/95 px-[22px] pt-[18px] pb-5 shadow-[0_12px_32px_rgba(25,31,40,0.08)] xl:bg-white/55 xl:backdrop-blur-md',
        className
      )}
      {...props}
    />
  );
}
