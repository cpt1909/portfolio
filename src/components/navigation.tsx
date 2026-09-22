"use client";
import { useState } from "react";
import { Moon, Sun, Pause, Play, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
export function Navigation({ name }: { name: string }) {
  const { theme, toggle, paused, toggleMotion } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label={name + ", home"}>
          <span>✳</span>
          {name.toLowerCase()}
          <sup>®</sup>
        </a>
        <div className={"nav-links " + (open ? "is-open" : "")} id="nav-links">
          {[
            ["work", "WORK"],
            ["about", "ABOUT"],
            ["stack", "STACK"],
            ["contact", "CONTACT"],
          ].map(([id, label], i) => (
            <a onClick={() => setOpen(false)} href={"#" + id} key={id}>
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-tools">
          <button
            className="theme-switch"
            onClick={toggle}
            role="switch"
            aria-checked={theme === "light"}
            aria-label="Light theme"
          >
            <Moon size={12} />
            <Sun size={12} />
            <span className="switch-knob" />
          </button>
          <button
            className="icon-button"
            onClick={toggleMotion}
            aria-label={paused ? "Resume animation" : "Pause animation"}
            aria-pressed={paused}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button
            className="menu-toggle icon-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
