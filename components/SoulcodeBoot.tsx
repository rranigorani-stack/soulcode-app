'use client';
import { useEffect } from 'react';
import { startSoulcode } from '@/lib/runtime';

/** 서버가 그린 마크업 위에 화면 스크립트를 붙여요. React는 마크업을 다시 그리지 않아요. */
export default function SoulcodeBoot() {
  useEffect(() => {
    startSoulcode().catch((e) => console.error('[soulcode] boot failed', e));
  }, []);
  return null;
}
