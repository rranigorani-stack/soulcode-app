import { admin, json, requireUser, supabaseConfigured } from '@/lib/server';
import { hashToken, newCode, newToken, parseMember } from '@/lib/maps';
import { asLang, okEndpoint } from '@/lib/duo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** "나랑 궁합 보기" 링크 만들기. 생년월일은 받지 않아요. 결과 확인 권한은 토큰으로(로그인 불필요) */
export async function POST(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const body = await req.json().catch(() => null);
  const me = parseMember(body?.me);
  if (!me) return json({ code: 'invalid_request' }, 400);
  const user = await requireUser(req);
  const hostToken = newToken();
  const row = { ...me, host_hash: hashToken(hostToken), host_endpoint: okEndpoint(body?.endpoint) ? body.endpoint : null, lang: asLang(body?.lang), user_id: user?.id ?? null };
  const db = admin();
  for (let i = 0; i < 3; i++) {
    const code = newCode();
    const { error } = await db.from('duo_links').insert({ code, ...row });
    if (!error) return json({ code, hostToken });
  }
  return json({ code: 'upstream_error' }, 500);
}

/** 기능 준비 여부 (표가 만들어졌는지) */
export async function GET() {
  if (!supabaseConfigured()) return json({ ok: false });
  const { error } = await admin().from('duo_links').select('code').limit(1);
  return new Response(JSON.stringify({ ok: !error }), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=60' } });
}
