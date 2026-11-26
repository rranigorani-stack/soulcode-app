'use client';
/**
 * 소울코드 런타임 어댑터
 *
 * 프로토타입(public/soulcode/app.js)은 `window.claude.use('sample' | 'db' | 'user')`로
 * AI·저장소·사용자를 찾아요. 정식 버전에서는 이 파일이 같은 모양의 객체를
 * Supabase(로그인·동기화)와 자체 서버(/api/ai, /api/payments)로 만들어 넣어줘요.
 * 덕분에 화면 코드는 그대로 두고 백엔드만 바꿀 수 있어요.
 */
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import * as Manseryeok from 'manseryeok';
import { bizLines } from './legal';

type Provider = 'kakao' | 'apple' | 'google';
type SampleOpts = { onText?: (u: { text: string; delta: string }) => void; signal?: AbortSignal; ticket?: boolean };

declare global {
  interface Window {
    Manseryeok: typeof Manseryeok;
    claude?: { use: (name: string) => Promise<unknown> };
    soulConfig: { devTestPro: boolean; serverPro: boolean; providers: Provider[]; emailLogin: boolean; payTest: boolean; biz: [string, string][]; freeBeta: boolean };
    soulAuth?: { signIn: (p: Provider) => void; emailPrompt: () => void; signOut: () => void; label: () => string; deleteAccount: () => Promise<boolean> };
    soulPay?: { start: (plan: 'month' | 'year' | 'ticket') => void };
    soulShop?: { unlockSkin: (skin: string) => Promise<{ ok: boolean; code?: string; skins?: string[] }> };
    toast?: (t: string) => void;
    go?: (id: string) => void;
    __soulBooted?: boolean;
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
const DEV_TEST_PRO = process.env.NEXT_PUBLIC_DEV_TEST_PRO === 'true';
/** 켜 둔 소셜 로그인만 버튼으로 노출 (예: "kakao,google") */
/** 이메일 로그인: Supabase 기본 메일은 팀원 주소로만 발송되므로, 커스텀 SMTP를 붙이기 전까지 숨김 */
const EMAIL_LOGIN = process.env.NEXT_PUBLIC_AUTH_EMAIL === 'true';
const PROVIDERS = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS || 'kakao').split(',').map((x) => x.trim()).filter(Boolean) as Provider[];

const kstToday = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const setLocal = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 저장 불가 환경 */ } };

let supabase: SupabaseClient | null = null;

async function accessToken(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

/** /api/ai 를 스트리밍으로 부르는 sample() — 프로토타입의 sample 캡이빌리티와 같은 모양 */
function makeSample() {
  const sample = async (input: string, opts: SampleOpts = {}) => {
    const token = await accessToken();
    if (!token) throw { code: 'auth_required', message: 'login required' };
    let res: Response;
    try {
      res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ prompt: String(input), useTicket: !!opts.ticket }),
        signal: opts.signal,
      });
    } catch (e) {
      throw { code: opts.signal?.aborted ? 'cancelled' : 'upstream_error', message: String(e) };
    }
    if (!res.ok || !res.body) {
      const body = await res.json().catch(() => ({}));
      const code = body.code || ({ 401: 'auth_required', 402: 'quota_exceeded', 429: 'rate_limited' } as Record<number, string>)[res.status] || 'upstream_error';
      throw { code, message: body.message || res.statusText };
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let text = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      const delta = dec.decode(value, { stream: true });
      if (!delta) continue;
      text += delta;
      opts.onText?.({ text, delta });
    }
    if (!text.trim()) throw { code: 'empty_completion', message: 'empty' };
    return { text, truncated: false };
  };
  return sample;
}

/** Supabase user_state 테이블을 프로토타입의 db.doc(path).get/set 모양으로 감싸요 */
function makeDb(uid: string) {
  return {
    doc: () => ({
      get: async () => {
        const { data, error } = await supabase!.from('user_state').select('data').eq('user_id', uid).maybeSingle();
        if (error) throw { code: 'unavailable', message: error.message };
        return { exists: !!data, data: () => (data ? data.data : undefined) };
      },
      set: async (d: Record<string, unknown>) => {
        const { error } = await supabase!.from('user_state').upsert({ user_id: uid, data: d, updated_at: new Date().toISOString() });
        if (error) throw { code: 'unavailable', message: error.message };
      },
    }),
  };
}

function emailModal() {
  const wrap = document.createElement('div');
  wrap.className = 'modal show email-modal';
  wrap.innerHTML = `<div class="pw"><h3 class="h-display">이메일로 로그인 ✉️</h3>
    <p class="muted" style="text-align:center;font-size:13.5px;margin-top:6px">로그인 링크를 보내드려요. 메일함에서 링크를 누르면 끝!</p>
    <input class="field" type="email" placeholder="you@example.com" autocomplete="email">
    <button class="btn">링크 받기</button><button class="btn ghost" style="margin-top:10px">닫기</button></div>`;
  const [send, close] = Array.from(wrap.querySelectorAll('button'));
  const input = wrap.querySelector('input') as HTMLInputElement;
  close.onclick = () => wrap.remove();
  send.onclick = async () => {
    const email = input.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { window.toast?.('이메일 주소를 확인해주세요'); return; }
    send.setAttribute('disabled', '');
    const { error } = await supabase!.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + '/app' } });
    send.removeAttribute('disabled');
    if (error) { window.toast?.('메일을 보내지 못했어요. 잠시 후 다시 시도해주세요'); return; }
    wrap.remove();
    window.toast?.('메일함을 확인해주세요 📬');
  };
  document.getElementById('app')?.appendChild(wrap);
  input.focus();
}

async function initPayments(session: Session | null) {
  if (!TOSS_CLIENT_KEY) return;
  window.soulPay = {
    start: async (plan) => {
      if (!session) { window.toast?.('결제하려면 먼저 로그인해주세요 🔐'); window.go?.('s-me'); return; }
      try {
        const token = await accessToken();
        const res = await fetch('/api/payments/order', {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          body: JSON.stringify({ plan }),
        });
        if (!res.ok) throw new Error('order');
        const order = await res.json();
        const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
        const toss = await loadTossPayments(TOSS_CLIENT_KEY);
        const payment = toss.payment({ customerKey: session.user.id });
        await payment.requestPayment({
          method: 'CARD',
          amount: { currency: 'KRW', value: order.amount },
          orderId: order.orderId,
          orderName: order.orderName,
          successUrl: `${location.origin}/payments/success`,
          failUrl: `${location.origin}/payments/fail`,
          customerEmail: session.user.email || undefined,
        });
      } catch (e: unknown) {
        const code = (e as { code?: string })?.code;
        if (code === 'USER_CANCEL') return;
        window.toast?.('결제창을 열지 못했어요. 잠시 후 다시 시도해주세요');
      }
    },
  };
}

/** 990원 티켓으로 PRO 스킨 평생 소장 */
function makeShop() {
  window.soulShop = {
    unlockSkin: async (skin) => {
      const token = await accessToken();
      if (!token) return { ok: false, code: 'auth_required' };
      const r = await fetch('/api/skins', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify({ skin }) });
      const j = await r.json().catch(() => ({}));
      return r.ok ? { ok: true, skins: j.skins } : { ok: false, code: j.code };
    },
  };
}

/** 앱 시작: 전역 객체 준비 → 서버 이용권 동기화 → 화면 스크립트 로드 */
export async function startSoulcode() {
  if (window.__soulBooted) return;
  window.__soulBooted = true;
  window.Manseryeok = Manseryeok;
  window.soulConfig = { devTestPro: DEV_TEST_PRO && !TOSS_CLIENT_KEY, serverPro: false, providers: PROVIDERS, emailLogin: EMAIL_LOGIN, payTest: TOSS_CLIENT_KEY.startsWith('test_'), biz: bizLines(), freeBeta: process.env.NEXT_PUBLIC_FREE_BETA === '1' };

  let session: Session | null = null;
  if (SUPABASE_URL && SUPABASE_ANON) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON, { auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' } });
    session = (await supabase.auth.getSession()).data.session;
    supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'SIGNED_IN' && !session && next) location.reload();
      if (event === 'SIGNED_OUT' && session) location.reload();
    });
    window.soulConfig.serverPro = !!session;
    const providerName: Record<string, string> = { kakao: '카카오 계정', apple: 'Apple 계정', google: 'Google 계정', email: '이메일 계정' };
    window.soulAuth = {
      signIn: (provider) => { supabase!.auth.signInWithOAuth({ provider, options: { redirectTo: location.origin + '/app' } }); },
      emailPrompt: emailModal,
      signOut: async () => { await supabase!.auth.signOut(); },
      label: () => providerName[session?.user.app_metadata?.provider || 'email'] || '내 계정',
      deleteAccount: async () => {
        const token = await accessToken();
        if (!token) return false;
        const r = await fetch('/api/account/delete', { method: 'POST', headers: { authorization: `Bearer ${token}` } });
        if (!r.ok) return false;
        // 이 기기에 남은 기록도 정리 (스킨 등 단순 설정 포함)
        try { Object.keys(localStorage).filter((k) => k.startsWith('soulcode.') || k.startsWith('sb-')).forEach((k) => localStorage.removeItem(k)); } catch { /* noop */ }
        await supabase!.auth.signOut().catch(() => {});
        return true;
      },
    };

    if (session) {
      // 서버가 정한 이용권·AI 사용량을 화면 상태에 반영 (서버가 진실)
      try {
        const me = await fetch('/api/me', { headers: { authorization: `Bearer ${session.access_token}` } }).then((r) => r.json());
        setLocal('soulcode.pro', me.pro ? { active: true, plan: me.plan, until: me.until } : { active: false });
        setLocal('soulcode.ai.' + kstToday(), me.aiUsed || 0);
        if (typeof me.freeLimit === 'number') setLocal('soulcode.freeLimit', me.freeLimit);
        setLocal('soulcode.tickets', me.tickets || 0);
        if (Array.isArray(me.skins) && me.skins.length) {
          let cur: string[] = [];
          try { cur = JSON.parse(localStorage.getItem('soulcode.unlocks') || '[]') || []; } catch { /* noop */ }
          setLocal('soulcode.unlocks', [...new Set([...cur, ...me.skins])]);
        }
      } catch { /* 오프라인이면 지난 상태 유지 */ }
      const uid = session.user.id;
      const sample = makeSample();
      window.claude = {
        use: async (name: string) => {
          if (name === 'sample') return sample;
          if (name === 'db') return makeDb(uid);
          if (name === 'user') return { id: async () => uid, isOwner: () => true };
          return null;
        },
      };
    } else {
      const sample = makeSample(); // 로그인 전: 누르면 로그인 안내
      window.claude = { use: async (name: string) => (name === 'sample' ? sample : null) };
    }
  }
  await initPayments(session);
  if (session) makeShop();

  // 다국어 화면 뼈대 (app.js보다 먼저)
  await new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.src = '/soulcode/i18n.js';
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
  if ((window as unknown as { soulLang?: string }).soulLang && (window as unknown as { soulLang?: string }).soulLang !== 'ko') {
    await new Promise<void>((resolve) => {
      const s = document.createElement('script');
      s.src = '/soulcode/i18n-content.js';
      s.onload = () => resolve();
      s.onerror = () => resolve();
      document.body.appendChild(s);
    });
  }
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/soulcode/app.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('app.js load failed'));
    document.body.appendChild(s);
  });
  // 바이럴·도파민 장치 (app.js 다음)
  await new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.src = '/soulcode/viral.js';
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
  // 이모지 → 상형 한자 (맨 마지막)
  await new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.src = '/soulcode/glyph.js';
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });

  const qs = new URLSearchParams(location.search);
  if (qs.get('paid') === '1') { window.toast?.('PRO가 시작됐어요! 💎'); history.replaceState(null, '', location.pathname); }
  if (qs.get('paid') === 'ticket') { history.replaceState(null, '', location.pathname); setTimeout(() => (window as unknown as { afterTicket?: () => void }).afterTicket?.(), 500); }

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

export { supabase };
