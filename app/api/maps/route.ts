import { admin, json, requireUser, supabaseConfigured } from '@/lib/server';
import { hashToken, newCode, newToken, parseMember } from '@/lib/maps';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 궁합 지도 만들기: 만든 사람이 첫 멤버. 수정 권한은 토큰으로(로그인 불필요) */
export async function POST(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const body = await req.json().catch(() => null);
  const title = typeof body?.title === 'string' ? body.title.trim().slice(0, 20) : '';
  const me = parseMember(body?.me);
  if (!title || !me) return json({ code: 'invalid_request' }, 400);
  const user = await requireUser(req);
  const db = admin();
  const ownerToken = newToken(), memberToken = newToken();
  for (let i = 0; i < 3; i++) {
    const code = newCode();
    const { error } = await db.from('chem_maps').insert({ code, title, owner_hash: hashToken(ownerToken) });
    if (error) continue;
    const { data, error: e2 } = await db.from('chem_members').insert({ map_code: code, ...me, token_hash: hashToken(memberToken), user_id: user?.id ?? null }).select('id').single();
    if (e2) { console.error('[maps]', e2); return json({ code: 'upstream_error' }, 500); }
    return json({ code, ownerToken, memberId: data.id, memberToken });
  }
  return json({ code: 'upstream_error' }, 500);
}
