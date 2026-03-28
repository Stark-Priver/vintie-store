'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '@/context/providers';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (!agreed) { setError('Please accept the terms and conditions'); return; }
    setLoading(true);
    setError('');
    try {
      const user = await signup(email, password, fullName);
      router.push(user.is_admin ? '/admin' : '/account');
    } catch (err: unknown) {
      setError((err as Error).message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — fashion image */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-milk w-full">
          <Link href="/" className="inline-flex items-center">
            <img src="/logo.png" alt="VINTIE" className="h-14 w-auto object-contain brightness-0 invert" />
          </Link>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">Join the community</div>
            <h2 className="font-display text-5xl font-medium leading-tight mb-6">
              Style is a way<br />
              <em className="font-light not-italic text-white/65">to say who you are</em>
            </h2>
            <div className="space-y-3">
              {[
                '534 curated men\'s fashion items',
                'Exclusive member-only discounts',
                'Order tracking & history',
                'Early access to new arrivals',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[13px] text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 bg-milk overflow-y-auto">
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="VINTIE" className="h-12 w-auto object-contain" style={{ mixBlendMode: 'multiply' }} />
        </Link>

        <div className="w-full max-w-[420px] mx-auto">
          <div className="mb-7">
            <h1 className="font-display text-4xl font-medium text-ink mb-2">Create account</h1>
            <p className="text-muted text-[14px]">Join VINTIE — Lagos&apos; finest menswear</p>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-red-50 text-red-600 text-[13px] rounded-xl border border-red-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                  <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="input-field pl-11" placeholder="Emeka Okafor" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-11" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Phone <span className="normal-case text-muted font-normal">(optional)</span></label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-field pl-11" placeholder="+234 800 000 0000" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="Min 6 characters"
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className={`input-field pl-11 ${confirm && confirm !== password ? 'border-red-400' : ''}`}
                  placeholder="Re-enter password"
                />
              </div>
              {confirm && confirm !== password && (
                <p className="text-[11px] text-red-500 mt-1 px-1">Passwords don&apos;t match</p>
              )}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer group mt-1">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-ink" />
              <span className="text-[12px] text-muted leading-relaxed">
                I agree to VINTIE&apos;s{' '}
                <Link href="#" className="text-ink underline hover:no-underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="#" className="text-ink underline hover:no-underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              disabled={loading || !agreed}
              type="submit"
              className="btn-primary w-full justify-center py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading
                ? <><Loader2 className="animate-spin" size={18} /> Creating account…</>
                : <>Create Account <ArrowRight size={17} /></>}
            </button>
          </form>

          <p className="mt-7 text-center text-[13px] text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-ink font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
