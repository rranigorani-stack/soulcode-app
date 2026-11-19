import { admin, json, supabaseConfigured } from '@/lib/server';
import { hashToken, newCode, newToken } from '@/lib/maps';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 보드 만들기: 별명만 받아요. 결과를 볼 수 있는 비밀 키는 만든 사람에게만 한 번 돌려줘요 (서버엔 해시만) */
export async function POST(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const body = await req.json().catch(() => null);
  const nick = typeof body?.nick === 'string' ? body.nick.trim().slice(0, 10) : '';
  if (!nick) return json({ code: 'invalid_request' }, 400);
  const key = newToken();
  for (let i = 0; i < 3; i++) {
    const code = newCode();
    const { error } = await admin().from('ask_boards').insert({ code, nick, owner_hash: hashToken(key) });
    if (!error) return json({ code, key });
    if (error.code !== '23505') { console.error('[ask/create]', error); break; }
  }
  return json({ code: 'upstream_error' }, 500);
}
