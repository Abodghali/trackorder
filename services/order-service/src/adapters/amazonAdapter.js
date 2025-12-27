// This is a mock adapter. In production, this would use the Amazon Selling Partner API.

export const fetchOrders = async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock data
    return [
        {
            external_order_id: '114-1234567-8901234',
            status: 'Shipped',
            total_amount: 29.99,
            currency: 'USD',
            items: [
                { name: 'Wireless Mouse', quantity: 1, price: 15.00 },
                { name: 'Mouse Pad', quantity: 1, price: 14.99 }
            ],
            shipping_details: {
                courier: 'Amazon Logistics',
                tracking_number: 'TBA123456789012'
            }
        },
        {
            external_order_id: '114-7654321-0987654',
            status: 'Delivered',
            total_amount: 120.50,
            currency: 'USD',
            items: [
                { name: 'Mechanical Keyboard', quantity: 1, price: 120.50 }
            ],
            shipping_details: {
                courier: 'Amazon Logistics',
                tracking_number: 'TBA098765432109'
            }
        }
    ];
};
