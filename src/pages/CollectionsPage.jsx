import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const seasonals = [
  { name: "Spring/Summer 2025", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", items: 42, desc: "Light fabrics, airy silhouettes for warmer days." },
  { name: "Fall/Winter 2024", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80", items: 38, desc: "Rich textures and layered warmth." },
  { name: "Resort 2025", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80", items: 27, desc: "Refined vacation-ready essentials." },
];

export default function CollectionsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milk">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ink"></div>
      </div>
    );
  }

  return (
    <div className="bg-milk min-h-screen">
      {/* Hero */}
      <div className="bg-ink text-milk py-24">
        <div className="section-container text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3 block">Curated Edits</span>
          <h1 className="font-display text-6xl font-medium mb-4">Collections</h1>
          <p className="text-[14px] text-white/45 max-w-md mx-auto leading-relaxed">
            Explore our hand-curated seasonal collections and themed edits — fashion stories told through fabric and form.
          </p>
        </div>
      </div>

      {/* Seasonal */}
      <section className="py-20">
        <div className="section-container">
          <h2 className="section-title mb-2">Seasonal Collections</h2>
          <p className="section-sub mb-10">Explore what's trending this season</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonals.map((s, i) => (
              <Link key={i} to="/shop" className="group relative rounded-xl3 overflow-hidden aspect-[3/4] img-zoom block">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent flex flex-col justify-end p-7 group-hover:from-ink/90 transition-all duration-300">
                  <span className="text-[10px] text-white/50 tracking-widest uppercase mb-1">{s.items} Items</span>
                  <h3 className="font-display text-2xl font-medium text-milk mb-2">{s.name}</h3>
                  <p className="text-[12px] text-white/55 mb-5 leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-2 text-[12px] text-milk font-medium border-b border-white/30 pb-0.5 w-fit">
                    Explore <ArrowUpRight size={13}/>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Edits (Using categories as featured for now) */}
      <section className="py-20 bg-cream">
        <div className="section-container">
          <h2 className="section-title mb-2">Featured Edits</h2>
          <p className="section-sub mb-10">Themed looks we love</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(col => (
              <Link key={col.id} to="/shop" className="relative rounded-xl2 overflow-hidden img-zoom group aspect-square block">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent flex items-end p-4">
                  <div className="flex items-end justify-between w-full">
                    <span className="font-display text-[16px] font-medium text-milk leading-tight">{col.name}</span>
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-2">
                      <ArrowUpRight size={12}/>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By Category */}
      <section className="py-20">
        <div className="section-container">
          <h2 className="section-title mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} to={`/shop?cat=${cat.name}`} className="relative rounded-xl3 overflow-hidden img-zoom group aspect-video block">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/60 transition-colors flex items-center justify-center">
                  <div className="text-center text-milk">
                    <h3 className="font-display text-3xl font-medium mb-1">{cat.name}</h3>
                    <span className="text-[12px] text-white/60">{cat.count} Items</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
