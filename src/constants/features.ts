import photoCamera from '@/assets/images/app-photo-camera.png';
import photoFoodResult from '@/assets/images/app-photo-food-result.png';
import todayBeforeMeal from '@/assets/images/app-today-before-meal.png';
import todaySaved from '@/assets/images/app-today-saved.png';
import visitQuestions from '@/assets/images/app-visit-questions.png';
import visitReport from '@/assets/images/app-visit-report.png';

/** 05 Features 문구 */
export const FEATURES_COPY = {
  eyebrow: 'FEATURES',
  title: '필요한 순간에\n필요한 것만 보여 줘요',
} as const;

/** 기능 3개. 기능마다 폰 두 대로 전과 후를 보여 준다 */
export const FEATURES = [
  {
    label: '오늘',
    title: '지금 할 일 하나만,\n오늘 화면 맨 위에 보여 줘요',
    description: [
      "식사 전이면 '식사 시작', 측정할 때면 '혈당 입력'.",
      '시간에 따라 첫 카드가 바뀌어서',
      '무엇을 할지 고민하지 않아도 돼요.',
    ],
    screens: [
      {
        chip: '식사 전',
        src: todayBeforeMeal,
        alt: '식사 전 오늘 화면, 저녁 드실 때 눌러 달라는 카드',
      },
      { chip: '저장 직후', src: todaySaved, alt: '혈당을 저장한 직후 오늘 화면' },
    ],
  },
  {
    label: '식사 기록',
    title: '사진 한 장이면\n먹은 음식 후보를 찾아 줘요',
    description: [
      '사진을 찍으면 AI가 음식 후보를 보여 주고,',
      '맞는지 직접 확인한 뒤에 저장돼요.',
      '사진 없이 이름으로 적어도 괜찮아요.',
    ],
    screens: [
      { chip: '사진 찍기', src: photoCamera, alt: '음식만 네모 안에 담아 달라는 사진 찍기 화면' },
      {
        chip: '찾은 결과',
        src: photoFoodResult,
        alt: '사진에서 잡곡밥, 된장국, 계란말이를 찾은 화면',
      },
    ],
  },
  {
    label: '진료',
    title: '진료 날엔 기록과 물어볼 것을\n한 장에 모아 가요',
    description: [
      '혈당과 식사 기록을 A4 한 장 리포트로 정리하고,',
      '사진으로 저장해 진료 때 바로 보여 줘요.',
      '물어볼 것도 미리 적어 둘 수 있어요.',
    ],
    screens: [
      { chip: '물어볼 것', src: visitQuestions, alt: '다음 진료와 물어볼 것 2개를 적어 둔 화면' },
      {
        chip: '진료 리포트',
        src: visitReport,
        alt: '진료 기간 혈당 기록을 한 장으로 정리한 리포트',
      },
    ],
  },
] as const;
