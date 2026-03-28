import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Send, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-ink text-milk">
      <div className="section-container">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="font-display text-3xl font-semibold tracking-[0.12em]">VINTIE</div>
              <div className="text-[8px] tracking-[0.22em] uppercase text-white/40 mt-1">Accessories | Wears</div>
            </div>
            <p className="text-[13px] leading-relaxed text-white/45 mb-6">
              Express your unique style with our curated collections of premium accessories and wears.
            </p>
            <div className="flex gap-2">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-white hover:text-ink transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Shop', links: [['Shop All','/shop'],['New Arrivals','/shop'],['Sale','/shop'],['Collections','/collections'],['Lookbook','/collections']] },
            { title: 'Help', links: [['FAQ','/faq'],['Shipping Info','/faq'],['Returns','/faq'],['Size Guide','/faq'],['Contact Us','/contact']] },
            { title: 'Company', links: [['About Us','/about'],['Blog','/blog'],['Press','#'],['Careers','#'],['Privacy Policy','#']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-5 text-white/60">{title}</h4>
              <ul className="space-y-3">
                {links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">{label}</Link>
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
            <p className="text-[13px] text-white/40">Exclusive offers, style guides and new arrivals to your inbox.</p>
          </div>
          <div className="flex gap-0 border border-white/15 rounded-lg overflow-hidden w-full md:w-auto md:min-w-[360px]">
            <input type="email" placeholder="Your email address" className="flex-1 bg-white/5 border-none outline-none px-4 py-3 text-[13px] text-white placeholder:text-white/30" />
            <button className="w-12 bg-white text-ink flex items-center justify-center hover:bg-gold transition-colors duration-200 shrink-0">
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Contact row */}
        <div className="py-6 flex flex-wrap gap-6 text-[12px] text-white/35">
          <span className="flex items-center gap-2"><MapPin size={13} /> 123 Victoria Island, Lagos, Nigeria</span>
          <span className="flex items-center gap-2"><Phone size={13} /> +234 800 000 0000</span>
          <span className="flex items-center gap-2"><Mail size={13} /> hello@vintie.com</span>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/30">
          <span>© {new Date().getFullYear()} VINTIE. All rights reserved.</span>
          <div className="flex gap-6">
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(t => (
              <a key={t} href="#" className="hover:text-white/70 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
