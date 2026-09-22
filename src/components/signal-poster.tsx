"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, RotateCw } from "lucide-react";
import gsap from "gsap";

const signals = [
  {
    lines: ["MAKE", "SOME", "NOISE."],
    label: "CREATIVITY, UNFILTERED",
    frequency: "001",
    note: "GOOD IDEAS DON’T WHISPER.",
  },
  {
    lines: ["STAY", "A LITTLE", "WEIRD."],
    label: "CURIOSITY, AMPLIFIED",
    frequency: "002",
    note: "TAKE THE UNEXPECTED ROUTE.",
  },
  {
    lines: ["BUILD", "WHAT’S", "NEXT."],
    label: "POSSIBILITY, UNLIMITED",
    frequency: "003",
    note: "LESS WHAT IF. MORE WHY NOT.",
  },
];

/** A flat, interactive print poster. No canvas, WebGL, or 3D transforms. */
export function SignalPoster() {
  const [channel, setChannel] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const signal = signals[channel];

  useEffect(() => {
    const host = root.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;
    let equalizer: gsap.core.Tween | undefined;
    let visible = true;
    const sync = () => {
      context?.revert();
      equalizer = undefined;
      if (
        reduced.matches ||
        document.documentElement.dataset.motion === "paused"
      )
        return;
      context = gsap.context(() => {
        gsap.from(".poster-line", {
          yPercent: 105,
          rotate: 3,
          stagger: 0.07,
          duration: 0.65,
          ease: "power4.out",
          clearProps: "all",
        });
        equalizer = gsap.to(".equalizer-bar", {
          scaleY: (index) => 0.22 + ((index * 17) % 29) / 35,
          duration: 0.65,
          stagger: { each: 0.035, from: "center" },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: !visible || document.hidden,
        });
      }, host);
    };
    const visibility = () => equalizer?.paused(!visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
    });
    observer.observe(host);
    sync();
    reduced.addEventListener("change", sync);
    window.addEventListener("motionchange", sync);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      context?.revert();
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      window.removeEventListener("motionchange", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [channel]);

  return (
    <div className="signal-panel" ref={root}>
      <div className="signal-panel-top">
        <span>STUDIO / HUMAN FREQUENCY</span>
        <span>
          VOL. {signal.frequency} <i />
        </span>
      </div>
      <div className="poster-print" data-channel={channel}>
        <div className="poster-registration" aria-hidden="true">
          <span>+</span>
          <span>+</span>
        </div>
        <div className="poster-edition">
          <span>INDEPENDENT THINKING™</span>
          <ArrowUpRight size={22} />
        </div>
        <div
          className="poster-headline"
          aria-live="polite"
          aria-atomic="true"
          aria-label={signal.lines.join(" ")}
        >
          {signal.lines.map((line, index) => (
            <div className="poster-line-mask" key={index} aria-hidden="true">
              <span
                className={`poster-line ${index === 1 ? "poster-outline" : ""} ${line.length > 6 ? "poster-line-small" : ""}`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
        <div className="poster-sticker" aria-hidden="true">
          <svg viewBox="0 0 90 90" fill="none">
            <circle
              cx="45"
              cy="45"
              r="39"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m25 29 12 12m0-12L25 41m29-12 12 12m0-12L54 41M23 53c9 22 36 22 45 0"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
            />
          </svg>
          <span>HUMAN MADE</span>
        </div>
        <div className="poster-caption">
          <span>NO TEMPLATES FOR THINKING.</span>
          <span>↙ TURN IT UP</span>
        </div>
        <div className="equalizer" aria-hidden="true">
          {Array.from({ length: 37 }, (_, index) => (
            <span
              className="equalizer-bar"
              key={index}
              style={{ height: `${22 + ((index * 31 + 19) % 79)}%` }}
            />
          ))}
        </div>
        <div className="poster-footnote">
          <span>{signal.label}</span>
          <span>© HUMAN, ALWAYS</span>
        </div>
      </div>
      <div className="signal-controls">
        <div className="channel-indicator" aria-hidden="true">
          {signals.map((_, index) => (
            <span key={index} data-active={index === channel} />
          ))}
        </div>
        <button
          className="remix-button"
          onClick={() => setChannel((channel + 1) % signals.length)}
        >
          REMIX THE SIGNAL <RotateCw size={14} />
        </button>
      </div>
      <p className="signal-note">
        {signal.note}
        <span aria-hidden="true">↗</span>
      </p>
    </div>
  );
}
