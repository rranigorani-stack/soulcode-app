import { bizLines } from '@/lib/legal';

export type LandingLang = 'ko' | 'en';

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const T = {
  ko: {
    nav: '앱 열기',
    other: 'EN',
    otherHref: '/?lang=en',
    app: '/app',
    kicker: '한국의 점성술 · 사주',
    h1: ['태어난 시각까지 읽는', '한국의 점성술.'],
    lead: '사주 × MBTI × 타로. 한국천문연구원 만세력으로 계산한 당신의 여덟 글자를, 오늘의 언어로 풀어 드려요.',
    cta: '무료로 시작하기',
    how: '어떻게 계산하나요',
    note: '가입 없음 · 1분 · 재미로 보는 콘텐츠',
    whatK: '무엇인가요',
    whatH: ['별자리는 태어난 날을 봅니다.', '사주는 태어난 시각을 봅니다.'],
    whatP: [
      '사주(四柱)는 태어난 해·달·날·시, 네 개의 기둥으로 사람을 읽는 한국의 오래된 점성술이에요. 기둥마다 하늘의 글자(천간)와 땅의 글자(지지)가 하나씩, 모두 여덟 글자가 됩니다.',
      '여덟 글자 속 나무·불·흙·쇠·물, 다섯 기운의 균형이 타고난 기질을 말해 줘요. 소울코드는 여기에 MBTI와 타로를 겹쳐, 오늘의 나를 한 장의 카드처럼 보여 줍니다.',
    ],
    chartK: '예시 원국',
    cols: ['시', '일', '월', '년'],
    el: { 木: '나무', 火: '불', 土: '흙', 金: '쇠', 水: '물' } as Record<string, string>,
    meLabel: '나',
    featK: '할 수 있는 것',
    feats: [
      { t: '소울 타입', d: '타고난 기운(일간) × MBTI로 만든 나만의 캐릭터. 원국, 오행 밸런스, 10년마다 바뀌는 대운까지.', img: 'soul' },
      { t: '오늘의 카드', d: '꾹 눌러 뒤집는 타로 한 장과, 오늘의 일진이 나와 맺는 관계. 자정마다 새 카드가 채워져요.', img: 'daily' },
      { t: '고민 타로', d: '연애·진로·인간관계·금전. 고민 하나를 놓고 과거·현재·미래 세 장으로 흐름을 봐요.', img: 'spread' },
      { t: '궁합', d: '생일과 MBTI만 있으면 돼요. 배우자 자리, 합과 충, 서로에게 어떤 존재인지, 둘의 타이밍까지.', img: 'match' },
    ],
    precK: '정확도',
    precH: '재미로 보더라도, 계산은 정확하게.',
    prec: [
      { n: '01', t: '입춘의 분 단위', d: '사주의 해는 1월 1일도 설날도 아닌 입춘 절입 시각에 바뀌어요. 2월 4일생은 태어난 시각에 따라 해가 달라질 수 있어요.' },
      { n: '02', t: '진태양시 보정', d: '서울의 시계는 태양보다 약 32분 빨라요. 시주를 정할 때 이 차이를 보정합니다.' },
      { n: '03', t: '서머타임 연도', d: '한국이 서머타임을 썼던 해에 태어났다면, 그 한 시간도 되돌려 계산해요.' },
      { n: '04', t: '음력과 윤달', d: '음력 생일, 윤달 생일도 그대로 넣으면 양력으로 바꿔 계산해요.' },
    ],
    precSrc: '만세력 데이터: 한국천문연구원(KASI) 기반 오픈소스 manseryeok',
    stats: [['8', '글자'], ['60', '갑자'], ['24', '절기'], ['32', '분 보정']],
    endH: ['당신의 여덟 글자를', '열어 보세요.'],
    endCta: '내 소울코드 열기',
    foot: [['이용약관', '/terms'], ['개인정보처리방침', '/privacy'], ['환불정책', '/refund'], ['수배전단', '/wanted'], ['친구들이 보는 나', '/ask']],
    fun: '소울코드는 재미로 보는 콘텐츠예요. 중요한 결정은 스스로, 그리고 믿을 만한 사람과 함께.',
  },
  en: {
    nav: 'Open app',
    other: '한국어',
    otherHref: '/?lang=ko',
    app: '/app?lang=en',
    kicker: 'Korean astrology · Saju',
    h1: ['Korean astrology,', 'read from the hour you were born.'],
    lead: 'Saju × MBTI × Tarot. Your eight characters, calculated with Korea Astronomy Institute calendar data and read in plain, everyday language.',
    cta: 'Start free',
    how: 'How it works',
    note: 'No sign-up · 1 minute · Just for fun',
    whatK: 'What is this',
    whatH: ['Western astrology reads the day you were born.', 'Saju reads the hour.'],
    whatP: [
      'Saju (四柱, "four pillars") is Korea\'s traditional way of reading a person from the year, month, day and hour of birth. Each pillar has a heavenly stem and an earthly branch: eight characters in all.',
      'The balance of five elements inside them, Wood, Fire, Earth, Metal and Water, describes the temperament you were born with. SOULCODE layers MBTI and tarot on top, so today\'s you fits on a single card.',
    ],
    chartK: 'Sample chart',
    cols: ['Hour', 'Day', 'Month', 'Year'],
    el: { 木: 'Wood', 火: 'Fire', 土: 'Earth', 金: 'Metal', 水: 'Water' } as Record<string, string>,
    meLabel: 'YOU',
    featK: 'What you can do',
    feats: [
      { t: 'Soul type', d: 'Your day master × your MBTI, as one character. Plus your full chart, five-element balance and 10-year luck cycles.', img: 'soul' },
      { t: 'Daily card', d: 'Hold to flip today\'s tarot card, read against the day\'s energy on the Korean calendar. A new card every midnight.', img: 'daily' },
      { t: 'Ask the cards', d: 'Love, career, friends or money. Lay out past, present and future for one specific worry.', img: 'spread' },
      { t: 'Compatibility', d: 'Just birthdays and MBTI. Spouse palace, harmonies and clashes, what you are to each other, and your best timing.', img: 'match' },
    ],
    precK: 'Accuracy',
    precH: 'Just for fun, but calculated properly.',
    prec: [
      { n: '01', t: 'The minute of 입춘', d: 'The Saju year turns at the solar term 입춘, not Jan 1 or Lunar New Year. Born on Feb 4? Your hour decides the year.' },
      { n: '02', t: 'True solar time', d: 'Seoul\'s clock runs about 32 minutes ahead of the sun. The hour pillar is corrected for it.' },
      { n: '03', t: 'Daylight-saving years', d: 'Born in a year when Korea used daylight saving? That hour is taken back out.' },
      { n: '04', t: 'Lunar & leap months', d: 'Enter a lunar birthday, even in a leap month, and it is converted for you.' },
    ],
    precSrc: 'Calendar data: open-source manseryeok, based on Korea Astronomy and Space Science Institute data',
    stats: [['8', 'characters'], ['60', 'cycle'], ['24', 'solar terms'], ['32', 'min corrected']],
    endH: ['Open your', 'eight characters.'],
    endCta: 'Reveal my SOULCODE',
    foot: [['Terms', '/en/terms'], ['Privacy', '/en/privacy'], ['WANTED poster', '/en/wanted'], ['How friends see me', '/en/ask']],
    fun: 'SOULCODE is for fun. Make the big decisions yourself, with people you trust.',
  },
};

/* 예시 원국: 1990년 5월 갑자일 병인시 (설명용) */
const SAMPLE: { s: string; b: string; se: string; be: string; me?: boolean }[] = [
  { s: '丙', b: '寅', se: '火', be: '木' },
  { s: '甲', b: '子', se: '木', be: '水', me: true },
  { s: '辛', b: '巳', se: '金', be: '火' },
  { s: '庚', b: '午', se: '金', be: '火' },
];

function Astrolabe() {
  const r1 = 230, r2 = 190, cx = 260, cy = 260;
  return (
    <svg className="lp-astro" viewBox="0 0 520 520" aria-hidden="true">
      <circle cx={cx} cy={cy} r={250} />
      <circle cx={cx} cy={cy} r={r1} />
      <circle cx={cx} cy={cy} r={r2} />
      <circle cx={cx} cy={cy} r={110} />
      <circle cx={cx} cy={cy} r={60} />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15 - 90) * Math.PI / 180, inner = i % 2 ? 236 : 230;
        return <line key={'t' + i} x1={cx + inner * Math.cos(a)} y1={cy + inner * Math.sin(a)} x2={cx + 250 * Math.cos(a)} y2={cy + 250 * Math.sin(a)} />;
      })}
      {BRANCHES.map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        return <line key={'r' + i} x1={cx + 60 * Math.cos(a)} y1={cy + 60 * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)} />;
      })}
      {BRANCHES.map((b, i) => {
        const a = (i * 30 - 75) * Math.PI / 180, rr = (r1 + r2) / 2;
        return <text key={'b' + i} x={cx + rr * Math.cos(a)} y={cy + rr * Math.sin(a)} textAnchor="middle" dominantBaseline="central">{b}</text>;
      })}
    </svg>
  );
}

function Phone({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="lp-phone">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={390} height={844} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </div>
  );
}

export default function Landing({ lang }: { lang: LandingLang }) {
  const t = T[lang];
  const shot = (k: string) => `/landing/${lang}_${k}.webp`;
  return (
    <div className="lp" lang={lang}>
      <header className="lp-nav">
        <a className="lp-mark" href={lang === 'ko' ? '/' : '/?lang=en'}>SOULCODE<span>.</span></a>
        <nav>
          <a className="lp-mono lp-lang" href={t.otherHref}>{t.other}</a>
          <a className="lp-btn lp-btn-s" href={t.app}>{t.nav}</a>
        </nav>
      </header>

      <section className="lp-hero">
        <Astrolabe />
        <p className="lp-mono lp-kicker">{t.kicker}</p>
        <h1 className="lp-h1">{t.h1[0]}<br />{t.h1[1]}</h1>
        <p className="lp-lead">{t.lead}</p>
        <div className="lp-ctas">
          <a className="lp-btn" href={t.app}>{t.cta} →</a>
          <a className="lp-btn lp-btn-o" href="#how">{t.how}</a>
        </div>
        <p className="lp-mono lp-note">{t.note}</p>
        <div className="lp-hero-phones">
          <Phone src={shot('daily')} alt="" />
          <Phone src={shot('soul')} alt={t.feats[0].t} eager />
          <Phone src={shot('match')} alt="" />
        </div>
      </section>

      <section className="lp-sec lp-what">
        <p className="lp-mono lp-label">{t.whatK}</p>
        <h2 className="lp-h2">{t.whatH[0]}<br /><em>{t.whatH[1]}</em></h2>
        <div className="lp-what-grid">
          <div className="lp-what-text">{t.whatP.map((p) => <p key={p.slice(0, 12)}>{p}</p>)}</div>
          <figure className="lp-chart">
            <figcaption className="lp-mono">{t.chartK}</figcaption>
            <div className="lp-chart-grid">
              {SAMPLE.map((c, i) => (
                <div key={i} className={'lp-pil' + (c.me ? ' me' : '')}>
                  <span className="lp-mono lp-col">{t.cols[i]}</span>
                  <b>{c.s}</b><small>{t.el[c.se]}</small>
                  <b>{c.b}</b><small>{t.el[c.be]}</small>
                  {c.me && <span className="lp-seal">{t.meLabel}</span>}
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <section className="lp-sec lp-feats">
        <p className="lp-mono lp-label">{t.featK}</p>
        {t.feats.map((f, i) => (
          <article key={f.t} className={'lp-feat' + (i % 2 ? ' rev' : '')}>
            <div className="lp-feat-text">
              <span className="lp-mono lp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="lp-h3">{f.t}</h3>
              <p>{f.d}</p>
              <a className="lp-link lp-mono" href={t.app}>{t.cta} →</a>
            </div>
            <Phone src={shot(f.img)} alt={f.t} />
          </article>
        ))}
      </section>

      <section className="lp-dark" id="how">
        <div className="lp-dark-in">
          <p className="lp-mono lp-label">{t.precK}</p>
          <h2 className="lp-h2">{t.precH}</h2>
          <div className="lp-stats">
            {t.stats.map(([n, l]) => <div key={l}><b>{n}</b><span className="lp-mono">{l}</span></div>)}
          </div>
          <div className="lp-prec">
            {t.prec.map((p) => (
              <div key={p.n}>
                <span className="lp-mono lp-num">{p.n}</span>
                <h3 className="lp-h3">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
          <div className="lp-prec-shot">
            <Phone src={shot('chart')} alt="" />
            <p className="lp-mono">{t.precSrc}</p>
          </div>
        </div>
      </section>

      <section className="lp-end">
        <span className="lp-end-han" aria-hidden="true">命</span>
        <h2 className="lp-h1">{t.endH[0]}<br />{t.endH[1]}</h2>
        <a className="lp-btn" href={t.app}>{t.endCta} →</a>
        <p className="lp-mono lp-note">{t.note}</p>
      </section>

      <footer className="lp-foot">
        <a className="lp-mark" href={lang === 'ko' ? '/' : '/?lang=en'}>SOULCODE<span>.</span></a>
        <nav className="lp-mono">{t.foot.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <p>{t.fun}</p>
        <p className="lp-mono lp-biz">{bizLines().map(([k, v]) => <span key={k}>{k}: {v}</span>)} <span>© 2026 SOULCODE</span></p>
      </footer>
    </div>
  );
}
