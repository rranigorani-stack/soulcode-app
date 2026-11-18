-- 990원 1회 이용권(티켓): AI 해석 1회 또는 PRO 스킨 1개 평생 소장
alter table public.entitlements add column if not exists tickets int not null default 0 check (tickets >= 0);
alter table public.entitlements add column if not exists skins text[] not null default '{}';

create or replace function public.add_tickets(p_user uuid, p_n int)
returns int language sql security definer set search_path = public as $$
  insert into entitlements(user_id, tickets) values (p_user, greatest(p_n, 0))
  on conflict (user_id) do update set tickets = entitlements.tickets + p_n, updated_at = now()
  returning tickets;
$$;

create or replace function public.use_ticket(p_user uuid)
returns int language sql security definer set search_path = public as $$
  update entitlements set tickets = tickets - 1, updated_at = now()
  where user_id = p_user and tickets > 0
  returning tickets;
$$;

create or replace function public.unlock_skin(p_user uuid, p_skin text)
returns text[] language sql security definer set search_path = public as $$
  update entitlements set tickets = tickets - 1, skins = array_append(skins, p_skin), updated_at = now()
  where user_id = p_user and tickets > 0 and not (p_skin = any(skins))
  returning skins;
$$;

revoke execute on function public.add_tickets(uuid, int) from public, anon, authenticated;
revoke execute on function public.use_ticket(uuid) from public, anon, authenticated;
revoke execute on function public.unlock_skin(uuid, text) from public, anon, authenticated;
grant execute on function public.add_tickets(uuid, int) to service_role;
grant execute on function public.use_ticket(uuid) to service_role;
grant execute on function public.unlock_skin(uuid, text) to service_role;
