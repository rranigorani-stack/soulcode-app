# 🔮 SOULCODE 소울코드

> MBTI는 핑계고, 사주는 거들 뿐.
> 사주 × MBTI × 타로로 오늘의 나를 해석해주는 젠지용 웹앱(PWA)

## 기능

| 기능 | 설명 |
|---|---|
| 소울 타입 | 일간(타고난 기질) × MBTI 조합 캐릭터, 사주 원국, 오행 밸런스 |
| 오늘의 타로 | 꾹 눌러 뒤집기, 홀로그램 틸트, 오늘 일진과 나의 관계, 운세 지수 |
| 고민 타로 | 연애·진로·인간관계·금전 3장 스프레드 + 종합 판정 |
| 궁합 | 친구·동료 궁합, **연애 궁합 PRO**(배우자궁·십신·합충원진·오행 보완·도화/홍염·타이밍) |
| 운세 리포트 | 월간(럭키 데이 캘린더), 연간(12개월 흐름) |
| AI 맞춤 해석 | Claude API 스트리밍. 무료 하루 3회, PRO 무제한 (서버에서 검증) |
| 로그인·동기화 | Supabase Auth (카카오 · Apple · Google · 이메일 링크) |
| PRO 이용권 | 토스페이먼츠 결제창, 30일 / 365일 이용권 (자동 갱신 없음) |
| 덱 스킨 | 5종 (2 무료 / 3 PRO) |
| PWA | 홈 화면 설치, 오프라인에서도 사주 계산·타로 동작 |

사주 계산은 [manseryeok](https://github.com/yhj1024/manseryeok) (MIT, 한국천문연구원 정본 데이터)을 써요.
서울 진태양시·과거 서머타임 보정, 자시 기준 일주 전환(`jasi`), 음력·윤달 입력을 지원해요.

## 구조

```
app/
  page.tsx                 ← 화면 마크업(프로토타입 그대로) + 부트
  soulcode.css             ← 파스텔 스티커 디자인 시스템
  api/ai/route.ts          ← Claude API 스트리밍 + 무료 횟수·PRO 서버 검증
  api/me/route.ts          ← 내 이용권 · 오늘 AI 사용량
  api/payments/order       ← 주문 생성 (금액은 서버가 결정)
  api/payments/confirm     ← 토스 승인 → 이용권 연장
  payments/success|fail    ← 결제 후 돌아오는 페이지
lib/
  runtime.ts               ← 화면 코드가 쓰는 AI·저장소·사용자 객체를 Supabase/서버로 연결
  server.ts                ← 서버 공통 (인증, 요금제, 이용권)
public/soulcode/app.js     ← 화면 로직 (사주·타로·궁합·리포트)
public/sw.js, manifest     ← PWA
supabase/migrations/       ← DB 스키마 (RLS 포함)
```

화면 로직(`app.js`)은 `window.claude.use('sample' | 'db' | 'user')`라는 작은 인터페이스로만
백엔드에 접근해요. `lib/runtime.ts`가 그 인터페이스를 Supabase와 자체 API로 구현하기 때문에
나중에 화면을 React 컴포넌트로 하나씩 옮겨도 백엔드 코드는 그대로 쓸 수 있어요.

## 시작하기

```bash
npm install
cp .env.example .env.local   # 키 채우기 (아래 참고)
npm run dev                  # http://localhost:3000
```

키가 하나도 없어도 앱은 열려요. 이때는 이 기기에만 저장되는 오프라인 모드로 동작하고,
AI·로그인·결제 버튼은 숨겨지거나 "준비 중"으로 표시돼요.

## 설정 체크리스트

### 1. Supabase (로그인 · 동기화 · 이용권)
1. [supabase.com](https://supabase.com)에서 프로젝트 생성 → **Project Settings → API**에서
   `URL`, `anon key`, `service_role key`를 `.env.local`에 넣기
2. **SQL Editor**에 `supabase/migrations/0001_init.sql` 붙여넣고 실행
3. **Authentication → URL Configuration**
   - Site URL: 배포 주소 (예: `https://soulcode.vercel.app`)
   - Redirect URLs: `http://localhost:3000/**`, `https://배포주소/**`
4. **Authentication → Providers**
   - **Kakao**: [Kakao Developers](https://developers.kakao.com)에서 앱 생성 → REST API 키·Client Secret 입력.
     카카오 로그인 Redirect URI에 `https://<프로젝트>.supabase.co/auth/v1/callback` 등록.
     동의항목에서 닉네임·이메일 설정 (이메일은 비즈 앱 전환이 필요할 수 있어요)
   - **Apple**: Apple Developer 계정(연 $99) 필요. Services ID·Key 발급 후 입력
   - **Google**: Google Cloud Console에서 OAuth 클라이언트 생성 후 입력
   - **Email**: 기본 켜짐. 운영 전에 SMTP(예: Resend)를 연결하면 발송 한도가 넉넉해져요

### 2. Claude API (AI 맞춤 해석)
1. [console.anthropic.com](https://console.anthropic.com)에서 API 키 발급 → `ANTHROPIC_API_KEY`
2. `AI_MODEL`: 기본 `claude-haiku-5-5`(빠르고 저렴). 품질을 높이려면 `claude-sonnet-5-5`
3. 콘솔에서 **월 사용 한도(Spend limit)**를 꼭 걸어두세요

### 3. 토스페이먼츠 (결제)
1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com)에서 **테스트 키** 발급 →
   `NEXT_PUBLIC_TOSS_CLIENT_KEY`, `TOSS_SECRET_KEY` (테스트 키로는 실제 돈이 나가지 않아요)
2. 실결제: **사업자 등록 → 토스페이먼츠 가맹 계약 → 라이브 키로 교체**
3. 디지털 콘텐츠 판매라 **환불 정책·이용약관·개인정보처리방침** 페이지가 필요해요 (결제 심사 항목)

### 4. 배포 (Vercel)
1. GitHub 저장소를 [Vercel](https://vercel.com)에 Import
2. **Settings → Environment Variables**에 `.env.example`의 값 입력
3. 배포 주소를 Supabase Site URL·Redirect URLs, 카카오 Redirect URI에 반영

## 보안 메모
- `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `TOSS_SECRET_KEY`는 서버에서만 쓰여요. `NEXT_PUBLIC_`을 붙이지 마세요.
- 결제 금액·이용권·AI 무료 횟수는 모두 서버가 결정하고 검증해요. 이용권 테이블은 클라이언트가 쓸 수 없어요(RLS).
- 덱 스킨·연간 상세 같은 화면 잠금은 클라이언트에서 처리돼요. 비용이 드는 기능(AI)만 서버에서 막아요.

## 출시 전 할 일
- [ ] 이용약관 · 개인정보처리방침 · 환불 정책 페이지
- [ ] "재미로 보는 콘텐츠" 고지, 만 14세 미만 가입 제한 문구
- [ ] 사주 해석 문구 전문가 감수
- [ ] 결과 공유 이미지 저장 (인스타 스토리 9:16)
- [ ] 푸시 알림 (오늘의 카드)
- [ ] 앱스토어 출시 시: 디지털 상품은 인앱결제 정책 확인 (웹 결제와 분리)

---
재미로 보는 콘텐츠예요. 사주·타로 결과는 참고용입니다.
