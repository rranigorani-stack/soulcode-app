import type { Metadata } from 'next';
import Wanted from '@/components/Wanted';

export const metadata: Metadata = {
  title: '運命の相手 指名手配書 🚨 · SOULCODE',
  description: '生年月日とMBTIを入れるだけ。韓国式四柱推命があなたに足りない気を見つけて、運命の相手の似顔絵を描きます。',
  openGraph: { title: '🚨 運命の相手を探しています', description: '韓国式四柱推命×MBTIで描いた運命の相手。これってあの人?', images: [{ url: '/og-wanted-ja.png', width: 1200, height: 630 }], type: 'website', siteName: 'SOULCODE', locale: 'ja_JP' },
  twitter: { card: 'summary_large_image', images: ['/og-wanted-ja.png'] },
  alternates: { languages: { ko: '/wanted', en: '/en/wanted', ja: '/ja/wanted' } },
};

export default function Page() {
  return <Wanted lang="ja" />;
}
