# VINTIE Store — Quick Setup Guide

Follow these steps exactly to get your store running in under 15 minutes.

---

## Step 1: Create Supabase Project

1. Go to **[supabase.com](https://supabase.com)** → Sign in → **New Project**
2. Name it `vintie-store`, choose a strong database password, select **West EU (Ireland)** region
3. Wait for it to spin up (~1 min)
4. Go to **Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role / secret key** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

---

## Step 2: Run the Database Schema

1. In your Supabase project → **SQL Editor** → **New Query**
2. Paste the full contents of `supabase_schema.sql`
3. Click **Run** ▶️

This creates all tables, RLS policies, and storage buckets automatically.

---

## Step 3: Create Your Admin User

In SQL Editor, run this (change email & name):

```sql
-- First install pgcrypto if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert admin user
-- Password below = Admin@Vintie2025 (bcrypt hash)
-- Change the email and full_name!
INSERT INTO users (email, password, full_name, is_admin)
VALUES (
  'your@email.com',
  '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Your Name',
  true
);
```

> ⚠️ **The default password is `password`** — change it immediately after first login via the Settings page, or use a bcrypt hash generator at https://bcrypt-generator.com (rounds: 12) with your own password.

---
34vGv6L8fpvlKpGt
## Step 4: Set Up Environment Variables

```bash
# In your project root:
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=pick-any-random-string-at-least-32-characters-long-1234
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 5: Install & Run

```bash
npm install
npm run dev
```

Visit **http://localhost:3000** 🎉

Login at **http://localhost:3000/login** with your admin credentials → you'll be redirected to `/admin`

---

## Step 6: Copy Your Logo

Copy your `logo.png` file into the `/public` folder:
```
vintie-nextjs/
└── public/
    └── logo.png   ← put it here
```

---

## Step 7: Deploy to Vercel (Production)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, then add environment variables in:
# Vercel Dashboard → Your Project → Settings → Environment Variables
```

Add all 5 variables from your `.env.local` to Vercel's environment variables panel.

Set `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://vintie.shop`).

---

## Supabase Storage Buckets

The schema creates these buckets automatically:
- `product-images` — for product photos
- `category-images` — for category photos  
- `blog-images` — for blog post images
- `avatars` — for user profile photos

Upload images through the **Admin Dashboard** → Products/Categories/Blog.

---

## Default Promo Code

The schema doesn't seed a promo code. Create one in Admin → Promo Codes:
- Code: `VINTIE10`
- Type: Percentage
- Value: 10
- Min Order: 0

---

## Pages at a Glance

| URL | Description |
|-----|-------------|
| `/` | Homepage |
| `/shop` | All products with filters |
| `/product/[id]` | Product detail |
| `/collections` | Curated collections |
| `/about` | About VINTIE |
| `/blog` | Style journal |
| `/faq` | FAQ |
| `/contact` | Contact form |
| `/wishlist` | Saved items |
| `/checkout` | Checkout with promo codes |
| `/account` | User account & orders |
| `/login` | Sign in |
| `/signup` | Create account |
| `/admin` | Admin dashboard (admin only) |

---

## Tech Architecture

```
Browser
  ↕ HTTP-only Cookie (vintie_token JWT)
Next.js App Router
  ├── Server Components (pages/layouts)
  ├── Client Components ('use client')
  ├── API Routes (/app/api/**)
  │     └── Custom JWT auth (bcrypt + jose)
  └── Middleware (Edge JWT validation)
        ↕
Supabase
  ├── PostgreSQL DB (via supabase-js service role)
  └── Storage Buckets (images)
```

---

## Contact

- Instagram: [@vintie_ng](https://www.instagram.com/vintie_ng)
- WhatsApp: [wa.me/message/OT2BFLRVDDAMF1](https://wa.me/message/OT2BFLRVDDAMF1)
- Store: 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos
