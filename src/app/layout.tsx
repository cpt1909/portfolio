import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { getPortfolio } from "@/lib/content";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolio();
  const title = data
    ? `${data.profile.name} — ${data.profile.role}`
    : "Portfolio";
  const description =
    data?.profile.intro || "Engineering intelligence. Building impact.";
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
    title,
    description,
    icons: { icon: "/icon.svg" },
    openGraph: { title, description, type: "website" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
