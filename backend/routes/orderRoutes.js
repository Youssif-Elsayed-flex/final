const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Create order
router.post('/', async (req, res) => {
    const { name, email, phone, address, cart, total_price } = req.body;
    
    if (!name || !email || !phone || !address || !cart || cart.length === 0) {
        return res.status(400).json({ error: 'All fields and cart items are required' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert order
        const [orderResult] = await connection.query(
            'INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_price) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, address, total_price]
        );
        
        const orderId = orderResult.insertId;

        // Prepare order items
        const orderItems = cart.map(item => [orderId, item.id, item.quantity, item.price]);
        
        // Insert order items
        await connection.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
            [orderItems]
        );

        await connection.commit();
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (err) {
        await connection.rollback();
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        connection.release();
    }
});

module.exports = router;
