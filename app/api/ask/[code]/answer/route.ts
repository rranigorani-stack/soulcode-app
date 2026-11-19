import crypto from 'node:crypto';
import { admin, json, supabaseConfigured } from '@/lib/server';
import { MAX_ANSWERS, parseAnswer, validAskCode } from '@/lib/askData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 친구 답변: 로그인 없이 익명. 같은 사람 중복 답변만 막아요 (IP·기기 정보는 해시로만 쓰고 원문은 저장하지 않음) */
export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  const a = parseAnswer(await req.json().catch(() => null));
  if (!validAskCode(code) || !a) return json({ code: 'invalid_request' }, 400);
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const device = req.headers.get('x-ask-device') || '';
  const voter = crypto.createHash('sha256').update(`${code}|${ip}|${device}|${process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-12) || ''}`).digest('hex');
  const { data, error } = await admin().rpc('add_ask_answer', { p_code: code, p_voter: voter, p_teto: a.teto, p_ei: a.ei, p_sn: a.sn, p_tf: a.tf, p_jp: a.jp, p_charm: a.charm, p_love: a.love, p_animal: a.animal, p_island: a.island, p_max: MAX_ANSWERS });
  if (error) { console.error('[ask/answer]', error); return json({ code: 'upstream_error' }, 500); }
  if (data === 'ok') return json({ ok: true });
  return json({ code: data }, data === 'not_found' ? 404 : 409);
}
