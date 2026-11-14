import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { charity } from "@/lib/site/charity";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Serif for headings: gravitas and a Catholic institutional feel (PRD §5). Subset and swap for speed.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(charity.siteUrl),
  title: { default: charity.name, template: `%s | ${charity.name}` },
  applicationName: charity.name,
  openGraph: {
    siteName: charity.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#17100c",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${geistSans.variable} ${newsreader.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
