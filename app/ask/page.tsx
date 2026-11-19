import type { Metadata } from 'next';
import { AskCreate } from '@/components/Ask';

export const metadata: Metadata = {
  title: '친구들이 보는 나는? 💌 · 소울코드',
  description: '링크를 뿌리면 친구들이 익명으로 내 MBTI, 테토/에겐, 매력 포인트를 골라줘요',
  openGraph: { title: '💌 친구들이 보는 나는 어떤 사람?', description: '익명으로 골라줘! 내 MBTI, 테토/에겐, 매력 포인트', images: [{ url: '/og.png' }], type: 'website', siteName: '소울코드', locale: 'ko_KR' },
};

export default function Page() {
  return <AskCreate />;
}
