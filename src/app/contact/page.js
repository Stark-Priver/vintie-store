'use client';

import React from 'react';
import { Mail, MapPin, Phone, Send, Instagram, Facebook, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-milk min-h-screen">
      {/* Header */}
      <div className="bg-cream border-b border-sand/60 py-24">
        <div className="section-container text-center">
          <h1 className="font-display text-5xl md:text-7xl font-medium text-ink mb-4">Get in Touch</h1>
          <p className="text-muted text-[16px] max-w-lg mx-auto">
            Have a question or looking to partner with Campus Vibes Media? We'd love to hear from you.
          </p>
        </div>
      </div>

      <section className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-4xl font-medium text-ink mb-8">Contact Information</h2>
              <div className="space-y-8 mb-12">
                {[
                  { Icon: MapPin, title: 'Head Office', detail: 'Mbeya, Tanzania' },
                  { Icon: Mail, title: 'Email Us', detail: 'contact@campusvibes.co.tz' },
                  { Icon: Instagram, title: 'Social Media', detail: '@campusvibestv' }
                ].map(({ Icon, title, detail }, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-ink shrink-0 shadow-soft border border-sand/30">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">{title}</p>
                      <p className="text-[16px] text-ink font-medium">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-cream rounded-xl3 p-8 border border-sand/50 shadow-soft">
                <h3 className="font-display text-2xl font-medium text-ink mb-4">Business Hours</h3>
                <div className="space-y-2 text-[14px] text-muted">
                  <p className="flex justify-between"><span>Mon – Fri:</span> <span>9:00 AM – 6:00 PM</span></p>
                  <p className="flex justify-between"><span>Saturday:</span> <span>10:00 AM – 4:00 PM</span></p>
                  <p className="flex justify-between"><span>Sunday:</span> <span>Closed</span></p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-milk p-8 md:p-12 rounded-[2rem] border border-sand/50 shadow-lift">
              <h2 className="font-display text-3xl font-medium text-ink mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Your Name</label>
                    <input type="text" placeholder="Full Name" className="w-full bg-cream border border-sand rounded-xl px-4 py-3.5 text-sm text-ink outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Email Address</label>
                    <input type="email" placeholder="email@example.com" className="w-full bg-cream border border-sand rounded-xl px-4 py-3.5 text-sm text-ink outline-none focus:border-ink transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Subject</label>
                  <input type="text" placeholder="How can we help?" className="w-full bg-cream border border-sand rounded-xl px-4 py-3.5 text-sm text-ink outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">Message</label>
                  <textarea rows={5} placeholder="Tell us more about your project or inquiry..." className="w-full bg-cream border border-sand rounded-xl px-4 py-3.5 text-sm text-ink outline-none focus:border-ink transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary justify-center !py-4 text-base gap-3">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
