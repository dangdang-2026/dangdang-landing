import { MOTION_QUERIES, gsap } from '@/animations/gsap';

/**
 * Features 애니메이션. 기능마다 화면에 들어오면 글이 줄 단위로 올라오고,
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
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: feature, start: 'top 75%' },
        })
        .from(fq('[data-feature-line]'), { opacity: 0, y: 32, duration: 0.8, stagger: 0.12 })
        .from(fq('[data-feature-phone="0"]'), { opacity: 0, y: 80, duration: 1 }, 0.1)
        .from(
          fq('[data-feature-phone="1"]'),
          { opacity: 0, xPercent: -60, rotate: -6, duration: 1.1 },
          0.45
        );
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
