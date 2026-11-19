/**
 * 운명의 상대 수배전단: 내 사주(부족한 오행·일간·띠)와 MBTI로 "나를 채워줄 사람"의 몽타주를 만들어요.
 * 실제 사주 계산(오행 개수, 천간합, 육합)이 결과에 그대로 드러나도록 설계. AI 없이 결정적.
 */
import * as Manseryeok from 'manseryeok';

const SK = '갑을병정무기경신임계';
const BK = '자축인묘진사오미신유술해';
const SK_H = '甲乙丙丁戊己庚辛壬癸';
const STEM_EL = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
const BR_EL = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
export const EL = [
  { ko: '목', name: '나무', emoji: '🌳', color: '#3FB37F', day: '목요일' },
  { ko: '화', name: '불', emoji: '🔥', color: '#FF5A5F', day: '화요일' },
  { ko: '토', name: '흙', emoji: '⛰️', color: '#E0A43A', day: '토요일' },
  { ko: '금', name: '쇠', emoji: '💎', color: '#8E9AAF', day: '금요일' },
  { ko: '수', name: '물', emoji: '🌊', color: '#3D7BFF', day: '수요일' },
];
const ANIMAL = ['🐭 쥐띠', '🐮 소띠', '🐯 호랑이띠', '🐰 토끼띠', '🐲 용띠', '🐍 뱀띠', '🐴 말띠', '🐑 양띠', '🐵 원숭이띠', '🐔 닭띠', '🐶 개띠', '🐷 돼지띠'];

export const MBTI_BEST: Record<string, string> = {
  INTJ: 'ENFP', INTP: 'ENTJ', ENTJ: 'INTP', ENTP: 'INFJ', INFJ: 'ENFP', INFP: 'ENFJ', ENFJ: 'INFP', ENFP: 'INFJ',
  ISTJ: 'ESFP', ISFJ: 'ESTP', ESTJ: 'ISTP', ESFJ: 'ISFP', ISTP: 'ESTJ', ISFP: 'ESFJ', ESTP: 'ISFJ', ESFP: 'ISTJ',
};

const LOOKS = [
  ['키가 크고 팔다리가 김', '웃을 때 눈꼬리가 내려감', '초록 계열 옷이 잘 어울림', '손에 늘 텀블러', '걸음이 빠름', '목소리가 차분함'],
  ['웃을 때 눈이 사라짐', '리액션이 2배 큼', '볼이 잘 빨개짐', '밝은 색 옷을 좋아함', '손짓이 큼', '사진 찍을 때 표정 부자'],
  ['미소가 푸근함', '베이지·브라운 룩', '손이 따뜻함', '가방에 늘 간식', '말이 느긋함', '듣는 표정이 진지함'],
  ['이목구비가 또렷함', '셔츠가 칼각', '실버 액세서리', '시계를 꼭 참', '말투가 깔끔함', '자세가 바름'],
  ['눈빛이 깊음', '검정 옷이 많음', '목소리가 낮음', '이어폰을 늘 낌', '표정 변화가 적음', '새벽에 답장함'],
];
const PLACE = [
  ['동네 식물 가게', '공원 산책로', '독립서점', '등산로 입구'],
  ['공연장 맨 앞줄', '노래방', '핫플 팝업스토어', '헬스장'],
  ['단골 국밥집', '베이커리 줄', '캠핑장', '도서관 열람실'],
  ['카페 창가 자리', '전시회', '편집숍', '스터디 카페'],
  ['새벽 편의점', '바닷가', '심야 영화관', '수영장'],
];
const TIME = ['아침 8시쯤', '낮 1시쯤', '오후 4시쯤', '저녁 7시쯤', '밤 11시쯤'];
const WARN = [
  '고집 세게 나오면 져주는 척할 것',
  '급발진 주의, 5분 뒤 먼저 사과함',
  '결정이 느림, 재촉 금지',
  '팩트 폭격 주의, 상처받지 말 것',
  '답장이 늦어도 마음은 진심임',
];
const LETTER: Record<string, string> = {
  E: '처음 만나도 10년 지기처럼 말 검', I: '친해지면 말이 3배로 많아짐',
  N: '대화가 갑자기 우주로 감', S: '맛집 정보가 정확함',
  T: '고민 말하면 해결책부터 줌', F: '내 기분을 먼저 알아챔',
  J: '약속 장소를 미리 검색해 옴', P: '약속 30분 전에 장소를 바꿈',
};
const LAST_SEEN = ['친구의 친구 생일파티', '동아리 뒤풀이', '단톡방 공지 아래 댓글', '같은 버스 정류장', '회사 엘리베이터', '알고리즘이 띄운 릴스 댓글창', '줄 서는 디저트 가게', '조별과제 단톡방'];
const SEASON = ['이번 겨울', '2027년 봄', '2027년 여름', '2027년 가을'];
const SAJU_S = [76, 84, 66, 62, 90];

/* ───────── English ───────── */
export type Lang = 'ko' | 'en' | 'ja';
export const EL_EN = [
  { name: 'Wood', day: 'Thursday' },
  { name: 'Fire', day: 'Tuesday' },
  { name: 'Earth', day: 'Saturday' },
  { name: 'Metal', day: 'Friday' },
  { name: 'Water', day: 'Wednesday' },
];
const ANIMAL_EN = ['🐭 Rat', '🐮 Ox', '🐯 Tiger', '🐰 Rabbit', '🐲 Dragon', '🐍 Snake', '🐴 Horse', '🐑 Goat', '🐵 Monkey', '🐔 Rooster', '🐶 Dog', '🐷 Pig'];
const LOOKS_EN = [
  ['tall with long arms and legs', 'eyes turn down when smiling', 'looks great in green', 'always carries a tumbler', 'walks fast', 'calm, gentle voice'],
  ['eyes disappear when laughing', 'reacts 2x louder than anyone', 'blushes easily', 'loves bright colors', 'talks with their hands', 'a different face in every photo'],
  ['warm, cozy smile', 'beige & brown outfits', 'always has warm hands', 'snacks in the bag at all times', 'speaks slowly', 'listens with a serious face'],
  ['sharp, defined features', 'perfectly pressed shirts', 'silver accessories', 'never without a watch', 'neat way of talking', 'great posture'],
  ['deep, intense eyes', 'mostly wears black', 'low voice', 'earbuds always in', 'hard-to-read expression', 'replies at 3 a.m.'],
];
const PLACE_EN = [
  ['a local plant shop', 'a park walking trail', 'an indie bookstore', 'a hiking trailhead'],
  ['the front row of a concert', 'a karaoke room', 'a trendy pop-up store', 'the gym'],
  ['a favorite noodle spot', 'the bakery line', 'a campsite', 'the library reading room'],
  ['a cafe window seat', 'an art exhibition', 'a select shop', 'a study cafe'],
  ['a convenience store at dawn', 'the beach', 'a late-night movie', 'the swimming pool'],
];
const TIME_EN = ['around 8 a.m.', 'around 1 p.m.', 'around 4 p.m.', 'around 7 p.m.', 'around 11 p.m.'];
const WARN_EN = [
  'Stubborn. Pretend to lose the argument.',
  'Quick temper, but apologizes first in 5 minutes.',
  'Slow to decide. Do not rush them.',
  'Brutally honest. Do not take it personally.',
  'Replies late, but means every word.',
];
const LETTER_EN: Record<string, string> = {
  E: 'talks to strangers like old friends', I: 'talks 3x more once close',
  N: 'conversations suddenly go to outer space', S: 'knows every good restaurant',
  T: 'gives solutions before sympathy', F: 'notices your mood first',
  J: 'researches the meeting spot in advance', P: 'changes plans 30 minutes before',
};
const LAST_SEEN_EN = ["a friend of a friend's birthday party", 'a club after-party', 'replying under a group chat notice', 'the same bus stop', 'an office elevator', 'the comments of a Reel the algorithm showed you', 'a line at a dessert shop', 'a group project chat'];
const SEASON_EN = ['This winter', 'Spring 2027', 'Summer 2027', 'Fall 2027'];

/* ───────── 日本語 ───────── */
export const EL_JA = [
  { name: '木', day: '木曜日' },
  { name: '火', day: '火曜日' },
  { name: '土', day: '土曜日' },
  { name: '金', day: '金曜日' },
  { name: '水', day: '水曜日' },
];
const ANIMAL_JA = ['🐭 子(ねずみ)年', '🐮 丑(うし)年', '🐯 寅(とら)年', '🐰 卯(うさぎ)年', '🐲 辰(たつ)年', '🐍 巳(へび)年', '🐴 午(うま)年', '🐑 未(ひつじ)年', '🐵 申(さる)年', '🐔 酉(とり)年', '🐶 戌(いぬ)年', '🐷 亥(いのしし)年'];
const LOOKS_JA = [
  ['背が高くて手足が長い', '笑うと目尻が下がる', '緑系の服が似合う', 'いつもタンブラーを持ってる', '歩くのが速い', '声が落ち着いてる'],
  ['笑うと目がなくなる', 'リアクションが2倍大きい', 'すぐ顔が赤くなる', '明るい色の服が好き', '身振りが大きい', '写真の表情が豊か'],
  ['笑顔がほっこり', 'ベージュ・ブラウン系コーデ', '手があったかい', 'カバンにいつもおやつ', '話し方がのんびり', '聞くときの顔が真剣'],
  ['目鼻立ちがはっきり', 'シャツがいつもピシッと', 'シルバーアクセ', '腕時計は必須', '話し方がスマート', '姿勢がいい'],
  ['目つきがミステリアス', '黒い服が多い', '声が低い', 'いつもイヤホン', '表情があまり変わらない', '深夜に返信してくる'],
];
const PLACE_JA = [
  ['近所の植物屋さん', '公園の散歩道', '個人経営の本屋', '登山口'],
  ['ライブの最前列', 'カラオケ', '話題のポップアップ', 'ジム'],
  ['行きつけのラーメン屋', 'パン屋の行列', 'キャンプ場', '図書館の自習室'],
  ['カフェの窓際の席', '美術展', 'セレクトショップ', '自習カフェ'],
  ['深夜のコンビニ', '海辺', 'レイトショー', 'プール'],
];
const TIME_JA = ['朝8時ごろ', '昼1時ごろ', '午後4時ごろ', '夜7時ごろ', '夜11時ごろ'];
const WARN_JA = [
  '頑固なので負けたフリをすること',
  '急にキレるけど5分後に先に謝る',
  '決めるのが遅い、急かすの禁止',
  '正論パンチ注意、傷つかないこと',
  '返信が遅くても気持ちは本物',
];
const LETTER_JA: Record<string, string> = {
  E: '初対面でも10年来の友達みたいに話す', I: '仲良くなると3倍しゃべる',
  N: '会話が急に宇宙に飛ぶ', S: 'おいしい店情報が正確',
  T: '相談すると解決策から言う', F: '気分の変化にすぐ気づく',
  J: '待ち合わせ場所を事前に調べてくる', P: '30分前に場所を変える',
};
const LAST_SEEN_JA = ['友達の友達の誕生日会', 'サークルの打ち上げ', 'グループLINEのお知らせの下', '同じバス停', '会社のエレベーター', 'おすすめに出たリールのコメント欄', '行列のできるスイーツ店', 'グループ課題のLINE'];
const SEASON_JA = ['この冬', '2027年春', '2027年夏', '2027年秋'];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export type Wanted = {
  myEl: number; myStem: string; counts: number[]; lackEl: number;
  el: number; stem: string; stemHap: boolean; animal: string; mbti: string;
  looks: string[]; habits: string[]; place: string; time: string; day: string;
  warn: string; lastSeen: string; reward: number; caseNo: string; seed: number;
  /** 테토(직진·리드형) / 에겐(다정·섬세형): 내 사주 음양 균형을 채워주는 쪽 */
  type: 'teto' | 'egen'; yang: number; group: 'NT' | 'NF' | 'SJ' | 'SP';
};

export function wanted(y: number, m: number, d: number, myMbti: string, lang: Lang = 'ko'): Wanted {
  const en = lang === 'en', ja = lang === 'ja';
  const pick = <T,>(ko: T, e: T, j: T) => (ja ? j : en ? e : ko);
  const o = Manseryeok.calculateFourPillars({ year: y, month: m, day: d, hour: 12, minute: 0, trueSolarTime: { longitude: 126.978 }, dayBoundary: 'jasi' }).toObject() as unknown as Record<string, string>;
  const P = ['year', 'month', 'day'].map((k) => ({ s: SK.indexOf(o[k][0]), b: BK.indexOf(o[k][1]) }));
  const counts = [0, 0, 0, 0, 0];
  P.forEach((p) => { counts[STEM_EL[p.s]]++; counts[BR_EL[p.b]]++; });
  const yang = P.reduce((n, p) => n + (p.s % 2 === 0 ? 1 : 0) + (p.b % 2 === 0 ? 1 : 0), 0);
  const ds = P[2].s, myEl = STEM_EL[ds];
  // 부족한 오행: 가장 적은 것, 동점이면 나를 생해주는 오행(인성) 우선
  const min = Math.min(...counts);
  const cands = counts.map((c, i) => (c === min ? i : -1)).filter((i) => i >= 0);
  const gen = (myEl + 4) % 5;
  const lackEl = cands.includes(gen) ? gen : cands[0];
  // 상대 일간: 천간합 짝이 부족한 오행이면 그걸, 아니면 부족한 오행의 같은 음양
  const hapStem = (ds + 5) % 10;
  const stemIdx = STEM_EL[hapStem] === lackEl ? hapStem : lackEl * 2 + (ds % 2);
  const stemHap = stemIdx === hapStem;
  const yb = P[0].b, partnerYb = (13 - yb) % 12; // 육합
  const mbti = MBTI_BEST[myMbti] || 'ENFP';
  const h = hash(`${y}-${m}-${d}-${myMbti}`);
  const L = pick(LOOKS, LOOKS_EN, LOOKS_JA)[lackEl];
  const looks = [L[h % L.length], L[(h >>> 4) % L.length]];
  if (looks[0] === looks[1]) looks[1] = L[(h % L.length + 1) % L.length];
  const rel = (lackEl - myEl + 5) % 5;
  const reward = Math.min(99, Math.round(SAJU_S[rel] * 0.55 + 96 * 0.45) + (stemHap ? 4 : 0));
  return {
    myEl, myStem: SK_H[ds], counts, lackEl,
    el: lackEl, stem: pick(SK_H[stemIdx] + EL[STEM_EL[stemIdx]].ko, `${SK_H[stemIdx]} (${EL_EN[STEM_EL[stemIdx]].name})`, `${SK_H[stemIdx]}(${EL_JA[STEM_EL[stemIdx]].name})`), stemHap,
    animal: pick(ANIMAL, ANIMAL_EN, ANIMAL_JA)[partnerYb], mbti,
    looks,
    habits: ((L2) => [L2[mbti[0]], L2[mbti[2]]])(pick(LETTER, LETTER_EN, LETTER_JA)),
    place: pick(PLACE, PLACE_EN, PLACE_JA)[lackEl][(h >>> 8) % 4],
    time: pick(TIME, TIME_EN, TIME_JA)[lackEl], day: pick(EL[lackEl].day, EL_EN[lackEl].day, EL_JA[lackEl].day),
    warn: pick(WARN, WARN_EN, WARN_JA)[lackEl],
    lastSeen: `${pick(SEASON, SEASON_EN, SEASON_JA)[(h >>> 11) % 4]} · ${pick(LAST_SEEN, LAST_SEEN_EN, LAST_SEEN_JA)[(h >>> 13) % LAST_SEEN.length]}`,
    reward,
    caseNo: `${String(y).slice(2)}${String(h % 9000 + 1000)}`,
    seed: h,
    type: yang >= 4 ? 'egen' : yang <= 2 ? 'teto' : (myMbti[2] === 'F' ? 'teto' : 'egen'),
    yang,
    group: (mbti[1] === 'N' ? 'N' + mbti[2] : 'S' + mbti[3]) as 'NT' | 'NF' | 'SJ' | 'SP',
  };
}
