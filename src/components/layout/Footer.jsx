'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#111110] text-[#faf9f7]">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-12 xl:px-20">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="font-serif text-2xl font-semibold tracking-[0.12em] uppercase">Campus Vibes</div>
              <div className="text-[8px] tracking-[0.22em] uppercase text-white/40 mt-1">Media | Tech | Innovation</div>
            </div>
            <p className="text-[13px] leading-relaxed text-white/45 mb-6">
              Serving as a bridge between campus life and the world of opportunities through digital innovation and creative content.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, href: "https://instagram.com/campusvibestv" },
                { Icon: Twitter, href: "#" },
                { Icon: Facebook, href: "https://facebook.com/campusvibestv" },
                { Icon: Youtube, href: "https://youtube.com/@campusvibestv" }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-white hover:text-[#111110] transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Sectors', links: [['Technology','/projects'],['Media','/projects'],['Commerce','/projects']] },
            { title: 'Information', links: [['About Us','/about'],['Projects','/projects'],['Contact Us','/contact']] },
            { title: 'Connect', links: [['Instagram','https://instagram.com/campusvibestv'],['Facebook','https://facebook.com/campusvibestv'],['TikTok','https://tiktok.com/@campusvibestv']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-5 text-white/60">{title}</h4>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith('http') ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">{label}</a>
                    ) : (
                      <Link href={href} className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="py-8 flex flex-wrap gap-x-12 gap-y-4 text-[13px] text-white/35">
          <span className="flex items-center gap-2"><MapPin size={14} className="text-white/50" /> Head Office: Mbeya, Tanzania</span>
          <span className="flex items-center gap-2"><Mail size={14} className="text-white/50" /> contact@campusvibes.co.tz</span>
          <span className="flex items-center gap-2"><Instagram size={14} className="text-white/50" /> @campusvibestv</span>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/30">
          <span>© {new Date().getFullYear()} Campus Vibes Media. All rights reserved.</span>
          <div className="flex gap-6 text-[11px] uppercase tracking-wider">
            {['Privacy Policy','Terms of Service'].map(t => (
              <a key={t} href="#" className="hover:text-white/70 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
