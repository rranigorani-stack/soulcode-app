import 'server-only';
import { admin } from '@/lib/server';
import { sendEmptyPush } from '@/lib/push';

export type Lang = 'ko' | 'en' | 'ja';
export const asLang = (v: unknown): Lang => (v === 'en' || v === 'ja' ? v : 'ko');
export const okEndpoint = (s: unknown): s is string => {
  if (typeof s !== 'string' || s.length > 1000) return false;
  try { return new URL(s).protocol === 'https:'; } catch { return false; }
};

/** 아침 기본 문구 (언어별) */
export const MORNING: Record<Lang, [string, string][]> = {
  ko: [
    ['오늘의 카드가 리필됐어요 🌙', '우주가 오늘 너한테 할 말이 있대. 한 장 뽑아볼까?'],
    ['좋은 아침 ☀️ 오늘 우주 날씨 확인!', '오늘 일진이랑 카드 한 장이면 하루 준비 끝'],
    ['오늘 뭐 됨? 🔮', '10초면 돼요. 오늘의 카드 뽑으러 가기'],
    ['출석 체크 시간 🔥', '연속 출석 이어가고 오늘의 럭키템도 확인해요'],
  ],
  en: [
    ["Today's card is ready 🌙", 'The universe has something to tell you. Draw one?'],
    ['Good morning ☀️ Check your cosmic weather', "Today's energy + one card and you're set"],
    ["What's my vibe today? 🔮", "Takes 10 seconds. Go draw today's card"],
    ['Check-in time 🔥', "Keep your streak and grab today's lucky item"],
  ],
  ja: [
    ['今日のカードが届きました 🌙', '宇宙があなたに伝えたいことがあるみたい。1枚引いてみる?'],
    ['おはよう ☀️ 今日の宇宙天気をチェック', '今日の運気とカード1枚で準備完了'],
    ['今日どうなる? 🔮', '10秒で完了。今日のカードを引きに行こう'],
    ['ログインの時間 🔥', '連続記録を続けて、今日のラッキーアイテムもチェック'],
  ],
};

/** 한국 시간 밤 10시~아침 8시에는 바로 보내지 않아요 (내용함에 남겨 두고 아침 알림 때 보여줘요) */
export function quietNow() {
  const h = (new Date().getUTCHours() + 9) % 24;
  return h >= 22 || h < 8;
}

/**
 * 친구 행동 알림: 내용함에 넣고, 조용한 시간이 아니며 오늘(24시간) 이미 친구 알림을 보낸 적이 없으면 깨워요.
 * 아침 알림과 합쳐 하루 최대 2개.
 */
export async function notify(endpoint: string, title: string, body: string, url: string) {
  const db = admin();
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await db.from('push_inbox').select('id', { count: 'exact', head: true }).eq('endpoint', endpoint).eq('delivered', true).gte('created_at', since);
  await db.from('push_inbox').insert({ endpoint, title, body, url });
  if (quietNow() || (count ?? 0) >= 1) return 'queued';
  const st = await sendEmptyPush(endpoint).catch(() => 0);
  if (st === 404 || st === 410) { await db.from('push_subscriptions').delete().eq('endpoint', endpoint); await db.from('duo_links').update({ host_endpoint: null }).eq('host_endpoint', endpoint); }
  return st;
}

export const DUO_PUSH: Record<Lang, (nick: string) => [string, string]> = {
  ko: (n) => [`💞 ${n}님이 궁합 검사를 끝냈어요`, '둘의 궁합 점수가 공개됐어요. 지금 확인해봐요!'],
  en: (n) => [`💞 ${n} finished the match test`, 'Your compatibility score is out. Check it now!'],
  ja: (n) => [`💞 ${n}さんが相性診断を終えました`, 'ふたりの相性スコアが公開されました。今すぐチェック!'],
};
