import type { Metadata, Viewport } from 'next';
import './soulcode.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://soulcode-app-orcin.vercel.app'),
  title: 'SoulCode · The Weaver’s Loom — Korean Saju, MBTI & Tarot',
  description: 'Read the pattern you were born with. Korean Saju (the Four Pillars) on the official KASI calendar, with MBTI and tarot.',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'SoulCode', statusBarStyle: 'black-translucent' },
  icons: { icon: '/icons/icon-192.png', apple: '/icons/apple-touch-icon.png' },
  openGraph: { title: 'SoulCode · The Weaver’s Loom', description: 'Korean Saju on the official KASI calendar, with MBTI and tarot. Read the pattern you were born with.', type: 'website', siteName: 'SoulCode', locale: 'en_US', alternateLocale: ['ko_KR'], images: [{ url: '/og-en.png', width: 1200, height: 630, alt: 'SoulCode · Korean Saju × MBTI × Tarot' }] },
  twitter: { card: 'summary_large_image', images: ['/og-en.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0E1722' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Black+Han+Sans&family=Jua&family=Noto+Sans+KR:wght@200;300;400;500;700;900&family=Nanum+Myeongjo:wght@400;700;800&family=Special+Elite&family=Courier+Prime:wght@400;700&family=Song+Myung&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Pen+Script&family=Noto+Serif+KR:wght@200;300;400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Nanum+Brush+Script&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@500;700&display=swap" rel="stylesheet" />
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
