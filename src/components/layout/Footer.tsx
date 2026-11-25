import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo.svg';
import FooterWord from '@/components/layout/FooterWord';
import { FOOTER_GROUPS, FOOTER_LEGAL } from '@/constants/sections';
import { cn } from '@/lib/cn';

const isExternal = (href: string) => href.startsWith('http');

/**
 * 10 Footer. 토스 푸터 구조를 따른다:
 * 왼쪽 한 줄 소개, 오른쪽 링크 묶음, 아래 안내 문구와 약관, 바닥에 큰 브랜드 글자.
 * 색은 바로 위 출시 알림 섹션(연노랑)에서 이어지는 따뜻한 톤.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#fff6e5_0%,#fffbf3_45%,#ffffff_100%)] pt-20 md:pt-28">
      <div className="mx-auto max-w-content px-5 md:px-gutter">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <div>
            <Link
              href="/#hero"
              className="flex w-fit items-center gap-2.5"
              aria-label="당당 처음으로"
            >
              <Image src={logo} alt="" width={32} height={32} />
              <span className="text-xl font-bold text-ink">당당</span>
            </Link>
            <p className="mt-6 text-2xl leading-[1.45] font-bold text-ink md:text-[28px]">
              병원에서 받은 기준대로,
              <br />
              하루가 끊기지 않게.
            </p>
            <p className="mt-5 text-[13px] leading-[1.7] text-grey-500">
              당당은 의료기기가 아니며 진단이나 치료를 대신하지 않아요.
              <br />
              측정 기준과 처방은 담당 의료진의 안내를 따라 주세요.
              <br />몸 상태가 평소와 다르거나 걱정되면 바로 다니는 병원에 연락하세요.
            </p>
          </div>

          <nav
            aria-label="사이트 링크"
            className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-20"
          >
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-medium text-grey-500">{group.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}
                        className="text-[15px] font-semibold text-grey-800 transition-colors hover:text-yellow-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-grey-200 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-6">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-[13px] transition-colors hover:text-ink',
                    link.strong ? 'font-bold text-grey-700' : 'text-grey-500'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-display text-[13px] text-grey-400">
            © 2026 DANGDANG. All rights reserved.
          </p>
        </div>
      </div>

      <FooterWord />
    </footer>
  );
}
