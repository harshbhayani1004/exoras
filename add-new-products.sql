-- Add new products to the database
-- Run this SQL in Supabase SQL Editor

-- Product 12: Elegant White Lily Arrangement
INSERT INTO products (name, slug, description, price, regular_price, on_sale, sale_price, stock_quantity, featured)
VALUES (
  'Elegant White Lily',
  'elegant-white-lily',
  'This stunning white lily arrangement captures the essence of purity and elegance with its gracefully curved petals and delicate stamens. Each bloom is meticulously handcrafted to showcase the natural beauty of lilies, featuring pristine white petals that seem to glow with an inner radiance. The realistic texture and form make this piece perfect for adding a touch of sophistication to any space. Ideal for creating a serene atmosphere in living rooms, bedrooms, or office spaces where a sense of calm and refinement is desired.',
  49.99,
  49.99,
  false,
  NULL,
  100,
  true
);

-- Product 13: Vibrant Coral Peony
INSERT INTO products (name, slug, description, price, regular_price, on_sale, sale_price, stock_quantity, featured)
VALUES (
  'Vibrant Coral Peony',
  'vibrant-coral-peony',
  'Embrace the warmth of nature with this gorgeous coral-colored peony arrangement. The lush, full blooms feature layers upon layers of soft, ruffled petals in a stunning coral hue that brings life and energy to any room. Each petal is individually crafted and arranged to create the signature full, romantic appearance that peonies are known for. The warm coral tone works beautifully as a focal point or accent piece, complementing both modern and traditional interiors while adding a cheerful, inviting atmosphere to your space.',
  54.99,
  59.99,
  true,
  54.99,
  100,
  true
);

-- Product 14: Soft Pink Rose Bouquet
INSERT INTO products (name, slug, description, price, regular_price, on_sale, sale_price, stock_quantity, featured)
VALUES (
  'Soft Pink Rose Bouquet',
  'soft-pink-rose-bouquet',
  'This delicate arrangement of soft pink roses embodies romance and gentle beauty. Each rose is expertly crafted with premium materials to achieve the perfect spiral of petals, capturing the classic elegance that makes roses timeless. The subtle pink coloring evokes feelings of grace and sweetness, making this bouquet ideal for bedrooms, dining areas, or as a thoughtful centerpiece. The realistic appearance and lasting quality ensure that this arrangement will continue to bring joy and beauty to your space year after year.',
  44.99,
  44.99,
  false,
  NULL,
  100,
  false
);

-- Product 15: Passionate Red Rose Collection
INSERT INTO products (name, slug, description, price, regular_price, on_sale, sale_price, stock_quantity, featured)
VALUES (
  'Passionate Red Rose',
  'passionate-red-rose',
  'Express timeless elegance with this striking red rose arrangement. The deep, rich crimson petals create a dramatic statement piece that commands attention while maintaining sophistication. Each bloom is handcrafted to perfection, featuring the classic rose form with tightly layered petals that gradually unfold. The vibrant red color symbolizes love, passion, and strength, making this arrangement perfect for living rooms, entryways, or any space where you want to make a bold yet refined statement. The premium craftsmanship ensures lasting beauty without the need for water or maintenance.',
  46.99,
  46.99,
  false,
  NULL,
  100,
  true
);

-- Product 16: Sunshine Yellow Dahlia
INSERT INTO products (name, slug, description, price, regular_price, on_sale, sale_price, stock_quantity, featured)
VALUES (
  'Sunshine Yellow Dahlia',
  'sunshine-yellow-dahlia',
  'Brighten any space with this cheerful yellow dahlia arrangement. The intricate layering of pointed petals creates a stunning geometric pattern that draws the eye and lifts the spirit. Each petal is carefully shaped and positioned to achieve the characteristic dahlia bloom, with a warm golden-yellow color that radiates positivity and energy. This arrangement brings the joy of summer into your home year-round, perfect for kitchens, sunrooms, or any area that could use an extra dose of sunshine. The handcrafted quality ensures every detail is perfect, from the petal tips to the full, rounded shape.',
  48.99,
  52.99,
  true,
  48.99,
  100,
  false
);

-- Product 17: Dusty Rose Garden Mix
INSERT INTO products (name, slug, description, price, regular_price, on_sale, sale_price, stock_quantity, featured)
VALUES (
  'Dusty Rose Garden Mix',
  'dusty-rose-garden-mix',
  'This sophisticated mixed arrangement features blooms in elegant dusty rose and mauve tones, creating a vintage-inspired garden aesthetic. The combination of different flower varieties and sizes adds depth and interest, while the muted pink palette brings a sense of calm sophistication to any interior. Each flower is individually crafted with attention to texture and form, from soft petals to delicate centers. This versatile arrangement works beautifully in bedrooms, dressing areas, or living spaces where you want to create a romantic, timeless atmosphere with modern sensibility.',
  56.99,
  56.99,
  false,
  NULL,
  100,
  true
);

-- Add product images for the new products
-- Product 12 - Elegant White Lily
INSERT INTO product_images (product_id, src, alt, display_order)
VALUES (
  (SELECT id FROM products WHERE slug = 'elegant-white-lily'),
  'photo_3_2025-12-11_14-58-13.jpg',
  'Elegant White Lily Arrangement',
  1
);

-- Product 13 - Vibrant Coral Peony
INSERT INTO product_images (product_id, src, alt, display_order)
VALUES (
  (SELECT id FROM products WHERE slug = 'vibrant-coral-peony'),
  'photo_4_2025-12-11_14-58-13.jpg',
  'Vibrant Coral Peony Bouquet',
  1
);

-- Product 14 - Soft Pink Rose Bouquet
INSERT INTO product_images (product_id, src, alt, display_order)
VALUES (
  (SELECT id FROM products WHERE slug = 'soft-pink-rose-bouquet'),
  'photo_5_2025-12-11_14-58-13.jpg',
  'Soft Pink Rose Bouquet',
  1
);

-- Product 15 - Passionate Red Rose
INSERT INTO product_images (product_id, src, alt, display_order)
VALUES (
  (SELECT id FROM products WHERE slug = 'passionate-red-rose'),
  'photo_6_2025-12-11_14-58-13.jpg',
  'Passionate Red Rose Collection',
  1
);

-- Product 16 - Sunshine Yellow Dahlia
INSERT INTO product_images (product_id, src, alt, display_order)
VALUES (
  (SELECT id FROM products WHERE slug = 'sunshine-yellow-dahlia'),
  'photo_7_2025-12-11_14-58-13.jpg',
  'Sunshine Yellow Dahlia Arrangement',
  1
);

-- Product 17 - Dusty Rose Garden Mix
INSERT INTO product_images (product_id, src, alt, display_order)
VALUES (
  (SELECT id FROM products WHERE slug = 'dusty-rose-garden-mix'),
  'photo_8_2025-12-11_14-58-13.jpg',
  'Dusty Rose Garden Mix',
  1
);

-- Verify new products
SELECT p.id, p.name, p.slug, p.price, pi.src
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.id > 11
ORDER BY p.id;
