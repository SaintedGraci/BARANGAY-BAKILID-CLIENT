# Supabase Setup Guide for Barangay Bakilid Smart System

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Node.js installed on your machine

## Step 1: Install Dependencies

Run the following command in the `brgybakilid_client` directory:

```bash
npm install
```

This will install the required Supabase packages:
- `@supabase/supabase-js` - Supabase JavaScript client
- `@supabase/ssr` - Supabase SSR helpers for Next.js

## Step 2: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in your project details:
   - Project name: `barangay-bakilid`
   - Database password: (create a strong password)
   - Region: Choose the closest to your location
4. Click "Create new project"
5. Wait for the project to be set up (takes about 2 minutes)

## Step 3: Get Your Supabase Credentials

1. In your Supabase project dashboard, click on the "Settings" icon (gear icon)
2. Go to "API" section
3. You'll find two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 4: Configure Environment Variables

1. In the `brgybakilid_client` directory, create a new file called `.env.local`
2. Copy the contents from `.env.local.example`
3. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 5: Verify Setup

The Supabase client is now configured and ready to use. You can import it in your components:

### Client-side usage (in Client Components):
```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
```

### Server-side usage (in Server Components):
```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
```

## File Structure

```
brgybakilid_client/
├── lib/
│   └── supabase/
│       ├── client.ts       # Client-side Supabase client
│       ├── server.ts       # Server-side Supabase client
│       └── middleware.ts   # Middleware for session management
├── middleware.ts           # Next.js middleware
├── .env.local             # Your environment variables (create this)
└── .env.local.example     # Example environment variables
```

## Next Steps

### Create Database Tables

You'll need to create tables in Supabase for your application. Here are some suggested tables:

1. **residents** - Store resident information
2. **documents** - Store document requests
3. **announcements** - Store barangay announcements
4. **users** - Managed by Supabase Auth automatically

### Example: Create a residents table

Go to your Supabase dashboard → SQL Editor and run:

```sql
create table residents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table residents enable row level security;

-- Create policy to allow users to read their own data
create policy "Users can view their own resident data"
  on residents for select
  using (auth.uid() = user_id);

-- Create policy to allow users to update their own data
create policy "Users can update their own resident data"
  on residents for update
  using (auth.uid() = user_id);
```

## Authentication Setup

Supabase Auth is automatically configured. You can use it for:
- Email/Password authentication
- Social logins (Google, Facebook, etc.)
- Magic links
- Phone authentication

### Example: Sign up a user

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
})
```

### Example: Sign in a user

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password',
})
```

## Troubleshooting

### Issue: "Invalid API key"
- Double-check your `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Make sure there are no extra spaces or quotes

### Issue: "Failed to fetch"
- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check if your Supabase project is active

### Issue: Environment variables not loading
- Restart your development server after creating/updating `.env.local`
- Make sure the file is named exactly `.env.local` (not `.env` or `.env.development`)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Database Documentation](https://supabase.com/docs/guides/database)

## Support

If you encounter any issues, check:
1. Supabase project status in the dashboard
2. Browser console for error messages
3. Next.js terminal output for server errors
