import photoFoodResult from '@/assets/images/app-photo-food-result.png';
import todayBeforeMeal from '@/assets/images/app-today-before-meal.png';
import todayMeasureTime from '@/assets/images/app-today-measure-time.png';
import visitReport from '@/assets/images/app-visit-report.png';

/** 히어로 폰 안에서 차례로 보여 줄 앱 화면 (하루 흐름 순서) */
export const HERO_SCREENS = [
  {
    src: todayBeforeMeal,
    label: '오늘',
    alt: '당당 앱 오늘 화면. 저녁 드실 때 눌러 달라는 카드와 오늘 혈당 기록',
  },
  {
    src: todayMeasureTime,
    label: '측정 알림',
    alt: '측정할 시간을 알려 주는 화면. 점심 식후 1시간, 13시 10분',
  },
  {
    src: photoFoodResult,
    label: '사진으로 식사 기록',
    alt: '식사 사진에서 잡곡밥, 된장국, 계란말이를 찾아 준 화면',
  },
  {
    src: visitReport,
    label: '진료 리포트',
    alt: '진료 때 보여 줄 혈당 기록을 한 장으로 정리한 리포트 화면',
  },
] as const;

/** 화면 하나를 보여 주는 시간 (ms) */
export const HERO_SCREEN_INTERVAL = 3000;
