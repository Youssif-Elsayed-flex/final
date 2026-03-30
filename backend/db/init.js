const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
  try {
    // Connect without a specific db first to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log("Connected to MySQL successfully.");
    const dbName = process.env.DB_NAME || 'mobile_store';

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' ensured.`);

    await connection.query(`USE \`${dbName}\``);

    // Create Tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        description TEXT,
        stock INT DEFAULT 10,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table 'products' ensured.");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table 'orders' ensured.");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    console.log("Table 'order_items' ensured.");

    // Check if products exist, otherwise insert samples
    const [rows] = await connection.query(`SELECT COUNT(*) as count FROM products`);
    if (rows[0].count === 0) {
      console.log("Inserting sample products...");
      const sampleProducts = [
        ['iPhone 15 Pro Max', 'Apple', 'Smartphone', 1199.99, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400', 'The latest titanium iPhone with A17 Pro chip and advanced camera system.', 50],
        ['iPhone 14', 'Apple', 'Smartphone', 799.99, 'https://images.unsplash.com/photo-1663408465225-78e731acb88e?auto=format&fit=crop&q=80&w=400', 'A powerful phone with an amazing battery life and dual-camera system.', 75],
        ['Samsung Galaxy S24 Ultra', 'Samsung', 'Smartphone', 1299.99, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=400', 'AI-powered flagship with a Titanium frame, Snapdragon 8 Gen 3, and a 200MP camera.', 40],
        ['Samsung Galaxy A54', 'Samsung', 'Smartphone', 449.99, 'https://images.unsplash.com/photo-1659771146603-911bfa82a472?auto=format&fit=crop&q=80&w=400', 'A mid-range masterpiece offering a great screen and reliable performance.', 100],
        ['Xiaomi 14 Pro', 'Xiaomi', 'Smartphone', 899.99, 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=400', 'Premium phone featuring a Leica camera system and super-fast charging.', 30],
        ['Oppo Find X6 Pro', 'Oppo', 'Smartphone', 950.00, 'https://images.unsplash.com/photo-1621330396173-e31b1c0fd1e7?auto=format&fit=crop&q=80&w=400', 'Flagship performance with an outstanding low-light camera.', 25],
        ['Apple AirPods Pro (2nd Gen)', 'Apple', 'Earphones', 249.00, 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=400', 'Rich audio quality, enhanced active noise cancellation, and a customizable fit.', 150],
        ['Samsung Galaxy Buds2 Pro', 'Samsung', 'Earphones', 229.00, 'https://images.unsplash.com/photo-1606220588913-b3db77ab0c6b?auto=format&fit=crop&q=80&w=400', '24-bit Hi-Fi audio, ANC, and a comfortable, ergonomic design.', 120],
        ['Apple Watch Series 9', 'Apple', 'Smart Watch', 399.00, 'https://images.unsplash.com/photo-1434493789847-2f02b3c22409?auto=format&fit=crop&q=80&w=400', 'Smarter, brighter, and mightier with the S9 chip and double tap gesture.', 60],
        ['Samsung Galaxy Watch 6', 'Samsung', 'Smart Watch', 299.00, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400', 'Advanced health tracking, improved sleep coaching, and a larger screen.', 80],
        ['Anker 20W Fast USB-C Charger', 'Anker', 'Charger', 19.99, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=400', 'Compact, super-fast wall charger compatible with all modern smartphones.', 300],
        ['Apple 20W USB-C Power Adapter', 'Apple', 'Charger', 19.00, 'https://images.unsplash.com/photo-1622359239851-bcce763efd5b?auto=format&fit=crop&q=80&w=400', 'Fast, efficient charging at home, in the office, or on the go.', 250],
        ['Spigen MagSafe Case for iPhone 15', 'Spigen', 'Case', 29.99, 'https://images.unsplash.com/photo-1605646183416-0157fbe1fcc8?auto=format&fit=crop&q=80&w=400', 'Durable, clear case with integrated MagSafe technology.', 200],
        ['Samsung Silicone Cover with Strap', 'Samsung', 'Case', 34.99, 'https://images.unsplash.com/photo-1541877864350-5806443c2db7?auto=format&fit=crop&q=80&w=400', 'Soft silicone case with a stylish built-in strap for a secure grip.', 150],
        ['UGREEN 10000mAh Power Bank', 'UGREEN', 'Accessories', 39.99, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=400', 'Portable charger with 20W PD fast charging capabilities.', 90],
        ['Sony WH-1000XM5 Wireless Headphones', 'Sony', 'Earphones', 398.00, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400', 'Industry-leading noise cancellation, crystal clear calling, and Alexa voice control.', 45]
      ];

      const insertQuery = `INSERT INTO products (name, brand, category, price, image, description, stock) VALUES ?`;
      await connection.query(insertQuery, [sampleProducts]);
      console.log("16 sample products inserted successfully!");
    } else {
      console.log("Products table already has data. Skipping insertion.");
    }

    await connection.end();
    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

initDB();
