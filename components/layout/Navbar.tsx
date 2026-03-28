'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Heart, Sun, Moon, LogOut } from 'lucide-react';
import { useCart, useAuth, useTheme } from '@/context/providers';

export default function Navbar() {
  const { count, setCartOpen, wishlist } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>(['All', 'T-Shirts', 'Hoodies', 'Sets', 'Joggers']);
  const [activeFilter, setActiveFilter] = useState('All');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setCategories(['All', ...data.map((c: { name: string }) => c.name)]);
    }).catch(() => {});
  }, []);

  // Live search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : []);
      } catch { setSearchResults([]); }
      finally { setSearchLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const navLinks = [
    ['/', 'Home'],
    ['/shop', 'Shop'],
    ['/collections', 'Collections'],
    ['/about', 'About'],
    ['/blog', 'Blog'],
    ['/contact', 'Contact'],
  ];

  return (
    <header className={`sticky top-0 z-50 bg-milk transition-shadow duration-300 ${scrolled ? 'shadow-card' : ''}`}>
      {/* Announcement bar */}
      <div className="bg-ink text-milk text-center py-2 text-[11.5px] tracking-wider">
        Free shipping over ₦50,000 &nbsp;·&nbsp; Use <strong>VINTIE10</strong> for 10% off your first order
      </div>

      {/* Main nav */}
      <div className="section-container">
        <div className="flex items-center h-16 gap-6">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-cream transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex items-center min-w-fit shrink-0">
            <img src="/logo.png" alt="VINTIE" className="h-20 w-auto object-contain dark:brightness-0 dark:invert" style={{ mixBlendMode: 'multiply' }} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {navLinks.map(([to, label]) => (
              <Link key={to} href={to} className={`text-[13px] tracking-wide transition-colors duration-200 relative group ${pathname === to ? 'text-ink font-medium' : 'text-muted hover:text-ink'}`}>
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300 ${pathname === to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            {/* Search button */}
            <button onClick={openSearch} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <Search size={18} />
            </button>

            <Link href="/wishlist" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent rounded-full text-[8px] text-white flex items-center justify-center font-semibold">{wishlist.length}</span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
                {user ? (
                  <div className="w-7 h-7 rounded-full bg-ink text-milk flex items-center justify-center text-[11px] font-bold uppercase">
                    {user.full_name?.charAt(0) || 'U'}
                  </div>
                ) : <User size={18} />}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-milk border border-sand rounded-xl shadow-lift overflow-hidden animate-slideDown z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-sand">
                        <p className="text-[12px] font-medium text-ink truncate">{user.full_name}</p>
                        <p className="text-[11px] text-muted truncate">{user.email}</p>
                      </div>
                      {user.is_admin && (
                        <Link href="/admin" className="flex items-center gap-2 px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors">
                          Admin Dashboard
                        </Link>
                      )}
                      <Link href="/account" className="flex items-center gap-2 px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors">
                        My Account
                      </Link>
                      <button
                        onClick={async () => { await logout(); setUserMenuOpen(false); router.push('/'); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[13px] text-accent hover:bg-cream transition-colors border-t border-sand"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors">Sign In</Link>
                      <Link href="/signup" className="block px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors border-t border-sand">Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => setCartOpen(true)} className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-ink text-milk rounded-full text-[8px] flex items-center justify-center font-semibold">{count}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category filter strip */}
      <div className="border-t border-sand/60">
        <div className="section-container">
          <div className="flex items-center h-11 gap-3 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 border border-sand rounded px-3 h-7 text-[12px] cursor-pointer hover:border-ink transition-colors shrink-0">
              <span>Clothing</span><ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {categories.map(f => (
                <button key={f} onClick={() => { setActiveFilter(f); if (f !== 'All') router.push(`/shop?category=${encodeURIComponent(f)}`); }}
                  className={`tag-pill whitespace-nowrap ${activeFilter === f ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay with live results */}
      {searchOpen && (
        <div ref={searchRef} className="absolute inset-x-0 top-full bg-milk border-b border-sand shadow-lift animate-slideDown z-40">
          <div className="section-container py-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center gap-3 border border-sand rounded-xl px-4 py-3 max-w-2xl mx-auto focus-within:border-ink transition-colors">
                <Search size={18} className="text-muted shrink-0" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories…"
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-ink placeholder:text-muted"
                />
                {searchLoading && <div className="w-4 h-4 border-2 border-muted border-t-ink rounded-full animate-spin shrink-0" />}
                <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }} className="text-muted hover:text-ink shrink-0">
                  <X size={18} />
                </button>
              </div>
            </form>

            {/* Live results */}
            {searchResults.length > 0 && (
              <div className="max-w-2xl mx-auto mt-2 border border-sand rounded-xl overflow-hidden bg-milk">
                {searchResults.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors border-b border-sand/50 last:border-0"
                  >
                    <div className="w-10 h-12 rounded-lg overflow-hidden bg-cream shrink-0">
                      {product.image && <img src={product.image} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-ink truncate">{product.name}</p>
                      <p className="text-[11px] text-muted">{product.category}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-ink shrink-0">₦{product.price?.toLocaleString()}</span>
                  </Link>
                ))}
                <Link
                  href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-[12px] text-muted hover:text-ink transition-colors bg-cream/50"
                >
                  View all results for &quot;{searchQuery}&quot;
                </Link>
              </div>
            )}

            {searchQuery.length >= 2 && !searchLoading && searchResults.length === 0 && (
              <div className="max-w-2xl mx-auto mt-2 px-4 py-3 text-[13px] text-muted text-center">
                No products found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-milk border-t border-sand animate-slideDown">
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinks.map(([to, label]) => (
              <Link key={to} href={to} className="py-3 text-[14px] text-ink border-b border-sand/50 last:border-0 hover:text-muted transition-colors">
                {label}
              </Link>
            ))}
            <div className="pt-3 flex gap-3">
              {user ? (
                <button onClick={async () => { await logout(); setMobileOpen(false); }} className="text-[13px] text-accent font-medium">Sign Out</button>
              ) : (
                <>
                  <Link href="/login" className="text-[13px] text-ink font-medium">Sign In</Link>
                  <span className="text-muted">·</span>
                  <Link href="/signup" className="text-[13px] text-ink font-medium">Create Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


// export default function Navbar() {
//   const { count, setCartOpen, wishlist } = useCart();
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const router = useRouter();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [categories, setCategories] = useState<string[]>(['All', 'T-Shirts', 'Hoodies', 'Sets', 'Joggers']);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 24);
//     window.addEventListener('scroll', fn);
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);

//   useEffect(() => {
//     fetch('/api/categories').then(r => r.json()).then(data => {
//       if (Array.isArray(data)) setCategories(['All', ...data.map((c: { name: string }) => c.name)]);
//     }).catch(() => {});
//   }, []);

//   const navLinks = [
//     ['/', 'Home'],
//     ['/shop', 'Shop'],
//     ['/collections', 'Collections'],
//     ['/about', 'About'],
//     ['/blog', 'Blog'],
//     ['/contact', 'Contact'],
//   ];

//   return (
//     <header className={`sticky top-0 z-50 bg-milk transition-shadow duration-300 ${scrolled ? 'shadow-card' : ''}`}>
//       {/* Announcement bar */}
//       <div className="bg-ink text-milk text-center py-2 text-[11.5px] tracking-wider">
//         Free shipping over ₦50,000 &nbsp;·&nbsp; Use <strong>VINTIE10</strong> for 10% off your first order
//       </div>

//       {/* Main nav */}
//       <div className="section-container">
//         <div className="flex items-center h-16 gap-6">
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-cream transition-colors"
//           >
//             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>

//           <Link href="/" className="flex items-center min-w-fit shrink-0">
//             <img
//               src="/logo.png"
//               alt="VINTIE — Men's Clothing Lagos"
//               className="h-20 w-auto object-contain dark:brightness-0 dark:invert"
//               style={{ mixBlendMode: 'multiply' }}
//             />
//           </Link>

//           <nav className="hidden lg:flex items-center gap-8 mx-auto">
//             {navLinks.map(([to, label]) => (
//               <Link
//                 key={to}
//                 href={to}
//                 className={`text-[13px] tracking-wide transition-colors duration-200 relative group ${
//                   pathname === to ? 'text-ink font-medium' : 'text-muted hover:text-ink'
//                 }`}
//               >
//                 {label}
//                 <span className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300 ${pathname === to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-1 ml-auto lg:ml-0">
//             <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors" aria-label="Toggle theme">
//               {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
//             </button>
//             <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
//               <Search size={18} />
//             </button>
//             <Link href="/wishlist" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
//               <Heart size={18} />
//               {wishlist.length > 0 && (
//                 <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent rounded-full text-[8px] text-white flex items-center justify-center font-semibold">{wishlist.length}</span>
//               )}
//             </Link>

//             {/* User menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
//               >
//                 {user ? (
//                   <div className="w-7 h-7 rounded-full bg-ink text-milk flex items-center justify-center text-[11px] font-bold uppercase">
//                     {user.full_name?.charAt(0) || 'U'}
//                   </div>
//                 ) : <User size={18} />}
//               </button>
//               {userMenuOpen && (
//                 <div className="absolute right-0 top-full mt-2 w-48 bg-milk border border-sand rounded-xl shadow-lift overflow-hidden animate-slideDown z-50">
//                   {user ? (
//                     <>
//                       <div className="px-4 py-3 border-b border-sand">
//                         <p className="text-[12px] font-medium text-ink truncate">{user.full_name}</p>
//                         <p className="text-[11px] text-muted truncate">{user.email}</p>
//                       </div>
//                       {user.is_admin && (
//                         <Link href="/admin" className="flex items-center gap-2 px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors">
//                           Admin Dashboard
//                         </Link>
//                       )}
//                       <Link href="/account" className="flex items-center gap-2 px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors">
//                         My Account
//                       </Link>
//                       <button
//                         onClick={async () => { await logout(); setUserMenuOpen(false); router.push('/'); }}
//                         className="w-full flex items-center gap-2 px-4 py-3 text-[13px] text-accent hover:bg-cream transition-colors border-t border-sand"
//                       >
//                         <LogOut size={14} /> Sign Out
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link href="/login" className="block px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors">Sign In</Link>
//                       <Link href="/signup" className="block px-4 py-3 text-[13px] text-ink hover:bg-cream transition-colors border-t border-sand">Create Account</Link>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={() => setCartOpen(true)}
//               className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
//             >
//               <ShoppingBag size={18} />
//               {count > 0 && (
//                 <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-ink text-milk rounded-full text-[8px] flex items-center justify-center font-semibold">{count}</span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Category filter strip */}
//       <div className="border-t border-sand/60">
//         <div className="section-container">
//           <div className="flex items-center h-11 gap-3 overflow-x-auto scrollbar-hide">
//             <div className="flex items-center gap-2 border border-sand rounded px-3 h-7 text-[12px] cursor-pointer hover:border-ink transition-colors shrink-0">
//               <span>Clothing</span>
//               <ChevronDown size={12} />
//             </div>
//             <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
//               {categories.map(f => (
//                 <button
//                   key={f}
//                   onClick={() => setActiveFilter(f)}
//                   className={`tag-pill whitespace-nowrap ${activeFilter === f ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}
//                 >
//                   {f}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search overlay */}
//       {searchOpen && (
//         <div className="absolute inset-x-0 top-full bg-milk border-b border-sand shadow-card animate-slideDown z-40">
//           <div className="section-container py-4">
//             <div className="flex items-center gap-3 border border-sand rounded-xl px-4 py-3 max-w-2xl mx-auto">
//               <Search size={18} className="text-muted" />
//               <input
//                 autoFocus
//                 placeholder="Search products, categories…"
//                 className="flex-1 bg-transparent border-none outline-none text-[15px] text-ink placeholder:text-muted"
//               />
//               <button onClick={() => setSearchOpen(false)} className="text-muted hover:text-ink"><X size={18} /></button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile menu */}
//       {mobileOpen && (
//         <div className="lg:hidden bg-milk border-t border-sand animate-slideDown">
//           <div className="section-container py-4 flex flex-col gap-1">
//             {navLinks.map(([to, label]) => (
//               <Link key={to} href={to} className="py-3 text-[14px] text-ink border-b border-sand/50 last:border-0 hover:text-muted transition-colors">
//                 {label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
