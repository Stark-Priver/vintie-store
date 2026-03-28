'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Tag, Loader2, CheckCircle, X } from 'lucide-react';
import { useCart } from '@/context/providers';

export default function CheckoutPage() {
  const { items, total, dispatch } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: 'Lagos', notes: '' });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState('bank_transfer');

  const subtotal = total;
  const shipping = subtotal >= 50000 ? 0 : 2500;
  const finalTotal = subtotal - discount + shipping;

  const applyPromo = async () => {
    if (!couponCode.trim()) return;
    setValidatingCoupon(true);
    setCouponMsg(null);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, orderAmount: subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponMsg({ type: 'error', text: data.error || 'Invalid code' });
        setDiscount(0);
        setAppliedCoupon('');
      } else {
        setDiscount(data.discount);
        setAppliedCoupon(couponCode.toUpperCase());
        setCouponMsg({ type: 'success', text: `Promo applied! You save ₦${data.discount.toLocaleString()}` });
      }
    } catch {
      setCouponMsg({ type: 'error', text: 'Failed to validate code' });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const removeCoupon = () => { setDiscount(0); setAppliedCoupon(''); setCouponCode(''); setCouponMsg(null); };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          amount: finalTotal,
          items_count: items.reduce((s, i) => s + i.qty, 0),
          items: items,
          shipping_address: { address: form.address, city: form.city, state: form.state },
          payment_method: payMethod,
          coupon_code: appliedCoupon || null,
          discount_amount: discount,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(data.id);
      dispatch({ type: 'CLEAR' });
    } catch (err: unknown) {
      alert((err as Error).message || 'Order failed');
    } finally {
      setPlacing(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-milk flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <h1 className="font-display text-4xl font-medium text-ink mb-3">Order Placed!</h1>
        <p className="text-muted text-[14px] mb-2">Your order <strong className="text-ink">{success}</strong> has been received.</p>
        <p className="text-muted text-[14px] mb-8">We&apos;ll send confirmation to your email. WhatsApp us for fast updates.</p>
        <div className="flex gap-3 justify-center">
          <a href="https://wa.me/message/OT2BFLRVDDAMF1" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Track on WhatsApp <ArrowRight size={16} />
          </a>
          <Link href="/shop" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen bg-milk flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-3xl text-ink">Your cart is empty</h1>
      <Link href="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
    </div>
  );

  return (
    <div className="bg-milk min-h-screen py-10">
      <div className="section-container">
        <h1 className="font-display text-4xl font-medium text-ink mb-10">Checkout</h1>

        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            {/* Left — form */}
            <div className="space-y-8">
              {/* Contact */}
              <div className="bg-cream rounded-xl p-6 border border-sand">
                <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted mb-5">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['name', 'Full Name', 'text', true], ['email', 'Email Address', 'email', true], ['phone', 'Phone Number', 'tel', true]].map(([key, label, type, req]) => (
                    <div key={key as string} className={key === 'email' ? 'sm:col-span-2' : ''}>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">{label as string}</label>
                      <input
                        required={req as boolean}
                        type={type as string}
                        value={(form as any)[key as string]}
                        onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-cream rounded-xl p-6 border border-sand">
                <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted mb-5">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Street Address</label>
                    <input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input-field" placeholder="123 Victoria Island..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">City</label>
                      <input required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="input-field" placeholder="Lagos" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">State</label>
                      <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="input-field">
                        {['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Anambra', 'Enugu', 'Delta', 'Other'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Order Notes (optional)</label>
                    <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="input-field resize-none h-20" placeholder="Any special instructions..." />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-cream rounded-xl p-6 border border-sand">
                <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { val: 'bank_transfer', label: 'Bank Transfer', desc: 'Transfer to our account, send proof via WhatsApp' },
                    { val: 'pay_on_delivery', label: 'Pay on Delivery', desc: 'Cash/POS on delivery (Lagos only)' },
                    { val: 'card', label: 'Card Payment', desc: 'Visa/Mastercard via secure gateway' },
                  ].map(opt => (
                    <label key={opt.val} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${payMethod === opt.val ? 'border-ink bg-milk' : 'border-sand hover:border-stone'}`}>
                      <input type="radio" value={opt.val} checked={payMethod === opt.val} onChange={() => setPayMethod(opt.val)} className="mt-0.5 accent-ink" />
                      <div>
                        <p className="text-[13px] font-semibold text-ink">{opt.label}</p>
                        <p className="text-[11px] text-muted mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — order summary */}
            <div className="space-y-6">
              <div className="bg-cream rounded-xl p-6 border border-sand sticky top-24">
                <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                      <div className="w-14 h-16 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-ink truncate">{item.name}</p>
                        <p className="text-[11px] text-muted">Size: {item.size} · Qty: {item.qty}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-ink shrink-0">₦{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <div className="border-t border-sand pt-5 mb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Promo Code</p>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <span className="text-[12px] font-semibold text-emerald-700 flex items-center gap-2"><Tag size={13} /> {appliedCoupon}</span>
                      <button type="button" onClick={removeCoupon} className="text-emerald-600 hover:text-red-600 transition-colors"><X size={14} /></button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="VINTIE10"
                        className="input-field flex-1 uppercase"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); applyPromo(); } }}
                      />
                      <button type="button" onClick={applyPromo} disabled={validatingCoupon} className="btn-outline px-4 py-2.5 shrink-0 text-[12px]">
                        {validatingCoupon ? <Loader2 size={13} className="animate-spin" /> : 'Apply'}
                      </button>
                    </div>
                  )}
                  {couponMsg && (
                    <p className={`text-[12px] mt-2 ${couponMsg.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>{couponMsg.text}</p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t border-sand pt-4">
                  <div className="flex justify-between text-[13px] text-muted">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[13px] text-emerald-600">
                      <span>Discount ({appliedCoupon})</span>
                      <span>-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px] text-muted">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-bold text-ink pt-2 border-t border-sand">
                    <span>Total</span>
                    <span>₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="btn-primary w-full justify-center mt-5 py-4 disabled:opacity-60"
                >
                  {placing ? <><Loader2 className="animate-spin" size={18} /> Placing Order…</> : <>Place Order <ArrowRight size={16} /></>}
                </button>
                <p className="text-center text-[11px] text-muted mt-3">🔒 Secure checkout · Your data is protected</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
