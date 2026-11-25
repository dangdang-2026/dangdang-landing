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
        // 모서리·테두리를 폰 너비 비율로 잡아서 작게 줄여도 360px 원본과 같은 모양을 유지한다
        // (54px ÷ 360 × 756, 10px ÷ 360)
        'relative aspect-[360/756] w-[360px] rounded-[15%/7.14%] bg-ink p-[2.78%] shadow-[0_30px_60px_rgba(26,20,5,0.22)]',
        className
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[12.94%/5.98%] bg-white">
        {children}
      </div>
      <div className="absolute top-[2.75%] left-1/2 h-[3.6%] w-[27%] -translate-x-1/2 rounded-full bg-ink" />
    </div>
  );
}
