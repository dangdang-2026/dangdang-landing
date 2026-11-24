'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { ScrollTrigger, gsap, useGSAP } from '@/animations/gsap';
import logo from '@/assets/images/logo.svg';
import { NAV_ITEMS } from '@/constants/sections';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';

/**
 * 맨 위 스크롤 진행 막대 + 히어로를 지나면 위에서 내려오는 떠 있는 메뉴.
 * 지금 보고 있는 섹션의 메뉴에 노란 알약이 미끄러져 따라간다.
 */
export default function FloatingNav() {
  const bar = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: ({ progress }) => gsap.set(bar.current, { scaleX: progress }),
      }),
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 60%',
        endTrigger: '#promotion',
        end: 'top 40%',
        onToggle: ({ isActive }) => setVisible(isActive),
      })
    );

    NAV_ITEMS.forEach((item) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: item.href,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: ({ isActive }) => isActive && setCurrent(item.href),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  });

  return (
    <>
      <div
        ref={bar}
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-yellow-300),var(--color-primary))]"
      />
      <nav
        aria-label="빠른 메뉴"
        className={cn(
          'fixed top-4 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-white/80 p-1.5 shadow-[0_12px_32px_rgba(25,31,40,0.1)] backdrop-blur-md md:flex',
          !reducedMotion && 'transition-[translate,opacity] duration-500 ease-out',
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-[150%] opacity-0'
        )}
      >
        <a href="#hero" className="grid size-9 place-items-center" aria-label="당당 처음으로">
          <Image src={logo} alt="" width={28} height={28} />
        </a>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={current === item.href ? 'location' : undefined}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300',
              current === item.href
                ? 'bg-yellow-50 text-yellow-600'
                : 'text-grey-600 hover:text-ink'
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
