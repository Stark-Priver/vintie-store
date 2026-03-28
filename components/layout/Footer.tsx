'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Send, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  return (
    <footer className="bg-ink text-milk">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12 border-b border-white/8">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="font-display text-3xl font-semibold tracking-[0.12em]">VINTIE</div>
              <div className="text-[8px] tracking-[0.22em] uppercase text-white/40 mt-1">Men's Clothing Lagos</div>
            </div>
            <p className="text-[13px] leading-relaxed text-white/45 mb-6">
              Premium men's fashion at 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos.
            </p>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/vintie_ng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-white hover:text-ink transition-all duration-200">
                <Instagram size={15} />
              </a>
              {[Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-white hover:text-ink transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Shop', links: [['Shop All', '/shop'], ['New Arrivals', '/shop'], ['Sale', '/shop'], ['Collections', '/collections'], ['Lookbook', '/collections']] },
            { title: 'Help', links: [['FAQ', '/faq'], ['Shipping Info', '/faq'], ['Returns', '/faq'], ['Size Guide', '/faq'], ['Contact Us', '/contact']] },
            { title: 'Company', links: [['About Us', '/about'], ['Blog', '/blog'], ['Privacy Policy', '#'], ['Terms', '#'], ['Careers', '#']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-5 text-white/60">{title}</h4>
              <ul className="space-y-3">
                {links.map(([label, to]) => (
                  <li key={label}>
                    <Link href={to} className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-10 border-b border-white/8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-xl font-medium mb-1">Stay in the loop</h4>
            <p className="text-[13px] text-white/40">Exclusive offers, style guides and new arrivals.</p>
          </div>
          {subbed ? (
            <p className="text-[13px] text-gold font-medium">✓ You&apos;re subscribed — watch your inbox!</p>
          ) : (
            <div className="flex gap-0 border border-white/15 rounded-lg overflow-hidden w-full md:w-auto md:min-w-[360px]">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/5 border-none outline-none px-4 py-3 text-[13px] text-white placeholder:text-white/30"
              />
              <button
                onClick={() => { if (email.includes('@')) setSubbed(true); }}
                className="w-12 bg-white text-ink flex items-center justify-center hover:bg-gold transition-colors duration-200 shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Contact row */}
        <div className="py-6 flex flex-wrap gap-6 text-[12px] text-white/35">
          <a href="https://maps.google.com/?q=E-Centre,Sabo,Yaba,Lagos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/70 transition-colors">
            <MapPin size={13} /> 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos
          </a>
          <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/70 transition-colors">
            <Phone size={13} /> WhatsApp Us
          </a>
          <a href="mailto:hello@vintie.shop" className="flex items-center gap-2 hover:text-white/70 transition-colors">
            <Mail size={13} /> hello@vintie.shop
          </a>
        </div>

        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/30">
          <span>© {new Date().getFullYear()} VINTIE. All rights reserved.</span>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="hover:text-white/70 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
