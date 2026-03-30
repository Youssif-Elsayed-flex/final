const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/auth');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Add new product
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { name, brand, category, price, description, stock } = req.body;
        
        let imagePath = null;
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        } else if (req.body.image) {
            imagePath = req.body.image; // fallback for URLs if no file uploaded
        }

        const [result] = await pool.query(
            'INSERT INTO products (name, brand, category, price, image, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, brand, category, price, imagePath, description, stock || 10]
        );
        res.status(201).json({ message: 'Product created', id: result.insertId });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Edit product
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    try {
        const { name, brand, category, price, description, stock } = req.body;
        
        let updateQuery = 'UPDATE products SET name=?, brand=?, category=?, price=?, description=?, stock=?';
        let queryParams = [name, brand, category, price, description, stock];

        if (req.file) {
            updateQuery += ', image=?';
            queryParams.push(`/uploads/${req.file.filename}`);
        } else if (req.body.image) {
            updateQuery += ', image=?';
            queryParams.push(req.body.image);
        }

        updateQuery += ' WHERE id=?';
        queryParams.push(id);

        await pool.query(updateQuery, queryParams);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Delete product
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
