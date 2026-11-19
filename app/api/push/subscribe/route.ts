import { admin, json, requireUser, supabaseConfigured } from '@/lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const okEndpoint = (s: unknown): s is string => {
  if (typeof s !== 'string' || s.length > 1000) return false;
  try { return new URL(s).protocol === 'https:'; } catch { return false; }
};

/** 아침 알림 구독 저장 (로그인 없이도 가능, 로그인하면 계정과 연결) */
export async function POST(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const body = await req.json().catch(() => null);
  if (!okEndpoint(body?.endpoint)) return json({ code: 'invalid_request' }, 400);
  const user = await requireUser(req);
  const row = { endpoint: body.endpoint, user_id: user?.id ?? null, created_at: new Date().toISOString() };
  let { error } = await admin().from('push_subscriptions').upsert({ ...row, lang: body?.lang === 'en' || body?.lang === 'ja' ? body.lang : 'ko' }, { onConflict: 'endpoint' });
  if (error && /lang/.test(error.message || '')) ({ error } = await admin().from('push_subscriptions').upsert(row, { onConflict: 'endpoint' })); // 언어 칸이 아직 없을 때
  if (error) { console.error('[push/subscribe]', error); return json({ code: 'upstream_error' }, 500); }
  return json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const body = await req.json().catch(() => null);
  if (!okEndpoint(body?.endpoint)) return json({ code: 'invalid_request' }, 400);
  await admin().from('push_subscriptions').delete().eq('endpoint', body.endpoint);
  return json({ ok: true });
}
