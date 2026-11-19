import type { Metadata } from 'next';
import { AskCreate } from '@/components/Ask';

export const metadata: Metadata = {
  title: '友達から見た私ってどんな人? 💌 · SOULCODE',
  description: 'リンクを送ると友達が匿名で私のMBTI・肉食系/草食系・魅力ポイントを選んでくれます。',
  openGraph: { title: '💌 友達から見た私ってどんな人?', description: '匿名で選んで! MBTI、肉食系か草食系か、魅力ポイント', images: [{ url: '/og.png' }], type: 'website', siteName: 'SOULCODE', locale: 'ja_JP' },
  alternates: { languages: { ko: '/ask', en: '/en/ask', ja: '/ja/ask' } },
};

export default function Page() {
  return <AskCreate lang="ja" />;
}
