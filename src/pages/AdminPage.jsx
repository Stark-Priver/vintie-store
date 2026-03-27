import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Package, Users, Tag, BarChart3,
  Settings, Bell, Search, TrendingUp, TrendingDown, ArrowRight,
  ArrowUpRight, MoreHorizontal, Eye, Pencil, Trash2, Plus,
  ChevronDown, X, CheckCircle, Clock, XCircle, Truck,
  DollarSign, ShoppingCart, UserCheck, Star, Menu, LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ── helpers ── */
const statusConfig = {
  delivered:  { label: 'Delivered',  cls: 'bg-emerald-50 text-emerald-700' },
  shipped:    { label: 'Shipped',    cls: 'bg-blue-50 text-blue-700' },
  processing: { label: 'Processing', cls: 'bg-amber-50 text-amber-700' },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-50 text-red-600' },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.processing;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

/* ── Sidebar ── */
const navItems = [
  { key: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { key: 'orders',    label: 'Orders',     icon: ShoppingBag,   badge: 3 },
  { key: 'products',  label: 'Products',   icon: Package },
  { key: 'categories', label: 'Categories', icon: Tag },
  { key: 'customers', label: 'Customers',  icon: Users },
  { key: 'testimonials', label: 'Testimonials', icon: Star },
  { key: 'blog',      label: 'Blog',       icon: Pencil },
  { key: 'coupons',   label: 'Coupons',    icon: Tag },
  { key: 'analytics', label: 'Analytics',  icon: BarChart3 },
  { key: 'settings',  label: 'Settings',   icon: Settings },
];

function AdminSidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside className={`flex flex-col bg-ink text-milk h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} shrink-0`}>
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-white/8 px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        {!collapsed && (
          <div>
            <div className="font-display text-xl font-semibold tracking-[0.1em]">VINTIE</div>
            <div className="text-[8px] tracking-[0.2em] uppercase text-white/35">Admin Panel</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <Menu size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ key, label, icon: Icon, badge }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all duration-200 relative
              ${active === key ? 'bg-white/12 text-milk' : 'text-white/45 hover:text-milk hover:bg-white/6'}
              ${collapsed ? 'justify-center' : ''}`}
          >
            {active === key && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r" />}
            <Icon size={16} />
            {!collapsed && <span>{label}</span>}
            {!collapsed && badge && (
              <span className="ml-auto bg-accent text-white w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold">{badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className={`border-t border-white/8 p-4 ${collapsed ? 'flex justify-center' : 'flex items-center gap-3'}`}>
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-semibold">A</span>
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium truncate">Admin User</p>
            <p className="text-[10px] text-white/35 truncate">admin@vintie.com</p>
          </div>
        )}
        {!collapsed && (
          <Link to="/" className="text-white/35 hover:text-white transition-colors"><LogOut size={14} /></Link>
        )}
      </div>
    </aside>
  );
}

/* ── DASHBOARD tab ── */
const stats = [
  { label: 'Total Revenue',  value: '₦4,829,500', change: '+12.5%', up: true,  icon: DollarSign,   color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Total Orders',   value: '1,204',   change: '+8.2%',  up: true,  icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
  { label: 'Customers',      value: '6,842',   change: '+5.1%',  up: true,  icon: UserCheck,    color: 'bg-violet-50 text-violet-600' },
  { label: 'Avg. Rating',    value: '4.7',     change: '+0.2',   up: true,  icon: Star,         color: 'bg-amber-50 text-amber-600' },
];

const chartBars = [
  { month: 'Oct', sales: 38 }, { month: 'Nov', sales: 52 }, { month: 'Dec', sales: 78 },
  { month: 'Jan', sales: 45 }, { month: 'Feb', sales: 61 }, { month: 'Mar', sales: 84 },
];

function DashboardTab() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statsData, setStatsData] = useState(stats);

  useEffect(() => {
    async function fetchDashboardData() {
      const { data: productsData } = await supabase.from('products').select('*').limit(5);
      const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);

      if (productsData) setProducts(productsData);
      if (ordersData) setOrders(ordersData);
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-7">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-sand/50">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={18} />
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {s.change}
              </span>
            </div>
            <p className="text-[24px] font-semibold text-ink tracking-tight">{s.value}</p>
            <p className="text-[12px] text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales chart */}
        <div className="xl:col-span-2 bg-white rounded-xl p-6 border border-sand/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[15px] text-ink">Revenue Overview</h3>
              <p className="text-[12px] text-muted">Last 6 months</p>
            </div>
            <select className="text-[12px] border border-sand rounded-lg px-3 py-1.5 outline-none bg-milk">
              <option>Monthly</option><option>Weekly</option>
            </select>
          </div>
          <div className="flex items-end gap-3 h-40">
            {chartBars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-ink/80 hover:bg-ink transition-colors cursor-pointer"
                  style={{ height: `${b.sales}%` }}
                  title={`₦${b.sales}k`}
                />
                <span className="text-[10px] text-muted">{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-xl p-6 border border-sand/50">
          <h3 className="font-semibold text-[15px] text-ink mb-5">Top Products</h3>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-[11px] text-muted w-4 shrink-0">#{i + 1}</span>
                <img src={p.image} className="w-9 h-11 rounded-lg object-cover shrink-0" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-ink truncate">{p.name}</p>
                  <p className="text-[10px] text-muted">${p.price}</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 shrink-0">
                  ${(p.price * Math.floor(Math.random() * 20 + 5)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-sand/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand/50">
          <h3 className="font-semibold text-[15px] text-ink">Recent Orders</h3>
          <button className="text-[12px] text-muted hover:text-ink flex items-center gap-1">
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-sand/40">
                {['Order ID','Customer','Amount','Items','Status','Date'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-sand/30 last:border-0 hover:bg-milk transition-colors">
                  <td className="px-6 py-3.5 font-medium text-ink">{o.id}</td>
                  <td className="px-6 py-3.5">
                    <div>
                      <p className="font-medium text-ink">{o.customer_name || o.customer_id}</p>
                      <p className="text-[11px] text-muted">{o.customer_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-semibold text-ink">${o.amount}</td>
                  <td className="px-6 py-3.5 text-muted">{o.items_count}</td>
                  <td className="px-6 py-3.5"><StatusBadge status={o.status} /></td>
                  <td className="px-6 py-3.5 text-muted">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── ORDERS tab ── */
function OrdersTab() {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) {
        setOrders(data);
        setFiltered(data);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFiltered(orders);
    } else {
      setFiltered(orders.filter(o => o.status === filter));
    }
  }, [filter, orders]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Orders</h2>
        <button className="btn-primary text-[12px] py-2 px-4">
          <Plus size={14} /> Export CSV
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-white border border-sand/50 rounded-xl p-1 w-fit">
        {['all','processing','shipped','delivered','cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[12px] font-medium capitalize transition-all ${filter === f ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}
          >{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-sand/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-milk border-b border-sand/40">
                {['Order ID','Customer','Email','Amount','Items','Status','Date',''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-b border-sand/30 last:border-0 hover:bg-milk/60 transition-colors">
                  <td className="px-5 py-4 font-semibold text-ink">{o.id}</td>
                  <td className="px-5 py-4 font-medium text-ink">{o.customer_name || o.customer_id}</td>
                  <td className="px-5 py-4 text-muted">{o.customer_email}</td>
                  <td className="px-5 py-4 font-semibold">${o.amount}</td>
                  <td className="px-5 py-4 text-muted">{o.items_count}</td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 text-muted">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <button className="text-muted hover:text-ink transition-colors"><MoreHorizontal size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── PRODUCTS tab ── */
function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) {
      setProducts(data);
      setFiltered(data);
    }
  }

  useEffect(() => {
    setFiltered(
      products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, products]);

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Products</h2>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="btn-primary text-[12px] py-2 px-4"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSave={() => { setShowModal(false); fetchProducts(); }}
        />
      )}

      {/* Search */}
      <div className="flex items-center gap-3 bg-white border border-sand/50 rounded-xl px-4 py-2.5 max-w-sm">
        <Search size={15} className="text-muted" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products…"
          className="flex-1 bg-transparent outline-none text-[13px] text-ink placeholder:text-muted"
        />
        {search && <button onClick={() => setSearch('')}><X size={14} className="text-muted" /></button>}
      </div>

      <div className="bg-white rounded-xl border border-sand/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-milk border-b border-sand/40">
                {['Product','Category','Price','Stock','Rating','Status',''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-sand/30 last:border-0 hover:bg-milk/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-10 h-12 rounded-lg object-cover shrink-0" alt="" />
                      <div>
                        <p className="font-medium text-ink leading-tight">{p.name}</p>
                        {p.badge && <span className={`text-[9px] font-bold uppercase tracking-wider ${p.badge === 'Sale' ? 'text-accent' : 'text-blue-600'}`}>{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{p.category}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-ink">${p.price}</span>
                    {p.originalPrice && <span className="text-muted line-through text-[11px] ml-1">${p.originalPrice}</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold ${p.stock < 10 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-[12px] font-medium">{p.rating}</span>
                      <span className="text-[10px] text-muted">({p.reviews})</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                      {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all">
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => { setEditingProduct(p); setShowModal(true); }}
                        className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── CUSTOMERS tab ── */
const customers = [
  { name: "Sarah Mitchell", email: "sarah@example.com", orders: 8,  spent: 1204, joined: "Jan 2024", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80" },
  { name: "James Kofi",     email: "james@example.com", orders: 5,  spent: 875,  joined: "Mar 2024", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" },
  { name: "Amara Osei",     email: "amara@example.com", orders: 12, spent: 2318, joined: "Nov 2023", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
  { name: "Chen Wei",       email: "chen@example.com",  orders: 3,  spent: 318,  joined: "Feb 2025", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80" },
  { name: "Fatima Al-R.",   email: "fatima@example.com",orders: 6,  spent: 940,  joined: "Sep 2024", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
];

function CustomersTab() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await supabase.from('customers').select('*').order('joined_at', { ascending: false });
      if (data) setCustomers(data);
      setLoading(false);
    }
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Customers</h2>
        <span className="text-[13px] text-muted">{customers.length} total</span>
      </div>
      <div className="bg-white rounded-xl border border-sand/50 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-milk border-b border-sand/40">
              {['Customer','Orders','Total Spent','Joined',''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-b border-sand/30 last:border-0 hover:bg-milk/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-muted font-bold">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-ink">{c.name}</p>
                      <p className="text-[11px] text-muted">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted">-</td>
                <td className="px-5 py-4 font-semibold text-ink">₦0</td>
                <td className="px-5 py-4 text-muted">{new Date(c.joined_at).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <button className="text-[11px] text-muted hover:text-ink border border-sand rounded-lg px-3 py-1 hover:border-ink transition-all">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── ANALYTICS tab ── */
function AnalyticsTab() {
  const channelData = [
    { name: 'Direct', value: 38, color: '#111110' },
    { name: 'Social Media', value: 27, color: '#c8c4bc' },
    { name: 'Email', value: 20, color: '#8a867e' },
    { name: 'Referral', value: 15, color: '#e8e4dc' },
  ];
  const monthlyData = [28,35,41,38,52,48,61,55,70,68,78,84];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const maxVal = Math.max(...monthlyData);

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-ink">Analytics</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ['Conversion Rate','3.42%','+0.4%'],
          ['Avg Order Value','₦87.50','+₦5.20'],
          ['Return Rate','6.8%','-1.2%'],
          ['Cart Abandonment','61%','-3%'],
        ].map(([label, val, change]) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-sand/50">
            <p className="text-[11px] text-muted uppercase tracking-wider mb-2">{label}</p>
            <p className="text-[26px] font-semibold text-ink">{val}</p>
            <p className="text-[11px] text-emerald-600 mt-1">{change} vs last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-sand/50">
          <h3 className="font-semibold text-[15px] text-ink mb-6">Monthly Revenue 2025</h3>
          <div className="flex items-end gap-2 h-44">
            {monthlyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md bg-ink/75 hover:bg-ink transition-colors"
                  style={{ height: `${(val / maxVal) * 100}%` }}
                />
                <span className="text-[9px] text-muted">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-xl p-6 border border-sand/50">
          <h3 className="font-semibold text-[15px] text-ink mb-5">Traffic Sources</h3>
          <div className="space-y-4">
            {channelData.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-muted">{c.name}</span>
                  <span className="font-semibold text-ink">{c.value}%</span>
                </div>
                <div className="h-2 bg-sand/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.value}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category performance */}
      <div className="bg-white rounded-xl p-6 border border-sand/50">
        <h3 className="font-semibold text-[15px] text-ink mb-5">Category Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: 'Set Collection', revenue: 18420, orders: 210, growth: '+14%' },
            { name: 'T-Shirt',        revenue: 12380, orders: 427, growth: '+8%' },
            { name: 'Hoodie Outfit',  revenue: 14950, orders: 176, growth: '+21%' },
          ].map(cat => (
            <div key={cat.name} className="bg-milk rounded-xl p-5">
              <p className="font-semibold text-[14px] text-ink mb-3">{cat.name}</p>
              <div className="flex justify-between text-[12px] text-muted mb-1">
                <span>Revenue</span><span className="font-semibold text-ink">${cat.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[12px] text-muted mb-3">
                <span>Orders</span><span className="font-semibold text-ink">{cat.orders}</span>
              </div>
              <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">{cat.growth} this month</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SETTINGS tab ── */
function SettingsTab() {
  return (
    <div className="space-y-5 max-w-2xl">
      <h2 className="text-[18px] font-semibold text-ink">Settings</h2>
      {[
        { title: 'Store Information', fields: [['Store Name','VINTIE'],['Store Email','hello@vintie.com'],['Currency','USD'],['Timezone','UTC-5 (EST)']] },
        { title: 'Notifications', fields: [] },
        { title: 'Shipping', fields: [['Free Shipping Threshold','₦150'],['Default Carrier','FedEx']] },
      ].map(section => (
        <div key={section.title} className="bg-white rounded-xl p-6 border border-sand/50">
          <h3 className="font-semibold text-[14px] text-ink mb-5 pb-3 border-b border-sand/50">{section.title}</h3>
          {section.fields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map(([label, val]) => (
                <div key={label}>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">{label}</label>
                  <input defaultValue={val} className="w-full bg-milk border border-sand rounded-lg px-3 py-2.5 text-[13px] text-ink outline-none focus:border-ink transition-colors" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {['New order placed','Low stock alert','Customer review submitted','Refund request'].map(n => (
                <label key={n} className="flex items-center justify-between cursor-pointer">
                  <span className="text-[13px] text-muted">{n}</span>
                  <div className="relative">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-sand peer-checked:bg-ink rounded-full transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                  </div>
                </label>
              ))}
            </div>
          )}
          <button className="btn-primary text-[12px] py-2 px-5 mt-5">Save Changes</button>
        </div>
      ))}
    </div>
  );
}

/* ── MAIN AdminPage ── */
export default function AdminPage() {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const tabs = {
    dashboard: <DashboardTab />,
    orders:    <OrdersTab />,
    products:  <ProductsTab />,
    customers: <CustomersTab />,
    analytics: <AnalyticsTab />,
    settings:  <SettingsTab />,
    coupons:   <CouponsTab />,
    categories: <CategoriesTab />,
    testimonials: <TestimonialsTab />,
    blog: <BlogTab />,
  };

  return (
    <div className="flex min-h-screen bg-milk font-body">
      <AdminSidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-16 bg-white border-b border-sand/50 flex items-center gap-4 px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2 flex-1 max-w-xs bg-milk border border-sand rounded-xl px-3 py-2">
            <Search size={14} className="text-muted" />
            <input placeholder="Quick search…" className="flex-1 bg-transparent outline-none text-[13px] text-ink placeholder:text-muted" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-milk transition-colors text-muted hover:text-ink">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
            <Link to="/" className="text-[12px] text-muted hover:text-ink border border-sand rounded-xl px-3 py-1.5 flex items-center gap-1.5 transition-colors">
              <ArrowUpRight size={13} /> View Store
            </Link>
            <div className="w-8 h-8 rounded-xl bg-ink text-milk flex items-center justify-center text-[12px] font-semibold">A</div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[12px] text-muted mb-6">
            <span className="hover:text-ink cursor-pointer" onClick={() => setActive('dashboard')}>Admin</span>
            <ChevronDown size={11} className="-rotate-90" />
            <span className="text-ink capitalize font-medium">{active}</span>
          </div>

          {tabs[active] || <DashboardTab />}
        </div>
      </div>
    </div>
  );
}

/* ── COUPONS tab ── */
function CouponsTab() {
  const coupons = [
    { code: 'VINTIE10', type: 'Percentage', value: '10%', used: 142, expires: '2025-06-30', active: true },
    { code: 'WELCOME20', type: 'Percentage', value: '20%', used: 89, expires: '2025-12-31', active: true },
    { code: 'FREESHIP', type: 'Free Shipping', value: '—', used: 310, expires: '2025-04-30', active: true },
    { code: 'FLASH50',  type: 'Percentage', value: '50%', used: 55, expires: '2025-03-15', active: false },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Coupons</h2>
        <button className="btn-primary text-[12px] py-2 px-4"><Plus size={14} /> Create Coupon</button>
      </div>
      <div className="bg-white rounded-xl border border-sand/50 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-milk border-b border-sand/40">
              {['Code','Type','Value','Times Used','Expires','Status',''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.code} className="border-b border-sand/30 last:border-0 hover:bg-milk/60 transition-colors">
                <td className="px-5 py-4 font-mono font-bold text-ink text-[12px]">{c.code}</td>
                <td className="px-5 py-4 text-muted">{c.type}</td>
                <td className="px-5 py-4 font-semibold text-ink">{c.value}</td>
                <td className="px-5 py-4 text-muted">{c.used}</td>
                <td className="px-5 py-4 text-muted">{c.expires}</td>
                <td className="px-5 py-4">
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${c.active ? 'bg-emerald-50 text-emerald-700' : 'bg-sand text-muted'}`}>
                    {c.active ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted hover:text-ink transition-all"><Pencil size={12} /></button>
                    <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted hover:text-accent transition-all"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(product || {
    name: '',
    price: '',
    original_price: '',
    category: 'Set Collection',
    stock: '',
    image: '',
    badge: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      stock: parseInt(formData.stock),
    };

    let error;
    if (product && product.id) {
      const { error: err } = await supabase.from('products').update(payload).eq('id', product.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('products').insert([payload]);
      error = err;
    }

    if (!error) {
      onSave();
    } else {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-sand/50 flex items-center justify-between bg-milk">
          <h3 className="font-semibold text-ink">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-sand rounded-lg transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-[11px] font-semibold uppercase text-muted block mb-1">Product Name</label>
              <input
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-milk border border-sand rounded-lg px-3 py-2 text-[13px] outline-none focus:border-ink"
                placeholder="e.g. Wool Cardigan"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase text-muted block mb-1">Price (₦)</label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-milk border border-sand rounded-lg px-3 py-2 text-[13px] outline-none focus:border-ink"
                placeholder="89"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase text-muted block mb-1">Original Price (₦)</label>
              <input
                type="number"
                value={formData.original_price}
                onChange={e => setFormData({ ...formData, original_price: e.target.value })}
                className="w-full bg-milk border border-sand rounded-lg px-3 py-2 text-[13px] outline-none focus:border-ink"
                placeholder="120"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase text-muted block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-milk border border-sand rounded-lg px-3 py-2 text-[13px] outline-none focus:border-ink"
              >
                <option>Set Collection</option>
                <option>T-Shirt</option>
                <option>Hoodie Outfit</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase text-muted block mb-1">Stock</label>
              <input
                required
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-milk border border-sand rounded-lg px-3 py-2 text-[13px] outline-none focus:border-ink"
                placeholder="15"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[11px] font-semibold uppercase text-muted block mb-1">Image URL</label>
              <div className="flex gap-2">
                <input
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 bg-milk border border-sand rounded-lg px-3 py-2 text-[13px] outline-none focus:border-ink"
                  placeholder="https://images.unsplash.com/..."
                />
                {formData.image && <img src={formData.image} className="w-9 h-9 rounded object-cover border border-sand" alt="" />}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-sand/50">
            <button type="button" onClick={onClose} className="btn-outline flex-1 py-2.5">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5">
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CategoriesTab() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
      if (data) setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Categories</h2>
        <button className="btn-primary text-[12px] py-2 px-4"><Plus size={14} /> Add Category</button>
      </div>
      <div className="bg-white rounded-xl border border-sand/50 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-milk border-b border-sand/40">
              {['Image', 'Name', 'Products Count', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-sand/30 last:border-0">
                <td className="px-5 py-3">
                  <img src={c.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                </td>
                <td className="px-5 py-3 font-medium text-ink">{c.name}</td>
                <td className="px-5 py-3 text-muted">{c.count} items</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted"><Pencil size={12} /></button>
                    <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Testimonials</h2>
        <button className="btn-primary text-[12px] py-2 px-4"><Plus size={14} /> Add Testimonial</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white p-5 rounded-xl border border-sand/50 space-y-3">
            <div className="flex items-center gap-3">
              <img src={t.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
              <div>
                <p className="font-medium text-ink text-[13px]">{t.name}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < t.rating ? 'text-gold fill-gold' : 'text-sand'} />)}
                </div>
              </div>
            </div>
            <p className="text-[12px] text-muted italic">"{t.text}"</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-sand/30">
              <button className="text-muted hover:text-ink transition-colors"><Pencil size={14}/></button>
              <button className="text-muted hover:text-accent transition-colors"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogTab() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (data) setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-ink">Blog Posts</h2>
        <button className="btn-primary text-[12px] py-2 px-4"><Plus size={14} /> Add Post</button>
      </div>
      <div className="bg-white rounded-xl border border-sand/50 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-milk border-b border-sand/40">
              {['Post', 'Category', 'Date', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-b border-sand/30 last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-12 h-12 rounded object-cover" alt="" />
                    <span className="font-medium text-ink">{p.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted">{p.category}</td>
                <td className="px-5 py-3 text-muted">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted"><Pencil size={12} /></button>
                    <button className="w-7 h-7 rounded-lg border border-sand flex items-center justify-center text-muted"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
