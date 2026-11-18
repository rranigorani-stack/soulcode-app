import type { Metadata } from 'next';
import Wanted from '@/components/Wanted';

export const metadata: Metadata = {
  title: '운명의 상대 수배전단 🚨 · 소울코드',
  description: '생일+MBTI만 넣으면 내 사주에 부족한 기운을 채워줄 운명의 상대 몽타주가 나와요',
  openGraph: { title: '🚨 운명의 상대를 찾습니다', description: '생일+MBTI로 그린 내 운명의 상대 몽타주. 이거 완전 걔 아님?', images: [{ url: '/og-wanted.png', width: 1200, height: 630 }], type: 'website', siteName: '소울코드', locale: 'ko_KR' },
  twitter: { card: 'summary_large_image', images: ['/og-wanted.png'] },
};

export default function Page() {
  return <Wanted />;
}
