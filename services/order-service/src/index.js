import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

// Pass DB pool to request generic middleware if needed, or import in controller
// For now, let's keep it simple and import pool in controller or pass it.
// I'll export a helper for DB or just instanciate in controller.

app.use('/api/orders', orderRoutes);

app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'healthy', service: 'order-service' });
    } catch (err) {
        res.status(500).json({ status: 'unhealthy', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
