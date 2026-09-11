create table public.gajanan_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  phone_country_code text not null check (phone_country_code ~ '^\\+[0-9]{1,4}$'),
  phone_number text not null check (char_length(phone_number) between 6 and 30),
  company text,
  enquiry_type text not null check (enquiry_type in ('domestic', 'export')),
  exporting_country text,
  message text not null check (char_length(message) between 8 and 4000),
  status text not null default 'new' check (status in ('new', 'in-progress', 'resolved')),
  email_sent_at timestamptz
);

create index gajanan_enquiries_created_at_idx
  on public.gajanan_enquiries (created_at desc);

alter table public.gajanan_enquiries enable row level security;

-- All access is through the server-side Edge Function. No public Data API policy
-- is granted, so visitors cannot list, alter, or delete enquiry records.
