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
  const title = nick ? `💌 ${nick}은(는) 어떤 사람이야? 익명으로 골라줘` : '💌 친구들이 보는 나는? · 소울코드';
  return {
    title, description: 'MBTI, 테토/에겐, 매력 포인트를 익명으로 골라주세요. 누가 답했는지는 몰라요 🤫',
    robots: { index: false },
    openGraph: { title, description: '익명으로 골라주면 결과만 전달돼요 🤫', images: [{ url: '/og.png' }], type: 'website', siteName: '소울코드', locale: 'ko_KR' },
  };
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <AskBoard code={code} />;
}
