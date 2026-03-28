# VINTIE Store — Next.js Production App

Premium men's clothing store for Lagos, Nigeria. Built with Next.js 14, Supabase, and custom JWT authentication.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage Buckets
- **Auth**: Custom JWT (bcrypt + jose) — NOT Supabase Auth
- **Styling**: Tailwind CSS with dark mode
- **Language**: TypeScript

## 📋 Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **Anon Key** from Settings → API
3. Copy your **Service Role Key** from Settings → API (keep this secret!)

### 2. Run the Database Schema
In your Supabase SQL Editor, paste and run the contents of `supabase_schema.sql`

### 3. Create a `.env.local` file
```bash
cp .env.example .env.local
```
Fill in your values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Create your first admin user
Run this SQL in Supabase SQL Editor (replace the hash with your bcrypt hash):

```sql
-- To generate a bcrypt hash, use: https://bcrypt-generator.com/ (rounds: 12)
-- Default password below is: Admin@123
INSERT INTO users (email, password, full_name, is_admin)
VALUES (
  'admin@vintie.shop',
  '$2a$12$LrHNgwBcXnVhDLj7wPO2x.iGlE.aBcDeFgHiJkLmNoPqRsTuVwXyZ',
  'VINTIE Admin',
  true
);
```

Or use the signup page and then manually set `is_admin = true` in Supabase Table Editor.

### 5. Install and Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
vintie-nextjs/
├── app/
│   ├── (auth)/           # Login & Signup pages (no navbar/footer)
│   │   ├── login/
│   │   └── signup/
│   ├── (storefront)/     # All public pages (with navbar/footer)
│   │   ├── page.tsx      # Homepage
│   │   ├── shop/
│   │   ├── product/[id]/
│   │   ├── collections/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── faq/
│   │   ├── contact/
│   │   ├── wishlist/
│   │   ├── checkout/     # With promo code support
│   │   └── account/
│   ├── admin/            # Full admin dashboard
│   └── api/              # All API routes
│       ├── auth/         # login, signup, me, logout
│       ├── products/
│       ├── categories/
│       ├── orders/
│       ├── coupons/      # With validate endpoint
│       ├── testimonials/
│       ├── blog_posts/
│       ├── customers/
│       └── upload/       # Supabase storage upload
├── components/
│   ├── layout/           # Navbar, Footer, CartDrawer
│   └── ui/               # ProductCard
├── context/
│   └── providers.tsx     # Cart + Auth + Theme context
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── auth.ts           # JWT utilities
├── middleware.ts          # Route protection
└── supabase_schema.sql   # Full DB schema + storage buckets
```

## 🔐 Authentication Flow

- Custom JWT stored in **HTTP-only cookies** (secure, not localStorage)
- Login → checks `users` table → signs JWT → sets cookie
- After login: admin users → `/admin`, regular users → `/account`
- Middleware protects `/admin` and `/account` routes
- Supabase Auth is **NOT used** — full custom model

## 🛍️ Features

### Storefront
- ✅ Homepage with products, categories, testimonials
- ✅ Shop with filters (category, size, price, badge) + sort
- ✅ Product detail with image gallery, sizes, colors, add to cart
- ✅ Cart drawer with quantity controls
- ✅ Wishlist (session-based)
- ✅ Checkout with promo code validation
- ✅ Order confirmation with WhatsApp link
- ✅ Collections, About, Blog, FAQ, Contact pages
- ✅ Account page with order history

### Admin Dashboard
- ✅ Overview with revenue stats
- ✅ Products CRUD (with Supabase image upload)
- ✅ Orders management (status updates, detail view)
- ✅ Categories CRUD (with images)
- ✅ Customers list
- ✅ Testimonials CRUD
- ✅ Blog posts CRUD
- ✅ Promo codes / Coupons (percentage & fixed)
- ✅ Analytics tab
- ✅ Settings tab
- ✅ Light/Dark mode toggle

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
# JWT_SECRET
# NEXT_PUBLIC_APP_URL (your production URL)
```

## 📞 Contact

- **Instagram**: [@vintie_ng](https://www.instagram.com/vintie_ng)
- **WhatsApp**: [wa.me/message/OT2BFLRVDDAMF1](https://wa.me/message/OT2BFLRVDDAMF1)
- **Website**: [vintie.shop](https://vintie.shop)
- **Store**: 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos
- **Hours**: Mon–Sat 10am–8pm · Sun 1pm–8pm
