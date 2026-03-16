# Admin Dashboard Setup Guide

## Step 1: Create Admin Account in Supabase

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users

2. Click **"Add User"** button

3. Fill in the details:
   - **Email**: `admin@bakilid.gov.ph`
   - **Password**: `bakilidadmin123`
   - **Auto Confirm User**: ✅ YES (check this box)

4. Click **"Create User"**

5. **Copy the User ID** (UUID) that appears

## Step 2: Create Admin Profile

1. Go to SQL Editor: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/sql

2. Run this SQL (replace `YOUR_USER_ID_HERE` with the UUID you copied):

```sql
insert into public.admin_users (
  user_id,
  username,
  email,
  full_name,
  role,
  is_active
) values (
  'YOUR_USER_ID_HERE',
  'admin',
  'admin@bakilid.gov.ph',
  'Barangay Bakilid Administrator',
  'super_admin',
  true
);
```

3. Verify it worked:

```sql
select * from public.admin_users where email = 'admin@bakilid.gov.ph';
```

## Step 3: Add Onboarding Fields (Optional)

Run the SQL from `supabase/add-onboarding-fields.sql` to add tracking fields for resident onboarding.

## Step 4: Login as Admin

1. Go to: http://localhost:3000/login

2. Login with:
   - **Email**: `admin@bakilid.gov.ph`
   - **Password**: `BakilidAdmin2026!`

3. You'll be redirected to: http://localhost:3000/admin

## Admin Dashboard Features

### ✅ Implemented:
- Admin authentication and authorization
- Dashboard overview with stats
- **Create Resident Account** - Full functionality
  - Creates auth user
  - Creates resident profile
  - Sends email with credentials
  - Resident completes onboarding on first login

### 🚧 Coming Soon:
- View all residents list
- Manage document requests
- Post announcements
- Verify uploaded documents
- Generate reports

## Creating a Resident Account

1. Click **"Create Resident Account"** button
2. Fill in the form:
   - First Name, Middle Name, Last Name
   - Email (resident will use this to login)
   - Temporary Password (min. 6 characters)
   - Phone Number
   - Address
   - Purok
3. Click **"Create Account"**
4. Resident receives email with credentials
5. On first login, resident is redirected to onboarding to:
   - Verify email & phone
   - Complete profile details
   - Upload ID documents
6. After onboarding, resident can access full dashboard

## System Flow

```
Admin Creates Account (basic info)
         ↓
Resident Receives Email
         ↓
Resident Logs In (first time)
         ↓
Auto-Redirect to Onboarding
         ↓
Complete 3-Step Verification
         ↓
Access Full Dashboard
```

## Troubleshooting

**Admin can't login:**
- Verify admin_users record exists
- Check user_id matches auth.users

**Can't create resident:**
- Check Supabase connection
- Verify RLS policies allow insert
- Check browser console for errors

**Resident not redirected to onboarding:**
- Verify is_verified = false in residents table
- Check login logic in app/login/page.tsx
