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

export function wanted(y: number, m: number, d: number, myMbti: string): Wanted {
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
  const L = LOOKS[lackEl];
  const looks = [L[h % L.length], L[(h >>> 4) % L.length]];
  if (looks[0] === looks[1]) looks[1] = L[(h % L.length + 1) % L.length];
  const rel = (lackEl - myEl + 5) % 5;
  const reward = Math.min(99, Math.round(SAJU_S[rel] * 0.55 + 96 * 0.45) + (stemHap ? 4 : 0));
  return {
    myEl, myStem: SK_H[ds], counts, lackEl,
    el: lackEl, stem: SK_H[stemIdx] + EL[STEM_EL[stemIdx]].ko, stemHap,
    animal: ANIMAL[partnerYb], mbti,
    looks,
    habits: [LETTER[mbti[0]], LETTER[mbti[2]]],
    place: PLACE[lackEl][(h >>> 8) % 4],
    time: TIME[lackEl], day: EL[lackEl].day,
    warn: WARN[lackEl],
    lastSeen: `${SEASON[(h >>> 11) % 4]} · ${LAST_SEEN[(h >>> 13) % LAST_SEEN.length]}`,
    reward,
    caseNo: `${String(y).slice(2)}${String(h % 9000 + 1000)}`,
    seed: h,
    type: yang >= 4 ? 'egen' : yang <= 2 ? 'teto' : (myMbti[2] === 'F' ? 'teto' : 'egen'),
    yang,
    group: (mbti[1] === 'N' ? 'N' + mbti[2] : 'S' + mbti[3]) as 'NT' | 'NF' | 'SJ' | 'SP',
  };
}
