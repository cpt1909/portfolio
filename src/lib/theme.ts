import type { CSSProperties } from 'react';

/** The single source of truth for the website palette, including the favicon.
 * Change a hex value here; all CSS, Tailwind utilities, and derived glows follow.
 * Rebuild/redeploy after changing this file. No database edit is needed.
 */

export const accentColors = [
  '#dcff62', // original acid (vibrant yellow-green)
  '#00f0ff', // electric cyan (intense bright aqua)
  '#ff003c', // hot crimson (aggressive neon red)
  '#10ff00', // matrix green (pure, deep neon green)
  '#9d00ff', // voltage violet (heavy, saturated purple)
  '#ff6600', // blaze orange (true vivid orange)
  '#ff00a0', // laser pink (piercing hot pink)
  '#3b82f6', // royal cobalt (deep, rich structural blue)
  '#64ffda', // mint teal (soft, readable pastel blue-green)
  '#ffcb6b', // goldenrod (warm, readable yellow)
  '#c792ea', // soft lavender (readable pastel purple)
  '#f07178', // coral pink (soft, readable watermelon)
] as const;

export const palette = {
  bg: '#10110f',
  panel: '#171815',
  text: '#f0f0e8',
  muted: '#9b9e91',
  line: '#30322a',
  acid: accentColors[0],
  'on-accent': '#11150a',
  violet: '#cbb3fa',
  teal: '#8dccbd',
  shadow: '#000000',
} as const;

// Expose the same palette as CSS custom properties on the root HTML element.
export const themeVariables = Object.fromEntries(
  Object.entries(palette).map(([name, value]) => [`--${name}`, value]),
) as CSSProperties;
