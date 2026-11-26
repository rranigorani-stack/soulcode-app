/* 소울코드 상형 글자 (glyph.js)
 * 앱이 만드는 글 속 이모지를 한자 한 글자(상형)로 바꿔요. 짝이 없는 이모지는 지워요.
 * 예: ☀️ → 陽, 🌙 → 月, 👩 → 女, 👨 → 男, 🔥 → 火 …  (app.js · viral.js 다음에 로드)
 */
(function(){
  const G={
    '☀':'陽','🌞':'陽','🌅':'陽','🌙':'月','🌕':'月','🌛':'月','🌜':'月','☾':'月','🌑':'月',
    '👩':'女','👨':'男','🔥':'火','💧':'水','🌊':'水','🌧':'雨','☁':'雲','🌳':'木','🌲':'木','🌱':'木','🌿':'木','🍂':'木','🌾':'木',
    '⛰':'土','🏔':'土','🪨':'土','💎':'金','🔔':'鐘','⚖':'衡','☯':'易','🔮':'卜','🃏':'札','🎴':'札',
    '✨':'星','⭐':'星','🌟':'星','💫':'星','✦':'星','✧':'星','★':'星','🔭':'星',
    '💞':'緣','💘':'緣','💖':'心','💗':'心','💜':'心','💓':'心','♥':'心','❤':'心','🫶':'心','💋':'緣','💍':'約','💌':'信','✉':'信',
    '🌸':'花','🌷':'花','🌹':'花','🍀':'吉','🎉':'慶','🎂':'生','🏆':'勝','👑':'王','💡':'明','⚡':'雷','💸':'財','💰':'財','💼':'業',
    '📅':'曆','🗓':'曆','📆':'曆','📔':'錄','📜':'錄','📋':'錄','📖':'書','📌':'錄','🗺':'圖','🧭':'向','📊':'表','📈':'表',
    '🔒':'鎖','🔐':'鎖','🔓':'開','🔑':'鍵','🔁':'回','🔄':'回','🤝':'友','👥':'友','👯':'友','🧬':'性','🧠':'理','🤖':'',
    '🐾':'跡','🧩':'合','🧲':'引','🍯':'甘','🍓':'苺','🫧':'泡','🎢':'',' 🧪':'','🧪':'','👉':'','🙅':'','🤏':'',
    '✅':'','☑':'','⚠':'','🚨':'','🔎':'','🔍':'','💬':'','👆':'','🛰':'','📸':'','🙏':'','🌍':'','🌏':'','🌐':''
  };
  const RE=/(?:\p{Extended_Pictographic}|[☀-➿⭐⭕⬛⬜★☆✦✧☾])(?:️|‍(?:\p{Extended_Pictographic}|[☀-➿])️?|[\u{1F3FB}-\u{1F3FF}])*/gu;
  const KEEP=/^[★☆]$/; // 별점 표기 등은 남겨요
  function fix(node){
    const t=node.nodeValue; if(!t||!RE.test(t))return; RE.lastIndex=0;
    const p=node.parentNode; if(!p||p.closest&&p.closest('script,style,textarea,.no-glyph'))return;
    const frag=document.createDocumentFragment(); let last=0, m, changed=false;
    while((m=RE.exec(t))){
      const raw=m[0], base=raw.replace(/[️‍]|[\u{1F3FB}-\u{1F3FF}]/gu,''); if(KEEP.test(base))continue;
      changed=true;
      if(m.index>last)frag.appendChild(document.createTextNode(t.slice(last,m.index)));
      const g=G[base]!==undefined?G[base]:G[[...base][0]];
      if(g){const i=document.createElement('i');i.className='gl';i.setAttribute('aria-hidden','true');i.textContent=g;frag.appendChild(i)}
      last=m.index+raw.length;
      // 지운 기호 뒤의 빈칸 하나는 같이 지워요
      if(!g&&t[last]===' '&&(m.index===0||t[m.index-1]===' '||t[m.index-1]==='\n'))last++;
    }
    if(!changed)return;
    if(last<t.length)frag.appendChild(document.createTextNode(t.slice(last)));
    p.replaceChild(frag,node);
  }
  function walk(root){
    if(!root)return;
    if(root.nodeType===3){fix(root);return}
    if(root.nodeType!==1)return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const list=[];let n;while((n=w.nextNode()))list.push(n);
    list.forEach(fix);
  }
  const app=document.getElementById('app')||document.body;
  walk(app);
  new MutationObserver(ms=>ms.forEach(m=>{if(m.type==='characterData')fix(m.target);else m.addedNodes.forEach(walk)})).observe(app,{childList:true,subtree:true,characterData:true});
})();
