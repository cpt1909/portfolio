import { palette } from '@/lib/theme';
export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="${palette.acid}"/><g stroke="${palette.bg}" stroke-width="3" stroke-linecap="round"><path d="M32 12v40M12 32h40M18 18l28 28M18 46l28-28"/></g></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
