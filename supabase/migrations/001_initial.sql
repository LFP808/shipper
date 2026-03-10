-- Shipper: initial schema

create table public.item_templates (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  length_in   numeric(6,2) not null,
  width_in    numeric(6,2) not null,
  height_in   numeric(6,2) not null,
  weight_lb   numeric(6,3) not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.item_templates enable row level security;

create policy "Users own their templates"
  on public.item_templates for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index item_templates_user_id_idx on public.item_templates(user_id);

create table public.packing_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  label       text,
  items       jsonb not null,
  result      jsonb,
  created_at  timestamptz default now()
);

alter table public.packing_sessions enable row level security;

create policy "Users own their sessions"
  on public.packing_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index packing_sessions_user_id_idx on public.packing_sessions(user_id);
