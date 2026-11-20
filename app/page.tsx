import { headers } from 'next/headers';
import Landing, { type LandingLang } from '@/components/Landing';
import './landing.css';

/*
 * 소개 페이지. 앱은 /app 에 있어요.
 * 이미 앱을 쓰는 사람(기기에 프로필이 있음), 홈 화면에 설치한 앱, 공유·로그인 링크(?duo= ?map= ?code= 등)는
 * 화면이 그려지기 전에 /app 으로 바로 넘겨요. utm_·lang 같은 추적용 값만 있으면 소개 페이지를 보여줘요.
 */
const FORWARD = `(function(){try{var s=location.search,h=location.hash,p=new URLSearchParams(s),go=false;
p.forEach(function(v,k){if(!/^(utm_|fbclid$|gclid$|ref$|lang$|edit$)/.test(k))go=true});
if(h&&h.length>1)go=true;
if(localStorage.getItem('soulcode.profile'))go=true;
if((window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone)go=true;
if(go)location.replace('/app'+s+h)}catch(e){}})()`;

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = typeof sp.lang === 'string' ? sp.lang : '';
  let lang: LandingLang;
  if (q === 'ko' || q === 'en') lang = q;
  else {
    const al = (await headers()).get('accept-language') || '';
    lang = /^\s*ko/i.test(al) || !al ? 'ko' : 'en';
  }
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: FORWARD }} />
      <Landing lang={lang} />
    </>
  );
}
