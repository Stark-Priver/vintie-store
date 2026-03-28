'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Grid3X3, LayoutList, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Best Rating'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const priceRanges = [
  { label: 'Under ₦20,000', min: 0, max: 20000 },
  { label: '₦20,000 – ₦50,000', min: 20000, max: 50000 },
  { label: '₦50,000 – ₦100,000', min: 50000, max: 100000 },
  { label: 'Over ₦100,000', min: 100000, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get('category') || 'All';
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(initCat);
  const [sort, setSort] = useState('Newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showBadge, setShowBadge] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([p, c]) => {
      setProducts(Array.isArray(p) ? p : []);
      setFiltered(Array.isArray(p) ? p : []);
      if (Array.isArray(c)) setCategories(['All', ...c.map((x: any) => x.name)]);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = [...products];
    if (selectedCat !== 'All') list = list.filter(p => p.category === selectedCat);
    if (priceRange) list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    if (showBadge) list = list.filter(p => p.badge === showBadge);
    if (selectedSizes.length > 0) list = list.filter(p => p.sizes?.some((s: string) => selectedSizes.includes(s)));
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    else if (sort === 'Most Popular') list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    else if (sort === 'Best Rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setFiltered(list);
  }, [selectedCat, sort, selectedSizes, priceRange, showBadge, products]);

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const clearFilters = () => { setSelectedCat('All'); setSelectedSizes([]); setPriceRange(null); setShowBadge(null); };
  const activeFiltersCount = (selectedCat !== 'All' ? 1 : 0) + selectedSizes.length + (priceRange ? 1 : 0) + (showBadge ? 1 : 0);

  return (
    <div className="bg-milk min-h-screen">
      {/* Page header */}
      <div className="bg-cream border-b border-sand">
        <div className="section-container py-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">VINTIE</p>
          <h1 className="font-display text-4xl font-medium text-ink">Shop All</h1>
          <p className="text-[13px] text-muted mt-1">{filtered.length} products</p>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[13px] font-medium transition-all ${filterOpen ? 'bg-ink text-milk border-ink' : 'bg-milk text-ink border-sand hover:border-ink'}`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-accent text-white w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold">{activeFiltersCount}</span>
            )}
          </button>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`tag-pill whitespace-nowrap shrink-0 ${selectedCat === cat ? 'bg-ink text-milk' : 'bg-cream text-muted hover:text-ink'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-sand rounded-lg text-[13px] text-ink bg-milk cursor-pointer focus:outline-none focus:border-ink"
              >
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
            <div className="flex border border-sand rounded-lg overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}><Grid3X3 size={15} /></button>
              <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}><LayoutList size={15} /></button>
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div className="mb-8 p-6 bg-cream border border-sand rounded-xl animate-slideDown">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Sizes */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-10 h-10 rounded-lg border text-[12px] font-medium transition-all ${selectedSizes.includes(s) ? 'bg-ink text-milk border-ink' : 'border-sand text-muted hover:border-ink hover:text-ink'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Price Range</p>
                <div className="space-y-2">
                  {priceRanges.map(pr => (
                    <label key={pr.label} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange?.min === pr.min}
                        onChange={() => setPriceRange(pr)}
                        className="accent-ink"
                      />
                      <span className="text-[12px] text-muted group-hover:text-ink transition-colors">{pr.label}</span>
                    </label>
                  ))}
                  {priceRange && (
                    <button onClick={() => setPriceRange(null)} className="text-[11px] text-accent">Clear</button>
                  )}
                </div>
              </div>

              {/* Badge */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Filter by</p>
                <div className="space-y-2">
                  {['New', 'Sale'].map(b => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="badge" checked={showBadge === b} onChange={() => setShowBadge(b === showBadge ? null : b)} className="accent-ink" />
                      <span className="text-[12px] text-muted group-hover:text-ink transition-colors">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear all */}
              <div className="flex items-end">
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="flex items-center gap-2 text-[13px] text-accent font-medium hover:underline">
                    <X size={14} /> Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <div key={i} className="aspect-[3/4] bg-cream rounded-xl2 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[15px] text-muted mb-4">No products found for your filters.</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div className={view === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6'
            : 'flex flex-col gap-4'
          }>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-milk flex items-center justify-center"><div className="w-10 h-10 border-2 border-ink border-t-transparent rounded-full animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
