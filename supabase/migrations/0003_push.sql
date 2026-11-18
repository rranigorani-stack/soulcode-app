-- 아침 알림 구독 (서버 전용: RLS 켜고 정책 없음 → service_role만 접근)
create table if not exists public.push_subscriptions (
  endpoint   text primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.push_subscriptions enable row level security;
create index if not exists push_subscriptions_user_idx on public.push_subscriptions(user_id);

-- 하루 한 번 발송 잠금 + 결과 기록
create table if not exists public.push_runs (
  day     date primary key,
  sent    int,
  removed int,
  failed  int,
  ran_at  timestamptz not null default now()
);
alter table public.push_runs enable row level security;
