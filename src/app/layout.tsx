import type { Metadata } from 'next';
import { themeVariables, accentColors } from '@/lib/theme';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Thaarakenth — AI/ML Product Engineer',
  icons: { icon: '/icon.svg' },
  description: 'Engineering intelligence. Building impact. Explore Thaarakenth’s work in AI, machine learning, and full-stack product engineering.',
  openGraph: { title: 'Thaarakenth — AI/ML Product Engineer', description: 'Engineering intelligence. Building impact.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { 
  return (
    <html lang="en" style={themeVariables}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const accents = ${JSON.stringify(accentColors)};
                const randomAccent = accents[Math.floor(Math.random() * accents.length)];
                
                // Inject a style tag to override the CSS variable globally
                // This avoids mutating the <html> style attribute that React is tracking
                const style = document.createElement('style');
                style.innerHTML = ':root { --acid: ' + randomAccent + ' !important; }';
                document.currentScript.parentNode.insertBefore(style, document.currentScript.nextSibling);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  ); 
}