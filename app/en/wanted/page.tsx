import type { Metadata } from 'next';
import Wanted from '@/components/Wanted';

export const metadata: Metadata = {
  title: 'Soulmate WANTED Poster 🚨 · SOULCODE',
  description: 'Enter your birthday and MBTI. Korean Saju finds the energy you lack and draws the soulmate who completes you.',
  openGraph: { title: '🚨 WANTED: My Soulmate', description: 'Korean Saju + MBTI drew my soulmate. Sound like someone you know?', images: [{ url: '/og-wanted-en.png', width: 1200, height: 630 }], type: 'website', siteName: 'SOULCODE', locale: 'en_US' },
  twitter: { card: 'summary_large_image', images: ['/og-wanted-en.png'] },
  alternates: { languages: { ko: '/wanted', en: '/en/wanted' } },
};

export default function Page() {
  return <Wanted lang="en" />;
}
