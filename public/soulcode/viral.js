/* 소울코드 바이럴·도파민 장치 (설계서 1단계, 결제 없음)
 * ① "나랑 궁합 보기" 초대 링크 + 둘이 동시에 점수 공개 + 친구 알림
 * ② 무료 별: 출석 1 · 7일 연속 5 · 초대한 친구가 끝내면 둘 다 5 → 궁합 "싸우는 이유·해결법" 열기(별 10)
 * ③ 숨은 칭호 (실제 생일 분포로 계산한 비율)
 * ④ MBTI 16유형 도감 (빈 칸 = 친구 초대)
 * ⑤ 연속 기록 주 1회 무료 복구
 * app.js 뒤에 로드돼요. app.js의 전역(TL, LG, store, $, toast, profile, saju …)을 그대로 써요. */
(function () {
  if (typeof TL !== 'function') return;
  const PFX = LG === 'ko' ? '/app' : '/' + LG;
  const device = () => { try { let d = localStorage.getItem('soulcode.device'); if (!d) { d = crypto.randomUUID(); localStorage.setItem('soulcode.device', d); } return d; } catch (e) { return ''; } };
  const api = async (path, opt = {}) => { const r = await fetch('/api/duo' + path, { ...opt, headers: { 'content-type': 'application/json', 'x-ask-device': device(), ...(opt.headers || {}) } }); const j = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(j.code || 'error'), { code: j.code }); return j; };
  let ready = null; const online = () => !!(window.soulConfig) && ready !== false;
  const checkReady = () => fetch('/api/duo').then((r) => r.json()).then((j) => { ready = !!j.ok; if (ready) { renderDuoBox(); guestPrompt(); hostPoll(); } }).catch(() => { ready = false; });

  /* ---------- 공통 모달 ---------- */
  function modal(html) {
    let m = $('vxM');
    if (!m) { $('app').insertAdjacentHTML('beforeend', '<div class="modal" id="vxM" onclick="if(event.target.id===\'vxM\')vxClose()"><div class="pw" id="vxIn"></div></div>'); m = $('vxM'); }
    $('vxIn').innerHTML = html; m.classList.add('show');
  }
  window.vxClose = () => { const m = $('vxM'); m && m.classList.remove('show'); };

  /* ---------- ② 별 ---------- */
  const ST = () => store.get('soulcode.stars') || { bal: 0, day: '', s7: 0, got: {} };
  const stars = () => ST().bal;
  function addStars(n, why, key) {
    const s = ST(); if (key) { if (s.got[key]) return false; s.got[key] = 1; }
    s.bal += n; store.set('soulcode.stars', s); refreshStarChip();
    if (why) setTimeout(() => toast(`⭐ +${n} · ${why}`), 300);
    return true;
  }
  function spendStars(n) { const s = ST(); if (s.bal < n) return false; s.bal -= n; store.set('soulcode.stars', s); refreshStarChip(); return true; }
  window.vxStars = stars;
  function dailyStars() {
    if (!profile) return;
    const s = ST(), k = todayKey();
    if (s.day !== k) { s.day = k; store.set('soulcode.stars', s); addStars(1, TL('오늘 출석', 'daily check-in', '今日のログイン')); }
    const n = calcStreak();
    if (n >= 7 && n % 7 === 0) addStars(5, TL(`${n}일 연속 출석`, `${n}-day streak`, `${n}日連続ログイン`), 'streak-' + k);
  }
  function refreshStarChip() {
    document.querySelectorAll('.vx-star-n').forEach((e) => (e.textContent = stars()));
  }
  function starChip() {
    const t = $('s-tarot'); if (!t || $('vxStarChip')) return;
    const hd = $('todayStreak'); if (!hd) return;
    const w = document.createElement('div'); w.className = 'vx-chips'; hd.parentNode.insertBefore(w, hd); w.appendChild(hd); w.insertAdjacentHTML('beforeend', `<button class="vx-chip" id="vxStarChip" onclick="vxStarInfo()">⭐ <b class="vx-star-n">${stars()}</b></button>`);
  }
  window.vxStarInfo = () => modal(`<div style="text-align:center"><div style="font-size:44px">⭐</div><h3 class="h-display" style="font-size:22px">${TL('내 별', 'My stars', 'わたしの星')} <span class="vx-star-n">${stars()}</span></h3>
    <p class="fit-s" style="margin-top:8px">${TL('별로 궁합의 "둘이 싸우는 이유 · 해결법"을 열 수 있어요 (별 10개).', 'Use stars to open "Why you fight · How to fix it" in a match (10 stars).', '星で相性の「ケンカの理由・解決法」を開けます(星10個)。')}</p>
    <div class="vx-earn"><div>📅 ${TL('매일 출석', 'Daily check-in', '毎日ログイン')} <b>+1</b></div><div>🔥 ${TL('7일 연속', '7-day streak', '7日連続')} <b>+5</b></div><div>💌 ${TL('내 링크로 친구가 궁합을 끝내면 둘 다', 'A friend finishes your match link — both get', '自分のリンクで友達が相性診断を終えるとふたりとも')} <b>+5</b></div></div>
    <p class="muted" style="font-size:12px;margin-top:8px">${TL('지금은 무료 베타라 별은 무료로만 모을 수 있어요.', 'During the free beta, stars can only be earned for free.', '無料ベータ中は星は無料でのみ集められます。')}</p></div>
    <button class="btn" style="margin-top:14px" onclick="vxClose();vxInvite()">${TL('💌 친구 초대하고 별 받기', '💌 Invite a friend for stars', '💌 友達を招待して星をもらう')}</button><button class="btn ghost" style="margin-top:10px" onclick="vxClose()">${TL('닫기', 'Close', '閉じる')}</button>`);

  /* ---------- 궁합 점수 (runMatch와 같은 계산) ---------- */
  function duoScore(A, B) {
    const ea = STEM_EL[A.stem], eb = STEM_EL[B.stem], rel = (eb - ea + 5) % 5;
    const sj = { ...SAJU_MATCH[rel], s: Math.round((SAJU_MATCH[rel].s + SAJU_MATCH[(5 - rel) % 5].s) / 2) }; /* 둘이 같은 점수를 보도록 양방향 평균 */ const hap = Math.abs(A.stem - B.stem) === 5;
    if (hap) sj.s = Math.max(sj.s, 95); else if (A.stem % 2 !== B.stem % 2) sj.s += 4;
    const mm = mbtiMatch(A.mbti, B.mbti), tt = ttiMatch(A.yb, B.yb);
    const total = Math.round(sj.s * 0.45 + mm.s * 0.4 + tt.s * 0.15);
    const verdict = total >= 88 ? TL('천생연분 레벨 💖', 'Soulmate level 💖', '運命の相手レベル 💖') : total >= 78 ? TL('찰떡 케미 ✨', 'Perfect chemistry ✨', '相性ばっちり ✨') : total >= 66 ? TL('노력하면 꿀케미 🍯', 'Sweet with a little effort 🍯', '歩み寄れば最高の相性 🍯') : TL('롤러코스터 케미 🎢', 'Rollercoaster chemistry 🎢', 'ジェットコースター相性 🎢');
    return { total, verdict, sj, mm, tt, rel, hap };
  }
  const meMember = () => { getSaju(); return { nick: profile.nick.slice(0, 10), mbti: profile.mbti, stem: saju.dayStem, yb: saju.yearBranch }; };

  /* ---------- ② 싸우는 이유 · 해결법 ---------- */
  const DIM = {
    0: [TL('한 명은 밖에서, 한 명은 혼자 있을 때 충전돼요. 주말 계획에서 서운함이 쌓이기 쉬워요.', 'One recharges out with people, the other alone. Weekend plans are where hurt feelings pile up.', 'ひとりは外で、ひとりはひとりで充電するタイプ。週末の予定で不満がたまりがち。'),
        TL('주말을 반반으로: 하루는 같이 나가고, 하루는 각자 쉬는 날로 정해요.', 'Split the weekend: one day out together, one day of solo rest.', '週末は半分ずつ: 1日は一緒に出かけて、1日はそれぞれ休む日に。')],
    1: [TL('한 명은 지금 눈앞의 현실, 한 명은 가능성을 이야기해요. "그래서 결론이 뭐야?"에서 부딪혀요.', 'One talks about what is real now, the other about what could be. "So what is the point?" is where you clash.', 'ひとりは目の前の現実、ひとりは可能性の話。「で、結論は?」でぶつかる。'),
        TL('대화 시작에 "오늘은 상상 모드" 또는 "현실 모드"를 먼저 정해요.', 'Agree at the start: "imagination mode" or "reality mode" today.', '話す前に「今日は想像モード」か「現実モード」かを決めよう。')],
    2: [TL('한 명은 해결책을, 한 명은 공감을 원해요. 위로가 충고로 들려서 싸움이 커져요.', 'One wants solutions, the other wants empathy. Comfort sounds like advice and the fight grows.', 'ひとりは解決策、ひとりは共感がほしい。なぐさめがアドバイスに聞こえてケンカが大きくなる。'),
        TL('고민을 들으면 먼저 "해결해줄까, 들어만 줄까?"라고 물어봐요.', 'When they vent, ask first: "Want a fix, or just an ear?"', '悩みを聞いたら、まず「解決したい?聞いてほしいだけ?」と聞いてみて。')],
    3: [TL('계획파와 즉흥파 조합이에요. 약속 시간과 갑작스러운 일정 변경에서 터져요.', 'A planner and a go-with-the-flow type. Being late and sudden changes set things off.', '計画派と即興派のコンビ。約束の時間と急な予定変更で爆発しがち。'),
        TL('큰 일정만 같이 정하고, 나머지는 즉흥에 맡겨요.', 'Plan only the big things together and leave the rest spontaneous.', '大きな予定だけ一緒に決めて、残りは即興にまかせよう。')],
  };
  const SAME = [TL('너무 닮아서 같은 순간에 동시에 예민해져요. 둘 다 물러서지 않아요.', 'You are so alike that you get touchy at the same moment, and neither backs down.', '似すぎていて、同じタイミングで同時にピリピリ。どちらも引かない。'),
    TL('"오늘은 내가 맞춰줄게" 당번을 번갈아 정해요.', 'Take turns being the one who says "today I will go with you."', '「今日は私が合わせる」当番を交代で決めよう。')];
  const REL = [
    [TL('사주로 보면 같은 기운끼리라 고집 대결이 잦아요.', 'By Saju you share the same element, so stubborn standoffs are common.', '四柱推命では同じ気どうしなので、意地の張り合いが多め。'), TL('이기는 대화 말고 끝내는 대화: 10분 쉬고 다시 얘기해요.', 'Aim to end the talk, not win it: take 10 minutes, then try again.', '勝つ会話より終わらせる会話を: 10分休んでから話そう。')],
    [TL('사주로 보면 내가 주는 쪽이라 "나만 챙긴다"는 서운함이 생겨요.', 'By Saju you are the giver, so "I am the only one who cares" can creep in.', '四柱推命ではあなたが与える側なので「私ばかり」と感じやすい。'), TL('고마운 걸 말로 표현하는 날을 정해요.', 'Set a day to say thank-yous out loud.', '感謝を言葉にする日を決めよう。')],
    [TL('사주로 보면 내가 이끄는 구조라 상대가 답답함을 느껴요.', 'By Saju you lead, so they can feel boxed in.', '四柱推命ではあなたが引っぱる構造なので、相手が窮屈に感じやすい。'), TL('결정하기 전에 상대 의견을 먼저 물어봐요.', 'Ask their opinion before you decide.', '決める前に相手の意見を先に聞こう。')],
    [TL('사주로 보면 상대 말이 잔소리처럼 들리기 쉬워요.', 'By Saju their words can sound like nagging.', '四柱推命では相手の言葉が小言に聞こえやすい。'), TL('피드백은 "칭찬 하나 + 부탁 하나"로 주고받아요.', 'Trade feedback as "one compliment + one request."', 'フィードバックは「ほめる+お願い1つ」で。')],
    [TL('사주로 보면 내가 기대기만 해서 상대가 지칠 수 있어요.', 'By Saju you lean on them a lot, which can wear them out.', '四柱推命ではあなたが頼りがちで、相手が疲れることも。'), TL('작은 것이라도 내가 먼저 챙겨줘요.', 'Take care of them first, even in small ways.', '小さなことでも先に気づかってあげよう。')],
  ];
  function fightLines(A, B) {
    const diff = [0, 1, 2, 3].filter((i) => A.mbti[i] !== B.mbti[i]);
    const order = [2, 3, 0, 1]; // 체감 큰 순서
    const pick = order.filter((i) => diff.includes(i)).slice(0, 2).map((i) => DIM[i]);
    if (!pick.length) pick.push(SAME);
    pick.push(REL[(STEM_EL[B.stem] - STEM_EL[A.stem] + 5) % 5]);
    return pick;
  }
  const pairKey = (A, B) => [A.mbti, A.stem, A.yb, B.nick, B.mbti, B.stem, B.yb].join('|');
  // 잠긴 동안에는 진짜 내용을 페이지에 넣지 않고 모양만 비슷한 자리표시를 보여줘요 (흐림 효과 너머로 읽히지 않게)
  const lockedBodies = {};
  const lockedPreview = (n) => Array.from({ length: n }, () => `<div class="vx-fight"><p>🔥 <b>${TL('싸우는 이유', 'Why you fight', 'ケンカの理由')}</b><br>●●●●●● ●●●● ●●●●●●● ●●●●●</p><p>🩹 <b>${TL('해결법', 'How to fix it', '解決法')}</b><br>●●●●● ●●●●●●● ●●●●</p></div>`).join('');
  function fightHTML(A, B, slot) {
    const key = pairKey(A, B), open = (store.get('soulcode.opened') || {})[key];
    const L = fightLines(A, B);
    const body = L.map(([r, f], i) => `<div class="vx-fight"><p>🔥 <b>${TL('싸우는 이유', 'Why you fight', 'ケンカの理由')} ${i + 1}</b><br>${r}</p><p>🩹 <b>${TL('해결법', 'How to fix it', '解決法')}</b><br>${f}</p></div>`).join('');
    lockedBodies[slot] = open ? null : body;
    return `<div class="sec-t">${TL('🔥 둘이 싸우는 이유 · 해결법', '🔥 Why you fight · How to fix it', '🔥 ふたりがケンカする理由・解決法')}</div>
      <div class="panel vx-lock${open ? ' open' : ''}" id="${slot}"><div class="vx-lock-body">${open ? body : lockedPreview(L.length)}</div>${open ? '' : `<div class="vx-veil"><b>${TL(`${esc(B.nick)}님과 부딪히는 지점 ${L.length}가지`, `${L.length} friction points with ${esc(B.nick)}`, `${esc(B.nick)}さんとぶつかるポイント${L.length}つ`)}</b><button class="btn" onclick="vxOpenFight('${slot}','${encodeURIComponent(key)}')">⭐ 10${TL('개로 열기', ' to open', '個で開く')} <small>(${TL('보유', 'you have', '所持')} <span class="vx-star-n">${stars()}</span>)</small></button></div>`}</div>`;
  }
  window.vxOpenFight = (slot, k) => {
    const key = decodeURIComponent(k);
    if (!spendStars(10)) {
      modal(`<div style="text-align:center"><div style="font-size:44px">⭐</div><h3 class="h-display" style="font-size:22px">${TL('별이 조금 모자라요', 'Not enough stars yet', '星が少し足りません')}</h3><p class="fit-s" style="margin-top:8px">${TL(`지금 ${stars()}개 · 10개가 필요해요. 친구 한 명이 내 링크로 궁합을 끝내면 둘 다 5개씩 받아요.`, `You have ${stars()} · 10 needed. When a friend finishes your match link, you both get 5.`, `今${stars()}個 · 10個必要です。友達がリンクから相性診断を終えるとふたりとも5個もらえます。`)}</p></div><button class="btn" style="margin-top:14px" onclick="vxClose();vxInvite()">${TL('💌 친구 초대하기', '💌 Invite a friend', '💌 友達を招待')}</button><button class="btn ghost" style="margin-top:10px" onclick="vxClose()">${TL('닫기', 'Close', '閉じる')}</button>`);
      return;
    }
    const o = store.get('soulcode.opened') || {}; o[key] = 1; store.set('soulcode.opened', o);
    const el = $(slot); if (el) { const b = el.querySelector('.vx-lock-body'); if (b && lockedBodies[slot]) b.innerHTML = lockedBodies[slot]; el.classList.add('open'); const v = el.querySelector('.vx-veil'); v && v.remove(); burst(el, 12); }
    try { navigator.vibrate && navigator.vibrate(25); } catch (e) {}
  };

  /* ---------- ④ MBTI 도감 ---------- */
  const DEX = () => store.get('soulcode.mbtiDex') || {};
  function dexAdd(mbti, nick) {
    if (!/^[EI][SN][TF][JP]$/.test(mbti || '')) return;
    const d = DEX(); if (d[mbti]) return; d[mbti] = (nick || '').slice(0, 10) || '✓'; store.set('soulcode.mbtiDex', d);
    const n = Object.keys(d).length;
    setTimeout(() => toast(TL(`🧩 MBTI 도감 ${mbti} 채움! (${n}/16)`, `🧩 MBTI collection: ${mbti} added! (${n}/16)`, `🧩 MBTI図鑑に${mbti}追加!(${n}/16)`)), 900);
  }
  function renderDex() {
    const me = $('s-me'); if (!me || !profile) return;
    let box = $('vxDex');
    if (!box) {
      const anchor = [...me.querySelectorAll('.sec-t')].find((h) => (h.dataset.ko || h.textContent).includes('카드 도감'));
      if (!anchor) return;
      anchor.insertAdjacentHTML('beforebegin', `<div class="sec-t" id="vxDexT"></div><div class="panel" id="vxDex"></div>`);
      box = $('vxDex');
    }
    const d = DEX(); if (!d[profile.mbti]) { d[profile.mbti] = profile.nick.slice(0, 10); store.set('soulcode.mbtiDex', d); }
    const n = Object.keys(d).length;
    $('vxDexT').textContent = TL(`🧩 MBTI 도감 · ${n} / 16`, `🧩 MBTI collection · ${n} / 16`, `🧩 MBTI図鑑 · ${n} / 16`);
    const types = Object.keys(MBTI);
    box.innerHTML = `<div class="vx-dex">${types.map((t) => d[t] ? `<div class="on"><b>${t}</b><small>${esc(d[t])}</small></div>` : `<button onclick="vxInvite('${t}')"><b>${t}</b><small>${TL('초대하기', 'Invite', '招待')}</small></button>`).join('')}</div>
      <p class="fit-s" style="margin-top:8px">${n >= 15 && n < 16 ? TL(`${types.find((t) => !d[t])} 친구만 있으면 도감 완성!`, `Just one ${types.find((t) => !d[t])} friend to complete it!`, `${types.find((t) => !d[t])}の友達がいれば図鑑完成!`) : TL('궁합을 볼 때마다 칸이 채워져요. 빈 칸을 눌러 그 유형 친구를 초대해봐요.', 'Each match fills a slot. Tap an empty one to invite a friend of that type.', '相性を見るたびにマスが埋まります。空きマスを押してその型の友達を招待しよう。')}</p>`;
  }

  /* ---------- ① 나랑 궁합 보기 ---------- */
  const LINKS = () => store.get('soulcode.duo.links') || [];
  async function ensureLink() {
    const ls = LINKS(); if (ls[0]) return ls[0];
    let endpoint = null;
    try { const reg = await navigator.serviceWorker.getRegistration(); const sub = reg && (await reg.pushManager.getSubscription()); endpoint = sub ? sub.endpoint : null; } catch (e) {}
    const r = await api('', { method: 'POST', body: JSON.stringify({ me: meMember(), endpoint, lang: LG }) });
    const l = { code: r.code, token: r.hostToken, at: Date.now() };
    store.set('soulcode.duo.links', [l, ...ls].slice(0, 5));
    return l;
  }
  window.vxInvite = async (want) => {
    if (!profile) { go('s-onb'); return; }
    if (!online() || ready !== true) { toast(TL('잠시 후 다시 시도해주세요', 'Please try again later', 'しばらくしてから再度お試しください')); return; }
    let l; try { l = await ensureLink(); } catch (e) { toast(TL('링크를 만들지 못했어요. 잠시 후 다시 시도해주세요', 'Could not create the link. Please try again later', 'リンクを作れませんでした。しばらくしてから再度お試しください')); return; }
    const url = `${location.origin}${PFX}?duo=${l.code}`;
    const text = TL(`${profile.nick}랑 궁합 볼래? 💞\n생일이랑 MBTI만 넣으면 둘의 점수가 동시에 공개돼!${want ? `\n(${want} 친구 찾는 중 🔎)` : ''}\n👉 ${url}`,
      `Wanna check our chemistry with ${profile.nick}? 💞\nJust add your birthday + MBTI and our score is revealed to both of us!${want ? `\n(looking for an ${want} friend 🔎)` : ''}\n👉 ${url}`,
      `${profile.nick}と相性診断しない? 💞\n誕生日とMBTIを入れるだけで、ふたりのスコアが同時に公開されるよ!${want ? `\n(${want}の友達を探し中 🔎)` : ''}\n👉 ${url}`);
    try { if (navigator.share) { await navigator.share({ text }); afterInvite(); return; } } catch (e) { return; }
    try { await navigator.clipboard.writeText(text); toast(TL('링크를 복사했어요! 친구에게 붙여넣기 💌', 'Link copied! Paste it to a friend 💌', 'リンクをコピーしました!友達に貼り付けて 💌')); afterInvite(); } catch (e) { prompt(TL('이 링크를 복사해서 보내주세요', 'Copy and send this link', 'このリンクをコピーして送ってください'), url); }
  };
  async function afterInvite() {
    // 알림이 꺼져 있으면 "친구가 끝내면 알려줄까?" 한 번만
    try {
      if (store.get('soulcode.duo.pushAsked')) return;
      const st = await pushState(); if (st !== 'ready') return;
      store.set('soulcode.duo.pushAsked', 1);
      setTimeout(() => modal(`<div style="text-align:center"><div style="font-size:44px">🔔</div><h3 class="h-display" style="font-size:22px">${TL('친구가 끝내면 알려줄까요?', 'Want a ping when they finish?', '友達が終えたらお知らせする?')}</h3><p class="fit-s" style="margin-top:8px">${TL('친구가 검사를 끝내는 순간 둘의 점수가 열려요. 알림은 하루 최대 2개, 밤 10시~아침 8시엔 안 보내요.', 'Your score opens the moment they finish. Max 2 alerts a day, none from 10 p.m. to 8 a.m.', '友達が診断を終えた瞬間にスコアが開きます。通知は1日最大2件、夜22時〜朝8時は送りません。')}</p></div><button class="btn" style="margin-top:14px" onclick="vxClose();enablePush()">${TL('알림 받기', 'Turn on', '受け取る')}</button><button class="btn ghost" style="margin-top:10px" onclick="vxClose()">${TL('괜찮아요', 'No thanks', '大丈夫')}</button>`), 1200);
    } catch (e) {}
  }
  // 알림을 켜면 내 링크들에 알림 주소 연결
  window.vxSyncEndpoint = async () => {
    try { const reg = await navigator.serviceWorker.getRegistration(); const sub = reg && (await reg.pushManager.getSubscription()); if (!sub) return;
      for (const l of LINKS()) await api('/' + l.code, { method: 'PATCH', headers: { 'x-duo-token': l.token }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
    } catch (e) {}
  };

  function revealHTML(A, B, s, head) {
    const bar = (lab, v, col) => `<div class="row"><span class="nm" style="width:76px">${lab}</span><div class="track"><div class="fill" data-w="${v}" style="background:${col}"></div></div><span class="ct">${v}</span></div>`;
    return `<div style="text-align:center"><div class="muted" style="font-size:13px">${head}</div>
      <div class="vx-flip"><div class="vx-flip-in">
        <div class="vx-face vx-back">💞<small>${TL('탭해서 공개', 'Tap to reveal', 'タップして公開')}</small></div>
        <div class="vx-face vx-front"><div class="vx-names">${STEM_INFO[A.stem].emoji} ${esc(A.nick)} × ${esc(B.nick)} ${STEM_INFO[B.stem].emoji}</div><div class="heart holo-text" style="font-size:64px;line-height:1">${s.total}</div><div class="h-display" style="font-size:20px;margin-top:4px">${s.verdict}</div></div>
      </div></div></div>
      <div class="bars vx-bars" style="margin-top:10px;opacity:0">${bar(TL('☯︎ 사주', '☯︎ Saju', '☯︎ 四柱'), s.sj.s, 'var(--lav)')}${bar('🧬 MBTI', s.mm.s, 'var(--pink)')}${bar(TL('🐾 띠', '🐾 Zodiac', '🐾 干支'), s.tt.s, 'var(--cyan)')}</div>
      <div class="vx-more" style="opacity:0">${fightHTML(A, B, 'vxFightM')}</div>`;
  }
  function animateReveal() {
    const f = document.querySelector('#vxIn .vx-flip'); if (!f) return;
    const go2 = () => { if (f.classList.contains('on')) return; f.classList.add('on'); try { navigator.vibrate && navigator.vibrate([20, 40, 30]); } catch (e) {}
      setTimeout(() => { burst(f, 18); document.querySelectorAll('#vxIn .vx-bars,#vxIn .vx-more').forEach((e) => (e.style.opacity = 1)); document.querySelectorAll('#vxIn .fill').forEach((x) => (x.style.width = x.dataset.w + '%')); }, 600); };
    f.onclick = go2; setTimeout(go2, 1400);
  }

  // 초대받은 사람
  try { const q = new URLSearchParams(location.search).get('duo'); if (q && /^[a-z2-9]{8}$/.test(q)) { store.set('soulcode.pendingDuo', q); history.replaceState(null, '', location.pathname); } } catch (e) {}
  async function guestPrompt() {
    const code = store.get('soulcode.pendingDuo'); if (!code || !profile || ready !== true) return;
    if (LINKS().some((l) => l.code === code)) { store.del('soulcode.pendingDuo'); toast(TL('내가 만든 링크예요. 친구에게 보내봐요 💌', 'That is your own link. Send it to a friend 💌', '自分のリンクです。友達に送ってみて 💌')); return; }
    let host; try { host = await api('/' + code); } catch (e) { store.del('soulcode.pendingDuo'); toast(TL('없어진 링크예요', 'This link no longer exists', 'なくなったリンクです')); return; }
    modal(`<div style="text-align:center"><div style="font-size:46px">💞</div><h3 class="h-display" style="font-size:22px;margin-top:6px">${TL(`${esc(host.nick)}님이 궁합 결과를<br>기다리고 있어요`, `${esc(host.nick)} is waiting<br>for your match result`, `${esc(host.nick)}さんが相性の結果を<br>待っています`)}</h3>
      <p class="fit-s" style="margin:10px 0 0">${TL('공개 버튼을 누르면 둘에게 동시에 점수가 열려요.<br>상대에게는 <b>별명·MBTI·일간·띠</b>만 보이고, 생년월일은 공유되지 않아요.', 'Tap reveal and the score opens for both of you at once.<br>They only see your <b>nickname, MBTI, day master and zodiac</b>, never your birthday.', '公開ボタンを押すと、ふたりに同時にスコアが開きます。<br>相手に見えるのは<b>ニックネーム・MBTI・日干・干支</b>だけで、生年月日は共有されません。')}</p></div>
      <button class="btn" style="margin-top:16px" onclick="vxJoin('${code}')">${TL('결과 공개 💞', 'Reveal 💞', '結果を公開 💞')}</button><button class="btn ghost" style="margin-top:10px" onclick="store.del('soulcode.pendingDuo');vxClose()">${TL('다음에', 'Later', 'また今度')}</button>`);
    window._vxHost = host;
  }
  window.vxJoin = async (code) => {
    const host = window._vxHost, me = meMember();
    try { await api(`/${code}/join`, { method: 'POST', body: JSON.stringify(me) }); } catch (e) { toast(e.code === 'full' ? TL('이 링크는 마감됐어요', 'This link is full', 'このリンクは締め切られました') : TL('공개하지 못했어요. 잠시 후 다시 시도해주세요', 'Could not reveal. Please try again later', '公開できませんでした。しばらくしてから再度お試しください')); return; }
    store.del('soulcode.pendingDuo');
    const H = { nick: host.nick, mbti: host.mbti, stem: host.stem, yb: host.yb };
    const s = duoScore(me, H);
    const j = store.get('soulcode.duo.joined') || {}; j[code] = { ...H, total: s.total, at: Date.now() }; store.set('soulcode.duo.joined', j);
    dexAdd(H.mbti, H.nick);
    const got = addStars(5, TL('친구 궁합 완료', 'match completed', '相性診断完了'), 'duo-' + code);
    modal(revealHTML(me, H, s, TL(`💞 ${esc(H.nick)}님에게도 지금 열렸어요`, `💞 Just opened for ${esc(H.nick)} too`, `💞 ${esc(H.nick)}さんにも今開きました`)) +
      `<div class="vx-cta"><p class="fit-s">${got ? TL('⭐ 별 5개 받았어요!', '⭐ You got 5 stars!', '⭐ 星5個ゲット!') : ''} ${TL('나도 내 링크를 만들어 다른 친구들과 궁합을 봐요', 'Make your own link and match with more friends', '自分のリンクを作って、他の友達とも相性を見よう')}</p><button class="btn" onclick="vxClose();vxInvite()">${TL('💌 내 궁합 링크 보내기', '💌 Send my match link', '💌 自分の相性リンクを送る')}</button><button class="btn ghost" style="margin-top:10px" onclick="vxClose()">${TL('닫기', 'Close', '閉じる')}</button></div>`);
    animateReveal(); renderDuoBox();
  };

  // 링크 주인: 새로 끝낸 친구 확인
  let polling = false;
  async function hostPoll() {
    const ls = LINKS(); if (!ls.length || !profile || ready !== true || polling) return;
    polling = true;
    try {
      const r = await api('/mine', { method: 'POST', body: JSON.stringify({ links: ls.map((l) => ({ code: l.code, token: l.token })) }) });
      if (r.gone && r.gone.length) store.set('soulcode.duo.links', ls.filter((l) => !r.gone.includes(l.code)));
      const guests = r.guests || []; store.set('soulcode.duo.cache', guests.slice(0, 30));
      const seen = new Set(store.get('soulcode.duo.seen') || []);
      const fresh = guests.filter((g) => !seen.has(g.id));
      if (fresh.length) {
        fresh.forEach((g) => { seen.add(g.id); dexAdd(g.mbti, g.nick); addStars(5, TL(`${g.nick}님이 궁합 완료`, `${g.nick} finished your match`, `${g.nick}さんが相性診断完了`), 'duo-g-' + g.id); });
        store.set('soulcode.duo.seen', [...seen].slice(-300));
        const g = fresh[0], me = meMember(), s = duoScore(me, g);
        modal(revealHTML(me, g, s, TL(`💞 ${esc(g.nick)}님이 검사를 끝냈어요!${fresh.length > 1 ? ` 외 ${fresh.length - 1}명` : ''}`, `💞 ${esc(g.nick)} finished the test!${fresh.length > 1 ? ` +${fresh.length - 1} more` : ''}`, `💞 ${esc(g.nick)}さんが診断を終えました!${fresh.length > 1 ? ` ほか${fresh.length - 1}人` : ''}`)) +
          `<div class="vx-cta"><button class="btn" onclick="vxClose();go('s-match')">${TL('내 궁합 목록 보기', 'See all my matches', '自分の相性リストを見る')}</button><button class="btn ghost" style="margin-top:10px" onclick="vxClose()">${TL('닫기', 'Close', '閉じる')}</button></div>`);
        animateReveal();
      }
      renderDuoBox();
    } catch (e) {} finally { polling = false; }
  }
  window.vxShowGuest = (id) => {
    const g = (store.get('soulcode.duo.cache') || []).find((x) => x.id === id); if (!g) return;
    const me = meMember(), s = duoScore(me, g);
    modal(revealHTML(me, g, s, TL(`💞 ${esc(g.nick)}님과의 궁합`, `💞 You × ${esc(g.nick)}`, `💞 ${esc(g.nick)}さんとの相性`)) + `<button class="btn ghost" style="margin-top:12px" onclick="vxClose()">${TL('닫기', 'Close', '閉じる')}</button>`);
    const f = document.querySelector('#vxIn .vx-flip'); f.classList.add('on'); document.querySelectorAll('#vxIn .vx-bars,#vxIn .vx-more').forEach((e) => (e.style.opacity = 1)); setTimeout(() => document.querySelectorAll('#vxIn .fill').forEach((x) => (x.style.width = x.dataset.w + '%')), 50);
  };
  function renderDuoBox() {
    const f = $('mtForm'); if (!f || !profile || ready !== true) return;
    let box = $('vxDuo');
    if (!box) { const anchor = $('hubMatch') || f; anchor.insertAdjacentHTML('beforebegin', '<div class="panel vx-duo" id="vxDuo"></div>'); box = $('vxDuo'); }
    const gs = store.get('soulcode.duo.cache') || [], me = gs.length ? meMember() : null;
    const joined = Object.values(store.get('soulcode.duo.joined') || {});
    box.innerHTML = `<div class="vx-duo-h"><div><b>${TL('💌 나랑 궁합 보기', '💌 Match with me', '💌 わたしと相性診断')}</b><small>${TL('링크를 보내면 친구가 끝내는 순간 둘 다 점수 공개', 'Send a link — the score opens for both the moment they finish', 'リンクを送ると、友達が終えた瞬間にふたりともスコア公開')}</small></div><button class="btn" onclick="vxInvite()">${TL('링크 보내기', 'Send link', 'リンクを送る')}</button></div>
      ${gs.length || joined.length ? `<div class="vx-duo-list">${gs.map((g) => { const s = duoScore(me, g); return `<button onclick="vxShowGuest('${g.id}')"><span>${STEM_INFO[g.stem].emoji} ${esc(g.nick)} <small>${g.mbti}</small></span><b>${s.total}</b></button>`; }).join('')}${joined.map((h) => `<div class="j"><span>${STEM_INFO[h.stem].emoji} ${esc(h.nick)} <small>${h.mbti}</small></span><b>${h.total}</b></div>`).join('')}</div>` : ''}`;
  }

  /* ---------- ③ 숨은 칭호 ---------- */
  function titleOf(counts) {
    const mx = Math.max(...counts), mn = Math.min(...counts);
    if (mx >= 4) { const i = counts.indexOf(mx); return { k: 'max' + i, e: EL[i].emoji, t: TL(`${EL[i].ko} 기운 몰빵형`, `All-in ${EL[i].ko}`, `${EL[i].ko}の気 全振り型`) }; }
    if (mn === 0) { const zs = counts.map((c, i) => (c === 0 ? i : -1)).filter((i) => i >= 0); if (zs.length >= 2) return { k: 'zero2', e: '🕳️', t: TL('두 기운이 텅 빈 극단형', 'Two-elements-missing extremist', '2つの気が空っぽの極端型') }; return { k: 'zero' + zs[0], e: EL[zs[0]].emoji, t: TL(`${EL[zs[0]].ko} 기운 0개 미스터리형`, `Zero-${EL[zs[0]].ko} mystery`, `${EL[zs[0]].ko}の気ゼロのミステリー型`) }; }
    return { k: 'all', e: '🌈', t: TL('오행 올라운더', 'Five-element all-rounder', '五行オールラウンダー') };
  }
  let rarityCache = null;
  function rarity(k) {
    if (!rarityCache) {
      rarityCache = {}; let n = 0; const r = rng(20261119);
      for (let i = 0; i < 4000; i++) {
        const y = 1970 + Math.floor(r() * 41), m = 1 + Math.floor(r() * 12), d = 1 + Math.floor(r() * 28);
        try { const S = calcSaju(y, m, d, ''); const t = titleOf(S.counts); rarityCache[t.k] = (rarityCache[t.k] || 0) + 1; n++; } catch (e) {}
      }
      rarityCache._n = n;
    }
    return rarityCache[k] ? (rarityCache[k] / rarityCache._n) * 100 : null;
  }
  function renderTitle() {
    const tags = $('soulTags'); if (!tags || !profile) return;
    getSaju();
    const t = titleOf(saju.counts.slice());
    const shown = store.get('soulcode.title') === t.k;
    let box = $('vxTitle');
    if (!box) { tags.insertAdjacentHTML('afterend', '<div id="vxTitle"></div>'); box = $('vxTitle'); }
    if (!shown) { box.innerHTML = `<button class="vx-title-lock" onclick="vxRevealTitle()">🔒 ${TL('숨은 칭호 1개 · 탭해서 열기', '1 hidden title · tap to open', '隠し称号1つ · タップして開く')}</button>`; return; }
    const p = rarity(t.k);
    const rare = p != null && p < 10; const pp = p == null ? '' : p < 1 ? '<1%' : Math.round(p) + '%';
    const pctTx = p == null ? '' : TL(`생일 4,000개로 계산하면 약 ${pp}가 이 칭호${rare ? ' · 희귀 ✨' : ''}`, `About ${pp} of 4,000 sampled birthdays get this title${rare ? ' · rare ✨' : ''}`, `誕生日4,000件で計算すると約${pp}がこの称号${rare ? ' · レア ✨' : ''}`);
    box.innerHTML = `<div class="vx-title"><span>${t.e}</span><div><small>${TL('숨은 칭호', 'Hidden title', '隠し称号')}</small><b>${t.t}</b>${pctTx ? `<em>${pctTx}</em>` : ''}</div></div>`;
  }
  window.vxRevealTitle = () => {
    getSaju(); const t = titleOf(saju.counts.slice()); store.set('soulcode.title', t.k);
    renderTitle(); const b = $('vxTitle'); b && burst(b, 14); try { navigator.vibrate && navigator.vibrate(30); } catch (e) {}
  };

  /* ---------- ⑤ 연속 기록 복구 ---------- */
  const weekKey2 = () => { const d = new Date(); const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day); const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1)); return t.getUTCFullYear() + '-W' + Math.ceil(((t - y0) / 864e5 + 1) / 7); };
  function canRepair() {
    const v = new Set(getVisits()); const d1 = new Date(); d1.setDate(d1.getDate() - 1); const d2 = new Date(); d2.setDate(d2.getDate() - 2);
    return v.has(todayKey()) && !v.has(dateKey(d1)) && v.has(dateKey(d2)) && store.get('soulcode.streakFix') !== weekKey2();
  }
  window.vxRepair = () => {
    if (!canRepair()) return;
    const d1 = new Date(); d1.setDate(d1.getDate() - 1);
    const v = getVisits(); v.push(dateKey(d1)); v.sort(); mem.visits = v; store.set('soulcode.visits', v.slice(-90)); store.set('soulcode.streakFix', weekKey2());
    toast(TL(`🔥 연속 기록 복구! 지금 ${calcStreak()}일째`, `🔥 Streak restored! Now ${calcStreak()} days`, `🔥 連続記録を復旧!今${calcStreak()}日目`));
    renderRepair(); try { renderMe(); } catch (e) {} try { $('todayStreak').textContent = TL(`🔥 ${calcStreak()}일 연속`, `🔥 ${calcStreak()}-day streak`, `🔥 ${calcStreak()}日連続`); } catch (e) {}
  };
  function renderRepair() {
    const ev = $('evBox'); const old = $('vxRepair');
    if (!canRepair()) { old && old.remove(); return; }
    if (old || !ev) return;
    ev.insertAdjacentHTML('beforebegin', `<div class="ev-card" id="vxRepair"><div class="ev-e">🩹</div><div class="ev-b"><b>${TL('어제 하루 놓쳤어요', 'You missed yesterday', '昨日1日お休みしました')}</b><small>${TL('이번 주 무료 복구 1회로 연속 기록을 이어갈 수 있어요', 'Use this week\'s free restore to keep your streak', '今週の無料復旧1回で連続記録をつなげられます')}</small><button onclick="vxRepair()">${TL('무료로 복구하기', 'Restore for free', '無料で復旧する')} →</button></div></div>`);
  }

  /* ---------- 화면 연결 ---------- */
  function hookMatch() {
    const wrap = (fn) => function () {
      const r = fn.apply(this, arguments);
      try {
        const nick = $('mtNick').value.trim(), [y, m, d] = $('mtBirth').value.split('-').map(Number), mb = $('mtMbti').value;
        if (!y || !mb) return r;
        const B = calcSaju(y, m, d, ($('mtTime') && mt.rel === 'lover' && $('mtTime').value) || '');
        const them = { nick: nick || '?', mbti: mb, stem: B.dayStem, yb: B.yearBranch };
        dexAdd(mb, nick);
        const res = $('mtResult'), btns = res && res.querySelector('.row-btns');
        if (btns && !$('vxFightR')) btns.insertAdjacentHTML('beforebegin', fightHTML(meMember(), them, 'vxFightR'));
      } catch (e) {}
      return r;
    };
    if (typeof runMatch === 'function') runMatch = wrap(runMatch);
  }
  hookMatch();
  { const _go = go; go = function (id) { _go(id); if (profile && ['s-tarot', 's-soul'].includes(id)) dailyStars(); if (id === 's-match') renderDuoBox(); if (id === 's-soul') renderTitle(); if (id === 's-me') renderDex(); if (id === 's-tarot') { starChip(); renderRepair(); } if (['s-tarot', 's-soul', 's-match', 's-me'].includes(id)) { setTimeout(guestPrompt, 500); } }; }
  { const _ep = enablePush; enablePush = async function () { await _ep(); vxSyncEndpoint(); }; }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') hostPoll(); });

  // 시작
  if (window.soulConfig) checkReady();
  if (profile) {
    dailyStars();
    const act = document.querySelector('.screen.active'); const id = act && act.id;
    if (id === 's-tarot') { starChip(); renderRepair(); }
    if (id === 's-soul') renderTitle();
    if (id === 's-match') renderDuoBox();
    setTimeout(guestPrompt, 700);
    setTimeout(hostPoll, 1200);
  }
  // 처음 온 사람: 온보딩이 끝나면 초대 처리
  { const _fin = window.finishOnb; if (typeof _fin === 'function') window.finishOnb = function () { _fin.apply(this, arguments); setTimeout(() => { dailyStars(); guestPrompt(); }, 3000); }; }
})();
