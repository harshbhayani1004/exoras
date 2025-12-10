-- Storage bucket for product images
-- Note: This needs to be created in the Supabase Dashboard under Storage
-- Bucket name: Exora
-- Public access: enabled

-- After creating the bucket, you can upload images and reference them like:
-- https://ysrdptrgpxpdohzgcniy.supabase.co/storage/v1/object/public/Exora/your-image.jpg

-- Or using S3 compatible endpoint:
-- https://ysrdptrgpxpdohzgcniy.storage.supabase.co/storage/v1/s3/Exora/your-image.jpg

-- Storage policies (run these in SQL editor after creating the bucket)
-- Allow public read access
INSERT INTO storage.buckets (id, name, public) 
VALUES ('Exora', 'Exora', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy for public access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'Exora' );

-- Policy for authenticated uploads (optional)
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'Exora' AND auth.role() = 'authenticated' );
