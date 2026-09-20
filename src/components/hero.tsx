import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import type { Profile } from '@/lib/schema';

export function Hero({ profile }: { profile: Profile }) {
  return <section id="home" className="hero shell">
    <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> HELLO WORLD. I’M {profile.name.toUpperCase()}.</div>
      <h1>Sharp Code<span className="accent">.</span><br /><span className="outline-text">Clever</span> <span className="highlight-word">Tech<svg viewBox="0 0 300 18" aria-hidden="true"><path d="M3 13 Q130 0 296 7 M12 17 Q166 9 281 12" /></svg></span></h1>
      <p className="hero-role"><span className="accent">&lt;</span> {profile.role} <span className="accent">/&gt;</span></p>
      <p className="hero-intro">{profile.intro}</p>
      <div className="hero-actions"><a href="#projects" className="button primary">View projects <ArrowUpRight size={19} /></a><a href="#contact" className="text-link">Let’s connect <ArrowUpRight size={17} /></a></div>
      <div className="hero-footnote"><span className="tiny-cross">+</span> CODE WITH PURPOSE. BUILD WITH CURIOSITY.</div><p className="mt-3 font-mono text-[10px] text-acid">{profile.availability}</p>
    </div>
    <div className="hero-art" aria-label="Decorative neural network visualization" role="img">
      <div className="art-top"><span><span className="status-dot" /> NEURAL ENGINE</span><span>SYS.01 ↗</span></div>
      <div className="orbital-field"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" /><div className="orbit orbit-d" /><div className="orb-core"><Sparkles strokeWidth={1} /></div><span className="orbit-node node-a" /><span className="orbit-node node-b" /><span className="orbit-node node-c" /></div>
      <div className="floating-tag tag-a"><span>✳</span> intelligence, applied.</div><div className="floating-tag tag-b">{'{ ideas → products }'}</div>
      <div className="art-bottom"><span>INPUT: CURIOSITY<br /><span className="accent">OUTPUT: POSSIBILITIES_</span></span><span className="signal-bars"><i /><i /><i /><i /><i /></span></div>
      <span className="art-coordinates">27.04 / BUILD MODE</span>
    </div>
    <a href="#projects" className="scroll-cue"><ArrowDown size={14} /> SCROLL TO EXPLORE</a>
  </section>;
}
