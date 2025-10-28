"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAuth = void 0;
const supabaseClient_1 = __importDefault(require("../utils/supabaseClient"));
// Simple middleware skeleton to validate Supabase JWTs from clients.
// If no token provided, the middleware simply sets req.user = null and continues.
const supabaseAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
        const token = tokenMatch ? tokenMatch[1] : null;
        if (!token) {
            req.user = null;
            return next();
        }
        // Attempt to get user from Supabase
        const { data, error } = await supabaseClient_1.default.auth.getUser(token);
        if (error) {
            console.warn('supabaseAuth: token validation error', error.message || error);
            req.user = null;
            return next();
        }
        req.user = data?.user ?? null;
        return next();
    }
    catch (e) {
        console.warn('supabaseAuth unexpected error', e);
        req.user = null;
        return next();
    }
};
exports.supabaseAuth = supabaseAuth;
exports.default = exports.supabaseAuth;
