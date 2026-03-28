'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight, MapPin, Phone, Mail, Send, Heart, Package,
  User, LogOut, Star, ChevronDown, Lock, Edit2, Save, X,
  Eye, EyeOff, Loader2, CheckCircle, ShoppingBag
} from 'lucide-react';
import { useCart, useAuth } from '@/context/providers';
import ProductCard from '@/components/ui/ProductCard';

/* ─── COLLECTIONS ──────────────────────────────────────────── */
export function CollectionsPage() {
  const collections = [
    { title: 'Summer Essentials', desc: 'Light fabrics for Lagos heat', img: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=700&q=80', items: 24 },
    { title: 'Street Style', desc: 'Urban looks for the bold', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&q=80', items: 18 },
    { title: 'Corporate Edit', desc: 'Office-ready, all-day comfort', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d00?w=700&q=80', items: 15 },
    { title: 'Weekend Casual', desc: 'Effortless off-duty style', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80', items: 22 },
    { title: 'Premium Collection', desc: 'Luxury pieces, curated taste', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80', items: 12 },
    { title: 'Classic Lagos', desc: 'Lagos-inspired contemporary', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80', items: 30 },
  ];
  return (
    <div className="bg-milk min-h-screen">
      <div className="relative h-[50vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" alt="Collections" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-milk px-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 block mb-3">Curated for You</span>
            <h1 className="font-display text-6xl font-medium mb-3">Collections</h1>
            <p className="text-[14px] text-white/55 max-w-md mx-auto">Explore our seasonal lookbooks and themed collections</p>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <Link key={i} href="/shop" className="group relative overflow-hidden rounded-xl3 aspect-[4/5] block">
                <img src={col.img} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-2xl font-medium text-milk mb-1">{col.title}</p>
                  <p className="text-[12px] text-white/55 mb-3">{col.desc} &middot; {col.items} items</p>
                  <span className="inline-flex items-center gap-2 text-[12px] text-milk font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────── */
export function AboutPage() {
  const team = [
    { name: 'Amara Osei', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80' },
    { name: 'James Kofi', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80' },
    { name: 'Priya Sharma', role: 'Brand Strategist', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
    { name: 'Lucas Ferreira', role: 'Production Lead', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&q=80' },
  ];
  return (
    <div className="bg-milk min-h-screen">
      <div className="relative h-[70vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" alt="" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-milk px-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 block mb-3">Our Story</span>
            <h1 className="font-display text-6xl font-medium mb-4">Built on Passion,<br /><em className="font-light">Refined by Craft</em></h1>
            <p className="text-[14px] text-white/55 max-w-lg mx-auto leading-relaxed">VINTIE was born from a belief that great style should be accessible and genuinely personal.</p>
          </div>
        </div>
      </div>
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-4">Our Mission</span>
              <h2 className="font-display text-5xl font-medium leading-tight text-ink mb-6">Fashion that Feels as Good as it Looks</h2>
              <p className="text-[14px] text-muted leading-relaxed mb-4">We source only the finest materials and design collections that endure beyond trends. Located at 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos.</p>
              <p className="text-[14px] text-muted leading-relaxed mb-8">Open daily 10am-8pm. Sundays 1pm-8pm.</p>
              <Link href="/shop" className="btn-primary">Shop the Collection <ArrowRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=80" className="rounded-xl3 w-full aspect-square object-cover mt-8" alt="" />
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" className="rounded-xl3 w-full aspect-square object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-ink text-milk">
        <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['44.7K+', 'Instagram Followers'], ['534', 'Posts & Products'], ['50+', 'Cities Delivered'], ['100%', 'Quality Assured']].map(([num, label]) => (
            <div key={label}><div className="font-display text-5xl font-medium mb-1">{num}</div><div className="text-[12px] text-white/45 tracking-wide">{label}</div></div>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12"><h2 className="section-title mb-1">Meet the Team</h2><p className="section-sub">The people behind VINTIE</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-full aspect-square rounded-xl3 overflow-hidden img-zoom mb-4"><img src={m.img} alt={m.name} className="w-full h-full object-cover" /></div>
                <p className="font-semibold text-ink text-[14px]">{m.name}</p>
                <p className="text-[12px] text-muted mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── BLOG ──────────────────────────────────────────────────── */
export function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/blog_posts').then(r => r.json()).then(d => setPosts(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoading(false));
  }, []);
  const fallback = [
    { id: 1, title: '5 Essential Pieces Every Lagos Man Needs', excerpt: 'From boardroom to bar, these staples carry you through every occasion.', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&q=80', category: 'Style Guide', read_time: '4 min read', author: 'VINTIE Team' },
    { id: 2, title: 'How to Style Your Outfits in Lagos Heat', excerpt: 'Stay fresh and stylish even at 35 degrees.', image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=700&q=80', category: 'Tips', read_time: '3 min read', author: 'VINTIE Team' },
    { id: 3, title: 'The Rise of Nigerian Streetwear', excerpt: "Lagos has become Africa's fashion capital. Here's why.", image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80', category: 'Culture', read_time: '5 min read', author: 'VINTIE Team' },
  ];
  const displayPosts = posts.length > 0 ? posts : fallback;
  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand py-12">
        <div className="section-container text-center">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Insights</span>
          <h1 className="font-display text-5xl font-medium text-ink">Style Journal</h1>
          <p className="section-sub mt-2 text-[14px]">Fashion tips, trends, and stories from VINTIE Lagos</p>
        </div>
      </div>
      <section className="py-16">
        <div className="section-container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[...Array(3)].map((_, i) => <div key={i} className="aspect-video bg-cream rounded-xl2 animate-pulse" />)}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPosts.map((post: any, i: number) => (
                <article key={post.id || i} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl2 aspect-video img-zoom mb-4">
                    <img src={post.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80'} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-accent font-semibold">{post.category}</span>
                  <h2 className="font-display text-xl font-medium text-ink mt-1.5 mb-2 leading-tight group-hover:text-muted transition-colors">{post.title}</h2>
                  <p className="text-[13px] text-muted leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    <span>{post.author}</span><span>&middot;</span><span>{post.read_time}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────── */
export function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'Where is VINTIE located?', a: '3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos. Open daily 10am-8pm, Sundays 1pm-8pm.' },
    { q: 'Do you offer delivery?', a: 'Yes! We deliver within Lagos and nationwide. Orders above 50,000 naira get free delivery in Lagos.' },
    { q: 'How long does delivery take?', a: 'Lagos: 1-3 business days. Nationwide: 3-7 business days.' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery, provided items are unworn and in original condition with tags.' },
    { q: 'How do I apply a promo code?', a: 'Enter your promo code at checkout in the Promo Code field and click Apply. The discount is applied instantly.' },
    { q: 'Can I pay on delivery?', a: 'Yes, we offer Cash/POS on delivery for Lagos orders. Select Pay on Delivery at checkout.' },
    { q: 'How do I track my order?', a: 'After placing your order, WhatsApp us at wa.me/message/OT2BFLRVDDAMF1 for real-time updates.' },
    { q: 'Do you have a size guide?', a: 'Yes, each product page has a Size Guide button with measurements in cm and inches.' },
    { q: 'Can I shop in-store?', a: 'Absolutely! Visit us at 3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos. Our staff will assist you.' },
  ];
  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand py-12">
        <div className="section-container text-center">
          <h1 className="font-display text-5xl font-medium text-ink mb-2">FAQ</h1>
          <p className="text-[14px] text-muted">Everything you need to know about shopping at VINTIE</p>
        </div>
      </div>
      <section className="py-16">
        <div className="section-container max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-sand rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cream transition-colors">
                  <span className="text-[14px] font-medium text-ink">{faq.q}</span>
                  <ChevronDown size={16} className={`text-muted shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && <div className="px-6 pb-5"><p className="text-[14px] text-muted leading-relaxed">{faq.a}</p></div>}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center p-8 bg-cream rounded-xl2 border border-sand">
            <p className="text-[14px] text-muted mb-4">Still have questions? We are here to help!</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="btn-primary">Chat on WhatsApp</a>
              <Link href="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────── */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setSending(false);
  };
  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand py-12">
        <div className="section-container text-center">
          <h1 className="font-display text-5xl font-medium text-ink mb-2">Contact Us</h1>
          <p className="text-[14px] text-muted">We would love to hear from you</p>
        </div>
      </div>
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-3xl font-medium text-ink mb-8">Send a Message</h2>
              {sent ? (
                <div className="p-8 bg-emerald-50 rounded-xl2 text-center border border-emerald-100">
                  <CheckCircle size={36} className="text-emerald-600 mx-auto mb-3" />
                  <p className="font-semibold text-emerald-700 text-[15px] mb-1">Message Sent!</p>
                  <p className="text-[13px] text-emerald-600">We will get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-4 text-[12px] text-muted hover:text-ink underline">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Full Name</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Emeka Okafor" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Email Address</label>
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Subject</label>
                    <input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Message</label>
                    <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
                    {sending ? <><Loader2 className="animate-spin" size={16} /> Sending...</> : <>Send Message <Send size={16} /></>}
                  </button>
                </form>
              )}
            </div>
            <div className="space-y-5">
              <div className="p-6 bg-cream rounded-xl2 border border-sand">
                <h3 className="font-semibold text-ink mb-4 text-[15px]">Visit Our Store</h3>
                <div className="space-y-3">
                  <a href="https://maps.google.com/?q=E-Centre,Sabo,Yaba,Lagos" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[13px] text-muted hover:text-ink transition-colors">
                    <MapPin size={15} className="text-ink shrink-0 mt-0.5" />3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos
                  </a>
                  <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-muted hover:text-ink transition-colors">
                    <Phone size={15} className="text-ink" />WhatsApp Us
                  </a>
                  <a href="mailto:hello@vintie.shop" className="flex items-center gap-3 text-[13px] text-muted hover:text-ink transition-colors">
                    <Mail size={15} className="text-ink" />hello@vintie.shop
                  </a>
                </div>
              </div>
              <div className="p-6 bg-cream rounded-xl2 border border-sand">
                <h3 className="font-semibold text-ink mb-4 text-[15px]">Opening Hours</h3>
                <div className="space-y-2">
                  {[['Monday - Saturday', '10:00 AM - 8:00 PM'], ['Sunday', '1:00 PM - 8:00 PM']].map(([day, time]) => (
                    <div key={day} className="flex justify-between text-[13px]">
                      <span className="text-muted">{day}</span>
                      <span className="text-ink font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                Chat on WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── WISHLIST ──────────────────────────────────────────────── */
export function WishlistPage() {
  const { wishlist } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (wishlist.length > 0) {
      setLoading(true);
      fetch('/api/products').then(r => r.json()).then(data => {
        if (Array.isArray(data)) setProducts(data.filter((p: any) => wishlist.includes(p.id)));
      }).catch(() => {}).finally(() => setLoading(false));
    } else {
      setProducts([]);
    }
  }, [wishlist]);
  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand py-12">
        <div className="section-container">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Saved Items</span>
          <h1 className="font-display text-5xl font-medium text-ink">Wishlist</h1>
          <p className="text-[13px] text-muted mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <section className="py-16">
        <div className="section-container">
          {wishlist.length === 0 ? (
            <div className="text-center py-24">
              <Heart size={52} strokeWidth={1} className="text-muted mx-auto mb-4" />
              <h2 className="font-display text-3xl text-ink mb-3">Your wishlist is empty</h2>
              <p className="text-[14px] text-muted mb-8">Tap the heart icon on any product to save it here</p>
              <Link href="/shop" className="btn-primary">Start Shopping <ArrowRight size={16} /></Link>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(wishlist.length)].map((_, i) => <div key={i} className="aspect-[3/4] bg-cream rounded-xl2 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ─── ACCOUNT ───────────────────────────────────────────────── */
const ORDER_STATUS_CLS: Record<string, string> = {
  delivered: 'bg-emerald-50 text-emerald-700',
  shipped: 'bg-blue-50 text-blue-700',
  processing: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-red-50 text-red-600',
};

export function AccountPage() {
  const { user, logout, refreshUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tab, setTab] = useState('orders');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/orders?user=true').then(r => r.json()).then(d => setOrders(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setOrdersLoading(false));
  }, []);

  useEffect(() => {
    if (user) setProfileForm({ full_name: user.full_name || '', phone: '' });
  }, [user]);

  const saveProfile = async () => {
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const res = await fetch('/api/auth/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profileForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProfileMsg({ type: 'success', text: 'Profile updated!' });
      setEditing(false);
      await refreshUser();
    } catch (e: any) {
      setProfileMsg({ type: 'error', text: e.message || 'Failed to update profile' });
    } finally { setSavingProfile(false); }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg({ type: 'error', text: 'New passwords do not match' }); return; }
    if (pwForm.newPw.length < 6) { setPwMsg({ type: 'error', text: 'Password must be at least 6 characters' }); return; }
    setSavingPw(true);
    setPwMsg(null);
    try {
      const res = await fetch('/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPwMsg({ type: 'success', text: 'Password changed successfully!' });
      setPwForm({ current: '', newPw: '', confirm: '' });
    } catch (e: any) {
      setPwMsg({ type: 'error', text: e.message || 'Failed to change password' });
    } finally { setSavingPw(false); }
  };

  const tabs = [
    { key: 'orders', icon: ShoppingBag, label: 'My Orders' },
    { key: 'profile', icon: User, label: 'Profile' },
    { key: 'security', icon: Lock, label: 'Security' },
  ];

  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand py-8">
        <div className="section-container flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-ink text-milk flex items-center justify-center font-bold text-2xl uppercase shrink-0">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="font-display text-3xl font-medium text-ink">{user?.full_name || 'My Account'}</h1>
            <p className="text-[13px] text-muted">{user?.email}</p>
          </div>
          <button onClick={() => logout()} className="ml-auto flex items-center gap-2 text-[13px] text-muted hover:text-accent transition-colors">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>
      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(({ key, icon: Icon, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all shrink-0 ${tab === key ? 'bg-ink text-milk' : 'text-muted hover:text-ink hover:bg-cream'}`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
          <div>
            {tab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-medium text-ink">My Orders</h2>
                  <span className="text-[12px] text-muted">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
                </div>
                {ordersLoading ? (
                  <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-cream rounded-xl border border-sand animate-pulse" />)}</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20 bg-cream rounded-xl2 border border-sand">
                    <Package size={44} strokeWidth={1} className="text-muted mx-auto mb-4" />
                    <p className="font-display text-2xl text-ink mb-2">No orders yet</p>
                    <p className="text-[14px] text-muted mb-6">Your orders will appear here once you shop</p>
                    <Link href="/shop" className="btn-primary inline-flex">Browse Products <ArrowRight size={15} /></Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o: any) => (
                      <div key={o.id} className="border border-sand rounded-xl overflow-hidden">
                        <button onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}
                          className="w-full flex items-center justify-between p-5 hover:bg-cream/50 transition-colors text-left">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center">
                              <Package size={16} className="text-muted" />
                            </div>
                            <div>
                              <p className="font-semibold text-ink font-mono text-[13px]">{o.id}</p>
                              <p className="text-[11px] text-muted">{new Date(o.created_at).toLocaleDateString('en-NG', { dateStyle: 'medium' })} &middot; {o.items_count} item{o.items_count !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${ORDER_STATUS_CLS[o.status] || ORDER_STATUS_CLS.processing}`}>{o.status}</span>
                            <span className="font-bold text-ink text-[14px]">&#x20A6;{o.amount?.toLocaleString()}</span>
                            <ChevronDown size={15} className={`text-muted transition-transform ${expandedOrder === o.id ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {expandedOrder === o.id && o.items && (
                          <div className="border-t border-sand p-5 bg-cream/30">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Items</p>
                            <div className="space-y-2 mb-4">
                              {o.items.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                  {item.image && <img src={item.image} alt="" className="w-10 h-12 rounded-lg object-cover bg-sand" />}
                                  <div className="flex-1">
                                    <p className="text-[12px] font-medium text-ink">{item.name}</p>
                                    <p className="text-[11px] text-muted">Size: {item.size} &middot; Qty: {item.qty}</p>
                                  </div>
                                  <span className="text-[12px] font-semibold text-ink">&#x20A6;{(item.price * item.qty).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            {o.status !== 'delivered' && o.status !== 'cancelled' && (
                              <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="text-[12px] text-ink font-medium hover:underline flex items-center gap-1.5">
                                <Phone size={12} /> Track order on WhatsApp
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {tab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-medium text-ink">Profile Details</h2>
                  {!editing && (
                    <button onClick={() => { setEditing(true); setProfileMsg(null); }} className="flex items-center gap-2 text-[13px] text-ink border border-sand rounded-lg px-3 py-2 hover:border-ink transition-colors">
                      <Edit2 size={13} /> Edit
                    </button>
                  )}
                </div>
                {profileMsg && (
                  <div className={`mb-5 p-4 rounded-xl border text-[13px] flex items-center gap-2 ${profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {profileMsg.type === 'success' ? <CheckCircle size={15} /> : <X size={15} />}
                    {profileMsg.text}
                  </div>
                )}
                <div className="bg-cream rounded-xl p-6 border border-sand space-y-5">
                  {editing ? (
                    <>
                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Full Name</label>
                        <input value={profileForm.full_name} onChange={e => setProfileForm(f => ({ ...f, full_name: e.target.value }))} className="input-field" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Phone Number</label>
                        <input value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} className="input-field" placeholder="+234 800 000 0000" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Email Address</label>
                        <input value={user?.email || ''} disabled className="input-field opacity-50 cursor-not-allowed" />
                        <p className="text-[11px] text-muted mt-1">Email cannot be changed</p>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button onClick={saveProfile} disabled={savingProfile} className="btn-primary py-2.5 px-5 text-[13px] disabled:opacity-60">
                          {savingProfile ? <><Loader2 className="animate-spin" size={14} /> Saving...</> : <><Save size={14} /> Save Changes</>}
                        </button>
                        <button onClick={() => { setEditing(false); setProfileMsg(null); }} className="btn-outline py-2.5 px-5 text-[13px]">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      {[['Full Name', user?.full_name], ['Email Address', user?.email], ['Account Type', user?.is_admin ? 'Admin' : 'Customer']].map(([label, val]) => (
                        <div key={label as string}>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">{label as string}</p>
                          <p className="text-[14px] text-ink">{(val as string) || '-'}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
            {tab === 'security' && (
              <div>
                <h2 className="font-display text-2xl font-medium text-ink mb-6">Security</h2>
                <div className="bg-cream rounded-xl p-6 border border-sand">
                  <h3 className="font-semibold text-ink mb-5">Change Password</h3>
                  {pwMsg && (
                    <div className={`mb-5 p-4 rounded-xl border text-[13px] flex items-center gap-2 ${pwMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {pwMsg.type === 'success' ? <CheckCircle size={15} /> : <X size={15} />}
                      {pwMsg.text}
                    </div>
                  )}
                  <form onSubmit={changePassword} className="space-y-4">
                    {[
                      { label: 'Current Password', key: 'current', val: pwForm.current },
                      { label: 'New Password', key: 'newPw', val: pwForm.newPw },
                      { label: 'Confirm New Password', key: 'confirm', val: pwForm.confirm },
                    ].map(({ label, key, val }) => (
                      <div key={key}>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">{label}</label>
                        <div className="relative">
                          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                          <input required type={showPw ? 'text' : 'password'} value={val} onChange={e => setPwForm(f => ({ ...f, [key]: e.target.value }))} className="input-field pl-10 pr-10" placeholder="........" />
                          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors">
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="submit" disabled={savingPw} className="btn-primary py-2.5 px-5 text-[13px] disabled:opacity-60 mt-2">
                      {savingPw ? <><Loader2 className="animate-spin" size={14} /> Updating...</> : <><Lock size={14} /> Update Password</>}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
