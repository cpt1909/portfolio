import { palette } from '@/lib/theme';

// The favicon uses the same theme source as the page instead of duplicate hex codes.
export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${palette.bg}"/><path d="M22 13v30q0 8 10 8h8v-9h-7q-2 0-2-3V13zm-7 12v9h29v-9z" fill="#ffffff"/><path d="M43 46h12v6H43z" fill="#ffffff"/></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
