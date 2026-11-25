'use client';

import { useEffect, useRef } from 'react';

import Image from 'next/image';

import characterBounce from '@/assets/images/character-bounce.svg';
import MagneticButton from '@/components/ui/MagneticButton';
import { RELEASE_NOTICE } from '@/constants/copy';
import { APP_URL } from '@/constants/sections';

/**
 * 출시 알림 받기 버튼과 「졸업 전시에서 만나요」 모달.
 * 알림 신청 서버가 없어서 신청 대신 졸업 작품이라는 걸 알려 준다.
 * 네이티브 dialog라서 포커스 가두기, Esc 닫기, 닫힌 뒤 버튼으로 포커스 돌아가기는 브라우저가 한다.
 */
export default function ReleaseNotice() {
  const dialog = useRef<HTMLDialogElement>(null);

  // closedby="any"를 모르는 브라우저(Safari)에서도 바깥을 누르면 닫히게 한다
  useEffect(() => {
    const el = dialog.current;
    if (!el || 'closedBy' in HTMLDialogElement.prototype) return;
    const outside = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };
    let pressedOutside = false;
    const onDown = (event: PointerEvent) => {
      pressedOutside = outside(event);
    };
    const onUp = (event: PointerEvent) => {
      if (pressedOutside && outside(event)) el.close();
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <>
      <MagneticButton
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="rounded-full bg-primary px-14 py-5 text-lg font-bold text-white shadow-[0_20px_40px_rgba(191,128,0,0.25)] md:px-16 md:py-6 md:text-[22px]"
      >
        출시 알림 받기
      </MagneticButton>

      <dialog
        ref={dialog}
        aria-labelledby="release-title"
        data-lenis-prevent
        {...({ closedby: 'any' } as object)}
        className="release-dialog m-auto w-[min(400px,calc(100vw-40px))] overflow-visible rounded-[32px] bg-white px-7 pt-20 pb-7 text-center shadow-[0_30px_80px_rgba(25,31,40,0.18)] md:px-9 md:pb-9"
      >
        {/* 모달 위로 반쯤 걸쳐서 튀는 캐릭터 */}
        <span
          aria-hidden
          className="absolute -top-20 left-1/2 flex size-36 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-yellow-50 shadow-[0_12px_28px_rgba(191,128,0,0.18)] ring-8 ring-white"
        >
          {/* 그림 아래쪽에 캐릭터가 있어서 원 가운데로 올려 준다 */}
          <span className="-translate-y-7">
            <Image src={characterBounce} alt="" className="release-bounce h-36 w-auto max-w-none" />
          </span>
        </span>

        <form method="dialog" className="absolute top-4 right-4">
          <button
            aria-label="닫기"
            className="flex size-9 cursor-pointer items-center justify-center rounded-full text-grey-500 transition-colors hover:bg-grey-100 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>

        <p className="mt-4 inline-block rounded-full bg-yellow-50 px-3 py-1 text-[13px] font-bold text-yellow-600">
          {RELEASE_NOTICE.badge}
        </p>
        <h1 id="release-title" className="mt-3 text-[26px] leading-[1.35] font-bold text-ink">
          {RELEASE_NOTICE.title}
        </h1>
        <p className="mt-3 text-[15px] leading-[1.7] text-grey-700">
          {RELEASE_NOTICE.bodyLines[0]}
          <br />
          {RELEASE_NOTICE.bodyLines[1]}
        </p>

        <form method="dialog" className="mt-7">
          <button
            autoFocus
            className="w-full cursor-pointer rounded-2xl bg-ink py-4 text-base font-bold text-white transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-yellow-300"
          >
            {RELEASE_NOTICE.confirm}
          </button>
        </form>
        <a
          href={`${APP_URL}/start`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-grey-600 underline-offset-4 hover:text-ink hover:underline"
        >
          {RELEASE_NOTICE.appLink} ›
        </a>
      </dialog>
    </>
  );
}
