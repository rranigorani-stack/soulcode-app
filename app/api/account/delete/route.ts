import { admin, json, requireUser } from '@/lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 회원 탈퇴: 계정과 동기화 데이터 삭제. 결제 기록은 전자상거래법(5년)에 따라 회원 연결만 끊고 보관 */
export async function POST(req: Request) {
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);
  const db = admin();
  const { error: e1 } = await db.from('payments').update({ user_id: null }).eq('user_id', user.id);
  if (e1) { console.error('[account/delete] payments', e1); return json({ code: 'upstream_error' }, 500); }
  const { error: e2 } = await db.auth.admin.deleteUser(user.id);
  if (e2) { console.error('[account/delete] user', e2); return json({ code: 'upstream_error' }, 500); }
  return json({ ok: true });
}
