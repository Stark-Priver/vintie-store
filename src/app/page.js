import Link from 'next/link';
import { ArrowRight, Cpu, Video, ShoppingCart, Globe, Users, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-milk">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="section-container relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream rounded-full text-[11px] tracking-widest uppercase text-muted mb-6 animate-fadeIn">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Welcome to Campus Vibes Media
            </div>
            <h1 className="font-display text-[clamp(44px,6vw,84px)] font-medium leading-[1.05] tracking-tight text-ink mb-8 animate-fadeUp">
              Transforming <br />
              <em className="font-light not-italic text-muted">Campus Experience</em><br />
              through Innovation
            </h1>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-muted max-w-xl mb-10 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
              We serve as a bridge between campus life and the world of opportunities through digital innovation, advanced technological systems, and creative content production.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              <Link href="/projects" className="btn-primary">Explore Projects <ArrowRight size={18}/></Link>
              <Link href="/about" className="btn-outline">Our Mission</Link>
            </div>
          </div>
        </div>

        {/* Abstract shapes/background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cream -z-0 hidden lg:block">
           <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Globe size={600} />
           </div>
        </div>
      </section>

      {/* CORE SECTORS */}
      <section className="py-24 bg-cream">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title mb-4">Core Sectors</h2>
            <p className="section-sub text-base">We are structured to drive transformation across three key pillars that define modern student life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu size={32} />,
                title: "Technology Systems",
                desc: "Smart solutions designed for managing attendance, examinations, and campus security within educational institutions.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: <Video size={32} />,
                title: "Media & Lifestyle",
                desc: "Digital channels and services dedicated to producing entertainment, educational news, and preserving student journeys.",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: <ShoppingCart size={32} />,
                title: "Business & E-Commerce",
                desc: "Mobile applications and platforms that enable students to buy, sell, and exchange goods and services easily.",
                color: "bg-emerald-50 text-emerald-600"
              }
            ].map((sector, i) => (
              <div key={i} className="bg-milk p-10 rounded-xl3 shadow-soft card-hover border border-sand/50">
                <div className={`w-16 h-16 rounded-2xl ${sector.color} flex items-center justify-center mb-6`}>
                  {sector.icon}
                </div>
                <h3 className="font-display text-2xl font-medium text-ink mb-4">{sector.title}</h3>
                <p className="text-[14px] text-muted leading-relaxed mb-6">{sector.desc}</p>
                <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-ink group">
                  Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="section-container">
          <div className="bg-ink rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-6xl text-milk font-medium mb-6">Ready to innovate your campus?</h2>
              <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">Join us in our mission to simplify access to essential student services and information through a unified digital platform.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink rounded-xl font-bold hover:bg-gold transition-colors">
                Work with us <Zap size={18} />
              </Link>
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Users size={200} className="text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
