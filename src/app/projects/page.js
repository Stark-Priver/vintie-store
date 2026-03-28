import { ArrowUpRight, Cpu, Video, ShoppingCart, CheckCircle, Shield, FileText, Globe, Camera, Award } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    sector: "Technology Systems",
    icon: <Cpu className="w-8 h-8" />,
    items: [
      {
        title: "Smart Campus ID (SCI)",
        desc: "A modern electronic identification system (NFC/QR/Barcode) designed for managing attendance, examinations, and campus security within educational institutions.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        title: "Digital Certificate Vault (DCV)",
        desc: "A secure digital platform for storing and verifying academic certificates to prevent loss and forgery.",
        icon: <FileText className="w-5 h-5" />,
      },
      {
        title: "Smart City Flow",
        desc: "A strategic initiative focused on reducing urban traffic congestion and organizing small businesses through smart parking systems and modern digital kiosks.",
        icon: <Globe className="w-5 h-5" />,
      }
    ]
  },
  {
    sector: "Media & Lifestyle",
    icon: <Video className="w-8 h-8" />,
    items: [
      {
        title: "Campus Vibe TV",
        desc: "A digital channel producing entertainment content, educational news, and student lifestyle features.",
        icon: <Video className="w-5 h-5" />,
      },
      {
        title: "Campus Memory",
        desc: "A service dedicated to preserving student journeys through graduation films, photobooks, and digital diaries from first year to graduation.",
        icon: <Camera className="w-5 h-5" />,
      },
      {
        title: "The Night of Campus Memory",
        desc: "An annual gala/awards event designed to celebrate and honor graduating students while reflecting on their academic journey.",
        icon: <Award className="w-5 h-5" />,
      }
    ]
  },
  {
    sector: "Business & E-Commerce",
    icon: <ShoppingCart className="w-8 h-8" />,
    items: [
      {
        title: "Marketplace App",
        desc: "A mobile application that enables students to buy, sell, and exchange goods and services easily and securely within and beyond campus environments.",
        icon: <ShoppingCart className="w-5 h-5" />,
      }
    ]
  }
];

export default function ProjectsPage() {
  return (
    <div className="bg-milk min-h-screen">
      {/* Header */}
      <div className="bg-ink text-milk py-24">
        <div className="section-container text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3 block">Projects & Services</span>
          <h1 className="font-display text-6xl font-medium mb-4">Core Directory</h1>
          <p className="text-[14px] text-white/45 max-w-lg mx-auto leading-relaxed">
            Exploring the intersection of Technology, Media, and Commerce to build a better campus experience.
          </p>
        </div>
      </div>

      {/* Directory Grid */}
      <section className="py-24">
        <div className="section-container">
          <div className="space-y-24">
            {projects.map((group, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-ink border border-sand/50 shadow-soft">
                    {group.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-4xl font-medium text-ink tracking-tight uppercase">{group.sector}</h2>
                    <p className="text-sm text-muted">Driving transformation through innovative solutions.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.items.map((project, j) => (
                    <div key={j} className="bg-milk p-8 rounded-xl3 shadow-card border border-sand/50 group hover:border-ink transition-all duration-300 flex flex-col">
                      <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-ink mb-6 border border-sand/30 group-hover:bg-ink group-hover:text-milk transition-colors">
                        {project.icon}
                      </div>
                      <h3 className="font-display text-2xl font-medium text-ink mb-3">{project.title}</h3>
                      <p className="text-[14px] text-muted leading-relaxed flex-grow">
                        {project.desc}
                      </p>
                      <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold text-ink hover:text-muted transition-colors uppercase tracking-widest">
                        Inquire Details <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-cream">
        <div className="section-container text-center">
          <h2 className="section-title mb-6">Explore the Future with Us</h2>
          <p className="section-sub text-base max-w-xl mx-auto mb-10">Interested in integrating our systems at your institution? Reach out for a consultation or partnership proposal.</p>
          <Link href="/contact" className="btn-primary">Connect with CVM <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
