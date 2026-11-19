import crypto from 'node:crypto';
import { admin, json, supabaseConfigured } from '@/lib/server';
import { parseMember, validCode } from '@/lib/maps';
import { DUO_PUSH, asLang, notify } from '@/lib/duo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_GUESTS = 200;

/** 초대받은 친구가 결과 공개: 친구 정보(별명·MBTI·일간·띠)를 남기고 링크 주인에게 알림 */
export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  const me = parseMember(await req.json().catch(() => null));
  if (!validCode(code) || !me) return json({ code: 'invalid_request' }, 400);
  const db = admin();
  const { data: link } = await db.from('duo_links').select('code,host_endpoint,lang').eq('code', code).maybeSingle();
  if (!link) return json({ code: 'not_found' }, 404);
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const device = req.headers.get('x-ask-device') || '';
  const voter = crypto.createHash('sha256').update(`duo|${code}|${ip}|${device}|${process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-12) || ''}`).digest('hex');
  const { count } = await db.from('duo_guests').select('id', { count: 'exact', head: true }).eq('code', code);
  if ((count ?? 0) >= MAX_GUESTS) return json({ code: 'full' }, 409);
  const { error } = await db.from('duo_guests').upsert({ code, ...me, voter }, { onConflict: 'code,voter' });
  if (error) { console.error('[duo/join]', error); return json({ code: 'upstream_error' }, 500); }
  if (link.host_endpoint) {
    const lang = asLang(link.lang);
    const [t, b] = DUO_PUSH[lang](me.nick);
    await notify(link.host_endpoint, t, b, `${lang === 'ko' ? '/' : '/' + lang}?duoSeen=${code}`).catch(() => null);
  }
  return json({ ok: true });
}
