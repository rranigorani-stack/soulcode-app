-- 회원 탈퇴 후에도 결제 기록은 5년 보관 (전자상거래법) → 회원 연결만 끊음
alter table public.payments alter column user_id drop not null;
alter table public.payments drop constraint if exists payments_user_id_fkey;
alter table public.payments add constraint payments_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete set null;
