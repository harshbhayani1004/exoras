-- Fix cart_items RLS policies for custom authentication
-- Run this in Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can manage their own cart" ON cart_items;

-- Allow public read/write for cart_items (since we use custom auth)
CREATE POLICY "Public can manage cart items"
ON cart_items FOR ALL
USING (true)
WITH CHECK (true);
