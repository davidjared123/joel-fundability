import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://leqrrbrybsitaurukgrc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcXJyYnJ5YnNpdGF1cnVrZ3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzc0MTYsImV4cCI6MjA2NzkxMzQxNn0.9HJPv2wFssNgb-_To4rSoKcpoozjK4UXCG9qMDf3GcM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
