-- =====================================================
-- Barangay Bakilid Smart System - Database Schema
-- =====================================================
-- Run this script in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor
-- =====================================================

-- =====================================================
-- 1. RESIDENTS TABLE
-- =====================================================
create table if not exists public.residents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  first_name text not null,
  middle_name text,
  last_name text not null,
  suffix text,
  email text not null,
  phone text,
  date_of_birth date,
  gender text check (gender in ('Male', 'Female', 'Other')),
  civil_status text check (civil_status in ('Single', 'Married', 'Widowed', 'Separated', 'Divorced')),
  address text not null,
  purok text,
  occupation text,
  emergency_contact_name text,
  emergency_contact_phone text,
  profile_image_url text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.residents enable row level security;

-- RLS Policies for residents
create policy "Users can view their own resident data"
  on public.residents for select
  using (auth.uid() = user_id);

create policy "Users can insert their own resident data"
  on public.residents for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resident data"
  on public.residents for update
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists residents_user_id_idx on public.residents(user_id);
create index if not exists residents_email_idx on public.residents(email);

-- =====================================================
-- 2. DOCUMENTS TABLE
-- =====================================================
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  resident_id uuid references public.residents(id) on delete cascade not null,
  document_type text not null check (document_type in (
    'Barangay Clearance',
    'Certificate of Residency',
    'Certificate of Indigency',
    'Business Permit',
    'Building Permit',
    'Community Tax Certificate',
    'Other'
  )),
  purpose text not null,
  status text default 'pending' not null check (status in ('pending', 'processing', 'ready', 'released', 'rejected')),
  request_date timestamp with time zone default timezone('utc'::text, now()) not null,
  processing_date timestamp with time zone,
  completion_date timestamp with time zone,
  release_date timestamp with time zone,
  rejection_reason text,
  notes text,
  tracking_number text unique,
  processed_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.documents enable row level security;

-- RLS Policies for documents
create policy "Users can view their own documents"
  on public.documents for select
  using (resident_id in (select id from public.residents where user_id = auth.uid()));

create policy "Users can insert their own documents"
  on public.documents for insert
  with check (resident_id in (select id from public.residents where user_id = auth.uid()));

-- Create indexes
create index if not exists documents_resident_id_idx on public.documents(resident_id);
create index if not exists documents_status_idx on public.documents(status);
create index if not exists documents_tracking_number_idx on public.documents(tracking_number);

-- =====================================================
-- 3. ANNOUNCEMENTS TABLE
-- =====================================================
create table if not exists public.announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  excerpt text,
  category text not null check (category in ('Event', 'Announcement', 'Meeting', 'Alert', 'News', 'Other')),
  priority text default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  published_date timestamp with time zone default timezone('utc'::text, now()) not null,
  expiry_date timestamp with time zone,
  author_id uuid references auth.users(id) not null,
  image_url text,
  is_published boolean default true,
  views_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.announcements enable row level security;

-- RLS Policies for announcements
create policy "Anyone can view published announcements"
  on public.announcements for select
  using (is_published = true);

-- Create indexes
create index if not exists announcements_published_date_idx on public.announcements(published_date desc);
create index if not exists announcements_category_idx on public.announcements(category);
create index if not exists announcements_is_published_idx on public.announcements(is_published);

-- =====================================================
-- 4. ADMIN USERS TABLE
-- =====================================================
create table if not exists public.admin_users (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role text not null check (role in ('super_admin', 'admin', 'staff')),
  permissions jsonb default '[]'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.admin_users enable row level security;

-- RLS Policies for admin_users
create policy "Admins can view all admin users"
  on public.admin_users for select
  using (auth.uid() in (select user_id from public.admin_users where is_active = true));

-- Create index
create index if not exists admin_users_user_id_idx on public.admin_users(user_id);

-- =====================================================
-- 5. AUDIT LOGS TABLE
-- =====================================================
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.audit_logs enable row level security;

-- RLS Policies for audit_logs
create policy "Only admins can view audit logs"
  on public.audit_logs for select
  using (auth.uid() in (select user_id from public.admin_users where is_active = true));

-- Create indexes
create index if not exists audit_logs_user_id_idx on public.audit_logs(user_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index if not exists audit_logs_table_name_idx on public.audit_logs(table_name);

-- =====================================================
-- 6. FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_residents_updated_at
  before update on public.residents
  for each row execute function public.handle_updated_at();

create trigger handle_documents_updated_at
  before update on public.documents
  for each row execute function public.handle_updated_at();

create trigger handle_announcements_updated_at
  before update on public.announcements
  for each row execute function public.handle_updated_at();

create trigger handle_admin_users_updated_at
  before update on public.admin_users
  for each row execute function public.handle_updated_at();

-- Function to generate tracking number for documents
create or replace function public.generate_tracking_number()
returns trigger as $$
begin
  new.tracking_number = 'BRG-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(gen_random_uuid()::text, 1, 8));
  return new;
end;
$$ language plpgsql;

-- Create trigger for tracking number
create trigger generate_document_tracking_number
  before insert on public.documents
  for each row execute function public.generate_tracking_number();

-- =====================================================
-- 7. SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Note: Sample data will be added after you create your first user
-- You can manually insert announcements after authentication is set up

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Sign up your first user via the application
-- 2. Create your first admin user in the admin_users table
-- 3. Test the connection by visiting /test-supabase
-- 4. Start building your application features
-- =====================================================
