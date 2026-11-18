import { admin, json, requireUser, supabaseConfigured } from '@/lib/server';
import { MAX_MEMBERS, hashToken, newToken, parseMember, validCode } from '@/lib/maps';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  const me = parseMember(await req.json().catch(() => null));
  if (!validCode(code) || !me) return json({ code: 'invalid_request' }, 400);
  const db = admin();
  const { data: map } = await db.from('chem_maps').select('code').eq('code', code).maybeSingle();
  if (!map) return json({ code: 'not_found' }, 404);
  const { count } = await db.from('chem_members').select('id', { count: 'exact', head: true }).eq('map_code', code);
  if ((count ?? 0) >= MAX_MEMBERS) return json({ code: 'full' }, 409);
  const user = await requireUser(req);
  const memberToken = newToken();
  const { data, error } = await db.from('chem_members').insert({ map_code: code, ...me, token_hash: hashToken(memberToken), user_id: user?.id ?? null }).select('id').single();
  if (error) { console.error('[maps/join]', error); return json({ code: 'upstream_error' }, 500); }
  await db.from('chem_maps').update({ updated_at: new Date().toISOString() }).eq('code', code);
  return json({ memberId: data.id, memberToken });
}
