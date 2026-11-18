'use client';
import { useRef, useState } from 'react';
import { EL, MBTI_BEST, wanted, type Wanted as W } from '@/lib/wanted';
import { drawMontage, type Gender } from './montage';

const CW = 1080, CH = 1920, INK = '#1B1433', PAPER = '#FFFDF8', PINK = '#FF8AD0', YEL = '#FFE04D', MUTED = '#6E6189';
const SANS = '"Noto Sans KR", sans-serif', DISPLAY = '"Black Han Sans", sans-serif', JUA = '"Jua", sans-serif', ARCHIVO = '"Archivo Black", sans-serif';
const MBTIS = Object.keys(MBTI_BEST);

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
const TYPE_LABEL = (t: 'teto' | 'egen', g: Gender) => `${t === 'teto' ? '테토' : '에겐'}${g === 'f' ? '녀' : '남'}`;

function loadImg(src: string): Promise<HTMLImageElement | null> {
  return new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
}

function sticker(c: CanvasRenderingContext2D, x: number, y: number, t: string, bg: string, rot: number, size = 34) {
  c.save(); c.translate(x, y); c.rotate(rot); c.font = `${size}px ${JUA}`;
  const w = c.measureText(t).width + 44, h = size + 30;
  rr(c, -w / 2, -h / 2, w, h, h / 2, bg, INK, 4, 5);
  c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, 0, 2); c.restore();
}
function star(c: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  c.save(); c.translate(x, y); c.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, rad = i % 2 ? r * 0.38 : r; c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); }
  c.closePath(); c.fillStyle = fill; c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.restore();
}

async function draw(r: W, nick: string, myMbti: string, gender: Gender) {
  await Promise.all([`150px ${ARCHIVO}`, `60px ${DISPLAY}`, `40px ${JUA}`, `500 30px ${SANS}`, `700 30px ${SANS}`].map((f) => document.fonts.load(f, '수배 WANTED 가나다')));
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
  c.font = `36px ${JUA}`; c.fillStyle = MUTED; c.fillText('💘 운명의 상대를 찾습니다 💘', CW / 2, 360);

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
  sticker(c, fx + fw - 110, fy + 60, `${TYPE_LABEL(r.type, gender)} ♡`, PINK, 0.14, 42);
  sticker(c, fx + 130, fy + fh - 10, r.mbti, YEL, -0.08, 44);
  sticker(c, fx + fw - 150, fy + fh - 10, `${e.emoji} ${e.ko} 기운`, '#fff', 0.07, 36);

  // 이름 + 현상금
  c.textAlign = 'center'; c.fillStyle = INK;
  c.font = `76px ${DISPLAY}`; c.fillText(`${TYPE_LABEL(r.type, gender)} · ${r.mbti}`, CW / 2, 1300);
  const bw = 640, bx = (CW - bw) / 2, by = 1330;
  rr(c, bx, by, bw, 100, 50, YEL, INK, 5, 6);
  c.fillStyle = INK; c.font = `36px ${JUA}`; c.textAlign = 'left'; c.fillText('★ 현상금', bx + 40, by + 64);
  c.font = `50px ${DISPLAY}`; c.textAlign = 'right'; c.fillText(`연애운 +${r.reward}%`, bx + bw - 40, by + 68);

  // 단서 카드 (귀여운 메모지 스타일)
  const cx = 120, cy = 1462, cwid = CW - 240;
  const rows: [string, string, string][] = [
    ['사주 단서', `일간 ${r.stem}${r.stemHap ? ' (천간합)' : ''} · ${r.animal} 육합`, YEL],
    ['인상착의', `${r.looks[0]}, ${r.looks[1]}`, PINK],
    ['출몰 지역', `${r.day} ${r.time} · ${r.place}`, '#7FE3F0'],
    ['주의 사항', r.warn, '#B9A6FF'],
  ];
  c.font = `27px ${JUA}`;
  const labW = 150, txtX = cx + 40 + labW + 16, txtW = cx + cwid - 34 - txtX;
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
    c.font = `27px ${JUA}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    c.fillStyle = MUTED; c.fillText(l.lab, cx + 72, mid + 4);
    c.fillStyle = INK;
    l.lines.forEach((w, i) => c.fillText(w, txtX, mid + 4 + i * 36));
    y += h;
  }
  // 모서리 별 장식
  star(c, cx + cwid - 8, cy + 6, 22, YEL);
  star(c, cx + 10, cy + chh - 6, 16, PINK);

  c.textAlign = 'center'; c.font = `22px ${JUA}`; c.fillStyle = MUTED;
  y = cy + chh + 40;
  c.fillText(`✦ 수배 근거: ${nick ? nick + '님' : '내'} 사주 ${EL[r.lackEl].ko} 기운 ${r.counts[r.lackEl]}개 · 양기운 ${r.yang}/6 · 사건번호 ${r.caseNo} ✦`, CW / 2, y);
  // 하단 CTA (카드 밖)
  c.font = `38px ${ARCHIVO}`; c.fillStyle = '#fff'; c.lineWidth = 7; c.strokeStyle = INK;
  c.strokeText('SOULCODE', CW / 2, CH - 52); c.fillText('SOULCODE', CW / 2, CH - 52);
  c.font = `26px ${JUA}`; c.fillStyle = INK; c.fillText(`${location.host}/wanted · 재미로 보는 사주 콘텐츠`, CW / 2, CH - 16);
  void myMbti; void SERIF; void BROWN; void BROWN2;
  return cv;
}

export default function Wanted() {
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
    if (!y || y < 1940 || y > 2025) { alert('1940~2025년 사이 생일을 넣어주세요'); return; }
    setStage('loading');
    const r = wanted(y, m, d, mbti); setRes(r);
    const gd: Gender = want === 'f' || want === 'm' ? want : (r.seed % 2 ? 'f' : 'm');
    const [cv] = await Promise.all([draw(r, nick.trim(), mbti, gd), new Promise((ok) => setTimeout(ok, 1600))]);
    setImg(cv.toDataURL('image/jpeg', 0.92));
    cv.toBlob((b) => { blobRef.current = b; }, 'image/png');
    setStage('done');
    try { localStorage.setItem('soulcode.prefill', JSON.stringify({ birth, nick: nick.trim(), mbti })); } catch { /* noop */ }
  }
  async function share() {
    const b = blobRef.current; if (!b || !res) return;
    const file = new File([b], `운명의상대_수배전단_${res.mbti}.png`, { type: 'image/png' });
    const text = `내 운명의 상대 수배 중 🚨 ${EL[res.el].name} 기운 ${res.mbti}… 이거 완전 걔 아님? 너도 해봐 👉 ${location.origin}/wanted?utm_source=wanted_share`;
    try { if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text }); return; } } catch { return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = file.name; a.click();
  }
  async function copyLink() {
    const text = `생일+MBTI 넣으면 운명의 상대 수배전단 나옴 🚨 ${location.origin}/wanted?utm_source=wanted_link`;
    try { await navigator.clipboard.writeText(text); alert('링크를 복사했어요! 단톡방에 수배전단 돌리기 🚨'); } catch { prompt('이 링크를 복사해 주세요', `${location.origin}/wanted`); }
  }

  return (
    <div className="wanted-wrap">
      <main className="past">
        {stage === 'form' && (
          <section>
            <div className="past-badge wanted-badge">🚨 사주 정밀 분석 수배 시스템</div>
            <h1 className="h-display">운명의 상대<br />수배전단 뽑기</h1>
            <p className="past-sub">내 사주에 <b>부족한 기운</b>과 <b>MBTI 찰떡 궁합</b>으로<br />나를 채워줄 사람의 몽타주를 그려드려요.</p>
            <label className="lb">생년월일 (양력)</label>
            <input className="field" type="date" min="1940-01-01" max="2025-12-31" value={birth} onChange={(e) => setBirth(e.target.value)} />
            <label className="lb">내 MBTI</label>
            <div className="wanted-mbti">
              {MBTIS.map((k) => <button key={k} type="button" className={'chip' + (mbti === k ? ' sel' : '')} onClick={() => setMbti(k)}>{k}</button>)}
            </div>
            <label className="lb">찾는 상대</label>
            <div className="chips-sel wanted-want">
              {([['f', '👩 여자'], ['m', '👨 남자'], ['any', '🌈 상관없음']] as const).map(([k, l]) => <button key={k} type="button" className={'chip' + (want === k ? ' sel' : '')} onClick={() => setWant(k)}>{l}</button>)}
            </div>
            <label className="lb">내 이름 (선택)</label>
            <input className="field" maxLength={10} placeholder="예: 하루" value={nick} onChange={(e) => setNick(e.target.value)} />
            <button className="btn" style={{ marginTop: 22 }} disabled={!birth || !mbti || !want} onClick={run}>수배전단 발행하기 🚨</button>
            <p className="past-note">생일은 이 기기 안에서만 계산하고 서버로 보내지 않아요 · 재미로 보는 콘텐츠예요</p>
          </section>
        )}
        {stage === 'loading' && (
          <section className="past-loading"><div className="past-scroll">🔍</div><p>사주 단서로 몽타주 그리는 중...<br /><small>부족한 오행 추적 중 🕵️</small></p></section>
        )}
        {stage === 'done' && res && (
          <section className="past-done">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`운명의 상대 수배전단: ${EL[res.el].name} 기운 ${res.mbti}`} className="past-img" />
            <button className="btn" onClick={share}>📸 수배전단 저장 · 스토리 공유</button>
            <a className="btn pink" style={{ marginTop: 10, textAlign: 'center' }} href="/?go=match&utm_source=wanted">🔎 신고하기: 그 사람이랑 궁합 보기</a>
            <button className="btn ghost" style={{ marginTop: 10 }} onClick={copyLink}>💌 친구한테 수배전단 돌리기</button>
            <button className="again" onClick={() => { setStage('form'); setImg(''); }}>다시 뽑기</button>
          </section>
        )}
        <footer className="past-foot"><a href="/terms">이용약관</a> · <a href="/privacy">개인정보처리방침</a> · <a href="/">소울코드</a></footer>
      </main>
    </div>
  );
}
