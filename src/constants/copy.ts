/** 히어로 문구 (Figma 01 Hero) */
export const HERO_COPY = {
  eyebrow: '임신성 당뇨 진단을 받은 임신부를 위한 기록 앱',
  titleLines: ['병원에서 받은 기준대로,', '하루가 끊기지 않게'],
  descriptionLines: ['측정할 때를 알려 주고, 기록을 모아', '진료 때 한 장으로 보여 드려요.'],
  primaryCta: { href: '#promotion', label: '출시 알림 받기' },
  secondaryCta: { href: '#how-it-works', label: '이용 방법 보기' },
} as const;

/** 히어로에 떠 있는 정보 카드 */
export const HERO_CARDS = {
  today: { label: '오늘 기록', value: '식후 측정 3번', caption: '아침 · 점심 · 저녁' },
  next: { label: '다음 측정', value: '오후 1:30', caption: '점심 식후 1시간 · 알림 예약됨' },
  message: ['기록은 제가 모아 둘게요.', '진료 때 같이 봐요!'],
} as const;
