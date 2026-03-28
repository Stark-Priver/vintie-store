'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Package, Users, Tag, BarChart3,
  Settings, Bell, Search, TrendingUp, TrendingDown, ArrowUpRight,
  Eye, Pencil, Trash2, Plus, X, CheckCircle, Clock, XCircle,
  Truck, DollarSign, ShoppingCart, UserCheck, Star, Menu, LogOut,
  Sun, Moon, Image as ImageIcon, FileText, RefreshCw, Upload,
  Save, Loader2, Filter, MessageSquare, MapPin, Phone, Globe,
  Instagram, ChevronDown
} from 'lucide-react';
import { useAuth, useTheme } from '@/context/providers';

// ─── Types ────────────────────────────────────────────────────────
type Product = { id: number; name: string; price: number; original_price?: number; category?: string; badge?: string; rating?: number; reviews?: number; stock?: number; image?: string; description?: string; sizes?: string[]; colors?: string[]; is_featured?: boolean; };
type Order = { id: string; customer_name: string; customer_email: string; customer_phone?: string; amount: number; items_count: number; items?: any[]; status: string; payment_method?: string; payment_status?: string; created_at: string; shipping_address?: any; };
type Customer = { id: number; email: string; full_name: string; phone?: string; created_at: string; };
type Category = { id: number; name: string; count?: number; image?: string; };
type Coupon = { id: number; code: string; type: string; value: number; times_used: number; max_uses?: number; min_order?: number; expires_at?: string; is_active: boolean; };
type Testimonial = { id: number; name: string; rating: number; text: string; product?: string; avatar?: string; };
type BlogPost = { id: number; title: string; excerpt?: string; content?: string; image?: string; category?: string; read_time?: string; author?: string; published: boolean; created_at: string; };

// ─── Helpers ──────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; cls: string }> = {
  delivered:  { label: 'Delivered',  cls: 'bg-emerald-50 text-emerald-700' },
  shipped:    { label: 'Shipped',    cls: 'bg-blue-50 text-blue-700' },
  processing: { label: 'Processing', cls: 'bg-amber-50 text-amber-700' },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-50 text-red-600' },
};

function Badge({ status }: { status: string }) {
  const c = STATUS_CFG[status] || STATUS_CFG.processing;
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${c.cls}`}>{c.label}</span>;
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-milk dark:bg-[#1a1918] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-sand sticky top-0 bg-milk dark:bg-[#1a1918] z-10">
          <h3 className="font-semibold text-ink text-[15px]">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-ink transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream"><X size={16} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

async function apiUpload(file: File, bucket = 'product-images'): Promise<string> {
  const fd = new FormData(); fd.append('file', file); fd.append('bucket', bucket);
  const r = await fetch('/api/upload', { method: 'POST', body: fd });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error);
  return d.url;
}

// ─── Sidebar ──────────────────────────────────────────────────────
const NAV = [
  { k: 'dashboard',    l: 'Dashboard',    I: LayoutDashboard },
  { k: 'orders',       l: 'Orders',       I: ShoppingBag },
  { k: 'products',     l: 'Products',     I: Package },
  { k: 'categories',   l: 'Categories',   I: Tag },
  { k: 'customers',    l: 'Customers',    I: Users },
  { k: 'testimonials', l: 'Testimonials', I: Star },
  { k: 'blog',         l: 'Blog',         I: FileText },
  { k: 'coupons',      l: 'Coupons',      I: Tag },
  { k: 'analytics',    l: 'Analytics',    I: BarChart3 },
  { k: 'settings',     l: 'Settings',     I: Settings },
];

function Sidebar({ active, go, col, setCol }: { active: string; go: (k: string) => void; col: boolean; setCol: (v: boolean) => void }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <aside className={`flex flex-col bg-[#111110] text-white h-screen sticky top-0 transition-all duration-300 ${col ? 'w-16' : 'w-60'} shrink-0 z-40`}>
      <div className={`flex items-center h-16 border-b border-white/8 px-4 ${col ? 'justify-center' : 'gap-3'}`}>
        {!col && <div><div className="font-display text-xl font-semibold tracking-[0.1em]">VINTIE</div><div className="text-[8px] tracking-[0.2em] uppercase text-white/35">Admin Panel</div></div>}
        <button onClick={() => setCol(!col)} className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"><Menu size={14} /></button>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        {NAV.map(({ k, l, I }) => (
          <button key={k} onClick={() => go(k)} title={col ? l : undefined}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all relative
              ${active === k ? 'bg-white/12 text-white' : 'text-white/45 hover:text-white hover:bg-white/6'}
              ${col ? 'justify-center' : ''}`}>
            {active === k && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r" />}
            <I size={16} />
            {!col && <span>{l}</span>}
          </button>
        ))}
      </nav>
      <div className={`border-t border-white/8 p-4 ${col ? 'flex justify-center' : 'flex items-center gap-3'}`}>
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 font-bold text-[12px] uppercase">{user?.full_name?.charAt(0) || 'A'}</div>
        {!col && <><div className="flex-1 min-w-0"><p className="text-[12px] font-medium truncate">{user?.full_name}</p><p className="text-[10px] text-white/40 truncate">{user?.email}</p></div>
        <button onClick={async () => { await logout(); router.push('/login'); }} className="text-white/40 hover:text-white transition-colors"><LogOut size={14} /></button></>}
      </div>
    </aside>
  );
}

// ─── Products Tab ──────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', price: '', original_price: '', category: '', badge: '', stock: '', description: '', image: '', sizes: 'XS,S,M,L,XL,XXL', colors: '', is_featured: false });

  const load = useCallback(async () => {
    setLoading(true);
    const [p, c] = await Promise.all([fetch('/api/products').then(r => r.json()), fetch('/api/categories').then(r => r.json())]);
    setProducts(Array.isArray(p) ? p : []);
    setCategories(Array.isArray(c) ? c : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', price: '', original_price: '', category: '', badge: '', stock: '', description: '', image: '', sizes: 'XS,S,M,L,XL,XXL', colors: '', is_featured: false });
    setImgFile(null); setImgPreview('');
    setModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, price: String(p.price), original_price: String(p.original_price || ''), category: p.category || '', badge: p.badge || '', stock: String(p.stock || ''), description: p.description || '', image: p.image || '', sizes: (p.sizes || []).join(','), colors: (p.colors || []).join(','), is_featured: p.is_featured || false });
    setImgPreview(p.image || '');
    setImgFile(null);
    setModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setImgFile(f); setImgPreview(URL.createObjectURL(f)); }
  };

  const save = async () => {
    setSaving(true);
    try {
      let imgUrl = form.image;
      if (imgFile) imgUrl = await apiUpload(imgFile, 'product-images');
      const body = {
        name: form.name, price: parseFloat(form.price), original_price: form.original_price ? parseFloat(form.original_price) : null,
        category: form.category, badge: form.badge || null, stock: parseInt(form.stock) || 0,
        description: form.description, image: imgUrl, sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
        colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
        is_featured: form.is_featured,
      };
      const url = editing ? `/api/products/${editing.id}` : '/api/products';
      const method = editing ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(false);
      load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-ink">Products</h2>
          <p className="text-[13px] text-muted">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="btn-primary py-2.5 px-5 text-[13px]"><Plus size={15} /> Add Product</button>
      </div>
      <div className="bg-cream border border-sand rounded-xl overflow-hidden">
        <div className="p-4 border-b border-sand flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" className="input-field pl-9 py-2 text-[13px]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="border-b border-sand text-left bg-sand/20">
              {['Product', 'Category', 'Price', 'Stock', 'Badge', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? [...Array(4)].map((_, i) => (
                <tr key={i}><td colSpan={6} className="px-5 py-3"><div className="h-8 bg-sand/40 rounded animate-pulse" /></td></tr>
              )) : filtered.map(p => (
                <tr key={p.id} className="border-b border-sand/50 hover:bg-sand/20 transition-colors last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-sand shrink-0">
                        {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <Package size={14} className="m-auto mt-3 text-muted" />}
                      </div>
                      <span className="font-medium text-ink truncate max-w-[160px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{p.category || '–'}</td>
                  <td className="px-5 py-3 font-semibold text-ink">₦{p.price?.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${(p.stock || 0) === 0 ? 'bg-red-50 text-red-600' : (p.stock || 0) < 5 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{p.stock ?? 0}</span>
                  </td>
                  <td className="px-5 py-3">{p.badge ? <span className={`badge ${p.badge === 'New' ? 'badge-new' : 'badge-sale'}`}>{p.badge}</span> : <span className="text-muted">–</span>}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-sand transition-colors text-muted hover:text-ink"><Pencil size={13} /></button>
                      <button onClick={() => del(p.id)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 transition-colors text-muted hover:text-red-600"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-muted">No products found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Product' : 'Add Product'}>
        <div className="space-y-4">
          {/* Image upload */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Product Image</label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-cream border border-sand flex-shrink-0 flex items-center justify-center">
                {imgPreview ? <img src={imgPreview} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-muted" />}
              </div>
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="prod-img" />
                <label htmlFor="prod-img" className="btn-outline py-2 px-4 text-[12px] cursor-pointer inline-flex items-center gap-2"><Upload size={13} /> Upload Image</label>
                <p className="text-[11px] text-muted mt-1">Or paste URL below</p>
                <input value={form.image} onChange={e => { setForm(f => ({ ...f, image: e.target.value })); setImgPreview(e.target.value); }} placeholder="https://..." className="input-field mt-2 text-[12px] py-2" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Premium Cotton T-Shirt" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Price (₦) *</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-field" placeholder="15000" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Original Price (₦)</label>
              <input type="number" value={form.original_price} onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))} className="input-field" placeholder="20000" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Category</label>
              <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field" list="cats-list" placeholder="T-Shirts" />
              <datalist id="cats-list">{categories.map(c => <option key={c.id} value={c.name} />)}</datalist>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} className="input-field" placeholder="50" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Badge</label>
              <select value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} className="input-field">
                <option value="">None</option><option>New</option><option>Sale</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Sizes (comma-separated)</label>
              <input value={form.sizes} onChange={e => setForm(f => ({ ...f, sizes: e.target.value }))} className="input-field" placeholder="XS,S,M,L,XL" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Colors (comma-separated hex)</label>
              <input value={form.colors} onChange={e => setForm(f => ({ ...f, colors: e.target.value }))} className="input-field" placeholder="#000000,#ffffff,#c0392b" />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input-field resize-none h-20" />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="accent-ink" />
                <span className="text-[13px] text-ink">Featured product (show on homepage)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.name || !form.price} className="btn-primary flex-1 justify-center disabled:opacity-50">
              {saving ? <><Loader2 className="animate-spin" size={15} /> Saving…</> : <><Save size={15} /> {editing ? 'Update Product' : 'Add Product'}</>}
            </button>
            <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Orders Tab ────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/orders');
    const d = await r.json();
    setOrders(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    load();
    if (selected?.id === id) setSelected(o => o ? { ...o, status } : null);
  };

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'all' || o.status === filter;
    const matchSearch = o.id.includes(search) || o.customer_name?.toLowerCase().includes(search.toLowerCase()) || o.customer_email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-[20px] font-bold text-ink">Orders</h2><p className="text-[13px] text-muted">{orders.length} total orders</p></div>
        <button onClick={load} className="btn-outline py-2 px-4 text-[13px]"><RefreshCw size={14} /> Refresh</button>
      </div>
      <div className="bg-cream border border-sand rounded-xl overflow-hidden">
        <div className="p-4 border-b border-sand flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…" className="input-field pl-9 py-2 text-[13px]" />
          </div>
          <div className="flex gap-1">
            {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize transition-all ${filter === f ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="border-b border-sand bg-sand/20">
              {['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? [...Array(4)].map((_, i) => <tr key={i}><td colSpan={7}><div className="h-8 bg-sand/40 rounded m-3 animate-pulse" /></td></tr>)
                : filtered.map(o => (
                  <tr key={o.id} className="border-b border-sand/50 hover:bg-sand/20 transition-colors last:border-0">
                    <td className="px-5 py-3 font-mono font-semibold text-ink text-[12px]">{o.id}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-ink">{o.customer_name}</p>
                      <p className="text-[11px] text-muted">{o.customer_email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{o.items_count}</td>
                    <td className="px-5 py-3 font-semibold text-ink">₦{o.amount?.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className="text-[11px] border border-sand rounded px-2 py-1 bg-milk text-ink focus:outline-none focus:border-ink cursor-pointer">
                        {['processing', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-muted text-[12px]">{new Date(o.created_at).toLocaleDateString('en-NG', { dateStyle: 'short' })}</td>
                    <td className="px-5 py-3">
                      <button onClick={() => setSelected(o)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-sand transition-colors text-muted hover:text-ink"><Eye size={13} /></button>
                    </td>
                  </tr>
                ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-muted">No orders found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Order ${selected?.id}`}>
        {selected && (
          <div className="space-y-5 text-[13px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cream rounded-xl p-4 border border-sand">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">Customer</p>
                <p className="font-medium text-ink">{selected.customer_name}</p>
                <p className="text-muted">{selected.customer_email}</p>
                {selected.customer_phone && <p className="text-muted">{selected.customer_phone}</p>}
              </div>
              <div className="bg-cream rounded-xl p-4 border border-sand">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">Delivery</p>
                {selected.shipping_address && Object.values(selected.shipping_address).filter(Boolean).map((v, i) => (
                  <p key={i} className="text-ink">{String(v)}</p>
                ))}
              </div>
            </div>
            {selected.items && (
              <div className="bg-cream rounded-xl p-4 border border-sand">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-3">Items ({selected.items_count})</p>
                <div className="space-y-2">
                  {selected.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />}
                        <span>{item.name} × {item.qty} <span className="text-muted text-[11px]">({item.size})</span></span>
                      </div>
                      <span className="font-medium">₦{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between font-bold text-ink pt-2 border-t border-sand">
              <span>Total</span><span>₦{selected.amount?.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted">Status:</span>
              <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} className="text-[12px] border border-sand rounded px-2 py-1 bg-milk text-ink focus:outline-none">
                {['processing', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── Categories Tab ────────────────────────────────────────────────
function CategoriesTab() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', image: '', count: '' });
  const [saving, setSaving] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/categories');
    const d = await r.json();
    setCats(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (c?: Category) => {
    setEditing(c || null);
    setForm({ name: c?.name || '', image: c?.image || '', count: String(c?.count || '') });
    setImgPreview(c?.image || ''); setImgFile(null);
    setModal(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      let img = form.image;
      if (imgFile) img = await apiUpload(imgFile, 'category-images');
      const body = { name: form.name, image: img, count: parseInt(form.count) || 0 };
      const url = editing ? `/api/categories/${editing.id}` : '/api/categories';
      const r = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(false); load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE' }); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-[20px] font-bold text-ink">Categories</h2><p className="text-[13px] text-muted">{cats.length} categories</p></div>
        <button onClick={() => open()} className="btn-primary py-2.5 px-5 text-[13px]"><Plus size={15} /> Add Category</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? [...Array(4)].map((_, i) => <div key={i} className="aspect-square bg-cream rounded-xl animate-pulse" />) : cats.map(c => (
          <div key={c.id} className="group relative rounded-xl overflow-hidden aspect-square bg-cream border border-sand">
            {c.image && <img src={c.image} alt="" className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent flex flex-col justify-end p-4">
              <p className="font-display text-lg font-medium text-milk">{c.name}</p>
              <p className="text-[11px] text-white/60">{c.count || 0} items</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => open(c)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-ink hover:bg-cream"><Pencil size={11} /></button>
              <button onClick={() => del(c.id)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-ink hover:bg-red-50 hover:text-red-600"><Trash2 size={11} /></button>
            </div>
          </div>
        ))}
        {!loading && cats.length === 0 && <div className="col-span-4 text-center py-16 text-muted">No categories yet</div>}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Category' : 'Add Category'}>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream border border-sand flex-shrink-0 flex items-center justify-center">
              {imgPreview ? <img src={imgPreview} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={18} className="text-muted" />}
            </div>
            <div className="flex-1">
              <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setImgFile(f); setImgPreview(URL.createObjectURL(f)); } }} className="hidden" id="cat-img" />
              <label htmlFor="cat-img" className="btn-outline py-1.5 px-3 text-[12px] cursor-pointer inline-flex items-center gap-2"><Upload size={12} /> Upload</label>
              <input value={form.image} onChange={e => { setForm(f => ({ ...f, image: e.target.value })); setImgPreview(e.target.value); }} placeholder="Or paste image URL…" className="input-field mt-2 text-[12px] py-2" />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="T-Shirts" />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Item Count</label>
            <input type="number" value={form.count} onChange={e => setForm(f => ({ ...f, count: e.target.value }))} className="input-field" placeholder="24" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.name} className="btn-primary flex-1 justify-center disabled:opacity-50">
              {saving ? <><Loader2 className="animate-spin" size={15} /> Saving…</> : <><Save size={15} /> {editing ? 'Update' : 'Add Category'}</>}
            </button>
            <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Coupons Tab ───────────────────────────────────────────────────
function CouponsTab() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percentage', value: '', min_order: '', max_uses: '', expires_at: '', is_active: true });

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/coupons');
    const d = await r.json();
    setCoupons(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch('/api/coupons', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: form.code.toUpperCase(), type: form.type, value: parseFloat(form.value), min_order: form.min_order ? parseFloat(form.min_order) : null, max_uses: form.max_uses ? parseInt(form.max_uses) : null, expires_at: form.expires_at || null, is_active: form.is_active }) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(false); setForm({ code: '', type: 'percentage', value: '', min_order: '', max_uses: '', expires_at: '', is_active: true });
      load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const toggle = async (c: Coupon) => {
    await fetch(`/api/coupons/${c.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !c.is_active }) });
    load();
  };

  const del = async (id: number) => {
    if (!confirm('Delete this coupon?')) return;
    await fetch(`/api/coupons/${id}`, { method: 'DELETE' }); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-[20px] font-bold text-ink">Promo Codes</h2><p className="text-[13px] text-muted">{coupons.length} coupons</p></div>
        <button onClick={() => setModal(true)} className="btn-primary py-2.5 px-5 text-[13px]"><Plus size={15} /> Add Coupon</button>
      </div>
      <div className="bg-cream border border-sand rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="border-b border-sand bg-sand/20">
              {['Code', 'Type', 'Value', 'Min Order', 'Used', 'Expires', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? [...Array(3)].map((_, i) => <tr key={i}><td colSpan={8}><div className="h-8 bg-sand/40 rounded m-3 animate-pulse" /></td></tr>)
                : coupons.map(c => (
                  <tr key={c.id} className="border-b border-sand/50 hover:bg-sand/20 last:border-0">
                    <td className="px-5 py-3 font-mono font-bold text-ink">{c.code}</td>
                    <td className="px-5 py-3 capitalize text-muted">{c.type}</td>
                    <td className="px-5 py-3 font-semibold text-ink">{c.type === 'percentage' ? `${c.value}%` : `₦${c.value?.toLocaleString()}`}</td>
                    <td className="px-5 py-3 text-muted">{c.min_order ? `₦${c.min_order?.toLocaleString()}` : '–'}</td>
                    <td className="px-5 py-3 text-muted">{c.times_used}{c.max_uses ? `/${c.max_uses}` : ''}</td>
                    <td className="px-5 py-3 text-muted text-[12px]">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : '–'}</td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggle(c)} className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${c.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone/30 text-muted'}`}>{c.is_active ? 'Active' : 'Inactive'}</button>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => del(c.id)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 transition-colors text-muted hover:text-red-600"><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              {!loading && coupons.length === 0 && <tr><td colSpan={8} className="px-5 py-12 text-center text-muted">No coupons yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title="Add Promo Code">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Code *</label>
              <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} className="input-field font-mono uppercase" placeholder="VINTIE10" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="input-field">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₦)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Value *</label>
              <input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} className="input-field" placeholder={form.type === 'percentage' ? '10' : '5000'} />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Min Order (₦)</label>
              <input type="number" value={form.min_order} onChange={e => setForm(f => ({ ...f, min_order: e.target.value }))} className="input-field" placeholder="0" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Max Uses</label>
              <input type="number" value={form.max_uses} onChange={e => setForm(f => ({ ...f, max_uses: e.target.value }))} className="input-field" placeholder="Unlimited" />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Expiry Date</label>
              <input type="date" value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))} className="input-field" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.code || !form.value} className="btn-primary flex-1 justify-center disabled:opacity-50">
              {saving ? <><Loader2 className="animate-spin" size={15} /> Saving…</> : <><Save size={15} /> Create Coupon</>}
            </button>
            <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Customers Tab ─────────────────────────────────────────────────
function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/customers').then(r => r.json()).then(d => setCustomers(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(c => c.full_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-[20px] font-bold text-ink">Customers</h2><p className="text-[13px] text-muted">{customers.length} registered customers</p></div>
      </div>
      <div className="bg-cream border border-sand rounded-xl overflow-hidden">
        <div className="p-4 border-b border-sand">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…" className="input-field pl-9 py-2 text-[13px]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="border-b border-sand bg-sand/20">
              {['Customer', 'Email', 'Phone', 'Joined'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {loading ? [...Array(4)].map((_, i) => <tr key={i}><td colSpan={4}><div className="h-8 bg-sand/40 rounded m-3 animate-pulse" /></td></tr>)
                : filtered.map(c => (
                  <tr key={c.id} className="border-b border-sand/50 hover:bg-sand/20 last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ink text-milk flex items-center justify-center text-[11px] font-bold uppercase shrink-0">{c.full_name?.charAt(0)}</div>
                        <span className="font-medium text-ink">{c.full_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted">{c.email}</td>
                    <td className="px-5 py-3 text-muted">{c.phone || '–'}</td>
                    <td className="px-5 py-3 text-muted text-[12px]">{new Date(c.created_at).toLocaleDateString('en-NG', { dateStyle: 'medium' })}</td>
                  </tr>
                ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-muted">No customers found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials Tab ──────────────────────────────────────────────
function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', rating: '5', text: '', product: '', avatar: '' });

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/testimonials');
    const d = await r.json();
    setItems(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (t?: Testimonial) => {
    setEditing(t || null);
    setForm({ name: t?.name || '', rating: String(t?.rating || 5), text: t?.text || '', product: t?.product || '', avatar: t?.avatar || '' });
    setModal(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const body = { name: form.name, rating: parseInt(form.rating), text: form.text, product: form.product || null, avatar: form.avatar || null };
      const r = await fetch(editing ? `/api/testimonials/${editing.id}` : '/api/testimonials', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(false); load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' }); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-[20px] font-bold text-ink">Testimonials</h2><p className="text-[13px] text-muted">{items.length} reviews</p></div>
        <button onClick={() => open()} className="btn-primary py-2.5 px-5 text-[13px]"><Plus size={15} /> Add Review</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="h-40 bg-cream rounded-xl animate-pulse" />) : items.map(t => (
          <div key={t.id} className="bg-cream border border-sand rounded-xl p-5 relative group">
            <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < t.rating ? 'text-gold fill-gold' : 'text-sand'} fill={i < t.rating ? 'currentColor' : 'none'} />)}</div>
            <p className="text-[13px] text-ink leading-relaxed mb-4 line-clamp-3">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-ink text-milk flex items-center justify-center text-[10px] font-bold">{t.name.charAt(0)}</div>
              <div><p className="text-[12px] font-medium text-ink">{t.name}</p>{t.product && <p className="text-[10px] text-muted">{t.product}</p>}</div>
            </div>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => open(t)} className="w-6 h-6 bg-white rounded flex items-center justify-center text-ink hover:bg-cream border border-sand"><Pencil size={10} /></button>
              <button onClick={() => del(t.id)} className="w-6 h-6 bg-white rounded flex items-center justify-center text-red-600 hover:bg-red-50 border border-sand"><Trash2 size={10} /></button>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && <div className="col-span-3 text-center py-16 text-muted">No testimonials yet</div>}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Review' : 'Add Review'}>
        <div className="space-y-4">
          <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Customer Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" /></div>
          <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Rating</label>
            <div className="flex gap-2">{[1,2,3,4,5].map(n => <button key={n} onClick={() => setForm(f => ({ ...f, rating: String(n) }))} className={`w-9 h-9 rounded-lg border font-semibold text-[13px] ${parseInt(form.rating) >= n ? 'bg-gold text-white border-gold' : 'border-sand text-muted'}`}>{n}</button>)}</div>
          </div>
          <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Review *</label><textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} className="input-field resize-none h-24" /></div>
          <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Product Name (optional)</label><input value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} className="input-field" placeholder="Premium T-Shirt" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.name || !form.text} className="btn-primary flex-1 justify-center disabled:opacity-50">{saving ? <><Loader2 className="animate-spin" size={15} /> Saving…</> : <><Save size={15} /> {editing ? 'Update' : 'Add'} Review</>}</button>
            <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Blog Tab ──────────────────────────────────────────────────────
function BlogTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState('');
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '', category: '', read_time: '', author: 'VINTIE Team', published: true });

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/blog_posts');
    const d = await r.json();
    setPosts(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (p?: BlogPost) => {
    setEditing(p || null);
    setForm({ title: p?.title || '', excerpt: p?.excerpt || '', content: p?.content || '', image: p?.image || '', category: p?.category || '', read_time: p?.read_time || '', author: p?.author || 'VINTIE Team', published: p?.published ?? true });
    setImgPreview(p?.image || ''); setImgFile(null);
    setModal(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      let img = form.image;
      if (imgFile) img = await apiUpload(imgFile, 'blog-images');
      const r = await fetch(editing ? `/api/blog_posts/${editing.id}` : '/api/blog_posts', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, image: img }) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(false); load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog_posts/${id}`, { method: 'DELETE' }); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-[20px] font-bold text-ink">Blog Posts</h2><p className="text-[13px] text-muted">{posts.length} posts</p></div>
        <button onClick={() => open()} className="btn-primary py-2.5 px-5 text-[13px]"><Plus size={15} /> New Post</button>
      </div>
      <div className="space-y-3">
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="h-20 bg-cream rounded-xl animate-pulse" />) : posts.map(p => (
          <div key={p.id} className="bg-cream border border-sand rounded-xl p-5 flex items-center gap-4 group">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-sand flex-shrink-0">
              {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-ink truncate">{p.title}</p>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${p.published ? 'bg-emerald-50 text-emerald-700' : 'bg-sand text-muted'}`}>{p.published ? 'Published' : 'Draft'}</span>
              </div>
              <p className="text-[12px] text-muted truncate">{p.excerpt}</p>
              <p className="text-[11px] text-muted mt-1">{p.author} · {p.read_time} · {p.category}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => open(p)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-sand text-muted hover:text-ink"><Pencil size={13} /></button>
              <button onClick={() => del(p.id)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-muted hover:text-red-600"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {!loading && posts.length === 0 && <div className="text-center py-16 text-muted">No blog posts yet</div>}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Post' : 'New Post'}>
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="w-20 h-14 rounded-lg overflow-hidden bg-cream border border-sand shrink-0">{imgPreview && <img src={imgPreview} alt="" className="w-full h-full object-cover" />}</div>
            <div className="flex-1">
              <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setImgFile(f); setImgPreview(URL.createObjectURL(f)); } }} className="hidden" id="blog-img" />
              <label htmlFor="blog-img" className="btn-outline py-1.5 px-3 text-[12px] cursor-pointer inline-flex items-center gap-2 mb-1"><Upload size={12} /> Upload</label>
              <input value={form.image} onChange={e => { setForm(f => ({ ...f, image: e.target.value })); setImgPreview(e.target.value); }} placeholder="Or paste image URL…" className="input-field text-[12px] py-2" />
            </div>
          </div>
          <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" /></div>
          <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Excerpt</label><textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} className="input-field resize-none h-16" /></div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Category</label><input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field" placeholder="Style" /></div>
            <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Read Time</label><input value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))} className="input-field" placeholder="3 min" /></div>
            <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Author</label><input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="input-field" /></div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="accent-ink" />
            <span className="text-[13px] text-ink">Published</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.title} className="btn-primary flex-1 justify-center disabled:opacity-50">{saving ? <><Loader2 className="animate-spin" size={15} /> Saving…</> : <><Save size={15} /> {editing ? 'Update' : 'Publish'} Post</>}</button>
            <button onClick={() => setModal(false)} className="btn-outline px-5">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Analytics Tab ─────────────────────────────────────────────────
function AnalyticsTab({ orders, products, customers }: { orders: Order[]; products: Product[]; customers: Customer[] }) {
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0);
  const byStatus = Object.entries(STATUS_CFG).map(([k, v]) => ({ label: v.label, count: orders.filter(o => o.status === k).length }));
  const lowStock = products.filter(p => (p.stock || 0) < 5);
  return (
    <div className="space-y-6">
      <h2 className="text-[20px] font-bold text-ink">Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', val: `₦${(revenue).toLocaleString()}`, cls: 'text-emerald-600' },
          { label: 'Avg Order Value', val: orders.length ? `₦${Math.round(revenue / orders.length).toLocaleString()}` : '–', cls: 'text-blue-600' },
          { label: 'Total Orders', val: String(orders.length), cls: 'text-amber-600' },
          { label: 'Customers', val: String(customers.length), cls: 'text-ink' },
        ].map(s => (
          <div key={s.label} className="bg-cream border border-sand rounded-xl p-5">
            <p className={`text-[24px] font-bold ${s.cls}`}>{s.val}</p>
            <p className="text-[12px] text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cream border border-sand rounded-xl p-5">
          <h3 className="font-semibold text-ink text-[14px] mb-4">Orders by Status</h3>
          <div className="space-y-3">
            {byStatus.map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-[12px] text-muted w-24">{s.label}</span>
                <div className="flex-1 h-2 bg-sand rounded-full overflow-hidden">
                  <div className="h-full bg-ink rounded-full transition-all" style={{ width: orders.length ? `${(s.count / orders.length) * 100}%` : '0%' }} />
                </div>
                <span className="text-[12px] font-semibold text-ink w-6 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-cream border border-sand rounded-xl p-5">
          <h3 className="font-semibold text-ink text-[14px] mb-4">Low Stock Alert {lowStock.length > 0 && <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-600 text-[10px] rounded-full">{lowStock.length} items</span>}</h3>
          {lowStock.length === 0 ? <p className="text-[13px] text-muted">All products well-stocked ✓</p> : (
            <div className="space-y-2">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between text-[12px]">
                  <span className="text-ink truncate">{p.name}</span>
                  <span className={`font-bold ${(p.stock || 0) === 0 ? 'text-red-600' : 'text-amber-600'}`}>{p.stock || 0} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Tab ──────────────────────────────────────────────────
function SettingsTab() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-[20px] font-bold text-ink">Settings</h2>
      <div className="bg-cream border border-sand rounded-xl p-6 space-y-5">
        <h3 className="font-semibold text-ink border-b border-sand pb-3">Store Information</h3>
        {[['Store Name', 'VINTIE'], ['Website', 'vintie.shop'], ['Instagram', '@vintie_ng'], ['WhatsApp', 'wa.me/OT2BFLRVDDAMF1'], ['Address', '3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos']].map(([l, v]) => (
          <div key={l}><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">{l}</label><input defaultValue={v} className="input-field" /></div>
        ))}
        <button className="btn-primary py-2.5 px-5 text-[13px]"><Save size={15} /> Save Changes</button>
      </div>
      <div className="bg-cream border border-sand rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-ink border-b border-sand pb-3">Appearance</h3>
        <div className="flex items-center justify-between">
          <div><p className="text-[14px] font-medium text-ink">Dark Mode</p><p className="text-[12px] text-muted">Toggle dark/light theme for the admin panel</p></div>
          <button onClick={toggleTheme} className={`w-12 h-6 rounded-full transition-all duration-300 flex items-center ${theme === 'dark' ? 'bg-ink justify-end' : 'bg-sand justify-start'}`}>
            <span className="w-5 h-5 rounded-full bg-white shadow mx-0.5 transition-all">{theme === 'dark' ? <Moon size={10} className="m-0.5 text-ink" /> : <Sun size={10} className="m-0.5 text-amber-500" />}</span>
          </button>
        </div>
      </div>
      <div className="bg-cream border border-sand rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-ink border-b border-sand pb-3">Quick Links</h3>
        <div className="grid grid-cols-2 gap-3">
          {[['View Storefront', '/'], ['View Instagram', 'https://www.instagram.com/vintie_ng'], ['WhatsApp Business', 'https://wa.me/message/OT2BFLRVDDAMF1'], ['Supabase Dashboard', 'https://supabase.com/dashboard']].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="btn-outline py-2.5 px-4 text-[12px] justify-center">{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Stats helper ────────────────────────────────────────
function DashboardView({ orders, products, customers }: { orders: Order[]; products: Product[]; customers: Customer[] }) {
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0);
  const stats = [
    { label: 'Total Revenue', value: `₦${(revenue / 1000).toFixed(0)}K`, icon: DollarSign, trend: '+12.5%', up: true, color: 'text-emerald-600' },
    { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingCart, trend: '+8.2%', up: true, color: 'text-blue-600' },
    { label: 'Products', value: products.length.toString(), icon: Package, trend: `${products.filter(p => (p.stock || 0) < 5).length} low`, up: false, color: 'text-amber-600' },
    { label: 'Customers', value: customers.length.toString(), icon: UserCheck, trend: '+3.1%', up: true, color: 'text-ink' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-cream border border-sand rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center"><s.icon size={18} className="text-ink" /></div>
              <span className={`flex items-center gap-1 text-[11px] font-medium ${s.up ? 'text-emerald-600' : 'text-amber-600'}`}>{s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{s.trend}</span>
            </div>
            <p className={`text-[26px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-cream border border-sand rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand">
          <h3 className="font-semibold text-ink text-[14px]">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="border-b border-sand bg-sand/20">{['Order', 'Customer', 'Amount', 'Status', 'Date'].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</th>)}</tr></thead>
            <tbody>
              {orders.slice(0, 6).map(o => (
                <tr key={o.id} className="border-b border-sand/50 hover:bg-sand/20 last:border-0">
                  <td className="px-5 py-3 font-mono text-[12px] font-semibold text-ink">{o.id}</td>
                  <td className="px-5 py-3 text-muted">{o.customer_name}</td>
                  <td className="px-5 py-3 font-semibold text-ink">₦{o.amount?.toLocaleString()}</td>
                  <td className="px-5 py-3"><Badge status={o.status} /></td>
                  <td className="px-5 py-3 text-muted text-[12px]">{new Date(o.created_at).toLocaleDateString('en-NG', { dateStyle: 'short' })}</td>
                </tr>
              ))}
              {orders.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-muted">No orders yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────
export default function AdminPage() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!loading && (!user || !user.is_admin)) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
      fetch('/api/customers').then(r => r.json()),
    ]).then(([o, p, c]) => {
      setOrders(Array.isArray(o) ? o : []);
      setProducts(Array.isArray(p) ? p : []);
      setCustomers(Array.isArray(c) ? c : []);
    }).catch(console.error).finally(() => setDataLoading(false));
  }, []);

  if (loading || !user) return (
    <div className="min-h-screen bg-[#111110] flex items-center justify-center">
      <div className="text-center text-white/40">
        <Loader2 size={32} className="animate-spin mx-auto mb-3" />
        <p className="text-[13px]">Loading admin…</p>
      </div>
    </div>
  );

  if (!user.is_admin) return null;

  const renderTab = () => {
    switch (active) {
      case 'dashboard': return <DashboardView orders={orders} products={products} customers={customers} />;
      case 'orders': return <OrdersTab />;
      case 'products': return <ProductsTab />;
      case 'categories': return <CategoriesTab />;
      case 'customers': return <CustomersTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'blog': return <BlogTab />;
      case 'coupons': return <CouponsTab />;
      case 'analytics': return <AnalyticsTab orders={orders} products={products} customers={customers} />;
      case 'settings': return <SettingsTab />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-milk overflow-hidden">
      <Sidebar active={active} go={setActive} col={collapsed} setCol={setCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-sand bg-milk flex items-center justify-between px-6 shrink-0">
          <div>
            <span className="text-[13px] font-semibold text-ink capitalize">{active}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors text-ink">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors text-ink relative">
              <Bell size={16} />
            </button>
            <a href="/" target="_blank" className="text-[12px] text-muted hover:text-ink transition-colors border border-sand rounded-lg px-3 py-1.5">View Store ↗</a>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {dataLoading && active === 'dashboard' ? (
            <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-muted" size={28} /></div>
          ) : renderTab()}
        </main>
      </div>
    </div>
  );
}
