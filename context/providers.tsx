'use client';
import React, { createContext, useContext, useReducer, useState, useEffect, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  sizes?: string[];
  qty: number;
  size: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  is_admin: boolean;
  avatar?: string;
}

interface CartState { items: CartItem[]; }

// ─── Cart Reducer ─────────────────────────────────────────────────
function cartReducer(state: CartItem[], action: { type: string; [key: string]: unknown }): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const product = action.product as CartItem;
      const size = action.size as string;
      const existing = state.find(i => i.id === product.id && i.size === size);
      if (existing) return state.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...product, qty: 1, size: size || product.sizes?.[0] || 'M' }];
    }
    case 'REMOVE': return state.filter(i => !(i.id === action.id && i.size === action.size));
    case 'UPDATE_QTY': return state.map(i => i.id === action.id && i.size === action.size ? { ...i, qty: Math.max(1, action.qty as number) } : i);
    case 'CLEAR': return [];
    default: return state;
  }
}

// ─── Auth Context ─────────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, fullName: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Cart Context ─────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  dispatch: React.Dispatch<{ type: string; [key: string]: unknown }>;
  total: number;
  count: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Theme Context ────────────────────────────────────────────────
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Combined Provider ────────────────────────────────────────────
export function Providers({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const toggleWishlist = (id: number) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem('vintie_theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('vintie_theme', next);
      return next;
    });
  }, []);

  // Auth check on mount
  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setAuthLoading(false));
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    setUser(data.user);
    return data.user;
  };

  const signup = async (email: string, password: string, fullName: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch { /* ignore */ } finally {
      setUser(null);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, loading: authLoading, login, signup, logout, refreshUser }}>
        <CartContext.Provider value={{ items, dispatch, total, count, cartOpen, setCartOpen, wishlist, toggleWishlist }}>
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside Providers');
  return ctx;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside Providers');
  return ctx;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside Providers');
  return ctx;
};
