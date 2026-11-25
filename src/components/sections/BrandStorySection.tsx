import type { ReactNode } from 'react';

import Image from 'next/image';

import characterBounce from '@/assets/images/character-bounce.svg';
import BrandStoryMotion from '@/components/motion/BrandStoryMotion';

function StoryCard({
  order,
  number,
  title,
  visual,
  lines,
  note,
}: {
  /** 위 카드가 아래 카드 앞에 오도록 쓰는 순서 (위로 스크롤해 다시 올라올 때 덮이지 않게) */
  order: number;
  number: string;
  title: string;
  visual: ReactNode;
  lines: string[];
  note?: string[];
}) {
  return (
    <li
      data-story-card
      style={{ zIndex: 3 - order }}
      className="flex flex-col gap-5 rounded-[32px] bg-grey-50 px-6 pt-6 pb-8 md:gap-[22px] md:px-7 md:pt-7 md:pb-9"
    >
      <div className="relative h-[220px] overflow-hidden rounded-3xl bg-yellow-50 md:h-[240px]">
        {visual}
      </div>
      <p className="flex items-center gap-2.5">
        <span className="font-display text-[15px] font-bold text-primary">{number}</span>
        <span className="text-xl font-bold text-ink md:text-[22px]">{title}</span>
      </p>
      <p className="text-[15px] leading-[1.75] font-medium text-grey-700 md:text-base">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      {note && (
        <p className="w-fit rounded-xl bg-white px-3.5 py-2.5 text-[13px] leading-[1.6] font-medium text-grey-600">
          {note.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
    </li>
  );
}

/** 07 Brand Story. 이름(糖+堂), 캐릭터(걷는 D), 색(앰버)에 담은 이유 */
export default function BrandStorySection() {
  return (
    <section
      id="brand-story"
      aria-labelledby="brand-story-title"
      className="py-24 md:pt-[120px] md:pb-[140px]"
    >
      <BrandStoryMotion className="mx-auto max-w-content px-5 md:px-gutter">
        <div data-heading-group>
          <p
            data-heading-eyebrow
            className="font-display text-sm font-semibold tracking-[0.02em] text-yellow-600 md:text-base"
          >
            BRAND STORY
          </p>
          <h2
            id="brand-story-title"
            data-heading-title
            className="mt-3 text-[28px] leading-[1.4] font-bold text-ink md:mt-4 md:text-[38px]"
          >
            당당이라는 이름에서
            <br />
            모든 디자인이 시작됐어요
          </h2>
          <p
            data-heading-sub
            className="mt-3 text-base font-medium text-grey-600 md:mt-4 md:text-[17px]"
          >
            이름에도, 캐릭터에도, 색에도 이유가 있어요.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:mt-14 lg:grid-cols-3 lg:gap-6">
          <StoryCard
            order={0}
            number="01"
            title="糖 + 堂 = 당당"
            lines={[
              '혈당의 糖(당)과',
              '매일 돌아와 기록하는 자리 堂(당)을 겹쳤어요.',
              '진단을 받아도 위축되지 않고',
              "병원 기준대로 '당당하게' 관리하자는 뜻이에요.",
            ]}
            visual={
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <span data-hanja="left" className="flex flex-col items-center">
                  <span className="text-[96px] leading-none font-black text-primary">糖</span>
                  <span className="mt-3 text-sm font-bold text-grey-500">혈당</span>
                </span>
                <span data-hanja-plus className="text-3xl font-bold text-yellow-300">
                  +
                </span>
                <span data-hanja="right" className="flex flex-col items-center">
                  <span className="text-[96px] leading-none font-black text-primary">堂</span>
                  <span className="mt-3 text-sm font-bold text-grey-500">머무는 자리</span>
                </span>
              </div>
            }
          />
          <StoryCard
            order={1}
            number="02"
            title="걷는 D"
            lines={[
              'dangdang의 D에 눈과 다리를 붙였어요.',
              "걷는 모습에 '당당함'과",
              '끊기지 않고 이어지는 하루를 담았어요.',
            ]}
            note={['혈당 숫자로 표정을 바꾸지 않아요.', '기록한 행동에만 반응해요.']}
            visual={
              <>
                <span className="absolute inset-x-0 bottom-10 h-px bg-[repeating-linear-gradient(90deg,var(--color-yellow-300)_0_8px,transparent_8px_16px)]" />
                <span data-story-walker className="absolute bottom-10 left-1/2 -translate-x-1/2">
                  <Image
                    data-story-character
                    src={characterBounce}
                    alt=""
                    width={88}
                    height={116}
                    className="h-auto w-24 max-w-none"
                  />
                </span>
              </>
            }
          />
          <StoryCard
            order={2}
            number="03"
            title="포인트에만 앰버"
            lines={['앰버는 버튼과 꼭 봐야 할 순간에만 써서', '기록 화면이 차분해요.']}
            note={['혈당 결과는 색만으로 알리지 않아요.', '아이콘과 문구를 함께 보여 줘요.']}
            visual={
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative h-[130px] w-[250px]">
                  <span
                    data-amber-dot
                    className="absolute top-1/2 left-0 size-20 -translate-y-1/2 rounded-full bg-yellow-200"
                  />
                  <span
                    data-amber-dot
                    className="absolute top-1/2 right-0 size-20 -translate-y-1/2 rounded-full bg-yellow-600"
                  />
                  <span
                    data-amber-dot
                    className="absolute top-0 left-1/2 size-[130px] -translate-x-1/2 rounded-full bg-primary shadow-[0_16px_40px_rgba(251,179,21,0.45)]"
                  />
                </div>
                <span className="mt-4 font-display text-[15px] font-bold text-ink">#FBB315</span>
              </div>
            }
          />
        </ul>
      </BrandStoryMotion>
    </section>
  );
}
