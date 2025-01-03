import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Check if environment variables are available
const supabaseUrl = "https://exstysvgvzgdkawbqzje.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c3R5c3ZndnpnZGthd2JxemplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MzYyMTksImV4cCI6MjA1MTQxMjIxOX0.K6jbXata4cpAxfl76z8ir8HEdkajIC5aWzkaqIUoU3w";

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};