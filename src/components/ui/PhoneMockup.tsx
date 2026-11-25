import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface PhoneMockupProps {
  /** 화면 안에 들어갈 내용 (앱 화면 이미지 등) */
  children: ReactNode;
  className?: string;
}

/** 검은 테두리 폰 틀. 안쪽 화면 영역에 children을 넣는다 (Figma Phone 360 × 756) */
export default function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        'relative aspect-[360/756] w-[360px] rounded-[54px] bg-ink p-2.5 shadow-[0_30px_60px_rgba(26,20,5,0.22)]',
        className
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[44px] bg-white">{children}</div>
      <div className="absolute top-[2.75%] left-1/2 h-[3.6%] w-[27%] -translate-x-1/2 rounded-full bg-ink" />
    </div>
  );
}
