import 'server-only';
import { createClient, type User } from '@supabase/supabase-js';

export const PLANS: Record<'month' | 'year' | 'ticket', { amount: number; name: string; days?: number; tickets?: number }> = {
  month: { amount: 3900, days: 30, name: '소울코드 PRO 30일 이용권' },
  year: { amount: 29000, days: 365, name: '소울코드 PRO 365일 이용권' },
  ticket: { amount: 990, tickets: 1, name: '소울코드 1회 이용권' },
};
export const SKIN_KEYS = ['strawberry', 'chrome', 'matcha'];
export type PlanKey = keyof typeof PLANS;
export const FREE_AI_PER_DAY = 3;

export function supabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** 서비스 롤 클라이언트: RLS를 우회하므로 서버에서만, 검증된 user.id로만 사용 */
export function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function requireUser(req: Request): Promise<User | null> {
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token || !supabaseConfigured()) return null;
  const { data, error } = await admin().auth.getUser(token);
  return error || !data.user ? null : data.user;
}

/** 한국 시간 기준 오늘 (무료 횟수 초기화 기준) */
export function kstToday() {
  return new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
}

export async function getEntitlement(userId: string) {
  const { data } = await admin().from('entitlements').select('plan, pro_until, tickets, skins').eq('user_id', userId).maybeSingle();
  const until = data?.pro_until ? new Date(data.pro_until) : null;
  return { pro: !!until && until.getTime() > Date.now(), until: until?.toISOString() ?? null, plan: data?.plan ?? null, tickets: (data?.tickets as number) ?? 0, skins: (data?.skins as string[]) ?? [] };
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
