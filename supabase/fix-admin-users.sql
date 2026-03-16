-- =====================================================
-- Fix Admin Users Table - Add Missing Columns
-- =====================================================
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add missing columns to admin_users table
alter table public.admin_users 
add column if not exists username text unique,
add column if not exists email text not null,
add column if not exists full_name text not null;

-- Add comment for clarity
comment on column public.admin_users.username is 'Unique username for admin login';
comment on column public.admin_users.email is 'Admin email address';
comment on column public.admin_users.full_name is 'Full name of the admin user';

-- Now you can insert the admin user
-- Replace 'YOUR_USER_ID_HERE' with the actual UUID from auth.users

insert into public.admin_users (
  user_id,
  username,
  email,
  full_name,
  role,
  is_active
) values (
  'c0e90ee6-3962-4f1a-b986-69edd09da9ab',  -- Your copied user_id
  'admin',
  'admin@bakilid.gov.ph',
  'Barangay Bakilid Administrator',
  'super_admin',
  true
);

-- Verify it worked
select 
  a.id,
  a.username,
  a.email,
  a.full_name,
  a.role,
  a.is_active,
  u.email as auth_email
from public.admin_users a
join auth.users u on u.id = a.user_id
where a.email = 'admin@bakilid.gov.ph';
