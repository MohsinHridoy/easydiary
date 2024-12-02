// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnxewwftdefkpdktybho.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueGV3d2Z0ZGVma3Bka3R5YmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNzk3MzEsImV4cCI6MjA0ODY1NTczMX0.Pt754CVdpcvO6A71BBQSEiqp7yVPXC977AbH8cziiBE'; // Replace with your Supabase API Key

export const supabase = createClient(supabaseUrl, supabaseKey);
