import type { Metadata } from 'next';
import { AskCreate } from '@/components/Ask';

export const metadata: Metadata = {
  title: 'How do my friends see me? 💌 · SOULCODE',
  description: 'Share a link and friends anonymously pick your MBTI, Bold/Soft type and charm point.',
  openGraph: { title: '💌 How do my friends really see me?', description: 'Answer anonymously! MBTI, Bold or Soft, charm point', images: [{ url: '/og-en.png' }], type: 'website', siteName: 'SOULCODE', locale: 'en_US' },
  alternates: { languages: { ko: '/ask', en: '/en/ask' } },
};

export default function Page() {
  return <AskCreate lang="en" />;
}
