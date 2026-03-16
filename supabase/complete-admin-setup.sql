-- =====================================================
-- COMPLETE ADMIN SETUP - Run this entire file
-- =====================================================
-- This will set up everything needed for admin access
-- =====================================================

-- STEP 1: Add missing columns to admin_users table
-- =====================================================
alter table public.admin_users 
add column if not exists username text unique,
add column if not exists email text,
add column if not exists full_name text;

-- STEP 2: Insert admin user
-- =====================================================
-- Replace 'YOUR_USER_ID_HERE' with the UUID from the admin user you created
-- in Supabase Dashboard -> Authentication -> Users

-- If you haven't created the auth user yet:
-- 1. Go to: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users
-- 2. Click "Add User"
-- 3. Email: admin@bakilid.gov.ph
-- 4. Password: BakilidAdmin2026!
-- 5. Auto Confirm User: YES
-- 6. Copy the User ID and paste it below

insert into public.admin_users (
  user_id,
  username,
  email,
  full_name,
  role,
  is_active
) values (
  'f3131992-a991-4cd3-88e2-7a7146444aab',  -- REPLACE THIS with your copied UUID
  'admin',
  'admin@bakilid.gov.ph',
  'Barangay Bakilid Administrator',
  'super_admin',
  true
)
on conflict (user_id) do update set
  username = excluded.username,
  email = excluded.email,
  full_name = excluded.full_name,
  role = excluded.role,
  is_active = excluded.is_active;

-- STEP 3: Verify the admin was created
-- =====================================================
select 
  a.id,
  a.user_id,
  a.username,
  a.email,
  a.full_name,
  a.role,
  a.is_active,
  u.email as auth_email,
  u.created_at
from public.admin_users a
join auth.users u on u.id = a.user_id
where a.email = 'admin@bakilid.gov.ph';

-- If you see a row returned, you're all set!
-- Login at: http://localhost:3000/admin/login
-- Email: admin@bakilid.gov.ph
-- Password: BakilidAdmin2026!
