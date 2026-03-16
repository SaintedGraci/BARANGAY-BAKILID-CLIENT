-- =====================================================
-- Seed First Resident Account
-- =====================================================
-- This creates a test resident account for development
-- In production, barangay staff will create accounts
-- =====================================================

-- Step 1: Create the auth user (this is the login account)
-- Note: You need to run this in Supabase Dashboard → Authentication → Add User
-- Or use the Supabase API to create the user programmatically

-- For now, we'll create a user manually:
-- Email: resident@bakilid.test
-- Password: Bakilid2026!

-- After creating the user in Supabase Auth, get the user_id and run this:

-- =====================================================
-- Step 2: Insert Resident Profile
-- =====================================================
-- Replace 'USER_ID_FROM_AUTH' with the actual UUID from auth.users

insert into public.residents (
  user_id,
  first_name,
  middle_name,
  last_name,
  suffix,
  email,
  phone,
  date_of_birth,
  gender,
  civil_status,
  address,
  purok,
  occupation,
  emergency_contact_name,
  emergency_contact_phone,
  is_verified
) values (
  'USER_ID_FROM_AUTH',  -- Replace this with actual user_id from auth.users
  'Juan',
  'Santos',
  'Dela Cruz',
  null,
  'resident@bakilid.test',
  '09123456789',
  '1990-01-15',
  'Male',
  'Single',
  'Block 1 Lot 5, Bakilid, Mandaue City',
  'Purok 1',
  'Software Developer',
  'Maria Dela Cruz',
  '09987654321',
  true
);

-- =====================================================
-- Alternative: Complete Script with User Creation
-- =====================================================
-- If you want to create everything at once, use this approach:

-- This creates a user via SQL (requires service_role key)
-- DO NOT use this in production - use Supabase Auth API instead

/*
-- Create auth user
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'resident@bakilid.test',
  crypt('Bakilid2026!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) returning id;

-- Then use the returned ID to insert into residents table
*/

-- =====================================================
-- RECOMMENDED APPROACH: Use Supabase Dashboard
-- =====================================================

-- 1. Go to: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users
-- 2. Click "Add User" button
-- 3. Fill in:
--    Email: resident@bakilid.test
--    Password: Bakilid2026!
--    Auto Confirm User: YES (check this box)
-- 4. Click "Create User"
-- 5. Copy the User ID (UUID)
-- 6. Come back here and replace 'USER_ID_FROM_AUTH' above
-- 7. Run the INSERT statement

-- =====================================================
-- Verification Query
-- =====================================================

-- After inserting, verify the resident was created:
select 
  r.id,
  r.first_name,
  r.last_name,
  r.email,
  r.is_verified,
  u.email as auth_email,
  u.created_at as user_created_at
from public.residents r
join auth.users u on u.id = r.user_id
where r.email = 'resident@bakilid.test';

-- =====================================================
-- Test Login Credentials
-- =====================================================
-- Email: resident@bakilid.test
-- Password: Bakilid2026!
-- =====================================================
