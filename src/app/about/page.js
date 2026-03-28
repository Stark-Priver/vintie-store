import Link from 'next/link';
import { ArrowRight, CheckCircle, Target, Users, Zap, Award, Briefcase, Globe } from 'lucide-react';

const objectives = [
  "To become a leading company in Tanzania in providing technological solutions for higher education institutions.",
  "To create employment opportunities for youth through digital media and entrepreneurship.",
  "To simplify access to essential student services and information through a unified digital platform."
];

const team = [
  { name: "Leonard Sementa Kinanda", role: "Executive Director", icon: <Users size={24} /> },
  { name: "Gideon Kephas Siame", role: "Managing Director", icon: <Briefcase size={24} /> },
  { name: "To be updated", role: "IT Solutions", icon: <Globe size={24} /> },
];

export default function AboutPage() {
  return (
    <div className="bg-milk min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden bg-ink">
        <div className="absolute inset-0 flex items-center justify-center text-center text-milk px-6 relative z-10">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 block mb-3 animate-fadeIn">Our Mission</span>
            <h1 className="font-display text-5xl md:text-7xl font-medium mb-4 animate-fadeUp">Built on Passion,<br/><em className="font-light text-muted">Refined by Innovation</em></h1>
            <p className="text-[14px] text-white/55 max-w-lg mx-auto leading-relaxed animate-fadeUp" style={{ animationDelay: '0.1s' }}>
              Campus Vibes Media (CVM) is an integrated technology and media company headquartered in Mbeya, Tanzania.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-20 opacity-5">
           <Target size={400} className="text-white" />
        </div>
      </div>

      {/* Introduction */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-4">Introduction</span>
              <h2 className="font-display text-5xl font-medium leading-tight text-ink mb-6">Bridging Campus Life and Opportunities</h2>
              <p className="text-[16px] text-muted leading-relaxed mb-6">
                Campus Vibes Media (CVM) is an integrated technology and media company headquartered in Mbeya, Tanzania. We serve as a bridge between campus life and the world of opportunities through digital innovation, advanced technological systems, and creative content production.
              </p>
              <p className="text-[16px] text-muted leading-relaxed mb-8">
                Our mission is to transform student experiences across three key sectors: Technology, Media, and Commerce.
              </p>
              <Link href="/projects" className="btn-primary">View our Projects <ArrowRight size={15}/></Link>
            </div>
            <div className="bg-cream rounded-xl3 p-12 md:p-16 border border-sand/50 shadow-soft">
              <h3 className="font-display text-3xl font-medium text-ink mb-8">Our Core Objectives</h3>
              <div className="space-y-6">
                {objectives.map((obj, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-ink text-milk flex items-center justify-center shrink-0">
                      <CheckCircle size={16} />
                    </div>
                    <p className="text-[14px] text-muted pt-1 leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats (Repurposed for Impact) */}
      <section className="py-16 bg-ink text-milk">
        <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: <Zap size={40} className="mx-auto mb-4 text-gold" />, label: 'Digital Innovation' },
            { icon: <Users size={40} className="mx-auto mb-4 text-gold" />, label: 'Youth Empowerment' },
            { icon: <Award size={40} className="mx-auto mb-4 text-gold" />, label: 'Excellence in EdTech' }
          ].map((item, i) => (
            <div key={i}>
              {item.icon}
              <div className="font-display text-2xl font-medium uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-cream">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-1">Our Leadership</h2>
            <p className="section-sub">Led by a team of visionary professionals in Mbeya, Tanzania</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <div key={i} className="bg-milk rounded-xl3 p-10 text-center border border-sand/50 shadow-soft card-hover">
                <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center mb-6 text-ink border border-sand/50">
                   {m.icon}
                </div>
                <h3 className="font-semibold text-ink text-xl mb-1">{m.name}</h3>
                <p className="text-[12px] text-muted uppercase tracking-[0.15em] font-medium">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
