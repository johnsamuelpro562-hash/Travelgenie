"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAnon = exports.supabaseAdmin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabaseAdmin = null;
exports.supabaseAdmin = supabaseAdmin;
let supabaseAnon = null;
exports.supabaseAnon = supabaseAnon;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    exports.supabaseAdmin = supabaseAdmin = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
    });
    exports.supabaseAnon = supabaseAnon = (0, supabase_js_1.createClient)(SUPABASE_URL, process.env.SUPABASE_ANON_KEY || '');
}
else {
    console.warn('Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Supabase client will be a no-op mock.');
    // Minimal no-op mock to avoid runtime crashes during local dev without envs
    const noop = async () => ({ data: null, error: null });
    exports.supabaseAdmin = supabaseAdmin = {
        auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
        },
        from: (table) => ({
            select: () => ({ maybeSingle: noop }),
            eq: () => ({ limit: () => ({ maybeSingle: noop }) }),
            upsert: async () => ({ data: null, error: null }),
        }),
    };
    exports.supabaseAnon = supabaseAnon = supabaseAdmin;
}
exports.default = supabaseAdmin;
