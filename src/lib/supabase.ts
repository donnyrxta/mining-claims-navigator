import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required. Please make sure you have connected to Supabase in the Lovable interface.');
}

// Create client with empty strings as fallback to prevent runtime crashes
export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};