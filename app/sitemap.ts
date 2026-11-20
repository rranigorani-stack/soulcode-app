import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulcode-app-orcin.vercel.app';

const pages: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/app', priority: 0.8 },
  { path: '/en', priority: 0.8 },
  { path: '/ja', priority: 0.8 },
  { path: '/wanted', priority: 1 },
  { path: '/en/wanted', priority: 1 },
  { path: '/ja/wanted', priority: 1 },
  { path: '/ask', priority: 0.7 },
  { path: '/en/ask', priority: 0.7 },
  { path: '/ja/ask', priority: 0.7 },
  { path: '/terms', priority: 0.2 },
  { path: '/privacy', priority: 0.2 },
  { path: '/refund', priority: 0.2 },
  { path: '/en/terms', priority: 0.2 },
  { path: '/en/privacy', priority: 0.2 },
  { path: '/ja/terms', priority: 0.2 },
  { path: '/ja/privacy', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${base}${path}`,
    changeFrequency: 'weekly',
    priority,
  }));
}
