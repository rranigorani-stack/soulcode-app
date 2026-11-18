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

/**
 * AI 비용 안전장치 (Vercel 환경변수로 코드 수정 없이 조절)
 * - AI_PAUSED=1            : AI 전체 일시 중지 (비상 스위치)
 * - AI_FREE_PER_DAY        : 무료 사용자 1인당 하루 횟수 (기본 3)
 * - AI_BUSY_AT             : 오늘 무료 호출이 이 수를 넘으면 '붐비는 날' 모드 (기본 2000)
 * - AI_FREE_PER_DAY_BUSY   : 붐비는 날 1인당 무료 횟수 (기본 1)
 * - AI_DAILY_FREE_CAP      : 하루 전체 무료 호출 상한 (기본 5000) — 넘으면 무료 마감, 유료는 계속
 * - AI_DAILY_TOTAL_CAP     : 하루 전체 호출 상한 (기본 30000) — 비용 폭주 방지 최후 방어선
 */
const envInt = (k: string, d: number) => { const v = parseInt(process.env[k] || '', 10); return Number.isFinite(v) && v >= 0 ? v : d; };
export function aiPolicy() {
  return {
    paused: process.env.AI_PAUSED === '1',
    freePerDay: envInt('AI_FREE_PER_DAY', FREE_AI_PER_DAY),
    busyAt: envInt('AI_BUSY_AT', 2000),
    freePerDayBusy: envInt('AI_FREE_PER_DAY_BUSY', 1),
    dailyFreeCap: envInt('AI_DAILY_FREE_CAP', 5000),
    dailyTotalCap: envInt('AI_DAILY_TOTAL_CAP', 30000),
  };
}
/** 오늘 무료 사용자 1인 한도 (붐비는 날이면 줄어듦) */
export async function freeLimitToday(day: string) {
  const p = aiPolicy();
  const { data } = await admin().from('ai_budget').select('free_calls').eq('day', day).maybeSingle();
  const busy = (data?.free_calls ?? 0) >= p.busyAt;
  return { limit: busy ? Math.min(p.freePerDayBusy, p.freePerDay) : p.freePerDay, busy };
}

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
