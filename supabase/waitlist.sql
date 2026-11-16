-- Launch waitlist. Paste into the Supabase SQL editor and run once.
-- The website can only add rows. Export the list from the dashboard (Table Editor -> waitlist -> Export to CSV).

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consent boolean not null,
  consent_text text not null,
  source text,
  created_at timestamptz not null default now(),
  constraint waitlist_consent_given check (consent = true)
);

alter table public.waitlist enable row level security;

-- Insert only. There are no select, update or delete policies, so nobody can read or change the list from the site.
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (consent = true);

-- Belt and braces: take away the table privileges the site never needs, so reads fail even if a policy is added by mistake.
revoke select, update, delete, truncate on public.waitlist from anon, authenticated;
grant insert on public.waitlist to anon, authenticated;
