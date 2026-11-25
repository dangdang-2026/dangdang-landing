'use client';

import { type ComponentPropsWithoutRef, type MouseEvent, type RefObject, useRef } from 'react';

import { MOTION_QUERIES, gsap, useGSAP } from '@/animations/gsap';
import { cn } from '@/lib/cn';

const SPARK_COLORS = ['#fbb315', '#ffd184', '#e39a01', '#191f28', '#ffe0ac'];

type LinkProps = ComponentPropsWithoutRef<'a'> & { href: string };
type ButtonProps = ComponentPropsWithoutRef<'button'> & { href?: never };
type MagneticButtonProps = LinkProps | ButtonProps;

/**
 * 마우스에 끌려오고(마그넷), 빛이 한 번씩 지나가고(shine), 누르면 반짝이가 터지는 버튼.
 * href가 있으면 링크(a), 없으면 모달 같은 걸 여는 버튼(button)이 된다. 모션 줄이기 사용자에게는 일반 버튼처럼 동작한다.
 */
export default function MagneticButton(props: MagneticButtonProps) {
  const wrap = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = button.current;
      const box = wrap.current;
      if (!el || !box) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.desktop, () => {
        const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        const onMove = (event: PointerEvent) => {
          const rect = box.getBoundingClientRect();
          x((event.clientX - (rect.left + rect.width / 2)) * 0.35);
          y((event.clientY - (rect.top + rect.height / 2)) * 0.45);
        };
        const onLeave = () => {
          x(0);
          y(0);
        };
        box.addEventListener('pointermove', onMove);
        box.addEventListener('pointerleave', onLeave);
        return () => {
          box.removeEventListener('pointermove', onMove);
          box.removeEventListener('pointerleave', onLeave);
        };
      });

      mm.add(`${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`, () => {
        gsap.fromTo(
          el.querySelector('[data-shine]'),
          { xPercent: -160 },
          { xPercent: 260, duration: 1.1, ease: 'power2.inOut', repeat: -1, repeatDelay: 2.2 }
        );
      });

      return () => mm.revert();
    },
    { scope: wrap }
  );

  // 누르는 순간 버튼 둘레로 반짝이가 터진다 (새 탭으로 이동은 그대로)
  const burst = () => {
    const box = wrap.current;
    if (!box || window.matchMedia(MOTION_QUERIES.reduced).matches) return;
    for (let i = 0; i < 18; i += 1) {
      const dot = document.createElement('span');
      const size = gsap.utils.random(6, 12);
      Object.assign(dot.style, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: i % 3 === 0 ? '2px' : '999px',
        background: SPARK_COLORS[i % SPARK_COLORS.length],
        pointerEvents: 'none',
      });
      box.appendChild(dot);
      const angle = (Math.PI * 2 * i) / 18;
      const distance = gsap.utils.random(90, 170);
      gsap.fromTo(
        dot,
        { xPercent: -50, yPercent: -50, scale: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.6,
          rotate: gsap.utils.random(-180, 180),
          scale: 0,
          duration: gsap.utils.random(0.7, 1.1),
          ease: 'power3.out',
          onComplete: () => dot.remove(),
        }
      );
    }
  };

  const inner = (
    <>
      <span
        data-shine
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.55),transparent)] motion-reduce:hidden"
      />
      <span className="relative">{props.children}</span>
    </>
  );

  return (
    <span ref={wrap} className="relative inline-flex p-6">
      {typeof props.href === 'string' ? (
        <LinkInner {...(props as LinkProps)} burst={burst} buttonRef={button}>
          {inner}
        </LinkInner>
      ) : (
        <ButtonInner {...(props as ButtonProps)} burst={burst} buttonRef={button}>
          {inner}
        </ButtonInner>
      )}
    </span>
  );
}

interface InnerExtra {
  burst: () => void;
  buttonRef: RefObject<HTMLElement | null>;
}

function ButtonInner({
  burst,
  buttonRef,
  className,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps & InnerExtra) {
  return (
    <button
      ref={buttonRef as RefObject<HTMLButtonElement>}
      type={type}
      className={cn('relative cursor-pointer overflow-hidden', className)}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        burst();
        onClick?.(event);
      }}
      {...rest}
    />
  );
}

function LinkInner({ burst, buttonRef, className, onClick, ...rest }: LinkProps & InnerExtra) {
  return (
    <a
      ref={buttonRef as RefObject<HTMLAnchorElement>}
      className={cn('relative overflow-hidden', className)}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        burst();
        onClick?.(event);
      }}
      {...rest}
    />
  );
}
