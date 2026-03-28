-- Standard PostgreSQL Schema for VINTIE Fashion Store

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  image TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  badge TEXT,
  rating NUMERIC(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users Table (for Authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers Table (Marketing/Orders)
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  items_count INTEGER NOT NULL,
  items JSONB,
  shipping_address JSONB,
  status TEXT DEFAULT 'processing',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  product TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  used INTEGER DEFAULT 0,
  expires TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Data
INSERT INTO categories (name, image, count) VALUES
('Set Collection', 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=80', 12),
('T-Shirt', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80', 25),
('Hoodie Outfit', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80', 8)
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (name, price, original_price, category, stock, image, badge, rating, reviews) VALUES
('Luxe Wool Cardigan', 89000, 120000, 'Set Collection', 15, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80', 'New', 4.8, 124),
('Classic Cotton Tee', 15000, 25000, 'T-Shirt', 42, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80', 'Sale', 4.5, 89),
('Oversized Hoodie', 45000, NULL, 'Hoodie Outfit', 8, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', NULL, 4.9, 56),
('Minimalist Chinos', 55000, 75000, 'Set Collection', 20, 'https://images.unsplash.com/photo-1473966968600-fa804b86d30b?w=800&q=80', NULL, 4.6, 32)
ON CONFLICT DO NOTHING;

-- Initial Admin User (password is 'admin123' hashed)
INSERT INTO users (email, password, full_name, is_admin) VALUES
('admin@vintie.com', '$2a$10$Xm7uE1.A6uRzYjZg5Jp0EeFpG1Y6oGkX9JzE1pG1Y6oGkX9JzE1pG', 'Vintie Admin', TRUE)
ON CONFLICT (email) DO NOTHING;
