# Quick Start - Supabase Setup

## 1. Install Dependencies

```bash
npm install
```

## 2. Create .env.local File

Create a file named `.env.local` in the `brgybakilid_client` directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 3. Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Go to Settings → API
4. Copy:
   - **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Run the Development Server

```bash
npm run dev
```

## 5. Test the Connection

Create a test file to verify Supabase is working:

```typescript
// app/test-supabase/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('residents').select('count')
  
  return (
    <div>
      <h1>Supabase Connection Test</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Connected successfully!</p>
      )}
    </div>
  )
}
```

## That's it! 🎉

Your Supabase is now configured. Check `SUPABASE_SETUP.md` for detailed documentation.
