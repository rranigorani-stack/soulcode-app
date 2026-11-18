'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

function Confirm() {
  const q = useSearchParams();
  const [msg, setMsg] = useState('결제를 확인하고 있어요... 🔮');
  const [err, setErr] = useState(false);
  useEffect(() => {
    (async () => {
      const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const { data } = await sb.auth.getSession();
      const token = data.session?.access_token;
      if (!token) { setErr(true); setMsg('로그인 정보가 없어요. 다시 로그인한 뒤 고객센터로 문의해주세요.'); return; }
      const res = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ paymentKey: q.get('paymentKey'), orderId: q.get('orderId'), amount: Number(q.get('amount')) }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) { setMsg('PRO가 시작됐어요! 💎 잠시 후 이동해요'); setTimeout(() => location.replace('/?paid=1'), 1200); }
      else { setErr(true); setMsg(body.message || '결제 승인에 실패했어요.'); }
    })();
  }, [q]);
  return <Card title={err ? '결제 확인 실패 😢' : '결제 완료 확인 중'} msg={msg} showHome={err} />;
}

function Card({ title, msg, showHome }: { title: string; msg: string; showHome: boolean }) {
  return (
    <div className="app" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="pw" style={{ textAlign: 'center' }}>
        <h3 className="h-display">{title}</h3>
        <p style={{ margin: '14px 0', lineHeight: 1.6 }}>{msg}</p>
        {showHome && <a className="btn" href="/">홈으로</a>}
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense><Confirm /></Suspense>;
}
