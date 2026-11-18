import { MARKUP } from './_soulcode/markup';
import SoulcodeBoot from '@/components/SoulcodeBoot';

export default function Home() {
  return (
    <>
      <div id="soul-root" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: MARKUP }} />
      <SoulcodeBoot />
    </>
  );
}
