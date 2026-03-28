'use client';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/providers';

interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  category?: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  sizes?: string[];
  colors?: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch, setCartOpen, wishlist, toggleWishlist } = useCart();
  const [added, setAdded] = useState(false);

  const wished = wishlist.includes(product.id);
  const discount = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD', product, size: product.sizes?.[0] || 'M' });
    setCartOpen(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const imgSrc = product.image || `https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=80`;

  return (
    <div className="group flex flex-col gap-3">
      <Link href={`/product/${product.id}`} className="relative rounded-xl2 overflow-hidden bg-cream aspect-[3/4] img-zoom block">
        <img src={imgSrc} alt={product.name} className="w-full h-full object-cover" loading="lazy" />

        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 ${product.badge === 'New' ? 'badge-new' : 'badge-sale'}`}>{product.badge}</span>
        )}
        {discount && !product.badge && (
          <span className="absolute top-3 right-3 z-10 badge bg-accent/90 text-white">-{discount}%</span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-20">
          <button
            onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-soft transition-all duration-200 ${wished ? 'bg-ink text-milk' : 'bg-white text-ink hover:bg-ink hover:text-milk'}`}
          >
            <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
          </button>
          <Link href={`/product/${product.id}`} className="w-9 h-9 rounded-full bg-white text-ink flex items-center justify-center shadow-soft hover:bg-ink hover:text-milk transition-all duration-200">
            <Eye size={15} />
          </Link>
        </div>

        <button
          onClick={handleAdd}
          className={`absolute bottom-0 inset-x-0 py-3 flex items-center justify-center gap-2 text-[12px] font-medium tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${added ? 'bg-emerald-600 text-white' : 'bg-ink text-milk'}`}
        >
          <ShoppingBag size={14} />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </Link>

      <div className="px-1">
        <span className="text-[10px] tracking-widest uppercase text-muted">{product.category}</span>
        <Link href={`/product/${product.id}`} className="block text-[14px] font-medium text-ink hover:text-muted transition-colors mt-0.5 leading-snug">{product.name}</Link>
        <div className="flex items-center gap-1 mt-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={i < Math.floor(product.rating || 0) ? 'text-gold fill-gold' : 'text-sand'} fill={i < Math.floor(product.rating || 0) ? 'currentColor' : 'none'} />
          ))}
          <span className="text-[10px] text-muted ml-1">({product.reviews || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-ink">₦{product.price?.toLocaleString()}</span>
          {product.original_price && <span className="text-[13px] text-muted line-through">₦{product.original_price?.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );
}
