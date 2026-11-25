import type { ReactNode } from 'react';

import AboutMotion from '@/components/motion/AboutMotion';
import Section from '@/components/ui/Section';
import { ABOUT_COPY } from '@/constants/copy';

/** 큰 문장 속 강조 말. 스크롤하면 회색에서 이 색(ink)으로 진해진다 */
function Em({ children }: { children: ReactNode }) {
  return (
    <span data-about-em className="font-extrabold text-ink">
      {children}
    </span>
  );
}

/** 모바일에서만 줄을 바꾼다 */
const MobileBreak = () => <br className="md:hidden" />;

/** 02 About. 당당이 하는 일을 한 문장으로, 아래에 숫자 3개 */
export default function AboutSection() {
  return (
    <Section
      id="about"
      aria-labelledby="about-title"
      className="pt-24 pb-20 md:pt-[140px] md:pb-[120px]"
    >
      <AboutMotion className="flex flex-col items-center text-center">
        <p className="rounded-full bg-yellow-50 px-4 py-[7px] font-display text-sm font-medium text-yellow-600">
          {ABOUT_COPY.label}
        </p>

        <h2
          id="about-title"
          className="mt-7 text-2xl leading-[1.45] font-semibold text-grey-400 md:text-[32px] xl:text-[38px]"
        >
          진단 뒤의 하루는 <MobileBreak />
          <Em>막막하지 않아야</Em> 해요.
          <br />
          당당은 <Em>병원에서 받은 기준</Em>을 <MobileBreak />
          <Em>하루 일정</Em>으로 바꿔
          <br />
          측정 · 기록 · 진료 준비가 <MobileBreak />
          <Em>끊기지 않게</Em> 도와요.
        </h2>

        <p className="mt-7 text-[15px] leading-[1.65] font-medium text-grey-600 md:text-base">
          {ABOUT_COPY.descriptionLines[0]} <br />
          {ABOUT_COPY.descriptionLines[1]} <br />
          {ABOUT_COPY.descriptionLines[2]}
        </p>

        <ul className="mt-16 grid w-full gap-8 md:mt-[88px] md:grid-cols-3 md:gap-4 md:text-left">
          {ABOUT_COPY.numbers.map((item, i) => (
            <li
              key={item.caption}
              className={
                i === 0
                  ? 'flex items-end justify-center gap-3 md:flex-col md:items-start md:gap-0'
                  : 'flex items-end justify-center gap-3 md:flex-col md:items-center md:gap-0'
              }
            >
              <span className="block overflow-hidden">
                <span
                  data-about-number
                  className="block font-display text-[88px] leading-none font-semibold text-yellow-200 md:text-[clamp(120px,14vw,200px)]"
                >
                  {item.value}
                </span>
              </span>
              <span className="pb-2 text-base font-medium text-grey-700 md:pb-0 md:text-lg">
                {item.caption}
              </span>
            </li>
          ))}
        </ul>
      </AboutMotion>
    </Section>
  );
}
