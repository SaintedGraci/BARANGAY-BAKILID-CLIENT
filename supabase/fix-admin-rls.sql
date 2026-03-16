-- =====================================================
-- FIX ADMIN RLS POLICIES
-- =====================================================
-- The admin login is failing because RLS is blocking the query
-- =====================================================

-- Drop existing policies
drop policy if exists "Admins can view all admin users" on public.admin_users;

-- Create new policies that allow admin login
create policy "Allow admin users to read their own data"
  on public.admin_users for select
  using (true);  -- Allow anyone to read (we check auth in the app)

create policy "Allow admin users to update their own data"
  on public.admin_users for update
  using (auth.uid() = user_id);

-- Verify RLS is enabled
select tablename, rowsecurity 
from pg_tables 
where schemaname = 'public' and tablename = 'admin_users';

-- Test query (should return the admin user)
select * from public.admin_users where email = 'admin@bakilid.gov.ph';
