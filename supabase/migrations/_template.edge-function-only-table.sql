do $template$
begin
  raise exception 'Template file only. Copy this pattern into a timestamped migration and replace the example names before applying.';
end
$template$;

-- Example pattern for server-authoritative or internal-only operational state.
-- This class of table should not be directly readable by mobile or web clients.
--
-- create table public.example_server_only_job (
--   id uuid primary key default gen_random_uuid(),
--   requested_by_user_id uuid not null references auth.users (id) on delete restrict,
--   job_state text not null,
--   payload jsonb not null default '{}'::jsonb,
--   created_at timestamptz not null default timezone('utc', now())
-- );
--
-- create index example_server_only_job_requested_by_user_id_idx
--   on public.example_server_only_job (requested_by_user_id);
--
-- alter table public.example_server_only_job enable row level security;
--
-- Do not add broad authenticated client policies here.
-- Access should be mediated by Edge Functions or other privileged server-side paths only.
-- If a narrow read policy is ever required, document the rationale in the task spec and security docs first.

