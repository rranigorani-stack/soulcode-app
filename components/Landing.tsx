import { bizLines } from '@/lib/legal';

export type LandingLang = 'ko' | 'en';

/* 콘셉트: 근대(1930년대)에 타자기로 한 자 한 자 쳐서 보낸 편지.
   누런 편지지, 번진 먹, 붉은 도장, 우표, 테이프로 붙인 사진. */

const NUM_KO = ['一', '二', '三', '四'];

const T = {
  ko: {
    app: '/app', other: 'English', otherHref: '/?lang=en',
    org: '소울코드 사주연구소', orgSub: '四柱 · MBTI · 타로',
    to: '받는 이', toV: '태어난 시각을 아는 그대에게',
    from: '보내는 이', fromV: '소울코드',
    re: '용건', reV: '당신의 여덟 글자에 관하여',
    h1: ['태어난 시각까지 읽는', '한국의 점성술.'],
    open: '그대에게.',
    lead: '별자리는 태어난 날을 봅니다. 사주는 태어난 시각을 봅니다. 저희는 한국천문연구원 만세력으로 그대의 여덟 글자를 계산해, 오늘의 말로 풀어 드리고자 이 편지를 씁니다. MBTI와 타로도 함께 동봉합니다.',
    typo: '운명', typoFix: '기질',
    cta: '편지 열어보기', how: '계산 방법부터 보기',
    note: '가입 없음 · 1분 · 재미로 읽어 주세요',
    photos: ['오늘의 카드', '소울 타입', '궁합'],
    s1: '사주란 무엇인가',
    s1p: [
      '사주(四柱)는 태어난 해·달·날·시, 네 개의 기둥으로 사람을 읽는 한국의 오래된 점성술입니다. 기둥마다 하늘의 글자(천간)와 땅의 글자(지지)가 하나씩, 모두 여덟 글자가 됩니다.',
      '그 여덟 글자 속 나무·불·흙·쇠·물, 다섯 기운의 균형이 그대가 타고난 기질을 말해 줍니다.',
    ],
    chartCap: '예시 원국 (설명용)',
    cols: ['시', '일', '월', '년'],
    el: { 木: '나무', 火: '불', 土: '흙', 金: '쇠', 水: '물' } as Record<string, string>,
    me: '나',
    s2: '이 편지로 할 수 있는 일',
    feats: [
      { t: '소울 타입', d: '타고난 기운(일간) × MBTI로 만든 그대만의 인물상. 원국, 오행 균형, 십 년마다 바뀌는 대운까지 적어 드립니다.', img: 'soul' },
      { t: '오늘의 카드', d: '꾹 눌러 뒤집는 타로 한 장과, 오늘의 일진이 그대와 맺는 관계. 자정마다 새 카드가 들어옵니다.', img: 'daily' },
      { t: '고민 타로', d: '연애·진로·인간관계·금전. 고민 하나를 놓고 과거·현재·미래 세 장으로 흐름을 봅니다.', img: 'spread' },
      { t: '궁합', d: '생일과 MBTI만 있으면 됩니다. 배우자 자리, 합과 충, 서로에게 어떤 존재인지, 둘의 때까지.', img: 'match' },
    ],
    s3: '계산에 관하여',
    s3lead: '재미로 읽으시더라도, 계산만큼은 정확히 하였습니다.',
    ledger: [['여덟', '글자'], ['예순', '갑자'], ['스물넷', '절기'], ['서른둘', '분 보정']],
    prec: [
      ['입춘의 분 단위', '사주의 해는 1월 1일도 설날도 아닌 입춘 절입 시각에 바뀝니다. 2월 4일생은 태어난 시각에 따라 해가 달라질 수 있습니다.'],
      ['진태양시 보정', '서울의 시계는 해보다 약 32분 빠릅니다. 시주를 정할 때 이 차이를 바로잡습니다.'],
      ['서머타임 연도', '한국이 서머타임을 썼던 해에 태어나셨다면, 그 한 시간도 되돌려 계산합니다.'],
      ['음력과 윤달', '음력 생일, 윤달 생일도 그대로 적어 주시면 양력으로 옮겨 계산합니다.'],
    ],
    src: '만세력 자료: 한국천문연구원(KASI) 기반 공개 소스 manseryeok',
    close: '부디 그대의 여덟 글자를 열어 보시기를 바랍니다.',
    sign: '소울코드 드림',
    seal: ['소울', '코드'],
    ps: '추신.',
    psT: '가입은 필요 없고, 일 분이면 충분합니다. 다만 중요한 결정은 그대 스스로, 믿을 만한 사람과 함께 내리십시오.',
    stamp: '열람',
    foot: [['이용약관', '/terms'], ['개인정보처리방침', '/privacy'], ['환불정책', '/refund'], ['수배전단', '/wanted'], ['친구들이 보는 나', '/ask']],
    postage: '소울코드 우표',
  },
  en: {
    app: '/app?lang=en', other: '한국어', otherHref: '/?lang=ko',
    org: 'SOULCODE Saju Institute', orgSub: 'Saju · MBTI · Tarot',
    to: 'To', toV: 'Whoever knows the hour they were born',
    from: 'From', fromV: 'SOULCODE',
    re: 'Re', reV: 'Your eight characters',
    h1: ['Korean astrology,', 'read from the hour you were born.'],
    open: 'Dear you,',
    lead: 'Western astrology reads the day you were born. Saju reads the hour. We calculate your eight characters with Korea Astronomy Institute calendar data and write them back to you in plain words. MBTI and tarot are enclosed.',
    typo: 'fate', typoFix: 'temperament',
    cta: 'Open the letter', how: 'See how it is calculated',
    note: 'No sign-up · 1 minute · Just for fun',
    photos: ['Daily card', 'Soul type', 'Compatibility'],
    s1: 'What Saju is',
    s1p: [
      'Saju (四柱, "four pillars") is Korea\'s traditional way of reading a person from the year, month, day and hour of birth. Each pillar holds a heavenly stem and an earthly branch: eight characters in all.',
      'The balance of five elements inside them, Wood, Fire, Earth, Metal and Water, describes the temperament you were born with.',
    ],
    chartCap: 'Sample chart (for illustration)',
    cols: ['Hour', 'Day', 'Month', 'Year'],
    el: { 木: 'Wood', 火: 'Fire', 土: 'Earth', 金: 'Metal', 水: 'Water' } as Record<string, string>,
    me: 'YOU',
    s2: 'What this letter can do',
    feats: [
      { t: 'Soul type', d: 'Your day master × your MBTI, as one character. With your full chart, five-element balance and 10-year luck cycles.', img: 'soul' },
      { t: 'Daily card', d: 'Hold to flip today\'s tarot card, read against the day\'s energy on the Korean calendar. A new card every midnight.', img: 'daily' },
      { t: 'Ask the cards', d: 'Love, career, friends or money. Past, present and future for one specific worry.', img: 'spread' },
      { t: 'Compatibility', d: 'Just birthdays and MBTI. Spouse palace, harmonies and clashes, what you are to each other, and your timing.', img: 'match' },
    ],
    s3: 'On the calculation',
    s3lead: 'Read it for fun, but the math is done properly.',
    ledger: [['8', 'characters'], ['60', 'cycle'], ['24', 'solar terms'], ['32', 'min corrected']],
    prec: [
      ['The minute of 입춘', 'The Saju year turns at the solar term 입춘, not Jan 1 or Lunar New Year. Born on Feb 4? Your hour decides the year.'],
      ['True solar time', 'Seoul\'s clock runs about 32 minutes ahead of the sun. The hour pillar is corrected for it.'],
      ['Daylight-saving years', 'Born in a year when Korea used daylight saving? That hour is taken back out.'],
      ['Lunar & leap months', 'Enter a lunar birthday, even in a leap month, and it is converted for you.'],
    ],
    src: 'Calendar data: open-source manseryeok, based on Korea Astronomy and Space Science Institute data',
    close: 'I hope you will open your eight characters.',
    sign: 'Yours, SOULCODE',
    seal: ['소울', '코드'],
    ps: 'P.S.',
    psT: 'No sign-up, one minute is enough. Make the big decisions yourself, with people you trust.',
    stamp: 'OPEN',
    foot: [['Terms', '/en/terms'], ['Privacy', '/en/privacy'], ['WANTED poster', '/en/wanted'], ['How friends see me', '/en/ask']],
    postage: 'SOULCODE POST',
  },
};

const SAMPLE: { s: string; b: string; se: string; be: string; me?: boolean }[] = [
  { s: '丙', b: '寅', se: '火', be: '木' },
  { s: '甲', b: '子', se: '木', be: '水', me: true },
  { s: '辛', b: '巳', se: '金', be: '火' },
  { s: '庚', b: '午', se: '金', be: '火' },
];

function Photo({ src, cap, tilt, eager }: { src: string; cap: string; tilt: number; eager?: boolean }) {
  return (
    <figure className="lt-photo" style={{ ['--tilt' as string]: `${tilt}deg` }}>
      <span className="lt-tape" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={cap} width={390} height={844} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <figcaption>{cap}</figcaption>
    </figure>
  );
}

function Seal({ chars }: { chars: string[] }) {
  return (
    <span className="lt-seal" aria-hidden="true">
      <span>{chars[0]}</span><span>{chars[1]}</span>
    </span>
  );
}

export default function Landing({ lang }: { lang: LandingLang }) {
  const t = T[lang];
  const shot = (k: string) => `/landing/${lang}_${k}.webp`;
  const d = new Date(Date.now() + 9 * 3600e3);
  const date = lang === 'ko'
    ? `${d.getUTCFullYear()}年 ${d.getUTCMonth() + 1}月 ${d.getUTCDate()}日`
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const home = lang === 'ko' ? '/' : '/?lang=en';
  return (
    <div className="lt" lang={lang}>
      {/* 번진 먹 효과용 필터 */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="ink"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" /><feDisplacementMap in="SourceGraphic" scale="1.6" /></filter>
        <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="8" /><feDisplacementMap in="SourceGraphic" scale="5" /></filter>
      </svg>

      <nav className="lt-top">
        <a href={home} className="lt-top-mark">SOULCODE</a>
        <span>
          <a href={t.otherHref}>{t.other}</a>
          <a className="lt-top-open" href={t.app}>{t.cta} →</a>
        </span>
      </nav>

      <article className="lt-paper">
        <span className="lt-fold lt-fold-1" aria-hidden="true" />
        <span className="lt-fold lt-fold-2" aria-hidden="true" />

        {/* 편지 머리 */}
        <header className="lt-head">
          <div>
            <p className="lt-org">{t.org}</p>
            <p className="lt-orgsub">{t.orgSub}</p>
          </div>
          <div className="lt-postage" aria-hidden="true">
            <span className="lt-postage-in"><b>命</b><small>{t.postage}</small></span>
            <span className="lt-postmark">SEOUL · {d.getUTCFullYear()}</span>
          </div>
        </header>
        <hr className="lt-rule" />
        <p className="lt-date">{date}</p>
        <dl className="lt-meta">
          <dt>{t.to}</dt><dd>{t.toV}</dd>
          <dt>{t.from}</dt><dd>{t.fromV}</dd>
          <dt>{t.re}</dt><dd>{t.reV}</dd>
        </dl>

        {/* 첫 문단 */}
        <h1 className="lt-h1 ink">{t.h1[0]}<br />{t.h1[1]}</h1>
        <p className="lt-open">{t.open}</p>
        <p className="lt-body">{t.lead}</p>
        <p className="lt-body lt-typo">
          {lang === 'ko' ? <>사주는 정해진 <s>{t.typo}</s> {t.typoFix}을 읽는 거울입니다.</> : <>Saju is a mirror for your <s>{t.typo}</s> {t.typoFix}.</>}
        </p>
        <div className="lt-ctas">
          <a className="lt-stampbtn" href={t.app}><span>{t.cta}</span></a>
          <a className="lt-link" href="#calc">{t.how} →</a>
        </div>
        <p className="lt-note">{t.note}</p>

        <div className="lt-photos">
          <Photo src={shot('daily')} cap={t.photos[0]} tilt={-4} />
          <Photo src={shot('soul')} cap={t.photos[1]} tilt={2} eager />
          <Photo src={shot('match')} cap={t.photos[2]} tilt={5} />
        </div>

        {/* 一 */}
        <section className="lt-sec">
          <h2 className="lt-h2 ink"><span className="lt-no">{NUM_KO[0]}.</span> {t.s1}</h2>
          {t.s1p.map((p) => <p key={p.slice(0, 10)} className="lt-body">{p}</p>)}
          <figure className="lt-chart">
            <table>
              <thead><tr>{t.cols.map((c, i) => <th key={c} className={SAMPLE[i].me ? 'me' : ''}>{c}</th>)}</tr></thead>
              <tbody>
                <tr>{SAMPLE.map((c, i) => <td key={i} className={c.me ? 'me' : ''}><b className="ink">{c.s}</b><small>{t.el[c.se]}</small></td>)}</tr>
                <tr>{SAMPLE.map((c, i) => <td key={i} className={c.me ? 'me' : ''}><b className="ink">{c.b}</b><small>{t.el[c.be]}</small>{c.me && <span className="lt-me">{t.me}</span>}</td>)}</tr>
              </tbody>
            </table>
            <figcaption>{t.chartCap}</figcaption>
          </figure>
        </section>

        {/* 二 */}
        <section className="lt-sec">
          <h2 className="lt-h2 ink"><span className="lt-no">{NUM_KO[1]}.</span> {t.s2}</h2>
          {t.feats.map((f, i) => (
            <div key={f.t} className={'lt-feat' + (i % 2 ? ' rev' : '')}>
              <div>
                <h3 className="lt-h3">{lang === 'ko' ? '가나다라'[i] : 'abcd'[i]}. {f.t}</h3>
                <p className="lt-body">{f.d}</p>
                <a className="lt-link" href={t.app}>{t.cta} →</a>
              </div>
              <Photo src={shot(f.img)} cap={f.t} tilt={i % 2 ? -3 : 3} />
            </div>
          ))}
        </section>

        {/* 三 */}
        <section className="lt-sec" id="calc">
          <h2 className="lt-h2 ink"><span className="lt-no">{NUM_KO[2]}.</span> {t.s3}</h2>
          <p className="lt-body">{t.s3lead}</p>
          <table className="lt-ledger">
            <tbody><tr>{t.ledger.map(([n, l]) => <td key={l}><b className="ink">{n}</b><small>{l}</small></td>)}</tr></tbody>
          </table>
          <ol className="lt-prec">
            {t.prec.map(([h, p]) => <li key={h}><b>{h}.</b> {p}</li>)}
          </ol>
          <div className="lt-calc-photo">
            <Photo src={shot('chart')} cap={lang === 'ko' ? '원국 화면' : 'Chart screen'} tilt={-2} />
            <p className="lt-src">{t.src}</p>
          </div>
        </section>

        {/* 맺음 */}
        <section className="lt-close">
          <p className="lt-body">{t.close}</p>
          <div className="lt-sign">
            <span className="lt-pen">{t.sign}</span>
            <Seal chars={t.seal} />
          </div>
          <p className="lt-ps"><b>{t.ps}</b> {t.psT}</p>
          <div className="lt-ctas">
            <a className="lt-stampbtn big" href={t.app}><span>{t.cta}</span></a>
          </div>
          <p className="lt-note">{t.note}</p>
        </section>
      </article>

      <footer className="lt-foot">
        <nav>{t.foot.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <p>{bizLines().map(([k, v]) => <span key={k}>{k}: {v}</span>)} <span>© {d.getUTCFullYear()} SOULCODE</span></p>
      </footer>
    </div>
  );
}
