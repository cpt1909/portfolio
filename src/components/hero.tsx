import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Profile } from "@/lib/schema";
import { SignalPoster } from "./signal-poster";
export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="home" className="hero shell">
      <div className="hero-meta">
        <span>INDEPENDENT MIND. UNLIMITED POSSIBILITIES.</span>
        <span className="availability">
          <i />
          {profile.availability}
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            HELLO, WORLD_ I’M {profile.name.toUpperCase()}
          </p>
          <h1>
            HUMAN
            <br />
            BY NATURE.
            <br />
            <span className="accent">DIGITAL</span>
            <br />
            <span className="outline">BY DESIGN.</span>
            <span className="title-star" aria-hidden="true">
              ✳
            </span>
          </h1>
          <div className="hero-intro">
            <span className="cross">↳</span>
            <div>
              <p>{profile.intro}</p>
              <a className="button primary" href="#work">
                EXPLORE MY WORK <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#contact">
                LET’S TALK ↗
              </a>
            </div>
          </div>
        </div>
        <SignalPoster />
      </div>
      <div className="hero-bottom">
        <span>{profile.role.toUpperCase()}</span>
        <a href="#work">
          <ArrowDown size={14} /> SCROLL TO ENTER THE RABBIT HOLE
        </a>
        <span>PORTFOLIO / {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
