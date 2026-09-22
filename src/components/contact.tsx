import { ArrowUpRight, Github, Globe, Linkedin, Mail } from "lucide-react";
import type { Social } from "@/lib/schema";
import { CopyEmail } from "./copy-email";
const icons = { email: Mail, github: Github, linkedin: Linkedin, globe: Globe };

export function Contact({ socials }: { socials: Social[] }) {
  return (
    <section id="contact" className="contact-section">
      <div className="section-intro">
        <span className="small-label">05 / YOUR MOVE</span>
        <span>THE NEXT GOOD THING STARTS HERE.</span>
      </div>
      <div className="contact-title">
        <p className="contact-kicker">GOOD CONVERSATIONS MAKE GREAT THINGS.</p>
        <h2>
          Let’s make
          <br />
          <em>some waves.</em>
        </h2>
        <span className="contact-flower" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="contact-bottom">
        <div className="contact-invitation">
          <span className="contact-arrow" aria-hidden="true">
            ↳
          </span>
          <p>
            An ambitious idea. An interesting opportunity.
            <br />A conversation that could lead anywhere.
            <span className="contact-postscript">
              YOU BRING THE WHAT IF. I’LL BRING THE WHY NOT.
            </span>
          </p>
        </div>
        <div className="social-directory" aria-label="Contact and social links">
          {socials.map((social) => {
            if (social.url.toLowerCase().startsWith("mailto:"))
              return (
                <CopyEmail
                  key={social.id}
                  url={social.url}
                  label={social.label}
                />
              );
            const Icon = Object.hasOwn(icons, social.icon)
              ? icons[social.icon as keyof typeof icons]
              : Globe;
            return (
              <a
                key={social.id}
                className="social-link"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={19} />
                <span>
                  <strong>{social.label}</strong>
                  {social.value && <small>{social.value}</small>}
                </span>
                <ArrowUpRight size={20} />
              </a>
            );
          })}
          {!socials.length && <p>Contact links will be available soon.</p>}
        </div>
      </div>
    </section>
  );
}
