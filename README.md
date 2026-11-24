# dangdang-landing

임신성 당뇨 기록 앱 당당의 서비스 소개 랜딩페이지입니다. 배포 주소는 https://about-dangdang.vercel.app 입니다.

## 시작하기

Node.js 20.9 이상이 필요합니다.

```bash
npm ci
npm run dev   # http://localhost:3000
```

## 명령어

| 명령어                 | 하는 일                       |
| ---------------------- | ----------------------------- |
| `npm run dev`          | 개발 서버                     |
| `npm run build`        | 배포용 빌드                   |
| `npm run lint`         | ESLint 검사                   |
| `npm run format`       | Prettier로 전체 정리          |
| `npm run format:check` | 정리 안 된 파일이 있는지 확인 |
| `npm run typecheck`    | 타입 검사                     |

커밋하면 husky와 lint-staged가 바뀐 파일만 ESLint, Prettier로 정리합니다. PR을 올리면 GitHub Actions에서 lint, format, typecheck, build를 한 번 더 돌립니다.

## 기술

- Next.js App Router, TypeScript, Tailwind CSS v4
- 스크롤 연출은 GSAP ScrollTrigger, 부드러운 스크롤은 Lenis, 요소 등장과 호버는 Motion
- 글꼴은 Pretendard Variable(dynamic subset)

## 폴더 구조

```
src/
├── app/                  # layout, page, globals.css(디자인 토큰)
├── animations/           # GSAP 플러그인 등록, 섹션별 타임라인
├── components/
│   ├── sections/         # 페이지 섹션 (XxxSection.tsx)
│   ├── layout/           # Header, Footer
│   ├── ui/               # 공용 부품 (Section, Button 등)
│   ├── motion/           # Motion 래퍼 (FadeIn 등)
│   └── providers/        # SmoothScrollProvider
├── constants/            # 문구, 섹션 목록
├── hooks/                # useMediaQuery, usePrefersReducedMotion
├── lib/                  # cn
└── assets/               # images, lottie
```

## 코드 규칙

- 컴포넌트는 `export default function HeroSection()`처럼 쓰고, props 타입은 `interface XxxProps`로 둡니다. 파일 하나는 200줄을 넘기지 않습니다.
- 컴포넌트 파일은 `PascalCase.tsx`, 훅은 `useXxx.ts`, 상수는 `UPPER_SNAKE`로 씁니다.
- GSAP, Motion, Lenis처럼 브라우저에서 움직이는 코드는 파일 맨 위에 `'use client'`를 붙입니다.
- GSAP는 `@/animations/gsap`에서만 가져옵니다. `useGSAP` 안에서 `gsap.matchMedia()`로 PC, 모바일, 모션 줄이기를 나눕니다.
- 모션 줄이기를 켠 사용자에게는 애니메이션 없이 최종 상태를 바로 보여 줍니다.
- 색과 간격은 `globals.css`의 `@theme` 토큰(`bg-primary`, `text-ink` 등)만 씁니다.

## 협업

- 브랜치는 `feature/이슈번호-설명`으로 만들고 `develop`에 Squash merge합니다. `develop`에서 `main`으로는 merge commit을 씁니다.
- 커밋은 `✨ Feat: 내용` 형식이고, 타입은 Feat, Fix, Design, Refactor, Settings, Docs 등을 씁니다.
