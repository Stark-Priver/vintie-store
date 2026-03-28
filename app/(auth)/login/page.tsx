'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/providers';

const fashionImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85',
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const bgImg = fashionImages[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      if (user.is_admin) {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — fashion image panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <img
          src={bgImg}
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink/70 via-ink/40 to-transparent" />

        {/* Brand overlay */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-milk w-full">
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="VINTIE" className="h-14 w-auto object-contain brightness-0 invert" />
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[11px] tracking-widest uppercase mb-6 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Lagos' Finest Menswear
            </div>
            <h2 className="font-display text-5xl font-medium leading-tight mb-4">
              Dress with<br />
              <em className="font-light not-italic text-white/70">Purpose &amp; Style</em>
            </h2>
            <p className="text-[14px] text-white/55 leading-relaxed max-w-sm">
              3rd Floor, E-Centre (Ozone Cinemas) Sabo, Yaba, Lagos.<br />
              Open daily 10am–8pm · Sundays 1pm–8pm
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80',
                  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&q=80',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white/40" />
                ))}
              </div>
              <span className="text-[13px] text-white/60">44.7K+ followers on Instagram</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-milk">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
          <img src="/logo.png" alt="VINTIE" className="h-12 w-auto object-contain" style={{ mixBlendMode: 'multiply' }} />
        </Link>

        <div className="w-full max-w-[400px] mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-medium text-ink mb-2">Welcome back</h1>
            <p className="text-muted text-[14px]">Sign in to your VINTIE account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 text-[13px] rounded-xl border border-red-100 dark:border-red-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-sand accent-ink" />
                <span className="text-[12px] text-muted group-hover:text-ink transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-[12px] text-ink font-medium hover:underline">Forgot password?</button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading
                ? <><Loader2 className="animate-spin" size={18} /> Signing in…</>
                : <>Sign In <ArrowRight size={17} /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="flex-1 h-px bg-sand" />
            <span className="text-[11px] text-muted tracking-wider uppercase">or</span>
            <div className="flex-1 h-px bg-sand" />
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message/OT2BFLRVDDAMF1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full border border-sand rounded-lg py-3 text-[13px] text-ink font-medium hover:bg-cream transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-500"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>

          <p className="mt-8 text-center text-[13px] text-muted">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-ink font-semibold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
