import { admin, json, supabaseConfigured } from '@/lib/server';
import { hashToken, validCode } from '@/lib/maps';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  if (!validCode(code)) return json({ code: 'not_found' }, 404);
  const db = admin();
  const { data: map } = await db.from('chem_maps').select('code, title, created_at').eq('code', code).maybeSingle();
  if (!map) return json({ code: 'not_found' }, 404);
  const { data: members } = await db.from('chem_members').select('id, nick, mbti, stem, yb, joined_at').eq('map_code', code).order('joined_at');
  return json({ code: map.code, title: map.title, members: members ?? [] });
}

/** 지도 삭제 (만든 사람만) */
export async function DELETE(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  const token = req.headers.get('x-map-token') || '';
  if (!validCode(code) || !token) return json({ code: 'forbidden' }, 403);
  const { data, error } = await admin().from('chem_maps').delete().eq('code', code).eq('owner_hash', hashToken(token)).select('code');
  if (error || !data?.length) return json({ code: 'forbidden' }, 403);
  return json({ ok: true });
}
