import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import api from '../lib/api';

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Best Rating'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const priceRanges = [
  { label: 'Under ₦20,000', min: 0, max: 20000 },
  { label: '₦20,000 – ₦50,000', min: 20000, max: 50000 },
  { label: '₦50,000 – ₦100,000', min: 50000, max: 100000 },
  { label: 'Over ₦100,000', min: 100000, max: Infinity }
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState('grid');
  const [showBadge, setShowBadge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll()
        ]);
        setProducts(productsData);
        setFiltered(productsData);
        if (categoriesData) {
          setCategories(['All', ...categoriesData.map(c => c.name)]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let list = [...products];
    if (selectedCat !== 'All') {
      // Note: in mockData it was p.category, in DB it might be category_id or we might have name joined.
      // For simplicity, let's assume we match by category name if we store it or join it.
      // If we use category_id, we'd need to fetch categories too.
      // Let's assume the products table has a 'category' text field for now or we match the name.
      list = list.filter(p => p.category === selectedCat);
    }
    if (priceRange) list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    if (showBadge) list = list.filter(p => p.badge === showBadge);
    if (selectedSizes.length > 0) list = list.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));

    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    if (sort === 'Most Popular') list.sort((a, b) => b.reviews - a.reviews);
    if (sort === 'Best Rating') list.sort((a, b) => b.rating - a.rating);

    setFiltered(list);
  }, [selectedCat, sort, selectedSizes, priceRange, showBadge, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milk">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ink"></div>
      </div>
    );
  }

  const toggleSize = (s) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const clearFilters = () => { setSelectedCat('All'); setSelectedSizes([]); setPriceRange(null); setShowBadge(null); };
  const hasFilters = selectedCat !== 'All' || selectedSizes.length > 0 || priceRange || showBadge;

  return (
    <div className="bg-milk min-h-screen">
      {/* Page header */}
      <div className="bg-cream border-b border-sand/60">
        <div className="section-container py-10">
          <h1 className="font-display text-4xl font-medium text-ink">Shop All</h1>
          <p className="text-sm text-muted mt-1">Discover {products.length} premium pieces</p>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`w-60 flex-shrink-0 hidden lg:block`}>
            <div className="sticky top-36 space-y-7">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[14px] text-ink">Filters</span>
                {hasFilters && <button onClick={clearFilters} className="text-[11px] text-accent hover:underline">Clear all</button>}
              </div>

              {/* Category */}
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-3">Category</p>
                <div className="space-y-1">
                  {categories.map(c => (
                    <button key={c} onClick={() => setSelectedCat(c)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${selectedCat === c ? 'bg-ink text-milk font-medium' : 'text-muted hover:text-ink hover:bg-cream'}`}
                    >{c}</button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-3">Price</p>
                <div className="space-y-1">
                  {priceRanges.map(r => (
                    <button key={r.label} onClick={() => setPriceRange(priceRange?.label === r.label ? null : r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${priceRange?.label === r.label ? 'bg-ink text-milk font-medium' : 'text-muted hover:text-ink hover:bg-cream'}`}
                    >{r.label}</button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button key={s} onClick={() => toggleSize(s)}
                      className={`w-10 h-10 rounded-lg text-[12px] font-medium border transition-all duration-200 ${selectedSizes.includes(s) ? 'bg-ink text-milk border-ink' : 'border-sand text-muted hover:border-ink hover:text-ink'}`}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-3">Offers</p>
                <div className="space-y-1">
                  {['New', 'Sale'].map(b => (
                    <button key={b} onClick={() => setShowBadge(showBadge === b ? null : b)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${showBadge === b ? 'bg-ink text-milk font-medium' : 'text-muted hover:text-ink hover:bg-cream'}`}
                    >{b === 'New' ? 'New Arrivals' : 'On Sale'}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand/60">
              <p className="text-[13px] text-muted">{filtered.length} products</p>
              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="appearance-none bg-cream border border-sand rounded-lg px-4 py-2 pr-8 text-[12px] text-ink cursor-pointer outline-none"
                  >
                    {sortOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
                {/* View */}
                <div className="flex border border-sand rounded-lg overflow-hidden">
                  <button onClick={() => setView('grid')} className={`p-2 transition-colors ${view === 'grid' ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}><Grid3X3 size={15}/></button>
                  <button onClick={() => setView('list')} className={`p-2 transition-colors ${view === 'list' ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}><LayoutList size={15}/></button>
                </div>
                {/* Mobile filter */}
                <button onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-sand rounded-lg text-[12px] text-ink">
                  <SlidersHorizontal size={14}/> Filters {hasFilters && <span className="w-4 h-4 bg-ink text-milk rounded-full text-[9px] flex items-center justify-center">!</span>}
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCat !== 'All' && <Chip label={selectedCat} onRemove={() => setSelectedCat('All')}/>}
                {priceRange && <Chip label={priceRange.label} onRemove={() => setPriceRange(null)}/>}
                {showBadge && <Chip label={showBadge} onRemove={() => setShowBadge(null)}/>}
                {selectedSizes.map(s => <Chip key={s} label={`Size ${s}`} onRemove={() => toggleSize(s)}/>)}
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted">
                <p className="text-lg font-display">No products found</p>
                <button onClick={clearFilters} className="mt-4 btn-outline text-sm">Clear Filters</button>
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5' : 'flex flex-col gap-4'}>
                {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setFilterOpen(false)}/>
          <div className="relative ml-auto w-[300px] bg-milk h-full overflow-y-auto p-6 animate-slideRight">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold">Filters</span>
              <button onClick={() => setFilterOpen(false)}><X size={18}/></button>
            </div>
            {/* Same filter content */}
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">Category</p>
                {categories.map(c => (
                  <button key={c} onClick={() => setSelectedCat(c)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-[13px] mb-1 ${selectedCat === c ? 'bg-ink text-milk' : 'text-muted hover:text-ink hover:bg-cream'}`}>{c}</button>
                ))}
              </div>
              <div className="flex justify-between gap-3 pt-4">
                <button onClick={() => { clearFilters(); setFilterOpen(false); }} className="btn-outline flex-1 justify-center text-sm">Clear</button>
                <button onClick={() => setFilterOpen(false)} className="btn-primary flex-1 justify-center text-sm">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-milk rounded-full text-[11px] font-medium">
      {label}
      <button onClick={onRemove}><X size={10}/></button>
    </span>
  );
}
