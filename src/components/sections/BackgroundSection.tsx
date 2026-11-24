import BackgroundMotion from '@/components/motion/BackgroundMotion';
import BackgroundClosing from '@/components/sections/background/BackgroundClosing';
import { BACKGROUND_COPY, BACKGROUND_TERMS } from '@/constants/background';
import { cn } from '@/lib/cn';

/**
 * 03 Background. 화면을 고정한 채 스크롤하면
 * 낯선 말들이 쏟아지고 → 혼자 해야 하는 일 → 당당이 채우는 빈칸 순서로 바뀐다.
 * 동작 줄이기 사용자는 고정 없이 세 장면을 차례로 쌓아 보여 준다(motion-reduce:).
 */
export default function BackgroundSection() {
  return (
    <section
      id="background"
      aria-labelledby="background-title"
      className="relative h-[420vh] motion-reduce:h-auto"
    >
      <BackgroundMotion className="sticky top-0 flex h-svh flex-col items-center overflow-hidden px-5 motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <div
          data-bg-glow
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[70vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(255_194_85/0.55),rgb(255_224_172/0.25)_55%,transparent)] md:w-[80vw]"
        />

        <div data-bg-head className="mt-[14vh] text-center motion-reduce:mt-0">
          <p className="font-display text-sm font-semibold tracking-[0.02em] text-yellow-600 md:text-base">
            {BACKGROUND_COPY.eyebrow}
          </p>
          <h2
            id="background-title"
            className="mt-3 text-2xl leading-[1.4] font-bold whitespace-pre-line text-ink md:mt-4 md:text-[40px]"
          >
            {BACKGROUND_COPY.title}
          </h2>
        </div>

        <ul
          data-bg-cloud
          aria-label="진단 후 자주 듣는 말"
          className="absolute top-[38vh] left-1/2 h-[34vh] w-[min(1100px,92vw)] -translate-x-1/2 motion-reduce:relative motion-reduce:top-auto motion-reduce:mt-12 motion-reduce:h-[320px]"
        >
          {BACKGROUND_TERMS.map((term) => (
            <li
              key={term.text}
              data-bg-term
              style={{ left: `${term.x}%`, top: `${term.y}%`, rotate: `${term.rotate}deg` }}
              className={cn(
                'absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-[#ffc255] bg-white/92 font-bold whitespace-nowrap shadow-[0_10px_24px_rgba(229,153,0,0.12)]',
                term.tone === 'strong'
                  ? 'px-4 py-2.5 text-lg text-ink md:px-7 md:py-4 md:text-[30px]'
                  : 'px-3.5 py-2 text-base text-[#f0a92a] md:px-6 md:py-3.5 md:text-2xl',
                !term.mobile && 'hidden md:block'
              )}
            >
              {term.text}
            </li>
          ))}
        </ul>

        <p
          data-bg-story
          className="absolute top-1/2 left-1/2 w-[min(640px,90vw)] -translate-x-1/2 -translate-y-1/2 text-center text-lg leading-[1.7] font-semibold text-ink motion-reduce:relative motion-reduce:top-auto motion-reduce:mt-16 motion-reduce:translate-y-0 md:text-[26px]"
        >
          {BACKGROUND_COPY.story.map((line) => (
            <span key={line} data-bg-story-line className="block">
              {line}
            </span>
          ))}
        </p>

        <BackgroundClosing />
      </BackgroundMotion>
    </section>
  );
}
