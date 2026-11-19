import { admin, json, supabaseConfigured } from '@/lib/server';
import { hashToken, validCode } from '@/lib/maps';
import { okEndpoint } from '@/lib/duo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 초대받은 사람이 보는 정보: 별명·MBTI·일간·띠 */
export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  if (!validCode(code)) return json({ code: 'invalid_request' }, 400);
  const { data } = await admin().from('duo_links').select('nick,mbti,stem,yb,lang').eq('code', code).maybeSingle();
  if (!data) return json({ code: 'not_found' }, 404);
  return json(data);
}

/** 링크 주인: 알림 받을 주소 갱신 */
export async function PATCH(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  const body = await req.json().catch(() => null);
  const token = req.headers.get('x-duo-token') || '';
  if (!validCode(code) || !token || !okEndpoint(body?.endpoint)) return json({ code: 'invalid_request' }, 400);
  const { error } = await admin().from('duo_links').update({ host_endpoint: body.endpoint }).eq('code', code).eq('host_hash', hashToken(token));
  if (error) return json({ code: 'upstream_error' }, 500);
  return json({ ok: true });
}

/** 링크 주인: 링크 지우기 (친구 결과도 함께 삭제) */
export async function DELETE(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  const token = req.headers.get('x-duo-token') || '';
  if (!validCode(code) || !token) return json({ code: 'invalid_request' }, 400);
  await admin().from('duo_links').delete().eq('code', code).eq('host_hash', hashToken(token));
  return json({ ok: true });
}
