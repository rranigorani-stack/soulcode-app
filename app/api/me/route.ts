import { admin, FREE_AI_PER_DAY, getEntitlement, json, kstToday, requireUser } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);
  const ent = await getEntitlement(user.id);
  const { data } = await admin().from('ai_usage').select('count').eq('user_id', user.id).eq('day', kstToday()).maybeSingle();
  return json({ ...ent, aiUsed: data?.count ?? 0, freeLimit: FREE_AI_PER_DAY });
}
