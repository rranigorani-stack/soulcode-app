import Link from 'next/link';
import { EFFECTIVE_DATE } from '@/lib/legal';
import { BizInfo } from './BizInfo';

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="legal-wrap">
      <article className="legal">
        <Link href="/" className="legal-back">← 소울코드로 돌아가기</Link>
        <h1 className="h-display">{title}</h1>
        <p className="legal-date">시행일: {EFFECTIVE_DATE}</p>
        {children}
        <hr />
        <BizInfo className="legal-info" />
        <nav className="legal-nav">
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy"><b>개인정보처리방침</b></Link>
          <Link href="/refund">환불정책</Link>
        </nav>
      </article>
    </div>
  );
}
