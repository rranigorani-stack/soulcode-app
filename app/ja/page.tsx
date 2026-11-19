import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ソウルコード · 四柱推命×MBTI×タロット',
  description: '四柱推命×MBTI×タロットで今日のあなたを解説。1分で完了の占いエンタメ。',
  alternates: { canonical: '/ja', languages: { ko: '/', en: '/en', ja: '/ja' } },
  openGraph: { title: 'ソウルコード · 四柱推命×MBTI×タロット', description: '四柱推命×MBTI×タロットで今日のあなたを解説。1分で完了の占いエンタメ。', images: [{ url: '/og-ja.png', width: 1200, height: 630 }], type: 'website', siteName: 'SOULCODE', locale: 'ja_JP' },
  twitter: { card: 'summary_large_image', images: ['/og-ja.png'] },
};

/* 공유용 언어별 입구: 미리보기(OG)는 이 언어로, 사람은 앱으로 바로 이동 */
export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "var q=location.search.slice(1);location.replace('/?lang=ja'+(q?'&'+q:''))" }} />
      <p style={{ textAlign: 'center', marginTop: 80 }}><a href="/?lang=ja">SOULCODE →</a></p>
    </>
  );
}
