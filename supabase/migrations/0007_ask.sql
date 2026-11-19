-- 친구들이 보는 나: 익명 친구 답변 보드
-- 개인정보 최소화: 보드 주인 별명만 저장 (생일 X). 답변자는 고른 보기 번호만 저장하고, 중복 방지용 해시만 남겨요.
create table if not exists public.ask_boards (
  code text primary key,
  nick text not null,
  owner_hash text not null,
  answer_count int not null default 0,
  last_answer_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.ask_answers (
  id bigserial primary key,
  board_code text not null references public.ask_boards(code) on delete cascade,
  voter_hash text not null,
  teto boolean not null,
  ei char(1) not null check (ei in ('E','I')),
  sn char(1) not null check (sn in ('S','N')),
  tf char(1) not null check (tf in ('T','F')),
  jp char(1) not null check (jp in ('J','P')),
  charm smallint not null check (charm between 0 and 11),
  love smallint not null check (love between 0 and 11),
  animal smallint not null check (animal between 0 and 11),
  island smallint not null check (island between 0 and 11),
  created_at timestamptz not null default now(),
  unique (board_code, voter_hash)
);
create index if not exists ask_answers_board on public.ask_answers(board_code);
alter table public.ask_boards enable row level security;  -- 정책 없음: 서버만
alter table public.ask_answers enable row level security;

-- 답변 추가 + 카운트 증가를 한 번에 (상한 초과·중복이면 false)
create or replace function public.add_ask_answer(p_code text, p_voter text, p_teto boolean, p_ei text, p_sn text, p_tf text, p_jp text, p_charm int, p_love int, p_animal int, p_island int, p_max int)
returns text language plpgsql security definer set search_path = public as $$
declare n int;
begin
  update ask_boards set answer_count = answer_count + 1, last_answer_at = now() where code = p_code and answer_count < p_max returning answer_count into n;
  if n is null then
    if exists (select 1 from ask_boards where code = p_code) then return 'full'; end if;
    return 'not_found';
  end if;
  begin
    insert into ask_answers(board_code, voter_hash, teto, ei, sn, tf, jp, charm, love, animal, island)
    values (p_code, p_voter, p_teto, p_ei, p_sn, p_tf, p_jp, p_charm, p_love, p_animal, p_island);
  exception when unique_violation then
    update ask_boards set answer_count = answer_count - 1 where code = p_code;
    return 'duplicate';
  end;
  return 'ok';
end $$;
revoke execute on function public.add_ask_answer(text, text, boolean, text, text, text, text, int, int, int, int, int) from public, anon, authenticated;
grant execute on function public.add_ask_answer(text, text, boolean, text, text, text, text, int, int, int, int, int) to service_role;

-- 1년 동안 새 답변이 없는 보드 자동 삭제 (매일 아침 크론에서 호출)
create or replace function public.cleanup_ask_boards()
returns int language sql security definer set search_path = public as $$
  with d as (delete from ask_boards where coalesce(last_answer_at, created_at) < now() - interval '1 year' returning 1)
  select count(*)::int from d;
$$;
revoke execute on function public.cleanup_ask_boards() from public, anon, authenticated;
grant execute on function public.cleanup_ask_boards() to service_role;
