# Create First Resident Account

## Security Model ✅
- ❌ Residents CANNOT self-register
- ✅ Only Barangay staff can create resident accounts
- ✅ This ensures proper verification and security

## Quick Steps (2 minutes)

### Step 1: Create Auth User in Supabase

1. Go to: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/auth/users

2. Click **"Add User"** button (top right)

3. Fill in the form:
   ```
   Email: resident@bakilid.test
   Password: Bakilid2026!
   ☑️ Auto Confirm User (CHECK THIS BOX!)
   ```

4. Click **"Create User"**

5. **COPY THE USER ID** (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 2: Create Resident Profile

1. Go to SQL Editor: https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe/editor

2. Click **"New Query"**

3. Paste this SQL (replace `USER_ID_HERE` with the ID you copied):

```sql
insert into public.residents (
  user_id,
  first_name,
  middle_name,
  last_name,
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
  'USER_ID_HERE',  -- PASTE YOUR USER ID HERE
  'Juan',
  'Santos',
  'Dela Cruz',
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
```

4. Click **"Run"**

### Step 3: Verify

Run this query to verify:

```sql
select 
  r.first_name,
  r.last_name,
  r.email,
  r.is_verified,
  u.email as auth_email
from public.residents r
join auth.users u on u.id = r.user_id
where r.email = 'resident@bakilid.test';
```

You should see:
```
first_name: Juan
last_name: Dela Cruz
email: resident@bakilid.test
is_verified: true
auth_email: resident@bakilid.test
```

### Step 4: Test Login

Now you can test login with:
```
Email: resident@bakilid.test
Password: Bakilid2026!
```

## ✅ Done!

You now have a test resident account that was created by the barangay (you).

## For Production

In production, you'll create a barangay admin panel where staff can:
1. Enter resident information
2. System creates the auth account
3. System sends credentials to resident
4. Resident can login and access services

## Create More Residents

To create more residents, repeat the steps above with different:
- Email addresses
- Names
- Personal information

## Example: Create Second Resident

```sql
-- Step 1: Create user in Auth (via Dashboard)
-- Email: maria.santos@bakilid.test
-- Password: Bakilid2026!

-- Step 2: Insert resident profile
insert into public.residents (
  user_id,
  first_name,
  last_name,
  email,
  phone,
  date_of_birth,
  gender,
  civil_status,
  address,
  purok,
  is_verified
) values (
  'USER_ID_HERE',  -- Replace with actual user_id
  'Maria',
  'Santos',
  'maria.santos@bakilid.test',
  '09111222333',
  '1992-05-20',
  'Female',
  'Married',
  'Block 2 Lot 10, Bakilid, Mandaue City',
  'Purok 2',
  true
);
```

## Security Notes

✅ **Good Practices:**
- Only verified barangay staff can create accounts
- Passwords are securely hashed by Supabase
- Row Level Security prevents unauthorized access
- Audit logs track all account creation

❌ **Never:**
- Share admin credentials
- Allow public registration
- Store passwords in plain text
- Skip verification process

---

**Your first resident account is ready!** 🎉
