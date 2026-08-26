create table if not exists public.user_data (
  user_id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

-- Mode BNPNV : les identifiants de démonstration sont vérifiés par l’application.
-- Pour une utilisation réelle, remplacer ces policies par Supabase Auth + auth.uid().
drop policy if exists "demo public read" on public.user_data;
drop policy if exists "demo public insert" on public.user_data;
drop policy if exists "demo public update" on public.user_data;

create policy "demo public read"
on public.user_data for select using (true);

create policy "demo public insert"
on public.user_data for insert with check (true);

create policy "demo public update"
on public.user_data for update using (true) with check (true);
