"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { accents } from "@/lib/accents";
type Theme = "dark" | "light";
const ThemeContext = createContext({
  theme: "dark" as Theme,
  toggle: () => {},
  paused: false,
  toggleMotion: () => {},
});
const subscribeTheme = (listener: () => void) => {
  window.addEventListener("themechange", listener);
  return () => window.removeEventListener("themechange", listener);
};
const readTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
export function useAccentRoulette() {
  useEffect(() => {
    const accent = accents[Math.floor(Math.random() * accents.length)];
    const root = document.documentElement;
    root.style.setProperty("--accent", accent.color);
    root.style.setProperty("--accent-light-ink", accent.lightInk);
    root.dataset.accent = accent.name;
  }, []);
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    (): Theme => "dark",
  );
  const [paused, setPaused] = useState(false);
  useAccentRoulette();
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cyber-theme");
      if (saved === "light" || saved === "dark") {
        document.documentElement.dataset.theme = saved;
        window.dispatchEvent(new Event("themechange"));
      }
    } catch {
      /* Storage is optional. */
    }
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event("themechange"));
    try {
      localStorage.setItem("cyber-theme", next);
    } catch {}
  };
  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? "paused" : "active";
    window.dispatchEvent(new Event("motionchange"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggle, paused, toggleMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
