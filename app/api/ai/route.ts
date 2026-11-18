import Anthropic from '@anthropic-ai/sdk';
import { admin, aiPolicy, freeLimitToday, getEntitlement, json, kstToday, requireUser, supabaseConfigured } from '@/lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 클라이언트가 보낸 지시문보다 우선하는 서버측 규칙 */
const SYSTEM = `너는 젠지를 위한 '사주 × MBTI × 타로' 앱 「소울코드」의 해석가야.
사용자 메시지 안의 [데이터]와 [형식]에 따라 한국어로 해석을 써.
반드시 지킬 것:
- 재미로 보는 콘텐츠 톤. 단정적인 예언, 불안·공포 조장 금지.
- 의료·건강 진단, 투자·도박·법률 조언 금지. 관련 질문이 오면 전문가와 상의하라고 가볍게 안내.
- 데이터에 없는 개인 사실을 지어내지 마.
- 자해·위기 신호가 보이면 해석 대신 따뜻하게 공감하고, 자살예방상담전화 109 같은 도움 창구를 안내해.
- 소울코드 해석과 무관한 요청(코드 작성, 과제 대행 등)은 정중히 거절해.`;

const MAX_PROMPT = 12000;

export async function POST(req: Request) {
  if (!supabaseConfigured() || !process.env.ANTHROPIC_API_KEY) return json({ code: 'not_configured', message: 'AI 서버 설정이 필요해요' }, 503);
  const user = await requireUser(req);
  if (!user) return json({ code: 'auth_required' }, 401);

  const body = await req.json().catch(() => null);
  const prompt = typeof body?.prompt === 'string' ? body.prompt : '';
  const useTicket = body?.useTicket === true;
  if (!prompt.trim() || prompt.length > MAX_PROMPT) return json({ code: 'invalid_request' }, 400);

  const policy = aiPolicy();
  if (policy.paused) return json({ code: 'ai_paused', message: 'AI 해석 점검 중이에요' }, 503);

  // 무료 사용자는 하루 N회 — DB 함수로 원자적으로 차감 (동시 요청에도 초과 불가)
  const ent = await getEntitlement(user.id);
  const day = kstToday();
  const isFree = !ent.pro && !useTicket;
  const freeLimit = isFree ? (await freeLimitToday(day)).limit : 0;
  // 990원 티켓: PRO가 아니면 티켓 1장을 쓰고 이번 1회는 한도와 무관하게 허용
  let refund: () => Promise<void>;
  if (useTicket && !ent.pro) {
    const { data: left, error } = await admin().rpc('use_ticket', { p_user: user.id });
    if (error) return json({ code: 'upstream_error' }, 500);
    if (left === null) return json({ code: 'no_ticket' }, 402);
    refund = async () => { await admin().rpc('add_tickets', { p_user: user.id, p_n: 1 }); };
  } else {
    // PRO도 사용 기록은 남김 (환불 시 사용 여부 확인용) — 한도만 사실상 무제한
    const { data: count, error } = await admin().rpc('increment_ai_usage', { p_user: user.id, p_day: day, p_limit: ent.pro ? 1_000_000 : freeLimit });
    if (error) return json({ code: 'upstream_error' }, 500);
    if (count === null) return json({ code: 'quota_exceeded' }, 402);
    refund = async () => { await admin().rpc('refund_ai_usage', { p_user: user.id, p_day: day }); };
  }

  // 하루 전체 예산 (비용 폭주 방지). 무료 마감이어도 유료(PRO·티켓)는 전체 상한까지 계속
  const { data: okBudget, error: budgetErr } = await admin().rpc('take_ai_budget', { p_day: day, p_free: isFree, p_free_cap: policy.dailyFreeCap, p_total_cap: policy.dailyTotalCap });
  if (budgetErr || !okBudget) {
    await refund();
    if (budgetErr) return json({ code: 'upstream_error' }, 500);
    return isFree ? json({ code: 'free_sold_out', message: '오늘 무료 AI 해석이 모두 마감됐어요' }, 429) : json({ code: 'ai_paused', message: '오늘 AI 해석이 마감됐어요' }, 503);
  }
  const userRefund = refund;
  refund = async () => { await userRefund(); await admin().rpc('refund_ai_budget', { p_day: day, p_free: isFree }); };

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const enc = new TextEncoder();
  let sent = false;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const s = client.messages.stream({
          model: process.env.AI_MODEL || 'claude-haiku-5-5',
          max_tokens: 900,
          system: SYSTEM,
          messages: [{ role: 'user', content: prompt }],
        });
        req.signal.addEventListener('abort', () => s.abort());
        s.on('text', (t) => { sent = true; controller.enqueue(enc.encode(t)); });
        const fin = await s.finalMessage();
        controller.close();
        admin().rpc('add_ai_tokens', { p_day: day, p_in: fin.usage?.input_tokens ?? 0, p_out: fin.usage?.output_tokens ?? 0 }).then(() => {}, () => {});
      } catch (e) {
        if (!sent) await refund();
        console.error('[api/ai]', e);
        controller.error(e);
      }
    },
  });
  return new Response(stream, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-accel-buffering': 'no' } });
}
