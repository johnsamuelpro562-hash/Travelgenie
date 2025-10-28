# Supabase integration helpers — which files to use

This project contains two client environments and a server (backend). Below are the small helper files scaffolded to make Supabase usage straightforward. Use the helper that matches your runtime.

1) Next.js (app router — server + client)

- Location: `client/utils/supabase/next`
  - `server.ts` — use in Next.js Server Components (`app` route). Exposes `createServerSupabase()` which binds a Supabase client to incoming cookies using `createServerComponentClient` from `@supabase/auth-helpers-nextjs`.
  - `client.ts` — use in Next.js Client Components. Exposes `createBrowserSupabase()` which calls `createBrowserSupabaseClient()`.
  - `middleware.ts` — example helper for using Supabase inside Next.js middleware; returns `{ supabase, response }` so you can set cookies on the response.

  Example server component usage:

  ```tsx
  import { createServerSupabase } from '@/utils/supabase/next/server';

  export default async function Page() {
    const supabase = createServerSupabase();
    const { data: todos } = await supabase.from('todos').select();
    return (
      <ul>{todos?.map(t => <li key={t.id}>{t.title}</li>)}</ul>
    );
  }
  ```

2) Expo / React Native (mobile client)

- Location: `client/utils/supabase/expo/client.ts`
  - `supabase` — preconfigured client instance using `@supabase/supabase-js`. Use this throughout your mobile app.

  Example usage in RN:

  ```ts
  import { supabase } from '@/utils/supabase/expo/client';

  const { data } = await supabase.from('todos').select();
  ```

3) Server-side (Node.js / Express backend)

- Location: `server/utils/supabaseClient.ts` — already present. This file creates a server-only Supabase client using `SUPABASE_SERVICE_ROLE_KEY` when available, and falls back to a no-op mock for local development if not.

Environment variables
- For client-side (browser or Expo) usage set these (client/public):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- For server-side only (do NOT commit these):
  - `SUPABASE_SERVICE_ROLE_KEY` (use on backend only)
  - `SUPABASE_URL` (or reuse the public URL)

Packages to install (per environment)
- Next.js app router:
  - `npm install @supabase/auth-helpers-nextjs @supabase/supabase-js`
- Expo / React Native:
  - `npm install @supabase/supabase-js`
- Server (already added or scaffolded):
  - `npm install @supabase/supabase-js`

Expo specific: you can also put public keys into `client/app.json` under `expo.extra` (already added) and read them in the app using `expo-constants`:

```ts
import Constants from 'expo-constants';
const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = Constants.expoConfig?.extra || {};
```

Security note: the anon key is safe to ship to clients. Never put the `service_role` key in client-side files or commit it to source control.

Notes
- These helpers are intentionally small; they assume you will install the corresponding packages and wire environment variables. If you want, I can also add a small README inside `client/` with exact install commands for both environments and add a `.env.local.example` for Next.js.
