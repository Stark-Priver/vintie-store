'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Star, Heart, ShoppingBag, ArrowRight, Truck, RefreshCw, Shield, Minus, Plus, Share2, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/providers';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { dispatch, setCartOpen, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/products/${id}`).then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
    ]).then(([prod, all]) => {
      setProduct(prod);
      setSelectedSize(prod.sizes?.[0] || 'M');
      if (Array.isArray(all)) setRelated(all.filter((p: any) => p.category === prod.category && p.id !== prod.id).slice(0, 4));
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-milk flex items-center justify-center"><div className="w-10 h-10 border-2 border-ink border-t-transparent rounded-full animate-spin" /></div>;
  if (!product || product.error) return (
    <div className="min-h-screen bg-milk flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-3xl text-ink">Product not found</h1>
      <Link href="/shop" className="btn-primary">Back to Shop</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.image || 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=700&q=80'];
  const wished = wishlist.includes(product.id);
  const discount = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : null;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD', product, size: selectedSize });
    setCartOpen(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-milk min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-sand py-3">
        <div className="section-container flex items-center gap-2 text-[12px] text-muted">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] rounded-xl2 overflow-hidden bg-cream">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className={`absolute top-4 left-4 ${product.badge === 'New' ? 'badge-new' : 'badge-sale'}`}>{product.badge}</span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 badge bg-accent/90 text-white">-{discount}%</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-ink' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-muted">{product.category}</span>
              <h1 className="font-display text-4xl font-medium text-ink mt-1 mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating || 0) ? 'text-gold fill-gold' : 'text-sand'} fill={i < Math.floor(product.rating || 0) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-[13px] text-muted">({product.reviews || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl font-medium text-ink">₦{product.price?.toLocaleString()}</span>
                {product.original_price && <span className="text-[17px] text-muted line-through">₦{product.original_price?.toLocaleString()}</span>}
                {discount && <span className="badge-sale">{discount}% OFF</span>}
              </div>
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Color</p>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <button key={color} title={color} className="w-8 h-8 rounded-full border-2 border-sand hover:border-ink transition-all" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Size</p>
                  <button className="text-[11px] text-ink underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 rounded-lg border text-[13px] font-medium transition-all ${selectedSize === size ? 'bg-ink text-milk border-ink' : 'border-sand text-ink hover:border-ink'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-sand rounded-lg overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-cream transition-colors text-ink"><Minus size={14} /></button>
                  <span className="w-10 text-center text-[14px] font-medium text-ink">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-cream transition-colors text-ink"><Plus size={14} /></button>
                </div>
                {product.stock && <span className="text-[12px] text-muted">{product.stock} in stock</span>}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-medium text-[14px] transition-all ${added ? 'bg-emerald-600 text-white' : 'bg-ink text-milk hover:opacity-80'}`}
              >
                <ShoppingBag size={17} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 flex items-center justify-center rounded-lg border transition-all ${wished ? 'bg-ink text-milk border-ink' : 'border-sand text-ink hover:border-ink'}`}
              >
                <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
              </button>
              <button className="w-14 h-14 flex items-center justify-center rounded-lg border border-sand text-ink hover:border-ink transition-all">
                <Share2 size={17} />
              </button>
            </div>

            {/* Perks */}
            <div className="border border-sand rounded-xl p-5 space-y-3">
              {[
                { icon: Truck, text: 'Free delivery on orders over ₦50,000' },
                { icon: RefreshCw, text: 'Easy 30-day returns' },
                { icon: Shield, text: 'Secure payment guaranteed' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-[13px] text-muted">
                  <Icon size={15} className="text-ink shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-sand gap-8 mb-8">
            {['description', 'reviews', 'shipping'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-[13px] font-medium capitalize transition-all border-b-2 -mb-px ${tab === t ? 'text-ink border-ink' : 'text-muted border-transparent hover:text-ink'}`}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === 'description' && (
            <p className="text-[14px] text-muted leading-relaxed max-w-2xl">{product.description || 'Premium quality men\'s clothing from VINTIE Lagos.'}</p>
          )}
          {tab === 'reviews' && (
            <p className="text-[14px] text-muted">No reviews yet. Be the first to review this product!</p>
          )}
          {tab === 'shipping' && (
            <div className="space-y-3 text-[14px] text-muted max-w-xl">
              <p>📦 Orders are processed within 1-2 business days.</p>
              <p>🚚 Lagos delivery: 1-3 business days.</p>
              <p>🇳🇬 Nationwide delivery: 3-7 business days.</p>
              <p>↩️ Free returns within 30 days of delivery.</p>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <h2 className="section-title">You May Also Like</h2>
              <Link href="/shop" className="btn-ghost">View All <ArrowRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
