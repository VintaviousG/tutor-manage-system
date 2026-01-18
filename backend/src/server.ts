import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Basic Route
app.get('/', (req, res) => {
  res.send('Tutor Management System API is running');
});

//API Routes
//Students Routes
app.get('/api/students', async (req, res) => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

//Tutors Routes
app.get('/api/tutors', async (req, res) => {
  const { data, error } = await supabase.from('tutors').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
