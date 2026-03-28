const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vintie_secret_key_123';

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Middleware to verify Admin role
const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ error: 'Forbidden: Admin access only' });
  }
  next();
};

// --- AUTH ROUTES ---

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, is_admin',
      [email, hashedPassword, fullName]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, email: user.email, full_name: user.full_name, is_admin: user.is_admin }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Current User
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, full_name, is_admin FROM users WHERE id = $1', [req.user.id]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CONTENT ROUTES ---

// Products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', authenticateToken, adminOnly, async (req, res) => {
  const { name, price, original_price, category, stock, image, badge, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, original_price, category, stock, image, badge, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, price, original_price, category, stock, image, badge, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', authenticateToken, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { name, price, original_price, category, stock, image, badge, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name=$1, price=$2, original_price=$3, category=$4, stock=$5, image=$6, badge=$7, description=$8 WHERE id=$9 RETURNING *',
      [name, price, original_price, category, stock, image, badge, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', authenticateToken, adminOnly, async (req, res) => {
  const { name, image, count } = req.body;
  try {
    const result = await pool.query('INSERT INTO categories (name, image, count) VALUES ($1, $2, $3) RETURNING *', [name, image, count]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/categories/:id', authenticateToken, adminOnly, async (req, res) => {
  const { name, image, count } = req.body;
  try {
    const result = await pool.query('UPDATE categories SET name=$1, image=$2, count=$3 WHERE id=$4 RETURNING *', [name, image, count, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/testimonials', authenticateToken, adminOnly, async (req, res) => {
  const { name, avatar, text, rating } = req.body;
  try {
    const result = await pool.query('INSERT INTO testimonials (name, avatar, text, rating) VALUES ($1, $2, $3, $4) RETURNING *', [name, avatar, text, rating]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/testimonials/:id', authenticateToken, adminOnly, async (req, res) => {
  const { name, avatar, text, rating } = req.body;
  try {
    const result = await pool.query('UPDATE testimonials SET name=$1, avatar=$2, text=$3, rating=$4 WHERE id=$5 RETURNING *', [name, avatar, text, rating, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/testimonials/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Blog Posts
app.get('/api/blog_posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/blog_posts/:id', authenticateToken, adminOnly, async (req, res) => {
  const { title, category, image, excerpt } = req.body;
  try {
    const result = await pool.query('UPDATE blog_posts SET title=$1, category=$2, image=$3, excerpt=$4 WHERE id=$5 RETURNING *', [title, category, image, excerpt, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/blog_posts/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blog_posts', authenticateToken, adminOnly, async (req, res) => {
  const { title, category, image, excerpt } = req.body;
  try {
    const result = await pool.query('INSERT INTO blog_posts (title, category, image, excerpt) VALUES ($1, $2, $3, $4) RETURNING *', [title, category, image, excerpt]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Orders
app.get('/api/orders', authenticateToken, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders/user', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE customer_email = $1 ORDER BY created_at DESC', [req.user.email]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  const { id, customer_name, customer_email, amount, items_count, items, shipping_address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (id, customer_name, customer_email, amount, items_count, items, shipping_address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, customer_name, customer_email, amount, items_count, JSON.stringify(items), JSON.stringify(shipping_address)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Customers
app.get('/api/customers', authenticateToken, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY joined_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
