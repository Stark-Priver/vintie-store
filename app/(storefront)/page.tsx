'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Star, TruckIcon, RefreshCw, Shield, Headphones, Instagram } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const perks = [
  { icon: TruckIcon, title: 'Free Delivery', desc: 'On orders over ₦50,000' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer care' },
];

const avatars = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
    ]).then(([p, c, t]) => {
      setProducts(Array.isArray(p) ? p.slice(0, 8) : []);
      setCategories(Array.isArray(c) ? c.slice(0, 3) : []);
      setTestimonials(Array.isArray(t) ? t.slice(0, 3) : []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-milk">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[calc(100vh-108px)] overflow-hidden">
        <div className="flex flex-col px-6 lg:px-0 pt-12 pb-0 lg:pl-12 xl:pl-20">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream rounded-full text-[11px] tracking-widest uppercase text-muted mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              New Collection 2025
            </div>
            <h1 className="font-display text-[clamp(44px,6vw,76px)] font-medium leading-[1.06] tracking-tight text-ink mb-5">
              Unleash Your Style<br />
              <em className="font-light not-italic text-muted">Shop the Latest</em><br />
              Trends
            </h1>
            <p className="text-[14px] leading-relaxed text-muted max-w-md mb-8">
              Discover the latest trends in men&apos;s fashion. Exclusive collections with premium designs, crafted for Lagos and beyond.
            </p>
            <div className="flex items-center gap-3 mb-10">
              <Link href="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
              <Link href="/collections" className="btn-outline">View Lookbook</Link>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {avatars.map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-milk -ml-2.5 first:ml-0" style={{ zIndex: avatars.length - i }} />
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-gold fill-gold" />)}</div>
                <span className="text-[12px] text-ink"><strong>44.7K+</strong> followers on Instagram</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative overflow-hidden mt-8 lg:mt-0 h-[55vw] lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85"
            alt="VINTIE Collection"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-milk/30 via-transparent to-transparent lg:bg-gradient-to-l lg:from-milk/20" />

          {/* Floating badge */}
          <div className="absolute bottom-8 left-6 bg-milk/90 backdrop-blur-sm rounded-xl p-4 shadow-lift">
            <div className="text-[10px] text-muted tracking-widest uppercase mb-0.5">This Season</div>
            <div className="font-display text-xl font-medium text-ink">534 Posts</div>
            <a href="https://www.instagram.com/vintie_ng" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-muted mt-1 hover:text-ink transition-colors">
              <Instagram size={11} /> @vintie_ng
            </a>
          </div>
        </div>
      </section>

      {/* ── PERKS ────────────────────────────────────────────── */}
      <section className="py-10 border-y border-sand">
        <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-6">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 text-ink">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-ink">{title}</p>
                <p className="text-[11px] text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Hand-picked for you</span>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link href="/shop" className="btn-ghost hidden sm:flex">View All <ArrowRight size={15} /></Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-cream rounded-xl2 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-muted">
              <p className="text-[14px]">No products yet — add some in the admin dashboard!</p>
              <Link href="/admin" className="btn-primary mt-4 inline-flex">Go to Admin</Link>
            </div>
          )}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="section-container">
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Browse by</span>
              <h2 className="section-title">Categories</h2>
            </div>
            <div className={`grid gap-5 ${categories.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : categories.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className={`group relative overflow-hidden rounded-xl3 ${i === 0 ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-[16/10]'}`}
                >
                  <img
                    src={cat.image || `https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=700&q=80`}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="font-display text-2xl font-medium text-milk">{cat.name}</p>
                    <p className="text-[12px] text-white/60 mt-0.5">{cat.count || 0} items</p>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-milk/0 group-hover:bg-milk/90 flex items-center justify-center transition-all duration-300">
                    <ArrowRight size={15} className="text-milk group-hover:text-ink transition-colors duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INSTAGRAM BANNER ─────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <div className="relative rounded-xl3 overflow-hidden bg-ink text-milk py-16 px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-3">Follow us</p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mb-3">@vintie_ng</h2>
              <p className="text-[14px] text-white/55 max-w-md">
                44.7K followers · 534 posts · Tag us in your fits for a chance to be featured
              </p>
            </div>
            <div className="relative z-10 flex gap-3 shrink-0">
              <a
                href="https://www.instagram.com/vintie_ng"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-ink hover:bg-gold"
              >
                <Instagram size={16} /> Follow on Instagram
              </a>
              <a
                href="https://wa.me/message/OT2BFLRVDDAMF1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white/30 text-milk hover:bg-white hover:text-ink"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="section-container">
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">What customers say</span>
              <h2 className="section-title">Reviews</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-milk rounded-xl2 p-6 border border-sand">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className={i < t.rating ? 'text-gold fill-gold' : 'text-sand'} fill={i < t.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <p className="text-[14px] text-ink leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center font-bold text-[13px] text-ink overflow-hidden">
                      {t.avatar ? <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" /> : t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{t.name}</p>
                      {t.product && <p className="text-[11px] text-muted">{t.product}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LOCATION CTA ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-4">Find Us</span>
              <h2 className="font-display text-5xl font-medium leading-tight text-ink mb-6">Visit Our Store<br /><em className="font-light not-italic text-muted">in Yaba, Lagos</em></h2>
              <div className="space-y-3 mb-8">
                <p className="text-[14px] text-muted">📍 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos</p>
                <p className="text-[14px] text-muted">🕐 Open daily: 10am – 8pm · Sundays: 1pm – 8pm</p>
                <p className="text-[14px] text-muted">📱 <a href="https://www.instagram.com/vintie_ng" className="text-ink font-medium hover:underline" target="_blank" rel="noopener noreferrer">@vintie_ng</a></p>
              </div>
              <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Chat on WhatsApp <ArrowRight size={16} />
              </a>
            </div>
            <div className="rounded-xl3 overflow-hidden aspect-video bg-cream">
              <iframe
                title="VINTIE Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3281!2d3.3778!3d6.5049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzAnMTcuNiJOIDPCsDIyJzQwLjEiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
