import { admin, json, requireUser, SKIN_KEYS, supabaseConfigured } from '@/lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 티켓 1장으로 PRO 스킨 1개 평생 소장 */
export async function POST(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);
  const body = await req.json().catch(() => null);
  const skin = body?.skin;
  if (typeof skin !== 'string' || !SKIN_KEYS.includes(skin)) return json({ code: 'invalid_request' }, 400);
  const { data, error } = await admin().rpc('unlock_skin', { p_user: user.id, p_skin: skin });
  if (error) return json({ code: 'upstream_error' }, 500);
  if (data === null) return json({ code: 'no_ticket' }, 402);
  return json({ ok: true, skins: data });
}
