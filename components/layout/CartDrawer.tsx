'use client';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/providers';

export default function CartDrawer() {
  const { items, dispatch, total, cartOpen, setCartOpen } = useCart();

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-ink/40 z-[199] transition-opacity duration-300 ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-[95vw] bg-milk z-[200] flex flex-col shadow-lift transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
          <div className="flex items-center gap-3 font-semibold text-[15px] text-ink">
            <ShoppingBag size={18} />
            Shopping Cart
            {items.length > 0 && (
              <span className="bg-ink text-milk w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-semibold">{items.length}</span>
            )}
          </div>
          <button onClick={() => setCartOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted">
              <ShoppingBag size={52} strokeWidth={1} />
              <p className="text-[15px]">Your cart is empty</p>
              <button onClick={() => setCartOpen(false)} className="btn-primary text-sm">
                Continue Shopping <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={`${item.id}-${item.size}`} className="flex gap-3 pb-4 border-b border-sand last:border-0">
                  <div className="w-[72px] h-[88px] rounded-xl overflow-hidden bg-cream flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium leading-tight mb-0.5 truncate text-ink">{item.name}</p>
                    <p className="text-[11px] text-muted mb-2">Size: {item.size}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-sand rounded-lg overflow-hidden">
                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, size: item.size, qty: item.qty - 1 })} className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors text-ink">
                          <Minus size={12} />
                        </button>
                        <span className="text-[13px] font-medium w-5 text-center text-ink">{item.qty}</span>
                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, size: item.size, qty: item.qty + 1 })} className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors text-ink">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[14px] font-semibold text-ink">₦{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => dispatch({ type: 'REMOVE', id: item.id, size: item.size })} className="text-muted hover:text-accent transition-colors self-start mt-0.5">
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-sand space-y-3">
            <div className="flex justify-between text-[15px] font-semibold text-ink">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-muted">Shipping calculated at checkout</p>
            <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full justify-center text-[14px] py-4">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <button onClick={() => setCartOpen(false)} className="w-full text-[13px] text-muted text-center py-2 hover:text-ink transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
