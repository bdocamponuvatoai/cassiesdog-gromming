import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { site } from "@/content/site";
import { isPublic, siteUrl } from "@/lib/site-config";
import "./globals.css";

const fredoka = localFont({
  src: [
    { path: "./fonts/fredoka-400.ttf", weight: "400" },
    { path: "./fonts/fredoka-600.ttf", weight: "600" },
  ],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = localFont({
  src: [
    { path: "./fonts/nunito-400.ttf", weight: "400" },
    { path: "./fonts/nunito-600.ttf", weight: "600" },
    { path: "./fonts/nunito-800.ttf", weight: "800" },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Dog Grooming Columbus & Obetz | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: isPublic, follow: isPublic },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fff8f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
