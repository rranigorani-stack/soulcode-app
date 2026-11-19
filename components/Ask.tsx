'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ANIMALS, CHARMS, ISLANDS, LOVES, MIN_REVEAL, topIdx, type AskAnswer, type AskResult } from '@/lib/askData';

const CW = 1080, CH = 1920, INK = '#1B1433', PAPER = '#FFFDF8', PINK = '#FF8AD0', YEL = '#FFE04D', MUTED = '#6E6189', SKY = '#7FE3F0', LAV = '#B9A6FF';
const DISPLAY = '"Black Han Sans", sans-serif', JUA = '"Jua", sans-serif', ARCHIVO = '"Archivo Black", sans-serif';

/* ───────── 기기 저장 (보드 주인 키, 답변 기기 id) ───────── */
const KEYS = 'soulcode.ask.keys';
function getKeys(): Record<string, string> { try { return JSON.parse(localStorage.getItem(KEYS) || '{}') || {}; } catch { return {}; } }
function saveKey(code: string, key: string) { try { localStorage.setItem(KEYS, JSON.stringify({ ...getKeys(), [code]: key })); } catch { /* noop */ } }
function deviceId() {
  try { let d = localStorage.getItem('soulcode.device'); if (!d) { d = crypto.randomUUID(); localStorage.setItem('soulcode.device', d); } return d; } catch { return ''; }
}
const answeredKey = (code: string) => 'soulcode.ask.answered.' + code;

/* ───────── 캔버스 도우미 ───────── */
function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, lw = 5, shadow = 0) {
  if (shadow) { c.fillStyle = INK; c.beginPath(); c.roundRect(x + shadow, y + shadow, w, h, r); c.fill(); }
  c.fillStyle = fill; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill();
  if (lw) { c.strokeStyle = INK; c.lineWidth = lw; c.stroke(); }
}
function star(c: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  c.save(); c.translate(x, y); c.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, rad = i % 2 ? r * 0.38 : r; c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); }
  c.closePath(); c.fillStyle = fill; c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.restore();
}
const strip = (s: string) => s.replace(/^\S+\s/, ''); // 보기 앞 이모지 떼기
const emo = (s: string) => s.split(' ')[0];

async function drawCard(nick: string, r: AskResult) {
  await Promise.all([`120px ${ARCHIVO}`, `60px ${DISPLAY}`, `40px ${JUA}`].map((f) => document.fonts.load(f, '친구들 보는 나 ABC')));
  const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
  const c = cv.getContext('2d')!;
  const bg = c.createLinearGradient(0, 0, CW, CH);
  ['#FFC2EC', '#D9C6FF', '#BFEAFF', '#FFF3B0', '#FFC2EC'].forEach((col, i) => bg.addColorStop(i / 4, col));
  c.fillStyle = bg; c.fillRect(0, 0, CW, CH);
  c.fillStyle = 'rgba(27,20,51,.07)';
  for (let y = 20; y < CH; y += 44) for (let x = (y / 44) % 2 ? 42 : 20; x < CW; x += 44) { c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); }

  const px = 70, py = 90, pw = CW - 140, ph = CH - 200;
  rr(c, px, py, pw, ph, 48, PAPER, 6, 14);
  c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  c.font = `40px ${JUA}`; c.fillStyle = MUTED; c.fillText(`친구 ${r.count}명이 익명으로 답했어요 💌`, CW / 2, 190);
  c.font = `78px ${DISPLAY}`; c.fillStyle = INK; c.fillText('친구들이 보는', CW / 2, 290);
  c.font = `96px ${DISPLAY}`; c.fillStyle = INK;
  const nm = nick.length > 6 ? nick.slice(0, 6) + '…' : nick;
  c.fillText(`${nm}의 진짜 모습`, CW / 2, 400);
  star(c, 150, 230, 30, YEL); star(c, CW - 150, 340, 24, PINK);

  // MBTI 큰 글씨
  c.font = `190px ${ARCHIVO}`; c.lineJoin = 'round';
  c.fillStyle = INK; c.fillText(r.mbti, CW / 2 + 10, 640);
  c.fillStyle = PINK; c.fillText(r.mbti, CW / 2 + 10, 640);
  c.lineWidth = 14; c.strokeStyle = INK; c.strokeText(r.mbti, CW / 2, 630);
  c.fillStyle = '#fff'; c.fillText(r.mbti, CW / 2, 630);
  c.font = `34px ${JUA}`; c.fillStyle = MUTED; c.fillText('친구들 투표로 정해진 내 MBTI', CW / 2, 690);

  // 테토 vs 에겐 막대
  const bx = 150, bw = CW - 300, by = 750;
  const teto = r.tetoPct;
  c.font = `38px ${JUA}`; c.textAlign = 'left'; c.fillStyle = INK; c.fillText(`💪 테토 ${teto}%`, bx, by);
  c.textAlign = 'right'; c.fillText(`에겐 ${100 - teto}% 🌸`, bx + bw, by);
  rr(c, bx, by + 22, bw, 54, 27, '#fff', 4);
  if (teto > 0) { c.save(); c.beginPath(); c.roundRect(bx, by + 22, bw, 54, 27); c.clip(); c.fillStyle = YEL; c.fillRect(bx, by + 22, (bw * teto) / 100, 54); c.fillStyle = PINK; c.fillRect(bx + (bw * teto) / 100, by + 22, bw - (bw * teto) / 100, 54); c.restore(); c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(bx, by + 22, bw, 54, 27); c.stroke(); }

  // 4칸 카드
  const items: [string, string[], number[], string][] = [
    ['매력 포인트 1위', CHARMS, r.charm, YEL],
    ['연애하면 이런 스타일', LOVES, r.love, PINK],
    ['친구들이 본 내 동물상', ANIMALS, r.animal, SKY],
    ['무인도에서 내 역할', ISLANDS, r.island, LAV],
  ];
  const gx = 120, gy = 900, gw = (CW - 240 - 30) / 2, gh = 330;
  items.forEach(([title, opts, tally, col], i) => {
    const x = gx + (i % 2) * (gw + 30), y = gy + Math.floor(i / 2) * (gh + 30);
    const top = topIdx(tally), pct = Math.round((tally[top] / Math.max(1, r.count)) * 100);
    rr(c, x, y, gw, gh, 32, '#fff', 4, 6);
    c.save(); c.beginPath(); c.roundRect(x + 14, y + 14, gw - 28, 56, 28); c.fillStyle = col; c.fill(); c.restore();
    c.textAlign = 'center'; c.font = `30px ${JUA}`; c.fillStyle = INK; c.fillText(title, x + gw / 2, y + 53);
    c.font = `96px ${JUA}`; c.fillText(emo(opts[top]), x + gw / 2, y + 180);
    c.font = `44px ${DISPLAY}`; c.fillText(strip(opts[top]), x + gw / 2, y + 250);
    c.font = `28px ${JUA}`; c.fillStyle = MUTED; c.fillText(`친구 ${pct}%가 골랐어요`, x + gw / 2, y + 296);
  });

  c.textAlign = 'center'; c.font = `32px ${JUA}`; c.fillStyle = MUTED;
  c.fillText('✦ 너도 친구들한테 물어봐 ✦', CW / 2, 1690);
  c.font = `38px ${ARCHIVO}`; c.fillStyle = '#fff'; c.lineWidth = 7; c.strokeStyle = INK;
  c.strokeText('SOULCODE', CW / 2, CH - 52); c.fillText('SOULCODE', CW / 2, CH - 52);
  c.font = `26px ${JUA}`; c.fillStyle = INK; c.fillText(`${location.host}/ask · 재미로 보는 콘텐츠`, CW / 2, CH - 16);
  return cv;
}

/* ───────── 화면 ───────── */
type Board = { nick: string; count: number; owner: boolean; result?: AskResult | null };

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="wanted-wrap">
      <main className="past ask">
        {children}
        <footer className="past-foot"><a href="/wanted">🚨 운명의 상대 수배전단</a> · <a href="/">소울코드</a><br /><a href="/terms">이용약관</a> · <a href="/privacy">개인정보처리방침</a></footer>
      </main>
    </div>
  );
}

/** /ask: 내 보드 만들기 */
export function AskCreate() {
  const [nick, setNick] = useState('');
  const [busy, setBusy] = useState(false);
  const [mine, setMine] = useState<string[]>([]);
  useEffect(() => { setMine(Object.keys(getKeys())); try { const p = JSON.parse(localStorage.getItem('soulcode.prefill') || '{}'); if (p.nick) setNick(p.nick); } catch { /* noop */ } }, []);
  async function create() {
    setBusy(true);
    try {
      const r = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ nick: nick.trim() }) });
      const j = await r.json();
      if (!r.ok || !j.code) throw new Error(j.code);
      saveKey(j.code, j.key);
      location.href = `/ask/${j.code}?new=1`;
    } catch { alert('잠깐 문제가 생겼어요. 다시 눌러주세요!'); setBusy(false); }
  }
  return (
    <Shell>
      <section>
        <div className="past-badge wanted-badge ask-badge">💌 익명 친구 투표</div>
        <h1 className="h-display">친구들이 보는<br />나는 어떤 사람?</h1>
        <p className="past-sub">링크를 단톡방에 뿌리면 친구들이 <b>익명으로</b><br />내 MBTI, 테토/에겐, 매력 포인트를 골라줘요.</p>
        <div className="ask-preview">
          {['🧬 친구들이 보는 내 MBTI', '💪 테토 vs 에겐 🌸', '✨ 매력 포인트 1위', '💘 연애 스타일', '🐶 동물상', '🏝️ 무인도 역할'].map((t) => <span key={t}>{t}</span>)}
        </div>
        <label className="lb">친구들이 부르는 내 이름</label>
        <input className="field" maxLength={10} placeholder="예: 하루" value={nick} onChange={(e) => setNick(e.target.value)} />
        <button className="btn" style={{ marginTop: 22 }} disabled={!nick.trim() || busy} onClick={create}>{busy ? '만드는 중...' : '내 질문 링크 만들기 💌'}</button>
        <p className="past-note">친구들은 정해진 보기 중에서만 골라요 (나쁜 말 X)<br />친구 {MIN_REVEAL}명 이상 답하면 결과가 열려요 · 재미로 보는 콘텐츠예요</p>
        {mine.length > 0 && (
          <div className="ask-mine">
            <b>내가 만든 링크</b>
            {mine.map((c) => <a key={c} href={`/ask/${c}`}>결과 보러 가기 → /ask/{c}</a>)}
          </div>
        )}
      </section>
    </Shell>
  );
}

const Q_AXES: [keyof AskAnswer, [string, string], [string, string]][] = [
  ['ei', ['E', '🎉 사람 많을수록 텐션 업'], ['I', '🏠 집이 최고, 충전 필요']],
  ['sn', ['S', '📏 현실적이고 꼼꼼'], ['N', '🌈 상상력 폭발 엉뚱']],
  ['tf', ['T', '🧠 팩트로 말하는 편'], ['F', '💗 공감부터 해주는 편']],
  ['jp', ['J', '📅 계획 세우는 계획러'], ['P', '🎲 그때그때 즉흥러']],
];

/** /ask/[code]: 친구는 답하고, 주인은 결과 보기 */
export function AskBoard({ code }: { code: string }) {
  const [board, setBoard] = useState<Board | null>(null);
  const [err, setErr] = useState('');
  const [ans, setAns] = useState<Partial<AskAnswer>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [img, setImg] = useState('');
  const blobRef = useRef<Blob | null>(null);
  const isNew = typeof window !== 'undefined' && new URLSearchParams(location.search).get('new') === '1';

  const load = useCallback(async () => {
    const qs = new URLSearchParams(location.search);
    const k = qs.get('k');
    if (k) { saveKey(code, k); history.replaceState(null, '', `/ask/${code}`); }
    const key = getKeys()[code] || '';
    try {
      const r = await fetch(`/api/ask/${code}`, { headers: key ? { 'x-ask-key': key } : {}, cache: 'no-store' });
      if (r.status === 404) { setErr('not_found'); return; }
      if (!r.ok) throw new Error();
      const b: Board = await r.json();
      setBoard(b);
      try { if (localStorage.getItem(answeredKey(code))) setSent(true); } catch { /* noop */ }
      if (b.owner && b.result) {
        const cv = await drawCard(b.nick, b.result);
        setImg(cv.toDataURL('image/jpeg', 0.92));
        cv.toBlob((bl) => { blobRef.current = bl; }, 'image/png');
      }
    } catch { setErr('error'); }
  }, [code]);
  useEffect(() => { load(); }, [load]);

  const link = typeof window !== 'undefined' ? `${location.origin}/ask/${code}` : '';
  async function shareLink() {
    const text = `나에 대해 익명으로 골라줘 💌 내 MBTI, 테토/에겐, 매력 포인트… 친구들이 보는 나는? 👉 ${link}?utm_source=ask_share`;
    try { if (navigator.share) { await navigator.share({ text }); return; } } catch { return; }
    try { await navigator.clipboard.writeText(text); alert('링크를 복사했어요! 단톡방에 붙여넣기 💌'); } catch { prompt('이 링크를 복사해 주세요', link); }
  }
  async function shareCard() {
    const b = blobRef.current; if (!b || !board?.result) return;
    const file = new File([b], `친구들이보는나_${board.result.mbti}.png`, { type: 'image/png' });
    const text = `친구들이 보는 나는 ${board.result.mbti} · 테토 ${board.result.tetoPct}% ㅋㅋ 너도 물어봐 👉 ${location.origin}/ask?utm_source=ask_card`;
    try { if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text }); return; } } catch { return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = file.name; a.click();
  }
  async function copySecret() {
    const key = getKeys()[code]; if (!key) return;
    const url = `${location.origin}/ask/${code}?k=${key}`;
    try { await navigator.clipboard.writeText(url); alert('결과를 볼 수 있는 비밀 링크를 복사했어요.\n다른 기기에서 열 때만 쓰고, 친구한테는 보내지 마세요! 🤫'); } catch { prompt('비밀 링크 (친구에게 보내지 마세요)', url); }
  }
  async function removeBoard() {
    if (!confirm('이 링크와 친구들의 답변을 모두 지울까요? 되돌릴 수 없어요.')) return;
    const key = getKeys()[code];
    const r = await fetch(`/api/ask/${code}`, { method: 'DELETE', headers: { 'x-ask-key': key || '' } });
    if (r.ok) { const ks = getKeys(); delete ks[code]; try { localStorage.setItem(KEYS, JSON.stringify(ks)); } catch { /* noop */ } location.href = '/ask'; }
  }
  async function submit() {
    setBusy(true);
    try {
      const r = await fetch(`/api/ask/${code}/answer`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-ask-device': deviceId() }, body: JSON.stringify(ans) });
      const j = await r.json().catch(() => ({}));
      if (r.ok || j.code === 'duplicate') { try { localStorage.setItem(answeredKey(code), '1'); } catch { /* noop */ } setSent(true); window.scrollTo(0, 0); }
      else if (j.code === 'full') alert('이 링크는 답변이 꽉 찼어요!');
      else throw new Error();
    } catch { alert('잠깐 문제가 생겼어요. 다시 눌러주세요!'); }
    setBusy(false);
  }

  if (err === 'not_found') return <Shell><section><h1 className="h-display">없는 링크예요 🥲</h1><p className="past-sub">지워졌거나 주소가 잘못됐어요.</p><a className="btn" href="/ask">내 질문 링크 만들기 💌</a></section></Shell>;
  if (err) return <Shell><section><h1 className="h-display">연결이 끊겼어요</h1><button className="btn" onClick={() => { setErr(''); load(); }}>다시 시도</button></section></Shell>;
  if (!board) return <Shell><section className="past-loading"><div className="past-scroll">💌</div><p>불러오는 중...</p></section></Shell>;

  /* 주인 화면 */
  if (board.owner) {
    const left = Math.max(0, MIN_REVEAL - board.count);
    return (
      <Shell>
        <section className="past-done">
          <div className="past-badge wanted-badge ask-badge">💌 {board.nick}의 질문 링크</div>
          {board.result ? (
            <>
              <h1 className="h-display" style={{ fontSize: 32 }}>친구 {board.count}명이 답했어요!</h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {img ? <img src={img} alt={`친구들이 보는 ${board.nick}: ${board.result.mbti}`} className="past-img" /> : <p className="past-sub">결과 카드 그리는 중...</p>}
              <button className="btn" onClick={shareCard}>📸 결과 카드 저장 · 스토리 공유</button>
              <button className="btn pink" style={{ marginTop: 10 }} onClick={shareLink}>💌 더 많은 친구한테 물어보기</button>
              <button className="btn ghost" style={{ marginTop: 10 }} onClick={load}>🔄 새 답변 확인</button>
            </>
          ) : (
            <>
              <h1 className="h-display" style={{ fontSize: 32 }}>{isNew ? '링크 완성! 🎉' : `지금 ${board.count}명 답했어요`}</h1>
              <p className="past-sub">이 링크를 단톡방이나 인스타 스토리에 올려요.<br />친구 <b>{left}명</b>만 더 답하면 결과가 열려요! 🔓</p>
              <div className="ask-link">{link}</div>
              <button className="btn" onClick={shareLink}>💌 링크 공유하기</button>
              <button className="btn ghost" style={{ marginTop: 10 }} onClick={load}>🔄 답변 수 새로고침</button>
            </>
          )}
          <a className="btn ghost" style={{ marginTop: 10, textAlign: 'center' }} href={`/?utm_source=ask_owner`}>🔮 내 사주로 보는 진짜 나 (소울코드)</a>
          <div className="ask-owner-tools">
            <button className="again" onClick={copySecret}>📱 다른 기기에서 결과 보기 (비밀 링크 복사)</button>
            <button className="again" onClick={removeBoard}>🗑️ 이 링크 지우기</button>
          </div>
        </section>
      </Shell>
    );
  }

  /* 친구: 답변 완료 */
  if (sent) {
    return (
      <Shell>
        <section className="past-done">
          <div className="past-scroll" style={{ textAlign: 'center' }}>💌</div>
          <h1 className="h-display" style={{ fontSize: 32, textAlign: 'center' }}>{board.nick}한테 익명으로 전달했어요!</h1>
          <p className="past-sub" style={{ textAlign: 'center' }}>누가 뭘 골랐는지는 {board.nick}도 몰라요 🤫<br />이제 너 차례! 친구들은 너를 어떻게 볼까?</p>
          <a className="btn" style={{ textAlign: 'center' }} href="/ask?utm_source=ask_answered">나도 친구들한테 물어보기 💌</a>
          <a className="btn ghost" style={{ marginTop: 10, textAlign: 'center' }} href="/wanted?utm_source=ask_answered">🚨 운명의 상대 수배전단 뽑기</a>
        </section>
      </Shell>
    );
  }

  /* 친구: 답하기 */
  const done = ans.teto !== undefined && ans.ei && ans.sn && ans.tf && ans.jp && ans.charm !== undefined && ans.love !== undefined && ans.animal !== undefined && ans.island !== undefined;
  const set = (p: Partial<AskAnswer>) => setAns((a) => ({ ...a, ...p }));
  const Opts = ({ k, list }: { k: 'charm' | 'love' | 'animal' | 'island'; list: string[] }) => (
    <div className="ask-opts">{list.map((t, i) => <button key={t} type="button" className={'chip' + (ans[k] === i ? ' sel' : '')} onClick={() => set({ [k]: i } as Partial<AskAnswer>)}>{t}</button>)}</div>
  );
  return (
    <Shell>
      <section>
        <div className="past-badge wanted-badge ask-badge">💌 익명 · {board.nick}은(는) 누가 답했는지 몰라요</div>
        <h1 className="h-display" style={{ fontSize: 34 }}>{board.nick}은(는)<br />어떤 사람이야?</h1>
        <p className="past-sub">솔직하게 골라줘! 지금까지 {board.count}명 답했어요.</p>

        <label className="lb">1. 테토야, 에겐이야?</label>
        <div className="ask-opts two">
          <button type="button" className={'chip' + (ans.teto === true ? ' sel' : '')} onClick={() => set({ teto: true })}>💪 테토 (직진·리더·쿨함)</button>
          <button type="button" className={'chip' + (ans.teto === false ? ' sel' : '')} onClick={() => set({ teto: false })}>🌸 에겐 (섬세·다정·감성)</button>
        </div>

        <label className="lb">2. {board.nick}의 MBTI를 맞혀봐</label>
        {Q_AXES.map(([k, a, b]) => (
          <div key={k} className="ask-opts two">
            {[a, b].map(([v, t]) => <button key={v} type="button" className={'chip' + (ans[k] === v ? ' sel' : '')} onClick={() => set({ [k]: v } as Partial<AskAnswer>)}>{t}</button>)}
          </div>
        ))}

        <label className="lb">3. 제일 큰 매력 포인트는?</label>
        <Opts k="charm" list={CHARMS} />
        <label className="lb">4. 연애하면 어떤 스타일일 것 같아?</label>
        <Opts k="love" list={LOVES} />
        <label className="lb">5. 동물상으로 치면?</label>
        <Opts k="animal" list={ANIMALS} />
        <label className="lb">6. 같이 무인도에 가면 {board.nick}의 역할은?</label>
        <Opts k="island" list={ISLANDS} />

        <button className="btn" style={{ marginTop: 24 }} disabled={!done || busy} onClick={submit}>{busy ? '보내는 중...' : '익명으로 보내기 💌'}</button>
        <p className="past-note">이름·연락처 없이 고른 보기만 전달돼요 · 재미로 보는 콘텐츠예요</p>
      </section>
    </Shell>
  );
}
