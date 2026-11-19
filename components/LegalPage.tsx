import Link from 'next/link';
import { EFFECTIVE_DATE } from '@/lib/legal';
import { BizInfo } from './BizInfo';

type Lang = 'ko' | 'en' | 'ja';
const TX = {
  ko: { back: '← 소울코드로 돌아가기', date: '시행일', terms: '이용약관', privacy: '개인정보처리방침', refund: '환불정책', note: '' },
  en: { back: '← Back to SOULCODE', date: 'Effective date', terms: 'Terms of Service', privacy: 'Privacy Policy', refund: 'Refund Policy (Korean)', note: 'This English version is provided for convenience. If it differs from the Korean original, the Korean version prevails.' },
  ja: { back: '← ソウルコードに戻る', date: '施行日', terms: '利用規約', privacy: 'プライバシーポリシー', refund: '返金ポリシー(韓国語)', note: 'この日本語版は便宜のための翻訳です。韓国語の原文と内容が異なる場合は、韓国語版が優先されます。' },
};
const DATE = { ko: EFFECTIVE_DATE, en: 'November 18, 2026', ja: '2026年11月18日' };

export function LegalPage({ title, children, lang = 'ko' }: { title: string; children: React.ReactNode; lang?: Lang }) {
  const t = TX[lang], p = lang === 'ko' ? '' : `/${lang}`;
  return (
    <div className="legal-wrap" lang={lang}>
      <article className="legal">
        <Link href={lang === 'ko' ? '/' : `/?lang=${lang}`} className="legal-back">{t.back}</Link>
        <h1 className="h-display">{title}</h1>
        <p className="legal-date">{t.date}: {DATE[lang]}</p>
        {t.note && <p className="legal-date"><i>{t.note}</i></p>}
        {children}
        <hr />
        {lang === 'ko' ? <BizInfo className="legal-info" /> : null}
        <nav className="legal-nav">
          <Link href={`${p}/terms`}>{t.terms}</Link>
          <Link href={`${p}/privacy`}><b>{t.privacy}</b></Link>
          <Link href="/refund">{t.refund}</Link>
        </nav>
      </article>
    </div>
  );
}
