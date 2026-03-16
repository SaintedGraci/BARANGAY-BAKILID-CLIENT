-- =====================================================
-- FIX RESIDENTS RLS POLICIES
-- =====================================================
-- Allow admins to create resident records
-- =====================================================

-- Drop existing policies
drop policy if exists "Users can view their own resident data" on public.residents;
drop policy if exists "Users can insert their own resident data" on public.residents;
drop policy if exists "Users can update their own resident data" on public.residents;

-- Create new policies

-- 1. Allow users to view their own data
create policy "Users can view their own resident data"
  on public.residents for select
  using (auth.uid() = user_id);

-- 2. Allow admins to view all residents
create policy "Admins can view all residents"
  on public.residents for select
  using (
    auth.uid() in (
      select user_id from public.admin_users where is_active = true
    )
  );

-- 3. Allow admins to insert new residents
create policy "Admins can insert residents"
  on public.residents for insert
  with check (
    auth.uid() in (
      select user_id from public.admin_users where is_active = true
    )
  );

-- 4. Allow users to update their own data
create policy "Users can update their own resident data"
  on public.residents for update
  using (auth.uid() = user_id);

-- 5. Allow admins to update any resident
create policy "Admins can update any resident"
  on public.residents for update
  using (
    auth.uid() in (
      select user_id from public.admin_users where is_active = true
    )
  );

-- Verify policies are created
select schemaname, tablename, policyname, permissive, roles, cmd, qual
from pg_policies
where tablename = 'residents';
