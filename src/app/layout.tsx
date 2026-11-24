import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';

import 'lenis/dist/lenis.css';
// 한글을 쓰는 글자 묶음만 그때그때 받아 오는 Pretendard (가변 굵기)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

import './globals.css';

const SITE_URL = 'https://about-dangdang.vercel.app';

// 히어로 DANGDANG, About 큰 숫자, 섹션 라벨처럼 영문·숫자 장식 글씨에만 쓴다
const poppins = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '당당 | 임신성 당뇨 기록 앱',
  description:
    '병원에서 받은 기준대로, 하루가 끊기지 않게. 측정할 때를 알려 주고, 기록을 모아 진료 때 한 장으로 보여 드려요.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '당당',
    title: '당당 | 임신성 당뇨 기록 앱',
    description: '병원에서 받은 기준대로, 하루가 끊기지 않게.',
  },
};

export const viewport: Viewport = {
  themeColor: '#fbb315',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={poppins.variable}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
