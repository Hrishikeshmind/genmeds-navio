
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
// For development purposes, you can use placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
