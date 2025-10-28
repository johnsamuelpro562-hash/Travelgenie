import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// TypeScript may not have ambient types for 'next/headers' in some setups; ignore the module-not-found error here.
// @ts-ignore
import { cookies } from 'next/headers';

// Server Component / Server-side helper for Next.js (app router)
export function createServerSupabase() {
  return createServerComponentClient({ cookies });
}

export default createServerSupabase;
