import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import tutorRoutes from './routes/tutorRoutes';
import sessionRoutes from './routes/sessionRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Tutor Management System API is running');
});

// API Routes
app.use('/students', studentRoutes);
app.use('/tutors', tutorRoutes);
app.use('/sessions', sessionRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

