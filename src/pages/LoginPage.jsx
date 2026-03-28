import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="bg-milk min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl w-full max-w-md border border-sand/50">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-medium text-ink mb-2">Welcome Back</h1>
          <p className="text-muted text-[14px]">Enter your details to access your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2 px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12"
                placeholder="alex@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2 px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-12"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-sand text-ink focus:ring-ink" />
              <span className="text-[12px] text-muted group-hover:text-ink transition-colors">Remember me</span>
            </label>
            <Link to="#" className="text-[12px] text-ink font-medium hover:underline">Forgot Password?</Link>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="btn-primary w-full justify-center py-3.5 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-sand text-center">
          <p className="text-[13px] text-muted">
            Don't have an account? <Link to="/signup" className="text-ink font-semibold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
