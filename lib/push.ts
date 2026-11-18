import 'server-only';
import crypto from 'node:crypto';

/**
 * 웹 푸시(VAPID) — 별도 비밀 키를 두지 않고 SUPABASE_SERVICE_ROLE_KEY에서 결정적으로 파생해요.
 * 서비스 키를 바꾸면 VAPID 키도 바뀌어서, 기존 구독자는 알림을 한 번 다시 켜야 해요.
 * 본문 없는 푸시만 보내므로 페이로드 암호화가 필요 없고, 알림 문구는 서비스워커가 정해요.
 */
const N = BigInt('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551');
const b64u = (b: Buffer) => b.toString('base64url');
const SUBJECT = process.env.VAPID_SUBJECT || process.env.NEXT_PUBLIC_SITE_URL || 'https://soulcode-app-orcin.vercel.app';
let cached: { pub: string; key: crypto.KeyObject } | null = null;

export function vapid() {
  if (cached) return cached;
  const ikm = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!ikm) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
  const seed = Buffer.from(crypto.hkdfSync('sha256', ikm, 'soulcode-vapid', 'p256-v1', 32));
  const d = (BigInt('0x' + seed.toString('hex')) % (N - 1n)) + 1n;
  const dBuf = Buffer.from(d.toString(16).padStart(64, '0'), 'hex');
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.setPrivateKey(dBuf);
  const pubRaw = ecdh.getPublicKey();
  const key = crypto.createPrivateKey({
    key: { kty: 'EC', crv: 'P-256', d: b64u(dBuf), x: b64u(pubRaw.subarray(1, 33)), y: b64u(pubRaw.subarray(33, 65)) },
    format: 'jwk',
  });
  cached = { pub: b64u(pubRaw), key };
  return cached;
}

function jwt(aud: string) {
  const { key } = vapid();
  const enc = (o: object) => b64u(Buffer.from(JSON.stringify(o)));
  const data = `${enc({ typ: 'JWT', alg: 'ES256' })}.${enc({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: SUBJECT })}`;
  const sig = crypto.sign('sha256', Buffer.from(data), { key, dsaEncoding: 'ieee-p1363' });
  return `${data}.${b64u(sig)}`;
}

/** 본문 없는 푸시 1건. 반환값: HTTP 상태 (404/410이면 만료된 구독) */
export async function sendEmptyPush(endpoint: string): Promise<number> {
  const u = new URL(endpoint);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `vapid t=${jwt(u.origin)}, k=${vapid().pub}`, TTL: String(6 * 3600), Urgency: 'normal', 'Content-Length': '0' },
  });
  return res.status;
}
