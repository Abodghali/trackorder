import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

// Database Pool
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

// Health Check
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'healthy', db: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'unhealthy', db: err.message });
    }
});

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Auth Service v1.0');
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
