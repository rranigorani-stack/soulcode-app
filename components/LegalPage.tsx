import Link from 'next/link';
import { EFFECTIVE_DATE, OPERATOR } from '@/lib/legal';

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  const info = [
    ['상호', OPERATOR.name],
    ['대표자', OPERATOR.representative],
    ['사업자등록번호', OPERATOR.bizNo],
    ['통신판매업 신고번호', OPERATOR.mailOrderNo],
    ['주소', OPERATOR.address],
    ['문의', OPERATOR.email],
  ].filter(([, v]) => v);
  return (
    <div className="legal-wrap">
      <article className="legal">
        <Link href="/" className="legal-back">← 소울코드로 돌아가기</Link>
        <h1 className="h-display">{title}</h1>
        <p className="legal-date">시행일: {EFFECTIVE_DATE}</p>
        {children}
        <hr />
        <p className="legal-info">{info.map(([k, v]) => <span key={k}>{k}: {v}</span>)}</p>
        <nav className="legal-nav">
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy"><b>개인정보처리방침</b></Link>
          <Link href="/refund">환불정책</Link>
        </nav>
      </article>
    </div>
  );
}
