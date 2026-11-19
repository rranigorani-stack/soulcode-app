import { bizLines } from '@/lib/legal';

/** 사이트 하단 사업자 정보 (전자상거래법 표시 의무) */
export function BizInfo({ className = 'biz-info' }: { className?: string }) {
  return <p className={className}>{bizLines().map(([k, v]) => <span key={k}>{k}: {v}</span>)}</p>;
}
