'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function Fail() {
  const q = useSearchParams();
  const canceled = q.get('code') === 'PAY_PROCESS_CANCELED';
  return (
    <div className="app" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="pw" style={{ textAlign: 'center' }}>
        <h3 className="h-display">{canceled ? '결제를 취소했어요' : '결제에 실패했어요 😢'}</h3>
        <p style={{ margin: '14px 0', lineHeight: 1.6 }}>{canceled ? '언제든 다시 시작할 수 있어요.' : q.get('message') || '잠시 후 다시 시도해주세요.'}</p>
        <a className="btn" href="/app">홈으로</a>
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense><Fail /></Suspense>;
}
