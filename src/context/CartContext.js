import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.product.id && i.size === action.size);
      if (existing) return state.map(i => i.id === action.product.id && i.size === action.size ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.product, qty: 1, size: action.size || action.product.sizes?.[2] || 'M' }];
    }
    case 'REMOVE': return state.filter(i => !(i.id === action.id && i.size === action.size));
    case 'UPDATE_QTY': return state.map(i => i.id === action.id && i.size === action.size ? { ...i, qty: Math.max(1, action.qty) } : i);
    case 'CLEAR': return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  return (
    <CartContext.Provider value={{ items, dispatch, total, count, cartOpen, setCartOpen, wishlist, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
