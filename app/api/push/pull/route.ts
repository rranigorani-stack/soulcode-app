import { admin, json, supabaseConfigured } from '@/lib/server';
import { MORNING, asLang, okEndpoint } from '@/lib/duo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 서비스워커가 푸시를 받으면 여기서 보여줄 문구를 가져가요: 친구 알림이 있으면 그것, 없으면 아침 문구 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const day = new Date().getUTCDate();
  if (!supabaseConfigured() || !okEndpoint(body?.endpoint)) return json({ title: MORNING.ko[day % 4][0], body: MORNING.ko[day % 4][1], url: '/?from=push' });
  const db = admin();
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { data: item } = await db.from('push_inbox').select('id,title,body,url').eq('endpoint', body.endpoint).eq('delivered', false).gte('created_at', since).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (item) {
    await db.from('push_inbox').update({ delivered: true }).eq('endpoint', body.endpoint).eq('delivered', false);
    return json({ title: item.title, body: item.body, url: item.url, tag: 'soulcode-friend' });
  }
  const { data: sub } = await db.from('push_subscriptions').select('lang').eq('endpoint', body.endpoint).maybeSingle();
  const lang = asLang(sub?.lang);
  const [t, b] = MORNING[lang][day % 4];
  return json({ title: t, body: b, url: `${lang === 'ko' ? '/' : '/' + lang}?from=push`, tag: 'soulcode-daily' });
}
