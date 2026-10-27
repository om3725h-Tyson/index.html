import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block mb-3">
          // SECTOR 05. TRANSMISSION
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Subspace Transmission Relay</h2>
        <p className="text-slate-400 text-base">
          Initialize quantum contact coordinates for collaborations, mission contracts, or technical inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Console */}
        <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-6">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>BEACON ACTIVE: ACCEPTING NEW MISSIONS &amp; CONTRACTS</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] text-slate-400 uppercase">COMM FREQUENCY</div>
              <div className="font-semibold text-white text-sm">{PORTFOLIO_DATA.profile.email}</div>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs hover:bg-cyan-500 hover:text-slate-950 transition-all"
            >
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>

          <div className="font-mono text-xs text-slate-400 space-y-2">
            <div>⏱️ <strong className="text-white">RESPONSE TIME:</strong> &lt; 24 Light Hours</div>
            <div>📍 <strong className="text-white">ORBIT:</strong> Remote Worldwide / Sol-3</div>
            <div>🛡️ <strong className="text-white">ENCRYPTION:</strong> 4096-bit Quantum Asymmetric</div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-slate-400 uppercase mb-3">CONNECTED REPOSITORIES</div>
            <div className="flex gap-3">
              {PORTFOLIO_DATA.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Console: Transmission Form */}
        <div className="lg:col-span-7 p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                EXPLORER CALLSIGN / NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Commander Sarah Vance"
                className="w-full bg-slate-950/70 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                SUBSPACE TRANSMISSION FREQUENCY (EMAIL)
              </label>
              <input
                type="email"
                required
                placeholder="e.g. sarah.vance@interstellar.net"
                className="w-full bg-slate-950/70 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                MISSION CLASSIFICATION (SUBJECT)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Architecture Project Scope"
                className="w-full bg-slate-950/70 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                TRANSMISSION ENCRYPTED PAYLOAD (MESSAGE)
              </label>
              <textarea
                required
                rows={4}
                placeholder="Detail mission requirements and target launch timeline..."
                className="w-full bg-slate-950/70 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>🛰️ TRANSMITTING SIGNAL...</span>
              ) : submitted ? (
                <span>✅ TRANSMISSION CONFIRMED</span>
              ) : (
                <>
                  <span>TRANSMIT INTERSTELLAR SIGNAL</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

