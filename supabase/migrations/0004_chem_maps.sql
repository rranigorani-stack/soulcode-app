-- 친구들과 궁합 지도: 생년월일 대신 별명·MBTI·일간·띠만 저장. 서버 전용(RLS, 정책 없음)
create table if not exists public.chem_maps (
  code       text primary key,
  title      text not null,
  owner_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.chem_maps enable row level security;

create table if not exists public.chem_members (
  id         uuid primary key default gen_random_uuid(),
  map_code   text not null references public.chem_maps(code) on delete cascade,
  nick       text not null,
  mbti       text not null,
  stem       smallint not null check (stem between 0 and 9),
  yb         smallint not null check (yb between 0 and 11),
  token_hash text not null,
  user_id    uuid references auth.users(id) on delete cascade,
  joined_at  timestamptz not null default now()
);
alter table public.chem_members enable row level security;
create index if not exists chem_members_map_idx on public.chem_members(map_code);
create index if not exists chem_members_user_idx on public.chem_members(user_id);
