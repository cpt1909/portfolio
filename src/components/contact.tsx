import { ArrowUpRight, Github, Globe, Linkedin, Mail } from 'lucide-react';
import type { Social } from '@/lib/schema';

const icons = { email: Mail, github: Github, linkedin: Linkedin, globe: Globe };

export function Contact({ socials }: { socials: Social[] }) {
  return (
    <section id="contact" className="contact-section shell">
      <div className="contact-copy">
        <p className="eyebrow">07 / WHAT’S NEXT?</p>
        <h2>Good things<br />start with<br /><span className="accent">a conversation</span><span className="contact-asterisk">✳</span></h2>
        <p>Have an ambitious idea, an interesting role, or an open-source rabbit hole? Let’s talk.</p>
      </div>
      <div className="social-directory" aria-label="Contact and social links">
        <p className="eyebrow">FIND ME ON THE INTERNET</p>
        {socials.map((social) => {
          const Icon = Object.hasOwn(icons, social.icon) ? icons[social.icon as keyof typeof icons] : Globe;
          const isEmail = social.url.startsWith('mailto:');
          return (
            <a className="social-card" key={social.id} href={social.url}
              target={isEmail ? undefined : '_blank'} rel={isEmail ? undefined : 'noopener noreferrer'}>
              <Icon size={24} className="accent" aria-hidden="true" />
              <span><strong>{social.label}</strong>{social.value && <span className="social-value">{social.value}</span>}</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          );
        })}
        {socials.length === 0 && <p className="muted">Contact links will be available soon.</p>}
      </div>
    </section>
  );
}
