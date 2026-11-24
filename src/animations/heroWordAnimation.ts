import { SplitText, gsap } from '@/animations/gsap';

/** 마우스가 이 거리(px) 안에 들어오면 글자가 밀려난다 */
const PUSH_RADIUS = 220;
/** 가장 가까울 때 밀려나는 거리(px) */
const PUSH_STRENGTH = 46;

/**
 * PC용 배경 DANGDANG 글자 효과.
 * 들어올 때 하나씩 떨어지고, 마우스 근처 글자는 비켜나고, 클릭하면 튀어 오르고,
 * 히어로를 벗어나며 스크롤하면 무너져 내린다.
 * @returns 이벤트를 떼는 정리 함수 (gsap.matchMedia 안에서 호출)
 */
export function setupHeroWordDesktop(root: HTMLElement, word: HTMLElement) {
  const chars = SplitText.create(word, { type: 'chars' }).chars as HTMLElement[];

  // 1. 처음 들어올 때 위에서 하나씩 떨어져 통통 튄다
  gsap.from(chars, {
    yPercent: -120,
    rotation: () => gsap.utils.random(-25, 25),
    opacity: 0,
    duration: 1.1,
    ease: 'bounce.out',
    stagger: { each: 0.07, from: 'random' },
  });

  // 2. 마우스 근처 글자가 비켜났다가 돌아온다
  const pushers = chars.map((char) => ({
    char,
    x: gsap.quickTo(char, 'x', { duration: 0.6, ease: 'power3.out' }),
    y: gsap.quickTo(char, 'y', { duration: 0.6, ease: 'power3.out' }),
  }));
  // 움직인 뒤 좌표로 재면 글자가 떨리니, 글자의 원래 자리(offset) 기준으로 잰다
  const centerOf = (char: HTMLElement) => {
    const box = word.getBoundingClientRect();
    return {
      x: box.left + char.offsetLeft + char.offsetWidth / 2,
      y: box.top + char.offsetTop + char.offsetHeight / 2,
    };
  };
  const onMove = (event: PointerEvent) => {
    pushers.forEach(({ char, x, y }) => {
      const center = centerOf(char);
      const dx = center.x - event.clientX;
      const dy = center.y - event.clientY;
      const distance = Math.hypot(dx, dy) || 1;
      const force = Math.max(0, 1 - distance / PUSH_RADIUS) * PUSH_STRENGTH;
      x((dx / distance) * force);
      y((dy / distance) * force);
    });
  };
  const onLeave = () => pushers.forEach(({ x, y }) => (x(0), y(0)));

  // 3. 빈 곳을 클릭하면 가까운 글자가 튀어 올랐다 떨어진다 (링크·버튼 클릭은 무시)
  const onClick = (event: PointerEvent) => {
    if ((event.target as HTMLElement).closest('a, button')) return;
    chars.forEach((char) => {
      const center = centerOf(char);
      const distance = Math.hypot(center.x - event.clientX, center.y - event.clientY);
      if (distance > PUSH_RADIUS * 1.6) return;
      gsap
        .timeline()
        .to(char, {
          yPercent: -35,
          rotation: gsap.utils.random(-18, 18),
          duration: 0.25,
          ease: 'power2.out',
        })
        .to(char, { yPercent: 0, rotation: 0, duration: 0.9, ease: 'bounce.out' });
    });
  };

  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('pointerdown', onClick);

  // 4. 히어로를 벗어나며 스크롤하면 글자가 제각각 기울며 무너져 내린다
  gsap.to(chars, {
    yPercent: () => gsap.utils.random(140, 260),
    rotation: () => gsap.utils.random(-60, 60),
    opacity: 0,
    ease: 'power1.in',
    stagger: { each: 0.04, from: 'random' },
    scrollTrigger: { trigger: root, start: 'top top', end: '60% top', scrub: 0.6 },
  });

  return () => {
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('pointerdown', onClick);
  };
}

/** 모바일용: 들어올 때 글자가 위에서 하나씩 떨어지기만 한다 */
export function setupHeroWordMobile(word: HTMLElement) {
  const chars = SplitText.create(word, { type: 'chars' }).chars as HTMLElement[];
  gsap.from(chars, {
    yPercent: -100,
    opacity: 0,
    duration: 0.9,
    ease: 'bounce.out',
    stagger: { each: 0.06, from: 'random' },
  });
}
