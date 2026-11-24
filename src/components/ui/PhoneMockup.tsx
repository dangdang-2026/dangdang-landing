import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/cn';

interface PhoneMockupProps {
  screen: StaticImageData;
  alt: string;
  /** 첫 화면에 보이는 이미지면 true (LCP 이미지라 먼저 받아 온다) */
  preload?: boolean;
  className?: string;
}

/** 검은 테두리 폰 안에 앱 화면 이미지를 넣는다 (Figma Phone 360 × 756) */
export default function PhoneMockup({ screen, alt, preload, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        'relative aspect-[360/756] w-[360px] rounded-[54px] bg-ink p-2.5 shadow-[0_30px_60px_rgba(26,20,5,0.22)]',
        className
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[44px] bg-white">
        <Image
          src={screen}
          alt={alt}
          preload={preload}
          sizes="(min-width: 1024px) 340px, 70vw"
          className="w-full"
        />
      </div>
      <div className="absolute top-[2.75%] left-1/2 h-[3.6%] w-[27%] -translate-x-1/2 rounded-full bg-ink" />
    </div>
  );
}
