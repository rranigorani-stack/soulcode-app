import type { Metadata } from 'next';
import { AskBoard } from '@/components/Ask';
import { validAskCode } from '@/lib/askData';
import { admin, supabaseConfigured } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  let nick = '';
  if (validAskCode(code) && supabaseConfigured()) {
    const { data } = await admin().from('ask_boards').select('nick').eq('code', code).maybeSingle().then((r) => r, () => ({ data: null }));
    nick = data?.nick || '';
  }
  const title = nick ? `💌 ${nick}ってどんな人? 匿名で選んで` : '💌 友達から見た私ってどんな人? · SOULCODE';
  return {
    title, description: 'MBTI・肉食系/草食系・魅力ポイントを匿名で選んでね。誰が答えたかはわかりません 🤫',
    robots: { index: false },
    openGraph: { title, description: '選んだ答えだけが匿名で届きます 🤫', images: [{ url: '/og.png' }], type: 'website', siteName: 'SOULCODE', locale: 'ja_JP' },
  };
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <AskBoard code={code} lang="ja" />;
}
