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
  const title = nick ? `💌 What is ${nick} really like? Answer anonymously` : '💌 How do my friends see me? · SOULCODE';
  return {
    title, description: 'Pick their MBTI, Bold/Soft type and charm point. They will never know who answered 🤫',
    robots: { index: false },
    openGraph: { title, description: 'Only your picks are sent, anonymously 🤫', images: [{ url: '/og-en.png' }], type: 'website', siteName: 'SOULCODE', locale: 'en_US' },
  };
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <AskBoard code={code} lang="en" />;
}
