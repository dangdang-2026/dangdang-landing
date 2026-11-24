import { MOTION_QUERIES, SplitText, gsap } from '@/animations/gsap';
import { setupHeroWordDesktop, setupHeroWordMobile } from '@/animations/heroWordAnimation';

/**
 * 히어로 애니메이션. PC와 모바일을 나누고, 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 * @param root HeroMotion 래퍼 (선택자는 이 안에서만 찾는다)
 */
export function setupHeroAnimation(root: HTMLElement) {
  const mm = gsap.matchMedia();
  const q = gsap.utils.selector(root);
  const word = q('[data-hero-word]')[0];

  mm.add(MOTION_QUERIES.desktop, () => {
    const title = SplitText.create(q('[data-hero-title]'), { type: 'words', mask: 'words' });
    const cleanupWord = setupHeroWordDesktop(root, word);

    // 1. 처음 들어왔을 때: 카피가 단어별로 올라오고, 폰과 카드가 차례로 나타난다
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from(title.words, { yPercent: 100, duration: 0.8, stagger: 0.06 }, 0.15)
      .from(q('[data-hero-line]'), { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.35)
      .from(q('[data-hero-phone]'), { opacity: 0, y: 120, duration: 1.1 }, 0.2)
      .from(
        q('[data-hero-card]'),
        { opacity: 0, scale: 0.9, y: 40, duration: 0.9, stagger: 0.12 },
        0.55
      );

    // 2. 카드가 제자리에서 천천히 떠 있다
    q('[data-hero-float]').forEach((card, i) => {
      gsap.to(card, { y: -8, duration: 2.4 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
    });

    // 3. 마우스를 따라 깊이(data-depth)만큼 다르게 움직인다
    const movers = q('[data-depth]').map((el) => ({
      depth: Number(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
    }));
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      movers.forEach((m) => {
        m.x(dx * 24 * m.depth);
        m.y(dy * 18 * m.depth);
      });
    };
    root.addEventListener('pointermove', onMove);

    // 4. 아래로 스크롤하면 카드가 서로 다른 속도로 위로 빠진다 (배경 글자는 heroWordAnimation)
    const scrollTrigger = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
    q('[data-hero-card]').forEach((card) => {
      const depth = Number(card.dataset.depth);
      gsap.to(card.firstElementChild, { yPercent: -60 * depth, ease: 'none', scrollTrigger });
    });

    return () => {
      root.removeEventListener('pointermove', onMove);
      cleanupWord();
    };
  });

  mm.add(MOTION_QUERIES.mobile, () => {
    setupHeroWordMobile(word);

    gsap
      .timeline({ defaults: { ease: 'power2.out' } })
      .from(q('[data-hero-title], [data-hero-line]'), {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
      })
      .from(q('[data-hero-phone]'), { opacity: 0, y: 60, duration: 0.8 }, 0.2)
      .from(q('[data-hero-card]'), { opacity: 0, y: 20, duration: 0.6 }, 0.5);

    q('[data-hero-float]').forEach((card) => {
      gsap.to(card, { y: -6, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
    });
  });

  return mm;
}
