import { admin, json, supabaseConfigured } from '@/lib/server';
import { hashToken, validCode } from '@/lib/maps';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 내 링크들에 들어온 친구 결과 (토큰 확인) */
export async function POST(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const body = await req.json().catch(() => null);
  const links = Array.isArray(body?.links) ? body.links.slice(0, 10) : [];
  const ok = links.filter((l: { code?: unknown; token?: unknown }) => validCode(l?.code) && typeof l?.token === 'string');
  if (!ok.length) return json({ links: [] });
  const db = admin();
  const { data: rows } = await db.from('duo_links').select('code,host_hash').in('code', ok.map((l: { code: string }) => l.code));
  const mine = (rows || []).filter((r) => ok.some((l: { code: string; token: string }) => l.code === r.code && hashToken(l.token) === r.host_hash)).map((r) => r.code);
  if (!mine.length) return json({ links: [], gone: ok.map((l: { code: string }) => l.code) });
  const { data: guests } = await db.from('duo_guests').select('id,code,nick,mbti,stem,yb,created_at').in('code', mine).order('created_at', { ascending: false }).limit(100);
  return json({ links: mine, guests: guests || [], gone: ok.map((l: { code: string }) => l.code).filter((c: string) => !(rows || []).some((r) => r.code === c)) });
}
