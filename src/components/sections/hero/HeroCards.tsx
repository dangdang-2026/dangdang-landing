import CharacterAvatar from '@/components/ui/CharacterAvatar';
import GlassCard from '@/components/ui/GlassCard';
import { HERO_CARDS } from '@/constants/copy';

const { today, next, message } = HERO_CARDS;

/**
 * 히어로에 떠 있는 카드 3개. data-depth가 클수록 마우스·스크롤에 크게 움직인다.
 * 좁은 화면에서는 폰 무대 기준으로, xl에서는 히어로 기준(Figma 좌표 비율)으로 놓인다.
 */
export default function HeroCards() {
  return (
    <>
      <div
        data-hero-card
        data-depth="1"
        className="absolute top-24 -left-36 hidden w-[200px] md:block xl:top-[230px] xl:left-[10.78%] xl:w-[230px]"
      >
        <GlassCard data-hero-float className="flex flex-col gap-1.5">
          <p className="text-[13px] font-medium text-grey-700">{today.label}</p>
          <p className="text-xl font-bold text-ink xl:text-2xl">{today.value}</p>
          <p className="text-[13px] text-grey-700">{today.caption}</p>
        </GlassCard>
      </div>

      <div
        data-hero-card
        data-depth="1.4"
        className="absolute top-40 -right-10 w-[180px] md:-right-40 md:w-[210px] xl:top-[250px] xl:right-auto xl:left-[72.56%] xl:w-[250px]"
      >
        <GlassCard
          data-hero-float
          className="flex flex-col gap-1 px-4 pt-3.5 pb-4 xl:gap-1.5 xl:px-[22px] xl:pt-[18px] xl:pb-5"
        >
          <p className="text-xs font-medium text-grey-700 xl:text-[13px]">{next.label}</p>
          <p className="text-xl font-bold text-ink xl:text-[28px]">{next.value}</p>
          <p className="text-xs text-grey-700 xl:text-[13px]">{next.caption}</p>
        </GlassCard>
      </div>

      <div
        data-hero-card
        data-depth="0.8"
        className="absolute top-[470px] left-[68.97%] hidden xl:block"
      >
        <GlassCard data-hero-float className="flex h-[100px] items-center gap-3">
          <CharacterAvatar />
          <p className="text-sm leading-[1.5] font-medium whitespace-nowrap text-grey-700">
            {message[0]}
            <br />
            {message[1]}
          </p>
        </GlassCard>
      </div>
    </>
  );
}
