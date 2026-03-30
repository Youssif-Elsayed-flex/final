const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Very simple hardcoded admin verification
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
        return res.status(200).json({ message: 'Login successful', token });
    }

    res.status(401).json({ error: 'Invalid admin credentials' });
});

module.exports = router;
