import { Request, Response, NextFunction } from 'express';
import supabaseAdmin from '../utils/supabaseClient';

// Simple middleware skeleton to validate Supabase JWTs from clients.
// If no token provided, the middleware simply sets req.user = null and continues.
export const supabaseAuth = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  try {
    const authHeader = (req.headers.authorization as string) || '';
    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      req.user = null;
      return next();
    }

    // Attempt to get user from Supabase
    const { data, error } = await supabaseAdmin.auth.getUser(token as string as any);
    if (error) {
      console.warn('supabaseAuth: token validation error', error.message || error);
      req.user = null;
      return next();
    }

    req.user = data?.user ?? null;
    return next();
  } catch (e) {
    console.warn('supabaseAuth unexpected error', e);
    (req as any).user = null;
    return next();
  }
};

export default supabaseAuth;
