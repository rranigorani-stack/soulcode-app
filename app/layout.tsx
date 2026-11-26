import type { Metadata, Viewport } from 'next';
import './soulcode.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://soulcode-app-orcin.vercel.app'),
  title: 'SOULCODE 소울코드 · 사주 × MBTI × 타로',
  description: 'MBTI는 핑계고, 사주는 거들 뿐. 오늘의 나를 해석해주는 소울 리포트',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: '소울코드', statusBarStyle: 'default' },
  icons: { icon: '/icons/icon-192.png', apple: '/icons/apple-touch-icon.png' },
  openGraph: { title: 'SOULCODE 소울코드', description: '사주 × MBTI × 타로로 오늘의 나를 해석해드림', type: 'website', siteName: '소울코드', locale: 'ko_KR', images: [{ url: '/og.png', width: 1200, height: 630, alt: '소울코드 · 사주 × MBTI × 타로' }] },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F3ECDF' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Black+Han+Sans&family=Jua&family=Noto+Sans+KR:wght@200;300;400;500;700;900&family=Nanum+Myeongjo:wght@400;700;800&family=Special+Elite&family=Courier+Prime:wght@400;700&family=Song+Myung&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Pen+Script&family=Noto+Serif+KR:wght@200;300;400;600;700;900&family=Cormorant+Garamond:wght@300&family=Nanum+Brush+Script&family=DM+Mono:wght@400;500&family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        {/* 디자인 조정판: 주소 끝에 ?edit=1 을 붙였을 때만 불러와요 */}
        <script dangerouslySetInnerHTML={{ __html: "if(/[?&]edit=1/.test(location.search)){window.addEventListener('load',function(){var s=document.createElement('script');s.src='/edit-panel.js';document.body.appendChild(s)})}" }} />
        {/* Vercel Web Analytics: 방문·조회수 (쿠키 없음). 대시보드 Analytics 탭에서 켜야 수집돼요 */}
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
