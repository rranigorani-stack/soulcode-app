
/* ================= DATA ================= */
const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const STEMS_KO = ['갑','을','병','정','무','기','경','신','임','계'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const BRANCHES_KO = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
const ANIMALS = ['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
const STEM_EL = [0,0,1,1,2,2,3,3,4,4];
const BR_EL = [4,2,0,0,2,1,1,2,3,3,2,4];
const LG=window.soulLang||'ko', TL=(k,e,j)=>LG==='en'?e:LG==='ja'?j:k;
const ZOD_EN=['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'], ZOD_JA=['子(ねずみ)年','丑(うし)年','寅(とら)年','卯(うさぎ)年','辰(たつ)年','巳(へび)年','午(うま)年','未(ひつじ)年','申(さる)年','酉(とり)年','戌(いぬ)年','亥(いのしし)年'];
const EL = [
  {ko:'목',name:'나무',emoji:'🌳',color:'var(--wood)',colorName:'초록',zod:'푸른',
   excess:'하고 싶은 게 너무 많아서 시작만 하고 끝을 못 낼 수 있어요.',
   lack:'산책, 식물 키우기, 새 루틴 시작하기', items:['식물 키링','초록 텀블러','민트 껌']},
  {ko:'화',name:'불',emoji:'🔥',color:'var(--fire)',colorName:'레드',zod:'붉은',
   excess:'텐션이 과열되면 말이 먼저 나가요. 급발진 주의!',
   lack:'햇빛 쬐기, 좋아하는 사람 만나기, 운동', items:['빨간 립밤','향초','핫팩']},
  {ko:'토',name:'흙',emoji:'⛰️',color:'var(--earth)',colorName:'옐로',zod:'황금',
   excess:'생각이 많아져서 결정이 느려지고 고집이 세질 수 있어요.',
   lack:'규칙적인 식사, 다이어리로 일정 정리', items:['니트 소품','도자기 머그','꿀 스틱']},
  {ko:'금',name:'쇠',emoji:'💎',color:'var(--metal)',colorName:'실버',zod:'하얀',
   excess:'기준이 높아서 말이 칼처럼 날카로워질 때가 있어요.',
   lack:'방 정리, 마감 기한 정하기, 단호하게 거절하기', items:['실버 반지','무선 이어폰','동전 지갑']},
  {ko:'수',name:'물',emoji:'🌊',color:'var(--water)',colorName:'블루',zod:'검은',
   excess:'생각이 꼬리에 꼬리를 물어 새벽 망상이 길어져요.',
   lack:'물 자주 마시기, 혼자만의 시간, 일기 쓰기', items:['생수 한 병','파란 볼펜','입욕제']},
];
const STEM_INFO = [
  {img:'곧게 뻗는 큰 나무',emoji:'🌲',desc:'한번 정한 목표는 끝까지 키워가는 성장형이에요. 남들보다 한 뼘 위에서 큰 그림을 봐요.',tags:['#성장캐','#리더기질','#은근고집']},
  {img:'어디서든 피어나는 꽃',emoji:'🌷',desc:'환경이 바뀌어도 금방 적응하고 사람 사이를 자연스럽게 이어줘요. 부드럽지만 생명력은 최강.',tags:['#적응력만렙','#사교왕','#외유내강']},
  {img:'한낮의 태양',emoji:'☀️',desc:'있는 것만으로 분위기가 밝아지는 존재감. 솔직하고 화끈해서 숨기는 게 없어요.',tags:['#인간비타민','#솔직담백','#존재감']},
  {img:'밤을 밝히는 촛불',emoji:'🕯️',desc:'한 곳을 오래 비추는 집중력이 있어요. 가까운 사람에게는 누구보다 따뜻해요.',tags:['#섬세함','#몰입러','#은은한온기']},
  {img:'든든한 큰 산',emoji:'⛰️',desc:'쉽게 흔들리지 않는 묵직함. 친구들이 고민 생기면 제일 먼저 찾는 사람이에요.',tags:['#믿음직','#포용력','#듬직']},
  {img:'모든 걸 키우는 정원',emoji:'🌾',desc:'현실 감각이 좋고 실속을 챙길 줄 알아요. 사람과 일을 차근차근 키워내는 타입.',tags:['#실속파','#배려왕','#현실감각']},
  {img:'단단한 강철',emoji:'⚔️',desc:'결정은 빠르고 행동은 시원시원해요. 한번 내 사람이면 의리 하나는 확실해요.',tags:['#결단력','#의리파','#추진력']},
  {img:'빛나는 보석',emoji:'💎',desc:'디테일과 감각이 남다른 완벽주의자. 스스로를 반짝이게 다듬을 줄 알아요.',tags:['#감각적','#완벽주의','#자존감']},
  {img:'끝없는 바다',emoji:'🌊',desc:'스케일이 크고 생각이 자유로워요. 어디로든 흘러갈 수 있는 지혜와 포용력이 있어요.',tags:['#자유영혼','#빅픽처','#지혜로움']},
  {img:'촉촉한 봄비',emoji:'🌧️',desc:'말하지 않아도 분위기를 읽는 직관력. 조용히 스며들어 사람 마음을 적셔요.',tags:['#직관력','#공감요정','#감수성']},
];
const MBTI = {
  INTJ:{nick:'설계하는 브레인',desc:'머릿속에 이미 5년 치 계획이 있는',best:'ENFP'},
  INTP:{nick:'호기심 연구소장',desc:'궁금한 건 끝까지 파고드는',best:'ENTJ'},
  ENTJ:{nick:'판을 짜는 리더',desc:'목표가 생기면 사람과 판을 움직이는',best:'INTP'},
  ENTP:{nick:'아이디어 폭주기관차',desc:'토론과 새로운 시도에서 에너지를 얻는',best:'INFJ'},
  INFJ:{nick:'조용한 예언자',desc:'사람 속마음을 꿰뚫어 보는',best:'ENFP'},
  INFP:{nick:'몽글몽글 이상주의자',desc:'나만의 세계관과 가치가 확실한',best:'ENFJ'},
  ENFJ:{nick:'모두의 멘토',desc:'주변 사람을 성장시키는',best:'INFP'},
  ENFP:{nick:'반짝이는 탐험가',desc:'새로운 사람과 아이디어에 설레는',best:'INFJ'},
  ISTJ:{nick:'믿고 보는 원칙러',desc:'한번 맡은 일은 확실하게 끝내는',best:'ESFP'},
  ISFJ:{nick:'다정한 수호자',desc:'소중한 사람을 묵묵히 챙기는',best:'ESTP'},
  ESTJ:{nick:'일잘러 매니저',desc:'효율과 체계로 일을 굴러가게 만드는',best:'ISTP'},
  ESFJ:{nick:'분위기 메이커',desc:'모두가 편하도록 공기를 데우는',best:'ISFP'},
  ISTP:{nick:'쿨한 해결사',desc:'말보다 손이 먼저 움직이는',best:'ESTJ'},
  ISFP:{nick:'감성 아티스트',desc:'취향과 감각이 확실한',best:'ESFJ'},
  ESTP:{nick:'직진 모험가',desc:'일단 해보고 생각하는',best:'ISFJ'},
  ESFP:{nick:'무대 체질 스타',desc:'지금 이 순간을 누구보다 즐기는',best:'ISTJ'},
};
const SYNERGY = {
  'yangE':'기운도 성향도 바깥으로 뻗는 타입이에요. 어디서든 주인공이 되는 무대 체질!',
  'yangI':'겉은 차분한데 속엔 엄청난 에너지가 있는 반전 매력형. 판이 깔리면 누구보다 강해요.',
  'yinE':'부드럽게 사람을 끌어당기는 자연스러운 인싸. 애쓰지 않아도 사람이 모여요.',
  'yinI':'깊고 고요한 내공형. 오래 볼수록 진가가 드러나는 사람이에요.',
};
const RELATION = [ // index = (todayEl - myEl + 5) % 5
  {name:'내 편 데이',emoji:'🤝',desc:'나와 같은 기운이 들어와요. 친구·동료와 함께하면 시너지, 단 고집 대결은 주의.',boost:0},
  {name:'표현 데이',emoji:'🎤',desc:'내 기운이 밖으로 흘러가는 날. 말하기·만들기·SNS 업로드 다 좋아요.',boost:0},
  {name:'성과 데이',emoji:'💸',desc:'내가 다루는 기운이 들어와요. 돈·결과·실속 챙기기 좋은 날.',boost:2},
  {name:'책임 데이',emoji:'📌',desc:'나를 다듬는 기운이 들어와요. 약속을 지키면 인정받는 날. 살짝 피곤할 수 있어요.',boost:1},
  {name:'충전 데이',emoji:'🔋',desc:'나를 도와주는 기운이 들어와요. 공부·휴식·조언 듣기에 최적.',boost:3},
];
RELATION[1].boost = 0; // 표현 → 연애
RELATION[0].boost = 3; // 내 편 → 컨디션
const SCORE_CATS = [['💘','연애'],['💼','일·공부'],['💸','금전'],['🔋','컨디션']];

const TAROT = [
 ['바보','THE FOOL','🎒','새로운 시작 · 자유','무모함 · 준비 부족','새로 시작하기 좋은 타이밍. 완벽한 계획보다 일단 실행이 이득이에요.','설레는 마음 그대로 가도 괜찮아. 오늘의 너는 생각보다 용감해 ✨','충동적인 결정은 손해로 이어질 수 있어요. 결제 전 10초만 고민하기.','마음이 급해도 괜찮아. 한 박자 쉬고 가도 절대 늦지 않아.'],
 ['마법사','THE MAGICIAN','🪄','능력 · 실행력','허세 · 잔꾀','필요한 재료는 이미 다 있어요. 오늘 시작한 일은 결과가 잘 나와요.','너한테 이미 충분한 힘이 있어. 스스로를 믿어봐 🔮','말만 앞서면 신뢰를 잃어요. 보여줄 수 있는 것만 약속하기.','괜히 잘 보이려 애쓰지 않아도 돼. 있는 그대로가 제일 멋져.'],
 ['여사제','THE HIGH PRIESTESS','🌙','직관 · 비밀','혼란 · 숨김','아직 정보가 다 안 나왔어요. 결정은 보류하고 관찰하는 게 정답.','마음속 작은 목소리가 맞을 거야. 직감을 믿어봐 🌙','감정과 사실이 섞여 판단이 흐려져요. 팩트부터 정리하기.','혼자 끙끙 앓지 말고 믿는 사람에게 털어놔도 괜찮아.'],
 ['여황제','THE EMPRESS','🌸','풍요 · 매력','과잉 · 의존','투자한 만큼 돌아오는 날. 나와 내 공간을 가꾸는 데 쓰는 돈은 가치 있어요.','오늘 너 진짜 빛나. 스스로를 아껴주는 하루 보내 🌸','과소비·과식 주의. 기분 전환 쇼핑은 장바구니에만 담기.','남 챙기느라 너를 잊진 않았어? 오늘은 너부터.'],
 ['황제','THE EMPEROR','👑','리더십 · 질서','고집 · 통제','주도권을 잡으면 일이 풀려요. 일정과 역할을 명확히 정리하기.','네가 중심을 잡아주면 다들 든든해할 거야 👑','내 방식만 고집하면 갈등이 생겨요. 다른 방법도 한 번 들어보기.','모든 걸 혼자 책임지려 하지 않아도 돼. 어깨 힘 좀 빼자.'],
 ['교황','THE HIEROPHANT','📜','조언 · 배움','고정관념 · 반항','검증된 방법이 제일 빨라요. 선배나 전문가에게 조언 구하기.','믿을 만한 사람의 말 한마디가 큰 위로가 될 거야.','남들 다 하는 방식이 나한테 맞진 않을 수도. 기준을 다시 점검.','꼭 정해진 길로 가지 않아도 괜찮아. 너만의 방식도 정답이야.'],
 ['연인','THE LOVERS','💞','사랑 · 선택','갈등 · 망설임','중요한 선택의 날. 장단점 리스트를 써보면 답이 나와요.','마음이 끌리는 쪽이 정답일 확률 높음 💞 설렘 주의보!','관계에서 말 안 한 불만이 쌓여 있어요. 오해는 빨리 풀기.','흔들리는 마음도 자연스러운 거야. 천천히 진심을 들여다봐.'],
 ['전차','THE CHARIOT','🏎️','돌파 · 승리','폭주 · 방향 상실','밀어붙이면 이기는 날. 목표 하나만 정하고 직진하세요.','지금 그 기세 그대로! 오늘은 멈추지 마 🏁','속도보다 방향. 지금 가는 길이 맞는지 먼저 확인하기.','너무 달려서 지쳤다면 잠깐 멈춰도 괜찮아.'],
 ['힘','STRENGTH','🦁','용기 · 인내','자신감 하락 · 예민함','부드럽게 설득하는 쪽이 이겨요. 감정 컨트롤이 오늘의 무기.','생각보다 넌 강한 사람이야. 오늘도 잘 버티고 있어 🦁','피곤하면 예민해져요. 중요한 대화는 컨디션 좋은 시간에.','약해지는 날도 있는 거야. 스스로를 다그치지 마.'],
 ['은둔자','THE HERMIT','🏮','성찰 · 혼자만의 시간','고립 · 외로움','혼자 집중하면 효율 최고. 알림 끄고 딥워크 추천.','오늘은 나만의 동굴에서 충전해도 돼 🏮 그것도 필요해.','너무 숨으면 기회도 놓쳐요. 연락 하나만 먼저 해보기.','외롭다면 그 마음 숨기지 말고 누군가에게 기대봐.'],
 ['운명의 수레바퀴','WHEEL OF FORTUNE','🎡','전환점 · 행운','타이밍 어긋남','흐름이 바뀌는 시점. 들어온 기회는 일단 잡고 보기.','좋은 일이 돌고 돌아 너에게 오고 있어 🍀','오늘은 타이밍이 살짝 안 맞아요. 큰 결정은 며칠 미루기.','잘 안 풀리는 날도 지나가. 곧 네 차례가 올 거야.'],
 ['정의','JUSTICE','⚖️','공정 · 결정','불공정 · 편향','객관적으로 판단하면 손해 없어요. 계약·서류는 꼼꼼하게.','네가 한 노력은 정직하게 돌아올 거야 ⚖️','한쪽 말만 듣고 판단하지 말기. 억울한 일엔 근거 챙기기.','스스로에게 너무 엄격한 잣대를 대고 있진 않아?'],
 ['매달린 사람','THE HANGED MAN','🙃','관점 전환 · 기다림','정체 · 희생','지금은 기다리는 게 전략. 다른 각도에서 보면 답이 보여요.','멈춰 있는 것 같아도 넌 자라는 중이야 🌱','의미 없는 기다림은 그만. 정리할 건 정리하기.','남을 위해 참기만 하지 말고 네 마음도 말해줘.'],
 ['죽음','DEATH','🦋','끝과 새 시작','변화 거부','끝낼 건 끝내야 새로 시작돼요. 미뤄둔 정리를 오늘 하기.','무서워 보이지만 사실 나비가 되는 카드야 🦋 변화는 성장이야.','익숙한 것에 매달리면 제자리예요. 작은 변화부터 시작.','놓아주기 어려운 마음, 충분히 이해해. 천천히 해도 돼.'],
 ['절제','TEMPERANCE','🧪','균형 · 조화','불균형 · 과함','적당히가 정답. 일과 휴식 비율만 조절해도 효율이 올라가요.','오늘은 마음이 차분해지는 날. 너의 페이스를 지켜 🧘','한쪽으로 쏠려 있어요. 수면·식사 패턴부터 점검.','너무 애쓰고 있어. 조금 느슨해져도 괜찮아.'],
 ['악마','THE DEVIL','😈','유혹 · 집착','해방 · 끊어내기','도파민 유혹 주의. 숏폼·야식·충동구매 중 하나만 참아보기.','끌리는 건 자연스럽지만, 너를 힘들게 하는 건 놓아줘도 돼.','나쁜 습관 끊기 좋은 날. 지금 결심하면 성공률 높아요.','묶여 있던 무언가에서 드디어 벗어나는 중이야 🔓'],
 ['탑','THE TOWER','🗼','급변 · 깨달음','위기 모면','예상 못 한 변수가 생길 수 있어요. 플랜 B 준비해두기.','흔들려도 무너지지 않아. 오히려 더 단단해질 거야 ⚡','위기는 피했지만 근본 원인은 남아 있어요. 점검 필요.','큰일 날 뻔했지만 괜찮아. 놀란 마음부터 달래줘.'],
 ['별','THE STAR','⭐','희망 · 영감','실망 · 자신감 하락','장기 목표 세우기 좋은 날. 위시리스트를 구체적인 계획으로.','네 꿈은 반짝반짝 이루어지는 중 ⭐ 계속 믿어줘.','기대치가 너무 높으면 실망도 커요. 목표를 잘게 쪼개기.','잠깐 빛이 안 보여도 별은 거기 있어. 너도 그래.'],
 ['달','THE MOON','🌕','불안 · 무의식','오해 해소','애매한 정보가 많은 날. 확인 안 된 소문은 거르기.','괜히 불안한 마음이 들 수 있어. 그건 진짜가 아니야 🌕','흐릿했던 상황이 선명해져요. 진실이 드러나는 타이밍.','걱정했던 일, 생각보다 별거 아니었다는 걸 알게 될 거야.'],
 ['태양','THE SUN','☀️','성공 · 기쁨','일시적 흐림','운 흐름 최상. 미뤄둔 일을 오늘 처리하면 결과가 좋아요.','오늘 너 완전 럭키데이 ☀️ 마음껏 웃고 즐겨!','좋은 흐름이지만 자만은 금물. 디테일 한 번 더 체크.','잠깐 구름이 꼈을 뿐, 너의 햇살은 그대로야.'],
 ['심판','JUDGEMENT','📯','부활 · 결단','후회 · 자기비판','과거의 노력이 평가받는 날. 다시 도전하기 좋은 타이밍.','다시 시작해도 괜찮아. 이번엔 더 잘할 거야 📯','지난 실수 곱씹기는 그만. 교훈만 챙기고 넘어가기.','너 자신을 너무 몰아세우지 마. 충분히 잘해왔어.'],
 ['세계','THE WORLD','🌍','완성 · 성취','마무리 부족','하나의 사이클이 완성돼요. 성과를 정리하고 다음 레벨 준비.','여기까지 온 너, 진짜 대단해 🌍 스스로 칭찬해줘.','끝이 보이는데 마무리가 아쉬워요. 마지막 10%에 집중.','조금만 더 가면 돼. 거의 다 왔어!'],
];
const ROMAN = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];
const CARD_BG = ['#FFE7A8,#FFC4E6','#D9C8FF,#FFB8E3','#C9D6FF,#E8C8FF','#FFC8DD,#FFE9B8','#FFD1A6,#FFB0B0','#E6D3FF,#BFE4FF','#FFB8E0,#FFD6A5','#B8F0D8,#BFD8FF','#FFD8A8,#FFF0A8','#D7D2E8,#BFC8FF','#C8F2FF,#E3C8FF','#BFE9FF,#D3FFE9','#C2F5D0,#FFF3B0','#E0C8FF,#FFC2DA','#B8F5E0,#C9E4FF','#FFB3C7,#D4B8FF','#D0D6E8,#FFC9B8','#C8DFFF,#FFE3F5','#C3C8FF,#B8EEFF','#FFF19E,#FFC28A','#FFC9F0,#C8E6FF','#B9F2CF,#C6D4FF'];

/* ================= UTIL ================= */
const $ = id => document.getElementById(id);
const store = {
  get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  del(k){try{localStorage.removeItem(k)}catch(e){}}
};
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let s=seed||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return((s>>>0)%10000)/10000}}
function toast(t){const el=$('toast');el.textContent=t;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),1800)}
function todayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}

/* ================= SAJU (만세력) ================= */
function jdn(y,m,d){const a=Math.floor((14-m)/12),yy=y+4800-a,mm=m+12*a-3;return d+Math.floor((153*mm+2)/5)+365*yy+Math.floor(yy/4)-Math.floor(yy/100)+Math.floor(yy/400)-32045}
function dayPillar(y,m,d){const i=((jdn(y,m,d)+49)%60+60)%60;return{s:i%10,b:i%12}}
/* ===== 만세력 엔진: VSOP87 태양황경으로 절입 시각 계산(KASI 발표값과 1분 이내), 한국 표준시·서머타임 변천, 서울 평균태양시 보정 ===== */
const D2R=Math.PI/180;
const L0=[[175347046,0,0],[3341656,4.6692568,6283.07585],[34894,4.6261,12566.1517],[3497,2.7441,5753.3849],[3418,2.8289,3.5231],[3136,3.6277,77713.7715],[2676,4.4181,7860.4194],[2343,6.1352,3930.2097],[1324,0.7425,11506.7698],[1273,2.0371,529.691],[1199,1.1096,1577.3435],[990,5.233,5884.927],[902,2.045,26.298],[857,3.508,398.149],[780,1.179,5223.694],[753,2.533,5507.553],[505,4.583,18849.228],[492,4.205,775.523],[357,2.92,0.067],[317,5.849,11790.629],[284,1.899,796.298],[271,0.315,10977.079],[243,0.345,5486.778],[206,4.806,2544.314],[205,1.869,5573.143],[202,2.458,6069.777],[156,0.833,213.299],[132,3.411,2942.463],[126,1.083,20.775],[115,0.645,0.98],[103,0.636,4694.003],[102,0.976,15720.839],[102,4.267,7.114],[99,6.21,2146.17],[98,0.68,155.42],[86,5.98,161000.69],[85,1.3,6275.96],[85,3.67,71430.7],[80,1.81,17260.15],[79,3.04,12036.46],[75,1.76,5088.63],[74,3.5,3154.69],[74,4.68,801.82],[70,0.83,9437.76],[62,3.98,8827.39],[61,1.82,7084.9],[57,2.78,6286.6],[56,4.39,14143.5],[56,3.47,6279.55],[52,0.19,12139.55],[52,1.33,1748.02],[51,0.28,5856.48],[49,0.49,1194.45],[41,5.37,8429.24],[41,2.4,19651.05],[39,6.17,10447.39],[37,6.04,10213.29],[37,2.57,1059.38],[36,1.71,2352.87],[36,1.78,6812.77],[33,0.59,17789.85],[30,0.44,83996.85],[30,2.74,1349.87],[25,3.16,4690.48]];
const L1=[[628331966747,0,0],[206059,2.678235,6283.07585],[4303,2.6351,12566.1517],[425,1.59,3.523],[119,5.796,26.298],[109,2.966,1577.344],[93,2.59,18849.23],[72,1.14,529.69],[68,1.87,398.15],[67,4.41,5507.55],[59,2.89,5223.69],[56,2.17,155.42],[45,0.4,796.3],[36,0.47,775.52],[29,2.65,7.11],[21,5.34,0.98],[19,1.85,5486.78],[19,4.97,213.3],[17,2.99,6275.96],[16,0.03,2544.31],[16,1.43,2146.17],[15,1.21,10977.08],[12,2.83,1748.02],[12,3.26,5088.63],[12,5.27,1194.45],[12,2.08,4694],[11,0.77,553.57],[10,1.3,6286.6],[10,4.24,1349.87],[9,2.7,242.73],[9,5.64,951.72],[8,5.3,2352.87],[6,2.65,9437.76],[6,4.67,4690.48]];
const L2=[[52919,0,0],[8720,1.0721,6283.0758],[309,0.867,12566.152],[27,0.05,3.52],[16,5.19,26.3],[16,3.68,155.42],[10,0.76,18849.23],[9,2.06,77713.77],[7,0.83,775.52],[5,4.66,1577.34],[4,1.03,7.11],[4,3.44,5573.14],[3,5.14,796.3],[3,6.05,5507.55],[3,1.19,242.73],[3,6.12,529.69],[3,0.31,398.15],[3,2.28,553.57],[2,4.38,5223.69],[2,3.75,0.98]];
const L3=[[289,5.844,6283.076],[35,0,0],[17,5.49,12566.15],[3,5.2,155.42],[1,4.72,3.52],[1,5.3,18849.23],[1,5.97,242.73]];
const L4=[[114,3.142,0],[8,4.13,6283.08],[1,3.84,12566.15]];
const L5=[[1,3.14,0]];
const S=(T,t)=>T.reduce((s,[a,b,c])=>s+a*Math.cos(b+c*t),0);
const DT=[[1940,24.3],[1950,29.1],[1960,33.2],[1970,40.2],[1980,50.5],[1990,56.9],[2000,63.8],[2010,66.1],[2020,69.4],[2030,72],[2040,75],[2050,79]];
function deltaT(y){if(y<=DT[0][0])return DT[0][1];for(let i=1;i<DT.length;i++){if(y<=DT[i][0]){const[a,b]=[DT[i-1],DT[i]];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}}return DT[DT.length-1][1]}
function sunLon(jde){
  const t=(jde-2451545)/365250, T=t*10;
  let L=(S(L0,t)+S(L1,t)*t+S(L2,t)*t*t+S(L3,t)*t**3+S(L4,t)*t**4+S(L5,t)*t**5)/1e8;
  let lon=L/D2R+180;
  lon+=-0.09033/3600; // FK5
  const om=(125.04452-1934.136261*T)*D2R, Ls=(280.4665+36000.7698*T)*D2R, Lm=(218.3165+481267.8813*T)*D2R;
  const dpsi=(-17.2*Math.sin(om)-1.32*Math.sin(2*Ls)-0.23*Math.sin(2*Lm)+0.21*Math.sin(2*om))/3600;
  lon+=dpsi-20.4898/3600;
  return ((lon%360)+360)%360;
}
function termUTC(year,lon){
  let jd=2451545+(year-2000)*365.2422+((lon-280+360)%360)/360*365.2422;
  for(let i=0;i<60;i++){const d=((lon-sunLon(jd)+540)%360)-180; jd+=d*365.2422/360; if(Math.abs(d)<1e-8)break}
  return (jd-deltaT(year)/86400-2440587.5)*86400000;
}


/* ---- 한국 표준시 변천 (tz database: Asia/Seoul) [UTC분, 오프셋분] ---- */
const KR_TZ=[[-15779520,540],[-11353500,600],[-11203800,540],[-10912860,600],[-10681080,540],[-10390140,600],[-10156920,540],[-9814140,600],[-9632760,540],[-8302140,510],[-7711710,570],[-7528890,510],[-7163070,570],[-6971610,510],[-6659070,570],[-6457530,510],[-6134910,570],[-5933370,510],[-5610750,570],[-5409210,510],[-5086590,570],[-4885050,510],[-4415550,540],[9126300,600],[9348060,540],[9650460,600],[9872220,540]];
function krOffsetAt(utcMin){let o=540;for(const [t,off] of KR_TZ){if(utcMin>=t)o=off;else break}return o}
function localToUTC(y,m,d,h,mi){const naive=Date.UTC(y,m-1,d,h,mi)/60000;let off=krOffsetAt(naive-540);off=krOffsetAt(naive-off);return {utcMs:(naive-off)*60000,offset:off}}
const SEOUL_LMT=508; // 서울 경도 127°E → UTC+8h28m 평균태양시
const JEOL=['입춘','경칩','청명','입하','망종','소서','입추','백로','한로','입동','대설','소한'];
function sunLonAtUTC(ms){const y=new Date(ms).getUTCFullYear();return sunLon(ms/86400000+2440587.5+deltaT(y)/86400)}
function monthIdxAt(ms){return Math.floor(((sunLonAtUTC(ms)-315+720)%360)/30)} // 0=寅月
function pillarsAt(y,m,d,h,mi,known){
  const {utcMs,offset}=localToUTC(y,m,d,h,mi);
  const k=monthIdxAt(utcMs), lon=sunLonAtUTC(utcMs);
  // 연주: 입춘(태양황경 315°) 순간 기준
  let sy=y; if(m===1 || (m===2 && lon<315)) sy=y-1;
  const ys=((sy-4)%10+10)%10, yb=((sy-4)%12+12)%12;
  const mb=(2+k)%12, ms=((ys%5)*2+2+k)%10;
  // 일주·시주: 서울 평균태양시 기준, 자시(23시~)부터 다음 날
  const lmt=new Date(utcMs+SEOUL_LMT*60000);
  let dd=new Date(Date.UTC(lmt.getUTCFullYear(),lmt.getUTCMonth(),lmt.getUTCDate()));
  const lh=lmt.getUTCHours(), lm=lmt.getUTCMinutes();
  if(known && lh>=23) dd=new Date(dd.getTime()+86400000);
  const dp=dayPillar(dd.getUTCFullYear(),dd.getUTCMonth()+1,dd.getUTCDate());
  let hour=null;
  if(known){const hb=Math.floor((lh*60+lm+60)/120)%12; hour={s:((dp.s%5)*2+hb)%10,b:hb}}
  return {year:{s:ys,b:yb},month:{s:ms,b:mb},day:dp,hour,meta:{utcMs,offset,lon,lmt:`${String(lh).padStart(2,'0')}:${String(lm).padStart(2,'0')}`}};
}
function calcSajuLocal(y,m,d,time){
  const known=!!time; let h=12,mi=0;
  if(known){[h,mi]=time.split(':').map(Number)}
  const P=pillarsAt(y,m,d,h,mi,known);
  let boundary=false;
  if(!known){const a=pillarsAt(y,m,d,0,0,false), b=pillarsAt(y,m,d,23,59,false); boundary=(a.month.b!==b.month.b)||(a.year.b!==b.year.b)}
  const pillars={year:P.year,month:P.month,day:P.day,hour:P.hour};
  const counts=[0,0,0,0,0];
  Object.values(pillars).forEach(p=>{if(p){counts[STEM_EL[p.s]]++;counts[BR_EL[p.b]]++}});
  return {pillars,counts,dayStem:P.day.s,yearStem:P.year.s,yearBranch:P.year.b,meta:{...P.meta,boundary,known}};
}



/* ---- KASI 정본 라이브러리 어댑터 (서울 진태양시 + 조자시) ---- */
const SK='갑을병정무기경신임계', BK='자축인묘진사오미신유술해';
const SAJU_OPTS={trueSolarTime:{longitude:126.978},dayBoundary:'jasi'};
function libPillars(y,m,d,h,mi){
  const o=Manseryeok.calculateFourPillars({year:y,month:m,day:d,hour:h,minute:mi,...SAJU_OPTS}).toObject();
  const p=s=>({s:SK.indexOf(s[0]),b:BK.indexOf(s[1])});
  return {year:p(o.year),month:p(o.month),day:p(o.day),hour:p(o.hour)};
}
function calcSaju(y,m,d,time){
  if(typeof Manseryeok==='undefined') return calcSajuLocal(y,m,d,time);
  const known=!!time; let h=12,mi=0; if(known)[h,mi]=time.split(':').map(Number);
  const P=libPillars(y,m,d,h,mi);
  let boundary=false;
  if(!known){const a=libPillars(y,m,d,0,0), b=libPillars(y,m,d,23,59); boundary=(a.month.b!==b.month.b)||(a.year.b!==b.year.b)}
  const pillars={year:P.year,month:P.month,day:P.day,hour:known?P.hour:null};
  const counts=[0,0,0,0,0];
  Object.values(pillars).forEach(p=>{if(p){counts[STEM_EL[p.s]]++;counts[BR_EL[p.b]]++}});
  return {pillars,counts,dayStem:P.day.s,yearStem:P.year.s,yearBranch:P.year.b,meta:{known,boundary,engine:'kasi'}};
}
/* ---- 양력/음력 생일 입력 ---- */
const pad2=n=>String(n).padStart(2,'0');
function mountBirthPicker(dateEl,onChange){
  const tg=document.createElement('div'); tg.className='chips-sel'; tg.style.marginBottom='10px';
  tg.innerHTML='<button type="button" class="chip sel" data-c="solar">☀️ 양력</button><button type="button" class="chip" data-c="lunar">🌙 음력</button>';
  dateEl.before(tg);
  const box=document.createElement('div'); box.style.display='none';
  box.innerHTML=`<div style="display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:8px"><select class="field ly" aria-label="음력 연도"><option value="">년</option>${Array.from({length:86},(_,i)=>2025-i).map(v=>`<option value="${v}">${v}년</option>`).join('')}</select><select class="field lm" aria-label="음력 월"><option value="">월</option>${Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1}월</option>`).join('')}</select><select class="field ld" aria-label="음력 일"><option value="">일</option>${Array.from({length:30},(_,i)=>`<option value="${i+1}">${i+1}일</option>`).join('')}</select></div>
    <div style="margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap"><button type="button" class="chip ll">윤달이에요</button><span class="lc" style="font-size:14px"></span></div>`;
  dateEl.after(box);
  const ly=box.querySelector('.ly'),lm=box.querySelector('.lm'),ld=box.querySelector('.ld'),ll=box.querySelector('.ll'),lc=box.querySelector('.lc');
  const st={lunar:false,leap:false};
  const conv=()=>{
    if(!st.lunar) return;
    const y=+ly.value,m=+lm.value,d=+ld.value;
    if(!y||!m||!d){dateEl.value='';lc.textContent='';onChange();return}
    try{const s=Manseryeok.lunarToSolar(y,m,d,st.leap);dateEl.value=`${s.year}-${pad2(s.month)}-${pad2(s.day)}`;lc.innerHTML=`= 양력 <b>${s.year}.${s.month}.${s.day}</b> ✅`}
    catch(e){dateEl.value='';lc.innerHTML=`<b style="color:var(--fire)">없는 날짜예요${st.leap?' (그해엔 이 윤달이 없어요)':''}</b>`}
    onChange();
  };
  [ly,lm,ld].forEach(s=>s.onchange=conv);
  ll.onclick=()=>{st.leap=!st.leap;ll.classList.toggle('sel',st.leap);conv()};
  const setMode=lunar=>{st.lunar=lunar;tg.querySelectorAll('.chip').forEach(c=>c.classList.toggle('sel',(c.dataset.c==='lunar')===lunar));
    box.style.display=lunar?'block':'none';dateEl.style.display=lunar?'none':'block';
    if(lunar)conv(); else {lc.textContent='';onChange()}};
  tg.querySelectorAll('.chip').forEach(c=>c.onclick=()=>setMode(c.dataset.c==='lunar'));
  return {
    info:()=>st.lunar?{y:+ly.value,m:+lm.value,d:+ld.value,leap:st.leap}:null,
    reset:()=>{ly.value='';lm.value='';ld.value='';st.leap=false;ll.classList.remove('sel');dateEl.value='';setMode(false)}
  };
}

/* ================= STATE ================= */
let profile = store.get('soulcode.profile');
let saju = null, draw = null, tone = 'F';
const ob = {step:1, mbti:{}};

/* ================= NAV ================= */
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  const tabs = ['s-tarot','s-spread','s-match','s-soul','s-me','s-report'].includes(id);
  $('tabbar').classList.toggle('show',tabs);
  document.querySelectorAll('.tabbar button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
  const scr=$(id); scr.scrollTop=0; const ap=$('app'); ap.scrollTop=0; ap.scrollLeft=0;
  if(id==='s-soul') renderSoul();
  if(id==='s-tarot') renderTarot();
  if(id==='s-me') renderMe();
  if(id==='s-report') renderReport();
  if(id==='s-spread' && profile) getSaju();
  if(id==='s-match' && profile) getSaju();
}

/* ================= ONBOARDING ================= */
const PAIRS=[['E','외향','사람 만나면 충전','I','내향','혼자 있어야 충전'],['S','감각','현실·경험파','N','직관','상상·가능성파'],['T','사고','팩트가 중요','F','감정','마음이 중요'],['J','판단','계획 세우는 편','P','인식','즉흥이 편한 편']];
if(window.soulLang&&window.soulLang!=='ko'&&window.applyContentI18n){try{applyContentI18n()}catch(e){console.warn('i18n content',e)}}
$('mbtiRows').innerHTML = PAIRS.map((p,i)=>`<div class="mbti-row">
  <button class="mbti-opt" data-i="${i}" data-v="${p[0]}"><b>${p[0]}</b><span>${p[1]} · ${p[2]}</span></button>
  <button class="mbti-opt" data-i="${i}" data-v="${p[3]}"><b>${p[3]}</b><span>${p[4]} · ${p[5]}</span></button></div>`).join('');
document.querySelectorAll('.mbti-opt').forEach(b=>b.onclick=()=>{
  const i=b.dataset.i; ob.mbti[i]=b.dataset.v;
  document.querySelectorAll(`.mbti-opt[data-i="${i}"]`).forEach(x=>x.classList.toggle('sel',x===b));
  $('mbtiPrev').textContent=[0,1,2,3].map(k=>ob.mbti[k]||'?').join('');
  $('n3').disabled = Object.keys(ob.mbti).length<4;
});
$('nick').oninput=e=>$('n1').disabled=!e.target.value.trim();
$('nick').onkeydown=e=>{if(e.key==='Enter'&&e.target.value.trim())nextStep()};
$('birth').oninput=e=>$('n2').disabled=!e.target.value;
const obPicker=mountBirthPicker($('birth'),()=>$('n2').disabled=!$('birth').value);
$('btUnknown').onclick=()=>{const on=!$('btUnknown').classList.contains('sel');$('btUnknown').classList.toggle('sel',on);$('btime').disabled=on;if(on)$('btime').value=''};
$('btime').oninput=()=>{if($('btime').value){$('btUnknown').classList.remove('sel');$('btime').disabled=false}};
function setStep(n){
  ob.step=n;
  document.querySelectorAll('.step').forEach(s=>s.classList.toggle('on',+s.dataset.step===n));
  $('prog').style.width=(n*33.4)+'%'; $('stepLabel').textContent=`STEP ${n} / 3`;
}
function nextStep(){
  if(ob.step===2){const y=+$('birth').value.slice(0,4);if(y<1940||y>2025){toast('1940~2025년 사이로 입력해주세요');return}}
  setStep(ob.step+1)
}
function prevStep(){setStep(ob.step-1)}
function finishOnb(){
  profile={nick:$('nick').value.trim(),birth:$('birth').value,btime:$('btime').value||'',lunar:obPicker.info(),mbti:$('mbtiPrev').textContent};
  store.set('soulcode.profile',profile);
  logVisit();
  go('s-loading');
  const msgs=['우주에서 너의 좌표 검색 중... 🛰️','오행 밸런스 체크 중... 물 한 잔 하고 와 💧','MBTI랑 사주 소개팅 시키는 중 💞','찾았다, 너의 소울코드! ✨'];
  msgs.forEach((m,i)=>setTimeout(()=>$('loadTxt').textContent=m,i*650));
  setTimeout(()=>{const t=store.get('soulcode.afterOnb');if(t){store.del('soulcode.afterOnb');go(t);toast('궁합 볼 상대의 생일을 넣어봐요 🔎')}else go('s-soul')},2700);
}

/* ================= SOUL ================= */
function getSaju(){
  if(profile.btime===undefined){profile.btime=(profile.hb>=0)?String(profile.hb*2).padStart(2,'0')+':30':'';delete profile.hb;store.set('soulcode.profile',profile)}
  const [y,m,d]=profile.birth.split('-').map(Number);saju=calcSaju(y,m,d,profile.btime);return saju}
function soulName(){
  const st=STEM_INFO[saju.dayStem], mb=MBTI[profile.mbti];
  return {title:`${st.img} ${profile.mbti}`, sub:mb.nick, emoji:st.emoji};
}
function renderSoul(){
  if(!profile) return;
  getSaju();
  const st=STEM_INFO[saju.dayStem], mb=MBTI[profile.mbti], el=EL[STEM_EL[saju.dayStem]];
  const yang = saju.dayStem%2===0, E = profile.mbti[0]==='E';
  const sn=soulName();
  $('soulEmoji').textContent=sn.emoji;
  $('soulTitle').textContent=sn.title;
  $('soulSub').textContent=`“${sn.sub}”`;
  $('soulTags').innerHTML=[...st.tags,TL(`#${el.ko}(${el.name})의기운`,`#${el.ko}Energy`,`#${el.ko}の気`)].map(t=>`<span class="tag">${t}</span>`).join('');
  const _dm=`<b style="color:${el.color}">${STEMS[saju.dayStem]} ${el.ko}</b>`, _sy=SYNERGY[(yang?'yang':'yin')+(E?'E':'I')];
  $('soulDesc').innerHTML=TL(`<b>${esc(profile.nick)}</b>님은 <b style="color:${el.color}">${STEMS[saju.dayStem]}${el.ko}</b> 일간, ${st.img}의 기운을 타고났어요. ${st.desc}<br><br>여기에 ${mb.desc} <b>${profile.mbti}</b> 성향이 더해져서, ${_sy}`,
    `<b>${esc(profile.nick)}</b> was born as ${_dm} — ${st.img.toLowerCase()}. ${st.desc}<br><br>Add the <b>${profile.mbti}</b> side, someone who ${mb.desc}, and you get this: ${_sy}`,
    `<b>${esc(profile.nick)}</b>さんは${_dm}の日干、「${st.img}」の気を持って生まれました。${st.desc}<br><br>そこに${mb.desc}<b>${profile.mbti}</b>の性格が加わって、${_sy}`);
  const zEl=EL[STEM_EL[saju.yearStem]];
  $('zodiac').textContent=LG==='ko'?`· ${STEMS_KO[saju.yearStem]}${BRANCHES_KO[saju.yearBranch]}년 ${zEl.zod} ${ANIMALS[saju.yearBranch]}띠`:`· ${STEMS[saju.yearStem]}${BRANCHES[saju.yearBranch]} · ${TL('',ZOD_EN[saju.yearBranch],ZOD_JA[saju.yearBranch])}`;
  const order=[[TL('시주','Hour','時柱'),'hour'],[TL('일주','Day','日柱'),'day'],[TL('월주','Month','月柱'),'month'],[TL('년주','Year','年柱'),'year']];
  $('pillars').innerHTML=order.map(([lab,k])=>{
    const p=saju.pillars[k];
    if(!p) return `<div class="pil"><div class="lab">${lab}</div><div class="gz top" style="color:var(--muted)">?<small>${TL('모름','?','不明')}</small></div><div class="gz" style="color:var(--muted)">?<small>${TL('모름','?','不明')}</small></div></div>`;
    return `<div class="pil ${k==='day'?'me':''}"><div class="lab">${lab}</div>
      <div class="gz top" style="color:${EL[STEM_EL[p.s]].color}">${k==='day'?`<span class="me-badge">${TL('나','ME','私')}</span>`:''}${STEMS[p.s]}<small>${LG==='ko'?STEMS_KO[p.s]:''}${EL[STEM_EL[p.s]].ko}</small></div>
      <div class="gz" style="color:${EL[BR_EL[p.b]].color}">${BRANCHES[p.b]}<small>${LG==='ko'?BRANCHES_KO[p.b]:''}${EL[BR_EL[p.b]].ko}</small></div></div>`;
  }).join('');
  const M=saju.meta;
  if(LG!=='ko') $('sajuMeta').innerHTML=M.boundary&&!M.known?TL('','<b style="color:var(--fire)">⚠️ You were born on a solar-term boundary.</b> Adding your birth time may change your month pillar. You can edit it in the MY tab.','<b style="color:var(--fire)">⚠️ 節気が切り替わる日に生まれています。</b>生まれた時刻を入れると月柱が変わることがあります。MYタブで入力できます。'):TL('',`🔭 Korea Astronomy Institute calendar data${M.known?' · solar-term time & true solar time corrected':' · add your birth time to see the hour pillar'}`,`🔭 韓国天文研究院の暦データ${M.known?' · 節入り時刻・真太陽時で補正':' · 生まれた時刻を入れると時柱も出ます'}`);
  else $('sajuMeta').innerHTML= M.known
    ? `🔭 KASI 정본 만세력 · 절입 시각 기준 · 서울 진태양시·서머타임 보정${profile.lunar?` · 음력 ${profile.lunar.m}월 ${profile.lunar.d}일${profile.lunar.leap?'(윤)':''} 입력`:''}`
    : (M.boundary?'<b style="color:var(--fire)">⚠️ 절기가 바뀌는 날 태어났어요.</b> 태어난 시각을 넣으면 월주(년주)가 달라질 수 있어요. MY 탭에서 다시 입력할 수 있어요.':`🔭 KASI 정본 만세력${profile.lunar?` · 음력 ${profile.lunar.m}월 ${profile.lunar.d}일${profile.lunar.leap?'(윤)':''} 입력`:''} · 시간을 넣으면 시주까지 나와요`);
  const total=saju.counts.reduce((a,b)=>a+b,0), max=Math.max(...saju.counts);
  $('bars').innerHTML=EL.map((e,i)=>`<div class="row"><span class="nm">${e.emoji} ${e.ko}</span><div class="track"><div class="fill" data-w="${saju.counts[i]/max*100}" style="background:${e.color}"></div></div><span class="ct">${saju.counts[i]}</span></div>`).join('')
    +`<p class="muted" style="font-size:12.5px;margin-top:10px">${TL(`총 ${total}글자 기준${!profile.btime?' (태어난 시간 제외)':''}`,`Based on ${total} characters${!profile.btime?' (birth time not included)':''}`,`全${total}文字で計算${!profile.btime?'(生まれた時刻なし)':''}`)}</p>`;
  requestAnimationFrame(()=>setTimeout(()=>document.querySelectorAll('#bars .fill').forEach(f=>f.style.width=f.dataset.w+'%'),80));
  const strong=saju.counts.indexOf(max), weak=saju.counts.indexOf(Math.min(...saju.counts));
  $('ptExcess').innerHTML=TL(`<b style="color:${EL[strong].color}">${EL[strong].ko} 기운</b>이 강해요. ${EL[strong].excess}`,`Strong <b style="color:${EL[strong].color}">${EL[strong].ko}</b> energy. ${EL[strong].excess}`,`<b style="color:${EL[strong].color}">${EL[strong].ko}の気</b>が強め。${EL[strong].excess}`);
  $('ptLack').innerHTML=TL(`<b style="color:${EL[weak].color}">${EL[weak].ko} 기운</b> 보충 추천: ${EL[weak].lack}`,`Top up <b style="color:${EL[weak].color}">${EL[weak].ko}</b>: ${EL[weak].lack}`,`<b style="color:${EL[weak].color}">${EL[weak].ko}の気</b>を補うなら: ${EL[weak].lack}`);
  $('ptMbti').innerHTML=`<b>${mb.best}</b> · ${MBTI[mb.best].nick}`;
  const helper=(STEM_EL[saju.dayStem]+4)%5;
  $('ptElem').innerHTML=TL(`<b style="color:${EL[helper].color}">${EL[helper].ko}(${EL[helper].name}) 일간</b>인 사람이 나를 든든하게 채워줘요`,`People with a <b style="color:${EL[helper].color}">${EL[helper].ko} day master</b> fill you up`,`<b style="color:${EL[helper].color}">${EL[helper].ko}の日干</b>の人があなたを支えてくれます`);
}

/* ================= TAROT ================= */
function todayInfo(){
  const d=new Date(), y=d.getFullYear(), m=d.getMonth()+1, dd=d.getDate();
  const p=dayPillar(y,m,dd);
  const myEl=STEM_EL[saju.dayStem], tEl=STEM_EL[p.s];
  const rel=RELATION[(tEl-myEl+5)%5];
  return {d,p,tEl,rel};
}
function renderTarot(){
  if(!profile) return;
  getSaju();
  const t=todayInfo(), days=TL(['일','월','화','수','목','금','토'],['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],['日','月','火','水','木','金','土']);
  $('todayDate').textContent=TL(`${t.d.getMonth()+1}.${t.d.getDate()} ${days[t.d.getDay()]}요일 · TODAY`,`${days[t.d.getDay()]} ${t.d.getMonth()+1}.${t.d.getDate()} · TODAY`,`${t.d.getMonth()+1}.${t.d.getDate()} (${days[t.d.getDay()]}) · TODAY`);
  $('todayHello').innerHTML=TL(`${esc(profile.nick)}님의<br>오늘 우주 날씨는? ☁️`,`${esc(profile.nick)}, what's your<br>cosmic weather today? ☁️`,`${esc(profile.nick)}さんの<br>今日の宇宙天気は? ☁️`);
  $('todayStreak').textContent=TL(`🔥 ${calcStreak()}일 연속`,`🔥 ${calcStreak()}-day streak`,`🔥 ${calcStreak()}日連続`);
  $('ilji').innerHTML=`<div class="big" style="color:${EL[t.tEl].color}">${STEMS[t.p.s]}${BRANCHES[t.p.b]}</div>
    <div><div class="t">${t.rel.emoji} ${TL('오늘은 '+t.rel.name,'Today: '+t.rel.name,'今日は'+t.rel.name)}</div><div class="d">${STEMS[t.p.s]}${BRANCHES[t.p.b]}日 · ${TL(`${EL[t.tEl].ko} 기운 × 나의 ${EL[STEM_EL[saju.dayStem]].ko} 기운`,`${EL[t.tEl].ko} day × your ${EL[STEM_EL[saju.dayStem]].ko}`,`${EL[t.tEl].ko}の日 × あなたの${EL[STEM_EL[saju.dayStem]].ko}`)}<br>${t.rel.desc}</div></div>`;
  draw = store.get('soulcode.draw.'+todayKey()) || (draw && draw.date===todayKey() ? draw : null);
  if(draw) showResult(false); else showPicker();
}
function showPicker(){
  $('pickZone').style.display='block'; $('flipWrap').style.display='none'; $('result').style.display='none';
  $('flip').classList.remove('flipped');
  const fan=$('fan'); fan.innerHTML='';
  for(let i=0;i<7;i++){
    const c=document.createElement('button'); c.className='cback'; c.setAttribute('aria-label',TL(`카드 ${i+1}`,`Card ${i+1}`,`カード${i+1}`));
    const o=i-3; c.style.transform=`translateX(${o*34}px) rotate(${o*9}deg)`; c._base=c.style.transform;
    c.onmouseenter=()=>c.style.transform=c._base+' translateY(-16px)';
    c.onmouseleave=()=>c.style.transform=c._base;
    c.onclick=()=>pick(c);
    fan.appendChild(c);
  }
  fan.classList.add('shuffle'); setTimeout(()=>fan.classList.remove('shuffle'),1300);
}
function pick(el){
  if(draw) return;
  const r=rng(hash(profile.nick+profile.birth+todayKey()+Math.random()));
  draw={date:todayKey(),card:Math.floor(r()*22),rev:r()<0.3,seed:hash(profile.nick+profile.birth+todayKey())};
  store.set('soulcode.draw.'+todayKey(),draw);
  addCollect(draw.card);
  document.querySelectorAll('#fan .cback').forEach(c=>{if(c!==el)c.style.opacity='0'});
  el.style.transform='translateY(-60px) scale(1.15)';
  setTimeout(()=>showResult(true),450);
}
function showResult(animate){
  const c=TAROT[draw.card];
  $('pickZone').style.display='none'; $('flipWrap').style.display='flex';
  $('flipWrap').querySelectorAll('.pop-sticker,.spark').forEach(e=>e.remove());
  const art=$('cardArt');
  art.className='card-art'+(draw.rev?' rev':'');
  art.style.background=`linear-gradient(165deg,${CARD_BG[draw.card]})`;
  art.innerHTML=`<div class="num">${ROMAN[draw.card]}</div><div class="sym">${c[2]}</div><div class="nm"><b>${c[0]}</b><small>${c[1]}</small></div>`;
  const flip=$('flip');
  if(!animate){flip.classList.add('flipped');$('holdUI').style.display='none';fillResult();$('result').style.display='block';enableTilt(flip);return}
  flip.classList.remove('flipped'); $('result').style.display='none'; $('holdUI').style.display='flex'; $('holdBar').style.width='0';
  holdToFlip(flip,$('holdBar'),()=>{
    $('holdUI').style.display='none';
    flip.classList.add('flipped');
    setTimeout(()=>{burst($('flipWrap'));stamp($('flipWrap'),draw.rev);enableTilt(flip)},420);
    setTimeout(()=>{fillResult();$('result').style.display='block'},900);
  });
}
/* ===== card interactions ===== */
function holdToFlip(el,bar,done){
  const DUR=900; let t0=0, raf=0, active=false, finished=false;
  const tick=now=>{
    if(!active) return;
    const p=Math.min(1,(now-t0)/DUR); bar.style.width=(p*100)+'%';
    el.style.transform=`scale(${1+p*0.06}) rotate(${(Math.random()-.5)*p*3}deg)`;
    if(p>=1){active=false;finished=true;el.classList.remove('charging');el.style.transform='';cleanup();try{navigator.vibrate&&navigator.vibrate(30)}catch(e){};done();return}
    raf=requestAnimationFrame(tick);
  };
  const start=e=>{if(finished)return;e.preventDefault();active=true;t0=performance.now();el.classList.add('charging');raf=requestAnimationFrame(tick)};
  const stop=()=>{if(!active)return;active=false;cancelAnimationFrame(raf);el.classList.remove('charging');el.style.transform='';bar.style.transition='width .25s';bar.style.width='0';setTimeout(()=>bar.style.transition='',260);toast(TL('조금만 더 꾹— 🤏','Hold a little longer— 🤏','もう少し長押し— 🤏'))};
  const cleanup=()=>{el.removeEventListener('pointerdown',start);window.removeEventListener('pointerup',stop);el.removeEventListener('pointerleave',stop)};
  if(el._holdCleanup) el._holdCleanup();
  el._holdCleanup=cleanup;
  el.addEventListener('pointerdown',start); window.addEventListener('pointerup',stop); el.addEventListener('pointerleave',stop);
  el.oncontextmenu=e=>e.preventDefault();
}
function enableTilt(el){
  if(el._tilt) return; el._tilt=true;
  const front=el.querySelector('.face.front');
  el.addEventListener('pointermove',e=>{
    if(!el.classList.contains('flipped')||el.classList.contains('charging')) return;
    const r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    el.style.transform=`rotateX(${(0.5-y)*18}deg) rotateY(${(x-0.5)*22}deg)`;
    front.style.setProperty('--sx',(x*100)+'%'); front.style.setProperty('--sy',(y*100)+'%');
  });
  el.addEventListener('pointerleave',()=>{el.style.transform='';front.style.setProperty('--sx','0%');front.style.setProperty('--sy','0%')});
}
const SPARKS=['✦','★','✧','♥','☻','✨','💫','🌙'];
function burst(host,n=20){
  for(let i=0;i<n;i++){
    const s=document.createElement('span'); s.className='spark';
    s.textContent=SPARKS[i%SPARKS.length];
    const a=Math.random()*Math.PI*2, d=110+Math.random()*90;
    s.style.setProperty('--dx',Math.cos(a)*d+'px'); s.style.setProperty('--dy',Math.sin(a)*d+'px'); s.style.setProperty('--r',(Math.random()*360-180)+'deg');
    s.style.fontSize=(16+Math.random()*16)+'px';
    s.style.color=['#FF3FAE','#7B5CFF','#1EA7FF','#E8B400','#1B1433'][i%5];
    host.appendChild(s); setTimeout(()=>s.remove(),1000);
  }
}
const STAMPS_UP=['LUCKY! 🍀','오히려 좋아 👍','가보자고 🔥','완전 럭키 ✨','WOW!','기운 미쳤다 ⚡'];
const STAMPS_REV=['괜찮아 괜찮아 🫶','반전 주의 🙃','일단 숨 고르기 🫧','쉬어가도 OK ☁️'];
function stamp(host,rev){
  const s=document.createElement('span'); s.className='pop-sticker';
  const list=rev?STAMPS_REV:STAMPS_UP; s.textContent=list[Math.floor(Math.random()*list.length)];
  s.style.background=rev?'var(--blue)':['var(--yellow)','var(--pink)','var(--green)'][Math.floor(Math.random()*3)];
  s.style.top='-6px'; s.style.right='calc(50% - 150px)'; s.style.setProperty('--rot','12deg');
  host.appendChild(s);
}
function fillResult(){
  setTimeout(showSavedDailyAI,0);
  const c=TAROT[draw.card], t=todayInfo();
  $('resUD').textContent=draw.rev?TL('🙃 거꾸로 나왔어요 (역방향)','🙃 Reversed','🙃 逆位置で出ました'):TL('😎 똑바로 나왔어요 (정방향)','😎 Upright','😎 正位置で出ました');
  $('resUD').style.background=draw.rev?'var(--blue)':'var(--green)';
  $('resName').textContent=`${c[0]} · ${ROMAN[draw.card]}`;
  $('resKw').textContent=draw.rev?c[4]:c[3];
  tone=profile.mbti[2]; setTone(tone);
  // scores
  const r=rng(draw.seed+draw.card);
  const scores=SCORE_CATS.map((_,i)=>{let s=55+Math.floor(r()*30); if(i===t.rel.boost)s+=10; s+=draw.rev?-6:6; return Math.max(30,Math.min(99,s))});
  const total=Math.round(scores.reduce((a,b)=>a+b,0)/4);
  $('scoreTotal').textContent=total;
  $('scoreLabel').textContent= total>=80?TL('오늘 치트키 켜짐 🔥','Cheat code ON today 🔥','今日はチートモード 🔥'):total>=68?TL('무난하게 굴러가는 날 😎','A smooth, easy day 😎','いい感じに回る日 😎'):TL('살살 가도 되는 날 🫧','Take it easy today 🫧','ゆるっといこう 🫧');
  $('scoreSub').textContent=TL(`${SCORE_CATS[t.rel.boost][1]} 운이 ${t.rel.name} 기운으로 상승`,`${SCORE_CATS[t.rel.boost][1]} luck boosted by ${t.rel.name}`,`${t.rel.name}の気で${SCORE_CATS[t.rel.boost][1]}運アップ`);
  const cols=['var(--pink)','var(--lav)','var(--lime)','var(--cyan)'];
  $('scoreBars').innerHTML=SCORE_CATS.map((s,i)=>`<div class="row"><span class="nm">${s[0]} ${s[1]}</span><div class="track"><div class="fill" data-w="${scores[i]}" style="background:${cols[i]}"></div></div><span class="ct">${scores[i]}</span></div>`).join('');
  setTimeout(()=>document.querySelectorAll('#scoreBars .fill').forEach(f=>f.style.width=f.dataset.w+'%'),100);
  // lucky
  const weak=saju.counts.indexOf(Math.min(...saju.counts)), e=EL[weak];
  const item=e.items[Math.floor(r()*e.items.length)], num=1+Math.floor(r()*9);
  draw.lucky={color:e.colorName,item,num,total};
  $('lucky').innerHTML=`<div class="mini"><div class="ic" style="color:${e.color}">●</div><div class="k">${TL('컬러','Color','カラー')}</div><div class="v">${e.colorName}</div></div>
    <div class="mini"><div class="ic">🎁</div><div class="k">${TL('아이템','Item','アイテム')}</div><div class="v">${item}</div></div>
    <div class="mini"><div class="ic">🔢</div><div class="k">${TL('숫자','Number','数字')}</div><div class="v">${num}</div></div>`;
}
function setTone(t){
  tone=t; const c=TAROT[draw.card];
  $('toneT').classList.toggle('on',t==='T'); $('toneF').classList.toggle('on',t==='F');
  const msg=draw.rev?(t==='T'?c[7]:c[8]):(t==='T'?c[5]:c[6]);
  const el=$('resMsg'); el.style.opacity=0; setTimeout(()=>{el.textContent=msg;el.style.transition='opacity .3s';el.style.opacity=1},120);
}
function redraw(){store.del('soulcode.draw.'+todayKey());draw=null;showPicker();$('s-tarot').scrollTo({top:0,behavior:'smooth'})}

/* ================= SHARE ================= */
function shareText(){
  const sn=soulName();
  let s=`🔮 SOULCODE | ${profile.nick}님의 소울타입\n${sn.emoji} ${sn.title} “${sn.sub}”`;
  if(draw&&draw.lucky){const c=TAROT[draw.card];s+=`\n\n🃏 오늘의 카드: ${c[0]} (${draw.rev?'역':'정'}방향)\n${draw.rev?c[4]:c[3]}\n📊 운세 지수 ${draw.lucky.total} · 럭키컬러 ${draw.lucky.color}`}
  return s+'\n\n#소울코드 #사주MBTI #오늘의타로';
}
function openShare(){
  if(!saju) getSaju();
  const sn=soulName(); const c=draw?TAROT[draw.card]:null;
  $('storyIn').innerHTML=`<div class="logo-s holo-text">SOULCODE</div>
    <div><div class="big-e">${sn.emoji}</div><div class="muted" style="font-size:12px;margin:6px 0 4px">${esc(profile.nick)}님의 소울타입</div><div class="st h-display">${sn.title}</div><div class="holo-text" style="font-weight:700;font-size:14px;margin-top:4px">“${sn.sub}”</div></div>
    ${c&&draw.lucky?`<div class="card-l">🃏 오늘의 카드 <b>${c[0]}</b> ${draw.rev?'(역)':''}<br><span class="muted">${draw.rev?c[4]:c[3]}</span><br>📊 운세 지수 <b>${draw.lucky.total}</b></div>`:`<div class="card-l muted">오늘의 타로는 아직 안 뽑았어요</div>`}
    <div class="muted" style="font-size:11px">#소울코드 #사주MBTI</div>`;
  $('share').classList.add('show');
}
function closeShare(){$('share').classList.remove('show')}
function copyShare(){
  navigator.clipboard.writeText(shareText()).then(()=>toast('복사 완료! 스토리에 붙여넣어 보세요 📋')).catch(()=>toast(TL('이 환경에서는 복사가 막혀 있어요','Copying is blocked here','この環境ではコピーできません')));
}
$('share').onclick=e=>{if(e.target.id==='share')closeShare()};

/* ================= ME ================= */
function renderMe(){
  if(!profile) return; getSaju();
  $('meName').textContent=`${profile.nick}님`;
  const ht=!profile.btime?'모름':`${profile.btime} (${BRANCHES_KO[saju.pillars.hour.b]}시 ${BRANCHES[saju.pillars.hour.b]})`;
  $('meInfo').innerHTML=`<div class="sheet-row"><span class="muted">생년월일</span><span>${profile.birth.replace(/-/g,'.')}${profile.lunar?` <small class="muted">(음력 ${profile.lunar.y}.${profile.lunar.m}.${profile.lunar.d}${profile.lunar.leap?' 윤달':''})</small>`:''}</span></div>
    <div class="sheet-row"><span class="muted">태어난 시간</span><span>${ht}</span></div>
    <div class="sheet-row"><span class="muted">MBTI</span><span>${profile.mbti}</span></div>
    <div class="sheet-row"><span class="muted">일간</span><span>${STEMS[saju.dayStem]} ${STEMS_KO[saju.dayStem]}${EL[STEM_EL[saju.dayStem]].ko}</span></div>`;
  // streak
  const n=calcStreak(), visits=new Set(getVisits());
  $('stN').textContent=n;
  $('stT').textContent= n>=7?'일주일 넘게 출석 중 👑': n>=3?'불타는 중! 🔥':'오늘도 출석 완료 ✅';
  $('stS').textContent= n>=7?'카드 덱 스킨 해금 조건 달성 (정식 버전)':`${7-n}일만 더 오면 7일 연속 배지 획득`;
  const days=['일','월','화','수','목','금','토'], now=new Date(), wk=[];
  for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(now.getDate()-i);wk.push(d)}
  $('stWeek').innerHTML=wk.map((d,i)=>`<div><i class="${visits.has(dateKey(d))?'on':''} ${i===6?'today':''}">${visits.has(dateKey(d))?'🔥':''}</i>${days[d.getDay()]}</div>`).join('');
  // dex
  const col=getCollect(), got=Object.keys(col).length;
  $('dexCount').textContent=`· ${got} / 22 수집`;
  renderProBanner(); renderSkins(); renderSync(); $('yrLabel').textContent=reportYear()+'년';
  $('dex').innerHTML=TAROT.map((c,i)=>col[i]
    ?`<button style="background:linear-gradient(165deg,${CARD_BG[i]})" onclick="toast('${ROMAN[i]} ${c[0]} · ${c[3]} · ${col[i]}회 뽑음')">${c[2]}<small>${c[0]}</small></button>`
    :`<button class="lock" onclick="toast('아직 못 만난 카드예요 🔒')">?<small>${ROMAN[i]}</small></button>`).join('');
}
function resetAll(){
  store.del('soulcode.profile'); store.del('soulcode.draw.'+todayKey());
  profile=null; draw=null; ob.mbti={};
  obPicker.reset(); $('nick').value=''; $('birth').value=''; $('btime').value=''; $('btime').disabled=false; $('btUnknown').classList.remove('sel'); $('n1').disabled=true;$('n2').disabled=true;$('n3').disabled=true;
  document.querySelectorAll('.mbti-opt').forEach(b=>b.classList.remove('sel')); $('mbtiPrev').textContent='????';
  spReset(); mtReset();
  setStep(1); go('s-splash');
}

/* ================= STREAK & COLLECTION ================= */
const mem = {visits:[], collect:{}};
function dateKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function getVisits(){return store.get('soulcode.visits')||mem.visits}
function logVisit(){
  const v=getVisits(), k=todayKey();
  if(!v.includes(k)) v.push(k);
  const keep=v.slice(-90); mem.visits=keep; store.set('soulcode.visits',keep);
}
function calcStreak(){
  const v=new Set(getVisits()); let n=0; const d=new Date();
  while(v.has(dateKey(d))){n++; d.setDate(d.getDate()-1)}
  return n;
}
function getCollect(){return store.get('soulcode.collect')||mem.collect}
function addCollect(i){const c=getCollect(); c[i]=(c[i]||0)+1; mem.collect=c; store.set('soulcode.collect',c)}

/* ================= 3-CARD SPREAD ================= */
const SP_CATS=[{k:'love',e:'💘',n:'연애'},{k:'career',e:'💼',n:'진로·공부'},{k:'people',e:'🤝',n:'인간관계'},{k:'money',e:'💸',n:'금전'}];
const SP_POS=[{k:'과거',w:0.5},{k:'현재',w:1.5},{k:'미래',w:2}];
const LUCK=[1,2,0,2,1,1,2,2,1,0,2,1,-1,-1,1,-2,-2,3,-1,3,1,3];
const VERDICT={
  go:{t:'GO 신호 🟢',d:'흐름이 당신 편이에요. 망설이던 일이라면 지금 움직여도 좋아요.'},
  wait:{t:'잠깐 대기 🟡',d:'방향은 맞지만 타이밍을 조금 더 보세요. 준비할수록 유리해져요.'},
  turn:{t:'방향 전환 🔴',d:'지금 방식 그대로면 힘이 많이 들 수 있어요. 접근을 바꿔보세요.'}
};
const SP_ACTION={
  love:{go:'용기 내서 먼저 말 걸기. 짧고 가볍게!',wait:'답장 텀에 신경 쓰기보다 내 일상에 집중하기',turn:'이 관계에서 내가 진짜 원하는 게 뭔지 먼저 정리하기'},
  career:{go:'미뤄둔 지원·도전을 이번 주 안에 실행하기',wait:'정보를 더 모으기. 선배나 현직자에게 한 번 물어보기',turn:'목표를 한 단계 낮춰서 작게 다시 시작하기'},
  people:{go:'고마운 사람에게 먼저 연락하기',wait:'오해가 있다면 감정이 가라앉은 뒤에 대화하기',turn:'나를 지치게 하는 관계와는 잠시 거리 두기'},
  money:{go:'계획한 구매·저축 실행해도 OK, 단 예산 안에서',wait:'큰 지출은 2주 미루고 가계부 써보기',turn:'구독 서비스 정리부터! 새는 돈 막기'},
};
const sp={cat:null,deck:[],picks:[],q:''};
$('spCats').innerHTML=SP_CATS.map(c=>`<button class="chip" data-k="${c.k}">${c.e} ${c.n}</button>`).join('');
document.querySelectorAll('#spCats .chip').forEach(b=>b.onclick=()=>{
  sp.cat=b.dataset.k; document.querySelectorAll('#spCats .chip').forEach(x=>x.classList.toggle('sel',x===b)); $('spGo').disabled=false;
});
function spStart(){
  sp.q=$('spQ').value.trim(); sp.picks=[];
  sp.deck=[...Array(22).keys()].sort(()=>Math.random()-.5);
  $('spSetup').style.display='none'; $('spPick').style.display='block'; $('spArea').style.display='block';
  $('spResult').style.display='none'; $('spHint').style.display='block';
  $('spSlots').innerHTML=SP_POS.map((p,i)=>`<div><div class="slot" id="slot${i}"><div class="lbl">${p.k}</div>
    <div class="sflip"><div class="flip-inner"><div class="face back"></div><div class="face front"><div class="card-art" id="sArt${i}"></div></div></div></div></div><div class="slot-cap" id="sCap${i}">&nbsp;</div></div>`).join('');
  spHint();
  const fan=$('spFan'); fan.innerHTML='';
  for(let i=0;i<9;i++){
    const c=document.createElement('button'); c.className='cback'; c.setAttribute('aria-label',`카드 ${i+1}`);
    const o=i-4; c.style.width='78px'; c.style.height='128px'; c.style.left='-39px';
    c.style.transform=`translateX(${o*28}px) rotate(${o*7}deg)`; c._base=c.style.transform;
    c.onmouseenter=()=>{if(!c._used)c.style.transform=c._base+' translateY(-14px)'};
    c.onmouseleave=()=>{if(!c._used)c.style.transform=c._base};
    c.onclick=()=>spPick(c);
    fan.appendChild(c);
  }
  fan.classList.add('shuffle'); setTimeout(()=>fan.classList.remove('shuffle'),1300);
}
function spHint(){
  const n=sp.picks.length;
  $('spHint').innerHTML=n<3?`<b style="color:var(--text)">${SP_POS[n].k}</b>를 보여줄 카드를 골라주세요 (${n+1}/3)`:'카드를 펼치는 중...';
}
function spPick(el){
  if(el._used||sp.picks.length>=3) return;
  el._used=true; el.style.opacity='0'; el.style.pointerEvents='none';
  const i=sp.picks.length, card=sp.deck[i], rev=Math.random()<0.3;
  sp.picks.push({card,rev}); addCollect(card);
  const c=TAROT[card], art=$('sArt'+i);
  art.className='card-art'+(rev?' rev':''); art.style.background=`linear-gradient(165deg,${CARD_BG[card]})`;
  art.innerHTML=`<div class="num">${ROMAN[card]}</div><div class="sym">${c[2]}</div><div class="nm"><b>${c[0]}</b></div>`;
  $('slot'+i).classList.add('filled');
  spHint();
  if(sp.picks.length===3){
    setTimeout(()=>{$('spArea').style.display='none';$('spHint').style.display='none'},350);
    [0,1,2].forEach(k=>setTimeout(()=>{
      $('slot'+k).querySelector('.sflip').classList.add('flipped');
      setTimeout(()=>burst($('slot'+k),8),380);
      $('sCap'+k).textContent=`${SP_POS[k].k}${sp.picks[k].rev?' · 역':''}`;
    },500+k*450));
    setTimeout(spRender,500+3*450+400);
  }
}
function spRender(){
  const cat=SP_CATS.find(c=>c.k===sp.cat), t=profile.mbti[2];
  let score=0;
  const blocks=sp.picks.map((p,i)=>{
    const c=TAROT[p.card], kw=p.rev?c[4]:c[3], v=LUCK[p.card];
    score+=(p.rev?(v>0?-1:v<0?1:-1):v)*SP_POS[i].w;
    const lead=[`${cat.n}에서 지나온 흐름은 「${kw}」였어요.`,`지금 ${cat.n}의 핵심 키워드는 「${kw}」.`,`앞으로는 「${kw}」 쪽으로 흘러갈 가능성이 높아요.`][i];
    const msg=p.rev?(t==='T'?c[7]:c[8]):(t==='T'?c[5]:c[6]);
    return `<div class="panel pos"><div class="hd"><span class="p">${SP_POS[i].k}</span><b>${c[2]} ${c[0]}</b>${p.rev?'<span class="r">역방향</span>':''}</div><p class="kwl">${lead}</p><p>${msg}</p></div>`;
  }).join('');
  const vk=score>=3?'go':score>=0?'wait':'turn', V=VERDICT[vk];
  sp.last={cat:cat.n,verdict:V.t,cards:sp.picks.map(p=>TAROT[p.card][0]+(p.rev?'(역)':''))};
  $('spResult').innerHTML=`${sp.q?`<p class="q-echo"><span>“${esc(sp.q)}”</span></p>`:'<div style="height:14px"></div>'}
    ${blocks}
    <div class="sec-t">🧭 종합 리딩 · ${cat.e} ${cat.n}</div>
    <div class="msg-box" style="margin-top:0"><div class="h-display" style="font-size:24px;margin-bottom:8px">${V.t}</div><p style="font-size:15px;line-height:1.65">${V.d}</p>
      <p style="font-size:15px;line-height:1.65;margin-top:12px"><b>👉 이번 주 액션</b><br>${SP_ACTION[sp.cat][vk]}</p></div>
    <div class="ai-only"><button class="btn pink ai-btn" id="aiSpBtn" onclick="aiSpread()">🤖 AI 종합 리딩 받기</button><div class="ai-box" id="aiSp"></div><p class="ai-quota"></p></div>
    <div class="row-btns"><button class="btn ghost" onclick="spCopy()">결과 복사</button><button class="btn" onclick="spReset()">다른 고민 보기</button></div>
    <p class="disclaimer">${t==='T'?'🧠 T버전':'💗 F버전'} 해석이에요 · 재미로 보는 콘텐츠예요</p>`;
  $('spResult').style.display='block'; refreshQuota();
}
function spCopy(){
  const s=sp.last; const txt=`🔮 SOULCODE 고민 타로 | ${s.cat}\n${sp.q?`“${sp.q}”\n`:''}과거 ${s.cards[0]} → 현재 ${s.cards[1]} → 미래 ${s.cards[2]}\n결과: ${s.verdict}\n#소울코드 #고민타로`;
  navigator.clipboard.writeText(txt).then(()=>toast(TL('복사 완료! 📋','Copied! 📋','コピーしました! 📋'))).catch(()=>toast(TL('이 환경에서는 복사가 막혀 있어요','Copying is blocked here','この環境ではコピーできません')));
}
function spReset(){
  sp.picks=[]; $('spSetup').style.display='block'; $('spPick').style.display='none'; $('spResult').style.display='none';
  $('spQ').value=''; $('s-spread').scrollTo({top:0,behavior:'smooth'});
}

/* ================= MATCH ================= */
const MT_REL=[{k:'lover',e:'💘',n:'썸·연인 PRO'},{k:'friend',e:'🫶',n:'친구'},{k:'work',e:'💼',n:'동료'}];
const SAJU_MATCH=[
  {s:76,t:'닮은꼴 관계',d:'같은 오행끼리라 말 안 해도 통하는 게 많아요. 대신 둘 다 고집이 생기면 한 치도 안 물러설 수 있어요.'},
  {s:84,t:'내가 챙겨주는 관계',d:'내 기운이 상대를 키워주는 흐름이에요. 챙겨주는 맛이 있지만, 혼자 주기만 하다 지치지 않게 주의.'},
  {s:66,t:'내가 리드하는 관계',d:'내 기운이 상대를 다루는 구조라 주도권이 자연스럽게 나한테 와요. 상대 의견을 먼저 묻는 습관이 케미를 살려요.'},
  {s:62,t:'나를 다듬어주는 관계',d:'상대가 나를 단련시키는 구조예요. 가끔 잔소리처럼 느껴져도 결국 나를 성장시키는 사람.'},
  {s:90,t:'나를 채워주는 관계',d:'상대의 기운이 나를 살려주는 흐름이에요. 같이 있으면 편하고 충전되는 느낌!'},
];
const MT_TIP={
  lover:['다름이 오히려 매력이 될 수 있어요. 상대 MBTI 화법으로 한 번 말해보기 💬','케미 충분! 먼저 연락하면 반응 좋을 확률 높아요 💌'],
  friend:['취향은 달라도 서로에게 새로운 세계를 보여줄 수 있는 친구예요 🌏','평생 친구 각. 같이 여행 한 번 가보세요 ✈️'],
  work:['업무 스타일이 달라요. 역할과 마감을 미리 맞춰두기 📋','같이 프로젝트 하면 시너지 최고. 역할 분담만 확실히! 🚀'],
};
const mt={rel:'lover',last:null};
if(window.soulLang&&window.soulLang!=='ko'&&window.applyContentI18n){try{applyContentI18n()}catch(e){console.warn('i18n content',e)}}
$('mtRel').innerHTML=MT_REL.map(r=>`<button class="chip ${r.k==='lover'?'sel':''}" data-k="${r.k}">${r.e} ${r.n}</button>`).join('');
document.querySelectorAll('#mtRel .chip').forEach(b=>b.onclick=()=>{mt.rel=b.dataset.k;document.querySelectorAll('#mtRel .chip').forEach(x=>x.classList.toggle('sel',x===b));$('mtTimeWrap').style.display=mt.rel==='lover'?'block':'none'});
$('mtMbti').innerHTML=`<option value="">${TL('MBTI 선택','Choose MBTI','MBTIを選択')}</option>`+Object.keys(MBTI).map(k=>`<option value="${k}">${k} · ${MBTI[k].nick}</option>`).join('');
function mtCheck(){$('mtGo').disabled=!($('mtNick').value.trim()&&$('mtBirth').value&&$('mtMbti').value)}
['mtNick','mtBirth','mtMbti'].forEach(id=>{$(id).oninput=mtCheck;$(id).onchange=mtCheck});
const mtPicker=mountBirthPicker($('mtBirth'),mtCheck);
function mbtiMatch(a,b){
  if(MBTI[a].best===b||MBTI[b].best===a) return {s:96,best:true};
  let s=30; s+=a[1]===b[1]?25:5; s+=a[0]!==b[0]?15:8; s+=a[2]!==b[2]?12:10; s+=a[3]!==b[3]?10:8;
  return {s,best:false};
}
function mbtiLines(a,b){
  const L=[];
  L.push(a[1]===b[1]?TL('세상을 보는 방식이 같아서 대화가 잘 통해요.','You see the world the same way, so talking is easy.','世界の見方が同じなので話がよく通じます。'):TL('보는 관점이 달라서 신기하지만, 가끔 대화가 엇갈릴 수 있어요.','Your viewpoints differ, which is fun, but conversations can sometimes miss.','視点が違って新鮮だけど、たまに会話がすれ違うかも。'));
  L.push(a[0]!==b[0]?TL('에너지 방향이 반대라 서로를 보완해줘요.','Your energy points opposite ways, so you balance each other.','エネルギーの向きが逆だから、お互いを補い合えます。'):a[0]==='E'?TL('둘 다 밖으로! 같이 놀면 텐션 폭발 🎉','Both outgoing! Hanging out together is pure hype 🎉','ふたりとも外向き!一緒に遊ぶとテンション爆発 🎉'):TL('둘 다 집순이·집돌이 모드, 조용한 만남이 찰떡 🏠','Both homebodies: quiet hangouts are perfect 🏠','ふたりともおうち派、まったりデートがぴったり 🏠'));
  L.push(a[2]!==b[2]?TL('한 명은 논리, 한 명은 공감 담당. 다툴 땐 서로 번역이 필요해요.','One brings logic, one brings empathy. In fights you need to translate for each other.','ひとりは論理、ひとりは共感担当。ケンカの時はお互い通訳が必要。'):a[2]==='T'?TL('둘 다 팩트로 대화해서 깔끔해요.','You both talk in facts, so things stay clean.','ふたりとも事実ベースで話すからスッキリ。'):TL('서로 감정을 잘 알아줘서 따뜻해요.','You both get each other\'s feelings, so it feels warm.','お互いの気持ちをわかり合えてあたたかい。'));
  L.push(a[3]!==b[3]?TL('계획러와 즉흥러 조합, 여행 갈 땐 역할 분담 필수!','A planner and a go-with-the-flow type: split roles when you travel!','計画派と即興派のコンビ、旅行では役割分担が必須!'):a[3]==='J'?TL('둘 다 계획형이라 약속 시간은 칼같아요 ⏰','Both planners, so you\'re always on time ⏰','ふたりとも計画派だから時間ぴったり ⏰'):TL('둘 다 즉흥형이라 재밌지만, 일정은 누가 챙기죠? 🤔','Both spontaneous: fun, but who handles the schedule? 🤔','ふたりとも即興派で楽しいけど、予定は誰が管理する? 🤔'));
  return L;
}
function ttiMatch(a,b){
  if((a+b)%12===1) return {s:92,t:TL('육합','Perfect pair','六合'),d:TL('서로를 끌어당기는 띠 조합이에요.','Zodiac signs that pull each other in.','お互いを引き寄せる干支の組み合わせ。')};
  if(a!==b&&a%4===b%4) return {s:88,t:TL('삼합','Team trio','三合'),d:TL('같은 목표를 향해 뭉치는 띠 조합이에요.','Signs that team up toward the same goal.','同じ目標に向かって団結する干支の組み合わせ。')};
  if(Math.abs(a-b)===6) return {s:55,t:TL('충','Clash','冲'),d:TL('부딪히면 불꽃 튀는 조합. 대신 서로에게 좋은 자극제예요.','Sparks fly when you clash, but you push each other to grow.','ぶつかると火花が散る組み合わせ。でもいい刺激になる。')};
  if(a===b) return {s:75,t:TL('같은 띠','Same sign','同じ干支'),d:TL('생활 리듬과 감성이 비슷해요.','Similar rhythms and vibes.','生活リズムや感性が似ています。')};
  return {s:70,t:TL('무난','Easygoing','おだやか'),d:TL('크게 부딪힐 일 없는 편안한 조합이에요.','A comfortable match with few clashes.','大きくぶつかることのない気楽な組み合わせ。')};
}
function runMatch(){
  if(mt.rel==='lover') return runLovePro();
  const nick=$('mtNick').value.trim(), [y,m,d]=$('mtBirth').value.split('-').map(Number), mb=$('mtMbti').value;
  if(y<1940||y>2025){toast(TL('1940~2025년 사이로 입력해주세요','Enter a year between 1940 and 2025','1940〜2025年の間で入力してください'));return}
  const them=calcSaju(y,m,d,''), a=saju.dayStem, b=them.dayStem;
  const ea=STEM_EL[a], eb=STEM_EL[b];
  let sj={...SAJU_MATCH[(eb-ea+5)%5]}, hap=Math.abs(a-b)===5;
  if(hap){sj.s=Math.max(sj.s,95)} else if(a%2!==b%2){sj.s+=4}
  const mm=mbtiMatch(profile.mbti,mb), tt=ttiMatch(saju.yearBranch,them.yearBranch);
  const total=Math.round(sj.s*0.45+mm.s*0.4+tt.s*0.15);
  const verdict= total>=88?TL('천생연분 레벨 💖','Soulmate level 💖','運命の相手レベル 💖'):total>=78?TL('찰떡 케미 ✨','Perfect chemistry ✨','相性ばっちり ✨'):total>=66?TL('노력하면 꿀케미 🍯','Sweet with a little effort 🍯','歩み寄れば最高の相性 🍯'):TL('롤러코스터 케미 🎢','Rollercoaster chemistry 🎢','ジェットコースター相性 🎢');
  const rel=MT_REL.find(r=>r.k===mt.rel), tip=MT_TIP[mt.rel][total>=78?1:0];
  mt.last={nick,total,verdict,rel:rel.n,mb};
  const bar=(lab,v,col)=>`<div class="row"><span class="nm" style="width:76px">${lab}</span><div class="track"><div class="fill" data-w="${v}" style="background:${col}"></div></div><span class="ct">${v}</span></div>`;
  $('mtResult').innerHTML=`
    <div class="panel" style="margin-top:4px;padding-top:22px">
      <div class="match-top">
        <div class="avatar"><div class="e">${STEM_INFO[a].emoji}</div><b>${esc(profile.nick)}</b><small>${profile.mbti} · ${EL[ea].ko}</small></div>
        <div class="heart holo-text">${total}<small>${rel.e} ${TL(rel.n+' 궁합',rel.n,rel.n+'の相性')}</small></div>
        <div class="avatar"><div class="e">${STEM_INFO[b].emoji}</div><b>${esc(nick)}</b><small>${mb} · ${EL[eb].ko}</small></div>
      </div>
      <div class="verdict h-display">${verdict}</div>
      <div class="bars" style="margin-top:14px">${bar(TL('☯︎ 사주','☯︎ Saju','☯︎ 四柱'),sj.s,'var(--lav)')}${bar('🧬 MBTI',mm.s,'var(--pink)')}${bar(TL('🐾 띠','🐾 Zodiac','🐾 干支'),tt.s,'var(--cyan)')}</div>
    </div>
    <div class="sec-t">${TL('☯︎ 사주로 보면','☯︎ By Saju','☯︎ 四柱推命で見ると')} · ${sj.t}</div>
    <div class="panel line-list">
      <p><b style="color:${EL[ea].color}">${STEMS[a]}${EL[ea].ko}</b>(${STEM_INFO[a].img}) × <b style="color:${EL[eb].color}">${STEMS[b]}${EL[eb].ko}</b>(${STEM_INFO[b].img})</p>
      <p>${sj.d}</p>
      ${hap?TL('<p>🧲 <b>천간합</b> 발견! 두 사람의 일간이 서로 합을 이루는 드문 조합이에요. 끌어당기는 힘이 강해요.</p>','<p>🧲 <b>Heavenly bond</b> found! Your day masters combine, a rare match with a strong pull.</p>','<p>🧲 <b>干合</b>発見!ふたりの日干が合になる珍しい組み合わせ。引き合う力が強い。</p>'):''}
    </div>
    <div class="sec-t">${TL('🧬 MBTI로 보면','🧬 By MBTI','🧬 MBTIで見ると')} · ${profile.mbti} × ${mb}</div>
    <div class="panel line-list">${mm.best?TL('<p>✨ <b>찰떡 조합</b>으로 유명한 MBTI 궁합이에요!</p>','<p>✨ A famously <b>perfect MBTI pair</b>!</p>','<p>✨ <b>相性抜群</b>で有名なMBTIの組み合わせ!</p>'):''}${mbtiLines(profile.mbti,mb).map(l=>`<p>${l}</p>`).join('')}</div>
    <div class="sec-t">${TL('🐾 띠로 보면','🐾 By zodiac','🐾 干支で見ると')} · ${tt.t}</div>
    <div class="panel line-list"><p>${TL(`${ANIMALS[saju.yearBranch]}띠 × ${ANIMALS[them.yearBranch]}띠`,`${ZOD_EN[saju.yearBranch]} × ${ZOD_EN[them.yearBranch]}`,`${ZOD_JA[saju.yearBranch]} × ${ZOD_JA[them.yearBranch]}`)} · ${tt.d}</p></div>
    <div class="sec-t">${TL('💡 케미 업 팁','💡 Chemistry tip','💡 相性アップのコツ')}</div>
    <div class="msg-box" style="margin-top:0"><p class="msg" style="font-size:16px">${tip}</p></div>
    <div class="row-btns"><button class="btn ghost" onclick="mtCopy()">${TL('결과 복사','Copy result','結果をコピー')}</button><button class="btn" onclick="mtReset()">${TL('다른 사람과 보기','Try someone else','他の人と見る')}</button></div>
    <p class="disclaimer">${TL('상대 태어난 시간 없이 계산했어요 · 재미로 보는 콘텐츠예요','Calculated without their birth time · just for fun','相手の生まれた時刻なしで計算 · お楽しみコンテンツです')}</p>`;
  $('mtForm').style.display='none'; $('mtResult').style.display='block';
  $('s-match').scrollTo({top:0}); refreshQuota();
  setTimeout(()=>document.querySelectorAll('#mtResult .fill').forEach(f=>f.style.width=f.dataset.w+'%'),120);
}
function mtCopy(){
  const r=mt.last; if(r.pro){navigator.clipboard.writeText(r.pro).then(()=>toast(TL('복사 완료! 걔한테 보내볼까? 💌','Copied! Send it to them? 💌','コピー完了!相手に送ってみる? 💌'))).catch(()=>toast(TL('이 환경에서는 복사가 막혀 있어요','Copying is blocked here','この環境ではコピーできません')));return} const txt=TL(`💞 SOULCODE 궁합 | ${profile.nick} × ${r.nick} (${r.rel})\n${profile.mbti} × ${r.mb} → ${r.total}점 · ${r.verdict}\n너도 궁합 봐볼래? #소울코드 #사주궁합 #MBTI궁합`,`💞 SOULCODE match | ${profile.nick} × ${r.nick} (${r.rel})\n${profile.mbti} × ${r.mb} → ${r.total} pts · ${r.verdict}\nCheck yours too? #soulcode #MBTI #saju`,`💞 SOULCODE 相性 | ${profile.nick} × ${r.nick} (${r.rel})\n${profile.mbti} × ${r.mb} → ${r.total}点 · ${r.verdict}\nあなたも相性見てみる? #ソウルコード #MBTI相性 #四柱推命`);
  navigator.clipboard.writeText(txt).then(()=>toast(TL('복사 완료! 친구에게 보내보세요 💌','Copied! Send it to a friend 💌','コピー完了!友達に送ってみて 💌'))).catch(()=>toast(TL('이 환경에서는 복사가 막혀 있어요','Copying is blocked here','この環境ではコピーできません')));
}
function mtReset(){
  $('mtForm').style.display='block'; $('mtResult').style.display='none';
  mtPicker.reset(); $('mtNick').value=''; $('mtBirth').value=''; $('mtMbti').value=''; $('mtTime').value=''; mtCheck();
  $('s-match').scrollTo({top:0,behavior:'smooth'});
}

/* ================= LOVE PRO ================= */
const PIL_KEYS=['year','month','day','hour'], PIL_KO=['년','월','일','시'];
const WONJIN=[[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]], HAE=[[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];
const inPairs=(P,a,b)=>P.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));
function brRel(a,b){
  if(a===b) return 'same';
  if((a+b)%12===1) return 'yukhap';
  if(Math.abs(a-b)===6) return 'chung';
  if(inPairs(WONJIN,a,b)) return 'wonjin';
  if(inPairs(HAE,a,b)) return 'hae';
  if(a%4===b%4) return 'samhap';
  return 'none';
}
const BR_REL={
  yukhap:{n:'육합',s:95,i:'🧲',d:'배우자 자리끼리 육합! 서로 끌어당기는 자석 커플이에요.'},
  samhap:{n:'삼합',s:88,i:'🤝',d:'배우자 자리가 삼합. 같은 방향을 보고 걷는 팀플 커플이에요.'},
  same:{n:'같은 글자',s:72,i:'👯',d:'배우자 자리가 같은 글자예요. 생활 패턴 싱크로율은 높지만, 너무 닮아서 설렘이 줄 수 있어요.'},
  none:{n:'평화 모드',s:70,i:'☁️',d:'특별히 부딪히지도 당기지도 않는 사이. 케미는 둘이 같이 만들어가는 타입이에요.'},
  hae:{n:'해(害)',s:58,i:'🫧',d:'사소한 서운함이 쌓이기 쉬운 조합. 그때그때 말로 풀면 문제없어요.'},
  wonjin:{n:'원진',s:50,i:'🌀',d:'이유 없이 서운한데 이상하게 못 놓는… 애증 케미 주의! 서로의 다름을 인정하는 게 포인트.'},
  chung:{n:'충',s:45,i:'⚡',d:'부딪히면 불꽃이 튀어요. 대신 서로를 확 바꿔놓는 강렬한 인연이기도 해요.'},
};
const TEN=[['비견','겁재'],['식신','상관'],['편재','정재'],['편관','정관'],['편인','정인']];
const TEN_INFO={
  비견:{s:76,d:'친구 같은 연인. 편하고 대등한데, 설렘은 직접 만들어야 해요.'},
  겁재:{s:64,d:'자극을 주는 라이벌형. 같이 있으면 승부욕 ON 🔥'},
  식신:{s:84,d:'자꾸 챙겨주고 싶은 사람. 맛있는 거 먹이고 싶은 마음 🍰'},
  상관:{s:74,d:'티키타카 장난꾸러기. 말싸움도 데이트처럼 재밌는 사이 😝'},
  편재:{s:80,d:'설렘 자극 담당. 자유롭고 이벤트 같은 연애 🎢'},
  정재:{s:88,d:'현실적이고 안정적인 짝꿍. 오래 가는 연애 각 🏡'},
  편관:{s:72,d:'강렬하게 끌리는 사람. 끌림은 MAX, 대신 밀당 피로 주의 ⚡'},
  정관:{s:88,d:'믿음직하고 반듯한 사람. 어디 가서 자랑하고 싶은 연인 🎖️'},
  편인:{s:70,d:'나를 독특하게 이해해주는 사람. 대화가 깊어지는 사이 🔭'},
  정인:{s:84,d:'무조건 내 편. 같이 있으면 마음이 놓이는 사람 🫶'},
};
function tenGod(me,other){const d=(STEM_EL[other]-STEM_EL[me]+5)%5;return TEN[d][me%2===other%2?0:1]}
const DOHWA=[9,6,3,0]; // branch%4 → 도화 지지
const HONGYEOM=[6,6,2,7,4,4,10,9,0,8]; // 일간별 홍염 지지
function pillarsArr(S){return PIL_KEYS.map(k=>S.pillars[k])}
function charmCheck(S){
  const P=pillarsArr(S), brs=P.filter(Boolean).map(p=>p.b);
  const bases=[S.pillars.day.b,S.pillars.year.b];
  const dohwa=bases.some(base=>{const t=DOHWA[base%4];return brs.some((b,i)=>b===t)});
  const hong=brs.includes(HONGYEOM[S.dayStem]);
  return {dohwa,hong};
}
function complement(A,B){
  const tA=A.counts.reduce((a,b)=>a+b,0), tB=B.counts.reduce((a,b)=>a+b,0);
  const ratio=(X,tX,Y,tY)=>{
    const avg=tX/5; let need=0,give=0; const fills=[];
    X.counts.forEach((c,i)=>{const n=Math.max(0,avg-c); if(n>0){need+=n; const g=Math.min(n,Y.counts[i]*tX/tY); give+=g; if(Y.counts[i]>=2&&c<=1) fills.push(i)}});
    return {r:need?give/need:1,fills};
  };
  const ab=ratio(A,tA,B,tB), ba=ratio(B,tB,A,tA);
  return {score:Math.round(45+50*(ab.r+ba.r)/2), meFilled:ab.fills, themFilled:ba.fills};
}
function crossScan(A,B){
  const PA=pillarsArr(A), PB=pillarsArr(B), items=[]; let hap=0,chung=0,won=0,shap=0;
  PA.forEach((pa,i)=>{if(!pa)return; PB.forEach((pb,j)=>{if(!pb)return;
    const r=brRel(pa.b,pb.b), dayInv=(i===2||j===2);
    if(r==='yukhap'){hap++;items.push({w:dayInv?3:1,t:`${PIL_KO[i]}지 ${BRANCHES[pa.b]} × ${PIL_KO[j]}지 ${BRANCHES[pb.b]} · 육합 🧲`,c:'var(--green)'})}
    if(r==='samhap'){hap+=0.5}
    if(r==='chung'){chung++;items.push({w:dayInv?3:1,t:`${PIL_KO[i]}지 ${BRANCHES[pa.b]} × ${PIL_KO[j]}지 ${BRANCHES[pb.b]} · 충 ⚡`,c:'var(--orange)'})}
    if(r==='wonjin'){won++;items.push({w:dayInv?2.5:0.8,t:`${PIL_KO[i]}지 ${BRANCHES[pa.b]} × ${PIL_KO[j]}지 ${BRANCHES[pb.b]} · 원진 🌀`,c:'var(--blue)'})}
    if(Math.abs(pa.s-pb.s)===5){shap++;items.push({w:dayInv?3.5:1.2,t:`${PIL_KO[i]}간 ${STEMS[pa.s]} × ${PIL_KO[j]}간 ${STEMS[pb.s]} · 천간합 💞`,c:'var(--pink)'})}
  })});
  items.sort((a,b)=>b.w-a.w);
  const score=Math.max(35,Math.min(98,Math.round(62+6*hap+8*shap-6*chung-5*won)));
  return {items:items.slice(0,6),hap:Math.round(hap),chung,won,shap,score};
}
function coupleMonths(A,B){
  const out=[], now=new Date();
  for(let k=1;k<=12;k++){
    const d=new Date(now.getFullYear(),now.getMonth()+k,15), y=d.getFullYear(), m=d.getMonth()+1;
    const mp=calcSaju(y,m,15,'').pillars.month; let s=0;
    [A,B].forEach(S=>{const r=brRel(mp.b,S.pillars.day.b);
      s+={yukhap:3,samhap:2,same:1,none:0,hae:-1,wonjin:-2,chung:-3}[r];
      if((STEM_EL[mp.s]+1)%5===STEM_EL[S.dayStem]) s+=1;});
    out.push({y,m,mp,s});
  }
  const sorted=[...out].sort((a,b)=>b.s-a.s);
  return {best:sorted.slice(0,2).sort((a,b)=>(a.y*12+a.m)-(b.y*12+b.m)),worst:sorted[sorted.length-1]};
}
function runLovePro(){
  const nick=$('mtNick').value.trim(), [y,m,d]=$('mtBirth').value.split('-').map(Number), mb=$('mtMbti').value, hb=$('mtTime').value;
  if(y<1940||y>2025){toast('1940~2025년 사이로 입력해주세요');return}
  const A=saju, B=calcSaju(y,m,d,hb), me=esc(profile.nick), them=esc(nick);
  // 1 spouse palace
  const sp=BR_REL[brRel(A.pillars.day.b,B.pillars.day.b)];
  // 2 ten gods
  const tgThem=tenGod(A.dayStem,B.dayStem), tgMe=tenGod(B.dayStem,A.dayStem);
  const tgScore=Math.round((TEN_INFO[tgThem].s+TEN_INFO[tgMe].s)/2);
  // 3 cross scan, 4 complement, 5 mbti
  const cs=crossScan(A,B), cp=complement(A,B), mm=mbtiMatch(profile.mbti,mb);
  const total=Math.round(sp.s*0.25+cs.score*0.15+cp.score*0.2+tgScore*0.2+mm.s*0.2);
  const verdict= total>=86?'운명 레벨 케미 💖':total>=77?'설렘 확정 커플 ✨':total>=67?'노력하면 꿀케미 🍯':'롤러코스터 케미 🎢';
  const chA=charmCheck(A), chB=charmCheck(B), mo=coupleMonths(A,B);
  const elRow=(i)=>`<div class="row"><span class="nm">${EL[i].emoji} ${EL[i].ko}</span><div style="flex:1;display:flex;flex-direction:column;gap:4px"><div class="track" style="height:12px;flex:none"><div class="fill" data-w="${Math.min(100,A.counts[i]/4*100)}" style="background:var(--pink)"></div></div><div class="track" style="height:12px;flex:none"><div class="fill" data-w="${Math.min(100,B.counts[i]/4*100)}" style="background:var(--blue)"></div></div></div><span class="ct" style="width:34px">${A.counts[i]}·${B.counts[i]}</span></div>`;
  const fillTxt=(arr,who,to)=>arr.length?`<p><b>${who}</b>님이 ${to}님에게 부족한 <b>${arr.map(i=>EL[i].emoji+EL[i].ko).join(' · ')}</b> 기운을 채워줘요.</p>`:'';
  const cpLines=fillTxt(cp.meFilled,them,me)+fillTxt(cp.themFilled,me,them)||'<p>서로의 부족한 기운을 채우기보단, 각자 비슷한 결로 살아가는 조합이에요.</p>';
  const charmLine=(n,c)=>`<p><b>${n}</b> · ${c.dohwa?'🌸 <b>도화살</b> 있음: 존재만으로 사람을 끄는 매력캐':'🌸 도화살 없음: 은근히 스며드는 매력'}${c.hong?' / 💋 <b>홍염살</b> 있음: 분위기 있는 섹시함':''}</p>`;
  const mLabel=o=>`${o.y!==new Date().getFullYear()?o.y+'년 ':''}${o.m}월 <small class="muted">(${STEMS[o.mp.s]}${BRANCHES[o.mp.b]}월)</small>`;
  const bar=(lab,v,col)=>`<div class="row"><span class="nm" style="width:118px;white-space:nowrap;font-size:14.5px">${lab}</span><div class="track"><div class="fill" data-w="${v}" style="background:${col}"></div></div><span class="ct">${v}</span></div>`;
  const tip= total>=77?'케미 충분! 아래 추천 달에 먼저 연락하면 반응 좋을 확률 높아요 💌':'다름이 매력이 될 수 있어요. 상대 MBTI 화법으로 한 번 말해보기 💬';
  mt.loveData={them:nick,mb,themDay:STEMS[B.dayStem]+BRANCHES[B.pillars.day.b],total,verdict,sp:`${sp.n} — ${sp.d}`,tgThem:`${tgThem}(${TEN_INFO[tgThem].d})`,tgMe:`${tgMe}(${TEN_INFO[tgMe].d})`,cp:cp.score,
    fill:[cp.meFilled.length?`상대가 나의 부족한 ${cp.meFilled.map(i=>EL[i].ko).join('·')} 기운을 채워줌`:'',cp.themFilled.length?`내가 상대의 부족한 ${cp.themFilled.map(i=>EL[i].ko).join('·')} 기운을 채워줌`:''].filter(Boolean).join(', '),
    cross:cs.items.map(it=>it.t).join(', '),charm:`나: 도화살 ${chA.dohwa?'있음':'없음'}${chA.hong?', 홍염살 있음':''} / 상대: 도화살 ${chB.dohwa?'있음':'없음'}${chB.hong?', 홍염살 있음':''}`,
    best:mo.best.map(o=>`${o.y}년 ${o.m}월`).join(', '),worst:`${mo.worst.y}년 ${mo.worst.m}월`,mbtiLines:`${profile.mbti} × ${mb}: `+mbtiLines(profile.mbti,mb).join(' ')};
  mt.last={nick,total,verdict,rel:'썸·연인 PRO',mb,pro:`💘 SOULCODE 연애 궁합 PRO | ${profile.nick} × ${nick}\n${total}점 · ${verdict}\n배우자 자리: ${sp.n} · ${nick}님은 나에게 '${tgThem}'\n추천 달: ${mo.best.map(o=>o.m+'월').join(', ')}\n#소울코드 #연애궁합`};
  $('mtResult').innerHTML=`
    <div class="panel" style="margin-top:4px;padding-top:22px;position:relative">
      <span class="pop-sticker" style="--rot:-10deg;top:-14px;left:-8px;background:var(--pink)">LOVE PRO 💘</span>
      <div class="match-top">
        <div class="avatar"><div class="e">${STEM_INFO[A.dayStem].emoji}</div><b>${me}</b><small>${profile.mbti} · ${STEMS[A.dayStem]}${BRANCHES[A.pillars.day.b]}</small></div>
        <div class="heart holo-text">${total}<small>연애 궁합</small></div>
        <div class="avatar"><div class="e">${STEM_INFO[B.dayStem].emoji}</div><b>${them}</b><small>${mb} · ${STEMS[B.dayStem]}${BRANCHES[B.pillars.day.b]}</small></div>
      </div>
      <div class="verdict h-display">${verdict}</div>
      <div class="bars" style="margin-top:14px">${bar('💍 배우자 자리',sp.s,'var(--pink)')}${bar('💘 서로의 존재',tgScore,'var(--lav)')}${bar('🧩 오행 보완',cp.score,'var(--green)')}${bar('🔗 합·충',cs.score,'var(--orange)')}${bar('🧬 MBTI',mm.s,'var(--blue)')}</div>
    </div>
    <div class="sec-t">💍 배우자 자리(일지) · ${sp.n} ${sp.i}</div>
    <div class="panel line-list"><p>${me}님 <b>${BRANCHES[A.pillars.day.b]}</b> × ${them}님 <b>${BRANCHES[B.pillars.day.b]}</b></p><p>${sp.d}</p></div>
    <div class="sec-t">💘 서로에게 어떤 존재?</div>
    <div class="grid2">
      <div class="mini"><div class="k">${them}님은 나에게</div><div class="v"><span class="tag" style="margin:0 0 6px">${tgThem}</span><br>${TEN_INFO[tgThem].d}</div></div>
      <div class="mini"><div class="k">나는 ${them}님에게</div><div class="v"><span class="tag" style="margin:0 0 6px">${tgMe}</span><br>${TEN_INFO[tgMe].d}</div></div>
    </div>
    <div class="sec-t">🧩 오행 보완도 · ${cp.score}점</div>
    <div class="panel"><div class="muted" style="font-size:12.5px;margin-bottom:4px"><span style="color:var(--pink)">■</span> ${me} &nbsp; <span style="color:var(--blue)">■</span> ${them}</div>
      <div class="bars">${[0,1,2,3,4].map(elRow).join('')}</div><div class="line-list" style="margin-top:10px">${cpLines}</div></div>
    <div class="sec-t">🔗 사주 전체 합·충 스캔</div>
    <div class="panel"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px"><span class="tag">합 ${cs.hap+cs.shap}</span><span class="tag">충 ${cs.chung}</span><span class="tag">원진 ${cs.won}</span></div>
      <div class="line-list">${cs.items.length?cs.items.map(it=>`<p><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:2px solid var(--ink);background:${it.c};margin-right:8px"></span>${it.t}</p>`).join(''):'<p>눈에 띄는 합·충 없이 잔잔한 조합이에요.</p>'}</div>
      <p class="muted" style="font-size:12px;margin-top:8px">일(日) 기둥이 낀 관계일수록 연애에 더 크게 작용해요.</p></div>
    <div class="sec-t">🌸 매력 신살 체크</div>
    <div class="panel line-list">${charmLine(me,chA)}${charmLine(them,chB)}</div>
    <div class="sec-t">📅 둘의 타이밍</div>
    <div class="grid2">
      <div class="mini"><div class="k">💌 고백·데이트 추천 달</div><div class="v">${mo.best.map(mLabel).join('<br>')}</div></div>
      <div class="mini"><div class="k">🙅 큰 결정은 미뤄요</div><div class="v">${mLabel(mo.worst)}<br><small class="muted">다툼 나기 쉬운 달</small></div></div>
    </div>
    <div class="sec-t">🧬 MBTI로 보면 · ${profile.mbti} × ${mb}</div>
    <div class="panel line-list">${mm.best?'<p>✨ <b>찰떡 조합</b>으로 유명한 MBTI 궁합이에요!</p>':''}${mbtiLines(profile.mbti,mb).map(l=>`<p>${l}</p>`).join('')}</div>
    <div class="sec-t">💡 케미 업 팁</div>
    <div class="msg-box" style="margin-top:0"><p class="msg" style="font-size:16px">${tip}</p></div>
    <div class="ai-only"><button class="btn pink ai-btn" id="aiLvBtn" onclick="aiLove()">🤖 AI 연애 상담 리포트 ${isPro()?'':'(PRO)'}</button><div class="ai-box" id="aiLv"></div><p class="ai-quota"></p></div>
    <div class="row-btns"><button class="btn ghost" onclick="mtCopy()">결과 복사</button><button class="btn" onclick="mtReset()">다른 사람과 보기</button></div>
    <p class="disclaimer">${!hb?'상대 태어난 시간 없이 계산했어요 · ':''}KASI 정본 만세력 기준 · 재미로 보는 콘텐츠예요</p>`;
  $('mtForm').style.display='none'; $('mtResult').style.display='block';
  $('s-match').scrollTo({top:0}); refreshQuota();
  setTimeout(()=>document.querySelectorAll('#mtResult .fill').forEach(f=>f.style.width=f.dataset.w+'%'),120);
}

/* ================= PRO & SKINS ================= */
const isPro=()=>!!(store.get('soulcode.pro')||{}).active;
let pwPlan='month';
function openPaywall(reason){$('pwReason').textContent=reason||'더 깊게, 더 자주, 더 예쁘게';$('paywall').classList.add('show')}
function closePaywall(){$('paywall').classList.remove('show')}
function pickPlan(el){pwPlan=el.dataset.p;document.querySelectorAll('.plan').forEach(p=>p.classList.toggle('sel',p===el))}
function activatePro(){
  if(window.soulPay){closePaywall();window.soulPay.start(pwPlan);return}
  if(!(window.soulConfig&&window.soulConfig.devTestPro)){toast('결제 준비 중이에요 🙏');return}
  store.set('soulcode.pro',{active:true,plan:pwPlan,since:todayKey(),test:true});
  closePaywall(); burst($('app'),24); toast('PRO 켜짐! (테스트 모드) 💎'); refreshAfterPro();
}
function deactivatePro(){store.set('soulcode.pro',{active:false});const s=SKINS.find(x=>x.k===(store.get('soulcode.skin')||'holo'));if(s&&s.pro)setSkin('holo');toast('PRO 해지됨 (테스트)');refreshAfterPro()}
function refreshAfterPro(){refreshQuota();const a=document.querySelector('.screen.active');if(!a)return;if(a.id==='s-me')renderMe();if(a.id==='s-report')renderReport()}
const SKINS=[{k:'holo',n:'홀로그램',sym:'☾'},{k:'starry',n:'별밤',sym:'★'},{k:'strawberry',n:'딸기우유',sym:'🍓',pro:true},{k:'chrome',n:'Y2K 크롬',sym:'✦',pro:true},{k:'matcha',n:'말차라떼',sym:'🍵',pro:true}];
function applySkin(k){const app=$('app');if(!k||k==='holo')delete app.dataset.skin;else app.dataset.skin=k}
function setSkin(k){store.set('soulcode.skin',k);applySkin(k)}
function renderSkins(){
  const cur=store.get('soulcode.skin')||'holo', pro=isPro();
  $('skins').innerHTML=SKINS.map(s=>`<button class="${s.k===cur?'sel':''}" data-k="${s.k}"><span class="sw" data-skin-prev="${s.k}">${s.sym}</span>${s.n}${s.pro&&!pro&&!unlocks().includes(s.k)?'<span class="lk">PRO</span>':''}</button>`).join('');
  $('skins').querySelectorAll('button').forEach(b=>{
    const s=SKINS.find(x=>x.k===b.dataset.k), sw=b.querySelector('.sw');
    const tmp=document.createElement('div'); if(s.k!=='holo')tmp.dataset.skin=s.k; tmp.className='app'; tmp.style.display='none'; document.body.appendChild(tmp);
    sw.style.background=getComputedStyle(tmp).getPropertyValue('--card-back'); tmp.remove();
    b.onclick=()=>{ if(s.pro&&!isPro()&&!unlocks().includes(s.k)){openSkinOffer(s);return} setSkin(s.k); renderSkins(); toast(`${s.n} 덱으로 바꿨어요 🎴`) };
  });
}
function renderProBanner(){
  const P=store.get('soulcode.pro')||{}, dev=!!(window.soulConfig&&window.soulConfig.devTestPro);
  $('proBanner').innerHTML=isPro()
    ?(P.until&&!P.test?`<div class="t">💎 PRO 이용 중<small>${P.until.slice(0,10).replace(/-/g,'.')}까지 · AI 무제한 · 연간 상세 · 스킨 3종</small></div><button class="btn ghost" onclick="openPaywall('이용 기간 연장하기')">연장</button>`
      :`<div class="t">💎 PRO 이용 중 <span class="test-badge">테스트</span><small>AI 해석 무제한 · 연간 상세 · 스킨 3종</small></div>${dev?'<button class="btn ghost" onclick="deactivatePro()">해지</button>':''}`)
    :`<div class="t">💎 소울코드 PRO<small>AI 무제한 · 연간 12개월 상세 · 덱 스킨</small></div><button class="btn" onclick="openPaywall()">구경하기</button>`;
}

/* ================= AI (sample) ================= */
let AI=null;
async function initAI(){try{if(!window.claude||!claude.use)return;AI=await claude.use('sample');if(AI){$('app').classList.add('ai-on');refreshQuota()}}catch(e){AI=null}}
const aiUsed=()=>store.get('soulcode.ai.'+todayKey())||0;
const freeLimit=()=>{const n=store.get('soulcode.freeLimit');return typeof n==='number'?n:3};
const aiLeft=()=>isPro()?Infinity:Math.max(0,freeLimit()-aiUsed());
function quotaText(){return isPro()?TL('💎 PRO · AI 해석 무제한','💎 PRO · unlimited AI readings','💎 PRO · AI解説無制限'):TL(`오늘 무료 AI 해석 ${aiLeft()}/${freeLimit()}회 남음`,`Free AI readings left today: ${aiLeft()}/${freeLimit()}`,`今日の無料AI解説 残り${aiLeft()}/${freeLimit()}回`)}
function refreshQuota(){document.querySelectorAll('.ai-quota').forEach(e=>e.textContent=quotaText())}
const AI_RULES=`너는 젠지를 위한 '사주 × MBTI × 타로' 앱 「소울코드」의 해석가야.
- 말투: 친근한 존댓말 + 위트. 짧은 문장. 이모지는 전체에서 2~4개만.
- 아래 [데이터]에 있는 것만 근거로 써. 데이터에 없는 사실(직업, 연애 상태, 사는 곳 등)은 지어내지 마.
- 사주 용어를 쓰면 괄호로 쉽게 풀어줘. 예: 정재(안정적인 실속 기운)
- 단정적인 예언, 불안 조장, 의료·투자·법률 조언은 하지 마. 재미로 보는 콘텐츠 톤을 지켜.
- 마크다운 기호(#, *, -)는 쓰지 말고 아래 [형식] 그대로 써.`;
function AI_LANG(){
  if(LG==='en') return `\n\n[LANGUAGE] Write the whole answer in natural, casual English for Gen Z readers (friendly, witty, short sentences). Translate every section heading in [형식] into English too. Explain saju terms in plain English, e.g. "Direct Wealth (steady, practical money energy)". Do not use any Korean.`;
  if(LG==='ja') return `\n\n[言語] 回答はすべて自然な日本語で書いて。Z世代向けの親しみやすい「です・ます」+ちょっとユーモアのある口調、短い文で。[형식]の見出しもすべて日本語にして。四柱推命の用語はかっこで分かりやすく説明して(例: 正財(安定した実りの気))。韓国語は使わないで。`;
  return '';
}
function personaData(){
  const S=saju, el=EL[STEM_EL[S.dayStem]], mx=Math.max(...S.counts), mn=Math.min(...S.counts);
  const P=['year','month','day','hour'].map(k=>S.pillars[k]?STEMS[S.pillars[k].s]+BRANCHES[S.pillars[k].b]:'모름');
  return `- 닉네임: ${profile.nick}
- MBTI: ${profile.mbti} (${MBTI[profile.mbti].nick})
- 일간(타고난 나): ${STEMS[S.dayStem]}${STEMS_KO[S.dayStem]} · ${el.ko}(${el.name}) 기운 · "${STEM_INFO[S.dayStem].img}"
- 사주 원국(년·월·일·시): ${P.join(' ')}
- 오행 분포: ${EL.map((e,i)=>e.ko+S.counts[i]).join(' ')} → 강한 기운 ${EL[S.counts.indexOf(mx)].ko}, 약한 기운 ${EL[S.counts.indexOf(mn)].ko}`;
}
const toneLine=t=>t==='T'?'해석 톤: T형 — 팩트와 논리 위주, 담백하고 실용적으로.':'해석 톤: F형 — 공감과 위로 위주, 따뜻하게.';
function aiErr(code){return({ai_paused:'🛠️ AI 해석이 잠깐 쉬는 중이에요. 오늘 운세와 카드 풀이는 그대로 볼 수 있어요!',rate_limited:'⏳ 요청이 몰렸어요. 잠시 후 다시 눌러주세요.',not_granted:'🙅 이번 접속에서는 AI 사용이 허용되지 않았어요.',sampling_disabled:'🙅 이 계정에서는 AI를 쓸 수 없어요.',refused:'🫥 이 내용은 해석하기 어려워요. 질문을 바꿔볼까요?',session_expired:'🔑 다시 로그인이 필요해요.',cancelled:'멈췄어요.'})[code]||'📡 연결이 끊겼어요. 다시 눌러주세요.'}
function aiBadge(box){const b=document.createElement('span');b.className='ai-badge';b.textContent='🤖 AI 해석';box.appendChild(b)}
async function runAI(prompt,box,btn,opts={}){
  if(!AI){toast('AI를 쓸 수 없는 환경이에요');return null}
  const retry=()=>runAI(prompt,box,btn,{...opts,ticket:true});
  if(opts.pro&&!isPro()&&!opts.ticket){openOffer(opts.proReason||'PRO 전용 AI 기능이에요',retry);return null}
  if(!opts.ticket&&aiLeft()<=0){openOffer(`오늘 무료 AI 해석 ${freeLimit()}회를 다 썼어요`,retry);return null}
  btn.disabled=true; box.className='ai-box show thinking'; box.textContent='🔮 사주랑 카드를 엮어서 쓰는 중... (보통 10~40초)';
  try{
    const {text,truncated}=await AI(AI_RULES+'\n\n'+prompt+AI_LANG(),{cache:false,ticket:!!(opts.ticket&&!isPro()),onText:({text})=>{box.className='ai-box show';box.textContent=text;aiBadge(box)}});
    box.className='ai-box show'; box.textContent=text+(truncated?'\n\n(내용이 길어서 일부가 잘렸어요)':''); aiBadge(box);
    if(opts.ticket&&!isPro()) store.set('soulcode.tickets',Math.max(0,tickets()-1)); else if(!isPro()) store.set('soulcode.ai.'+todayKey(),aiUsed()+1);
    return text;
  }catch(e){
    if(e.code==='auth_required'){box.className='ai-box';box.textContent='';toast('로그인하면 AI 해석을 쓸 수 있어요 🔐');go('s-me');return null}
    if(e.code==='quota_exceeded'){box.className='ai-box';box.textContent='';openOffer(`오늘 무료 AI 해석 ${freeLimit()}회를 다 썼어요`,retry);return null}
    if(e.code==='free_sold_out'){box.className='ai-box';box.textContent='';openOffer('오늘 무료 AI 해석이 인기 폭발로 마감됐어요 🔥',retry);return null}
    if(e.code==='no_ticket'){box.className='ai-box';box.textContent='';store.set('soulcode.tickets',0);openOffer('티켓이 다 떨어졌어요',retry);return null}
    box.className='ai-box show'; box.textContent=(e.text?e.text+'\n\n':'')+aiErr(e.code);
    return null;
  }finally{btn.disabled=false;refreshQuota()}
}
async function aiDaily(){
  const c=TAROT[draw.card], t=todayInfo();
  const prompt=`[데이터]
${personaData()}
- 오늘 일진: ${STEMS[t.p.s]}${BRANCHES[t.p.b]}일 (${EL[t.tEl].ko} 기운) → 나와의 관계: ${t.rel.name} — ${t.rel.desc}
- 오늘 뽑은 타로: ${c[0]}(${c[1]}) ${draw.rev?'역방향':'정방향'} / 키워드: ${draw.rev?c[4]:c[3]}
- 오늘 운세 지수: ${draw.lucky?draw.lucky.total:''}점
- ${toneLine(tone)}

[형식]
첫 줄: 오늘을 요약하는 20자 이내 헤드라인
(빈 줄)
본문 3~4문장: 타로 카드 의미 + 오늘 일진과 나의 관계 + MBTI 성향을 자연스럽게 엮어서
(빈 줄)
👉 오늘 해볼 것: 한 줄
🙅 오늘 피할 것: 한 줄`;
  const text=await runAI(prompt,$('aiDaily'),$('aiDailyBtn'));
  if(text){draw.ai=text;store.set('soulcode.draw.'+todayKey(),draw);$('aiDailyBtn').textContent='🔁 AI 해석 다시 받기'}
}
function showSavedDailyAI(){
  const box=$('aiDaily'), btn=$('aiDailyBtn');
  if(draw&&draw.ai){box.className='ai-box show';box.textContent=draw.ai;aiBadge(box);btn.textContent='🔁 AI 해석 다시 받기'}
  else{box.className='ai-box';box.textContent='';btn.textContent='🤖 AI 맞춤 해석 받기'}
  refreshQuota();
}
async function aiSpread(){
  const cat=SP_CATS.find(c=>c.k===sp.cat);
  const cards=sp.picks.map((p,i)=>{const c=TAROT[p.card];return `  ${SP_POS[i].k}: ${c[0]}(${c[1]}) ${p.rev?'역방향':'정방향'} / 키워드 ${p.rev?c[4]:c[3]}`}).join('\n');
  const prompt=`[데이터]
${personaData()}
- 고민 분야: ${cat.n}
- 고민 내용: ${sp.q||'(적지 않음)'}
- 3장 스프레드(과거·현재·미래):
${cards}
- 앱의 종합 판정: ${sp.last.verdict}
- ${toneLine(profile.mbti[2])}

[형식]
첫 줄: 이 고민에 대한 20자 이내 헤드라인
(빈 줄)
과거: 1~2문장
현재: 1~2문장
미래: 1~2문장
(빈 줄)
종합: 2~3문장. 고민 내용에 직접 답하되, 결정은 본인이 하도록 열어두기
👉 이번 주 액션: 한 줄`;
  await runAI(prompt,$('aiSp'),$('aiSpBtn'));
}
async function aiLove(){
  const L=mt.loveData; if(!L) return;
  const prompt=`[데이터]
${personaData()}
- 상대: ${L.them} / MBTI ${L.mb} / 일주 ${L.themDay}
- 연애 궁합 점수: ${L.total}점 · ${L.verdict}
- 배우자 자리(일지) 관계: ${L.sp}
- 상대는 나에게: ${L.tgThem} / 나는 상대에게: ${L.tgMe}
- 오행 보완도: ${L.cp}점 ${L.fill}
- 사주 합·충: ${L.cross||'특이점 없음'}
- 매력 신살: ${L.charm}
- 추천 달: ${L.best} / 조심할 달: ${L.worst}
- MBTI: ${L.mbtiLines}
- ${toneLine(profile.mbti[2])}

[형식]
첫 줄: 두 사람 케미를 요약하는 20자 이내 헤드라인
(빈 줄)
케미 분석 3~4문장: 데이터의 사주 관계와 MBTI를 엮어서
(빈 줄)
💬 연락·대화 팁: 1~2문장 (상대 MBTI에 맞춘 화법)
⚠️ 조심할 포인트: 1문장
📅 타이밍: 1문장 (추천 달 활용)`;
  await runAI(prompt,$('aiLv'),$('aiLvBtn'),{pro:true,proReason:'연애 궁합 AI 상담은 PRO 전용이에요'});
}

/* ================= FORTUNE REPORT ================= */
const TG_GROUP={비견:'비겁',겁재:'비겁',식신:'식상',상관:'식상',편재:'재성',정재:'재성',편관:'관성',정관:'관성',편인:'인성',정인:'인성'};
const GROUP_BASE={비겁:68,식상:78,재성:80,관성:66,인성:76};
const BR_BONUS={yukhap:12,samhap:8,same:3,none:0,hae:-6,wonjin:-9,chung:-12};
const TG_THEME={
  비겁:{name:'내 편 & 경쟁',emoji:'🤝',d:'친구·동료와의 연결이 강해져요. 같이 하면 시너지, 대신 비교와 경쟁심은 살짝 내려놓기!',love:'친구 같은 편안한 인연이 들어와요. 지인 소개팅 각',work:'팀플·협업에서 존재감 UP',money:'돈이 새기 쉬워요. 더치페이 필수 💸',body:'에너지 넘침. 운동 시작하기 좋아요'},
  식상:{name:'표현 & 창작',emoji:'🎤',d:'말하고 만들고 보여주기 좋은 흐름. 내 매력이 밖으로 흘러넘쳐요.',love:'매력 발산 시즌! 먼저 다가가면 반응 좋아요',work:'아이디어·발표·콘텐츠에 강해요',money:'재능이 돈이 되는 흐름. 부업 아이디어 메모',body:'말이 많아지는 만큼 목 관리 🗣️'},
  재성:{name:'성과 & 실속',emoji:'💸',d:'노력한 만큼 결과가 손에 잡혀요. 현실 감각이 빛나는 시기.',love:'설레는 만남과 데이트 이벤트가 많아요',work:'결과물·성적이 눈에 보여요',money:'돈 흐름 활발! 들어오는 만큼 나가니 기록 필수',body:'바빠서 끼니 거르기 주의'},
  관성:{name:'책임 & 인정',emoji:'🎖️',d:'해야 할 일이 늘지만, 해내면 확실히 인정받아요.',love:'진지한 관계로 발전하기 좋아요. 대신 밀당 피로 주의',work:'합격·평가·승진운. 마감만 지키면 OK',money:'안정적이지만 큰 지출은 보류',body:'스트레스성 피로 조심, 수면 챙기기'},
  인성:{name:'배움 & 충전',emoji:'🔋',d:'공부·휴식·조언이 잘 들어오는 시기. 속도보다 깊이가 이겨요.',love:'나를 이해해주는 사람에게 마음이 가요',work:'자격증·공부·기획에 최적',money:'쓰기보다 모으기 쉬운 시기',body:'회복력 최고. 푹 쉬면 다 풀려요'},
};
const TTI_YEAR={yukhap:'올해 기운과 내 띠가 손잡는 해! 귀인과 기회가 잘 들어와요.',samhap:'같은 팀 기운이에요. 모임·협업에서 운이 트여요.',same:'내 띠의 해예요. 존재감은 커지지만 무리하면 쉽게 지쳐요.',none:'무난한 흐름. 내 페이스대로 가면 OK.',hae:'자잘한 오해가 생기기 쉬워요. 말 한마디 더 신경 쓰기.',wonjin:'괜히 서운한 일이 생기기 쉬워요. 마음 정리 루틴 추천.',chung:'변화와 이동이 많은 해. 이사·전학·이직 같은 큰 변화가 들어오기 쉬워요.'};
const clampS=v=>Math.max(35,Math.min(98,Math.round(v)));
function luckOf(p){
  const tg=tenGod(saju.dayStem,p.s), g=TG_GROUP[tg], rel=brRel(saju.pillars.day.b,p.b);
  const base=GROUP_BASE[g]+BR_BONUS[rel];
  const dohwa=DOHWA[saju.pillars.day.b%4]===p.b||DOHWA[saju.pillars.year.b%4]===p.b;
  return {tg,g,rel,dohwa,score:clampS(base),cat:{
    love:clampS(base+({식상:8,재성:8,관성:4}[g]||0)+BR_BONUS[rel]*0.3+(dohwa?10:0)),
    work:clampS(base+({관성:12,식상:6,인성:4}[g]||0)),
    money:clampS(base+({재성:12,비겁:-8,식상:4}[g]||0)),
    body:clampS(base+({인성:8,비겁:6,관성:-8}[g]||0)+(rel==='chung'?-6:0))}};
}
const monthPillar=(y,m)=>calcSaju(y,m,15,'').pillars.month;
const yearPillar=y=>calcSaju(y,7,1,'').pillars.year;
const reportYear=()=>{const n=new Date();return n.getMonth()>=9?n.getFullYear()+1:n.getFullYear()};
const rp={mode:'month',off:0};
function openReport(mode){rp.mode=mode;rp.off=0;go('s-report')}
const catBars=c=>`<div class="bars">${[['💘 연애',c.love,'var(--pink)'],['💼 일·공부',c.work,'var(--lav)'],['💸 금전',c.money,'var(--green)'],['🔋 컨디션',c.body,'var(--blue)']].map(([l,v,col])=>`<div class="row"><span class="nm" style="width:88px">${l}</span><div class="track"><div class="fill" data-w="${v}" style="background:${col}"></div></div><span class="ct">${v}</span></div>`).join('')}</div>`;
const themeGrid=th=>`<div class="grid2"><div class="mini"><div class="k">💘 연애</div><div class="v">${th.love}</div></div><div class="mini"><div class="k">💼 일·공부</div><div class="v">${th.work}</div></div><div class="mini"><div class="k">💸 금전</div><div class="v">${th.money}</div></div><div class="mini"><div class="k">🔋 컨디션</div><div class="v">${th.body}</div></div></div>`;
function renderReport(){
  if(!profile) return; getSaju();
  const n=new Date(), Y=reportYear();
  const m1=new Date(n.getFullYear(),n.getMonth(),1), m2=new Date(n.getFullYear(),n.getMonth()+1,1);
  const segs=[['month',0,`📅 ${m1.getMonth()+1}월`],['month',1,`📅 ${m2.getMonth()+1}월`],['year',0,`🔮 ${Y}년`]];
  $('rpSeg').innerHTML=segs.map(([m,o,l])=>`<button class="chip ${rp.mode===m&&rp.off===o?'sel':''}" data-m="${m}" data-o="${o}">${l}</button>`).join('');
  $('rpSeg').querySelectorAll('.chip').forEach(b=>b.onclick=()=>{rp.mode=b.dataset.m;rp.off=+b.dataset.o;renderReport();$('s-report').scrollTo({top:0})});
  if(rp.mode==='month') renderMonthReport(rp.off?m2:m1); else renderYearReport(Y);
  setTimeout(()=>document.querySelectorAll('#rpBody .fill').forEach(f=>f.style.width=f.dataset.w+'%'),100);
  setTimeout(()=>document.querySelectorAll('#rpBody .ychart i').forEach(i=>i.style.height=i.dataset.h+'%'),100);
  refreshQuota();
}
function renderMonthReport(md){
  const y=md.getFullYear(), m=md.getMonth()+1, mp=monthPillar(y,m), L=luckOf(mp), th=TG_THEME[L.g];
  $('rpTitle').textContent=`${m}월 운세 리포트`;
  $('rpSub').textContent=`${STEMS[mp.s]}${BRANCHES[mp.b]}월 · ${esc(profile.nick)}님의 ${STEMS[saju.dayStem]}${EL[STEM_EL[saju.dayStem]].ko} 기준`;
  const days=new Date(y,m,0).getDate(), first=new Date(y,m-1,1).getDay(), now=new Date();
  const list=[]; for(let d=1;d<=days;d++){const p=dayPillar(y,m,d);list.push({d,p,L:luckOf(p)})}
  const good=[...list].sort((a,b)=>b.L.score-a.L.score).slice(0,3), bad=[...list].sort((a,b)=>a.L.score-b.L.score).slice(0,2);
  const goodSet=new Set(good.map(x=>x.d)), badSet=new Set(bad.map(x=>x.d));
  const cells=Array(first).fill('<div class="blank"></div>').concat(list.map(x=>{
    const cls=goodSet.has(x.d)?'good':badSet.has(x.d)?'bad':'', isT=(now.getFullYear()===y&&now.getMonth()+1===m&&now.getDate()===x.d);
    return `<button class="${cls} ${isT?'today':''}" data-d="${x.d}">${x.d}<small>${goodSet.has(x.d)?'🍀':badSet.has(x.d)?'⚡':x.L.dohwa?'🌸':''}</small></button>`}));
  const dl=x=>`${m}/${x.d} <small class="muted">(${STEMS[x.p.s]}${BRANCHES[x.p.b]}일 · ${x.L.tg})</small>`;
  $('rpBody').innerHTML=`
    <div class="soul-hero"><div class="soul-hero-in" style="padding:22px 18px">
      <div class="soul-emoji" style="width:96px;height:96px;font-size:48px">${th.emoji}</div>
      <div class="soul-title h-display" style="font-size:26px">${th.name}의 달</div>
      <div class="soul-sub">이달의 기운: ${L.tg} · ${BR_REL[L.rel].n} ${BR_REL[L.rel].i}</div>
      <p style="position:relative;margin-top:14px;font-size:14.5px;line-height:1.7">${th.d}</p>
    </div></div>
    <div class="sec-t">📊 분야별 지수 · 종합 ${L.score}점</div>
    <div class="panel">${catBars(L.cat)}</div>
    <div class="sec-t">🗓️ 날짜별 기운 <span class="muted" style="font-size:13px">(🍀 럭키 · ⚡ 조심 · 🌸 매력 UP)</span></div>
    <div class="panel"><div class="cal">${['일','월','화','수','목','금','토'].map(w=>`<div class="h">${w}</div>`).join('')}${cells.join('')}</div></div>
    <div class="grid2" style="margin-top:12px"><div class="mini"><div class="k">🍀 럭키 데이</div><div class="v">${good.map(dl).join('<br>')}</div></div><div class="mini"><div class="k">⚡ 조심 데이</div><div class="v">${bad.map(dl).join('<br>')}</div></div></div>
    <div class="sec-t">💡 이번 달 분야별 한 줄</div>${themeGrid(th)}
    <div class="ai-only"><button class="btn pink ai-btn" id="aiRpBtn" onclick="aiReport()">🤖 AI로 이번 달 풀어쓰기</button><div class="ai-box" id="aiRp"></div><p class="ai-quota"></p></div>
    <p class="disclaimer">KASI 정본 만세력 기준 월운·일진 · 재미로 보는 콘텐츠예요</p>`;
  $('rpBody').querySelectorAll('.cal button').forEach(b=>b.onclick=()=>{const x=list[+b.dataset.d-1];toast(`${m}/${x.d} ${STEMS[x.p.s]}${BRANCHES[x.p.b]}일 · ${x.L.tg} · ${x.L.score}점${goodSet.has(x.d)?' 🍀':badSet.has(x.d)?' ⚡':''}`)});
  rp.data={kind:'month',label:`${y}년 ${m}월`,pillar:`${STEMS[mp.s]}${BRANCHES[mp.b]}월`,L,th,good:good.map(x=>`${m}/${x.d}`),bad:bad.map(x=>`${m}/${x.d}`)};
}
function renderYearReport(Y){
  const yp=yearPillar(Y), LY=luckOf(yp), th=TG_THEME[LY.g], ttiRel=BR_REL[brRel(saju.yearBranch,yp.b)];
  $('rpTitle').textContent=`${Y}년 연간 운세`;
  $('rpSub').textContent=`${STEMS[yp.s]}${BRANCHES[yp.b]}년 · ${esc(profile.nick)}님의 ${STEMS[saju.dayStem]}${EL[STEM_EL[saju.dayStem]].ko} 기준`;
  const months=[]; for(let m=1;m<=12;m++){const p=monthPillar(Y,m);months.push({m,p,L:luckOf(p)})}
  const srt=[...months].sort((a,b)=>b.L.score-a.L.score), hi=new Set(srt.slice(0,3).map(x=>x.m)), lo=new Set(srt.slice(-2).map(x=>x.m));
  const bestBy=k=>[...months].sort((a,b)=>b.L.cat[k]-a.L.cat[k])[0].m;
  const pro=isPro();
  const detail=months.map(x=>{const t=TG_THEME[x.L.g];const top=Object.entries(x.L.cat).sort((a,b)=>b[1]-a[1])[0][0];
    return `<div class="mrow"><b>${x.m}월</b><div><span class="muted" style="font-size:12.5px">${STEMS[x.p.s]}${BRANCHES[x.p.b]}월 · ${x.L.tg} · ${x.L.score}점</span><br>${t.emoji} ${t.name} — ${t[top]}</div></div>`}).join('');
  $('rpBody').innerHTML=`
    <div class="soul-hero"><div class="soul-hero-in" style="padding:22px 18px">
      <div class="soul-emoji" style="width:96px;height:96px;font-size:48px">${th.emoji}</div>
      <div class="soul-title h-display" style="font-size:26px">${th.name}의 해</div>
      <div class="soul-sub">${Y}년의 기운: ${LY.tg} · 일지와 ${BR_REL[LY.rel].n}</div>
      <p style="position:relative;margin-top:14px;font-size:14.5px;line-height:1.7">${th.d}</p>
    </div></div>
    <div class="sec-t">🐾 띠로 보면 · ${ANIMALS[saju.yearBranch]}띠 × ${BRANCHES[yp.b]}(${ANIMALS[yp.b]})년</div>
    <div class="panel line-list"><p>${ttiRel.i} <b>${ttiRel.n}</b> · ${TTI_YEAR[brRel(saju.yearBranch,yp.b)]}</p></div>
    <div class="sec-t">📈 12개월 흐름</div>
    <div class="panel"><div class="ychart">${months.map(x=>`<div><i class="${hi.has(x.m)?'hi':lo.has(x.m)?'lo':''}" data-h="${Math.round((x.L.score-30)/70*100)}"></i><span>${x.m}</span></div>`).join('')}</div>
      <p class="muted" style="font-size:12.5px;margin-top:8px"><span style="color:var(--wood)">■</span> 최고의 달 &nbsp; <span style="color:var(--fire)">■</span> 조심할 달</p></div>
    <div class="grid2" style="margin-top:12px">
      <div class="mini"><div class="k">🚀 최고의 달</div><div class="v">${srt.slice(0,3).map(x=>x.m+'월').join(' · ')}</div></div>
      <div class="mini"><div class="k">🫧 쉬어갈 달</div><div class="v">${srt.slice(-2).map(x=>x.m+'월').join(' · ')}</div></div>
      <div class="mini"><div class="k">💘 연애운 피크</div><div class="v">${bestBy('love')}월</div></div>
      <div class="mini"><div class="k">💸 금전운 피크</div><div class="v">${bestBy('money')}월</div></div>
    </div>
    <div class="sec-t">🗓️ 12개월 상세 리포트</div>
    <div class="panel lock-card">${pro?'':`<div class="lock-veil">🔒 12개월 상세는 PRO에서 열려요<button class="btn" onclick="openPaywall('연간 12개월 상세 리포트는 PRO 전용이에요')">PRO 구경하기</button></div>`}${detail}</div>
    <div class="ai-only"><button class="btn pink ai-btn" id="aiRpBtn" onclick="aiReport()">🤖 AI로 ${Y}년 풀어쓰기 ${pro?'':'(PRO)'}</button><div class="ai-box" id="aiRp"></div><p class="ai-quota"></p></div>
    <p class="disclaimer">KASI 정본 만세력 기준 세운·월운 · 재미로 보는 콘텐츠예요</p>`;
  rp.data={kind:'year',label:`${Y}년`,pillar:`${STEMS[yp.s]}${BRANCHES[yp.b]}년`,L:LY,th,months:months.map(x=>`${x.m}월 ${STEMS[x.p.s]}${BRANCHES[x.p.b]} ${x.L.tg} ${x.L.score}점`).join(', '),best:srt.slice(0,3).map(x=>x.m+'월').join(', '),worst:srt.slice(-2).map(x=>x.m+'월').join(', '),love:bestBy('love'),money:bestBy('money'),tti:`${ANIMALS[saju.yearBranch]}띠 × ${ANIMALS[yp.b]}해: ${ttiRel.n}`};
}
async function aiReport(){
  const D=rp.data;
  const common=`[데이터]
${personaData()}
- 대상 기간: ${D.label} (${D.pillar})
- 기간의 기운(나 기준 십신): ${D.L.tg} → 테마 "${D.th.name}" / 지지 관계: ${BR_REL[D.L.rel].n}
- 분야 지수: 연애 ${D.L.cat.love}, 일·공부 ${D.L.cat.work}, 금전 ${D.L.cat.money}, 컨디션 ${D.L.cat.body}
- ${toneLine(profile.mbti[2])}`;
  const prompt=D.kind==='month'?`${common}
- 럭키 데이: ${D.good.join(', ')} / 조심 데이: ${D.bad.join(', ')}

[형식]
첫 줄: 이번 달을 요약하는 20자 이내 헤드라인
(빈 줄)
이번 달 흐름 3문장
(빈 줄)
💘 연애: 1문장
💼 일·공부: 1문장
💸 금전: 1문장
🔋 컨디션: 1문장
(빈 줄)
🍀 럭키 데이 활용법: 1문장`:`${common}
- 띠: ${D.tti}
- 월별 흐름: ${D.months}
- 최고의 달: ${D.best} / 쉬어갈 달: ${D.worst} / 연애운 피크 ${D.love}월 / 금전운 피크 ${D.money}월

[형식]
첫 줄: 이 해를 요약하는 20자 이내 헤드라인
(빈 줄)
한 해 흐름 3~4문장
(빈 줄)
🌱 상반기(1~6월): 2문장
🍂 하반기(7~12월): 2문장
(빈 줄)
✅ 올해의 다짐 추천: 한 줄`;
  await runAI(prompt,$('aiRp'),$('aiRpBtn'),D.kind==='year'?{pro:true,proReason:'연간 리포트 AI 풀이는 PRO 전용이에요'}:{});
}

/* ================= CLOUD SYNC (claude.ai 계정) ================= */
const cloud={ref:null,status:'init',last:null,chain:Promise.resolve(),t:0,applying:false};
{const _set=store.set,_del=store.del;
 store.set=(k,v)=>{_set(k,v);if(k!=='soulcode.updatedAt'&&String(k).startsWith('soulcode.'))markDirty()};
 store.del=k=>{_del(k);if(String(k).startsWith('soulcode.'))markDirty()};}
function markDirty(){
  if(cloud.applying) return;
  try{localStorage.setItem('soulcode.updatedAt',JSON.stringify(Date.now()))}catch(e){}
  if(cloud.status!=='on') return;
  clearTimeout(cloud.t); cloud.t=setTimeout(pushCloud,1500);
}
function localSnapshot(){
  const draws={};
  try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('soulcode.draw.'))draws[k.slice(14)]=store.get(k)}}catch(e){}
  const keep=Object.keys(draws).sort().slice(-40), d2={}; keep.forEach(k=>d2[k]=draws[k]);
  return {v:1,profile:store.get('soulcode.profile')||null,visits:getVisits(),collect:getCollect(),draws:d2,pro:store.get('soulcode.pro')||null,skin:store.get('soulcode.skin')||'holo',events:store.get('soulcode.events')||{},maps:store.get('soulcode.maps')||[],unlocks:store.get('soulcode.unlocks')||[],updatedAt:store.get('soulcode.updatedAt')||Date.now()};
}
function mergeCloud(c){
  cloud.applying=true;
  try{
    const newer=(c.updatedAt||0)>(store.get('soulcode.updatedAt')||0);
    if(c.profile&&(!store.get('soulcode.profile')||newer)) store.set('soulcode.profile',c.profile);
    if(!c.profile&&newer) store.del('soulcode.profile');
    const v=[...new Set([...(getVisits()||[]),...(c.visits||[])])].sort().slice(-90); mem.visits=v; store.set('soulcode.visits',v);
    const col={...getCollect()}; Object.entries(c.collect||{}).forEach(([k,n])=>col[k]=Math.max(col[k]||0,n)); mem.collect=col; store.set('soulcode.collect',col);
    Object.entries(c.draws||{}).forEach(([d,dr])=>{if(!dr)return;const l=store.get('soulcode.draw.'+d);if(!l){store.set('soulcode.draw.'+d,dr);return}const m={...l};let ch=false;if(!l.ai&&dr.ai){m.ai=dr.ai;ch=true}if(l.fit==null&&dr.fit!=null){m.fit=dr.fit;ch=true}if(ch)store.set('soulcode.draw.'+d,m)});
    if(c.events){const e={...(store.get('soulcode.events')||{}),...c.events};store.set('soulcode.events',e)}
    if(c.maps&&c.maps.length){const cur=store.get('soulcode.maps')||[];const have=new Set(cur.map(m=>m.code));store.set('soulcode.maps',[...cur,...c.maps.filter(m=>m&&!have.has(m.code))])}
    if(c.unlocks){store.set('soulcode.unlocks',[...new Set([...(store.get('soulcode.unlocks')||[]),...c.unlocks])])}
    if(c.pro&&!(window.soulConfig&&window.soulConfig.serverPro)&&(newer||(c.pro.active&&!isPro()))) store.set('soulcode.pro',c.pro);
    if(c.skin&&newer) store.set('soulcode.skin',c.skin);
    if(newer) try{localStorage.setItem('soulcode.updatedAt',JSON.stringify(c.updatedAt))}catch(e){}
  }finally{cloud.applying=false}
}
function pushCloud(){
  if(!cloud.ref) return cloud.chain;
  cloud.chain=cloud.chain.then(async()=>{
    try{await cloud.ref.set(localSnapshot());cloud.last=new Date();if(cloud.status!=='on'){cloud.status='on'}}
    catch(e){if(e&&e.code==='invalid_argument')cloud.status='readonly';else if(e&&e.code==='revoked')cloud.status='off'}
    renderSync();
  });
  return cloud.chain;
}
async function initCloud(){
  if(!window.claude||!claude.use){cloud.status='off';renderSync();return}
  try{
    const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);
    if(!db||!user){cloud.status='off';renderSync();return}
    const uid=await user.id(); if(!uid){cloud.status='off';renderSync();return}
    cloud.ref=db.doc(`data/users/${uid}/state`);
    const timer=setTimeout(()=>{if(cloud.status==='init'){cloud.status='slow';renderSync()}},10000);
    const snap=await cloud.ref.get(); clearTimeout(timer);
    const had=!!profile;
    if(snap.exists) mergeCloud(snap.data());
    cloud.status='on'; await pushCloud();
    profile=store.get('soulcode.profile'); applySkin(store.get('soulcode.skin'));
    const act=document.querySelector('.screen.active');
    if(snap.exists&&profile&&MBTI[profile.mbti]){
      if(!had||['s-splash','s-onb'].includes(act&&act.id)){logVisit();go('s-tarot');toast('☁️ 다른 기기 기록을 불러왔어요')}
      else if(act&&['s-tarot','s-me','s-soul'].includes(act.id)) go(act.id);
    }
  }catch(e){cloud.status='off'}
  renderSync();
}
const LOGIN_BTN={kakao:['kakao','카카오로 시작하기'],apple:['apple',' Apple로 계속하기'],google:['google','Google로 계속하기']};
function loginButtons(){
  const list=(window.soulConfig&&window.soulConfig.providers)||['kakao'];
  return list.filter(p=>LOGIN_BTN[p]).map(p=>`<button class="login ${LOGIN_BTN[p][0]}" onclick="loginWith('${p}')">${LOGIN_BTN[p][1]}</button>`).join('')+((window.soulConfig&&window.soulConfig.emailLogin)?`<button class="login email" onclick="loginWith('email')">✉️ 이메일로 로그인 링크 받기</button>`:'');
}
function ageOf(birth){if(!birth)return null;const b=new Date(birth+'T00:00:00'),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate()))a--;return a}
function loginWith(p){
  const a=profile?ageOf(profile.birth):null;
  if(a!==null&&a<14){toast('만 14세 이상부터 로그인할 수 있어요 🙏');return}
  if(p==='email')soulAuth.emailPrompt();else soulAuth.signIn(p);
}
async function deleteAccount(){
  if(!window.soulAuth)return;
  if(!confirm('정말 탈퇴할까요?\n\n계정과 동기화된 기록(출석·도감·카드 기록)이 바로 삭제되고, 남은 PRO 이용권도 사라져요. 되돌릴 수 없어요.\n(결제 기록만 법에 따라 5년간 보관돼요)'))return;
  toast('탈퇴 처리 중...');
  const ok=await soulAuth.deleteAccount();
  if(ok){alert('탈퇴가 완료됐어요. 그동안 고마웠어요 💜');location.href='/'}
  else toast('탈퇴에 실패했어요. 잠시 후 다시 시도하거나 문의해주세요');
}
function renderSync(){
  const box=$('syncBox'); if(!box) return;
  const t=cloud.last?`${pad2(cloud.last.getHours())}:${pad2(cloud.last.getMinutes())}`:'';
  const S={
    on:['var(--green)',`<b>${window.soulAuth?esc(window.soulAuth.label()):'claude.ai 계정'}으로 동기화 중</b>${t?` · 마지막 저장 ${t}`:''}<br><small class="muted">다른 기기에서 로그인해도 출석·도감·PRO가 그대로 이어져요</small>${window.soulAuth?'<br><button class="again" style="margin:6px 0 0" onclick="soulAuth.signOut()">로그아웃</button>':''}`],
    init:['#ddd','연결 확인 중...'],
    slow:['var(--yellow)','클라우드 응답이 늦어요. 이 기기에는 계속 저장돼요.'],
    readonly:['var(--orange)','보기 전용 권한이라 이 기기에만 저장돼요.'],
    off:['#ddd',window.soulAuth?`이 기기에만 저장 중이에요. 로그인하면 기록이 저장되고 AI 해석도 열려요.<div class="login-btns">${loginButtons()}</div><p class="consent-note">로그인하면 <a href="/terms" target="_blank">이용약관</a>과 <a href="/privacy" target="_blank">개인정보처리방침</a>에 동의하고,<br>만 14세 이상임을 확인한 것으로 봐요.</p>`:(window.soulConfig?'이 기기에만 저장돼요.<br><small class="muted">로그인 기능은 곧 열려요</small>':'이 브라우저에만 저장돼요.<br><small class="muted">claude.ai에 로그인한 상태로 열면 자동으로 동기화돼요</small>')],
  }[cloud.status]||['#ddd',''];
  box.innerHTML=`<span class="dot" style="background:${S[0]}"></span><span>${S[1]}</span>`;
}


/* ================= RETENTION: 체크인 · 운세 일기 · 주간 리포트 · 알림 · 이벤트 ================= */
const FIT=[{v:2,e:'🎯',n:'딱 맞았어'},{v:1,e:'🤏',n:'반반'},{v:0,e:'🙅',n:'전혀'}];
function allDraws(){
  const out=[];
  try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('soulcode.draw.')){const d=store.get(k);if(d&&d.card!=null)out.push({...d,date:k.slice(14)})}}}catch(e){}
  return out.sort((a,b)=>a.date<b.date?1:-1);
}
function fitStats(){
  const ds=allDraws(), checked=ds.filter(d=>d.fit!=null);
  const rate=checked.length?Math.round(checked.reduce((s,d)=>s+d.fit,0)/(checked.length*2)*100):null;
  const cnt={}; ds.forEach(d=>cnt[d.card]=(cnt[d.card]||0)+1);
  const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
  return {days:ds.length,checked:checked.length,rate,top:top?{card:+top[0],n:top[1]}:null,ds};
}
function setFit(date,v){
  const k='soulcode.draw.'+date, d=store.get(k); if(!d) return;
  d.fit=v; d.fitAt=Date.now(); store.set(k,d); if(draw&&draw.date===date) draw.fit=v;
  const s=fitStats();
  toast(v===2?'기록 완료! 우주랑 통했네 🎯':v===1?'기록 완료! 반은 맞췄다 🤏':'기록 완료! 내일은 맞춰볼게 🙅');
  renderFit(); renderYesterdayAsk();
  if(s.checked===3||s.checked===7) setTimeout(()=>toast(`체크 ${s.checked}일 달성! MY에서 운세 일기를 볼 수 있어요 📔`),1900);
}
function renderFit(){
  let box=$('fitBox');
  if(!box){const anchor=document.querySelector('#result .ai-only')||document.querySelector('#result .msg-box'); if(!anchor)return; anchor.insertAdjacentHTML('afterend','<div class="panel fit-box" id="fitBox"></div><div id="pushAsk"></div>'); box=$('fitBox')}
  if(!draw){box.style.display='none';return} box.style.display='';
  const h=new Date().getHours(), s=fitStats();
  if(draw.fit!=null){
    const f=FIT.find(x=>x.v===draw.fit);
    box.innerHTML=`<div class="fit-t">${TL('🌙 오늘 카드 체크 완료','🌙 Today\'s card checked','🌙 今日のカード、チェック完了')} ${f.e}</div><div class="fit-s">${TL(`지금까지 ${s.checked}일 기록 · 적중률 <b>${s.rate}%</b>`,`${s.checked} days logged · hit rate <b>${s.rate}%</b>`,`これまで${s.checked}日記録 · 的中率 <b>${s.rate}%</b>`)}</div><button class="again" style="margin:8px 0 0" onclick="go('s-me');setTimeout(()=>$('diaryBox')&&$('diaryBox').scrollIntoView({behavior:'smooth'}),80)">${TL('📔 운세 일기 보기','📔 See my fortune diary','📔 運勢日記を見る')}</button>`;
  }else if(h<18){
    box.innerHTML=TL(`<div class="fit-t">🌙 저녁에 다시 와서 체크해줘</div><div class="fit-s">오늘 카드가 맞았는지 <b>오후 6시부터</b> 기록할 수 있어요.<br>기록이 쌓이면 나만의 적중률과 AI 주간 리포트가 열려요.</div>`,`<div class="fit-t">🌙 Come back tonight to check in</div><div class="fit-s">From <b>6 p.m.</b> you can log whether today's card was right.<br>Keep logging to unlock your hit rate and a weekly AI report.</div>`,`<div class="fit-t">🌙 夜にまたチェックしに来てね</div><div class="fit-s">今日のカードが当たったか、<b>18時から</b>記録できます。<br>記録がたまると的中率とAI週間レポートが見られます。</div>`);
  }else{
    box.innerHTML=`<div class="fit-t">${TL('🌙 오늘 카드, 맞았어?','🌙 Was today\'s card right?','🌙 今日のカード、当たった?')}</div><div class="fit-btns">${FIT.map(f=>`<button onclick="setFit('${draw.date}',${f.v})"><span>${f.e}</span>${f.n}</button>`).join('')}</div><div class="fit-s">${s.checked?TL(`지금까지 ${s.checked}일 기록 · 적중률 ${s.rate}%`,`${s.checked} days logged · hit rate ${s.rate}%`,`これまで${s.checked}日記録 · 的中率 ${s.rate}%`):TL('첫 기록을 남겨봐요','Leave your first log','最初の記録を残そう')}</div>`;
  }
  renderPushAsk();
}
function yesterdayKey(){const d=new Date();d.setDate(d.getDate()-1);return dateKey(d)}
function renderYesterdayAsk(){
  let box=$('yAsk'); const il=$('ilji'); if(!il)return;
  if(!box){il.insertAdjacentHTML('afterend','<div id="yAsk"></div><div id="evBox"></div>');box=$('yAsk')}
  const y=store.get('soulcode.draw.'+yesterdayKey());
  if(!y||y.fit!=null){box.innerHTML='';return}
  const c=TAROT[y.card];
  box.innerHTML=`<div class="panel fit-box y-ask"><div class="fit-t">어제 뽑은 <b>${c[2]} ${c[0]}</b>, 맞았어?</div><div class="fit-btns">${FIT.map(f=>`<button onclick="setFit('${yesterdayKey()}',${f.v})"><span>${f.e}</span>${f.n}</button>`).join('')}</div></div>`;
}

/* ---- 운세 일기 + 주간 리포트 (MY) ---- */
function weekKey(){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return dateKey(d)}
function renderDiary(){
  const me=$('s-me'); if(!me)return;
  let box=$('diaryBox');
  if(!box){const anchor=[...me.querySelectorAll('.sec-t')].find(h=>h.textContent.includes('카드 도감')); if(!anchor)return; anchor.insertAdjacentHTML('beforebegin','<div class="sec-t">📔 운세 일기</div><div class="panel" id="diaryBox"></div>'); box=$('diaryBox')}
  const s=fitStats(), wk=store.get('soulcode.weekly.'+weekKey());
  const last7=s.ds.filter(d=>{const t=new Date(d.date+'T00:00:00');return (Date.now()-t)/864e5<7});
  const list=s.ds.slice(0,14).map(d=>{const c=TAROT[d.card],f=FIT.find(x=>x.v===d.fit);const [,m,dd]=d.date.split('-');
    return `<button class="dy" onclick="diaryOpen('${d.date}')"><span class="dt">${+m}.${+dd}</span><span class="cd">${c[2]} ${c[0]}${d.rev?' <small>역</small>':''}</span><span class="ft">${f?f.e:'·'}</span></button>`}).join('');
  box.innerHTML=s.days?`<div class="dstats"><div><b>${s.days}</b><small>기록한 날</small></div><div><b>${s.rate!=null?s.rate+'%':'-'}</b><small>적중률</small></div><div><b>${s.top?TAROT[s.top.card][2]:'-'}</b><small>${s.top?`최다 카드 ${s.top.n}회`:'최다 카드'}</small></div></div>
    <div class="dlist">${list}</div><div id="diaryDetail" class="dd"></div>
    <div class="sec-mini">🤖 이번 주 AI 리포트 <span class="pro-chip">PRO</span></div>
    ${last7.length>=3?`<button class="btn pink ai-btn" id="wkBtn" onclick="aiWeekly()">${wk?'🔁 다시 받기':'이번 주 나의 흐름 정리받기'}</button><div class="ai-box${wk?' show':''}" id="wkBox">${wk?esc(wk):''}</div>`
      :`<p class="fit-s">최근 7일 중 3일 이상 카드를 뽑으면 열려요 (지금 ${last7.length}일)</p>`}`
    :`<p class="fit-s">오늘의 카드를 뽑고 저녁에 "맞았어?"를 체크하면 여기에 쌓여요 🌙</p>`;
  if(wk&&$('wkBox'))aiBadge($('wkBox'));
}
function diaryOpen(date){
  const d=store.get('soulcode.draw.'+date), c=TAROT[d.card], box=$('diaryDetail');
  if(box._d===date){box.innerHTML='';box._d=null;return} box._d=date;
  box.innerHTML=`<b>${c[2]} ${c[0]} (${c[1]})</b> · ${d.rev?'역방향 · '+c[4]:'정방향 · '+c[3]}${d.ai?`<div class="dd-ai">${esc(d.ai)}</div>`:''}`;
}
async function aiWeekly(){
  const days=fitStats().ds.filter(d=>(Date.now()-new Date(d.date+'T00:00:00'))/864e5<7).reverse();
  const lines=days.map(d=>{const c=TAROT[d.card],f=FIT.find(x=>x.v===d.fit);return `  ${d.date}: ${c[0]}(${c[1]}) ${d.rev?'역방향':'정방향'} / 키워드 ${d.rev?c[4]:c[3]} / 체감 ${f?f.n:'기록 없음'}`}).join('\n');
  const prompt=`[데이터]
${personaData()}
- 이번 주 뽑은 카드와 본인 체감:
${lines}
- ${toneLine(profile.mbti[2])}

[형식]
첫 줄: 이번 주를 요약하는 20자 이내 헤드라인
(빈 줄)
🌊 이번 주 흐름: 3문장 (카드들이 이어지는 흐름 + 사주·MBTI 성향과 연결)
🎯 잘 맞은 날의 공통점: 1~2문장 (체감 기록 기준, 기록이 없으면 생략)
(빈 줄)
👉 다음 주 한 줄 조언
🍀 다음 주 행운의 요일: 요일 하나와 이유 한 줄`;
  const text=await runAI(prompt,$('wkBox'),$('wkBtn'),{pro:true,proReason:'AI 주간 리포트는 PRO 전용이에요'});
  if(text){store.set('soulcode.weekly.'+weekKey(),text);$('wkBtn').textContent='🔁 다시 받기'}
}

/* ---- 아침 알림 (웹 푸시) ---- */
const PUSH={supported:()=>'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window,
  ios:()=>/iphone|ipad|ipod/i.test(navigator.userAgent),standalone:()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true};
function b64u(s){const p='='.repeat((4-s.length%4)%4);const r=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(r,c=>c.charCodeAt(0))}
async function pushState(){
  if(!window.soulConfig) return 'off';
  if(!PUSH.supported()) return PUSH.ios()&&!PUSH.standalone()?'ios-install':'unsupported';
  if(Notification.permission==='denied') return 'denied';
  try{const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();return sub?'on':'ready'}catch(e){return 'ready'}
}
async function enablePush(){
  try{
    const perm=await Notification.requestPermission(); if(perm!=='granted'){toast('알림이 꺼져 있어요. 설정에서 허용해주세요');return}
    const reg=await navigator.serviceWorker.ready;
    const {key}=await fetch('/api/push/key').then(r=>r.json());
    const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(key)});
    const r=await fetch('/api/push/subscribe',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(sub)});
    if(!r.ok) throw new Error('save');
    store.set('soulcode.pushAsk','done'); toast('매일 아침 8시에 오늘의 카드를 알려줄게요 🔔');
  }catch(e){toast('알림을 켜지 못했어요. 잠시 후 다시 시도해주세요')}
  renderPushAsk(); renderPushSetting();
}
async function disablePush(){
  try{const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();
    if(sub){await fetch('/api/push/subscribe',{method:'DELETE',headers:{'content-type':'application/json'},body:JSON.stringify({endpoint:sub.endpoint})}).catch(()=>{});await sub.unsubscribe()}
    toast('아침 알림을 껐어요')}catch(e){}
  renderPushSetting();
}
async function renderPushAsk(){
  const box=$('pushAsk'); if(!box)return;
  const st=await pushState();
  if(store.get('soulcode.pushAsk')==='later'||st==='on'||st==='off'||st==='unsupported'||st==='denied'){box.innerHTML='';return}
  box.innerHTML=st==='ios-install'
    ?`<div class="panel push-ask"><div class="fit-t">🔔 내일 카드, 아침에 알려줄까?</div><div class="fit-s">아이폰은 <b>공유 버튼 → 홈 화면에 추가</b>로 앱을 설치한 뒤 열면 알림을 켤 수 있어요.</div><button class="again" style="margin:6px 0 0" onclick="store.set('soulcode.pushAsk','later');renderPushAsk()">다음에</button></div>`
    :`<div class="panel push-ask"><div class="fit-t">🔔 내일 카드, 아침에 알려줄까?</div><div class="fit-s">매일 아침 8시에 한 번만 보내요.</div><div class="fit-btns two"><button onclick="enablePush()"><span>🔔</span>알림 받기</button><button onclick="store.set('soulcode.pushAsk','later');renderPushAsk()"><span>🙅</span>괜찮아요</button></div></div>`;
}
async function renderPushSetting(){
  const me=$('s-me'); if(!me||!window.soulConfig)return;
  let box=$('pushSet');
  if(!box){const sync=[...me.querySelectorAll('.sec-t')].find(h=>h.textContent.includes('동기화'));if(!sync)return;sync.insertAdjacentHTML('beforebegin','<div class="sec-t">🔔 아침 알림</div><div class="panel" id="pushSet"></div>');box=$('pushSet')}
  const st=await pushState();
  box.innerHTML={on:'<div class="row-set"><span>매일 아침 8시 · 오늘의 카드 알림 <b>켜짐</b></span><button class="again" onclick="disablePush()">끄기</button></div>',
    ready:'<div class="row-set"><span>매일 아침 8시에 오늘의 카드를 알려줘요</span><button class="btn" style="width:auto;padding:9px 16px;font-size:15px" onclick="enablePush()">켜기</button></div>',
    'ios-install':'<span class="fit-s">아이폰은 <b>공유 → 홈 화면에 추가</b>로 설치한 뒤 열면 알림을 켤 수 있어요.</span>',
    denied:'<span class="fit-s">브라우저 설정에서 이 사이트의 알림이 차단돼 있어요. 허용으로 바꾸면 켤 수 있어요.</span>',
    unsupported:'<span class="fit-s">이 브라우저는 알림을 지원하지 않아요.</span>'}[st]||'';
}

/* ---- 이벤트 ---- */
const TERM_TIP={소한:'한 해 중 가장 추운 때. 무리한 시작보다 체력 비축',대한:'겨울의 끝자락. 미뤄둔 정리를 끝내기 좋은 날',입춘:'사주에서 새해가 시작되는 날! 올해 다짐을 적어봐요',우수:'얼음이 녹는 때. 굳었던 관계를 풀기 좋아요',경칩:'개구리가 깨어나는 날. 미뤄둔 일 시작하기',춘분:'낮과 밤이 같은 날. 균형 잡기 좋은 하루',청명:'하늘이 맑아지는 때. 머릿속도 맑게 정리',곡우:'봄비가 곡식을 키우는 때. 공부·자기계발 운 UP',입하:'여름의 시작. 에너지가 오르는 시기',소만:'만물이 차오르는 때. 작은 성과를 챙겨봐요',망종:'씨 뿌리는 시기. 새 계획을 심어봐요',하지:'낮이 가장 긴 날. 활동량 최대로',소서:'더위의 시작. 감정 과열 주의',대서:'가장 더운 때. 쉬어가는 것도 실력',입추:'가을의 시작. 하반기 계획 점검',처서:'더위가 꺾이는 때. 컨디션 회복',백로:'이슬이 맺히는 때. 섬세한 감각이 살아나요',추분:'다시 낮과 밤이 같아지는 날. 균형 점검',한로:'찬 이슬의 때. 마무리 운이 강해요',상강:'서리가 내리는 때. 정리·결단의 기운',입동:'겨울의 시작. 에너지를 안으로 모으기',소설:'첫눈이 오는 때. 감성 충전하기 좋은 날',대설:'눈이 많이 오는 때. 실내에서 나를 돌보기',동지:'밤이 가장 긴 날. 내일부터 해가 길어지는 반전의 날'};
function lunarOf(d){try{return Manseryeok.solarToLunar(d.getFullYear(),d.getMonth()+1,d.getDate())}catch(e){return null}}
function termToday(d){try{const ks=dateKey(d);return Manseryeok.getSolarTermsOfYear(d.getFullYear()).find(t=>dateKey(new Date(Date.parse(t.date)))===ks)||null}catch(e){return null}}
function nextFullMoon(){const d=new Date();for(let i=1;i<32;i++){d.setDate(d.getDate()+1);const l=lunarOf(d);if(l&&l.day===15)return i}return null}
function evDone(id){return !!(store.get('soulcode.events')||{})[id]}
function evMark(id,v){const e=store.get('soulcode.events')||{};e[id]=v||Date.now();store.set('soulcode.events',e)}
function unlocks(){return store.get('soulcode.unlocks')||[]}
function activeEvents(){
  const d=new Date(), k=dateKey(d), ev=[], l=lunarOf(d);
  if(profile&&profile.birth&&profile.birth.slice(5)===k.slice(5)) ev.push({id:'bday-'+k,e:'🎂',t:TL(`생일 축하해, ${esc(profile.nick)}!`,`Happy birthday, ${esc(profile.nick)}!`,`お誕生日おめでとう、${esc(profile.nick)}!`),s:TL('생일에만 뽑을 수 있는 특별 카드가 기다려요','A special card you can only draw on your birthday is waiting','誕生日だけ引ける特別なカードが待ってるよ'),cta:TL('생일 카드 뽑기','Draw birthday card','誕生日カードを引く'),fn:`openWish('bday-${k}','birthday')`});
  if(l&&l.day===15) ev.push({id:'moon-'+k,e:'🌕',t:TL('오늘은 음력 보름, 소원 카드 데이','Full moon today: wish card day','今日は満月、願いごとカードの日'),s:TL('보름달에 소원을 빌고 카드 한 장으로 답을 들어봐요','Make a wish on the full moon and get your answer from one card','満月に願いをかけて、カード1枚で答えを聞こう'),cta:TL('소원 카드 뽑기','Draw wish card','願いごとカードを引く'),fn:`openWish('moon-${k}','moon')`});
  const tm=termToday(d); if(tm) ev.push({id:'term-'+k,e:'🌿',t:`오늘은 ${tm.name}(${tm.hanja})`,s:TERM_TIP[tm.name]||'계절이 바뀌는 날이에요',info:true});
  const m=d.getMonth()+1, Y=reportYear();
  if(m===12||m===1) ev.push({id:'ny-'+Y,e:'🎍',t:TL(`${Y} 신년운세 오픈`,`${Y} yearly fortune is open`,`${Y}年の運勢オープン`),s:TL(`${Y}년 12개월 흐름 그래프와 AI 풀이를 미리 봐요`,`Preview your ${Y} month-by-month graph and AI reading`,`${Y}年12か月の流れグラフとAI解説を先取り`),cta:TL(`${Y} 운세 보기`,`See ${Y}`,`${Y}年の運勢を見る`),fn:`openReport('year')`,keep:true});
  if(!unlocks().includes('strawberry')){const n=calcStreak();ev.push({id:'streak7',e:'🔥',t:TL('7일 연속 출석 이벤트','7-day streak event','7日連続ログインイベント'),s:TL(`7일 연속 오면 스킨 '딸기우유' 평생 해금 · 지금 <b>${Math.min(n,7)}/7</b>`,`Visit 7 days in a row to unlock the 'Strawberry Milk' skin forever · now <b>${Math.min(n,7)}/7</b>`,`7日連続で来るとスキン「いちごミルク」が永久解放 · 今 <b>${Math.min(n,7)}/7</b>`),prog:Math.min(n,7)/7,info:true,keep:true})}
  return ev.filter(e=>e.keep||e.info||!evDone(e.id));
}
function checkStreakReward(){
  if(unlocks().includes('strawberry')||calcStreak()<7)return;
  store.set('soulcode.unlocks',[...unlocks(),'strawberry']);
  setTimeout(()=>toast(TL("🎉 7일 연속 출석! '딸기우유' 스킨이 평생 해금됐어요","🎉 7-day streak! 'Strawberry Milk' skin unlocked forever","🎉 7日連続! 「いちごミルク」スキンが永久解放されました")),600);
}
function renderEvents(){
  if(!$('evBox')) renderYesterdayAsk();
  const box=$('evBox'); if(!box||!profile)return;
  checkStreakReward();
  const all=activeEvents(), fm=nextFullMoon(), ev=all.slice(0,2);
  box.innerHTML=ev.map(e=>`<div class="ev-card${e.info?' info':''}"><div class="ev-e">${e.e}</div><div class="ev-b"><b>${e.t}</b><small>${e.s}</small>${e.prog!=null?`<i class="ev-bar"><i style="width:${e.prog*100}%"></i></i>`:''}${e.cta?`<button onclick="${e.fn}">${e.cta} →</button>`:''}</div></div>`).join('')
    +(all.length>2?`<div class="ev-next">${all.slice(2).map(e=>e.e+' '+e.t.replace(/<[^>]+>/g,'')).join(' · ')}</div>`:'')+(fm&&!all.some(e=>e.id.startsWith('moon-'))?`<div class="ev-next">${TL('다음 이벤트 · 🌕 보름 소원 카드','Next event · 🌕 Full-moon wish card','次のイベント · 🌕 満月の願いごとカード')} D-${fm}</div>`:'');
}
function openWish(id,kind){
  let m=$('wishM');
  if(!m){$('app').insertAdjacentHTML('beforeend','<div class="modal" id="wishM" onclick="if(event.target.id===\'wishM\')closeWish()"><div class="pw" id="wishIn"></div></div>');m=$('wishM')}
  const done=(store.get('soulcode.events')||{})[id];
  const head=kind==='birthday'?['🎂 생일 특별 카드','올해의 나에게 하고 싶은 말을 적어봐요']:['🌕 보름 소원 카드','이루고 싶은 소원 하나를 적어봐요'];
  if(done&&done.card!=null){wishResult(id,kind,done);m.classList.add('show');return}
  $('wishIn').innerHTML=`<h3 class="h-display" style="text-align:center">${head[0]}</h3><p class="muted" style="text-align:center;font-size:13.5px;margin:6px 0 14px">${head[1]}</p>
    <input class="field" id="wishQ" maxlength="40" placeholder="${kind==='birthday'?'예: 올해는 나를 더 아껴주기':'예: 이번 달 안에 합격하기'}" autocomplete="off">
    <button class="btn" style="margin-top:14px" onclick="drawWish('${id}','${kind}')">카드 한 장 뽑기 ✨</button><button class="btn ghost" style="margin-top:10px" onclick="closeWish()">닫기</button>`;
  m.classList.add('show');
}
function closeWish(){$('wishM')&&$('wishM').classList.remove('show')}
function drawWish(id,kind){
  const q=($('wishQ').value||'').trim(), r=rng(hash(profile.nick+id+q+Math.random()));
  const res={card:Math.floor(r()*22),rev:r()<0.25,q,at:Date.now()};
  evMark(id,res); addCollect(res.card); wishResult(id,kind,res); renderEvents();
}
function wishResult(id,kind,res){
  const c=TAROT[res.card], luck=LUCK[res.card]+(res.rev?-1:1);
  const v=luck>=3?['이뤄질 기운이 강해요 ✨','우주가 밀어주는 중. 지금 움직이면 돼요']:luck>=1?['천천히 다가오는 중 🌱','조급해하지 말고 작은 행동부터 쌓아봐요']:['방향을 살짝 틀어봐요 🧭','같은 소원이라도 다른 길로 가면 열려요'];
  $('wishIn').innerHTML=`<div style="text-align:center"><div class="muted" style="font-size:13px">${kind==='birthday'?'🎂 생일 특별 카드':'🌕 보름 소원 카드'}</div>
    ${res.q?`<p style="margin:8px 0 2px;font-size:14px">"${esc(res.q)}"</p>`:''}
    <div class="wish-card" style="background:linear-gradient(165deg,${CARD_BG[res.card]})"><div style="font-size:54px">${c[2]}</div><b>${c[0]}</b><small>${c[1]}${res.rev?' · 역방향':''}</small></div>
    <h3 class="h-display" style="font-size:22px">${v[0]}</h3><p style="font-size:14px;margin:6px 0 4px">${v[1]}</p><p class="muted" style="font-size:12.5px">키워드 · ${res.rev?c[4]:c[3]}</p></div>
    <button class="btn" style="margin-top:14px" onclick="shareWish('${kind}',${res.card},'${v[0].replace(/'/g,'')}')">친구한테 자랑하기</button><button class="btn ghost" style="margin-top:10px" onclick="closeWish()">닫기</button>
    <p class="disclaimer" style="margin-top:10px">재미로 보는 콘텐츠예요</p>`;
}

async function shareWish(kind,card,verdict){
  const c=TAROT[card], url=location.origin+'/?from=wish';
  const text=`${kind==='birthday'?'🎂 생일 특별 카드':'🌕 보름 소원 카드'}: ${c[2]} ${c[0]} — ${verdict}\n너도 뽑아봐 👉 ${url}`;
  try{if(navigator.share){await navigator.share({text});return}}catch(e){return}
  try{await navigator.clipboard.writeText(text);toast('복사했어요! 카톡에 붙여넣기 💌')}catch(e){toast('복사하지 못했어요')}
}

/* ================= 친구들과 궁합 지도 ================= */
const CM={cur:null,data:null,sel:null,all:false};
function cmMaps(){return store.get('soulcode.maps')||[]}
function cmSave(list){store.set('soulcode.maps',list)}
function cmMe(){getSaju();return {nick:profile.nick.slice(0,10),mbti:profile.mbti,stem:saju.dayStem,yb:saju.yearBranch}}
function chemOne(a,b){
  const ea=STEM_EL[a.stem], eb=STEM_EL[b.stem];
  let sj=SAJU_MATCH[(eb-ea+5)%5].s; const hap=Math.abs(a.stem-b.stem)===5;
  if(hap)sj=Math.max(sj,95); else if(a.stem%2!==b.stem%2)sj+=4;
  return {s:Math.round(sj*0.45+mbtiMatch(a.mbti,b.mbti).s*0.4+ttiMatch(a.yb,b.yb).s*0.15),hap};
}
function chem(a,b){const x=chemOne(a,b),y=chemOne(b,a);return {s:Math.round((x.s+y.s)/2),hap:x.hap}}
const chemWord=s=>s>=88?'천생연분 💖':s>=78?'찰떡 케미 ✨':s>=66?'노력하면 꿀케미 🍯':'롤러코스터 🎢';
const chemCol=s=>s>=85?'#FF4FA8':s>=76?'#8B6CFF':s>=66?'#B9B0CC':'#3D9BFF';
async function cmApi(path,opt={}){const r=await fetch('/api/maps'+path,{...opt,headers:{'content-type':'application/json',...(opt.headers||{})}});const j=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(j.code||'error'),{code:j.code});return j}
function cmScreen(){
  if($('s-map'))return;
  $('tabbar').insertAdjacentHTML('beforebegin',`<section class="screen" id="s-map"><div class="eng">CHEMISTRY MAP</div><h2 class="page-h h-display">우리 무리 궁합 지도 🗺️</h2><p class="sub" style="margin-bottom:14px">친구들이 링크로 들어오면 서로의 케미가 선으로 이어져요.</p><div id="cmBody"></div><p class="disclaimer">생년월일은 공유되지 않아요 · 재미로 보는 콘텐츠예요</p></section>`);
}
function openMap(code){cmScreen();if(code)CM.cur=code;go('s-map')}
async function renderMap(){
  const body=$('cmBody'); if(!body)return;
  if(!profile){body.innerHTML='<div class="panel">먼저 내 정보를 입력해야 지도를 만들 수 있어요.</div>';return}
  const maps=cmMaps();
  if(!CM.cur&&maps.length)CM.cur=maps[0].code;
  const tabs=maps.length?`<div class="chips-sel cm-tabs">${maps.map(m=>`<button class="chip ${m.code===CM.cur?'sel':''}" onclick="CM.cur='${m.code}';CM.sel=null;renderMap()">${esc(m.title)}</button>`).join('')}<button class="chip" onclick="CM.cur='new';renderMap()">＋ 새 지도</button></div>`:'';
  if(!maps.length||CM.cur==='new'){
    body.innerHTML=tabs+`<div class="panel"><label class="lb" style="margin-top:0">지도 이름</label><input class="field" id="cmTitle" maxlength="20" placeholder="예: 우리 과 동기들, 단톡방 7인" autocomplete="off"><button class="btn" style="margin-top:14px" onclick="cmCreate()">지도 만들고 친구 초대하기 🗺️</button><p class="fit-s">지도에는 내 별명·MBTI·사주 일간·띠만 올라가요.</p></div>`;
    return;
  }
  body.innerHTML=tabs+'<div class="panel" style="text-align:center">지도 불러오는 중... 🛰️</div>';
  try{CM.data=await cmApi('/'+CM.cur)}catch(e){
    if(e.code==='not_found'){cmSave(cmMaps().filter(m=>m.code!==CM.cur));CM.cur=null;toast('삭제된 지도예요');return renderMap()}
    body.innerHTML=tabs+'<div class="panel">지도를 불러오지 못했어요. <button class="again" onclick="renderMap()">다시 시도</button></div>';return}
  const mine=cmMaps().find(m=>m.code===CM.cur)||{}, M=CM.data.members, n=M.length;
  const pairs=[]; for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pairs.push({i,j,...chem(M[i],M[j])});
  pairs.sort((a,b)=>b.s-a.s);
  const avg=M.map((_,k)=>{const ps=pairs.filter(p=>p.i===k||p.j===k);return ps.length?ps.reduce((s,p)=>s+p.s,0)/ps.length:0});
  const R=n<=2?70:n<=6?110:128, C=170, pos=M.map((_,k)=>{const a=-Math.PI/2+k*2*Math.PI/Math.max(n,1);return [C+R*Math.cos(a),C+R*Math.sin(a)]});
  const sel=CM.sel, show=p=>sel!=null?(p.i===sel||p.j===sel):(CM.all||n<=6||p.s>=80||p.s<64);
  const lines=pairs.filter(show).sort((a,b)=>a.s-b.s).map(p=>{const [x1,y1]=pos[p.i],[x2,y2]=pos[p.j],c=chemCol(p.s),w=p.s>=85?4:p.s>=76?3:2;
    const lab=sel!=null?`<g><rect x="${(x1+x2)/2-15}" y="${(y1+y2)/2-10}" width="30" height="20" rx="10" fill="#fff" stroke="${c}" stroke-width="1.5"/><text x="${(x1+x2)/2}" y="${(y1+y2)/2+4.5}" text-anchor="middle" font-size="12" font-weight="900" fill="#1B1433">${p.s}</text></g>`:'';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${p.s<66?'stroke-dasharray="5 5"':''} opacity="${sel!=null||p.s>=76||p.s<66?1:.55}"/>${lab}`}).join('');
  const nodes=M.map((m,k)=>{const [x,y]=pos[k],me=m.id===mine.memberId,dim=sel!=null&&sel!==k&&!pairs.some(p=>(p.i===sel&&p.j===k)||(p.j===sel&&p.i===k));
    return `<g class="cm-node" onclick="CM.sel=${sel===k?'null':k};renderMap()" opacity="${dim?.35:1}"><circle cx="${x}" cy="${y}" r="${sel===k?27:23}" fill="${me?'#FFE04D':'#fff'}" stroke="#1B1433" stroke-width="${sel===k?3.5:2.5}"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="20">${STEM_INFO[m.stem].emoji}</text><text x="${x}" y="${y+40}" text-anchor="middle" font-size="12.5" font-weight="900" fill="#1B1433">${esc(m.nick)}</text><text x="${x}" y="${y+54}" text-anchor="middle" font-size="10.5" fill="#6E6189">${m.mbti}</text></g>`}).join('');
  const best=pairs[0], worst=pairs[pairs.length-1], star=n>2?avg.indexOf(Math.max(...avg)):-1;
  const nm=k=>esc(M[k].nick);
  const sup=n>=2?`<div class="sec-t">🏆 우리 무리 어워즈</div><div class="cm-awards">
    <div class="mini"><div class="k">💖 베스트 케미</div><div class="v">${nm(best.i)} × ${nm(best.j)}<small>${best.s}점 · ${chemWord(best.s)}</small></div></div>
    ${pairs.length>1?`<div class="mini"><div class="k">🎢 롤러코스터 케미</div><div class="v">${nm(worst.i)} × ${nm(worst.j)}<small>${worst.s}점 · 서로에게 좋은 자극제</small></div></div>`:''}
    ${star>=0?`<div class="mini"><div class="k">👑 우리 무리 인싸</div><div class="v">${nm(star)}<small>평균 ${Math.round(avg[star])}점 · 누구랑도 잘 맞음</small></div></div>`:''}
    ${pairs.some(p=>p.hap)?`<div class="mini"><div class="k">🧲 천간합 커플</div><div class="v">${pairs.filter(p=>p.hap).slice(0,2).map(p=>nm(p.i)+' × '+nm(p.j)).join(', ')}<small>사주 일간이 서로 끌어당기는 드문 조합</small></div></div>`:''}</div>`:'';
  const selInfo=sel!=null?`<div class="panel cm-sel"><b>${STEM_INFO[M[sel].stem].emoji} ${nm(sel)}</b>의 케미 순위<div class="cm-rank">${pairs.filter(p=>p.i===sel||p.j===sel).map(p=>{const o=p.i===sel?p.j:p.i;return `<div><span>${nm(o)} <small>${M[o].mbti}</small></span><b style="color:${chemCol(p.s)}">${p.s}</b><small>${chemWord(p.s)}</small></div>`}).join('')||'<p class="fit-s">아직 다른 멤버가 없어요</p>'}</div></div>`:'';
  body.innerHTML=tabs+`<div class="panel cm-map"><div class="cm-head"><b>${esc(CM.data.title)}</b><small>${n}명 · ${n<2?'친구를 초대해봐요':'사람을 누르면 그 사람 기준으로 보여줘요'}</small></div>
    <svg viewBox="0 0 340 360" class="cm-svg">${lines}${nodes}</svg>
    <div class="cm-legend"><span><i style="background:#FF4FA8"></i>찰떡 85+</span><span><i style="background:#8B6CFF"></i>좋음 76+</span><span><i style="background:#B9B0CC"></i>무난</span><span><i class="dash" style="border-color:#3D9BFF"></i>티격태격</span></div>
    ${n>6&&sel==null?`<button class="again" style="margin:6px 0 0" onclick="CM.all=!CM.all;renderMap()">${CM.all?'강한 선만 보기':'모든 선 보기'}</button>`:''}</div>
    ${selInfo}
    <button class="btn" style="margin-top:16px" onclick="cmInvite()">💌 친구 초대하기</button>
    ${sup}
    <div class="sec-t">👥 멤버 ${n}명</div><div class="panel cm-members">${M.map((m,k)=>`<div><span>${STEM_INFO[m.stem].emoji} ${esc(m.nick)} <small>${m.mbti}</small>${m.id===mine.memberId?' <em>나</em>':''}</span>${mine.ownerToken&&m.id!==mine.memberId?`<button class="again" onclick="cmKick('${m.id}')">빼기</button>`:''}</div>`).join('')}</div>
    <div class="cm-foot"><button class="again" onclick="renderMap()">🔄 새로고침</button>${mine.ownerToken?`<button class="again" onclick="cmDelete()">지도 삭제</button>`:mine.memberId?`<button class="again" onclick="cmLeave()">지도 나가기</button>`:''}</div>`;
}
async function cmCreate(){
  const title=($('cmTitle').value||'').trim(); if(!title){toast('지도 이름을 적어주세요');return}
  try{const r=await cmApi('',{method:'POST',body:JSON.stringify({title,me:cmMe()})});
    cmSave([{code:r.code,title,ownerToken:r.ownerToken,memberId:r.memberId,memberToken:r.memberToken},...cmMaps()]);CM.cur=r.code;CM.sel=null;await renderMap();cmInvite()}
  catch(e){toast('지도를 만들지 못했어요. 잠시 후 다시 시도해주세요')}
}
async function cmInvite(){
  const m=cmMaps().find(x=>x.code===CM.cur); if(!m)return;
  const url=`${location.origin}/?map=${m.code}`, text=`${profile.nick}님이 '${m.title}' 궁합 지도에 초대했어요 🗺️\n생일이랑 MBTI만 넣으면 우리 무리 케미가 한눈에 보여요!\n👉 ${url}`;
  try{if(navigator.share){await navigator.share({text});return}}catch(e){return}
  try{await navigator.clipboard.writeText(text);toast('초대 링크를 복사했어요! 단톡방에 붙여넣기 💌')}catch(e){prompt('이 링크를 복사해서 보내주세요',url)}
}
async function cmKick(id){const m=cmMaps().find(x=>x.code===CM.cur);if(!m||!confirm('이 멤버를 지도에서 뺄까요?'))return;
  try{await cmApi(`/${m.code}/members/${id}`,{method:'DELETE',headers:{'x-map-token':m.ownerToken}});CM.sel=null;renderMap()}catch(e){toast('빼지 못했어요')}}
async function cmLeave(){const m=cmMaps().find(x=>x.code===CM.cur);if(!m||!confirm('이 지도에서 나갈까요? 내 정보가 지도에서 지워져요.'))return;
  try{await cmApi(`/${m.code}/members/${m.memberId}`,{method:'DELETE',headers:{'x-map-token':m.memberToken}})}catch(e){}
  cmSave(cmMaps().filter(x=>x.code!==m.code));CM.cur=null;CM.sel=null;toast('지도에서 나왔어요');renderMap()}
async function cmDelete(){const m=cmMaps().find(x=>x.code===CM.cur);if(!m||!confirm(`'${m.title}' 지도를 삭제할까요? 모든 멤버에게서 사라져요.`))return;
  try{await cmApi('/'+m.code,{method:'DELETE',headers:{'x-map-token':m.ownerToken}})}catch(e){toast('삭제하지 못했어요');return}
  cmSave(cmMaps().filter(x=>x.code!==m.code));CM.cur=null;CM.sel=null;toast('지도를 삭제했어요');renderMap()}
async function cmJoinPrompt(){
  const code=store.get('soulcode.pendingMap'); if(!code||!profile)return;
  if(cmMaps().some(m=>m.code===code)){store.del('soulcode.pendingMap');openMap(code);return}
  let info; try{info=await cmApi('/'+code)}catch(e){store.del('soulcode.pendingMap');toast('없어진 지도 링크예요');return}
  let m=$('wishM'); if(!m){openWish('x','moon');closeWish();m=$('wishM')}
  const host=info.members[0];
  $('wishIn').innerHTML=`<div style="text-align:center"><div style="font-size:46px">🗺️</div><h3 class="h-display" style="font-size:22px;margin-top:6px">${host?esc(host.nick)+'님의 ':''}'${esc(info.title)}'<br>궁합 지도에 초대받았어요</h3><p class="fit-s" style="margin:10px 0 0">지금 ${info.members.length}명 참여 중 · 들어가면 모두와의 케미가 바로 보여요.<br>공유되는 건 <b>별명·MBTI·사주 일간·띠</b>뿐이고, 생년월일은 공유되지 않아요.</p></div>
    <button class="btn" style="margin-top:16px" onclick="cmJoin('${code}')">참여하기 💞</button><button class="btn ghost" style="margin-top:10px" onclick="store.del('soulcode.pendingMap');closeWish()">다음에</button>`;
  m.classList.add('show');
}
async function cmJoin(code){
  try{const info=await cmApi('/'+code), r=await cmApi(`/${code}/join`,{method:'POST',body:JSON.stringify(cmMe())});
    cmSave([{code,title:info.title,memberId:r.memberId,memberToken:r.memberToken},...cmMaps().filter(m=>m.code!==code)]);
    store.del('soulcode.pendingMap');closeWish();toast('지도에 들어왔어요! 🎉');openMap(code)}
  catch(e){toast(e.code==='full'?'이 지도는 30명이 꽉 찼어요':'참여하지 못했어요. 잠시 후 다시 시도해주세요')}
}
function cmEntry(){
  const f=$('mtForm'); if(!f||$('cmEntry')||!window.soulConfig)return;
  f.insertAdjacentHTML('beforebegin',`<button class="panel cm-entry" id="cmEntry" onclick="openMap()"><span class="ev-e">🗺️</span><span class="ev-b"><b>친구들과 궁합 지도 만들기</b><small>링크 하나로 단톡방 전체 케미를 한 장에! 베스트 케미·인싸 어워즈까지</small></span><span style="font-size:22px">→</span></button>`);
}


/* ================= 990원 1회 이용권 (티켓) ================= */
const tickets=()=>store.get('soulcode.tickets')||0;
function offerModal(html){
  let m=$('offerM');
  if(!m){$('app').insertAdjacentHTML('beforeend','<div class="modal" id="offerM" onclick="if(event.target.id===\'offerM\')closeOffer()"><div class="pw" id="offerIn"></div></div>');m=$('offerM')}
  $('offerIn').innerHTML=html+(window.soulConfig&&window.soulConfig.payTest?'<p class="consent-note">🧪 베타 기간이라 실제로 결제되지 않아요</p>':'')+'<p class="consent-note">결제하면 <a href="/terms" target="_blank">이용약관</a>·<a href="/refund" target="_blank">환불정책</a>에 동의한 것으로 봐요. 이용권을 쓰면 청약철회가 제한돼요.</p>';
  m.classList.add('show');
}
function closeOffer(){$('offerM')&&$('offerM').classList.remove('show')}
const OFFER={after:null};
function needLogin(){if(window.soulConfig&&window.soulConfig.serverPro)return false;toast('결제하려면 먼저 로그인해주세요 🔐');closeOffer();closePaywall();go('s-me');return true}
function openOffer(reason,after){
  if(!window.soulPay){openPaywall(reason);return}
  OFFER.after=after; const n=tickets();
  offerModal(`<div style="text-align:center"><div style="font-size:44px">🎟️</div><h3 class="h-display" style="font-size:24px">이번 한 번만 볼래요?</h3><p class="muted" style="font-size:13.5px;margin-top:4px">${esc(reason)}</p></div>
    ${n>0&&after?`<button class="btn" style="margin-top:16px" onclick="useTicketNow()">티켓 1장 쓰고 바로 보기 <small style="font-size:13px">(보유 ${n}장)</small></button>`:''}
    <div class="offer-opts">
      <button class="offer ${n>0&&after?'':'hot'}" onclick="buyTicket({type:'ai'})"><span class="o-t">🎟️ 1회 이용권</span><b>990원</b><small>${after?'지금 이 해석 한 번 바로 보기':'PRO 해석이나 스킨 하나를 한 번'}</small></button>
      <button class="offer" onclick="closeOffer();openPaywall('AI 무제한 + 스킨 3종')"><span class="o-badge">티켓 4장 값</span><span class="o-t">💎 PRO 30일</span><b>3,900원</b><small>AI 무제한 · 연간 리포트 · 스킨 3종</small></button>
    </div>
    <button class="btn ghost" style="margin-top:12px" onclick="closeOffer()">다음에</button>`);
}
function useTicketNow(){const f=OFFER.after;closeOffer();OFFER.after=null;if(f)f()}
function buyTicket(ctx){if(needLogin())return;store.set('soulcode.afterPay',ctx);closeOffer();window.soulPay.start('ticket')}
function openSkinOffer(s){
  if(!window.soulPay){openPaywall(`'${s.n}' 스킨은 PRO 전용이에요`);return}
  const n=tickets();
  offerModal(`<div style="text-align:center"><div class="sw skin-prev" data-skin-prev="${s.k}" style="margin:0 auto 10px">${s.sym}</div><h3 class="h-display" style="font-size:24px">'${s.n}' 덱 갖고 싶다면</h3><p class="muted" style="font-size:13.5px;margin-top:4px">한 번 사면 PRO가 끝나도 평생 내 거예요</p></div>
    ${n>0?`<button class="btn" style="margin-top:16px" onclick="ownSkin('${s.k}')">티켓 1장으로 평생 소장 <small style="font-size:13px">(보유 ${n}장)</small></button>`:''}
    <div class="offer-opts">
      <button class="offer ${n>0?'':'hot'}" onclick="buyTicket({type:'skin',k:'${s.k}'})"><span class="o-t">🎴 이 스킨만</span><b>990원</b><small>평생 소장</small></button>
      <button class="offer" onclick="closeOffer();openPaywall('스킨 3종 + AI 무제한')"><span class="o-badge">스킨 3종 다</span><span class="o-t">💎 PRO 30일</span><b>3,900원</b><small>스킨 3종 · AI 무제한</small></button>
    </div>
    <button class="btn ghost" style="margin-top:12px" onclick="closeOffer()">다음에</button>`);
  const sw=$('offerIn').querySelector('.skin-prev'); const tmp=document.createElement('div'); tmp.dataset.skin=s.k; tmp.className='app'; tmp.style.display='none'; document.body.appendChild(tmp); sw.style.background=getComputedStyle(tmp).getPropertyValue('--card-back'); tmp.remove();
}
async function ownSkin(k){
  if(needLogin()||!window.soulShop)return;
  const r=await window.soulShop.unlockSkin(k);
  if(!r.ok){toast(r.code==='no_ticket'?'티켓이 없어요':'잠시 후 다시 시도해주세요');return}
  store.set('soulcode.unlocks',[...new Set([...unlocks(),...(r.skins||[k])])]); store.set('soulcode.tickets',Math.max(0,tickets()-1));
  closeOffer(); setSkin(k); renderSkins(); burst($('app'),18); const s=SKINS.find(x=>x.k===k); toast(`'${s?s.n:k}' 덱 평생 소장 완료 🎴`);
}
window.afterTicket=function(){
  const ctx=store.get('soulcode.afterPay'); store.del('soulcode.afterPay');
  toast('🎟️ 1회 이용권 1장 충전 완료!');
  if(ctx&&ctx.type==='skin'){setTimeout(()=>ownSkin(ctx.k),900)}
  else setTimeout(()=>toast('아까 그 해석 버튼을 다시 누르면 티켓으로 바로 열려요'),2000);
};

/* ---- 연결 ---- */
function applyPrefill(){try{const p=store.get('soulcode.prefill');if(!p||profile)return;if(p.nick&&!$('nick').value){$('nick').value=p.nick;$('n1').disabled=false}if(p.birth&&!$('birth').value){$('birth').value=p.birth;$('n2').disabled=false}if(p.mbti&&/^[EI][SN][TF][JP]$/.test(p.mbti)&&Object.keys(ob.mbti).length===0){[...p.mbti].forEach(ch=>{const b=document.querySelector(`.mbti-opt[data-v="${ch}"]`);b&&b.click()})}}catch(e){}}
function pastEntry(){
  if(!window.soulConfig)return;
  const soul=$('s-soul'); if(soul&&!$('pastLink')){const d=soul.querySelector('.disclaimer');d&&d.insertAdjacentHTML('beforebegin','<a class="panel past-link wanted-link" id="pastLink" href="/wanted?utm_source=app_soul"><span class="ev-e">🚨</span><span class="ev-b"><b>운명의 상대 수배전단 뽑기</b><small>내 사주에 부족한 기운으로 찾은 그 사람</small></span><span style="font-size:22px">→</span></a>')}
  const mt=$('s-match'); if(mt&&!$('wantedLink')){const f=$('mtForm');f&&f.insertAdjacentHTML('beforebegin','<a class="panel past-link wanted-link" id="wantedLink" href="/wanted?utm_source=app_match"><span class="ev-e">🚨</span><span class="ev-b"><b>운명의 상대 수배전단</b><small>내 사주에 부족한 기운으로 그린 몽타주</small></span><span style="font-size:22px">→</span></a>')}
  const sp=$('s-splash'); if(sp&&!$('pastSplash')){const d=sp.querySelector('.disclaimer');d&&d.insertAdjacentHTML('afterend','<div id="pastSplash" class="past-splash"><a href="/wanted?utm_source=app_splash">🚨 운명의 상대 수배전단</a> · <a href="/ask?utm_source=app_splash">💌 친구들이 보는 나</a></div>')}
}
pastEntry();
try{if(new URLSearchParams(location.search).get('go')==='match'){store.set('soulcode.afterOnb','s-match');history.replaceState(null,'',location.pathname)}}catch(e){}
{const _go=go; go=function(id){if(id==='s-map')cmScreen(); _go(id); if(id==='s-onb')applyPrefill(); if(id==='s-map'){$('tabbar').classList.add('show');document.querySelectorAll('.tabbar button').forEach(b=>b.classList.toggle('on',b.dataset.go==='s-match'));renderMap()} if(id==='s-match')cmEntry(); if(['s-tarot','s-soul','s-match','s-me'].includes(id))setTimeout(cmJoinPrompt,400)};}
try{const q=new URLSearchParams(location.search).get('map');if(q&&/^[a-z2-9]{8}$/.test(q)){store.set('soulcode.pendingMap',q);history.replaceState(null,'',location.pathname)}}catch(e){}
{const _pb=renderProBanner; renderProBanner=function(){_pb(); const n=tickets(); if(n>0&&!isPro())$('proBanner').insertAdjacentHTML('beforeend',`<div class="tk-line">🎟️ 1회 이용권 <b>${n}장</b> 보유 · PRO 기능을 한 번씩 열 수 있어요</div>`)};}
{const pw=$('paywall'); if(pw&&window.soulPay){const pl=pw.querySelector('.plans'); pl&&pl.insertAdjacentHTML('afterend','<button class="again tk-link" onclick="closePaywall();openOffer(\'PRO 대신 필요한 것만 한 번\',null)">한 번만 필요해요? 1회 이용권 990원 →</button>')}}
{const _fill=fillResult; fillResult=function(){_fill(); renderFit()};
 const _rt=renderTarot; renderTarot=function(){_rt(); renderYesterdayAsk(); renderEvents()};
 const _rm=renderMe; renderMe=function(){_rm(); renderDiary(); renderPushSetting(); const n=calcStreak(); if(unlocks().includes('strawberry'))$('stS').textContent="🍓 '딸기우유' 스킨 평생 해금 완료"; else $('stS').textContent=n>=7?'7일 달성! 스킨이 곧 해금돼요':`${7-n}일만 더 오면 '딸기우유' 스킨 평생 해금 🍓`}}

/* ================= PRODUCTION HOOKS ================= */
(function(){
  if(window.soulPay){
    const pw=$('paywall'); pw.querySelector('.test-badge').style.display='none';
    pw.querySelector('.btn:not(.ghost)').textContent='결제하고 PRO 시작하기 💎';
    pw.querySelector('.test-note').innerHTML='결제는 <b>토스페이먼츠</b>로 안전하게 처리돼요.<br>이용권은 결제일부터 30일 / 365일 유지되고 <b>자동 갱신되지 않아요.</b>';
    pw.querySelector('.plans .plan[data-p=month] small:last-child').textContent='30일 이용권';
    pw.querySelector('.plans .plan[data-p=year] small:last-child').textContent='365일 이용권';
    if(window.soulConfig&&window.soulConfig.payTest){const tb=pw.querySelector('.test-badge');tb.textContent='베타 · 무료 체험';tb.style.display='';pw.querySelector('.btn:not(.ghost)').textContent='베타 무료로 PRO 열기 ✨';pw.querySelector('.test-note').innerHTML='🧪 <b>베타 기간이라 실제로 결제되지 않아요.</b><br>결제창에서 아무 카드나 골라 끝까지 진행하면 PRO가 열려요.';}
    pw.querySelector('.test-note').insertAdjacentHTML('afterend','<p class="consent-note">결제하면 <a href="/terms" target="_blank">이용약관</a>·<a href="/refund" target="_blank">환불정책</a>에 동의한 것으로 봐요.<br>디지털 콘텐츠 특성상 <b>PRO 혜택을 쓰기 시작하면 청약철회가 제한</b>될 수 있어요.</p>');
  }
  if(window.soulConfig){
    // 정식 버전: 프로토타입용 요소 정리 + 약관 링크·탈퇴 메뉴
    document.querySelectorAll('button.again[onclick="redraw()"]').forEach(b=>b.remove());
    const me=$('s-me'), dis=me.querySelector('.disclaimer');
    [...me.querySelectorAll('.sec-t')].filter(h=>h.textContent.includes('정식 버전')).forEach(h=>{h.textContent='🚀 곧 추가될 기능';const nx=h.nextElementSibling;if(nx)nx.innerHTML=nx.innerHTML.replace(/<br>📲[^<]*/,'')});
    dis.insertAdjacentHTML('afterend',`<div class="legal-links"><a href="/terms">이용약관</a>·<a href="/privacy"><b>개인정보처리방침</b></a>·<a href="/refund">환불정책</a>${window.soulConfig.serverPro?'<br><button onclick="deleteAccount()">회원 탈퇴</button>':''}</div>`);
    const biz=(window.soulConfig.biz||[]).map(([k,v])=>`<span>${esc(k)}: ${esc(v)}</span>`).join('');
    if(biz)me.querySelector('.legal-links').insertAdjacentHTML('afterend',`<p class="biz-info">${biz}</p>`);
  }
})();

/* ================= LAYOUT: 화면 정리 (놀거리 모음 · MY 그룹) ================= */
const HUB={
  wanted:{e:'🚨',t:'운명의 상대 수배전단',s:'사주로 그린 그 사람',href:'/wanted?utm_source=app_hub'},
  ask:{e:'💌',t:'친구들이 보는 나',s:'익명으로 물어보기',href:'/ask?utm_source=app_hub'},
  map:{e:'🗺️',t:'친구 궁합 지도',s:'단톡방 케미 한 장에',on:'openMap()'},
};
function hubHTML(id,keys,title){
  return `<div id="${id}" class="hub-wrap"><div class="sec-t hub-t">${title}</div><div class="hub hub-${keys.length}">${keys.map(k=>{const h=HUB[k];const inner=`<span class="hub-e">${h.e}</span><b>${h.t}</b><small>${h.s}</small>`;return h.on?`<button class="hub-tile" onclick="${h.on}">${inner}</button>`:`<a class="hub-tile" href="${h.href}">${inner}</a>`}).join('')}</div></div>`;
}
function tidyLayout(){
  if(!window.soulConfig)return;
  // 흩어져 있던 홍보 카드 제거
  ['pastLink','wantedLink','cmEntry'].forEach(id=>{const el=$(id);el&&el.remove()});
  // 궁합 탭: 친구랑 놀기 3칸 + 1:1 궁합 제목
  const f=$('mtForm');
  if(f&&!$('hubMatch')){f.insertAdjacentHTML('beforebegin',hubHTML('hubMatch',['wanted','ask','map'],'👯 친구랑 같이 놀기')+'<div class="sec-t hub-t">💞 1:1 궁합 보기</div>')}
  // 소울 탭: 결과 아래 2칸
  const soul=$('s-soul'), dis=soul&&soul.querySelector('.disclaimer');
  if(dis&&!$('hubSoul'))dis.insertAdjacentHTML('beforebegin',hubHTML('hubSoul',['wanted','ask'],'👯 이 결과로 친구랑 놀기'));
  // 첫 화면: 밑줄 링크 → 작은 버튼 2개
  const sp=$('pastSplash'); if(sp&&!sp.classList.contains('hub-pills'))sp.className='past-splash hub-pills',sp.innerHTML='<a href="/wanted?utm_source=app_splash">🚨 수배전단</a><a href="/ask?utm_source=app_splash">💌 친구들이 보는 나</a>';
  tidyMe();
}
function setLang(k){store.set('soulcode.lang',k);location.href=location.pathname}
function tidyMe(){
  const me=$('s-me'); if(!me||!window.soulConfig)return;
  const heads=[...me.querySelectorAll(':scope > .sec-t')];
  const find=t=>heads.find(h=>h.textContent.includes(t));
  // 예전 '곧 추가될 기능' 안내 제거 (알림·친구 초대는 이미 출시)
  heads.filter(h=>h.textContent.includes('곧 추가될')||h.textContent.includes('정식 버전')).forEach(h=>{const nx=h.nextElementSibling;if(nx&&nx.classList.contains('panel'))nx.remove();h.remove()});
  const group=(id,label,before)=>{if($(id)||!before)return;before.insertAdjacentHTML('beforebegin',`<div class="grp-t" id="${id}">${label}</div>`)};
  group('grpRecord','📚 내 기록',find('운세 리포트'));
  group('grpDeco','🎨 꾸미기',find('카드 덱 스킨'));
  group('grpSet','⚙️ 설정',find('아침 알림')||find('동기화'));
  // 🌐 언어 선택 (설정 그룹 맨 위)
  const gs=$('grpSet');
  if(gs&&!$('langSet')){
    const cur=window.soulLang||'ko';
    gs.insertAdjacentHTML('afterend',`<div class="sec-t">🌐 언어</div><div class="panel lang-set" id="langSet">${[['ko','한국어'],['en','English'],['ja','日本語']].map(([k,n])=>`<button class="chip${k===cur?' sel':''}" onclick="setLang('${k}')">${n}</button>`).join('')}<p class="muted" style="font-size:12px;margin-top:8px">English · 日本語: beta (some content is still in Korean)</p></div>`);
  }
}
{const _go2=go; go=function(id){_go2(id); if(id==='s-match'||id==='s-soul'||id==='s-me'||id==='s-splash')setTimeout(tidyLayout,0)};}
cmEntry=function(){tidyLayout()};
tidyLayout();

/* ================= 무료 베타: PRO 잠금 해제 · 결제 화면 숨김 (NEXT_PUBLIC_FREE_BETA=1) ================= */
(function(){
  const beta=!!(window.soulConfig&&window.soulConfig.freeBeta);
  const P=store.get('soulcode.pro')||{};
  if(!beta){ if(P.beta) store.del('soulcode.pro'); return; } // 베타 끝나면 베타용 PRO 표시 정리
  if(!P.active||P.beta) store.set('soulcode.pro',{active:true,beta:true,test:true});
  const msg=()=>TL(`🧪 지금은 무료 베타라 다 열려 있어요! AI 해석만 하루 ${freeLimit()}회예요`,`🧪 Free beta: everything is open! Only AI readings are limited to ${freeLimit()} a day`,`🧪 今は無料ベータなので全部使えます!AI解説だけ1日${freeLimit()}回です`);
  openPaywall=function(){toast(msg())};
  openOffer=function(reason){toast(/다 썼|마감/.test(reason||'')?TL(`오늘 AI 해석 ${freeLimit()}회를 다 썼어요. 내일 또 와요! 🌙`,`You've used all ${freeLimit()} AI readings today. See you tomorrow! 🌙`,`今日のAI解説${freeLimit()}回を使い切りました。また明日! 🌙`):msg())};
  quotaText=function(){const n=Math.max(0,freeLimit()-aiUsed());return TL(`🧪 무료 베타 · 오늘 AI 해석 ${n}/${freeLimit()}회 남음`,`🧪 Free beta · AI readings left today: ${n}/${freeLimit()}`,`🧪 無料ベータ · 今日のAI解説 残り${n}/${freeLimit()}回`)};
  renderProBanner=function(){$('proBanner').innerHTML=TL(`<div class="t">🧪 무료 베타 기간<small>연간 상세 리포트 · 덱 스킨 · AI 연애 상담까지 전부 무료! (AI 해석은 하루 ${freeLimit()}회)</small></div>`,`<div class="t">🧪 Free beta<small>Yearly report, deck skins and AI love advice are all free! (AI readings: ${freeLimit()} a day)</small></div>`,`<div class="t">🧪 無料ベータ期間<small>年間詳細レポート・デッキスキン・AI恋愛相談まで全部無料!(AI解説は1日${freeLimit()}回)</small></div>`)};
  // 화면의 PRO 표시 지우기
  document.documentElement.classList.add('free-beta');
  try{MT_REL[0].n=TL('썸·연인','Crush·Partner','気になる人·恋人')}catch(e){}
  document.querySelectorAll('#mtRel button').forEach(b=>{b.innerHTML=b.innerHTML.replace(/\s*PRO/,'')});
  const tw=$('mtTimeWrap'); tw&&tw.querySelector('.lb')&&(tw.querySelector('.lb').textContent=TL('상대 태어난 시간 (선택 · 알면 정확도 UP)','Their birth time (optional · more accurate)','相手の生まれた時刻(任意 · わかると精度UP)'));
  // AI 사용 횟수는 베타에서도 기기에 기록 (화면 표시용, 실제 한도는 서버가 지켜요)
  const _run=runAI; runAI=async function(prompt,box,btn,opts={}){const r=await _run(prompt,box,btn,{...opts,ticket:false}); if(r) store.set('soulcode.ai.'+todayKey(),aiUsed()+1); refreshQuota&&refreshQuota(); return r};
})();

/* ================= BOOT ================= */
if(window.soulLang&&window.soulLang!=='ko'&&window.applyContentI18n){try{applyContentI18n()}catch(e){console.warn('i18n content',e)}}
applySkin(store.get('soulcode.skin'));
if(profile && MBTI[profile.mbti]){ logVisit(); const t=store.get('soulcode.afterOnb'); if(t){store.del('soulcode.afterOnb');go(t)} else go('s-tarot'); }
initAI(); initCloud();
