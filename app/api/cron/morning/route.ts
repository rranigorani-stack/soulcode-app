import { admin, json, kstToday, supabaseConfigured } from '@/lib/server';
import { sendEmptyPush } from '@/lib/push';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * 매일 아침 8시(KST) Vercel Cron이 호출 → 구독자 전원에게 "오늘의 카드" 알림.
 * 하루 한 번만 실제 발송돼요(push_runs). CRON_SECRET 환경변수가 있으면 그 값으로 인증해요.
 */
export async function GET(req: Request) {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization') || '';
  const isCron = secret ? auth === `Bearer ${secret}` : (req.headers.get('user-agent') || '').includes('vercel-cron');
  if (!isCron) return json({ code: 'forbidden' }, 403);

  const db = admin();
  const day = kstToday();
  const { error: lockErr } = await db.from('push_runs').insert({ day });
  if (lockErr) return json({ ok: true, skipped: 'already_sent', day });
  await db.rpc('cleanup_ask_boards').then(() => {}, () => {}); // 오래된 '친구들이 보는 나' 링크 정리

  let sent = 0, removed = 0, failed = 0, from = 0;
  const PAGE = 500;
  for (;;) {
    const { data, error } = await db.from('push_subscriptions').select('endpoint').order('endpoint').range(from, from + PAGE - 1);
    if (error) { console.error('[cron/morning]', error); break; }
    if (!data?.length) break;
    for (let i = 0; i < data.length; i += 50) {
      const batch = data.slice(i, i + 50);
      const res = await Promise.all(batch.map((r) => sendEmptyPush(r.endpoint).catch(() => 0)));
      const gone = batch.filter((_, k) => res[k] === 404 || res[k] === 410).map((r) => r.endpoint);
      if (gone.length) { await db.from('push_subscriptions').delete().in('endpoint', gone); removed += gone.length; }
      sent += res.filter((s) => s >= 200 && s < 300).length;
      failed += res.filter((s) => !(s >= 200 && s < 300) && s !== 404 && s !== 410).length;
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }
  await db.from('push_runs').update({ sent, removed, failed }).eq('day', day);
  return json({ ok: true, day, sent, removed, failed });
}
