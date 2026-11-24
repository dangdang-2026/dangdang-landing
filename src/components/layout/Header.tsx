import Image from 'next/image';

import logo from '@/assets/images/logo.svg';
import { NAV_ITEMS } from '@/constants/sections';

/** 히어로 카드 안쪽 맨 위 내비게이션 (Figma 01 Hero > Nav) */
export default function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center">
      <a href="#hero" className="flex w-fit items-center gap-2.5" aria-label="당당 처음으로">
        <Image src={logo} alt="" width={40} height={40} className="size-9 lg:size-10" />
        <span className="text-xl font-bold text-ink lg:text-[22px]">당당</span>
      </a>

      <nav aria-label="주요 메뉴" className="hidden lg:block">
        <ul className="flex gap-10 text-[15px] font-medium text-grey-800">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
