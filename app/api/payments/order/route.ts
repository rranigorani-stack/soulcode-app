import { randomUUID } from 'crypto';
import { admin, json, PLANS, requireUser, type PlanKey } from '@/lib/server';

export const dynamic = 'force-dynamic';

/** 결제 전 주문 생성: 금액은 서버가 정해요 (클라이언트 금액은 믿지 않음) */
export async function POST(req: Request) {
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);
  const { plan } = (await req.json().catch(() => ({}))) as { plan?: string };
  if (!plan || !(plan in PLANS)) return json({ code: 'invalid_plan' }, 400);
  const p = PLANS[plan as PlanKey];
  const orderId = 'sc_' + randomUUID().replace(/-/g, '');
  const { error } = await admin().from('payments').insert({ order_id: orderId, user_id: user.id, plan, amount: p.amount, status: 'READY' });
  if (error) return json({ code: 'db_error' }, 500);
  return json({ orderId, amount: p.amount, orderName: p.name });
}
