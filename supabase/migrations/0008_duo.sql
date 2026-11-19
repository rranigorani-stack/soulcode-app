-- "나랑 궁합 보기" 초대 링크: 생년월일 대신 별명·MBTI·일간·띠만 저장. 서버 전용(RLS, 정책 없음)
create table if not exists public.duo_links (
  code          text primary key,
  nick          text not null,
  mbti          text not null,
  stem          smallint not null check (stem between 0 and 9),
  yb            smallint not null check (yb between 0 and 11),
  host_hash     text not null,
  host_endpoint text,
  lang          text not null default 'ko' check (lang in ('ko','en','ja')),
  user_id       uuid references auth.users(id) on delete cascade,
  created_at    timestamptz not null default now()
);
alter table public.duo_links enable row level security;

create table if not exists public.duo_guests (
  id         uuid primary key default gen_random_uuid(),
  code       text not null references public.duo_links(code) on delete cascade,
  nick       text not null,
  mbti       text not null,
  stem       smallint not null check (stem between 0 and 9),
  yb         smallint not null check (yb between 0 and 11),
  voter      text not null,
  seen       boolean not null default false,
  created_at timestamptz not null default now(),
  unique (code, voter)
);
alter table public.duo_guests enable row level security;
create index if not exists duo_guests_code_idx on public.duo_guests(code, created_at desc);

-- 알림 내용함: 서버는 본문 없는 푸시로 깨우고, 서비스워커가 여기서 문구를 가져가요
create table if not exists public.push_inbox (
  id         bigserial primary key,
  endpoint   text not null,
  title      text not null,
  body       text not null,
  url        text not null default '/',
  delivered  boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.push_inbox enable row level security;
create index if not exists push_inbox_ep_idx on public.push_inbox(endpoint, created_at desc);

alter table public.push_subscriptions add column if not exists lang text not null default 'ko';

-- 오래된 링크 정리 (마지막 활동 후 1년)
create or replace function public.cleanup_duo()
returns void language sql security definer set search_path = public as $$
  delete from public.duo_links d
   where d.created_at < now() - interval '1 year'
     and not exists (select 1 from public.duo_guests g where g.code = d.code and g.created_at > now() - interval '1 year');
  delete from public.push_inbox where created_at < now() - interval '14 days';
$$;
revoke all on function public.cleanup_duo() from public, anon, authenticated;
