# Database Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Open Supabase SQL Editor

Click this link to open your SQL Editor:
👉 **https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor**

### Step 2: Run the Schema (Creates Tables)

1. Click **"New Query"** button
2. Copy the entire contents of `schema.sql` file
3. Paste it into the SQL editor
4. Click **"Run"** button (or press Ctrl/Cmd + Enter)
5. Wait for the success message ✅

### Step 3: Verify Tables Created

Go to **Table Editor** in your Supabase dashboard:
👉 **https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor**

You should see these tables:
- ✅ residents
- ✅ documents
- ✅ announcements
- ✅ admin_users
- ✅ audit_logs

### Step 4: Test the Connection

Visit your test page:
```
http://localhost:3001/test-supabase
```

The database error should now be gone! ✅

### Step 5: Add Sample Data (Optional)

After creating your first user:
1. Get your user ID from: **Authentication** → **Users** in Supabase
2. Open `sample-data.sql`
3. Replace `'YOUR_USER_ID_HERE'` with your actual user ID
4. Run the SQL in Supabase SQL Editor

## What Was Created

### Tables

1. **residents** - Store resident information
   - Personal details (name, email, phone, address)
   - Emergency contacts
   - Profile verification status

2. **documents** - Document requests
   - Document type (Clearance, Certificate, etc.)
   - Status tracking (pending → processing → ready → released)
   - Tracking numbers
   - Purpose and notes

3. **announcements** - Barangay announcements
   - Title, content, category
   - Priority levels
   - Published/unpublished status
   - View counts

4. **admin_users** - Admin management
   - Roles (super_admin, admin, staff)
   - Permissions
   - Active/inactive status

5. **audit_logs** - Activity tracking
   - User actions
   - Data changes
   - IP addresses and timestamps

### Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Policies** to protect user data
✅ **Automatic timestamps** (created_at, updated_at)
✅ **Tracking numbers** for documents
✅ **Data validation** with CHECK constraints

### Automatic Features

- 🔄 Auto-updating `updated_at` timestamps
- 🎫 Auto-generating tracking numbers for documents
- 🔒 User data isolation (users can only see their own data)
- 📊 Audit logging for admin actions

## Next Steps

### 1. Create Your First Admin User

After signing up a user, run this SQL to make them an admin:

```sql
insert into public.admin_users (user_id, role)
values (
  'YOUR_USER_ID_HERE',  -- Get this from auth.users table
  'super_admin'
);
```

### 2. Enable Authentication

In Supabase Dashboard → **Authentication** → **Providers**:
- ✅ Enable Email/Password
- ✅ Configure email templates
- ✅ (Optional) Enable social providers

### 3. Test Document Request

Try creating a document request:

```typescript
const { data, error } = await supabase
  .from('documents')
  .insert({
    resident_id: 'YOUR_RESIDENT_ID',
    document_type: 'Barangay Clearance',
    purpose: 'Employment requirement'
  })
```

## Troubleshooting

### Issue: "permission denied for table"
**Solution:** Make sure RLS policies are created. Re-run the schema.sql file.

### Issue: "relation already exists"
**Solution:** Tables already created. You can skip this step or drop tables first.

### Issue: "insert or update on table violates foreign key constraint"
**Solution:** Make sure the user exists in auth.users before inserting into residents.

## Database Diagram

```
auth.users (Supabase Auth)
    ↓
residents (user_id → auth.users.id)
    ↓
documents (resident_id → residents.id)

admin_users (user_id → auth.users.id)
    ↓
announcements (author_id → auth.users.id)

audit_logs (user_id → auth.users.id)
```

## Useful SQL Queries

### View all residents
```sql
select * from public.residents;
```

### View pending documents
```sql
select * from public.documents where status = 'pending';
```

### View recent announcements
```sql
select * from public.announcements 
where is_published = true 
order by published_date desc 
limit 10;
```

### Count documents by status
```sql
select status, count(*) 
from public.documents 
group by status;
```

## Support

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify RLS policies are enabled
3. Check the browser console for errors
4. Review the SQL error messages

---

**Setup Complete!** 🎉

Your database is now ready for the Barangay Bakilid Smart System.
