import iconConsent from '@/assets/images/icon-trust-consent.svg';
import iconCriteria from '@/assets/images/icon-trust-criteria.svg';
import iconHospital from '@/assets/images/icon-trust-hospital.svg';

/** 06 Trust */
export const TRUST_COPY = {
  eyebrow: 'TRUST',
  title: '믿고 쓸 수 있도록\n지키는 세 가지',
} as const;

export const TRUST_ITEMS = [
  {
    icon: iconCriteria,
    title: '기준은 담당 의료진이 정해요',
    lines: [
      '당당은 목표 범위나 측정 시점을',
      '정하지 않아요.',
      '병원에서 받은 기준을 그대로 입력해 써요.',
    ],
  },
  {
    icon: iconHospital,
    title: '진단·치료를 하지 않아요',
    lines: [
      '당당은 의료기기가 아니에요.',
      '몸 상태가 평소와 다르거나 걱정되면',
      '바로 다니는 병원에 연락하세요.',
    ],
  },
  {
    icon: iconConsent,
    title: '건강정보는 동의한 만큼만',
    lines: [
      '건강정보는 동의를 받은 뒤에만 다루고,',
      'AI 사진 기능도 따로 동의해야 써요.',
      '동의는 언제든 거둘 수 있어요.',
    ],
  },
] as const;

/** 08 FAQ */
export const FAQ_COPY = {
  eyebrow: 'FAQ',
  title: '자주 묻는 질문',
} as const;

export const FAQ_ITEMS = [
  {
    question: '당당이 혈당 목표를 정해 주나요?',
    answer: [
      '아니요. 목표 범위와 측정 시점은 담당 의료진이 정한 기준을 그대로 입력해서 써요.',
      '진료 뒤 기준이 바뀌면 그때 바꾸면 돼요.',
    ],
  },
  {
    question: '앱을 따로 설치해야 하나요?',
    answer: ['아니요. 휴대폰 브라우저에서 바로 써요.', '홈 화면에 추가하면 앱처럼 열 수 있어요.'],
  },
  {
    question: '사진으로 기록하는 건 꼭 해야 하나요?',
    answer: [
      '아니요. 음식 이름으로 적어도 돼요.',
      'AI 사진 기능은 동의한 뒤에만 쓰고, 동의는 언제든 거둘 수 있어요.',
    ],
  },
  {
    question: '출산 후에도 쓸 수 있나요?',
    answer: [
      '출산일을 입력하면 산후 모드로 바뀌어요.',
      '산후 검사 일정을 등록하고 결과를 메모할 수 있어요.',
    ],
  },
] as const;
