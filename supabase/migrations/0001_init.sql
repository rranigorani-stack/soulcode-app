-- 소울코드 초기 스키마
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

-- 1) 사용자별 앱 상태 (프로필·출석·도감·뽑은 카드·스킨) ─ 본인만 읽고 쓰기
create table if not exists public.user_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_state enable row level security;
create policy "own state read"   on public.user_state for select using (auth.uid() = user_id);
create policy "own state insert" on public.user_state for insert with check (auth.uid() = user_id);
create policy "own state update" on public.user_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2) PRO 이용권 ─ 본인은 읽기만, 쓰기는 서버(service_role)만
create table if not exists public.entitlements (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  plan       text,
  pro_until  timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.entitlements enable row level security;
create policy "own entitlement read" on public.entitlements for select using (auth.uid() = user_id);

-- 3) AI 사용량 (한국 날짜 기준 하루 카운트)
create table if not exists public.ai_usage (
  user_id uuid references auth.users(id) on delete cascade,
  day     date not null,
  count   int  not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security;
create policy "own usage read" on public.ai_usage for select using (auth.uid() = user_id);

-- 4) 결제 기록
create table if not exists public.payments (
  order_id    text primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  plan        text not null,
  amount      int  not null,
  status      text not null default 'READY',
  payment_key text,
  raw         jsonb,
  created_at  timestamptz not null default now(),
  approved_at timestamptz
);
alter table public.payments enable row level security;
create policy "own payments read" on public.payments for select using (auth.uid() = user_id);

-- 무료 AI 사용량 원자적 차감: 한도 미만이면 +1 후 새 값, 한도면 null
create or replace function public.increment_ai_usage(p_user uuid, p_day date, p_limit int)
returns int language plpgsql security definer set search_path = public as $$
declare c int;
begin
  insert into ai_usage(user_id, day, count) values (p_user, p_day, 1)
  on conflict (user_id, day) do update set count = ai_usage.count + 1
    where ai_usage.count < p_limit
  returning count into c;
  return c;
end $$;

-- AI 호출이 실패했을 때 1회 돌려주기
create or replace function public.refund_ai_usage(p_user uuid, p_day date)
returns void language sql security definer set search_path = public as $$
  update ai_usage set count = greatest(count - 1, 0) where user_id = p_user and day = p_day;
$$;

-- 이용권 연장: 남은 기간이 있으면 그 뒤로 이어 붙임
create or replace function public.extend_pro(p_user uuid, p_days int, p_plan text)
returns timestamptz language sql security definer set search_path = public as $$
  insert into entitlements(user_id, plan, pro_until)
  values (p_user, p_plan, now() + make_interval(days => p_days))
  on conflict (user_id) do update
    set plan = excluded.plan,
        pro_until = greatest(entitlements.pro_until, now()) + make_interval(days => p_days),
        updated_at = now()
  returning pro_until;
$$;

-- 위 함수들은 서버(service_role)만 호출 가능
revoke execute on function public.increment_ai_usage(uuid, date, int) from public, anon, authenticated;
revoke execute on function public.refund_ai_usage(uuid, date) from public, anon, authenticated;
revoke execute on function public.extend_pro(uuid, int, text) from public, anon, authenticated;
grant execute on function public.increment_ai_usage(uuid, date, int) to service_role;
grant execute on function public.refund_ai_usage(uuid, date) to service_role;
grant execute on function public.extend_pro(uuid, int, text) to service_role;
