-- =====================================================
-- VERIFY AND FIX ADMIN ACCOUNT
-- =====================================================

-- STEP 1: Find the admin user ID from auth.users
-- =====================================================
select 
  id as user_id,
  email,
  created_at,
  email_confirmed_at
from auth.users 
where email = 'admin@bakilid.gov.ph';

-- Copy the 'user_id' from the result above

-- STEP 2: Check if admin_users record exists
-- =====================================================
select * from public.admin_users 
where user_id in (
  select id from auth.users where email = 'admin@bakilid.gov.ph'
);

-- If no rows returned, the admin_users record is missing!

-- STEP 3: Add missing columns (if needed)
-- =====================================================
alter table public.admin_users 
add column if not exists username text,
add column if not exists email text,
add column if not exists full_name text;

-- STEP 4: Insert admin_users record
-- =====================================================
-- This will automatically get the user_id from auth.users
insert into public.admin_users (
  user_id,
  username,
  email,
  full_name,
  role,
  is_active
)
select 
  id,
  'admin',
  'admin@bakilid.gov.ph',
  'Barangay Bakilid Administrator',
  'super_admin',
  true
from auth.users 
where email = 'admin@bakilid.gov.ph'
on conflict (user_id) do update set
  username = excluded.username,
  email = excluded.email,
  full_name = excluded.full_name,
  role = excluded.role,
  is_active = excluded.is_active;

-- STEP 5: Verify it worked
-- =====================================================
select 
  a.id,
  a.user_id,
  a.username,
  a.email,
  a.full_name,
  a.role,
  a.is_active,
  u.email as auth_email
from public.admin_users a
join auth.users u on u.id = a.user_id
where a.email = 'admin@bakilid.gov.ph';

-- You should see one row with all the admin details
-- If you see it, you can now login at: http://localhost:3000/admin/login
