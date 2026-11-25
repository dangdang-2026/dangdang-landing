import Image from 'next/image';

import logo from '@/assets/images/logo.svg';
import PromotionMotion from '@/components/motion/PromotionMotion';
import ReleaseNotice from '@/components/sections/promotion/ReleaseNotice';

/** 햇살 줄기 수 (360도를 나눔) */
const RAYS = 14;

/**
 * 09 Promotion · 출시 알림. 천천히 도는 햇살 배경 위에
 * 마우스를 따라 기우는 카드와 출시 알림 버튼을 둔다.
 * 아직 알림 신청 서버가 없어서, 버튼은 앱 시작 화면으로 보낸다.
 */
export default function PromotionSection() {
  return (
    <section
      id="promotion"
      aria-labelledby="promotion-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fff6e5_40%,#ffe7bd_75%,#fff6e5_100%)] pt-24 pb-28 md:pt-[110px] md:pb-[120px]"
    >
      <div
        data-promo-rays
        aria-hidden
        className="pointer-events-none absolute top-[62%] left-1/2 size-[1800px] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,#000_35%,transparent_70%)]"
      >
        {Array.from({ length: RAYS }, (_, i) => (
          <span
            key={i}
            className="absolute top-1/2 left-0 h-[46px] w-full -translate-y-1/2 bg-white/40"
            style={{ rotate: `${(180 / RAYS) * i}deg` }}
          />
        ))}
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute top-[62%] left-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.9),transparent)]"
      />

      <PromotionMotion className="relative flex flex-col items-center px-5 text-center">
        <p
          data-promo-line
          className="rounded-full bg-ink px-[18px] py-2 text-[13px] font-bold text-white md:text-sm"
        >
          COMING SOON · 곧 만나요
        </p>
        <h2
          id="promotion-title"
          className="mt-6 text-[36px] leading-[1.25] font-bold text-ink md:text-[60px]"
        >
          <span className="block overflow-hidden">
            <span data-promo-title className="block">
              출시되면
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-promo-title className="block">
              <span className="text-primary">가장 먼저</span> 알려 드릴게요
            </span>
          </span>
        </h2>
        <p data-promo-line className="mt-5 text-base font-medium text-grey-700 md:mt-6 md:text-lg">
          병원 기준대로 기록하는 당당,
          <br className="md:hidden" /> 지금 알림을 신청해 두세요.
        </p>

        <div
          data-promo-stage
          className="relative mt-14 h-[360px] w-[300px] [perspective:1200px] md:mt-16"
        >
          <span
            aria-hidden
            className="absolute top-6 -left-40 hidden h-[330px] w-[280px] rotate-12 rounded-[40px] bg-white/70 shadow-[0_20px_40px_rgba(191,128,0,0.08)] md:block"
          />
          <span
            aria-hidden
            className="absolute -top-4 -right-40 hidden h-[330px] w-[280px] -rotate-10 rounded-[40px] bg-white/70 shadow-[0_20px_40px_rgba(191,128,0,0.08)] md:block"
          />
          <div
            data-promo-card
            className="relative h-[350px] w-[300px] overflow-hidden rounded-[44px] border-4 border-white bg-[linear-gradient(90deg,#ffffff,#fff6e5)] shadow-[0_20px_40px_rgba(191,128,0,0.18),inset_0_-12px_24px_rgba(250,178,20,0.18)] [transform-style:preserve-3d]"
          >
            <Image
              src={logo}
              alt=""
              width={220}
              height={220}
              className="absolute top-[34px] left-1/2 size-[220px] -translate-x-1/2 rounded-[40px] shadow-[0_12px_28px_rgba(191,128,0,0.12)]"
            />
            <span className="absolute inset-x-0 bottom-9 text-[17px] font-bold text-ink">
              알림 받기 준비 완료!
            </span>
            <span
              data-promo-shine
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--shine-x,30%)_var(--shine-y,20%),rgb(255_255_255/0.65),transparent_45%)]"
            />
          </div>
        </div>

        <div data-promo-line className="mt-4">
          <ReleaseNotice />
        </div>
      </PromotionMotion>
    </section>
  );
}
