import { admin, json, supabaseConfigured } from '@/lib/server';
import { hashToken } from '@/lib/maps';
import { aggregate, MIN_REVEAL, validAskCode, type AskAnswer } from '@/lib/askData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 누구나: 별명과 답변 수. 주인(x-ask-key)만: 집계 결과 (MIN_REVEAL명 이상일 때) */
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  if (!validAskCode(code)) return json({ code: 'not_found' }, 404);
  const db = admin();
  const { data: b } = await db.from('ask_boards').select('nick, owner_hash, answer_count').eq('code', code).maybeSingle();
  if (!b) return json({ code: 'not_found' }, 404);
  const key = req.headers.get('x-ask-key') || '';
  const owner = !!key && hashToken(key) === b.owner_hash;
  if (!owner) return json({ nick: b.nick, count: b.answer_count, owner: false });
  if (b.answer_count < MIN_REVEAL) return json({ nick: b.nick, count: b.answer_count, owner: true, result: null });
  const { data: rows, error } = await db.from('ask_answers').select('teto, ei, sn, tf, jp, charm, love, animal, island').eq('board_code', code).limit(500);
  if (error) return json({ code: 'upstream_error' }, 500);
  return json({ nick: b.nick, count: b.answer_count, owner: true, result: aggregate((rows || []) as AskAnswer[]) });
}

/** 주인만: 보드 삭제 (답변도 함께 삭제) */
export async function DELETE(req: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const { code } = await params;
  if (!validAskCode(code)) return json({ code: 'not_found' }, 404);
  const key = req.headers.get('x-ask-key') || '';
  const { data: b } = await admin().from('ask_boards').select('owner_hash').eq('code', code).maybeSingle();
  if (!b || !key || hashToken(key) !== b.owner_hash) return json({ code: 'forbidden' }, 403);
  await admin().from('ask_boards').delete().eq('code', code);
  return json({ ok: true });
}
