import 'server-only';
import crypto from 'node:crypto';

export const MAX_MEMBERS = 30;
const ALPHA = 'abcdefghjkmnpqrstuvwxyz23456789';
export const newCode = () => Array.from(crypto.randomBytes(8), (b) => ALPHA[b % ALPHA.length]).join('');
export const newToken = () => crypto.randomBytes(24).toString('base64url');
export const hashToken = (t: string) => crypto.createHash('sha256').update(t).digest('hex');
export const validCode = (c: unknown): c is string => typeof c === 'string' && /^[a-z2-9]{8}$/.test(c);

/** 궁합 지도에는 생년월일을 저장하지 않아요: 별명, MBTI, 일간(0~9), 띠(0~11)만 */
export type Member = { nick: string; mbti: string; stem: number; yb: number };
export function parseMember(v: unknown): Member | null {
  const o = v as Record<string, unknown> | null;
  if (!o) return null;
  const nick = typeof o.nick === 'string' ? o.nick.trim().slice(0, 10) : '';
  const mbti = typeof o.mbti === 'string' ? o.mbti.toUpperCase() : '';
  const stem = Number(o.stem), yb = Number(o.yb);
  if (!nick || !/^[EI][SN][TF][JP]$/.test(mbti) || !Number.isInteger(stem) || stem < 0 || stem > 9 || !Number.isInteger(yb) || yb < 0 || yb > 11) return null;
  return { nick, mbti, stem, yb };
}
