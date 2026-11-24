import type { ComponentPropsWithoutRef } from 'react';

import type { SectionId } from '@/constants/sections';
import { cn } from '@/lib/cn';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  id: SectionId;
  /** 화면에는 안 보이고 스크린 리더가 읽는 섹션 이름 (보이는 제목이 있으면 aria-labelledby를 쓴다) */
  label?: string;
}

/** 모든 랜딩 섹션의 바깥 틀. 가운데 정렬된 콘텐츠 폭과 좌우 여백을 맞춘다 */
export default function Section({ id, label, className, children, ...props }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={cn('relative w-full', className)} {...props}>
      <div className="mx-auto w-full max-w-content px-gutter">{children}</div>
    </section>
  );
}
