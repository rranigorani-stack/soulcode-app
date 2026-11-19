/* 소울코드 다국어 (1단계: 화면 뼈대). 한국어 원문 → [English, 日本語]
 * 언어는 MY → 🌐 언어 또는 주소 ?lang=en|ja|ko 로 바꿔요. (아직 자동 감지 안 함: 콘텐츠 번역이 끝나면 켜기) */
(function(){
  const D={
    'OPEN YOUR SOULCODE ✦ 오늘의 나 해석 중 ✦':['OPEN YOUR SOULCODE ✦ READING TODAY’S YOU ✦','OPEN YOUR SOULCODE ✦ 今日のあなたを解読中 ✦'],
    '사주 ☯︎':['SAJU ☯︎','四柱推命 ☯︎'],
    '오늘 뭐 됨?':['What’s today?','今日どうなる?'],
    'MBTI는 핑계고, 사주는 거들 뿐 🔮':['MBTI is the excuse, Saju seals the deal 🔮','MBTIは言い訳、四柱推命は後押し 🔮'],
    '사주 × MBTI × 타로로 오늘의 나를 해석해드림':['Korean Saju × MBTI × Tarot decode today’s you','四柱推命×MBTI×タロットで今日のあなたを解読'],
    '내 소울코드 까보기 →':['Reveal my SOULCODE →','わたしのソウルコードを見る →'],
    '1분 컷 · 재미로 보는 콘텐츠예요':['Takes 1 minute · Just for fun','1分で完了 · 占いエンタメです'],
    '뭐라고 불러줄까? 👋':['What should we call you? 👋','なんて呼べばいい? 👋'],
    '본명 아니어도 됨. 결과 카드에 박제될 이름이에요.':['Doesn’t have to be your real name. It goes on your result card.','本名じゃなくてOK。結果カードに載る名前です。'],
    '다음':['Next','次へ'],
    '언제 지구에 착륙했어? 🛸':['When did you land on Earth? 🛸','いつ地球に着陸した? 🛸'],
    '양력 생년월일로 사주를 펼쳐요.':['We read your Saju from your birth date.','生年月日(西暦)で命式を出します。'],
    '태어난 시각을 분 단위로 알면 절기 경계까지 정확하게!':['Know your birth time? Even more accurate!','生まれた時刻がわかるともっと正確に!'],
    '생년월일':['Date of birth','生年月日'],
    '태어난 시간':['Time of birth','生まれた時間'],
    '🤷 시간 몰라요 (엄마한테 물어보기)':['🤷 I don’t know (ask mom)','🤷 わからない (お母さんに聞く)'],
    '이전':['Back','戻る'],
    '너의 MBTI는? 🧬':['What’s your MBTI? 🧬','あなたのMBTIは? 🧬'],
    '검사 안 해봤으면 느낌대로 GO. 한 줄에 하나씩!':['Never tested? Go with your gut. One per row!','診断してなければ直感でGO。1行に1つずつ!'],
    '소울코드 소환 ✨':['Summon my SOULCODE ✨','ソウルコード召喚 ✨'],
    '우주에서 너의 좌표 검색 중... 🛰️':['Searching for your coordinates in space... 🛰️','宇宙であなたの座標を検索中... 🛰️'],
    '반박 시 니 말이 맞음':['Disagree? You’re probably right','反論したらあなたが正しい'],
    '💬 그래서 나 어떤 사람인데?':['💬 So what kind of person am I?','💬 で、わたしってどんな人?'],
    '☯︎ 나의 사주 원국':['☯︎ My Four Pillars','☯︎ わたしの命式'],
    '⚖️ 오행 밸런스 체크':['⚖️ Five Elements balance','⚖️ 五行バランスチェック'],
    '🔎 알고 보면 쓸모 있는 TMI':['🔎 Surprisingly useful TMI','🔎 知っておくと役立つTMI'],
    '⚠️ 과하면 이렇게 됨':['⚠️ When it’s too much','⚠️ 強すぎるとこうなる'],
    '🔋 이거 채우면 완벽':['🔋 Fill this to be complete','🔋 これを補えば完璧'],
    '💞 찰떡 MBTI':['💞 Best-match MBTI','💞 相性抜群のMBTI'],
    '🤝 내 편 될 사람':['🤝 Who’s on your side','🤝 味方になる人'],
    '🃏 오늘의 카드 뽑으러 가기':['🃏 Draw today’s card','🃏 今日のカードを引く'],
    '🗓️ 이번 달 · 내년 운세 리포트':['🗓️ This month · next year report','🗓️ 今月・来年の運勢レポート'],
    '이거 완전 나잖아… 공유하기':['This is so me… share','これ完全にわたし… シェア'],
    'KASI 정본 만세력 기준 · 재미로 보는 콘텐츠예요':['Based on the official Korean calendar (KASI) · Just for fun','韓国天文研究院の暦に準拠 · 占いエンタメです'],
    '오늘 우주가 너한테 할 말 있대 🌙':['The universe has something to tell you 🌙','今日、宇宙があなたに伝えたいことがある 🌙'],
    '고민은 3초만, 끌리는 카드 한 장 콕':['Don’t overthink. Tap the card that calls you','迷うのは3秒だけ、気になる1枚をタップ'],
    '꾹— 눌러서 뒤집기 👆':['Press and hold to flip 👆','長押しでめくる 👆'],
    '🧠 T버전':['🧠 T mode','🧠 Tモード'],
    '💗 F버전':['💗 F mode','💗 Fモード'],
    '🤖 AI 맞춤 해석 받기':['🤖 Get my AI reading','🤖 AIの個別鑑定を受ける'],
    '📊 오늘의 컨디션 리포트':['📊 Today’s condition report','📊 今日のコンディション'],
    '🍀 오늘의 럭키템':['🍀 Today’s lucky items','🍀 今日のラッキーアイテム'],
    '📸 이거 스토리각, 공유하기':['📸 Story-worthy. Share it','📸 ストーリー映え、シェアする'],
    '새 카드는 자정에 리필돼요 · 재미로 보는 콘텐츠예요':['New card refills at midnight · Just for fun','新しいカードは0時に補充 · 占いエンタメです'],
    '고민 있지? 카드한테 털어놔':['Something on your mind? Tell the cards','悩みある? カードに話してみて'],
    '과거 · 현재 · 미래, 카드 3장이면 흐름 다 보여요.':['Past · Present · Future. Three cards show the whole flow.','過去・現在・未来、3枚で流れが見えます。'],
    '고민 한 줄 (선택)':['Your question (optional)','悩みをひとこと (任意)'],
    '카드 섞기 🔀 (두근)':['Shuffle the cards 🔀','カードを混ぜる 🔀 (ドキドキ)'],
    '궁금하잖아, 우리 사이 🫣':['Curious about us? 🫣','気になるよね、わたしたちの相性 🫣'],
    '생일이랑 MBTI만 알면 케미 견적 바로 나옴.':['Just a birthday and MBTI to check your chemistry.','誕生日とMBTIだけで相性がすぐわかる。'],
    '상대 닉네임':['Their nickname','相手のニックネーム'],
    '상대 생년월일':['Their date of birth','相手の生年月日'],
    '상대 태어난 시간 (선택 · 알면 PRO 정확도 UP)':['Their birth time (optional · more accurate)','相手の生まれた時間 (任意 · 精度UP)'],
    '상대 태어난 시간 (선택 · 알면 정확도 UP)':['Their birth time (optional · more accurate)','相手の生まれた時間 (任意 · 精度UP)'],
    '상대 MBTI':['Their MBTI','相手のMBTI'],
    '케미 측정 시작 💞':['Check our chemistry 💞','相性を診断する 💞'],
    '운세 리포트':['Fortune report','運勢レポート'],
    '🗓️ 운세 리포트':['🗓️ Fortune report','🗓️ 運勢レポート'],
    '📅 이번 달 운세':['📅 This month','📅 今月の運勢'],
    '럭키 데이 캘린더':['Lucky day calendar','ラッキーデーカレンダー'],
    '12개월 흐름 그래프':['12-month trend','12か月の流れ'],
    '📖 카드 도감':['📖 Card collection','📖 カード図鑑'],
    '🎴 카드 덱 스킨':['🎴 Card deck skins','🎴 カードデッキスキン'],
    '☁️ 동기화':['☁️ Sync','☁️ 同期'],
    '연결 확인 중...':['Checking connection...','接続を確認中...'],
    '👤 내 정보':['👤 My info','👤 わたしの情報'],
    '정보 다시 입력하기':['Re-enter my info','情報を入力し直す'],
    '재미로 보는 콘텐츠예요':['Just for fun','占いエンタメです'],
    '오늘':['Today','今日'], '고민타로':['Ask Tarot','悩みタロット'], '궁합':['Match','相性'], '소울':['Soul','ソウル'],
    '닫기':['Close','閉じる'], '텍스트 복사':['Copy text','テキストをコピー'],
    '다음에 할게요':['Maybe later','またあとで'],
    '예: 하루, 감자, 갓생러':['e.g. Haru, Potato','例: はる、ポテト'],
    '예: 걔한테 먼저 연락해도 될까?':['e.g. Should I text them first?','例: 先に連絡してもいいかな?'],
    '예: 썸남, 베프, 팀장님':['e.g. Crush, Bestie, Boss','例: 気になる人、親友、上司'],
    /* 정리 레이아웃 · 베타 · MY 그룹 */
    '👯 친구랑 같이 놀기':['👯 Play with friends','👯 友達と遊ぶ'],
    '💞 1:1 궁합 보기':['💞 1:1 compatibility','💞 1:1の相性診断'],
    '👯 이 결과로 친구랑 놀기':['👯 Play with this result','👯 この結果で友達と遊ぶ'],
    '운명의 상대 수배전단':['Soulmate WANTED poster','運命の相手 手配書'],
    '사주로 그린 그 사람':['Drawn from your Saju','命式から描いたあの人'],
    '친구들이 보는 나':['How friends see me','友達から見た私'],
    '익명으로 물어보기':['Ask anonymously','匿名で聞く'],
    '친구 궁합 지도':['Friend chemistry map','友達相性マップ'],
    '단톡방 케미 한 장에':['Group chat chemistry','グループの相性を1枚に'],
    '📚 내 기록':['📚 MY RECORDS','📚 わたしの記録'], '🎨 꾸미기':['🎨 CUSTOMIZE','🎨 カスタマイズ'], '⚙️ 설정':['⚙️ SETTINGS','⚙️ 設定'],
    '🔔 아침 알림':['🔔 Morning alert','🔔 朝の通知'], '📔 운세 일기':['📔 Fortune diary','📔 運勢日記'],
    '🧪 무료 베타 기간':['🧪 Free beta','🧪 無料ベータ期間'],
    '🚨 수배전단':['🚨 WANTED poster','🚨 手配書'],
    '썸·연인':['Crush·Lover','気になる人・恋人'], '친구':['Friend','友達'], '동료':['Coworker','同僚'],
    '양력':['Solar','新暦'], '음력':['Lunar','旧暦'],
    '🌐 언어':['🌐 Language','🌐 言語'],
    '연간 운세':['Yearly fortune','年間運勢'], '12개월 흐름 그래프':['12-month trend','12か月の流れ'],
  };
  const L=['en','ja'];
  let lang='ko';
  try{const q=new URLSearchParams(location.search).get('lang'); if(q&&['ko','en','ja'].includes(q)){localStorage.setItem('soulcode.lang',JSON.stringify(q))} const raw=localStorage.getItem('soulcode.lang'); if(raw){const v=JSON.parse(raw); if(['ko','en','ja'].includes(v))lang=v} else {const nl=((navigator.languages&&navigator.languages[0])||navigator.language||'ko').toLowerCase(); lang=nl.startsWith('ko')?'ko':nl.startsWith('ja')?'ja':'en'}}catch(e){}
  window.soulLang=lang;
  document.documentElement.lang=lang;
  if(lang==='ko')return;
  const idx=L.indexOf(lang);
  const tr=t=>{const k=t.trim(); let v=D[k]; if(v)return t.replace(k,v[idx]);
    const m=k.match(/^([^가-힣A-Za-z0-9]+\s?)(.+)$/); if(m&&D[m[2]])return t.replace(m[2],D[m[2]][idx]); return null};
  const PFX={en:'/en',ja:'/ja'}[lang];
  function walk(root){
    if(!root)return;
    if(root.nodeType===3){const r=tr(root.nodeValue);if(r!==null){const pe=root.parentElement;if(pe&&!pe.dataset.ko)pe.dataset.ko=root.nodeValue;root.nodeValue=r}return}
    if(root.nodeType!==1)return;
    if(root.placeholder){const r=tr(root.placeholder);if(r!==null)root.placeholder=r}
    if(root.tagName==='A'){const h=root.getAttribute('href')||'';if(/^\/(wanted|ask|terms|privacy)(\b|\?|$)/.test(h))root.setAttribute('href',PFX+h)}
    for(const c of root.childNodes)walk(c);
  }
  const start=()=>{const app=document.getElementById('app')||document.body;walk(app);new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(walk);if(m.type==='characterData')walk(m.target)})).observe(app,{childList:true,subtree:true,characterData:true})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
