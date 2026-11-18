/**
 * 운명의 상대 몽타주: 캔버스로 그리는 웹툰풍 반신 초상 일러스트.
 * 오행(눈매·눈동자색·소품)·MBTI(표정·안경)·성별(헤어)·해시(머리색·피부톤·헤어 변형)로 조합해요.
 * 실제 사람 사진이 아닌 오리지널 일러스트예요.
 */
export type Gender = 'f' | 'm';
const LINE = '#3A2530';
const SKIN = ['#FFE6D5', '#FADCC6', '#F5D0B5', '#FFE1CF'];
const HAIR = ['#2A1E22', '#3D2A26', '#5B3A2C', '#23202E', '#6E4A36'];
const IRIS = ['#6B4630', '#8A4A36', '#8A6236', '#4A4660', '#3A5684'];

type Pt = [number, number];

function stroke(c: CanvasRenderingContext2D, lw = 3, col = LINE) {
  c.strokeStyle = col; c.lineWidth = lw; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke();
}
function fillStroke(c: CanvasRenderingContext2D, fill: string | CanvasGradient | null, lw = 3) {
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (lw) stroke(c, lw);
}
function ell(c: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, fill: string | CanvasGradient | null, lw = 3, rot = 0) {
  c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); fillStroke(c, fill, lw);
}
function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k))));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}
/** 점들을 부드러운 곡선으로 잇기 (bend: 바깥쪽으로 휘는 정도) */
function curveThrough(c: CanvasRenderingContext2D, pts: Pt[], bend = 0) {
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1], [qx, qy] = pts[i];
    const mx = (px + qx) / 2, my = (py + qy) / 2, dx = qx - px, dy = qy - py, L = Math.hypot(dx, dy) || 1;
    c.quadraticCurveTo(mx - (dy / L) * bend, my + (dx / L) * bend, qx, qy);
  }
}

/** 앞머리 끝선: 오른쪽→왼쪽, 덩어리 n개, 끝(tip)과 사이(gap)의 높이 */
function fringe(xr: number, xl: number, sideY: number, n: number, tip: (t: number) => number, depth: number): Pt[] {
  const pts: Pt[] = [[xr, sideY]];
  for (let i = 0; i <= n * 2; i++) {
    const t = i / (n * 2), x = xr + (xl - xr) * (0.08 + t * 0.84);
    pts.push([x, tip(t) - (i % 2 ? 0 : depth)]);
  }
  pts.push([xl, sideY]); return pts;
}
const arch = (mid: number, edge: number) => (t: number) => edge + (mid - edge) * Math.sin(t * Math.PI);
// 앞머리: [왼쪽 관자놀이 → 정수리 → 오른쪽 관자놀이] 위에 오른쪽→왼쪽으로 끝선
const FRONT_F: { tips: Pt[]; bend: number }[] = [
  { tips: fringe(74, -74, 20, 6, arch(-26, -6), 12), bend: 3 }, // 시스루뱅
  { tips: [[76, 50], [64, 0], [40, -40], [8, -64], [-8, -64], [-40, -40], [-64, 0], [-76, 50]], bend: -7 }, // 커튼뱅(가르마)
  { tips: [[76, 40], [66, -4], [46, -40], [14, -58], [-14, -46], [-42, -26], [-62, -6], [-76, 24]], bend: -6 }, // 옆으로 넘긴 앞머리
];
const FRONT_M: { tips: Pt[]; bend: number }[] = [
  { tips: [[72, 4], [64, -30], [40, -56], [8, -58], [-16, -44], [-30, -22], [-26, -8], [-44, -24], [-60, -18], [-72, 4]], bend: -5 }, // 쉼표머리
  { tips: [[72, 4], [62, -30], [48, -22], [34, -48], [14, -26], [-8, -46], [-26, -20], [-46, -34], [-60, -14], [-72, 4]], bend: -6 }, // 시스루 댄디
  { tips: [[72, 0], [62, -28], [44, -30], [30, -50], [14, -26], [-4, -44], [-20, -22], [-36, -38], [-52, -20], [-72, 0]], bend: -4 }, // 내린 머리 (사이드)
  { tips: [[74, 14], [58, -20], [32, -54], [5, -66], [-5, -66], [-32, -54], [-58, -20], [-74, 14]], bend: -8 }, // 가르마펌
];

function hairPath(c: CanvasRenderingContext2D, tips: Pt[], bend: number, crown: number, flare = 18) {
  const R = tips[0], L = tips[tips.length - 1];
  c.beginPath(); c.moveTo(L[0], L[1]);
  c.bezierCurveTo(L[0] - flare, crown + 34, -56, crown, 0, crown);
  c.bezierCurveTo(56, crown, R[0] + flare, crown + 34, R[0], R[1]);
  curveThrough(c, tips, bend);
  c.closePath();
}

function paintHair(c: CanvasRenderingContext2D, col: string, top: number, bottom: number) {
  const g = c.createLinearGradient(0, top, 0, bottom);
  g.addColorStop(0, shade(col, 0.18)); g.addColorStop(0.5, col); g.addColorStop(1, shade(col, -0.25));
  c.fillStyle = g; c.fill();
  stroke(c, 3);
}
/** 머리 윤기(엔젤링)와 결 */
function hairShine(c: CanvasRenderingContext2D, y: number, w: number) {
  c.save(); c.clip(); c.lineCap = 'round';
  c.globalAlpha = 0.28; c.strokeStyle = LINE; c.lineWidth = 1.5;
  for (let i = -4; i <= 4; i++) { c.beginPath(); c.moveTo(i * 10, y - 46); c.quadraticCurveTo(i * 14, y + 10, i * 17, y + 70); c.stroke(); }
  c.globalAlpha = 0.4; c.strokeStyle = '#fff';
  for (const [a0, a1, lw] of [[-2.6, -2.15, 7], [-2.05, -1.55, 8], [-1.45, -0.95, 7], [-0.85, -0.55, 5]]) { c.lineWidth = lw; c.beginPath(); c.ellipse(0, y + 34, w * 0.42, 34, 0, a0, a1); c.stroke(); }
  c.restore();
}

function hairBack(c: CanvasRenderingContext2D, v: number, col: string) {
  c.beginPath();
  if (v === 0) { c.moveTo(-76, -40); c.bezierCurveTo(-98, -150, 98, -150, 76, -40); c.bezierCurveTo(90, 60, 96, 140, 104, 200); c.lineTo(-104, 200); c.bezierCurveTo(-96, 140, -90, 60, -76, -40); } // 긴 생머리
  else if (v === 1) { c.moveTo(-76, -40); c.bezierCurveTo(-98, -150, 98, -150, 76, -40); for (let y = -20; y < 200; y += 44) c.quadraticCurveTo(110, y + 22, 92, y + 44); c.lineTo(-92, 200); for (let y = 200; y > -20; y -= 44) c.quadraticCurveTo(-110, y - 22, -92, y - 44); } // 웨이브
  else if (v === 2) { c.moveTo(-76, -40); c.bezierCurveTo(-98, -150, 98, -150, 76, -40); c.bezierCurveTo(92, 20, 92, 60, 84, 78); c.quadraticCurveTo(0, 96, -84, 78); c.bezierCurveTo(-92, 60, -92, 20, -76, -40); } // 단발
  else if (v === 3) { c.moveTo(-74, -40); c.bezierCurveTo(-96, -150, 96, -150, 74, -40); c.lineTo(70, 40); c.lineTo(-70, 40); c.closePath(); c.moveTo(84, -70); c.bezierCurveTo(140, -40, 120, 100, 96, 150); c.bezierCurveTo(90, 80, 92, 0, 70, -50); } // 하이포니테일
  else if (v === 4) { c.moveTo(-74, -40); c.bezierCurveTo(-96, -150, 96, -150, 74, -40); c.lineTo(70, 40); c.lineTo(-70, 40); c.closePath(); c.moveTo(34, -122); c.arc(0, -128, 34, 0, Math.PI * 2); } // 똥머리
  else { c.moveTo(-76, -40); c.bezierCurveTo(-98, -150, 98, -150, 76, -40); c.lineTo(88, 40); c.lineTo(80, 70); c.lineTo(94, 120); c.lineTo(-94, 120); c.lineTo(-80, 70); c.lineTo(-88, 40); c.closePath(); } // 레이어드 중단발
  paintHair(c, col, -150, 200);
}

function eye(c: CanvasRenderingContext2D, s: number, el: number, g: Gender, iris: string, smile: boolean) {
  const w = g === 'f' ? 19 : 17, h = g === 'f' ? 14 : 10.5;
  // 눈꼬리: 금=올라감(고양이), 수=처짐(강아지)
  const tilt = el === 3 ? -0.16 : el === 4 ? 0.14 : el === 1 ? -0.06 : 0;
  c.save(); c.translate(27 * s, 12); c.scale(s, 1); c.rotate(tilt);
  if (smile) {
    // 눈웃음
    c.beginPath(); c.moveTo(-w, 3); c.quadraticCurveTo(0, -h - 4, w, 3); stroke(c, 4.5, '#2A1A22');
    if (g === 'f') { c.beginPath(); c.moveTo(w - 1, 1); c.lineTo(w + 7, -5); stroke(c, 2.5, '#2A1A22'); }
    c.restore(); return;
  }
  // 흰자 (아몬드)
  c.beginPath(); c.moveTo(-w, 2); c.bezierCurveTo(-w * 0.5, -h, w * 0.6, -h - 2, w, -1); c.bezierCurveTo(w * 0.5, h * 0.8, -w * 0.5, h * 0.8, -w, 2); c.closePath();
  c.fillStyle = '#fff'; c.fill();
  c.save(); c.clip();
  const ir = g === 'f' ? 12 : 9.5;
  const gr = c.createRadialGradient(0, 3, 1, 0, 0, ir);
  gr.addColorStop(0, shade(iris, 0.45)); gr.addColorStop(0.55, iris); gr.addColorStop(1, shade(iris, -0.55));
  ell(c, 1, 1, ir, ir + 1, gr, 0);
  ell(c, 1, 1, ir * 0.42, ir * 0.5, '#1A1018', 0);
  c.fillStyle = 'rgba(40,20,30,.22)'; c.fillRect(-w, -h - 4, w * 2, 6); // 윗꺼풀 그림자
  c.restore();
  ell(c, -3, -3, 3.2, 3.6, '#fff', 0); ell(c, 5, 5, 1.6, 1.6, 'rgba(255,255,255,.85)', 0);
  // 윗 속눈썹 라인 (두껍게)
  c.beginPath(); c.moveTo(-w - 1, 3); c.bezierCurveTo(-w * 0.5, -h - 1, w * 0.6, -h - 3, w + 2, -2); stroke(c, g === 'f' ? 4.5 : 3.6, '#2A1A22');
  if (g === 'f') { c.beginPath(); c.moveTo(w, -1); c.lineTo(w + 7, -7); stroke(c, 2.6, '#2A1A22'); c.beginPath(); c.moveTo(w - 4, -5); c.lineTo(w + 1, -11); stroke(c, 2, '#2A1A22'); }
  // 쌍꺼풀 라인
  c.beginPath(); c.moveTo(-w * 0.4, -h - 3); c.quadraticCurveTo(w * 0.3, -h - 6, w * 0.9, -h + 1); stroke(c, 1.4, 'rgba(58,37,48,.6)');
  // 아래 라인
  c.beginPath(); c.moveTo(-w * 0.3, h * 0.65); c.quadraticCurveTo(w * 0.3, h * 0.8, w * 0.8, h * 0.2); stroke(c, 1.2, 'rgba(58,37,48,.45)');
  c.restore();
}


/* ───────── 남자: 청량 로맨스 웹툰 남주 스타일 (얇은 선, 플랫 채색, 긴 목, 눈을 덮는 앞머리) ───────── */
const ML = '#1E1A1C';
const M_SKIN = ['#F8E0D3', '#F5D8C8', '#F1D0BE', '#FAE4D8'];
const M_HAIR = ['#1F1D22', '#2B2420', '#3A2E28', '#26272F', '#4A3A30'];
const M_IRIS = ['#5E5A58', '#6A5048', '#6E6250', '#5C5E66', '#4E5A6C'];
const M_BANGS: { tips: Pt[]; bend: number }[] = [
  { tips: [[62, 2], [56, 18], [48, -14], [38, 26], [28, -12], [16, 30], [4, -16], [-8, 26], [-20, -12], [-32, 20], [-44, -10], [-54, 12], [-62, -2]], bend: 5 }, // 눈 덮는 내린 머리
  { tips: [[62, 22], [56, 4], [44, -12], [30, -30], [18, -16], [10, -42], [2, 4], [-6, -44], [-16, -14], [-28, -30], [-42, -12], [-54, 4], [-62, 20]], bend: -6 }, // 가르마 + 내려온 가닥
  { tips: [[62, 8], [56, -20], [40, -40], [20, -34], [4, -14], [-8, 12], [-14, 26], [-22, 4], [-32, 18], [-42, -4], [-54, 4], [-62, 0]], bend: -5 }, // 옆으로 넘긴 쉼표
  { tips: [[62, 4], [54, 14], [46, -10], [36, 16], [24, -10], [12, 20], [0, -12], [-12, 16], [-24, -10], [-36, 14], [-48, -8], [-56, 8], [-62, 0]], bend: 7 }, // 웨이브펌
];

function mLine(c: CanvasRenderingContext2D, lw = 2.2, col = ML) { c.strokeStyle = col; c.lineWidth = lw; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); }
function mHairPath(c: CanvasRenderingContext2D, tips: Pt[], bend: number) {
  const R = tips[0], L = tips[tips.length - 1];
  c.beginPath(); c.moveTo(L[0], L[1]);
  c.bezierCurveTo(L[0] - 10, -60, -52, -118, 6, -118);
  c.bezierCurveTo(58, -118, R[0] + 12, -64, R[0], R[1]);
  curveThrough(c, tips, bend); c.closePath();
}

function drawMale(c: CanvasRenderingContext2D, o: { el: number; elColor: string; mbti: string; seed: number }) {
  const { el, mbti, seed } = o;
  const skin = M_SKIN[seed % M_SKIN.length], hair = M_HAIR[(seed >>> 3) % M_HAIR.length], iris = M_IRIS[el] ?? M_IRIS[0];
  const style = (seed >>> 6) % M_BANGS.length;
  const E = mbti[0] === 'E', glasses = mbti[1] === 'N' && mbti[2] === 'T';
  const hoodie = (mbti[1] === 'S' && mbti[3] === 'P') || (mbti[1] === 'N' && mbti[2] === 'F');
  const cloth = shade(o.elColor, 0.3);

  // 상체 (넓은 어깨)
  if (hoodie) { c.beginPath(); c.ellipse(0, 132, 74, 30, 0, 0, 7); c.fillStyle = shade(o.elColor, 0.1); c.fill(); mLine(c); }
  c.beginPath(); c.moveTo(-170, 260); c.bezierCurveTo(-162, 170, -116, 140, -40, 128); c.lineTo(40, 128); c.bezierCurveTo(116, 140, 162, 170, 170, 260); c.closePath();
  c.fillStyle = hoodie ? cloth : '#FBFAF7'; c.fill(); mLine(c);
  // 목 (길고 슬림)
  c.beginPath(); c.moveTo(-24, 50); c.lineTo(-26, 136); c.quadraticCurveTo(0, 146, 26, 136); c.lineTo(24, 60); c.closePath(); c.fillStyle = skin; c.fill(); mLine(c);
  c.save(); c.clip(); c.fillStyle = 'rgba(190,120,120,.22)'; c.beginPath(); c.moveTo(-30, 60); c.lineTo(30, 60); c.lineTo(30, 98); c.quadraticCurveTo(0, 86, -30, 104); c.fill(); c.restore();
  c.beginPath(); c.moveTo(-12, 100); c.quadraticCurveTo(-8, 124, 4, 140); mLine(c, 1.2, 'rgba(30,26,28,.45)');
  if (hoodie) {
    // 후드 칼라 + 끈
    c.beginPath(); c.moveTo(-60, 132); c.bezierCurveTo(-40, 162, 40, 162, 60, 132); mLine(c, 2.2);
    c.beginPath(); c.moveTo(-26, 136); c.quadraticCurveTo(0, 150, 26, 136); c.lineTo(24, 146); c.quadraticCurveTo(0, 156, -24, 146); c.closePath(); c.fillStyle = '#fff'; c.fill(); mLine(c, 1.4);
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(18 * s, 156); c.quadraticCurveTo(22 * s, 196, 16 * s, 236); mLine(c, 1.8); }
  } else {
    // 셔츠: 이너 티 + 열린 칼라
    c.beginPath(); c.moveTo(-26, 146); c.quadraticCurveTo(0, 176, 26, 146); c.lineTo(20, 190); c.lineTo(-20, 190); c.closePath(); c.fillStyle = cloth; c.fill(); mLine(c, 1.6);
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(24 * s, 132); c.lineTo(48 * s, 140); c.lineTo(66 * s, 182); c.lineTo(30 * s, 168); c.closePath(); c.fillStyle = '#fff'; c.fill(); mLine(c); }
    c.beginPath(); c.moveTo(-30, 168); c.lineTo(-12, 260); mLine(c, 1.6); ell(c, -20, 214, 4, 4, '#fff', 0); c.beginPath(); c.arc(-20, 214, 4, 0, 7); mLine(c, 1.4);
  }
  // 머리 전체를 살짝 넓게 (얼굴 비율)
  c.save(); c.scale(1.13, 0.96);
  // 뒷머리
  c.beginPath(); c.moveTo(-56, 30); c.bezierCurveTo(-68, -40, -56, -112, 4, -114); c.bezierCurveTo(64, -112, 70, -40, 56, 30); c.closePath(); c.fillStyle = shade(hair, -0.2); c.fill();
  // 귀
  for (const s of [-1, 1]) {
    c.beginPath(); c.moveTo(50 * s, -4); c.bezierCurveTo(66 * s, -14, 70 * s, 10, 62 * s, 26); c.quadraticCurveTo(56 * s, 38, 48 * s, 36); c.fillStyle = skin; c.fill(); mLine(c, 2);
    c.beginPath(); c.moveTo(56 * s, 2); c.quadraticCurveTo(64 * s, 10, 56 * s, 24); mLine(c, 1.2);
  }
  // 얼굴 (길고 각진 턱선)
  c.beginPath(); c.moveTo(-52, -40);
  c.bezierCurveTo(-56, 8, -52, 34, -40, 54); c.lineTo(-10, 82); c.quadraticCurveTo(0, 88, 10, 82); c.lineTo(40, 54);
  c.bezierCurveTo(52, 34, 56, 8, 54, -40); c.bezierCurveTo(50, -100, -50, -100, -54, -40);
  c.fillStyle = skin; c.fill(); mLine(c);
  // 앞머리 그림자
  c.save(); c.clip(); { const sg = c.createLinearGradient(0, -40, 0, 20); sg.addColorStop(0, 'rgba(160,100,100,.22)'); sg.addColorStop(1, 'rgba(160,100,100,0)'); c.fillStyle = sg; c.fillRect(-60, -60, 120, 80); } c.restore();
  // 볼 홍조 (아주 살짝)
  for (const s of [-1, 1]) { const b = c.createRadialGradient(30 * s, 40, 1, 30 * s, 40, 16); b.addColorStop(0, 'rgba(240,130,140,.28)'); b.addColorStop(1, 'rgba(240,130,140,0)'); c.fillStyle = b; c.beginPath(); c.ellipse(30 * s, 40, 18, 10, 0, 0, 7); c.fill(); }

  // 눈썹
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(10 * s, -6); c.quadraticCurveTo(26 * s, el === 4 ? -8 : -12, 42 * s, el === 4 ? -4 : -9); mLine(c, 3.2, shade(hair, -0.1)); }
  // 눈: 가늘고 긴 눈 + 진한 윗라인
  const tilt = el === 3 ? -0.12 : el === 4 ? 0.1 : 0;
  for (const s of [-1, 1]) {
    c.save(); c.translate(25 * s, 12); c.scale(s, 1); c.rotate(tilt);
    if (E && el === 1) { c.beginPath(); c.moveTo(-15, 2); c.quadraticCurveTo(0, -8, 16, 0); mLine(c, 3.2); c.restore(); continue; }
    c.scale(1.12, 1.12); c.beginPath(); c.moveTo(-15, 1); c.bezierCurveTo(-8, -8, 8, -9, 17, -2); c.bezierCurveTo(10, 6, -6, 7, -15, 1); c.closePath();
    c.fillStyle = '#fff'; c.fill(); c.save(); c.clip();
    const g = c.createRadialGradient(1, 2, 1, 1, 0, 9); g.addColorStop(0, shade(iris, 0.4)); g.addColorStop(1, shade(iris, -0.45));
    c.fillStyle = g; c.beginPath(); c.ellipse(1, 0, 8, 9, 0, 0, 7); c.fill();
    c.fillStyle = '#141014'; c.beginPath(); c.ellipse(1, 0, 3.6, 4.4, 0, 0, 7); c.fill();
    c.fillStyle = 'rgba(30,20,25,.35)'; c.fillRect(-16, -10, 34, 6);
    c.restore();
    ell(c, -2, -2, 2.2, 2.4, '#fff', 0);
    c.beginPath(); c.moveTo(-16, 2); c.bezierCurveTo(-8, -9, 8, -10, 19, -3); mLine(c, 3.4);
    c.beginPath(); c.moveTo(-6, -11); c.quadraticCurveTo(6, -13, 15, -8); mLine(c, 1.1, 'rgba(30,26,28,.55)');
    c.beginPath(); c.moveTo(-2, 7); c.quadraticCurveTo(8, 7, 14, 3); mLine(c, 1, 'rgba(30,26,28,.4)');
    c.restore();
  }
  // 코: 한쪽 콧대 선 + 콧볼
  c.beginPath(); c.moveTo(-6, 16); c.quadraticCurveTo(-10, 34, -4, 42); mLine(c, 1.5);
  c.beginPath(); c.moveTo(-2, 44); c.quadraticCurveTo(3, 46, 7, 43); mLine(c, 1.4, 'rgba(30,26,28,.6)');
  // 입
  if (E) {
    c.beginPath(); c.moveTo(-14, 58); c.quadraticCurveTo(0, 62, 15, 56); c.quadraticCurveTo(2, 68, -14, 58); c.closePath(); c.fillStyle = '#fff'; c.fill(); mLine(c, 1.8);
    c.beginPath(); c.moveTo(-6, 70); c.quadraticCurveTo(0, 71, 6, 70); mLine(c, 1, 'rgba(30,26,28,.4)');
  } else {
    c.beginPath(); c.moveTo(-12, 60); c.quadraticCurveTo(2, 64, 14, 57); mLine(c, 1.8);
    c.beginPath(); c.moveTo(14, 57); c.lineTo(17, 54); mLine(c, 1.4);
  }
  // 앞머리 (메인)
  const B = M_BANGS[style];
  mHairPath(c, B.tips, B.bend);
  const hg = c.createLinearGradient(0, -132, 0, 20); hg.addColorStop(0, shade(hair, 0.22)); hg.addColorStop(0.45, hair); hg.addColorStop(1, shade(hair, -0.15));
  c.fillStyle = hg; c.fill(); mLine(c);
  // 머리결 (가닥 선)
  mHairPath(c, B.tips, B.bend); c.save(); c.clip();
  for (const i of [-4, -2.5, -1, 0.5, 2, 3.5]) { c.beginPath(); c.moveTo(i * 8, -104); c.bezierCurveTo(i * 12 - 6, -60, i * 14, -20, i * 13 + 4, 24); mLine(c, 1.2, 'rgba(0,0,0,.28)'); }
  c.globalAlpha = 0.22; c.strokeStyle = '#fff'; c.lineWidth = 10; c.beginPath(); c.ellipse(-6, -76, 44, 18, -0.15, Math.PI * 1.1, Math.PI * 1.75); c.stroke();
  c.restore();
  // 삐친 머리 (잔머리)
  for (const [x0, y0, x1, y1, x2, y2] of [[-20, -116, -34, -136, -50, -128], [14, -117, 28, -138, 42, -130], [48, -92, 66, -100, 72, -84]]) {
    c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo(x1, y1, x2, y2); mLine(c, 1.5);
  }
  // 안경 (NT)
  if (glasses) {
    for (const s of [-1, 1]) { c.beginPath(); c.roundRect(25 * s - 22, -1, 44, 28, 10); mLine(c, 2.4, '#1E1A1C'); }
    c.beginPath(); c.moveTo(-5, 8); c.quadraticCurveTo(0, 5, 5, 8); mLine(c, 2.2);
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(47 * s, 8); c.lineTo(55 * s, 4); mLine(c, 2.2); }
  }
  // 소품: 금=실버 링 귀걸이, 수=점 피어싱
  if (el === 3) { c.beginPath(); c.arc(-58, 36, 5, 0, 7); mLine(c, 2, '#AEB6C6'); }
  if (el === 4) ell(c, -56, 32, 2.6, 2.6, '#fff', 1.4);
  // 눈밑 점 (해시)
  if (seed % 3 === 0) ell(c, 34, 26, 1.6, 1.6, ML, 0);
  c.restore();
}

export function drawMontage(c: CanvasRenderingContext2D, x: number, y: number, scale: number, o: { gender: Gender; el: number; elColor: string; mbti: string; seed: number }) {
  const { gender: g, el, mbti, seed } = o;
  const skin = SKIN[seed % SKIN.length];
  const hair = el === 1 && seed % 3 === 0 ? '#7A3B2A' : HAIR[(seed >>> 3) % HAIR.length];
  const v = (seed >>> 6) % 6;
  const E = mbti[0] === 'E';
  const smileEyes = el === 1 && E;
  c.save(); c.translate(x, y); c.scale(scale, scale);
  if (g === 'm') { drawMale(c, o); c.restore(); return; }

  if (g === 'f') hairBack(c, v, hair);

  // 옷: 셔츠 칼라 + 니트
  const cloth = c.createLinearGradient(0, 100, 0, 200); cloth.addColorStop(0, shade(o.elColor, 0.35)); cloth.addColorStop(1, shade(o.elColor, 0.05));
  c.beginPath(); c.moveTo(-140, 220); c.bezierCurveTo(-136, 150, -100, 124, -34, 108); c.lineTo(34, 108); c.bezierCurveTo(100, 124, 136, 150, 140, 220); c.closePath(); fillStroke(c, cloth, 3);
  // 목
  const nw = g === 'f' ? 14 : 18;
  c.beginPath(); c.moveTo(-nw, 62); c.lineTo(-nw - 2, 112); c.quadraticCurveTo(0, 122, nw + 2, 112); c.lineTo(nw, 62); c.closePath(); fillStroke(c, skin, 3);
  c.save(); c.clip(); c.fillStyle = 'rgba(180,110,110,.25)'; c.beginPath(); c.ellipse(0, 66, 30, 16, 0, 0, Math.PI * 2); c.fill(); c.restore();
  // 칼라
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(0, 122); c.lineTo(22 * s, 100); c.lineTo(40 * s, 112); c.lineTo(14 * s, 136); c.closePath(); fillStroke(c, '#fff', 2.6); }

  // 귀
  for (const s of [-1, 1]) ell(c, 59 * s, 14, g === 'f' ? 8 : 7, 13, skin, 3);
  // 얼굴 (V라인)
  c.beginPath();
  c.moveTo(-60, -40);
  c.bezierCurveTo(-64, 14, -54, 44, -30, 66);
  c.quadraticCurveTo(-12, 80, 0, 80);
  c.quadraticCurveTo(12, 80, 30, 66);
  c.bezierCurveTo(54, 44, 64, 14, 60, -40);
  c.bezierCurveTo(56, -96, -56, -96, -60, -40);
  const fg = c.createLinearGradient(0, -80, 0, 80); fg.addColorStop(0, skin); fg.addColorStop(1, shade(skin, -0.04));
  fillStroke(c, fg, 3);

  // 볼터치 + 사선
  for (const s of [-1, 1]) {
    const bl = c.createRadialGradient(34 * s, 36, 1, 34 * s, 36, 18); bl.addColorStop(0, 'rgba(255,120,140,.55)'); bl.addColorStop(1, 'rgba(255,120,140,0)');
    c.fillStyle = bl; c.beginPath(); c.ellipse(34 * s, 36, 20, 12, 0, 0, Math.PI * 2); c.fill();
    for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(26 * s + i * 6 * s - 3, 40); c.lineTo(26 * s + i * 6 * s + 3, 32); stroke(c, 1.4, 'rgba(230,90,110,.6)'); }
  }

  const iris = IRIS[el] ?? IRIS[0];
  for (const s of [-1, 1]) eye(c, s, el, g, iris, smileEyes);

  // 눈썹
  const bc = shade(hair, -0.1);
  for (const s of [-1, 1]) {
    c.beginPath();
    c.moveTo(13 * s, -10); c.quadraticCurveTo(28 * s, -18, 42 * s, -12); stroke(c, 3, bc);
  }
  // 코: 콧대 그림자 + 코끝
  c.beginPath(); c.moveTo(3, 18); c.quadraticCurveTo(6, 32, 1, 40); stroke(c, 1.6, 'rgba(160,90,90,.55)');
  c.beginPath(); c.moveTo(-4, 41); c.quadraticCurveTo(0, 43, 4, 41); stroke(c, 2, 'rgba(120,60,60,.7)');
  ell(c, -2, 36, 2.5, 1.5, 'rgba(255,255,255,.7)', 0);

  // 입
  if (E) {
    c.beginPath(); c.moveTo(-13, 54); c.quadraticCurveTo(0, 58, 13, 54); c.quadraticCurveTo(0, 70, -13, 54); c.closePath();
    fillStroke(c, '#B8404F', 2.4);
    c.save(); c.clip(); c.fillStyle = '#fff'; c.fillRect(-14, 52, 28, 6); c.fillStyle = '#FF8A9A'; c.beginPath(); c.ellipse(0, 67, 8, 4, 0, 0, Math.PI * 2); c.fill(); c.restore();
  } else if (g === 'f') {
    c.beginPath(); c.moveTo(-10, 56); c.quadraticCurveTo(-4, 52, 0, 54); c.quadraticCurveTo(4, 52, 10, 56); c.quadraticCurveTo(0, 64, -10, 56); c.closePath();
    const lg = c.createLinearGradient(0, 52, 0, 64); lg.addColorStop(0, '#F06A84'); lg.addColorStop(1, '#FF9DAE');
    fillStroke(c, lg, 0); c.beginPath(); c.moveTo(-10, 56); c.quadraticCurveTo(0, 58, 10, 56); stroke(c, 1.8, '#B8404F');
    ell(c, 3, 59, 2.5, 1.2, 'rgba(255,255,255,.8)', 0);
  } else {
    c.beginPath(); c.moveTo(-10, 56); c.quadraticCurveTo(0, 60, 11, 55); stroke(c, 2.4, '#8A3A44');
    c.beginPath(); c.moveTo(-4, 63); c.quadraticCurveTo(0, 64, 4, 63); stroke(c, 1.2, 'rgba(160,90,90,.5)');
  }

  // 앞머리
  const fr = g === 'f' ? FRONT_F[v % FRONT_F.length] : FRONT_M[v % FRONT_M.length];
  const crown = g === 'f' ? -112 : -110;
  const flare = g === 'f' ? 18 : 6;
  hairPath(c, fr.tips, fr.bend, crown, flare);
  paintHair(c, hair, crown, 40);
  hairPath(c, fr.tips, fr.bend, crown, flare); hairShine(c, -92, 130);
  // 여자: 얼굴 옆 잔머리
  if (g === 'f') for (const s of [-1, 1]) {
    c.beginPath(); c.moveTo(64 * s, -18); c.bezierCurveTo(70 * s, 16, 64 * s, 46, 52 * s, 78); c.bezierCurveTo(60 * s, 44, 62 * s, 14, 56 * s, -12); c.closePath();
    paintHair(c, hair, -20, 84);
  }

  // 소품
  if (mbti[1] === 'N' && mbti[2] === 'T') {
    for (const s of [-1, 1]) { c.beginPath(); c.roundRect(27 * s - 21, -1, 42, 28, 13); stroke(c, 2, '#5A5468'); c.fillStyle = 'rgba(200,220,255,.12)'; c.fill(); }
    c.beginPath(); c.moveTo(-7, 8); c.quadraticCurveTo(0, 4, 7, 8); stroke(c, 2.6, '#4A4458');
  }
  if (el === 3) for (const s of [-1, 1]) { c.beginPath(); c.arc(62 * s, 34, 6, 0, Math.PI * 2); stroke(c, 2.6, '#B8C2D6'); }
  if (el === 4) for (const s of [-1, 1]) { ell(c, 62 * s, 32, 3.5, 3.5, '#fff', 1.6); }
  if (el === 0 && g === 'f') { c.save(); c.translate(-50, -54); c.rotate(-0.5); ell(c, 0, 0, 12, 5, '#7FD4A0', 2); c.restore(); }
  if (el === 2 && g === 'f') { c.save(); c.translate(48, -60); c.rotate(0.4); c.beginPath(); c.roundRect(-14, -5, 28, 10, 5); fillStroke(c, '#FFD36B', 2); c.restore(); }
  c.restore();
}
