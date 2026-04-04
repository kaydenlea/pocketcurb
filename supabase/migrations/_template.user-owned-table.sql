do $template$
begin
  raise exception 'Template file only. Copy this pattern into a timestamped migration and replace the example names before applying.';
end
$template$;

-- Example pattern for a user-owned table with direct client access under RLS.
--
-- create table public.example_user_owned_resource (
--   id uuid primary key default gen_random_uuid(),
--   user_id uuid not null references auth.users (id) on delete cascade,
--   display_name text not null check (char_length(display_name) <= 120),
--   created_at timestamptz not null default timezone('utc', now()),
--   updated_at timestamptz not null default timezone('utc', now())
-- );
--
-- create index example_user_owned_resource_user_id_idx
--   on public.example_user_owned_resource (user_id);
--
-- alter table public.example_user_owned_resource enable row level security;
--
-- create policy "example_user_owned_resource_select_own"
--   on public.example_user_owned_resource
--   for select
--   to authenticated
--   using (auth.uid() = user_id);
--
-- create policy "example_user_owned_resource_insert_own"
--   on public.example_user_owned_resource
--   for insert
--   to authenticated
--   with check (auth.uid() = user_id);
--
-- create policy "example_user_owned_resource_update_own"
--   on public.example_user_owned_resource
--   for update
--   to authenticated
--   using (auth.uid() = user_id)
--   with check (auth.uid() = user_id);
--
-- create policy "example_user_owned_resource_delete_own"
--   on public.example_user_owned_resource
--   for delete
--   to authenticated
--   using (auth.uid() = user_id);

