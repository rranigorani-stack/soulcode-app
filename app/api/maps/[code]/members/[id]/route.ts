import { admin, json, supabaseConfigured } from '@/lib/server';
import { hashToken, validCode } from '@/lib/maps';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 멤버 빼기: 본인(멤버 토큰) 또는 지도 주인(주인 토큰) */
export async function DELETE(req: Request, { params }: { params: Promise<{ code: string; id: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code, id } = await params;
  const token = req.headers.get('x-map-token') || '';
  if (!validCode(code) || !/^[0-9a-f-]{36}$/.test(id) || !token) return json({ code: 'forbidden' }, 403);
  const db = admin(), h = hashToken(token);
  const { data: owner } = await db.from('chem_maps').select('code').eq('code', code).eq('owner_hash', h).maybeSingle();
  let q = db.from('chem_members').delete().eq('map_code', code).eq('id', id);
  if (!owner) q = q.eq('token_hash', h);
  const { data, error } = await q.select('id');
  if (error || !data?.length) return json({ code: 'forbidden' }, 403);
  return json({ ok: true });
}
