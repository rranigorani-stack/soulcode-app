-- AI 비용 안전장치: 하루 전체 AI 호출 예산 (무료 호출 / 전체 호출) + 토큰 사용량 기록
create table if not exists public.ai_budget (
  day date primary key,
  free_calls int not null default 0,
  total_calls int not null default 0,
  in_tokens bigint not null default 0,
  out_tokens bigint not null default 0
);
alter table public.ai_budget enable row level security; -- 정책 없음: 서버(service role)만 접근

-- 예산 1회 차감. 무료 호출은 무료 한도와 전체 한도를 모두, 유료(PRO·티켓)는 전체 한도만 확인
create or replace function public.take_ai_budget(p_day date, p_free boolean, p_free_cap int, p_total_cap int)
returns boolean language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  insert into ai_budget(day) values (p_day) on conflict (day) do nothing;
  update ai_budget
     set total_calls = total_calls + 1,
         free_calls = free_calls + case when p_free then 1 else 0 end
   where day = p_day
     and total_calls < p_total_cap
     and (not p_free or free_calls < p_free_cap)
  returning true into ok;
  return coalesce(ok, false);
end $$;

create or replace function public.refund_ai_budget(p_day date, p_free boolean)
returns void language sql security definer set search_path = public as $$
  update ai_budget
     set total_calls = greatest(total_calls - 1, 0),
         free_calls = greatest(free_calls - case when p_free then 1 else 0 end, 0)
   where day = p_day;
$$;

create or replace function public.add_ai_tokens(p_day date, p_in int, p_out int)
returns void language sql security definer set search_path = public as $$
  update ai_budget set in_tokens = in_tokens + greatest(p_in, 0), out_tokens = out_tokens + greatest(p_out, 0) where day = p_day;
$$;

revoke execute on function public.take_ai_budget(date, boolean, int, int) from public, anon, authenticated;
revoke execute on function public.refund_ai_budget(date, boolean) from public, anon, authenticated;
revoke execute on function public.add_ai_tokens(date, int, int) from public, anon, authenticated;
grant execute on function public.take_ai_budget(date, boolean, int, int) to service_role;
grant execute on function public.refund_ai_budget(date, boolean) to service_role;
grant execute on function public.add_ai_tokens(date, int, int) to service_role;
