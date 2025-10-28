import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// @ts-ignore
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Example middleware helper that returns a response with any cookies set by Supabase
export function createSupabaseMiddleware(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerComponentClient({
    // @ts-ignore - helper expects cookies from next/headers; middleware uses request.cookies
    cookies: request.cookies,
  });

  // Return both the supabase client and the response so callers can set cookies
  return { supabase, response } as const;
}

export default createSupabaseMiddleware;
