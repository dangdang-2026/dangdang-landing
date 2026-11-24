/** 페이지 섹션 순서 (Figma 「Landing · 당당 v2」 01~10). id는 메뉴 앵커로도 쓴다 */
export const SECTIONS = [
  { id: 'hero', label: '처음' },
  { id: 'about', label: '서비스 소개' },
  { id: 'background', label: '배경' },
  { id: 'how-it-works', label: '이용 방법' },
  { id: 'features', label: '주요 기능' },
  { id: 'trust', label: '신뢰' },
  { id: 'brand-story', label: '브랜드 스토리' },
  { id: 'faq', label: '자주 묻는 질문' },
  { id: 'promotion', label: '출시 알림' },
] as const;

/** 헤더 메뉴에 보이는 항목 (Figma 히어로 내비게이션) */
export const NAV_ITEMS = [
  { href: '#about', label: '서비스 소개' },
  { href: '#how-it-works', label: '이용 방법' },
  { href: '#features', label: '주요 기능' },
  { href: '#faq', label: '자주 묻는 질문' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/** 당당 앱 주소 */
export const APP_URL = 'https://dang-dang.site';

/** 푸터 링크 묶음 (토스 푸터처럼 제목 + 링크 목록) */
export const FOOTER_GROUPS = [
  {
    title: '서비스',
    links: [
      { href: '#about', label: '서비스 소개' },
      { href: '#how-it-works', label: '이용 방법' },
      { href: '#features', label: '주요 기능' },
      { href: '#faq', label: '자주 묻는 질문' },
    ],
  },
  {
    title: '당당 앱',
    links: [
      { href: `${APP_URL}/start`, label: '시작하기' },
      { href: `${APP_URL}/login`, label: '로그인' },
    ],
  },
  {
    title: '팀 이야기',
    links: [{ href: 'https://github.com/dangdang-2026', label: 'GitHub' }],
  },
] as const;

/** 푸터 아래 약관 링크 */
export const FOOTER_LEGAL = [
  { href: `${APP_URL}/legal/terms`, label: '이용약관', strong: false },
  { href: `${APP_URL}/legal/privacy`, label: '개인정보 처리방침', strong: true },
  { href: `${APP_URL}/legal/sensitive`, label: '민감정보 처리 안내', strong: false },
] as const;
