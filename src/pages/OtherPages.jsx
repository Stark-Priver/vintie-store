import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Mail, Send, ChevronDown, Heart, ShoppingBag, User, Package, LogOut, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ui/ProductCard';

/* ─── ABOUT ───────────────────────────────────────────────── */
export function AboutPage() {
  const team = [
    { name: "Amara Osei", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80" },
    { name: "James Kofi", role: "Head of Design", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80" },
    { name: "Priya Sharma", role: "Brand Strategist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
    { name: "Lucas Ferreira", role: "Production Lead", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&q=80" },
  ];

  return (
    <div className="bg-milk min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" alt="" className="w-full h-full object-cover brightness-50"/>
        <div className="absolute inset-0 flex items-center justify-center text-center text-milk px-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 block mb-3">Our Story</span>
            <h1 className="font-display text-6xl font-medium mb-4">Built on Passion,<br/><em className="font-light">Refined by Craft</em></h1>
            <p className="text-[14px] text-white/55 max-w-lg mx-auto leading-relaxed">
              VINTIE was born from a belief that great style should be accessible, sustainable, and genuinely personal.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-4">Our Mission</span>
              <h2 className="font-display text-5xl font-medium leading-tight text-ink mb-6">Fashion that Feels as Good as it Looks</h2>
              <p className="text-[14px] text-muted leading-relaxed mb-4">We source only the finest materials, partner with ethical manufacturers, and design collections that endure beyond trends. VINTIE is a commitment to quality over quantity.</p>
              <p className="text-[14px] text-muted leading-relaxed mb-8">From our first stitch to your wardrobe, every step is intentional, every detail considered.</p>
              <Link to="/shop" className="btn-primary">Shop the Collection <ArrowRight size={15}/></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=80" className="rounded-xl3 w-full aspect-square object-cover mt-8"/>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" className="rounded-xl3 w-full aspect-square object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-ink text-milk">
        <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['25M+','Happy Customers'],['150+','Premium Products'],['50+','Countries Shipped'],['100%','Ethical Sourcing']].map(([num,label]) => (
            <div key={label}>
              <div className="font-display text-5xl font-medium mb-1">{num}</div>
              <div className="text-[12px] text-white/45 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-1">Meet the Team</h2>
            <p className="section-sub">The people behind VINTIE</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-full aspect-square rounded-xl3 overflow-hidden img-zoom mb-4">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover"/>
                </div>
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

/* ─── WISHLIST ───────────────────────────────────────────── */
export function WishlistPage() {
  const { wishlist, toggleWishlist } = useCart();
  const [wishedProducts, setWishedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishedProducts() {
      if (wishlist.length === 0) {
        setWishedProducts([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase.from('products').select('*').in('id', wishlist);
      if (data) setWishedProducts(data);
      setLoading(false);
    }
    fetchWishedProducts();
  }, [wishlist]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milk">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ink"></div>
      </div>
    );
  }

  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand/60">
        <div className="section-container py-10">
          <h1 className="font-display text-4xl font-medium text-ink">Wishlist</h1>
          <p className="text-sm text-muted mt-1">{wishedProducts.length} saved items</p>
        </div>
      </div>
      <div className="section-container py-12">
        {wishedProducts.length === 0 ? (
          <div className="text-center py-24 text-muted">
            <Heart size={52} strokeWidth={1} className="mx-auto mb-4"/>
            <p className="font-display text-2xl font-medium text-ink mb-2">Your wishlist is empty</p>
            <p className="text-[14px] mb-8">Save items you love and come back to them later.</p>
            <Link to="/shop" className="btn-primary">Start Shopping <ArrowRight size={15}/></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishedProducts.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ACCOUNT ────────────────────────────────────────────── */
export function AccountPage() {
  const [tab, setTab] = useState('orders');
  const tabs = [['orders','Orders',Package],['profile','Profile',User],['wishlist','Wishlist',Heart]];
  const [orders, setOrders] = useState([]);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [user, setUser] = useState(null);
  const { wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: ordersData } = await supabase.from('orders').select('*').eq('customer_email', user.email);
        if (ordersData) setOrders(ordersData);
      }

      if (wishlist.length > 0) {
        const { data: wishedData } = await supabase.from('products').select('*').in('id', wishlist);
        if (wishedData) setWishedProducts(wishedData);
      } else {
        setWishedProducts([]);
      }
    }
    fetchData();
  }, [wishlist]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand/60">
        <div className="section-container py-10">
          <h1 className="font-display text-4xl font-medium text-ink">My Account</h1>
        </div>
      </div>
      <div className="section-container py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col gap-1 w-52 shrink-0">
            <div className="bg-cream rounded-xl3 p-5 mb-4 text-center">
              <div className="w-16 h-16 rounded-full bg-sand mx-auto flex items-center justify-center mb-3 text-ink font-bold text-xl uppercase">
                {user?.email?.charAt(0) || <User size={24} className="text-muted"/>}
              </div>
              <p className="font-semibold text-ink text-[14px] truncate">{user?.user_metadata?.full_name || 'Account Owner'}</p>
              <p className="text-[11px] text-muted truncate">{user?.email}</p>
            </div>
            {tabs.map(([key, label, Icon]) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${tab === key ? 'bg-ink text-milk' : 'text-muted hover:text-ink hover:bg-cream'}`}
              >
                <Icon size={15}/>{label}
              </button>
            ))}
            <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] text-accent hover:bg-red-50 transition-colors mt-4">
              <LogOut size={15}/> Sign Out
            </button>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {tab === 'orders' && (
              <div>
                <h2 className="font-semibold text-[16px] text-ink mb-5">Order History</h2>
                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="text-center py-10 text-muted">No orders found</div>
                  ) : (
                    orders.map(o => (
                      <div key={o.id} className="bg-cream rounded-xl p-5 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[14px] text-ink">{o.id}</p>
                          <p className="text-[12px] text-muted mt-0.5">{new Date(o.created_at).toLocaleDateString()} · {o.items_count} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-ink">₦{o.amount}</p>
                          <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{o.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {tab === 'profile' && (
              <div>
                <h2 className="font-semibold text-[16px] text-ink mb-5">Profile Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-muted block mb-1">Full Name</label>
                    <input defaultValue={user?.user_metadata?.full_name} className="input-field" disabled/>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-muted block mb-1">Email</label>
                    <input defaultValue={user?.email} className="input-field" disabled/>
                  </div>
                </div>
                <p className="text-[12px] text-muted mt-4">To update your profile or change your password, please contact support.</p>
              </div>
            )}
            {tab === 'wishlist' && (
              <div>
                <h2 className="font-semibold text-[16px] text-ink mb-5">Saved Items ({wishedProducts.length})</h2>
                {wishedProducts.length === 0 ? (
                  <div className="text-center py-12 text-muted"><Heart size={40} strokeWidth={1} className="mx-auto mb-3"/><p>No saved items yet</p></div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishedProducts.map(p => <ProductCard key={p.id} product={p}/>)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CHECKOUT ───────────────────────────────────────────── */
export function CheckoutPage() {
  const { items, total, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    city: ''
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const fullName = user.user_metadata?.full_name || '';
        const [first, ...rest] = fullName.split(' ');
        setFormData(prev => ({
          ...prev,
          firstName: first || '',
          lastName: rest.join(' ') || '',
          email: user.email || ''
        }));
      }
    });
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // 1. Find or Create Customer
      let customerId;
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (customerData) {
        customerId = customerData.id;
      } else {
        const { data: newCustomer } = await supabase
          .from('customers')
          .insert([{ name: `${formData.firstName} ${formData.lastName}`, email: formData.email }])
          .select()
          .single();
        if (newCustomer) customerId = newCustomer.id;
      }

      // 2. Create Order
      const orderId = `#VT-${Math.floor(1000 + Math.random() * 9000)}`;
      const { error } = await supabase.from('orders').insert([{
        id: orderId,
        customer_id: customerId,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        amount: parseFloat((total * 1.08).toFixed(2)),
        items_count: items.reduce((acc, item) => acc + item.qty, 0),
        items: items,
        shipping_address: {
          address: formData.address,
          state: formData.state,
          city: formData.city
        }
      }]);

      if (!error) {
        setOrderComplete(true);
        dispatch({ type: 'CLEAR_CART' });
      } else {
        alert('Error placing order: ' + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="bg-milk min-h-screen flex items-center justify-center p-6">
        <div className="bg-cream p-12 rounded-xl3 text-center max-w-md shadow-xl">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} />
          </div>
          <h1 className="font-display text-4xl font-medium text-ink mb-4">Order Confirmed!</h1>
          <p className="text-muted text-[15px] mb-8 leading-relaxed">
            Thank you for your purchase. We've received your order and we'll notify you as soon as it ships.
          </p>
          <Link to="/shop" className="btn-primary w-full justify-center">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-milk min-h-screen">
      <div className="section-container py-12">
        <h1 className="font-display text-4xl font-medium text-ink mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {['Shipping','Payment','Review'].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-ink' : 'text-muted'}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${i + 1 <= step ? 'bg-ink text-milk' : 'bg-sand text-muted'}`}>{i+1}</span>
                <span className="text-[13px] font-medium hidden sm:block">{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px max-w-[60px] ${i + 1 < step ? 'bg-ink' : 'bg-sand'}`}/>}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* Form */}
          <div className="bg-cream rounded-xl3 p-8">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-[16px] text-ink mb-5">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">First Name</label>
                    <input
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="input-field"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Last Name</label>
                    <input
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="input-field"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Address</label>
                  <input
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="input-field"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">State</label>
                    <select
                      required
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select State</option>
                      <option value="Abia">Abia</option>
                      <option value="Adamawa">Adamawa</option>
                      <option value="Akwa Ibom">Akwa Ibom</option>
                      <option value="Anambra">Anambra</option>
                      <option value="Bauchi">Bauchi</option>
                      <option value="Bayelsa">Bayelsa</option>
                      <option value="Benue">Benue</option>
                      <option value="Borno">Borno</option>
                      <option value="Cross River">Cross River</option>
                      <option value="Delta">Delta</option>
                      <option value="Ebonyi">Ebonyi</option>
                      <option value="Edo">Edo</option>
                      <option value="Ekiti">Ekiti</option>
                      <option value="Enugu">Enugu</option>
                      <option value="FCT">Federal Capital Territory</option>
                      <option value="Gombe">Gombe</option>
                      <option value="Imo">Imo</option>
                      <option value="Jigawa">Jigawa</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Kano">Kano</option>
                      <option value="Katsina">Katsina</option>
                      <option value="Kebbi">Kebbi</option>
                      <option value="Kogi">Kogi</option>
                      <option value="Kwara">Kwara</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Nasarawa">Nasarawa</option>
                      <option value="Niger">Niger</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Ondo">Ondo</option>
                      <option value="Osun">Osun</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Plateau">Plateau</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Sokoto">Sokoto</option>
                      <option value="Taraba">Taraba</option>
                      <option value="Yobe">Yobe</option>
                      <option value="Zamfara">Zamfara</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">City</label>
                    <input
                      required
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="input-field"
                      placeholder="Lagos"
                    />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-2">Continue to Payment <ArrowRight size={15}/></button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-[16px] text-ink mb-5">Payment Details</h2>
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Card Number</label><input className="input-field" placeholder="4242 4242 4242 4242"/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Expiry</label><input className="input-field" placeholder="MM / YY"/></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">CVV</label><input className="input-field" placeholder="···"/></div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary">Review Order <ArrowRight size={15}/></button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="font-semibold text-[16px] text-ink mb-5">Review & Confirm</h2>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                      <img src={item.image} className="w-12 h-14 rounded-lg object-cover"/>
                      <div className="flex-1">
                        <p className="text-[13px] font-medium">{item.name}</p>
                        <p className="text-[11px] text-muted">Size {item.size} · Qty {item.qty}</p>
                      </div>
                      <span className="font-semibold text-[13px]">₦{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline">Back</button>
                  <button
                    disabled={loading || items.length === 0}
                    onClick={handlePlaceOrder}
                    className="btn-primary flex-1 justify-center"
                  >
                    {loading ? 'Processing...' : 'Place Order'} <ArrowRight size={15}/>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-cream rounded-xl3 p-6 h-fit sticky top-36">
            <h3 className="font-semibold text-[15px] text-ink mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4 text-[13px] text-muted">
              <div className="flex justify-between"><span>Subtotal ({items.length} items)</span><span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-emerald-600">Free</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₦{(total * 0.08).toLocaleString()}</span></div>
            </div>
            <div className="flex justify-between font-semibold text-[15px] text-ink pt-4 border-t border-sand">
              <span>Total</span>
              <span>₦{(total * 1.08).toLocaleString()}</span>
            </div>
            <div className="mt-4 border border-sand rounded-lg flex overflow-hidden">
              <input placeholder="Promo code" className="flex-1 bg-transparent px-3 py-2.5 text-[12px] outline-none"/>
              <button className="px-4 text-[12px] font-medium text-ink hover:bg-sand transition-colors">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */
export function FAQPage() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What is your return policy?", a: "We offer free returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging." },
    { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout for a small fee." },
    { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7–14 business days." },
    { q: "How do I find the right size?", a: "Each product page includes a detailed size guide. We recommend measuring yourself and comparing with our charts for the best fit." },
    { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After this window, changes may not be possible as orders are processed quickly." },
    { q: "Are your products ethically made?", a: "Absolutely. We partner only with manufacturers who meet our strict ethical and environmental standards. Sustainability is core to our brand." },
    { q: "How do I track my order?", a: "Once your order ships, you'll receive a confirmation email with a tracking link. You can also track your order in your account dashboard." },
  ];

  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand/60 py-16">
        <div className="section-container text-center">
          <h1 className="font-display text-5xl font-medium text-ink mb-2">Frequently Asked</h1>
          <p className="text-muted text-[14px]">Everything you need to know about VINTIE</p>
        </div>
      </div>
      <div className="section-container py-16 max-w-3xl mx-auto">
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-cream rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="font-medium text-[14px] text-ink">{faq.q}</span>
                <ChevronDown size={16} className={`text-muted transition-transform duration-200 shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`}/>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[13.5px] text-muted leading-relaxed border-t border-sand/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
export function ContactPage() {
  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand/60 py-16">
        <div className="section-container text-center">
          <h1 className="font-display text-5xl font-medium text-ink mb-2">Get in Touch</h1>
          <p className="text-muted text-[14px]">We'd love to hear from you</p>
        </div>
      </div>
      <div className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl font-medium text-ink mb-6">Contact Information</h2>
            <div className="space-y-5 mb-10">
              {[[MapPin,'123 Fashion Ave, Style City, SC 10001'],[Phone,'+1 (555) 000-1234'],[Mail,'hello@vintie.com']].map(([Icon,text],i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-ink shrink-0"><Icon size={16}/></div>
                  <p className="text-[14px] text-muted pt-2.5">{text}</p>
                </div>
              ))}
            </div>
            <div className="bg-cream rounded-xl3 p-6">
              <p className="font-semibold text-[14px] text-ink mb-1">Business Hours</p>
              <p className="text-[13px] text-muted">Mon – Fri: 9:00 AM – 6:00 PM EST</p>
              <p className="text-[13px] text-muted">Sat: 10:00 AM – 4:00 PM EST</p>
              <p className="text-[13px] text-muted">Sun: Closed</p>
            </div>
          </div>
          <div className="bg-cream rounded-xl3 p-8">
            <h2 className="font-display text-2xl font-medium text-ink mb-6">Send us a Message</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Name</label><input className="input-field" placeholder="Your name"/></div>
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Email</label><input className="input-field" placeholder="you@email.com"/></div>
              </div>
              <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Subject</label><input className="input-field" placeholder="How can we help?"/></div>
              <div><label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">Message</label><textarea className="input-field resize-none" rows={5} placeholder="Tell us more…"/></div>
              <button className="btn-primary w-full justify-center">Send Message <Send size={15}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BLOG ───────────────────────────────────────────────── */
export function BlogPage() {
  const posts = [
    { id: 1, title: "How to Build a Capsule Wardrobe in 2025", excerpt: "Timeless pieces that work harder, look better, and last longer. Our guide to intentional dressing.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", date: "Mar 15, 2025", cat: "Style Guide", readTime: "5 min" },
    { id: 2, title: "The Rise of Slow Fashion", excerpt: "Why the world is turning away from fast fashion and embracing quality, sustainability, and craftsmanship.", image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80", date: "Mar 8, 2025", cat: "Sustainability", readTime: "7 min" },
    { id: 3, title: "Spring Layering: The Art of the In-Between", excerpt: "How to dress for unpredictable weather without sacrificing style — our spring layering essentials.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", date: "Feb 28, 2025", cat: "Seasonal", readTime: "4 min" },
    { id: 4, title: "Our Favourite Neutral Colour Palettes", excerpt: "Stone, cream, sand and charcoal — how to build a wardrobe around calm, versatile tones.", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80", date: "Feb 20, 2025", cat: "Style Guide", readTime: "6 min" },
    { id: 5, title: "Behind the Seams: Our Production Process", excerpt: "A look inside how our garments are made — from initial sketch to your wardrobe.", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80", date: "Feb 10, 2025", cat: "Brand Story", readTime: "8 min" },
    { id: 6, title: "The Perfect Work Week Wardrobe", excerpt: "Five days, five outfits — our picks for a week of effortlessly polished work looks.", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", date: "Jan 30, 2025", cat: "Style Guide", readTime: "5 min" },
  ];

  return (
    <div className="bg-milk min-h-screen">
      <div className="bg-cream border-b border-sand/60 py-16">
        <div className="section-container">
          <h1 className="font-display text-5xl font-medium text-ink mb-2">The VINTIE Journal</h1>
          <p className="text-muted text-[14px]">Style guides, brand stories, and fashion inspiration</p>
        </div>
      </div>
      <div className="section-container py-16">
        {/* Featured */}
        <Link to="#" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 group">
          <div className="rounded-xl3 overflow-hidden img-zoom aspect-video lg:aspect-auto">
            <img src={posts[0].image} alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-widest text-muted mb-3">{posts[0].cat} · {posts[0].readTime} read</span>
            <h2 className="font-display text-4xl font-medium text-ink mb-4 group-hover:text-muted transition-colors">{posts[0].title}</h2>
            <p className="text-[14px] text-muted leading-relaxed mb-6">{posts[0].excerpt}</p>
            <div className="flex items-center gap-2 text-[13px] text-ink font-medium">Read more <ArrowRight size={14}/></div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map(p => (
            <Link key={p.id} to="#" className="group bg-cream rounded-xl3 overflow-hidden">
              <div className="aspect-video overflow-hidden img-zoom">
                <img src={p.image} alt="" className="w-full h-full object-cover"/>
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase tracking-widest text-muted">{p.cat} · {p.readTime} read</span>
                <h3 className="font-display text-[20px] font-medium text-ink mt-1 mb-2 group-hover:text-muted transition-colors leading-tight">{p.title}</h3>
                <p className="text-[12.5px] text-muted leading-relaxed">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
