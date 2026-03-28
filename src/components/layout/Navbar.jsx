'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 bg-[#faf9f7] transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : ''}`}>
      {/* Announcement bar */}
      <div className="bg-[#111110] text-[#faf9f7] text-center py-2 text-[11.5px] tracking-wider">
        Transforming Campus Experience through Media, Tech & Innovation
      </div>

      {/* Main nav row */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-12 xl:px-20">
        <div className="flex items-center h-16 gap-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f5f3ef] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col min-w-fit shrink-0">
            <span className="font-serif text-2xl font-semibold tracking-[0.05em] text-[#111110] uppercase">Campus Vibes</span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#8a867e] -mt-1">Media | Tech | Innovation</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {[
              ['/', 'Home'],
              ['/projects', 'Projects'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`text-[13px] tracking-wide transition-colors duration-200 relative group ${
                  pathname === href
                    ? 'text-[#111110] font-medium'
                    : 'text-[#8a867e] hover:text-[#111110]'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#111110] transition-all duration-300 ${
                    pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f3ef] transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link href="/contact" className="hidden sm:flex inline-flex items-center gap-2 px-5 py-2 bg-[#111110] text-[#faf9f7] text-[12px] font-medium tracking-wide rounded-lg transition-all duration-300 hover:bg-[#2a2825] hover:-translate-y-0.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">Get Started</Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#faf9f7] border-t border-[#e8e4dc] animate-slideDown">
          <div className="max-w-[88rem] mx-auto px-6 py-4 flex flex-col gap-1">
            {[
              ['/', 'Home'],
              ['/projects', 'Projects'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="py-3 text-[14px] text-[#111110] border-b border-[#e8e4dc]/50 last:border-0 hover:text-[#8a867e] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
