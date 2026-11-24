import { MOTION_QUERIES, gsap } from '@/animations/gsap';

/**
 * Background 스크롤 연출. 섹션(420vh)을 지나는 동안 고정된 화면에서 세 장면이 바뀐다.
 * 0~0.5 낯선 말 칩이 하나씩 튀어나옴 → 0.5~0.75 칩이 흐려지고 혼자 해야 하는 일 문장
 * → 0.75~1 「당당은 병원과 병원 사이, 그 빈칸을 채워요」
 * 모션 줄이기 사용자에게는 아무것도 하지 않는다 (CSS motion-reduce: 배치가 최종 상태).
 * @param root BackgroundMotion 래퍼 (sticky 화면)
 */
export function setupBackgroundAnimation(root: HTMLElement) {
  const mm = gsap.matchMedia();
  const q = gsap.utils.selector(root);
  const section = root.parentElement as HTMLElement;
  const motionQuery = `${MOTION_QUERIES.desktop}, ${MOTION_QUERIES.mobile}`;

  mm.add(motionQuery, () => {
    const terms = q('[data-bg-term]').filter((el) => el.offsetParent !== null);

    gsap.set(q('[data-bg-story-line]'), { opacity: 0, y: 24 });
    gsap.set(q('[data-bg-closing]'), { autoAlpha: 0 });
    gsap.set(q('[data-bg-closing-line]'), { yPercent: 110 });
    gsap.set(q('[data-bg-progress]'), { scaleX: 0 });
    gsap.set(q('[data-bg-record]'), { opacity: 0, y: -8, scale: 0.8 });
    gsap.set(q('[data-bg-blank-fill]'), { scaleX: 0 });
    gsap.set(q('[data-bg-walker]'), { left: '0%' });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
    });

    // 장면 1: 제목이 나오고, 낯선 말들이 하나씩 튀어나온다
    tl.from(q('[data-bg-head]'), { opacity: 0, y: 30, duration: 0.6 })
      .from(q('[data-bg-glow]'), { opacity: 0, scale: 0.6, duration: 2 }, 0)
      .from(
        terms,
        {
          opacity: 0,
          scale: 0.3,
          y: 60,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.35,
        },
        0.4
      )
      // 장면 2: 칩과 제목이 흐려지며 물러나고, 혼자 해야 하는 일이 나온다
      .to(q('[data-bg-head]'), { opacity: 0, y: -30, duration: 0.6 }, '+=0.6')
      .to(
        q('[data-bg-cloud]'),
        { opacity: 0.18, scale: 0.86, filter: 'blur(6px)', duration: 0.9 },
        '<'
      )
      .to(q('[data-bg-story-line]'), { opacity: 1, y: 0, duration: 0.5, stagger: 0.35 }, '<0.3')
      // 장면 3: 문장이 물러나고, 당당이 빈칸을 채운다
      .to(q('[data-bg-story-line]'), { opacity: 0, y: -24, duration: 0.5, stagger: 0.1 }, '+=0.9')
      .to(q('[data-bg-cloud]'), { opacity: 0, duration: 0.5 }, '<')
      .set(q('[data-bg-closing]'), { autoAlpha: 1 })
      .from(q('[data-bg-timeline]'), { opacity: 0, y: 30, duration: 0.5 })
      .to(q('[data-bg-closing-line]'), { yPercent: 0, duration: 0.6, stagger: 0.2 }, '<0.2')
      // 당당이가 진료일에서 다음 진료일까지 걸어가며 막대를 채우고, 지나간 자리에 기록이 쌓인다
      .addLabel('walk')
      .to(q('[data-bg-walker]'), { left: '100%', duration: 2 }, 'walk')
      .to(q('[data-bg-progress]'), { scaleX: 1, duration: 2 }, 'walk');
    q('[data-bg-record]').forEach((record) => {
      const at = parseFloat(record.style.left) / 100;
      tl.to(
        record,
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'back.out(3)' },
        `walk+=${at * 2}`
      );
    });
    tl
      // 문장 속 「빈칸」이 노랗게 차오른다
      .to(
        q('[data-bg-blank-fill]'),
        { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
        'walk+=1.8'
      )
      .to({}, { duration: 0.8 });

    // 당당이는 제자리에서 통통 튄다 (뽀용)
    gsap.to(q('[data-bg-character]'), {
      keyframes: [
        { scaleX: 1.08, scaleY: 0.9, duration: 0.18, ease: 'power1.out' },
        { scaleX: 0.95, scaleY: 1.06, y: -10, duration: 0.25, ease: 'power2.out' },
        { scaleX: 1, scaleY: 1, y: 0, duration: 0.3, ease: 'bounce.out' },
      ],
      repeat: -1,
      repeatDelay: 0.6,
      transformOrigin: '50% 100%',
    });
  });

  return mm;
}
