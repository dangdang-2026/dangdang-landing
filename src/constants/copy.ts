/** 히어로 문구 (Figma 01 Hero) */
export const HERO_COPY = {
  eyebrow: '임신성 당뇨 진단을 받은 임신부를 위한 기록 앱',
  titleLines: ['병원에서 받은 기준대로,', '하루가 끊기지 않게'],
  descriptionLines: ['측정할 때를 알려 주고, 기록을 모아', '진료 때 한 장으로 보여 드려요.'],
  primaryCta: { href: '#promotion', label: '출시 알림 받기' },
  secondaryCta: { href: '#how-it-works', label: '이용 방법 보기' },
} as const;

/** About 설명과 숫자 (Figma 02 About). 큰 문장은 강조 표시가 있어 AboutSection에 직접 둔다 */
export const ABOUT_COPY = {
  label: 'about',
  descriptionLines: [
    '당당은 진단이나 치료를 하지 않아요.',
    '담당 의료진이 정한 기준을 그대로 따르고,',
    '그 기준을 매일 지키기 쉽게 만드는 일에만 집중해요.',
  ],
  numbers: [
    { value: '3', caption: '단계면 바로 시작' },
    { value: '1', caption: '장으로 정리되는 진료 리포트' },
    { value: '1', caption: '장 사진으로 남기는 식사 기록' },
  ],
} as const;

/** 히어로에 떠 있는 정보 카드 */
export const HERO_CARDS = {
  today: { label: '오늘 기록', value: '식후 측정 3번', caption: '아침 · 점심 · 저녁' },
  next: { label: '다음 측정', value: '오후 1:30', caption: '점심 식후 1시간 · 알림 예약됨' },
  message: ['기록은 제가 모아 둘게요.', '진료 때 같이 봐요!'],
} as const;

/** 섹션 사이 흘러가는 띠 문구 */
export const MARQUEE_WORDS = {
  first: ['오늘도 당당하게', '병원 기준 그대로', '끊기지 않는 하루', '진료 땐 한 장으로'],
  second: ['식사 시작만 누르면', '잴 때를 알려 드려요', '기록은 당당이가', '진료 때 같이 봐요'],
} as const;
