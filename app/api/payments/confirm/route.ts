import { admin, json, PLANS, requireUser, type PlanKey } from '@/lib/server';

export const dynamic = 'force-dynamic';

/** 토스 결제 승인: 주문 금액 대조 → 토스 승인 API → 이용권 연장 */
export async function POST(req: Request) {
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);
  const secret = process.env.TOSS_SECRET_KEY;
  if (!secret) return json({ code: 'not_configured' }, 503);

  const { paymentKey, orderId, amount } = (await req.json().catch(() => ({}))) as { paymentKey?: string; orderId?: string; amount?: number | string };
  if (!paymentKey || !orderId) return json({ code: 'invalid_request' }, 400);

  const db = admin();
  const { data: order } = await db.from('payments').select('*').eq('order_id', orderId).eq('user_id', user.id).maybeSingle();
  if (!order) return json({ code: 'order_not_found' }, 404);
  if (order.status === 'DONE') {
    const { data: ent } = await db.from('entitlements').select('pro_until').eq('user_id', user.id).maybeSingle();
    return json({ ok: true, kind: PLANS[order.plan as PlanKey]?.tickets ? 'ticket' : 'pro', until: ent?.pro_until ?? null, already: true });
  }
  if (Number(amount) !== order.amount) {
    await db.from('payments').update({ status: 'AMOUNT_MISMATCH' }).eq('order_id', orderId);
    return json({ code: 'amount_mismatch', message: '결제 금액이 주문과 달라요' }, 400);
  }

  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64'),
      'Content-Type': 'application/json',
      'Idempotency-Key': orderId,
    },
    body: JSON.stringify({ paymentKey, orderId, amount: order.amount }),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result.status !== 'DONE') {
    await db.from('payments').update({ status: 'FAILED', payment_key: paymentKey, raw: result }).eq('order_id', orderId);
    return json({ code: result.code || 'confirm_failed', message: result.message || '결제 승인에 실패했어요' }, 400);
  }

  await db.from('payments').update({ status: 'DONE', payment_key: paymentKey, approved_at: new Date().toISOString(), raw: result }).eq('order_id', orderId);
  const plan = PLANS[order.plan as PlanKey];
  if (plan.tickets) {
    const { data: tickets, error } = await db.rpc('add_tickets', { p_user: user.id, p_n: plan.tickets });
    if (error) return json({ code: 'entitlement_error', message: '결제는 됐지만 이용권 반영에 실패했어요. 고객센터로 문의해주세요.' }, 500);
    return json({ ok: true, kind: 'ticket', tickets });
  }
  const { data: until, error } = await db.rpc('extend_pro', { p_user: user.id, p_days: plan.days, p_plan: order.plan });
  if (error) return json({ code: 'entitlement_error', message: '결제는 됐지만 이용권 반영에 실패했어요. 고객센터로 문의해주세요.' }, 500);
  return json({ ok: true, kind: 'pro', until });
}
