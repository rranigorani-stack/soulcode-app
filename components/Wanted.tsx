'use client';
import { BizInfo } from './BizInfo';
import { useRef, useState } from 'react';
import { EL, EL_EN, EL_JA, MBTI_BEST, wanted, type Lang, type Wanted as W } from '@/lib/wanted';
import { drawMontage, type Gender } from './montage';

const CW = 1080, CH = 1920, INK = '#1B1433', PAPER = '#FFFDF8', PINK = '#FF8AD0', YEL = '#FFE04D', MUTED = '#6E6189';
const SANS = '"Noto Sans KR", sans-serif', DISPLAY = '"Black Han Sans", sans-serif', JUA = '"Jua", sans-serif', ARCHIVO = '"Archivo Black", sans-serif';
const MBTIS = Object.keys(MBTI_BEST);
const JA_DISPLAY = '"Dela Gothic One", "Black Han Sans", sans-serif', JA_ROUND = '"Zen Maru Gothic", "Jua", sans-serif';

function wrap(c: CanvasRenderingContext2D, t: string, max: number) {
  const out: string[] = []; let line = '';
  for (const ch of t) { if (c.measureText(line + ch).width > max && line) { out.push(line); line = ch.trimStart(); } else line += ch; }
  if (line) out.push(line); return out;
}
function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, stroke = INK, lw = 5, shadow = 0) {
  if (shadow) { c.fillStyle = INK; c.beginPath(); c.roundRect(x + shadow, y + shadow, w, h, r); c.fill(); }
  c.fillStyle = fill; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill();
  if (lw) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
}

const SERIF = '"Nanum Myeongjo", "Noto Serif KR", serif';
const BROWN = '#3B2414', BROWN2 = '#6B4A2C';
const TYPE_KO = (t: 'teto' | 'egen', g: Gender) => `${t === 'teto' ? '테토' : '에겐'}${g === 'f' ? '녀' : '남'}`;
const TYPE_EN = (t: 'teto' | 'egen', g: Gender) => `${t === 'teto' ? 'Bold' : 'Soft'} ${g === 'f' ? 'Girl' : 'Boy'}`;
const TYPE_JA = (t: 'teto' | 'egen', g: Gender) => `${t === 'teto' ? '肉食系' : '草食系'}${g === 'f' ? '女子' : '男子'}`;
const TX = {
  ja: {
    type: TYPE_JA, sub: '💘 運命の相手を探しています 💘', el: (i: number) => `${EL[i].emoji} ${EL_JA[i].name}の気`,
    bounty: '★ 懸賞金', reward: (n: number) => `恋愛運 +${n}%`,
    rows: (r: W) => [['命式の手がかり', `日干 ${r.stem}${r.stemHap ? '(干合)' : ''} · ${r.animal}`], ['人相', `${r.looks[0]}、${r.looks[1]}`], ['出没エリア', `${r.day} ${r.time} · ${r.place}`], ['注意事項', r.warn]],
    labW: 200, rowFont: 25,
    basis: (r: W, nick: string) => `✦ 手配の根拠: ${nick ? nick + 'さん' : '私'}の命式に${EL_JA[r.lackEl].name}が${r.counts[r.lackEl]}つ · 陽${r.yang}/6 · 事件番号 ${r.caseNo} ✦`,
    foot: (h: string) => `${h}/ja/wanted · 韓国の四柱推命コンテンツ`,
  },
  ko: {
    type: TYPE_KO, sub: '💘 운명의 상대를 찾습니다 💘', el: (i: number) => `${EL[i].emoji} ${EL[i].ko} 기운`,
    bounty: '★ 현상금', reward: (n: number) => `연애운 +${n}%`,
    rows: (r: W) => [['사주 단서', `일간 ${r.stem}${r.stemHap ? ' (천간합)' : ''} · ${r.animal} 육합`], ['인상착의', `${r.looks[0]}, ${r.looks[1]}`], ['출몰 지역', `${r.day} ${r.time} · ${r.place}`], ['주의 사항', r.warn]],
    labW: 150, rowFont: 27,
    basis: (r: W, nick: string) => `✦ 수배 근거: ${nick ? nick + '님' : '내'} 사주 ${EL[r.lackEl].ko} 기운 ${r.counts[r.lackEl]}개 · 양기운 ${r.yang}/6 · 사건번호 ${r.caseNo} ✦`,
    foot: (h: string) => `${h}/wanted · 재미로 보는 사주 콘텐츠`,
  },
  en: {
    type: TYPE_EN, sub: '💘 Looking for my soulmate 💘', el: (i: number) => `${EL[i].emoji} ${EL_EN[i].name}`,
    bounty: '★ Reward', reward: (n: number) => `Love luck +${n}%`,
    rows: (r: W) => [['Saju clue', `Day stem ${r.stem}${r.stemHap ? ' (perfect match)' : ''} · ${r.animal} year`], ['Looks', `${r.looks[0]}, ${r.looks[1]}`], ['Last seen', `${r.day} ${r.time} · ${r.place}`], ['Warning', r.warn]],
    labW: 170, rowFont: 26,
    basis: (r: W, nick: string) => `✦ Evidence: ${nick ? nick + "'s" : 'my'} chart has ${r.counts[r.lackEl] ? 'only ' + r.counts[r.lackEl] : 'no'} ${EL_EN[r.lackEl].name} · Yang ${r.yang}/6 · Case #${r.caseNo} ✦`,
    foot: (h: string) => `${h}/en/wanted · Korean Saju fortune, just for fun`,
  },
};

function loadImg(src: string): Promise<HTMLImageElement | null> {
  return new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
}

function sticker(c: CanvasRenderingContext2D, x: number, y: number, t: string, bg: string, rot: number, size = 34, font = JUA) {
  c.save(); c.translate(x, y); c.rotate(rot); c.font = `${size}px ${font}`;
  const w = c.measureText(t).width + 44, h = size + 30;
  rr(c, -w / 2, -h / 2, w, h, h / 2, bg, INK, 4, 5);
  c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, 0, 2); c.restore();
}
function star(c: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  c.save(); c.translate(x, y); c.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, rad = i % 2 ? r * 0.38 : r; c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); }
  c.closePath(); c.fillStyle = fill; c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.restore();
}

async function draw(r: W, nick: string, myMbti: string, gender: Gender, lang: Lang = 'ko') {
  const T = TX[lang];
  const FD = lang === 'ja' ? JA_DISPLAY : DISPLAY, FR = lang === 'ja' ? JA_ROUND : JUA;
  await Promise.all([`150px ${ARCHIVO}`, `60px ${FD}`, `40px ${FR}`, `500 30px ${SANS}`, `700 30px ${SANS}`].map((f) => document.fonts.load(f, '수배 WANTED 가나다 運命の相手')));
  const art = (await loadImg(`/wanted/${gender}-${r.type}-${r.group.toLowerCase()}.webp`)) ?? (await loadImg(`/wanted/${gender}-${r.type}.webp`)) ?? (await loadImg(`/wanted/${gender}.webp`));
  const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
  const c = cv.getContext('2d')!;
  const e = EL[r.el];
  // 배경: 홈페이지 핑크 + 홀로 그라데이션 + 도트
  const bg = c.createLinearGradient(0, 0, CW, CH);
  ['#FFC2EC', '#D9C6FF', '#BFEAFF', '#FFF3B0', '#FFC2EC'].forEach((col, i) => bg.addColorStop(i / 4, col));
  c.fillStyle = bg; c.fillRect(0, 0, CW, CH);
  c.fillStyle = 'rgba(27,20,51,.07)';
  for (let y = 20; y < CH; y += 44) for (let x = (y / 44) % 2 ? 42 : 20; x < CW; x += 44) { c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); }

  // 포스터 카드
  const px = 70, py = 90, pw = CW - 140, ph = CH - 200;
  rr(c, px, py, pw, ph, 48, PAPER, INK, 6, 14);
  // 테이프
  for (const [x, rot] of [[px + 90, -0.35], [px + pw - 90, 0.35]] as const) {
    c.save(); c.translate(x, py + 6); c.rotate(rot); c.fillStyle = 'rgba(255,225,77,.85)'; c.fillRect(-70, -22, 140, 44); c.restore();
  }

  // WANTED 로고 (홈페이지 logo 스타일)
  c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  c.font = `150px ${ARCHIVO}`; c.lineJoin = 'round';
  c.fillStyle = INK; c.fillText('WANTED', CW / 2 + 9, 300 + 9);
  c.fillStyle = PINK; c.fillText('WANTED', CW / 2 + 9, 300 + 9);
  c.lineWidth = 12; c.strokeStyle = INK; c.strokeText('WANTED', CW / 2, 300);
  c.fillStyle = '#fff'; c.fillText('WANTED', CW / 2, 300);
  c.font = `36px ${FR}`; c.fillStyle = MUTED; c.fillText(T.sub, CW / 2, 360);

  // 사진 프레임 (둥근 카드)
  const fx = 160, fy = 400, fw = CW - 320, fh = 780;
  rr(c, fx, fy, fw, fh, 40, '#fff', INK, 6, 10);
  c.save(); c.beginPath(); c.roundRect(fx + 3, fy + 3, fw - 6, fh - 6, 37); c.clip();
  if (art) {
    const sc = Math.max(fw / art.width, fh / art.height), w = art.width * sc, h = art.height * sc;
    c.drawImage(art, fx + (fw - w) / 2, fy + (fh - h) * 0.2, w, h);
  } else {
    const g2 = c.createLinearGradient(fx, fy, fx, fy + fh); g2.addColorStop(0, '#FFF6FB'); g2.addColorStop(1, e.color + '55');
    c.fillStyle = g2; c.fillRect(fx, fy, fw, fh);
    drawMontage(c, CW / 2, fy + fh / 2 + 40, 2.3, { gender, el: r.el, elColor: e.color, mbti: r.mbti, seed: r.seed });
  }
  c.restore();
  // 스티커들
  star(c, fx + 10, fy + 20, 46, YEL);
  star(c, fx + fw - 6, fy + fh - 150, 34, '#7FE3F0');
  sticker(c, fx + fw - 120, fy + 60, `${T.type(r.type, gender)} ♡`, PINK, 0.14, lang === 'en' ? 36 : lang === 'ja' ? 34 : 42, FR);
  sticker(c, fx + 130, fy + fh - 10, r.mbti, YEL, -0.08, 44, FR);
  sticker(c, fx + fw - 150, fy + fh - 10, T.el(r.el), '#fff', 0.07, 36, FR);

  // 이름 + 현상금
  c.textAlign = 'center'; c.fillStyle = INK;
  c.font = `76px ${FD}`; c.fillText(`${T.type(r.type, gender)} · ${r.mbti}`, CW / 2, 1300);
  const bw = 640, bx = (CW - bw) / 2, by = 1330;
  rr(c, bx, by, bw, 100, 50, YEL, INK, 5, 6);
  c.fillStyle = INK; c.font = `36px ${FR}`; c.textAlign = 'left'; c.fillText(T.bounty, bx + 40, by + 64);
  c.font = `${lang === 'en' ? 40 : 50}px ${FD}`; c.textAlign = 'right'; c.fillText(T.reward(r.reward), bx + bw - 40, by + (lang === 'en' ? 65 : 68));

  // 단서 카드 (귀여운 메모지 스타일)
  const cx = 120, cy = 1462, cwid = CW - 240;
  const COLS = [YEL, PINK, '#7FE3F0', '#B9A6FF'];
  const rows = T.rows(r).map(([a, b], i) => [a, b, COLS[i]] as [string, string, string]);
  c.font = `${T.rowFont}px ${FR}`;
  const labW = T.labW, txtX = cx + 40 + labW + 16, txtW = cx + cwid - 34 - txtX;
  const laid = rows.map(([lab, t, col]) => ({ lab, col, lines: wrap(c, t, txtW) }));
  const rowH = (n: number) => Math.max(52, n * 36 + 16);
  const chh = laid.reduce((h, l) => h + rowH(l.lines.length), 0) + 36;
  rr(c, cx, cy, cwid, chh, 32, '#FFF4FB', INK, 4, 6);
  // 점선 안쪽 테두리
  c.save(); c.setLineDash([10, 10]); c.strokeStyle = PINK; c.lineWidth = 3; c.beginPath(); c.roundRect(cx + 12, cy + 12, cwid - 24, chh - 24, 24); c.stroke(); c.restore();
  let y = cy + 18;
  for (const l of laid) {
    const h = rowH(l.lines.length), mid = y + 34;
    star(c, cx + 46, mid - 6, 15, l.col);
    c.font = `${T.rowFont}px ${FR}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    c.fillStyle = MUTED; c.fillText(l.lab, cx + 72, mid + 4);
    c.fillStyle = INK;
    l.lines.forEach((w, i) => c.fillText(w, txtX, mid + 4 + i * 36));
    y += h;
  }
  // 모서리 별 장식
  star(c, cx + cwid - 8, cy + 6, 22, YEL);
  star(c, cx + 10, cy + chh - 6, 16, PINK);

  c.textAlign = 'center'; c.font = `22px ${FR}`; c.fillStyle = MUTED;
  y = cy + chh + 40;
  c.fillText(T.basis(r, nick), CW / 2, y);
  // 하단 CTA (카드 밖)
  c.font = `38px ${ARCHIVO}`; c.fillStyle = '#fff'; c.lineWidth = 7; c.strokeStyle = INK;
  c.strokeText('SOULCODE', CW / 2, CH - 52); c.fillText('SOULCODE', CW / 2, CH - 52);
  c.font = `26px ${FR}`; c.fillStyle = INK; c.fillText(T.foot(location.host), CW / 2, CH - 16);
  void myMbti; void SERIF; void BROWN; void BROWN2;
  return cv;
}

const UI = {
  ja: {
    badge: '🚨 韓国式四柱推命 指名手配システム', h1: ['運命の相手', '指名手配書'],
    sub: <>あなたの命式に<b>足りない気</b>と<b>MBTIの相性</b>から<br />あなたを満たしてくれる人の似顔絵を描きます。</>,
    birth: '生年月日', mbti: 'わたしのMBTI', want: '探している相手', wantOpts: [['f', '👩 女性'], ['m', '👨 男性'], ['any', '🌈 どちらでも']] as const,
    nick: 'わたしの名前 (任意)', nickPh: '例: はる', go: '手配書を発行する 🚨',
    note: '生年月日はこの端末の中だけで計算し、サーバーには送りません · 占いエンタメです',
    badYear: '1940〜2025年の生年月日を入れてください',
    loading: <>命式の手がかりから似顔絵を作成中...<br /><small>足りない五行を追跡中 🕵️</small></>,
    save: '📸 手配書を保存 · ストーリーにシェア', report: '', reportHref: '',
    spread: '💌 友達に手配書を回す', ask: '🤔 友達は私を肉食系だと思ってる? 聞いてみる', askHref: '/ja/ask?utm_source=wanted_done', again: 'もう一度',
    file: (m: string) => `運命の相手_手配書_${m}.png`,
    shareText: (r: W, o: string) => `運命の相手を指名手配中 🚨 ${EL_JA[r.el].name}の気 · ${r.mbti}… これってあの人? やってみて 👉 ${o}/ja/wanted?utm_source=wanted_share`,
    linkText: (o: string) => `生年月日+MBTIで運命の相手の手配書が出る 🚨 ${o}/ja/wanted?utm_source=wanted_link`,
    copied: 'リンクをコピーしました! グループLINEで回してね 🚨', copyPrompt: 'このリンクをコピーしてください', path: '/ja/wanted',
    alt: (r: W) => `運命の相手の手配書: ${EL_JA[r.el].name}の気 ${r.mbti}`,
  },
  ko: {
    badge: '🚨 사주 정밀 분석 수배 시스템', h1: ['운명의 상대', '수배전단 뽑기'],
    sub: <>내 사주에 <b>부족한 기운</b>과 <b>MBTI 찰떡 궁합</b>으로<br />나를 채워줄 사람의 몽타주를 그려드려요.</>,
    birth: '생년월일 (양력)', mbti: '내 MBTI', want: '찾는 상대', wantOpts: [['f', '👩 여자'], ['m', '👨 남자'], ['any', '🌈 상관없음']] as const,
    nick: '내 이름 (선택)', nickPh: '예: 하루', go: '수배전단 발행하기 🚨',
    note: '생일은 이 기기 안에서만 계산하고 서버로 보내지 않아요 · 재미로 보는 콘텐츠예요',
    badYear: '1940~2025년 사이 생일을 넣어주세요',
    loading: <>사주 단서로 몽타주 그리는 중...<br /><small>부족한 오행 추적 중 🕵️</small></>,
    save: '📸 수배전단 저장 · 스토리 공유', report: '🔎 신고하기: 그 사람이랑 궁합 보기', reportHref: '/?go=match&utm_source=wanted',
    spread: '💌 친구한테 수배전단 돌리기', ask: '🤔 친구들은 나를 테토로 볼까? 물어보기', askHref: '/ask?utm_source=wanted_done', again: '다시 뽑기',
    file: (m: string) => `운명의상대_수배전단_${m}.png`,
    shareText: (r: W, o: string) => `내 운명의 상대 수배 중 🚨 ${EL[r.el].name} 기운 ${r.mbti}… 이거 완전 걔 아님? 너도 해봐 👉 ${o}/wanted?utm_source=wanted_share`,
    linkText: (o: string) => `생일+MBTI 넣으면 운명의 상대 수배전단 나옴 🚨 ${o}/wanted?utm_source=wanted_link`,
    copied: '링크를 복사했어요! 단톡방에 수배전단 돌리기 🚨', copyPrompt: '이 링크를 복사해 주세요', path: '/wanted',
    alt: (r: W) => `운명의 상대 수배전단: ${EL[r.el].name} 기운 ${r.mbti}`,
  },
  en: {
    badge: '🚨 Korean Saju soulmate search', h1: ['WANTED:', 'My Soulmate'],
    sub: <>Your Korean birth chart shows the <b>energy you lack</b>.<br />We draw the person who completes you, matched with your <b>MBTI</b>.</>,
    birth: 'Date of birth', mbti: 'My MBTI', want: 'Looking for', wantOpts: [['f', '👩 Girl'], ['m', '👨 Boy'], ['any', '🌈 Either']] as const,
    nick: 'My name (optional)', nickPh: 'e.g. Haru', go: 'Print my WANTED poster 🚨',
    note: 'Your birthday is calculated on this device only and never sent to a server · Just for fun',
    badYear: 'Please enter a birthday between 1940 and 2025',
    loading: <>Drawing the sketch from your chart...<br /><small>Tracking your missing element 🕵️</small></>,
    save: '📸 Save poster · Share to story', report: '💞 Check our compatibility', reportHref: '/?go=match&utm_source=wanted_en',
    spread: '💌 Send to friends', ask: '🤔 Ask friends: am I a Bold or Soft type?', askHref: '/en/ask?utm_source=wanted_done', again: 'Try again',
    file: (m: string) => `soulmate_wanted_${m}.png`,
    shareText: (r: W, o: string) => `My soulmate is WANTED 🚨 ${EL_EN[r.el].name} energy · ${r.mbti}… sounds familiar? Try yours 👉 ${o}/en/wanted?utm_source=wanted_share`,
    linkText: (o: string) => `Enter your birthday + MBTI and get your soulmate's WANTED poster 🚨 ${o}/en/wanted?utm_source=wanted_link`,
    copied: 'Link copied! Drop it in your group chat 🚨', copyPrompt: 'Copy this link', path: '/en/wanted',
    alt: (r: W) => `Soulmate WANTED poster: ${EL_EN[r.el].name} energy ${r.mbti}`,
  },
};

export default function Wanted({ lang = 'ko' }: { lang?: Lang }) {
  const U = UI[lang];
  const [birth, setBirth] = useState('');
  const [mbti, setMbti] = useState('');
  const [nick, setNick] = useState('');
  const [want, setWant] = useState<Gender | 'any' | ''>('');
  const [stage, setStage] = useState<'form' | 'loading' | 'done'>('form');
  const [img, setImg] = useState('');
  const [res, setRes] = useState<W | null>(null);
  const blobRef = useRef<Blob | null>(null);

  async function run() {
    const [y, m, d] = birth.split('-').map(Number);
    if (!y || y < 1940 || y > 2025) { alert(U.badYear); return; }
    setStage('loading');
    const r = wanted(y, m, d, mbti, lang); setRes(r);
    const gd: Gender = want === 'f' || want === 'm' ? want : (r.seed % 2 ? 'f' : 'm');
    const [cv] = await Promise.all([draw(r, nick.trim(), mbti, gd, lang), new Promise((ok) => setTimeout(ok, 1600))]);
    setImg(cv.toDataURL('image/jpeg', 0.92));
    cv.toBlob((b) => { blobRef.current = b; }, 'image/png');
    setStage('done');
    try { localStorage.setItem('soulcode.prefill', JSON.stringify({ birth, nick: nick.trim(), mbti })); } catch { /* noop */ }
  }
  async function share() {
    const b = blobRef.current; if (!b || !res) return;
    const file = new File([b], U.file(res.mbti), { type: 'image/png' });
    const text = U.shareText(res, location.origin);
    try { if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text }); return; } } catch { return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = file.name; a.click();
  }
  async function copyLink() {
    const text = U.linkText(location.origin);
    try { await navigator.clipboard.writeText(text); alert(U.copied); } catch { prompt(U.copyPrompt, `${location.origin}${U.path}`); }
  }

  return (
    <div className="wanted-wrap">
      <main className={'past' + (lang === 'ja' ? ' ja' : '')}>
        {stage === 'form' && (
          <section>
            <div className="past-badge wanted-badge">{U.badge}</div>
            <h1 className="h-display">{U.h1[0]}<br />{U.h1[1]}</h1>
            <p className="past-sub">{U.sub}</p>
            <label className="lb">{U.birth}</label>
            <input className="field" type="date" min="1940-01-01" max="2025-12-31" value={birth} onChange={(e) => setBirth(e.target.value)} />
            <label className="lb">{U.mbti}</label>
            <div className="wanted-mbti">
              {MBTIS.map((k) => <button key={k} type="button" className={'chip' + (mbti === k ? ' sel' : '')} onClick={() => setMbti(k)}>{k}</button>)}
            </div>
            <label className="lb">{U.want}</label>
            <div className="chips-sel wanted-want">
              {U.wantOpts.map(([k, l]) => <button key={k} type="button" className={'chip' + (want === k ? ' sel' : '')} onClick={() => setWant(k)}>{l}</button>)}
            </div>
            <label className="lb">{U.nick}</label>
            <input className="field" maxLength={10} placeholder={U.nickPh} value={nick} onChange={(e) => setNick(e.target.value)} />
            <button className="btn" style={{ marginTop: 22 }} disabled={!birth || !mbti || !want} onClick={run}>{U.go}</button>
            <p className="past-note">{U.note}</p>
          </section>
        )}
        {stage === 'loading' && (
          <section className="past-loading"><div className="past-scroll">🔍</div><p>{U.loading}</p></section>
        )}
        {stage === 'done' && res && (
          <section className="past-done">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={U.alt(res)} className="past-img" />
            <button className="btn" onClick={share}>{U.save}</button>
            {lang === 'ko' && <a className="btn pink" style={{ marginTop: 10, textAlign: 'center' }} href={U.reportHref}>{U.report}</a>}
            <button className="btn ghost" style={{ marginTop: 10 }} onClick={copyLink}>{U.spread}</button>
            <a className="btn ghost" style={{ marginTop: 10, textAlign: 'center' }} href={U.askHref}>{U.ask}</a>
            <button className="again" onClick={() => { setStage('form'); setImg(''); }}>{U.again}</button>
          </section>
        )}
        {lang === 'ja'
          ? <footer className="past-foot"><a href="/ja/ask">💌 友達から見た私</a> · <a href="/wanted">한국어</a> · <a href="/en/wanted">English</a><br /><a href="/terms">利用規約 (韓国語)</a> · <a href="/privacy">プライバシー (韓国語)</a></footer>
          : lang === 'ko'
          ? <footer className="past-foot"><a href="/ask">💌 친구들이 보는 나</a> · <a href="/terms">이용약관</a> · <a href="/privacy">개인정보처리방침</a> · <a href="/">소울코드</a> · <a href="/en/wanted">English</a> · <a href="/ja/wanted">日本語</a><BizInfo /></footer>
          : <footer className="past-foot"><a href="/en/ask">💌 How friends see me</a> · <a href="/wanted">한국어</a> · <a href="/ja/wanted">日本語</a><br /><a href="/terms">Terms (Korean)</a> · <a href="/privacy">Privacy (Korean)</a></footer>}
      </main>
    </div>
  );
}
