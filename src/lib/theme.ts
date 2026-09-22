import type { CSSProperties } from 'react';
export const palette = { bg: '#151417', panel: '#242228', text: '#f4f0e9', muted: '#aaa5b1', line: '#3e3945', acid: '#cab9ee', 'on-accent': '#21192c', violet: '#cab9ee', teal: '#d6edac', shadow: '#000000' } as const;
export const themeVariables = Object.fromEntries(Object.entries(palette).map(([name,value]) => [`--${name}`,value])) as CSSProperties;
