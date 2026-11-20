import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOULCODE · Korean Saju × MBTI × Tarot',
  description: 'Your Korean fortune: Saju (Four Pillars) × MBTI × Tarot read the real you, today.',
  alternates: { canonical: '/en', languages: { ko: '/', en: '/en', ja: '/ja' } },
  openGraph: { title: 'SOULCODE · Korean Saju × MBTI × Tarot', description: 'Your Korean fortune: Saju (Four Pillars) × MBTI × Tarot read the real you, today.', images: [{ url: '/og-en.png', width: 1200, height: 630 }], type: 'website', siteName: 'SOULCODE', locale: 'en_US' },
  twitter: { card: 'summary_large_image', images: ['/og-en.png'] },
};

/* 공유용 언어별 입구: 미리보기(OG)는 이 언어로, 사람은 앱으로 바로 이동 */
export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "var q=location.search.slice(1);location.replace('/app?lang=en'+(q?'&'+q:''))" }} />
      <p style={{ textAlign: 'center', marginTop: 80 }}><a href="/app?lang=en">SOULCODE →</a></p>
    </>
  );
}
