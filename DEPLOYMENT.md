# EXORA E-commerce Store - Deployment Guide

## 🚀 Deploy to Netlify

### Prerequisites

- Netlify account
- GitHub repository connected

### Step 1: Install Netlify Next.js Plugin

```bash
npm install -D @netlify/plugin-nextjs
```

### Step 2: Set Environment Variables in Netlify Dashboard

Go to Site settings → Environment variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://ysrdptrgpxpdohzgcniy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 3: Deploy

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

### Step 4: Update Supabase Redirect URLs

In Supabase Dashboard → Authentication → URL Configuration:

- Add your Netlify URL to "Site URL"
- Add your Netlify URL to "Redirect URLs"

Example: `https://your-site.netlify.app`

## 📋 Features Included

- ✅ User authentication (Email/Password + Google OAuth)
- ✅ Password reset with email
- ✅ Real-time shopping cart
- ✅ Product catalog with images
- ✅ Supabase backend integration
- ✅ Responsive design

## 🗄️ Database Setup

All database tables are already created in Supabase:

- users
- user_sessions
- cart_items
- products
- product_images
- orders
- order_items

## 📧 Email Configuration

Configure SMTP in Supabase Dashboard → Authentication → Email for:

- Password reset emails
- User verification (optional)

## 🔒 Security

- HTTPS enforced in production
- Secure token handling
- RLS policies enabled
- Environment variables protected

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

## 📦 Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- Zustand (State Management)

---

Built with ❤️ for EXORA Store
