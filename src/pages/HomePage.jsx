import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star, Layers, Feather, Coffee, Boxes, Compass, Tag, TruckIcon, RefreshCw, Shield, Headphones } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { supabase } from '../lib/supabase';

const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
];

const brands = [
  { icon: <Layers size={15}/>, name: "GRAPHIC STUDIO" },
  { icon: <Feather size={15}/>, name: "S. SALVA" },
  { icon: <Coffee size={15}/>, name: "HALEM STUDIO" },
  { icon: <Boxes size={15}/>, name: "FURNITURE DESIGN" },
  { icon: <Compass size={15}/>, name: "TRAVEL LOOKBOOK" },
];

const perks = [
  { icon: <TruckIcon size={22}/>, title: "Free Shipping", desc: "On all orders over ₦150" },
  { icon: <RefreshCw size={22}/>, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: <Shield size={22}/>, title: "Secure Payment", desc: "100% secure transactions" },
  { icon: <Headphones size={22}/>, title: "24/7 Support", desc: "Dedicated customer care" },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);

        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .limit(3);

        const { data: testimonialsData } = await supabase
          .from('testimonials')
          .select('*')
          .limit(3);

        if (productsData) setProducts(productsData);
        if (categoriesData) setCategories(categoriesData);
        if (testimonialsData) setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milk">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ink"></div>
      </div>
    );
  }

  const newProducts = products;

  return (
    <div className="bg-milk">
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[calc(100vh-108px)] overflow-hidden">
        <div className="flex flex-col px-6 lg:px-0 pt-12 pb-0 lg:pl-12 xl:pl-20">
          <div className="flex-1">
            {/* Tag */}
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
              Discover the latest trends and express your style effortlessly. Shop exclusive collections with premium designs, crafted just for you.
            </p>
            <div className="flex items-center gap-3 mb-10">
              <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16}/></Link>
              <Link to="/collections" className="btn-outline">View Lookbook</Link>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {avatars.map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-milk -ml-2.5 first:ml-0" style={{zIndex: avatars.length - i}} />
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-gold fill-gold" />)}</div>
                <span className="text-[12px] text-ink"><strong>25M+</strong> Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Bottom image row */}
          <div className="grid grid-cols-3 gap-3 mt-8 h-52">
            <div className="relative rounded-xl overflow-hidden img-zoom">
              <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80" alt="" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 bg-white/90 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide">New In</span>
            </div>
            <div className="relative rounded-xl overflow-hidden img-zoom">
              <img src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="bg-cream rounded-xl flex flex-col justify-center items-start px-5 gap-2">
              <span className="text-[10px] text-muted uppercase tracking-widest">Models wearing</span>
              <span className="font-display text-[19px] font-medium leading-tight">Full Outfits</span>
              <Link to="/collections" className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-ink text-milk rounded-full text-[11px] font-medium">
                Explore <ArrowRight size={12}/>
              </Link>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="hidden lg:block bg-cream relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80"
            alt="Hero model"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-8 left-6 bg-white/95 backdrop-blur-sm px-5 py-3.5 rounded-xl shadow-card">
            <span className="block text-[9px] uppercase tracking-[0.15em] text-muted mb-1">Trending Now</span>
            <span className="font-display text-[19px] font-medium">2025 Collection</span>
          </div>
        </div>
      </section>

      {/* BRAND BAR */}
      <section className="border-y border-sand/60 py-5">
        <div className="section-container">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {brands.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-muted hover:text-ink transition-colors cursor-pointer">
                {b.icon}
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Our Category List</h2>
              <p className="section-sub">Browse through our curated collections</p>
            </div>
            <Link to="/shop" className="btn-ghost">View All <ArrowRight size={15}/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} to={`/shop?cat=${cat.name}`} className="relative rounded-xl3 overflow-hidden aspect-[3/4] img-zoom group">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent group-hover:from-ink/75 transition-all duration-300 flex items-end p-5">
                  <div>
                    <p className="font-display text-2xl font-medium text-milk">{cat.name}</p>
                    <p className="text-[12px] text-white/65 mt-1">{cat.count} Items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 bg-cream">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Our Products</h2>
              <p className="section-sub">Recently added items</p>
            </div>
            <Link to="/shop" className="btn-ghost">View All <ArrowRight size={15}/></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-ink min-h-[320px]">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[10px] text-white/70 tracking-widest uppercase mb-5 w-fit">
                <Tag size={11}/> Limited Time Offer
              </div>
              <h2 className="font-display text-[clamp(42px,5vw,66px)] font-medium leading-tight text-milk mb-3">
                Get <em className="not-italic text-gold">50% Off</em>
              </h2>
              <p className="text-[13px] text-white/50 leading-relaxed mb-8">
                For all time product purchases.<br/>Min. purchase ₦450,000
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-ink rounded-lg text-[13px] font-semibold w-fit hover:bg-gold transition-colors duration-200">
                Shop Now <ArrowRight size={16}/>
              </Link>
            </div>
            <div className="relative overflow-hidden min-h-[260px]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80"
                alt="Promo"
                className="w-full h-full object-cover object-top brightness-75 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS (Showing Categories as Collections for now) */}
      <section className="py-20 bg-cream">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Collections</h2>
              <p className="section-sub">Hand-picked seasonal styles</p>
            </div>
            <Link to="/collections" className="btn-ghost">View All <ArrowRight size={15}/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.length > 0 && (
              <>
                {/* Large */}
                <Link to="/collections" className="relative rounded-xl3 overflow-hidden img-zoom group aspect-[3/4] md:aspect-auto md:row-span-2">
                  <img src={categories[0].image} alt="" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent flex items-end p-6">
                    <div className="flex items-end justify-between w-full">
                      <span className="font-display text-2xl font-medium text-milk">{categories[0].name}</span>
                      <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={16}/>
                      </span>
                    </div>
                  </div>
                </Link>
                {/* Small */}
                {categories.slice(1).map(col => (
                  <Link key={col.id} to="/collections" className="relative rounded-xl3 overflow-hidden img-zoom group aspect-square">
                    <img src={col.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent flex items-end p-5">
                      <div className="flex items-end justify-between w-full">
                        <span className="font-display text-lg font-medium text-milk">{col.name}</span>
                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUpRight size={14}/>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-16 border-y border-sand/60">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-ink">{p.icon}</div>
                <div>
                  <p className="font-semibold text-[14px] text-ink">{p.title}</p>
                  <p className="text-[12px] text-muted mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-sub">Real reviews from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-cream rounded-xl3 p-7 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-gold fill-gold" />)}
                </div>
                <p className="text-[14px] text-muted leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-sand">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{t.name}</p>
                    <p className="text-[11px] text-muted">{t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
