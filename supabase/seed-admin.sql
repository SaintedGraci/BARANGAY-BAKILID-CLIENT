-- =====================================================
-- Seed Admin Account for Barangay Bakilid
-- =====================================================
-- This creates an admin account for barangay staff
-- =====================================================

-- STEP 1: Create Admin User in Supabase Dashboard
-- =====================================================
-- Go to: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users
-- Click "Add User"
-- Email: admin@bakilid.gov.ph
-- Password: BakilidAdmin2026!
-- Auto Confirm User: YES (check this box)
-- Copy the User ID after creation

-- =====================================================
-- STEP 2: Insert Admin Profile
-- =====================================================
-- Replace 'ADMIN_USER_ID_HERE' with the actual UUID from auth.users

insert into public.admin_users (
  user_id,
  username,
  email,
  full_name,
  role,
  is_active
) values (
  'ADMIN_USER_ID_HERE',  -- Replace with actual user_id from auth.users
  'admin',
  'admin@bakilid.gov.ph',
  'Barangay Bakilid Administrator',
  'super_admin',
  true
);

-- =====================================================
-- Verification Query
-- =====================================================
-- After inserting, verify the admin was created:

select 
  a.id,
  a.username,
  a.email,
  a.full_name,
  a.role,
  a.is_active,
  u.email as auth_email,
  u.created_at as user_created_at
from public.admin_users a
join auth.users u on u.id = a.user_id
where a.email = 'admin@bakilid.gov.ph';

-- =====================================================
-- Test Admin Login Credentials
-- =====================================================
-- Email: admin@bakilid.gov.ph
-- Password: BakilidAdmin2026!
-- =====================================================
