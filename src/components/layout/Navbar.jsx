import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Heart, Bell } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { categoryFilters } from '../../data/mockData';

export default function Navbar() {
  const { count, setCartOpen, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  if (isAdmin) return null;

  return (
    <header className={`sticky top-0 z-50 bg-milk transition-shadow duration-300 ${scrolled ? 'shadow-card' : ''}`}>
      {/* Announcement */}
      <div className="bg-ink text-milk text-center py-2 text-[11.5px] tracking-wider">
        Free shipping over ₦150 &nbsp;·&nbsp; Use <strong>VINTIE10</strong> for 10% off your first order
      </div>

      {/* Main row */}
      <div className="section-container">
        <div className="flex items-center h-16 gap-6">
          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-cream transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

         {/* Logo */}
            <Link to="/" className="flex flex-col items-center min-w-fit">
              <img 
                src="/public/logo.png" 
                alt="VINTIE Logo" 
                className="h-12 w-auto object-contain" 
                style={{ marginTop: '-2px' }}
              />
            </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/collections', 'Collections'], ['/about', 'About'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className={`text-[13px] tracking-wide transition-colors duration-200 relative group ${location.pathname === to ? 'text-ink font-medium' : 'text-muted hover:text-ink'}`}
              >
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300 ${location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors" aria-label="Search">
              <Search size={18} />
            </button>
            <Link to="/wishlist" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors" aria-label="Wishlist">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent rounded-full text-[8px] text-white flex items-center justify-center font-semibold">{wishlist.length}</span>}
            </Link>
            <Link to="/account" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors" aria-label="Account">
              <User size={18} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-ink text-milk rounded-full text-[8px] flex items-center justify-center font-semibold">{count}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-t border-sand/60">
        <div className="section-container">
          <div className="flex items-center h-11 gap-3 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 border border-sand rounded px-3 h-7 text-[12px] cursor-pointer hover:border-ink transition-colors shrink-0">
              <span>Clothing</span><ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-2 border border-sand rounded px-2 h-7 text-muted shrink-0">
              <Search size={12} />
              <input placeholder="Search…" className="bg-transparent border-none outline-none text-[12px] text-ink w-32" />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {categoryFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`tag-pill whitespace-nowrap ${activeFilter === f ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-milk border-b border-sand shadow-card animate-slideDown z-40">
          <div className="section-container py-4">
            <div className="flex items-center gap-3 border border-sand rounded-xl px-4 py-3 max-w-2xl mx-auto">
              <Search size={18} className="text-muted" />
              <input autoFocus placeholder="Search products, categories…" className="flex-1 bg-transparent border-none outline-none text-[15px] text-ink placeholder:text-muted" />
              <button onClick={() => setSearchOpen(false)} className="text-muted hover:text-ink"><X size={18} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-milk border-t border-sand animate-slideDown">
          <div className="section-container py-4 flex flex-col gap-1">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/collections', 'Collections'], ['/about', 'About'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} className="py-3 text-[14px] text-ink border-b border-sand/50 last:border-0">{label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
