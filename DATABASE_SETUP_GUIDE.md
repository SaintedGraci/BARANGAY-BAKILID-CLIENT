# 🚀 Quick Database Setup Guide

## Current Status
✅ Supabase Connected  
⚠️ Tables Not Created Yet

## Fix in 3 Easy Steps

### Step 1: Open SQL Editor (30 seconds)

Click this link:
```
https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor
```

Or manually:
1. Go to https://supabase.com/dashboard
2. Select your project: **poihxyhqtvkcvcstkyhe**
3. Click **SQL Editor** in the left sidebar

### Step 2: Copy & Paste SQL (1 minute)

1. Open the file: `brgybakilid_client/supabase/schema.sql`
2. **Select All** (Ctrl+A / Cmd+A)
3. **Copy** (Ctrl+C / Cmd+C)
4. Go back to Supabase SQL Editor
5. Click **"New Query"**
6. **Paste** the SQL (Ctrl+V / Cmd+V)
7. Click **"Run"** button (bottom right)

### Step 3: Verify (30 seconds)

1. Go to **Table Editor** in Supabase
2. You should see 5 new tables:
   - ✅ residents
   - ✅ documents
   - ✅ announcements
   - ✅ admin_users
   - ✅ audit_logs

3. Refresh your test page:
   ```
   http://localhost:3001/test-supabase
   ```

4. The database error should be **GONE**! ✅

## What You Get

### 📋 5 Database Tables
- **residents** - User profiles and information
- **documents** - Document requests with tracking
- **announcements** - Barangay news and updates
- **admin_users** - Admin role management
- **audit_logs** - Activity tracking

### 🔒 Security Features
- Row Level Security (RLS) enabled
- Users can only see their own data
- Automatic data validation
- Audit logging

### ⚡ Automatic Features
- Auto-updating timestamps
- Auto-generating tracking numbers
- Data integrity checks
- Foreign key relationships

## After Setup

### Enable Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

### Create First Admin

After signing up, run this SQL:

```sql
insert into public.admin_users (user_id, role)
values (
  'YOUR_USER_ID',  -- Get from auth.users table
  'super_admin'
);
```

## Need Help?

Check these files:
- `supabase/schema.sql` - Full database schema
- `supabase/README.md` - Detailed documentation
- `SUPABASE_STATUS.md` - Configuration status

## Quick Links

- 🔗 [SQL Editor](https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor)
- 🔗 [Table Editor](https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor)
- 🔗 [Authentication](https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users)
- 🔗 [API Docs](https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/api)

---

**That's it!** Your database will be ready in less than 3 minutes. 🎉
