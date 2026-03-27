import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ArrowRight, ChevronRight, Truck, RefreshCw, Shield, Minus, Plus, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const { dispatch, setCartOpen, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || 'M');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState('description');

  const wished = wishlist.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  // Multiple images (use same image with different crops for demo)
  const images = [product.image, `${product.image.split('?')[0]}?w=600&q=80&crop=top`, `${product.image.split('?')[0]}?w=600&q=80&crop=bottom`, `${product.image.split('?')[0]}?w=600&q=80`];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', product, size: selectedSize });
    setCartOpen(true);
  };

  return (
    <div className="bg-milk min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-sand/60">
        <div className="section-container py-3">
          <nav className="flex items-center gap-1.5 text-[12px] text-muted">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight size={12}/>
            <Link to="/shop" className="hover:text-ink transition-colors">Shop</Link>
            <ChevronRight size={12}/>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {images.slice(0, 4).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-ink' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
            <div className="flex-1 rounded-xl3 overflow-hidden bg-cream aspect-[3/4] relative img-zoom">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover object-top"/>
              {product.badge && (
                <span className={`absolute top-4 left-4 ${product.badge === 'New' ? 'badge-new' : 'badge-sale'}`}>{product.badge}</span>
              )}
              {discount && <span className="absolute top-4 right-4 badge bg-accent/90 text-white">-{discount}%</span>}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-muted">{product.category}</span>
              <h1 className="font-display text-4xl font-medium text-ink mt-1 mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-sand'} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}/>)}
                </div>
                <span className="text-[13px] text-muted">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-medium text-ink">${product.price}</span>
              {product.originalPrice && <span className="text-[16px] text-muted line-through">${product.originalPrice}</span>}
              {discount && <span className="badge-sale">{discount}% OFF</span>}
            </div>

            <div className="border-t border-sand pt-6">
              {/* Colors */}
              {product.colors && (
                <div className="mb-5">
                  <p className="text-[12px] font-semibold tracking-wider uppercase text-muted mb-2">Colors</p>
                  <div className="flex gap-2">
                    {product.colors.map((c, i) => (
                      <button key={i} className="w-7 h-7 rounded-full border-2 border-sand hover:border-ink transition-colors" style={{background: c}}/>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[12px] font-semibold tracking-wider uppercase text-muted">Size</p>
                    <button className="text-[11px] text-muted underline hover:text-ink">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        className={`min-w-[42px] h-10 px-3 rounded-lg text-[12px] font-medium border transition-all duration-200 ${selectedSize === s ? 'bg-ink text-milk border-ink' : 'border-sand text-muted hover:border-ink hover:text-ink'}`}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add */}
              <div className="flex gap-3">
                <div className="flex items-center border border-sand rounded-lg overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors"><Minus size={14}/></button>
                  <span className="w-10 text-center text-[14px] font-medium">{qty}</span>
                  <button onClick={() => setQty(q => q+1)} className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors"><Plus size={14}/></button>
                </div>
                <button onClick={handleAddToCart} className="btn-primary flex-1 justify-center py-3.5">
                  <ShoppingBag size={16}/> Add to Cart
                </button>
                <button onClick={() => toggleWishlist(product.id)} className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-all duration-200 ${wished ? 'bg-ink text-milk border-ink' : 'border-sand text-muted hover:border-ink hover:text-ink'}`}>
                  <Heart size={16} fill={wished ? 'currentColor' : 'none'}/>
                </button>
              </div>

              <button className="btn-outline w-full justify-center mt-3">
                Buy Now <ArrowRight size={15}/>
              </button>
            </div>

            {/* Perks */}
            <div className="border-t border-sand pt-5 space-y-2.5">
              {[
                [Truck, 'Free shipping on orders over $150'],
                [RefreshCw, 'Free returns within 30 days'],
                [Shield, 'Secure & encrypted checkout'],
              ].map(([Icon, text], i) => (
                <div key={i} className="flex items-center gap-3 text-[12.5px] text-muted">
                  <Icon size={14} className="text-ink shrink-0"/>
                  {text}
                </div>
              ))}
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-[12px] text-muted hover:text-ink transition-colors w-fit">
              <Share2 size={13}/> Share this product
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-sand">
          <div className="flex gap-1 mt-6 mb-8">
            {['description','details','reviews'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-lg text-[13px] capitalize font-medium transition-all duration-200 ${tab === t ? 'bg-ink text-milk' : 'text-muted hover:text-ink'}`}
              >{t}</button>
            ))}
          </div>
          {tab === 'description' && (
            <div className="max-w-2xl">
              <p className="text-[14px] text-muted leading-relaxed mb-4">
                Crafted with premium materials sourced from ethical suppliers, the {product.name} combines contemporary design with timeless elegance. Each piece is thoughtfully constructed to ensure comfort, durability, and versatile styling options.
              </p>
              <p className="text-[14px] text-muted leading-relaxed">
                Whether you're dressing for a casual weekend or a more refined occasion, this piece adapts effortlessly. The relaxed yet structured silhouette ensures flattering wear for all body types.
              </p>
            </div>
          )}
          {tab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {[['Material', '70% Wool, 20% Polyester, 10% Cashmere'], ['Fit', 'Relaxed / Oversized'], ['Care', 'Dry clean recommended'], ['Origin', 'Made in Portugal'], ['Stock', `${product.stock} units available`], ['SKU', `VT-${product.id.toString().padStart(4,'0')}`]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5 border-b border-sand/60 text-[13px]">
                  <span className="font-medium text-ink">{k}</span>
                  <span className="text-muted">{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'reviews' && (
            <div className="max-w-2xl space-y-5">
              {[{name:'Alex T.',rating:5,text:'Incredible quality. Exactly as described.',date:'March 2025'},{name:'Priya S.',rating:4,text:'Lovely piece, slightly larger than expected but styled beautifully.',date:'February 2025'}].map((r,i) => (
                <div key={i} className="bg-cream rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-0.5">{[...Array(5)].map((_,j) => <Star key={j} size={12} className={j < r.rating ? 'text-gold fill-gold' : 'text-sand'}/>)}</div>
                    <span className="text-[11px] text-muted">{r.date}</span>
                  </div>
                  <p className="text-[13px] text-muted leading-relaxed">{r.text}</p>
                  <p className="text-[12px] font-medium text-ink mt-2">— {r.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-2">You May Also Like</h2>
            <p className="section-sub mb-8">More from {product.category}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
