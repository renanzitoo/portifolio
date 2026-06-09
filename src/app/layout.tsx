import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Locale } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Renan Costa | Full-Stack & Backend Engineer",
    template: "%s | Renan Costa",
  },
  description:
    "Portfolio of Renan Costa, a Full-Stack and Backend Engineer focused on high-performance systems, AI-driven automation, and scalable B2B products.",
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "pt-BR": "/pt-BR",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Renan Costa",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@renancosta",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{
    lang?: Locale;
  }>;
}>) {
  const resolvedParams = params ? await params : undefined;
  const lang = resolvedParams?.lang ?? "en";

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
