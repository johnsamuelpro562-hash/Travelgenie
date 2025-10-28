import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: any = null;
let supabaseAnon: any = null;

if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  supabaseAnon = createClient(SUPABASE_URL, process.env.SUPABASE_ANON_KEY || '');
} else {
  console.warn('Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Supabase client will be a no-op mock.');

  // Minimal no-op mock to avoid runtime crashes during local dev without envs
  const noop = async () => ({ data: null, error: null });

  supabaseAdmin = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: (table: string) => ({
      select: () => ({ maybeSingle: noop }),
      eq: () => ({ limit: () => ({ maybeSingle: noop }) }),
      upsert: async () => ({ data: null, error: null }),
    }),
  } as any;
  supabaseAnon = supabaseAdmin;
}

export { supabaseAdmin, supabaseAnon };
export default supabaseAdmin;
