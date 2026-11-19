'use client';
import { BizInfo } from './BizInfo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { askOptions, MIN_REVEAL, topIdx, type AskAnswer, type AskResult } from '@/lib/askData';
import type { Lang } from '@/lib/wanted';

const CW = 1080, CH = 1920, INK = '#1B1433', PAPER = '#FFFDF8', PINK = '#FF8AD0', YEL = '#FFE04D', MUTED = '#6E6189', SKY = '#7FE3F0', LAV = '#B9A6FF';
const DISPLAY = '"Black Han Sans", sans-serif', JUA = '"Jua", sans-serif', ARCHIVO = '"Archivo Black", sans-serif';
const JA_DISPLAY = '"Dela Gothic One", "Black Han Sans", sans-serif', JA_ROUND = '"Zen Maru Gothic", "Jua", sans-serif';

/* ───────── 기기 저장 (보드 주인 키, 답변 기기 id) ───────── */
const KEYS = 'soulcode.ask.keys';
function getKeys(): Record<string, string> { try { return JSON.parse(localStorage.getItem(KEYS) || '{}') || {}; } catch { return {}; } }
function saveKey(code: string, key: string) { try { localStorage.setItem(KEYS, JSON.stringify({ ...getKeys(), [code]: key })); } catch { /* noop */ } }
function deviceId() {
  try { let d = localStorage.getItem('soulcode.device'); if (!d) { d = crypto.randomUUID(); localStorage.setItem('soulcode.device', d); } return d; } catch { return ''; }
}
const answeredKey = (code: string) => 'soulcode.ask.answered.' + code;

/* ───────── 문구 (한국어 / English) ───────── */
const TX = {
  ja: {
    cardTop: (n: number) => `友達${n}人が匿名で答えました 💌`, cardH1: '友達から見た', cardH2: (nm: string) => `${nm}の本当の姿`,
    cardMbti: '友達の投票で決まった私のMBTI', teto: (p: number) => `💪 肉食系 ${p}%`, egen: (p: number) => `草食系 ${p}% 🌸`,
    cardItems: ['魅力ポイント1位', '恋愛するとこのタイプ', '友達から見た動物顔', '無人島での役割'], picked: (p: number) => `友達の${p}%が選びました`,
    cardCta: '✦ あなたも友達に聞いてみて ✦', cardFoot: (h: string) => `${h}/ja/ask · 占いエンタメ`,
    badge: '💌 匿名・友達投票', h1: ['友達から見た', '私ってどんな人?'],
    sub: <>リンクをグループLINEに送ると、友達が<b>匿名で</b><br />私のMBTI・肉食系/草食系・魅力ポイントを選んでくれます。</>,
    preview: ['🧬 友達から見たMBTI', '💪 肉食系 vs 草食系 🌸', '✨ 魅力ポイント1位', '💘 恋愛タイプ', '🐶 動物顔', '🏝️ 無人島の役割'],
    nickLb: '友達からの呼び名', nickPh: '例: はる', create: '質問リンクを作る 💌', creating: '作成中...',
    createNote: <>友達は決まった選択肢から選ぶだけ (悪口なし)<br />{MIN_REVEAL}人以上答えると結果が開きます · 占いエンタメです</>,
    mine: '作ったリンク', mineGo: '結果を見る →', oops: '問題が起きました。もう一度押してください!',
    notFound: 'リンクが見つかりません 🥲', notFoundSub: '削除されたか、アドレスが間違っています。', makeMine: '質問リンクを作る 💌', lost: '接続が切れました', retry: 'もう一度', loading: '読み込み中...',
    ownerBadge: (n: string) => `💌 ${n}の質問リンク`, answered: (n: number) => `友達${n}人が答えました!`, drawing: '結果カードを作成中...',
    shareCard: '📸 結果カードを保存 · ストーリーにシェア', askMore: '💌 もっと友達に聞く', checkNew: '🔄 新しい回答をチェック',
    ready: 'リンク完成! 🎉', now: (n: number) => `いま${n}人が回答`,
    pending: (l: number) => <>このリンクをグループLINEやストーリーに載せてね。<br />あと<b>{l}人</b>答えると結果が開きます! 🔓</>,
    shareLink: '💌 リンクをシェア', refresh: '🔄 回答数を更新', soul: '🚨 運命の相手の手配書を作る', soulHref: '/ja/wanted?utm_source=ask_owner',
    secret: '📱 他の端末で結果を見る (秘密リンクをコピー)', del: '🗑️ このリンクを削除',
    secretCopied: '結果が見られる秘密リンクをコピーしました。\n自分の端末だけで使って、友達には送らないでね! 🤫', secretPrompt: '秘密リンク (友達に送らないで)',
    delConfirm: 'このリンクと友達の回答をすべて削除しますか? 元に戻せません。', linkCopied: 'リンクをコピーしました! グループLINEに貼ってね 💌', copyPrompt: 'このリンクをコピーしてください',
    linkShare: (u: string) => `私について匿名で選んで 💌 MBTI、肉食系か草食系か、魅力ポイント… 友達から見た私は? 👉 ${u}?utm_source=ask_share`,
    cardShare: (r: AskResult, o: string) => `友達から見た私は${r.mbti}・肉食系${r.tetoPct}%らしい笑 あなたも聞いてみて 👉 ${o}/ja/ask?utm_source=ask_card`,
    cardFile: (m: string) => `友達から見た私_${m}.png`,
    sentH: (n: string) => `${n}に匿名で届けました!`, sentSub: (n: string) => <>誰が何を選んだかは{n}にもわかりません 🤫<br />次はあなたの番! 友達はあなたをどう見てる?</>,
    mineToo: '私も友達に聞いてみる 💌', wanted: '🚨 運命の相手の手配書を作る', wantedHref: '/ja/wanted?utm_source=ask_answered',
    anon: (n: string) => `💌 匿名 · ${n}には誰が答えたかわかりません`, qH: (n: string) => <>{n}って<br />どんな人?</>, qSub: (c: number) => `正直に選んでね! いままで${c}人が回答。`,
    q1: '1. 肉食系? 草食系?', tetoOpt: '💪 肉食系 (積極的・リーダー・クール)', egenOpt: '🌸 草食系 (繊細・やさしい・感性派)', q2: (n: string) => `2. ${n}のMBTIを当てて`,
    axes: { ei: ['🎉 人が多いほどテンションUP', '🏠 家が最高、充電が必要'], sn: ['📏 現実的でていねい', '🌈 想像力が爆発'], tf: ['🧠 事実で話すタイプ', '💗 まず共感するタイプ'], jp: ['📅 計画を立てる派', '🎲 その場のノリ派'] },
    q3: '3. いちばんの魅力ポイントは?', q4: '4. 恋愛するとどんなタイプ?', q5: '5. 動物顔でいうと?', q6: (n: string) => `6. 無人島に行ったら${n}の役割は?`,
    send: '匿名で送る 💌', sending: '送信中...', sendNote: '名前や連絡先は送られず、選んだ答えだけが届きます · 占いエンタメです', full: 'このリンクは回答がいっぱいです!',
    base: '/ja/ask', other: '/ja/wanted',
  },
  ko: {
    cardTop: (n: number) => `친구 ${n}명이 익명으로 답했어요 💌`, cardH1: '친구들이 보는', cardH2: (nm: string) => `${nm}의 진짜 모습`,
    cardMbti: '친구들 투표로 정해진 내 MBTI', teto: (p: number) => `💪 테토 ${p}%`, egen: (p: number) => `에겐 ${p}% 🌸`,
    cardItems: ['매력 포인트 1위', '연애하면 이런 스타일', '친구들이 본 내 동물상', '무인도에서 내 역할'], picked: (p: number) => `친구 ${p}%가 골랐어요`,
    cardCta: '✦ 너도 친구들한테 물어봐 ✦', cardFoot: (h: string) => `${h}/ask · 재미로 보는 콘텐츠`,
    badge: '💌 익명 친구 투표', h1: ['친구들이 보는', '나는 어떤 사람?'],
    sub: <>링크를 단톡방에 뿌리면 친구들이 <b>익명으로</b><br />내 MBTI, 테토/에겐, 매력 포인트를 골라줘요.</>,
    preview: ['🧬 친구들이 보는 내 MBTI', '💪 테토 vs 에겐 🌸', '✨ 매력 포인트 1위', '💘 연애 스타일', '🐶 동물상', '🏝️ 무인도 역할'],
    nickLb: '친구들이 부르는 내 이름', nickPh: '예: 하루', create: '내 질문 링크 만들기 💌', creating: '만드는 중...',
    createNote: <>친구들은 정해진 보기 중에서만 골라요 (나쁜 말 X)<br />친구 {MIN_REVEAL}명 이상 답하면 결과가 열려요 · 재미로 보는 콘텐츠예요</>,
    mine: '내가 만든 링크', mineGo: '결과 보러 가기 →', oops: '잠깐 문제가 생겼어요. 다시 눌러주세요!',
    notFound: '없는 링크예요 🥲', notFoundSub: '지워졌거나 주소가 잘못됐어요.', makeMine: '내 질문 링크 만들기 💌', lost: '연결이 끊겼어요', retry: '다시 시도', loading: '불러오는 중...',
    ownerBadge: (n: string) => `💌 ${n}의 질문 링크`, answered: (n: number) => `친구 ${n}명이 답했어요!`, drawing: '결과 카드 그리는 중...',
    shareCard: '📸 결과 카드 저장 · 스토리 공유', askMore: '💌 더 많은 친구한테 물어보기', checkNew: '🔄 새 답변 확인',
    ready: '링크 완성! 🎉', now: (n: number) => `지금 ${n}명 답했어요`,
    pending: (l: number) => <>이 링크를 단톡방이나 인스타 스토리에 올려요.<br />친구 <b>{l}명</b>만 더 답하면 결과가 열려요! 🔓</>,
    shareLink: '💌 링크 공유하기', refresh: '🔄 답변 수 새로고침', soul: '🔮 내 사주로 보는 진짜 나 (소울코드)', soulHref: '/?utm_source=ask_owner',
    secret: '📱 다른 기기에서 결과 보기 (비밀 링크 복사)', del: '🗑️ 이 링크 지우기',
    secretCopied: '결과를 볼 수 있는 비밀 링크를 복사했어요.\n다른 기기에서 열 때만 쓰고, 친구한테는 보내지 마세요! 🤫', secretPrompt: '비밀 링크 (친구에게 보내지 마세요)',
    delConfirm: '이 링크와 친구들의 답변을 모두 지울까요? 되돌릴 수 없어요.', linkCopied: '링크를 복사했어요! 단톡방에 붙여넣기 💌', copyPrompt: '이 링크를 복사해 주세요',
    linkShare: (u: string) => `나에 대해 익명으로 골라줘 💌 내 MBTI, 테토/에겐, 매력 포인트… 친구들이 보는 나는? 👉 ${u}?utm_source=ask_share`,
    cardShare: (r: AskResult, o: string) => `친구들이 보는 나는 ${r.mbti} · 테토 ${r.tetoPct}% ㅋㅋ 너도 물어봐 👉 ${o}/ask?utm_source=ask_card`,
    cardFile: (m: string) => `친구들이보는나_${m}.png`,
    sentH: (n: string) => `${n}한테 익명으로 전달했어요!`, sentSub: (n: string) => <>누가 뭘 골랐는지는 {n}도 몰라요 🤫<br />이제 너 차례! 친구들은 너를 어떻게 볼까?</>,
    mineToo: '나도 친구들한테 물어보기 💌', wanted: '🚨 운명의 상대 수배전단 뽑기', wantedHref: '/wanted?utm_source=ask_answered',
    anon: (n: string) => `💌 익명 · ${n}은(는) 누가 답했는지 몰라요`, qH: (n: string) => <>{n}은(는)<br />어떤 사람이야?</>, qSub: (c: number) => `솔직하게 골라줘! 지금까지 ${c}명 답했어요.`,
    q1: '1. 테토야, 에겐이야?', tetoOpt: '💪 테토 (직진·리더·쿨함)', egenOpt: '🌸 에겐 (섬세·다정·감성)', q2: (n: string) => `2. ${n}의 MBTI를 맞혀봐`,
    axes: { ei: ['🎉 사람 많을수록 텐션 업', '🏠 집이 최고, 충전 필요'], sn: ['📏 현실적이고 꼼꼼', '🌈 상상력 폭발 엉뚱'], tf: ['🧠 팩트로 말하는 편', '💗 공감부터 해주는 편'], jp: ['📅 계획 세우는 계획러', '🎲 그때그때 즉흥러'] },
    q3: '3. 제일 큰 매력 포인트는?', q4: '4. 연애하면 어떤 스타일일 것 같아?', q5: '5. 동물상으로 치면?', q6: (n: string) => `6. 같이 무인도에 가면 ${n}의 역할은?`,
    send: '익명으로 보내기 💌', sending: '보내는 중...', sendNote: '이름·연락처 없이 고른 보기만 전달돼요 · 재미로 보는 콘텐츠예요', full: '이 링크는 답변이 꽉 찼어요!',
    base: '/ask', other: '/wanted',
  },
  en: {
    cardTop: (n: number) => `${n} friends answered anonymously 💌`, cardH1: 'How my friends', cardH2: (nm: string) => `really see ${nm}`,
    cardMbti: 'My MBTI, voted by friends', teto: (p: number) => `💪 Bold ${p}%`, egen: (p: number) => `Soft ${p}% 🌸`,
    cardItems: ['#1 charm point', 'In love, I am...', 'My animal face', 'My role on a desert island'], picked: (p: number) => `${p}% of friends picked this`,
    cardCta: '✦ Ask your friends too ✦', cardFoot: (h: string) => `${h}/en/ask · just for fun`,
    badge: '💌 Anonymous friend poll', h1: ['How do my friends', 'really see me?'],
    sub: <>Drop the link in your group chat and friends <b>anonymously</b><br />pick your MBTI, Bold/Soft type and charm point.</>,
    preview: ['🧬 My MBTI, by friends', '💪 Bold vs Soft 🌸', '✨ #1 charm point', '💘 Love style', '🐶 Animal face', '🏝️ Island role'],
    nickLb: 'What friends call me', nickPh: 'e.g. Haru', create: 'Create my link 💌', creating: 'Creating...',
    createNote: <>Friends can only pick from fixed options (no mean words)<br />Results unlock after {MIN_REVEAL} friends answer · Just for fun</>,
    mine: 'My links', mineGo: 'See results →', oops: 'Something went wrong. Please try again!',
    notFound: 'Link not found 🥲', notFoundSub: 'It was deleted or the address is wrong.', makeMine: 'Create my link 💌', lost: 'Connection lost', retry: 'Retry', loading: 'Loading...',
    ownerBadge: (n: string) => `💌 ${n}'s link`, answered: (n: number) => `${n} friends answered!`, drawing: 'Drawing your result card...',
    shareCard: '📸 Save card · Share to story', askMore: '💌 Ask more friends', checkNew: '🔄 Check new answers',
    ready: 'Your link is ready! 🎉', now: (n: number) => `${n} answered so far`,
    pending: (l: number) => <>Post this link in your group chat or story.<br />Just <b>{l} more</b> friends to unlock your results! 🔓</>,
    shareLink: '💌 Share my link', refresh: '🔄 Refresh count', soul: '🚨 Get my soulmate WANTED poster', soulHref: '/en/wanted?utm_source=ask_owner',
    secret: '📱 View on another device (copy secret link)', del: '🗑️ Delete this link',
    secretCopied: 'Secret results link copied.\nUse it only on your own devices. Do not send it to friends! 🤫', secretPrompt: 'Secret link (do not share)',
    delConfirm: 'Delete this link and all answers? This cannot be undone.', linkCopied: 'Link copied! Paste it in your group chat 💌', copyPrompt: 'Copy this link',
    linkShare: (u: string) => `Rate me anonymously 💌 My MBTI, Bold or Soft, charm point… how do you see me? 👉 ${u}?utm_source=ask_share`,
    cardShare: (r: AskResult, o: string) => `My friends think I'm ${r.mbti} and ${r.tetoPct}% Bold lol. Ask yours 👉 ${o}/en/ask?utm_source=ask_card`,
    cardFile: (m: string) => `how_friends_see_me_${m}.png`,
    sentH: (n: string) => `Sent to ${n} anonymously!`, sentSub: (n: string) => <>{n} will never know who picked what 🤫<br />Your turn! How do your friends see you?</>,
    mineToo: 'Ask my friends too 💌', wanted: '🚨 Get my soulmate WANTED poster', wantedHref: '/en/wanted?utm_source=ask_answered',
    anon: (n: string) => `💌 Anonymous · ${n} won't know who answered`, qH: (n: string) => <>What is {n}<br />really like?</>, qSub: (c: number) => `Be honest! ${c} friends answered so far.`,
    q1: '1. Bold or Soft?', tetoOpt: '💪 Bold (direct, leader, cool)', egenOpt: '🌸 Soft (gentle, caring, emotional)', q2: (n: string) => `2. Guess ${n}'s MBTI`,
    axes: { ei: ['🎉 More people, more energy', '🏠 Home is best, needs recharging'], sn: ['📏 Practical and detailed', '🌈 Wild imagination'], tf: ['🧠 Talks in facts', '💗 Empathy first'], jp: ['📅 Makes plans', '🎲 Goes with the flow'] },
    q3: '3. Biggest charm point?', q4: '4. What are they like in love?', q5: '5. Which animal face?', q6: (n: string) => `6. On a desert island, ${n} would be...`,
    send: 'Send anonymously 💌', sending: 'Sending...', sendNote: 'Only your picks are sent, no name or contact · Just for fun', full: 'This link is full!',
    base: '/en/ask', other: '/en/wanted',
  },
};

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

async function drawCard(nick: string, r: AskResult, lang: Lang) {
  const T = TX[lang], O = askOptions(lang);
  const FD = lang === 'ja' ? JA_DISPLAY : DISPLAY, FR = lang === 'ja' ? JA_ROUND : JUA;
  await Promise.all([`120px ${ARCHIVO}`, `60px ${FD}`, `40px ${FR}`].map((f) => document.fonts.load(f, '친구들 보는 나 ABC 友達から見た')));
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
  c.font = `40px ${FR}`; c.fillStyle = MUTED; c.fillText(T.cardTop(r.count), CW / 2, 190);
  c.font = `${lang === 'ja' ? 64 : 78}px ${FD}`; c.fillStyle = INK; c.fillText(T.cardH1, CW / 2, 290);
  c.font = `${lang === 'ja' ? 76 : 96}px ${FD}`; c.fillStyle = INK;
  const nm = nick.length > 6 ? nick.slice(0, 6) + '…' : nick;
  c.fillText(T.cardH2(nm), CW / 2, 400);
  star(c, 150, 230, 30, YEL); star(c, CW - 150, 340, 24, PINK);

  // MBTI 큰 글씨
  c.font = `190px ${ARCHIVO}`; c.lineJoin = 'round';
  c.fillStyle = INK; c.fillText(r.mbti, CW / 2 + 10, 640);
  c.fillStyle = PINK; c.fillText(r.mbti, CW / 2 + 10, 640);
  c.lineWidth = 14; c.strokeStyle = INK; c.strokeText(r.mbti, CW / 2, 630);
  c.fillStyle = '#fff'; c.fillText(r.mbti, CW / 2, 630);
  c.font = `34px ${FR}`; c.fillStyle = MUTED; c.fillText(T.cardMbti, CW / 2, 690);

  // 테토 vs 에겐 막대
  const bx = 150, bw = CW - 300, by = 750;
  const teto = r.tetoPct;
  c.font = `38px ${FR}`; c.textAlign = 'left'; c.fillStyle = INK; c.fillText(T.teto(teto), bx, by);
  c.textAlign = 'right'; c.fillText(T.egen(100 - teto), bx + bw, by);
  rr(c, bx, by + 22, bw, 54, 27, '#fff', 4);
  if (teto > 0) { c.save(); c.beginPath(); c.roundRect(bx, by + 22, bw, 54, 27); c.clip(); c.fillStyle = YEL; c.fillRect(bx, by + 22, (bw * teto) / 100, 54); c.fillStyle = PINK; c.fillRect(bx + (bw * teto) / 100, by + 22, bw - (bw * teto) / 100, 54); c.restore(); c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(bx, by + 22, bw, 54, 27); c.stroke(); }

  // 4칸 카드
  const items: [string, string[], number[], string][] = [
    [T.cardItems[0], O.charms, r.charm, YEL],
    [T.cardItems[1], O.loves, r.love, PINK],
    [T.cardItems[2], O.animals, r.animal, SKY],
    [T.cardItems[3], O.islands, r.island, LAV],
  ];
  const gx = 120, gy = 900, gw = (CW - 240 - 30) / 2, gh = 330;
  items.forEach(([title, opts, tally, col], i) => {
    const x = gx + (i % 2) * (gw + 30), y = gy + Math.floor(i / 2) * (gh + 30);
    const top = topIdx(tally), pct = Math.round((tally[top] / Math.max(1, r.count)) * 100);
    rr(c, x, y, gw, gh, 32, '#fff', 4, 6);
    c.save(); c.beginPath(); c.roundRect(x + 14, y + 14, gw - 28, 56, 28); c.fillStyle = col; c.fill(); c.restore();
    c.textAlign = 'center'; c.font = `${lang === 'ko' ? 30 : 27}px ${FR}`; c.fillStyle = INK; c.fillText(title, x + gw / 2, y + 53);
    c.font = `96px ${FR}`; c.fillText(emo(opts[top]), x + gw / 2, y + 180);
    c.font = `${lang === 'ko' ? 44 : lang === 'ja' ? 34 : 38}px ${FD}`; c.fillText(strip(opts[top]), x + gw / 2, y + 250, gw - 30);
    c.font = `28px ${FR}`; c.fillStyle = MUTED; c.fillText(T.picked(pct), x + gw / 2, y + 296, gw - 30);
  });

  c.textAlign = 'center'; c.font = `32px ${FR}`; c.fillStyle = MUTED;
  c.fillText(T.cardCta, CW / 2, 1690);
  c.font = `38px ${ARCHIVO}`; c.fillStyle = '#fff'; c.lineWidth = 7; c.strokeStyle = INK;
  c.strokeText('SOULCODE', CW / 2, CH - 52); c.fillText('SOULCODE', CW / 2, CH - 52);
  c.font = `26px ${FR}`; c.fillStyle = INK; c.fillText(T.cardFoot(location.host), CW / 2, CH - 16);
  return cv;
}

/* ───────── 화면 ───────── */
type Board = { nick: string; count: number; owner: boolean; result?: AskResult | null };

function Shell({ children, lang = 'ko' }: { children: React.ReactNode; lang?: Lang }) {
  return (
    <div className="wanted-wrap">
      <main className={'past ask' + (lang === 'ja' ? ' ja' : '')}>
        {children}
        {lang === 'ja'
          ? <footer className="past-foot"><a href="/ja/wanted">🚨 運命の相手の手配書</a> · <a href="/ask">한국어</a> · <a href="/en/ask">English</a><br /><a href="/ja/terms">利用規約</a> · <a href="/ja/privacy">プライバシー</a></footer>
          : lang === 'ko'
          ? <footer className="past-foot"><a href="/wanted">🚨 운명의 상대 수배전단</a> · <a href="/">소울코드</a> · <a href="/en/ask">English</a> · <a href="/ja/ask">日本語</a><br /><a href="/terms">이용약관</a> · <a href="/privacy">개인정보처리방침</a><BizInfo /></footer>
          : <footer className="past-foot"><a href="/en/wanted">🚨 Soulmate WANTED poster</a> · <a href="/ask">한국어</a> · <a href="/ja/ask">日本語</a><br /><a href="/en/terms">Terms</a> · <a href="/en/privacy">Privacy</a></footer>}
      </main>
    </div>
  );
}

/** /ask: 내 보드 만들기 */
export function AskCreate({ lang = 'ko' }: { lang?: Lang }) {
  const T = TX[lang];
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
      location.href = `${T.base}/${j.code}?new=1`;
    } catch { alert(T.oops); setBusy(false); }
  }
  return (
    <Shell lang={lang}>
      <section>
        <div className="past-badge wanted-badge ask-badge">{T.badge}</div>
        <h1 className="h-display">{T.h1[0]}<br />{T.h1[1]}</h1>
        <p className="past-sub">{T.sub}</p>
        <div className="ask-preview">{T.preview.map((t) => <span key={t}>{t}</span>)}</div>
        <label className="lb">{T.nickLb}</label>
        <input className="field" maxLength={10} placeholder={T.nickPh} value={nick} onChange={(e) => setNick(e.target.value)} />
        <button className="btn" style={{ marginTop: 22 }} disabled={!nick.trim() || busy} onClick={create}>{busy ? T.creating : T.create}</button>
        <p className="past-note">{T.createNote}</p>
        {mine.length > 0 && (
          <div className="ask-mine">
            <b>{T.mine}</b>
            {mine.map((c) => <a key={c} href={`${T.base}/${c}`}>{T.mineGo} {T.base}/{c}</a>)}
          </div>
        )}
      </section>
    </Shell>
  );
}

const AXES: ('ei' | 'sn' | 'tf' | 'jp')[] = ['ei', 'sn', 'tf', 'jp'];
const AXIS_V = { ei: ['E', 'I'], sn: ['S', 'N'], tf: ['T', 'F'], jp: ['J', 'P'] } as const;

/** /ask/[code]: 친구는 답하고, 주인은 결과 보기 */
export function AskBoard({ code, lang = 'ko' }: { code: string; lang?: Lang }) {
  const T = TX[lang], O = askOptions(lang);
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
    if (k) { saveKey(code, k); history.replaceState(null, '', `${T.base}/${code}`); }
    const key = getKeys()[code] || '';
    try {
      const r = await fetch(`/api/ask/${code}`, { headers: key ? { 'x-ask-key': key } : {}, cache: 'no-store' });
      if (r.status === 404) { setErr('not_found'); return; }
      if (!r.ok) throw new Error();
      const b: Board = await r.json();
      setBoard(b);
      try { if (localStorage.getItem(answeredKey(code))) setSent(true); } catch { /* noop */ }
      if (b.owner && b.result) {
        const cv = await drawCard(b.nick, b.result, lang);
        setImg(cv.toDataURL('image/jpeg', 0.92));
        cv.toBlob((bl) => { blobRef.current = bl; }, 'image/png');
      }
    } catch { setErr('error'); }
  }, [code, lang, T.base]);
  useEffect(() => { load(); }, [load]);

  const link = typeof window !== 'undefined' ? `${location.origin}${T.base}/${code}` : '';
  async function shareLink() {
    const text = T.linkShare(link);
    try { if (navigator.share) { await navigator.share({ text }); return; } } catch { return; }
    try { await navigator.clipboard.writeText(text); alert(T.linkCopied); } catch { prompt(T.copyPrompt, link); }
  }
  async function shareCard() {
    const b = blobRef.current; if (!b || !board?.result) return;
    const file = new File([b], T.cardFile(board.result.mbti), { type: 'image/png' });
    const text = T.cardShare(board.result, location.origin);
    try { if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text }); return; } } catch { return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = file.name; a.click();
  }
  async function copySecret() {
    const key = getKeys()[code]; if (!key) return;
    const url = `${location.origin}${T.base}/${code}?k=${key}`;
    try { await navigator.clipboard.writeText(url); alert(T.secretCopied); } catch { prompt(T.secretPrompt, url); }
  }
  async function removeBoard() {
    if (!confirm(T.delConfirm)) return;
    const key = getKeys()[code];
    const r = await fetch(`/api/ask/${code}`, { method: 'DELETE', headers: { 'x-ask-key': key || '' } });
    if (r.ok) { const ks = getKeys(); delete ks[code]; try { localStorage.setItem(KEYS, JSON.stringify(ks)); } catch { /* noop */ } location.href = T.base; }
  }
  async function submit() {
    setBusy(true);
    try {
      const r = await fetch(`/api/ask/${code}/answer`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-ask-device': deviceId() }, body: JSON.stringify(ans) });
      const j = await r.json().catch(() => ({}));
      if (r.ok || j.code === 'duplicate') { try { localStorage.setItem(answeredKey(code), '1'); } catch { /* noop */ } setSent(true); window.scrollTo(0, 0); }
      else if (j.code === 'full') alert(T.full);
      else throw new Error();
    } catch { alert(T.oops); }
    setBusy(false);
  }

  if (err === 'not_found') return <Shell lang={lang}><section><h1 className="h-display">{T.notFound}</h1><p className="past-sub">{T.notFoundSub}</p><a className="btn" href={T.base}>{T.makeMine}</a></section></Shell>;
  if (err) return <Shell lang={lang}><section><h1 className="h-display">{T.lost}</h1><button className="btn" onClick={() => { setErr(''); load(); }}>{T.retry}</button></section></Shell>;
  if (!board) return <Shell lang={lang}><section className="past-loading"><div className="past-scroll">💌</div><p>{T.loading}</p></section></Shell>;

  /* 주인 화면 */
  if (board.owner) {
    const left = Math.max(0, MIN_REVEAL - board.count);
    return (
      <Shell lang={lang}>
        <section className="past-done">
          <div className="past-badge wanted-badge ask-badge">{T.ownerBadge(board.nick)}</div>
          {board.result ? (
            <>
              <h1 className="h-display" style={{ fontSize: 32 }}>{T.answered(board.count)}</h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {img ? <img src={img} alt={`${board.nick}: ${board.result.mbti}`} className="past-img" /> : <p className="past-sub">{T.drawing}</p>}
              <button className="btn" onClick={shareCard}>{T.shareCard}</button>
              <button className="btn pink" style={{ marginTop: 10 }} onClick={shareLink}>{T.askMore}</button>
              <button className="btn ghost" style={{ marginTop: 10 }} onClick={load}>{T.checkNew}</button>
            </>
          ) : (
            <>
              <h1 className="h-display" style={{ fontSize: 32 }}>{isNew ? T.ready : T.now(board.count)}</h1>
              <p className="past-sub">{T.pending(left)}</p>
              <div className="ask-link">{link}</div>
              <button className="btn" onClick={shareLink}>{T.shareLink}</button>
              <button className="btn ghost" style={{ marginTop: 10 }} onClick={load}>{T.refresh}</button>
            </>
          )}
          <a className="btn ghost" style={{ marginTop: 10, textAlign: 'center' }} href={T.soulHref}>{T.soul}</a>
          <div className="ask-owner-tools">
            <button className="again" onClick={copySecret}>{T.secret}</button>
            <button className="again" onClick={removeBoard}>{T.del}</button>
          </div>
        </section>
      </Shell>
    );
  }

  /* 친구: 답변 완료 */
  if (sent) {
    return (
      <Shell lang={lang}>
        <section className="past-done">
          <div className="past-scroll" style={{ textAlign: 'center' }}>💌</div>
          <h1 className="h-display" style={{ fontSize: 32, textAlign: 'center' }}>{T.sentH(board.nick)}</h1>
          <p className="past-sub" style={{ textAlign: 'center' }}>{T.sentSub(board.nick)}</p>
          <a className="btn" style={{ textAlign: 'center' }} href={`${T.base}?utm_source=ask_answered`}>{T.mineToo}</a>
          <a className="btn ghost" style={{ marginTop: 10, textAlign: 'center' }} href={T.wantedHref}>{T.wanted}</a>
        </section>
      </Shell>
    );
  }

  /* 친구: 답하기 */
  const done = ans.teto !== undefined && ans.ei && ans.sn && ans.tf && ans.jp && ans.charm !== undefined && ans.love !== undefined && ans.animal !== undefined && ans.island !== undefined;
  const set = (p: Partial<AskAnswer>) => setAns((a) => ({ ...a, ...p }));
  const opts = (k: 'charm' | 'love' | 'animal' | 'island', list: string[]) => (
    <div className="ask-opts">{list.map((t, i) => <button key={t} type="button" className={'chip' + (ans[k] === i ? ' sel' : '')} onClick={() => set({ [k]: i } as Partial<AskAnswer>)}>{t}</button>)}</div>
  );
  return (
    <Shell lang={lang}>
      <section>
        <div className="past-badge wanted-badge ask-badge">{T.anon(board.nick)}</div>
        <h1 className="h-display" style={{ fontSize: 34 }}>{T.qH(board.nick)}</h1>
        <p className="past-sub">{T.qSub(board.count)}</p>

        <label className="lb">{T.q1}</label>
        <div className="ask-opts two">
          <button type="button" className={'chip' + (ans.teto === true ? ' sel' : '')} onClick={() => set({ teto: true })}>{T.tetoOpt}</button>
          <button type="button" className={'chip' + (ans.teto === false ? ' sel' : '')} onClick={() => set({ teto: false })}>{T.egenOpt}</button>
        </div>

        <label className="lb">{T.q2(board.nick)}</label>
        {AXES.map((k) => (
          <div key={k} className="ask-opts two">
            {AXIS_V[k].map((v, i) => <button key={v} type="button" className={'chip' + (ans[k] === v ? ' sel' : '')} onClick={() => set({ [k]: v } as Partial<AskAnswer>)}>{T.axes[k][i]}</button>)}
          </div>
        ))}

        <label className="lb">{T.q3}</label>
        {opts('charm', O.charms)}
        <label className="lb">{T.q4}</label>
        {opts('love', O.loves)}
        <label className="lb">{T.q5}</label>
        {opts('animal', O.animals)}
        <label className="lb">{T.q6(board.nick)}</label>
        {opts('island', O.islands)}

        <button className="btn" style={{ marginTop: 24 }} disabled={!done || busy} onClick={submit}>{busy ? T.sending : T.send}</button>
        <p className="past-note">{T.sendNote}</p>
      </section>
    </Shell>
  );
}
