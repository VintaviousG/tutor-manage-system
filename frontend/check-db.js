const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data: students } = await supabase.from('students').select('id, email').limit(1);
  const { data: tutors } = await supabase.from('tutors').select('id, email').limit(1);
  console.log('Students:', students);
  console.log('Tutors:', tutors);
}
main();
