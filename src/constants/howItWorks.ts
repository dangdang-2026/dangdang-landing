import setupTiming from '@/assets/images/app-setup-measure-timing.png';
import measureTime from '@/assets/images/app-today-measure-time.png';
import visitReport from '@/assets/images/app-visit-report.png';

/** 04 How it works 문구 */
export const HOW_IT_WORKS_COPY = {
  eyebrow: 'HOW IT WORKS',
  title: '세 단계면\n오늘부터 시작해요',
} as const;

/** 단계별 문구와 폰 화면 */
export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: '병원에서 받은 식후 측정 시점을 등록해요',
    description: [
      '안내받은 대로 식후 1시간이나 2시간을 고르면,',
      '그 기준으로 하루 측정 일정을 만들어요.',
    ],
    screen: setupTiming,
    alt: '병원에서 식후 몇 시간에 재라고 안내받았는지 고르는 화면',
  },
  {
    number: '02',
    title: '측정할 때가 되면 알림으로 알려 드려요',
    description: [
      '식사 시작만 누르면 잴 시간을 계산해 알려 줘요.',
      '놓쳐도 10분 뒤에 다시 알려 드려요.',
    ],
    screen: measureTime,
    alt: '지금 재 주세요, 점심 식후 1시간 13시 10분을 알려 주는 화면',
  },
  {
    number: '03',
    title: '모인 기록은 진료 때 A4 한 장으로 보여 드려요',
    description: [
      '진료일 사이의 혈당과 물어볼 것을 한 장에 모아요.',
      '해석 없이 기록만 담아서 그대로 보여 주면 돼요.',
    ],
    screen: visitReport,
    alt: '진료 기간 혈당 기록을 시점별로 정리한 진료 리포트 화면',
  },
] as const;
