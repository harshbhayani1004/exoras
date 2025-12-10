-- Add descriptions to all products
-- Run this in Supabase SQL Editor

-- First, add description column if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;

-- Update each product with unique descriptions
UPDATE products SET description = 'This exquisite handmade rose captures the timeless elegance of nature''s most beloved bloom. Each silk petal is carefully shaped and layered to create realistic depth and texture. The vibrant crimson hue is achieved through premium fabric dyes that resist fading, ensuring your rose maintains its beauty for years. Perfect as a standalone statement piece or grouped in arrangements, this eternal rose brings romance and sophistication to any space without the need for water or maintenance.'
WHERE id = 1;

UPDATE products SET description = 'A stunning display of delicate cherry blossoms that brings the magic of spring into your home year-round. These ethereal pink blooms are meticulously crafted with translucent petals that catch and reflect light beautifully. Each cluster features varying stages of bloom, from tight buds to fully opened flowers, creating a natural and organic appearance. Ideal for creating a serene atmosphere in living spaces, bedrooms, or meditation areas.'
WHERE id = 2;

UPDATE products SET description = 'Embrace the cheerful spirit of summer with these radiant sunflowers. Standing tall and proud, each bloom features golden yellow petals surrounding a rich brown center filled with intricate seed detail. The sturdy stems and vibrant green leaves add to the lifelike quality. These sunflowers bring warmth and positive energy to any room, making them perfect for kitchens, dining areas, or as a welcoming touch in entryways.'
WHERE id = 3;

UPDATE products SET description = 'Experience the exotic beauty of tropical orchids with this sophisticated arrangement. Featuring gracefully curved stems and pristine white blooms with subtle pink accents, these orchids exude luxury and refinement. Each petal is hand-painted to achieve the delicate color gradients found in nature. The elegant composition makes it an ideal centerpiece for modern interiors, adding a touch of botanical elegance to offices, hotels, or upscale home décor.'
WHERE id = 4;

UPDATE products SET description = 'This charming lavender bouquet captures the essence of Provence fields in full bloom. The soft purple clusters are arranged on realistic stems with silvery-green foliage that enhances the authentic appearance. Known for its calming aesthetic, this piece brings tranquility and a touch of countryside charm to your space. Perfect for bathrooms, bedrooms, or any area where you want to create a peaceful, aromatic-looking ambiance.'
WHERE id = 5;

UPDATE products SET description = 'Discover the pure elegance of white tulips in this minimalist arrangement. Each bloom showcases the tulip''s signature smooth, cup-shaped form with a subtle satin finish that mimics fresh-cut flowers. The clean lines and monochromatic palette make these tulips versatile enough for any interior style, from Scandinavian minimalism to classic elegance. Ideal for creating sophisticated table settings or brightening up office spaces.'
WHERE id = 6;

UPDATE products SET description = 'A dramatic statement piece featuring deep burgundy peonies with layers upon layers of ruffled petals. These full-bodied blooms are crafted to showcase the peony''s characteristic lush, romantic appearance. The rich color adds depth and warmth to any setting, while the intricate petal structure demonstrates exceptional craftsmanship. Perfect for creating bold, dramatic arrangements or as a luxurious accent in master bedrooms and formal living areas.'
WHERE id = 7;

UPDATE products SET description = 'Delight in the whimsical charm of mixed wildflowers that evoke memories of meadow walks and countryside picnics. This diverse collection features daisies, cosmos, and other field flowers in a harmonious blend of whites, yellows, and soft pinks. The natural, unstructured arrangement celebrates the beauty of botanical diversity. Ideal for farmhouse-style décor, casual dining areas, or adding a touch of nature-inspired beauty to any room.'
WHERE id = 8;

UPDATE products SET description = 'Experience the regal beauty of iris flowers with their distinctive sword-like leaves and majestic blooms. These purple beauties feature the iris''s characteristic three upright petals and three cascading falls, all adorned with intricate veining and subtle color variations. The sophisticated color palette and elegant form make these irises perfect for adding a touch of botanical artistry to libraries, studies, or formal dining rooms.'
WHERE id = 9;

UPDATE products SET description = 'Celebrate the arrival of spring with these cheerful daffodils featuring bright yellow trumpet-shaped blooms. Each flower captures the daffodil''s iconic form with its crown of petals surrounding a central corona. The fresh, optimistic appearance of these blooms brings instant sunshine to any space, making them perfect for brightening up entryways, breakfast nooks, or any room that could use a dose of cheerful energy and springtime joy.'
WHERE id = 10;

UPDATE products SET description = 'A sophisticated arrangement of eucalyptus branches featuring the plant''s distinctive silvery-blue foliage. These versatile stems showcase the rounded leaves and organic branching pattern that make eucalyptus a favorite in modern floral design. The muted color palette adds a calming, spa-like quality to any space. Perfect for creating minimalist arrangements, complementing other blooms, or standing alone as a statement of natural elegance in contemporary interiors.'
WHERE id = 11;
