import Image from 'next/image';

import body from '@/assets/images/character-hello-body.svg';
import face from '@/assets/images/character-hello-face.svg';

/** 당당이 원형 아바타 · 인사 표정 (Figma 컴포넌트 「당당이 / 아바타」, 40px) */
export default function CharacterAvatar() {
  return (
    <div className="relative size-10 shrink-0 overflow-clip rounded-full bg-yellow-50" aria-hidden>
      <div className="absolute inset-[-5.17%_-9.17%_-13.17%_-9.17%]">
        <div className="absolute inset-[13.33%_16.67%_14.2%_17.5%]">
          <Image src={body} alt="" fill unoptimized />
        </div>
        <Image
          src={face}
          alt=""
          width={47.34}
          height={47.34}
          unoptimized
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
}
