import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Browser helper for Next.js (client components)
export function createBrowserSupabase() {
  return createBrowserSupabaseClient();
}

export default createBrowserSupabase;
