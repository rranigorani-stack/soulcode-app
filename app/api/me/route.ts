import { admin, freeLimitToday, getEntitlement, json, kstToday, requireUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);
  const ent = await getEntitlement(user.id);
  const day = kstToday();
  const [{ data }, fl] = await Promise.all([
    admin().from('ai_usage').select('count').eq('user_id', user.id).eq('day', day).maybeSingle(),
    freeLimitToday(day).catch(() => ({ limit: 3, busy: false })),
  ]);
  return json({ ...ent, aiUsed: data?.count ?? 0, freeLimit: fl.limit, busy: fl.busy });
}
