import { MOTION_QUERIES, SplitText, gsap, replayOnScroll } from '@/animations/gsap';

/**
 * Features 애니메이션. 기능마다 화면에 들어오면 배지가 톡 튀어나오고,
 * 제목은 단어가 줄 아래에서 하나씩 솟아오르고, 설명은 줄 단위로 올라온다.
 * 첫 폰이 올라온 뒤 두 번째 폰이 첫 폰 뒤에서 미끄러져 나온다.
 * PC는 스크롤하는 동안 두 폰이 서로 다른 속도로 움직인다(패럴랙스).
 * 모션 줄이기 사용자에게는 아무것도 하지 않는다.
 */
export function setupFeaturesAnimation(root: HTMLElement) {
  const mm = gsap.matchMedia();
  const q = gsap.utils.selector(root);
  const motionQuery = `${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`;

  mm.add(motionQuery, () => {
    q('[data-feature]').forEach((feature) => {
      const fq = gsap.utils.selector(feature);
      const title = SplitText.create(fq('[data-feature-title]'), {
        type: 'lines,words',
        mask: 'lines',
      });
      const desc = SplitText.create(fq('[data-feature-desc]'), { type: 'lines', mask: 'lines' });
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .from(fq('[data-feature-badge]'), {
          opacity: 0,
          scale: 0.6,
          duration: 0.6,
          ease: 'back.out(2.2)',
        })
        .from(title.words, { yPercent: 110, duration: 0.8, stagger: 0.06 }, 0.15)
        .from(desc.lines, { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.5)
        .from(fq('[data-feature-phone="0"]'), { opacity: 0, y: 80, duration: 1 }, 0.1)
        .from(
          fq('[data-feature-phone="1"]'),
          { opacity: 0, xPercent: -60, rotate: -6, duration: 1.1 },
          0.45
        );
      replayOnScroll(tl, feature, 'top 75%');
    });
  });

  mm.add(MOTION_QUERIES.desktop, () => {
    q('[data-feature]').forEach((feature) => {
      const fq = gsap.utils.selector(feature);
      const scrollTrigger = {
        trigger: feature,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      };
      gsap.fromTo(
        fq('[data-feature-parallax="0"]'),
        { y: 40 },
        { y: -40, ease: 'none', scrollTrigger }
      );
      gsap.fromTo(
        fq('[data-feature-parallax="1"]'),
        { y: 90 },
        { y: -90, ease: 'none', scrollTrigger }
      );
    });
  });

  return mm;
}
