create table public.gajanan_lab_reports (
  id uuid primary key default gen_random_uuid(),
  batch_number text not null unique check (batch_number ~ '^[A-Z0-9_/-]{1,100}$'),
  product_name text check (char_length(product_name) <= 160),
  report_date date,
  storage_path text not null unique check (storage_path ~ '^[A-Z0-9_-]+/[0-9a-f-]+[.](pdf|png|jpg|webp)$'),
  mime_type text not null check (mime_type in ('application/pdf', 'image/png', 'image/jpeg', 'image/webp')),
  created_at timestamptz not null default now()
);

create index gajanan_lab_reports_created_at_idx on public.gajanan_lab_reports (created_at desc);

alter table public.gajanan_lab_reports enable row level security;
revoke all on table public.gajanan_lab_reports from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lab-reports', 'lab-reports', false, 26214400, array['application/pdf', 'image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
