import { Request, Response } from 'express';
import supabaseAdmin from '../utils/supabaseClient';

// Mocked flight search controller — returns cached results when available, otherwise a simple mock
export const searchFlights = async (req: Request, res: Response) => {
  try {
    const { from, to, departDate } = req.body;
    if (!from || !to || !departDate) {
      return res.status(400).json({ error: 'from, to, and departDate are required' });
    }

    const searchHash = `${from}-${to}-${departDate}`;

    // Try to find cached results in Supabase
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('flights_cache')
        .select('results, expires_at')
        .eq('search_hash', searchHash)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn('Supabase cache lookup error', error.message || error);
      }

      if (data && data.expires_at && new Date(data.expires_at) > new Date()) {
        return res.json({ fromCache: true, results: data.results });
      }
    }

    // Otherwise return a mocked set of flight options
    const now = new Date(departDate).toISOString();
    const mockResults = [
      {
        id: 'mock-1',
        provider: 'mock',
        price: 250.0,
        currency: 'USD',
        segments: [
          { from, to, depart: now, arrive: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), durationMinutes: 180 },
        ],
        highlights: 'Cheapest option',
      },
      {
        id: 'mock-2',
        provider: 'mock',
        price: 420.0,
        currency: 'USD',
        segments: [
          { from, to, depart: now, arrive: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), durationMinutes: 120 },
        ],
        highlights: 'Fastest option',
      },
    ];

    // Cache results in Supabase for a short period (if configured)
    if (supabaseAdmin) {
      const expiresAt = new Date(Date.now() + 1000 * 60 * 10).toISOString(); // 10 minutes
      try {
        await supabaseAdmin.from('flights_cache').upsert({ search_hash: searchHash, results: mockResults, provider: 'mock', expires_at: expiresAt });
      } catch (e) {
        console.warn('Failed to write flights_cache', e);
      }
    }

    return res.json({ fromCache: false, results: mockResults });
  } catch (err: any) {
    console.error('searchFlights error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { searchFlights };
