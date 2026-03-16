-- =====================================================
-- Sample Data for Barangay Bakilid Smart System
-- =====================================================
-- Run this AFTER you have created your first user
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID
-- =====================================================

-- Get your user ID from: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users
-- Or run: SELECT id FROM auth.users;

-- =====================================================
-- 1. Sample Announcements
-- =====================================================

insert into public.announcements (title, content, excerpt, category, priority, author_id)
values 
(
  'Welcome to Barangay Bakilid Smart System',
  'We are excited to announce the launch of our new digital platform. Residents can now request documents online, view announcements, and access barangay services 24/7. This system aims to make government services more accessible and efficient for all residents of Barangay Bakilid.',
  'Launch of our new digital platform for easier access to barangay services.',
  'Announcement',
  'high',
  'YOUR_USER_ID_HERE'  -- Replace with your user ID
),
(
  'Community Clean-Up Drive',
  'Join us for our monthly community clean-up drive this Saturday, March 20, 2026, at 7:00 AM. Meeting point is at the Barangay Hall. Let''s work together to keep our community clean and green. Bring your own gloves and trash bags. Snacks will be provided.',
  'Monthly community clean-up drive this Saturday at 7:00 AM.',
  'Event',
  'normal',
  'YOUR_USER_ID_HERE'  -- Replace with your user ID
),
(
  'Barangay Assembly Meeting',
  'All residents are invited to attend the quarterly barangay assembly meeting on March 25, 2026, at 2:00 PM at the Barangay Hall. We will discuss community projects, budget allocation, and upcoming events. Your participation is important.',
  'Quarterly barangay assembly meeting on March 25 at 2:00 PM.',
  'Meeting',
  'normal',
  'YOUR_USER_ID_HERE'  -- Replace with your user ID
);

-- =====================================================
-- 2. Make yourself an admin
-- =====================================================

insert into public.admin_users (user_id, role, is_active)
values (
  'YOUR_USER_ID_HERE',  -- Replace with your user ID
  'super_admin',
  true
);

-- =====================================================
-- SAMPLE DATA INSERTED!
-- =====================================================
-- You can now:
-- 1. View announcements on the homepage
-- 2. Access admin features
-- 3. Test document requests
-- =====================================================
