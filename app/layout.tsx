import type { Metadata, Viewport } from 'next';
import './soulcode.css';

export const metadata: Metadata = {
  title: 'SOULCODE 소울코드 · 사주 × MBTI × 타로',
  description: 'MBTI는 핑계고, 사주는 거들 뿐. 오늘의 나를 해석해주는 소울 리포트',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: '소울코드', statusBarStyle: 'default' },
  icons: { icon: '/icons/icon-192.png', apple: '/icons/apple-touch-icon.png' },
  openGraph: { title: 'SOULCODE 소울코드', description: '사주 × MBTI × 타로로 오늘의 나를 해석해드림', type: 'website' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F7D4F2' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Black+Han+Sans&family=Jua&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
