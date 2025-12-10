-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  regular_price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  on_sale BOOLEAN DEFAULT FALSE,
  stock_status TEXT DEFAULT 'instock',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  alt TEXT,
  name TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Categories Junction Table
CREATE TABLE IF NOT EXISTS product_categories (
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Insert sample data
INSERT INTO categories (name, slug, description) VALUES
  ('Bouquets', 'bouquets', 'Beautiful flower bouquets'),
  ('Stems', 'stems', 'Individual flower stems'),
  ('Arrangements', 'arrangements', 'Elegant floral arrangements')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, regular_price, sale_price, on_sale, stock_status, featured) VALUES
  ('Handmade Rose Bouquet', 'handmade-rose-bouquet', 'Beautiful handcrafted rose bouquet', 45.00, 45.00, NULL, FALSE, 'instock', TRUE),
  ('Silk Peony Arrangement', 'silk-peony-arrangement', 'Elegant silk peony arrangement', 35.00, 50.00, 35.00, TRUE, 'instock', TRUE),
  ('Mixed Flower Collection', 'mixed-flower-collection', 'Assorted handmade flowers', 60.00, 60.00, NULL, FALSE, 'instock', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- Add images for products (you'll need to adjust the product_id based on actual IDs)
-- Upload images to Supabase Exora bucket first, then add them here
INSERT INTO product_images (product_id, src, alt, name, display_order)
SELECT 
  p.id,
  'photo_1_2025-12-10_23-57-59.jpg',
  'Handmade Rose',
  'rose',
  0
FROM products p WHERE p.slug = 'handmade-rose-bouquet'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, src, alt, name, display_order)
SELECT 
  p.id,
  'photo_2_2025-12-10_23-57-59.jpg',
  'Silk Peony',
  'peony',
  0
FROM products p WHERE p.slug = 'silk-peony-arrangement'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, src, alt, name, display_order)
SELECT 
  p.id,
  'photo_3_2025-12-10_23-57-59.jpg',
  'Mixed Flowers',
  'mixed',
  0
FROM products p WHERE p.slug = 'mixed-flower-collection'
ON CONFLICT DO NOTHING;
