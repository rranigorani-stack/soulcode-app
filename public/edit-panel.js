/* 디자인 조정판: 주소 끝에 ?edit=1 을 붙이면 떠요.
 * 글꼴·색·크기를 바꿔 보면서 실제 화면에서 바로 확인하고, "저장값 복사"로 설정을 넘겨줄 수 있어요.
 * 방문자에게는 보이지 않고, 바꾼 값은 이 브라우저에서 ?edit=1 로 볼 때만 적용돼요. */
(function () {
  if (window.__editPanel) return; window.__editPanel = true;
  var KEY = 'soulcode.designEdit';
  var isLanding = !!document.querySelector('.lp,.lt');
  var isLetter = !!document.querySelector('.lt');
  var host = isLanding ? document.querySelector('.lp,.lt') : document.documentElement;
  var cs = getComputedStyle(host);
  var cv = function (n) { return cs.getPropertyValue(n).trim(); };
  var FONTS = {
    serif: ['Special Elite', 'Song Myung', 'Noto Serif KR', 'Nanum Myeongjo', 'Song Myung', 'Gowun Batang', 'Hahmlet', 'Black Han Sans', 'Do Hyeon', 'Nanum Brush Script', 'East Sea Dokdo', 'Noto Sans KR'],
    sans: ['Courier Prime', 'Nanum Gothic Coding', 'Noto Sans KR', 'IBM Plex Sans KR', 'Gothic A1', 'Nanum Gothic', 'Gowun Dodum', 'Nanum Myeongjo'],
    mono: ['Courier Prime', 'Special Elite', 'Nanum Gothic Coding', 'DM Mono', 'IBM Plex Mono', 'Space Mono', 'JetBrains Mono', 'Nanum Gothic Coding', 'Noto Sans KR'],
  };
  // 화면별로 바꿀 수 있는 항목 (CSS 변수 이름)
  var FIELDS = isLanding ? [
    { k: 'serif', label: '제목 글꼴', type: 'font', group: 'serif', v: '--serif' },
    { k: 'sans', label: '본문 글꼴', type: 'font', group: 'sans', v: '--sans' },
    { k: 'mono', label: '라벨 글꼴', type: 'font', group: 'mono', v: '--mono' },
    { k: 'bg', label: isLetter ? '편지지 색' : '바탕색', type: 'color', v: '--bg' },
  ].concat(isLetter ? [{ k: 'desk', label: '책상(바깥) 색', type: 'color', v: '--desk' }] : []).concat([
    { k: 'ink', label: '글자·단추색', type: 'color', v: '--ink' },
    { k: 'sub', label: '보조 글자색', type: 'color', v: '--sub' },
    { k: 'red', label: '강조색', type: 'color', v: '--red' },
    { k: 'hs', label: '제목 크기', type: 'range', min: 0.7, max: 1.4, step: 0.05, v: '--hs' },
    { k: 'bs', label: '본문 크기', type: 'range', min: 0.85, max: 1.3, step: 0.05, v: '--bs' },
    { k: 'radius', label: '단추 모서리', type: 'range', min: 0, max: 30, step: 1, unit: 'px', v: '--radius' },
  ]) : [
    { k: 'serif', label: '제목 글꼴', type: 'font', group: 'serif', v: '--serif' },
    { k: 'sans', label: '본문 글꼴', type: 'font', group: 'sans', css: function (val) { var a = document.querySelector('.app'); if (a) a.style.fontFamily = val; } },
    { k: 'bg', label: '바탕색 (한지)', type: 'color', v: '--hanji', also: function (val) { var a = document.querySelector('.app'); if (a) a.style.background = val; } },
    { k: 'paper', label: '카드 바탕색', type: 'color', v: '--paper' },
    { k: 'ink', label: '먹색 (글자·단추)', type: 'color', v: '--ink' },
    { k: 'sub', label: '보조 글자색', type: 'color', v: '--muted' },
    { k: 'red', label: '강조색 (낙관)', type: 'color', v: '--o-red' },
  ];

  var loaded = {};
  function loadFont(name) {
    if (!name || loaded[name]) return; loaded[name] = 1;
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + name.replace(/ /g, '+') + ':wght@400;500;600;700;800;900&display=swap';
    l.onerror = function () { var l2 = document.createElement('link'); l2.rel = 'stylesheet'; l2.href = 'https://fonts.googleapis.com/css2?family=' + name.replace(/ /g, '+') + '&display=swap'; document.head.appendChild(l2); };
    document.head.appendChild(l);
  }
  function firstFont(stack) { return (stack || '').split(',')[0].replace(/['"]/g, '').trim(); }
  function toHex(c) {
    if (!c) return '#000000'; if (c[0] === '#') return c.length === 4 ? '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3] : c.slice(0, 7);
    var m = c.match(/\d+/g); if (!m) return '#000000';
    return '#' + m.slice(0, 3).map(function (x) { return ('0' + (+x).toString(16)).slice(-2); }).join('');
  }

  var defaults = {}, state = {};
  FIELDS.forEach(function (f) {
    var d;
    if (f.type === 'font') d = f.v ? firstFont(cv(f.v)) : 'Noto Sans KR';
    else if (f.type === 'color') d = toHex(cv(f.v));
    else d = parseFloat(cv(f.v)) || (f.k === 'radius' ? 0 : 1);
    defaults[f.k] = d;
  });
  try { state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}')[isLanding ? 'landing' : 'app'] || {}); } catch (e) { state = Object.assign({}, defaults); }

  function apply(f, val) {
    var out = val;
    if (f.type === 'font') { loadFont(val); out = "'" + val + "', " + (f.group === 'mono' ? 'monospace' : f.group === 'serif' ? 'serif' : 'sans-serif'); }
    if (f.type === 'range' && f.unit) out = val + f.unit;
    if (f.v) host.style.setProperty(f.v, String(out));
    if (f.css) f.css(out);
    if (f.also) f.also(out);
  }
  function save() {
    var all = {}; try { all = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { /* noop */ }
    all[isLanding ? 'landing' : 'app'] = state; try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* noop */ }
  }
  function changed() {
    var o = {}; FIELDS.forEach(function (f) { if (String(state[f.k]) !== String(defaults[f.k])) o[f.k] = state[f.k]; }); return o;
  }

  var css = '#ep{position:fixed;right:14px;bottom:14px;z-index:99999;width:268px;max-height:82vh;overflow:auto;background:#151513;color:#EEECE6;font:12.5px/1.4 system-ui,-apple-system,"Noto Sans KR",sans-serif;border-radius:10px;box-shadow:0 18px 50px rgba(0,0,0,.35)}' +
    '#ep.min{width:auto;max-height:none}#ep.min .ep-b{display:none}' +
    '#ep .ep-h{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;border-bottom:1px solid #2c2b28;font-weight:700;letter-spacing:.02em}' +
    '#ep .ep-b{padding:10px 12px 12px}#ep label{display:block;margin:9px 0 4px;color:#A9A69E;font-size:11.5px}' +
    '#ep select,#ep input[type=range]{width:100%}#ep select{background:#22211e;color:#EEECE6;border:1px solid #3a3934;border-radius:6px;padding:6px}' +
    '#ep .ep-c{display:flex;align-items:center;gap:8px}#ep input[type=color]{width:34px;height:26px;border:0;background:none;padding:0}' +
    '#ep .ep-v{color:#7f7c75;font-size:11px;margin-left:auto}' +
    '#ep .ep-a{display:flex;gap:6px;margin-top:14px}#ep button{flex:1;padding:8px;border-radius:6px;border:1px solid #3a3934;background:#22211e;color:#EEECE6;cursor:pointer;font:inherit}' +
    '#ep button.p{background:#EEECE6;color:#151513;border-color:#EEECE6;font-weight:700}#ep textarea{width:100%;height:90px;margin-top:8px;background:#0e0e0d;color:#cfcac0;border:1px solid #3a3934;border-radius:6px;font:11px monospace;display:none}' +
    '#ep .ep-n{color:#7f7c75;font-size:11px;margin-top:10px;line-height:1.5}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var box = document.createElement('div'); box.id = 'ep';
  var html = '<div class="ep-h"><span>🎨 디자인 조정판 · ' + (isLanding ? '소개 사이트' : '앱') + '</span><span class="ep-t">접기</span></div><div class="ep-b">';
  FIELDS.forEach(function (f) {
    html += '<label>' + f.label + '</label>';
    if (f.type === 'font') {
      var list = FONTS[f.group].slice(); if (list.indexOf(state[f.k]) < 0) list.unshift(state[f.k]);
      html += '<select data-k="' + f.k + '">' + list.map(function (n) { return '<option' + (n === state[f.k] ? ' selected' : '') + ' style="font-family:\'' + n + '\'">' + n + '</option>'; }).join('') + '</select>';
    } else if (f.type === 'color') {
      html += '<div class="ep-c"><input type="color" data-k="' + f.k + '" value="' + state[f.k] + '"><span class="ep-v" data-v="' + f.k + '">' + state[f.k] + '</span></div>';
    } else {
      html += '<div class="ep-c"><input type="range" data-k="' + f.k + '" min="' + f.min + '" max="' + f.max + '" step="' + f.step + '" value="' + state[f.k] + '"><span class="ep-v" data-v="' + f.k + '">' + state[f.k] + (f.unit || '×') + '</span></div>';
    }
  });
  html += '<div class="ep-a"><button class="p" data-a="copy">저장값 복사</button><button data-a="reset">처음으로</button></div><textarea readonly></textarea>' +
    '<p class="ep-n">바꾼 값은 이 브라우저에서 ?edit=1 로 볼 때만 보여요. 마음에 들면 "저장값 복사"를 눌러 채팅에 붙여 주세요.</p></div>';
  box.innerHTML = html; document.body.appendChild(box);

  FIELDS.forEach(function (f) { if (String(state[f.k]) !== String(defaults[f.k])) apply(f, state[f.k]); });
  box.querySelectorAll('[data-k]').forEach(function (el) {
    var f = FIELDS.filter(function (x) { return x.k === el.dataset.k; })[0];
    el.addEventListener('input', function () {
      var val = f.type === 'range' ? parseFloat(el.value) : el.value; state[f.k] = val; apply(f, val); save();
      var lab = box.querySelector('[data-v="' + f.k + '"]'); if (lab) lab.textContent = val + (f.type === 'range' ? (f.unit || '×') : '');
    });
  });
  box.querySelector('.ep-h').onclick = function () { box.classList.toggle('min'); box.querySelector('.ep-t').textContent = box.classList.contains('min') ? '펼치기' : '접기'; };
  box.querySelector('[data-a="reset"]').onclick = function () {
    state = Object.assign({}, defaults); save();
    FIELDS.forEach(function (f) { if (f.v) host.style.removeProperty(f.v); if (f.css || f.also) { var a = document.querySelector('.app'); if (a) { a.style.fontFamily = ''; a.style.background = ''; } } });
    box.remove(); st.remove(); window.__editPanel = false; var s = document.createElement('script'); s.src = '/edit-panel.js?' + Date.now(); document.body.appendChild(s);
  };
  box.querySelector('[data-a="copy"]').onclick = function () {
    var txt = 'SOULCODE 디자인 ' + (isLanding ? '소개 사이트' : '앱') + ' ' + JSON.stringify(changed());
    var ta = box.querySelector('textarea'); ta.value = txt; ta.style.display = 'block'; ta.select();
    var done = function () { box.querySelector('[data-a="copy"]').textContent = '복사됨 ✓'; setTimeout(function () { box.querySelector('[data-a="copy"]').textContent = '저장값 복사'; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { document.execCommand('copy'); done(); }); else { document.execCommand('copy'); done(); }
  };
})();
