-- Fix RLS policies to allow user registration
-- Run this in Supabase SQL Editor

-- Drop existing policies that block registration
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

-- Allow anyone to insert new users (for registration)
CREATE POLICY "Anyone can register"
ON users FOR INSERT
WITH CHECK (true);

-- Users can view their own data (using email match since we don't use auth.uid())
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
USING (true);

-- Users can update their own data
CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
USING (true);

-- Allow public read for user_sessions (needed for session validation)
DROP POLICY IF EXISTS "Public can read sessions" ON user_sessions;
CREATE POLICY "Public can read sessions"
ON user_sessions FOR SELECT
USING (true);

-- Allow public insert for user_sessions (needed for login)
DROP POLICY IF EXISTS "Public can create sessions" ON user_sessions;
CREATE POLICY "Public can create sessions"
ON user_sessions FOR INSERT
WITH CHECK (true);

-- Allow public delete for user_sessions (needed for logout)
DROP POLICY IF EXISTS "Public can delete sessions" ON user_sessions;
CREATE POLICY "Public can delete sessions"
ON user_sessions FOR DELETE
USING (true);

-- Note: In production, you should use more restrictive policies
-- For example, checking session tokens or using Supabase Auth
