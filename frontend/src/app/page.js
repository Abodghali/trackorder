'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAmazon, FaShippingFast, FaCheckCircle } from 'react-icons/fa';

export default function Home() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock fetch orders (In real app, call API)
    // For demo, we can just trigger the sync endpoint
    const syncOrders = async () => {
        setLoading(true);
        try {
            // In Docker localhost:3002 is the order service
            const res = await axios.post(`${process.env.NEXT_PUBLIC_ORDER_API}/api/orders/sync`, {
                userId: 1,
                store: 'amazon'
            });
            // After sync, fetch all
            const fetchRes = await axios.get(`${process.env.NEXT_PUBLIC_ORDER_API}/api/orders?userId=1`);
            setOrders(fetchRes.data);
        } catch (err) {
            console.error("Sync failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        // fetchOrders();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard</h2>
                    <p className="text-gray-400">Welcome back, Ghalib.</p>
                </div>
                <button
                    onClick={syncOrders}
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? 'Syncing...' : 'Sync Orders'}
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Monthly Spending" value="$240.50" change="+12%" />
                <StatCard title="Active Shipments" value="3" change="On time" />
                <StatCard title="Total Savings" value="$45.00" change="Rewards" />
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            No orders found. Click "Sync Orders" to fetch mock data.
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-800 rounded-lg text-orange-400 text-xl">
                                        <FaAmazon />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Order #{order.external_order_id.substring(0, 10)}...</h4>
                                        <p className="text-sm text-gray-400">{order.items?.length || 1} items • {order.store_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-gray-300">${order.total_amount}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

const StatCard = ({ title, value, change }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl">
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white">{value}</span>
            <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">{change}</span>
        </div>
    </div>
)
