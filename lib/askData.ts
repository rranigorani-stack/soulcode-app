/** 친구들이 보는 나: 질문과 보기 (클라이언트·서버 공용). 칭찬·재미 위주의 정해진 보기만 써서 악플이 들어갈 틈이 없어요. */
export const CHARMS = ['😆 웃음소리', '👀 눈빛', '🙌 리액션', '🧠 센스', '🫶 다정함', '👗 패션', '🎙️ 목소리', '🤝 의리'];
export const LOVES = ['💘 직진 고백형', '🙄 츤데레형', '🎣 밀당 장인', '🐶 헌신 댕댕이형', '📵 연락 귀찮형', '🎁 서프라이즈 장인'];
export const ANIMALS = ['🐶 강아지상', '🐱 고양이상', '🦊 여우상', '🐻 곰상', '🐰 토끼상', '🦌 사슴상', '🦖 공룡상', '🐹 햄스터상'];
export const ISLANDS = ['👑 리더', '🍳 요리 담당', '🎉 분위기 메이커', '🏕️ 생존 전문가', '🚤 혼자 먼저 탈출', '😴 그냥 잘 사람'];
export const MIN_REVEAL = 3; // 이 수 미만이면 결과를 숨겨 누가 뭘 골랐는지 추측하기 어렵게
export const MAX_ANSWERS = 300;

export type AskAnswer = { teto: boolean; ei: 'E' | 'I'; sn: 'S' | 'N'; tf: 'T' | 'F'; jp: 'J' | 'P'; charm: number; love: number; animal: number; island: number };
export type AskResult = {
  count: number;
  tetoPct: number;
  mbti: string;
  axes: { ei: number; sn: number; tf: number; jp: number }; // 각 축에서 앞 글자(E,S,T,J) 비율 %
  charm: number[]; love: number[]; animal: number[]; island: number[]; // 보기별 표 수
};

export function parseAnswer(v: unknown): AskAnswer | null {
  const o = v as Record<string, unknown> | null;
  if (!o) return null;
  const pick = (k: string, n: number) => { const x = Number(o[k]); return Number.isInteger(x) && x >= 0 && x < n ? x : -1; };
  const a = { teto: o.teto === true, ei: o.ei, sn: o.sn, tf: o.tf, jp: o.jp, charm: pick('charm', CHARMS.length), love: pick('love', LOVES.length), animal: pick('animal', ANIMALS.length), island: pick('island', ISLANDS.length) };
  if (typeof o.teto !== 'boolean') return null;
  if (!['E', 'I'].includes(a.ei as string) || !['S', 'N'].includes(a.sn as string) || !['T', 'F'].includes(a.tf as string) || !['J', 'P'].includes(a.jp as string)) return null;
  if (a.charm < 0 || a.love < 0 || a.animal < 0 || a.island < 0) return null;
  return a as AskAnswer;
}

export function aggregate(rows: AskAnswer[]): AskResult {
  const n = rows.length || 1;
  const pct = (f: (r: AskAnswer) => boolean) => Math.round((rows.filter(f).length / n) * 100);
  const tally = (k: 'charm' | 'love' | 'animal' | 'island', len: number) => { const t = Array(len).fill(0); rows.forEach((r) => t[r[k]]++); return t; };
  const axes = { ei: pct((r) => r.ei === 'E'), sn: pct((r) => r.sn === 'S'), tf: pct((r) => r.tf === 'T'), jp: pct((r) => r.jp === 'J') };
  const mbti = (axes.ei >= 50 ? 'E' : 'I') + (axes.sn >= 50 ? 'S' : 'N') + (axes.tf >= 50 ? 'T' : 'F') + (axes.jp >= 50 ? 'J' : 'P');
  return { count: rows.length, tetoPct: pct((r) => r.teto), mbti, axes, charm: tally('charm', CHARMS.length), love: tally('love', LOVES.length), animal: tally('animal', ANIMALS.length), island: tally('island', ISLANDS.length) };
}
export const topIdx = (t: number[]) => t.indexOf(Math.max(...t));
export const validAskCode = (c: unknown): c is string => typeof c === 'string' && /^[a-z2-9]{8}$/.test(c);
