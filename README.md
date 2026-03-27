# VINTIE — E-Commerce Store + Admin Dashboard

A complete, production-ready React e-commerce storefront with full admin dashboard. Built with React 18, Tailwind CSS, React Router, and Lucide React icons.

---

## Pages

### Storefront
| Route | Page |
|---|---|
| `/` | Home — hero, categories, products, promo, featured, testimonials |
| `/shop` | Shop — sidebar filters (category, price, size, badge), sort, grid/list |
| `/product/:id` | Product Detail — images, size picker, qty, cart, tabs, related |
| `/collections` | Collections — seasonal + featured + by category |
| `/about` | About Us — mission, team, stats |
| `/blog` | Blog / Journal — featured post + grid |
| `/faq` | FAQ — accordion |
| `/contact` | Contact — form + contact info |
| `/wishlist` | Wishlist — saved products |
| `/account` | Account — orders, profile, wishlist |
| `/checkout` | Checkout — 3-step (shipping → payment → review) |

### Admin Dashboard
| Route | Section |
|---|---|
| `/admin` | Dashboard — stats, revenue chart, top products, recent orders |
| | Orders — filterable table by status |
| | Products — searchable table with edit/delete actions |
| | Customers — customer list with spend data |
| | Analytics — KPIs, bar chart, traffic sources, category performance |
| | Coupons — coupon management table |
| | Settings — store info, notifications, shipping |

---

## Tech Stack

- **React 18** — UI framework
- **React Router v6** — client-side routing
- **Tailwind CSS v3** — utility-first styling
- **Lucide React** — icon library (no emojis)
- **Google Fonts** — Cormorant Garamond (display) + DM Sans (body)
- **Unsplash CDN** — cloud-hosted product images

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

Visit:
- **Store:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

---

## Design System

| Token | Value |
|---|---|
| `milk` | `#faf9f7` — primary background |
| `cream` | `#f5f3ef` — section backgrounds |
| `sand` | `#e8e4dc` — borders |
| `muted` | `#8a867e` — secondary text |
| `ink` | `#111110` — primary text / buttons |
| `accent` | `#c0392b` — sale badges / alerts |
| `gold` | `#d4a843` — stars / highlights |

---

## Features

- Shopping cart with qty controls, persistent via React context
- Wishlist (heart toggle on all product cards)
- Product filtering: category, price range, size, badge type
- Sort: newest / price / popularity / rating
- Admin dashboard with live stats, charts, order/product management
- Responsive: mobile, tablet, desktop
- Sticky navbar with announcement bar and category filter strip
- 3-step checkout flow
- FAQ accordion
- Blog/Journal layout
- Full footer with newsletter signup

---

## Project Structure

```
src/
  components/
    layout/
      Navbar.jsx      ← sticky nav, search overlay, cart badge
      Footer.jsx      ← links, newsletter, socials
      CartDrawer.jsx  ← slide-in cart with qty controls
    ui/
      ProductCard.jsx ← reusable card with wishlist, add to cart
  context/
    CartContext.js    ← cart + wishlist state
  data/
    mockData.js       ← products, categories, orders, testimonials
  pages/
    HomePage.jsx
    ShopPage.jsx
    ProductDetailPage.jsx
    CollectionsPage.jsx
    AdminPage.jsx
    OtherPages.jsx    ← About, Blog, FAQ, Contact, Wishlist, Account, Checkout
  App.js              ← router + providers
  index.js
  index.css           ← Tailwind directives + component layer
public/
  index.html
tailwind.config.js
postcss.config.js
package.json
```
