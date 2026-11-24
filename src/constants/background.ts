/** 03 Background 문구 */
export const BACKGROUND_COPY = {
  eyebrow: 'BACKGROUND',
  title: '임신성 당뇨 진단을 받으면,\n이런 말을 많이 듣게 돼요',
  story: [
    '병원은 측정 시점과 목표 범위를 알려 줘요.',
    '그런데 끼니마다 시간을 맞춰 재고, 숫자를 적고,',
    '진료 때 보여 주는 일은 혼자 해내야 해요.',
  ],
  closing: ['당당은 병원과 병원 사이,', '그 빈칸을 채워요.'],
} as const;

interface Term {
  text: string;
  /** 칩 구름 상자 안 가로 위치 (%) */
  x: number;
  /** 칩 구름 상자 안 세로 위치 (%) */
  y: number;
  rotate: number;
  /** strong: 진한 글씨 큰 칩, soft: 연한 노란 글씨 작은 칩 */
  tone: 'strong' | 'soft';
  /** 모바일에서도 보여 줄지 */
  mobile: boolean;
}

/** 진단 직후 듣게 되는 말들. 등장 순서는 배열 순서 */
export const BACKGROUND_TERMS: Term[] = [
  { text: '공복 혈당', x: 50, y: 12, rotate: -4, tone: 'strong', mobile: true },
  { text: '식후 1시간', x: 24, y: 34, rotate: 8, tone: 'strong', mobile: true },
  { text: '혈당 기록지', x: 74, y: 30, rotate: 4, tone: 'soft', mobile: true },
  { text: '다음 진료일', x: 44, y: 62, rotate: 3, tone: 'strong', mobile: true },
  { text: '목표 범위', x: 14, y: 70, rotate: -6, tone: 'soft', mobile: true },
  { text: '탄수화물', x: 68, y: 70, rotate: -7, tone: 'strong', mobile: true },
  { text: '인슐린', x: 86, y: 58, rotate: 6, tone: 'soft', mobile: true },
  { text: '식후 2시간', x: 6, y: 22, rotate: -3, tone: 'soft', mobile: false },
  { text: '혈당 측정기', x: 92, y: 14, rotate: 9, tone: 'strong', mobile: false },
  { text: '간식', x: 32, y: 90, rotate: -9, tone: 'soft', mobile: false },
  { text: '측정 시간', x: 58, y: 40, rotate: -2, tone: 'soft', mobile: false },
  { text: '식단 조절', x: 88, y: 88, rotate: 5, tone: 'soft', mobile: false },
];
