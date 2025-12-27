import pool from '../db.js';
import { fetchOrders as fetchAmazonOrders } from '../adapters/amazonAdapter.js';

export const syncOrders = async (req, res) => {
    const { userId, store } = req.body; // In real app, userId from token

    try {
        let orders = [];
        if (store === 'amazon') {
            orders = await fetchAmazonOrders();
        } else {
            return res.status(400).json({ error: 'Unsupported store' });
        }

        const savedOrders = [];

        for (const order of orders) {
            // Upsert logic
            const existing = await pool.query(
                'SELECT id FROM orders WHERE external_order_id = $1 AND store_name = $2',
                [order.external_order_id, 'Amazon']
            );

            if (existing.rows.length === 0) {
                const newOrder = await pool.query(
                    `INSERT INTO orders 
          (user_id, store_name, external_order_id, status, total_amount, currency, shipping_details, items) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                    [
                        userId || 1, // Default to user 1 for now if not provided
                        'Amazon',
                        order.external_order_id,
                        order.status,
                        order.total_amount,
                        order.currency,
                        JSON.stringify(order.shipping_details),
                        JSON.stringify(order.items)
                    ]
                );
                savedOrders.push(newOrder.rows[0]);
            }
        }

        res.json({ message: 'Sync complete', synced: savedOrders.length, details: savedOrders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Sync failed' });
    }
};

export const getOrders = async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId || 1]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fetch failed' });
    }
};
