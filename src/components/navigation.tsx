'use client';

import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [['Work', 'projects'], ['About', 'about'], ['Journey', 'experience'], ['Stack', 'stack']] as const;
export function Navigation({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><nav className="shell nav" aria-label="Main navigation">
    <a href="#home" className="wordmark" aria-label={`${name}, home`}><span className="brand-mark">t<span>_</span></span><span>{name.toLowerCase()}<span className="accent">.</span></span></a>
    <div className="desktop-links">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
    <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button>
  </nav>{open && <div id="mobile-menu" className="mobile-links">{[...links, ['Contact', 'contact']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</div>}</header>;
}
