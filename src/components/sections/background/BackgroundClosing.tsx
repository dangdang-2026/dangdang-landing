import Image from 'next/image';

import characterBounce from '@/assets/images/character-bounce.svg';
import { cn } from '@/lib/cn';

/** 진료일 사이에 쌓이는 기록. at은 막대 위 위치(%) */
const RECORDS = [
  { at: 16, label: '공복', value: '88' },
  { at: 40, label: '점심 식후 1시간', value: '132' },
  { at: 64, label: '저녁 식후 1시간', value: '118' },
  { at: 86, label: '물어볼 것', value: '2개' },
] as const;

function VisitCard({
  label,
  date,
  align,
}: {
  label: string;
  date: string;
  align: 'start' | 'end';
}) {
  return (
    <span
      className={cn(
        'flex shrink-0 flex-col rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_12px_32px_rgba(25,31,40,0.08)] md:px-5 md:py-3.5',
        align === 'start' ? 'items-start text-left' : 'items-end text-right'
      )}
    >
      <span className="text-[11px] font-medium text-grey-500 md:text-[13px]">{label}</span>
      <span className="text-sm font-bold text-ink md:text-lg">{date}</span>
    </span>
  );
}

/**
 * Background 마지막 장면.
 * 진료일과 다음 진료일 사이 막대를 당당이가 걸어가며 노랗게 채우고, 지나간 자리마다 기록 카드가 쌓인다.
 * 이어서 문장 속 「빈칸」이 노랗게 차오른다.
 */
export default function BackgroundClosing() {
  return (
    <div
      data-bg-closing
      className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-5 text-center motion-reduce:relative motion-reduce:top-auto motion-reduce:mt-20 motion-reduce:translate-y-0"
    >
      <div
        aria-hidden
        data-bg-timeline
        className="flex w-[min(820px,100%)] items-center gap-3 md:gap-5"
      >
        <VisitCard label="진료" date="10월 1일" align="start" />

        <div className="relative h-2.5 flex-1 rounded-full bg-grey-100 md:h-3">
          <span
            data-bg-progress
            className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(90deg,var(--color-yellow-200),var(--color-primary))]"
          />

          <span
            data-bg-walker
            className="absolute bottom-full left-0 z-10 mb-1.5 w-max -translate-x-1/2 motion-reduce:left-full"
          >
            <Image
              data-bg-character
              src={characterBounce}
              alt=""
              width={88}
              height={116}
              className="h-auto w-10 max-w-none md:w-14"
            />
          </span>

          {RECORDS.map((record, i) => (
            <span
              key={record.label}
              data-bg-record
              style={{ left: `${record.at}%` }}
              className={cn(
                'absolute top-full mt-3 -translate-x-1/2 flex-col items-center rounded-xl bg-white px-2.5 py-1.5 whitespace-nowrap shadow-[0_8px_24px_rgba(25,31,40,0.08)] md:mt-4 md:px-3.5 md:py-2',
                i % 2 === 1 ? 'hidden md:flex' : 'flex'
              )}
            >
              <span className="text-[10px] font-medium text-grey-500 md:text-xs">
                {record.label}
              </span>
              <span className="text-xs font-bold text-ink md:text-[15px]">{record.value}</span>
            </span>
          ))}
        </div>

        <VisitCard label="다음 진료" date="10월 15일" align="end" />
      </div>

      <p className="mt-24 text-[30px] leading-[1.35] font-bold text-ink md:mt-28 md:text-[56px]">
        <span className="block overflow-hidden">
          <span data-bg-closing-line className="block">
            당당은 병원과 병원 사이,
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span data-bg-closing-line className="block">
            그{' '}
            <span className="relative inline-block rounded-2xl border-[3px] border-dashed border-grey-300 px-3 md:px-4">
              <span
                data-bg-blank-fill
                className="absolute inset-[-3px] origin-left rounded-2xl bg-yellow-300"
              />
              <span className="relative">빈칸</span>
            </span>
            을 채워요.
          </span>
        </span>
      </p>
    </div>
  );
}
