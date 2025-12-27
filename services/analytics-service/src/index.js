import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'healthy', service: 'analytics-service' }));

app.listen(PORT, () => console.log(`Analytics Service running on port ${PORT}`));
