import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Server Component / Server-side helper for Next.js (app router)
export function createServerSupabase() {
  return createServerComponentClient({ cookies });
}

export default createServerSupabase;
