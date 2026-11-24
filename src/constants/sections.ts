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
